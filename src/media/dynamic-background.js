/* Pure helpers for resolving a weather/time driven dashboard background. */

export const DEFAULT_WEATHER_GROUPS = Object.freeze({
  clear: ['sunny', 'clear-night'],
  cloudy: ['cloudy', 'partlycloudy'],
  rain: ['rainy', 'pouring', 'lightning', 'lightning-rainy'],
  snow: ['snowy', 'snowy-rainy', 'hail'],
  fog: ['fog'],
  wind: ['windy', 'windy-variant'],
});

const minutesFromClock = (value) => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value || '').trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return (hour * 60) + minute;
};

export function resolveTimeSlot(slots = [], date = new Date()) {
  const minute = (date.getHours() * 60) + date.getMinutes();
  for (const slot of Array.isArray(slots) ? slots : []) {
    const start = minutesFromClock(slot?.start);
    const end = minutesFromClock(slot?.end);
    if (start == null || end == null || !slot?.id) continue;
    const matches = start <= end
      ? minute >= start && minute < end
      : minute >= start || minute < end;
    if (matches) return String(slot.id);
  }
  return 'default';
}

export function resolveWeatherGroup(condition, groups = {}) {
  const normalized = String(condition || '').trim().toLowerCase();
  const merged = { ...DEFAULT_WEATHER_GROUPS, ...(groups || {}) };
  for (const [group, states] of Object.entries(merged)) {
    if ((Array.isArray(states) ? states : [states]).map((state) => String(state).toLowerCase()).includes(normalized)) {
      return group;
    }
  }
  return normalized || 'default';
}

const imageSource = (value) => {
  if (typeof value === 'string') return value.trim();
  return String(value?.src || '').trim();
};

export const HOME24_WEATHER_GROUPS = Object.freeze({
  clair: ['sunny', 'clear', 'clear-night'],
  eclaircies: ['partlycloudy', 'windy', 'windy-variant'],
  couvert: ['cloudy', 'exceptional'],
  pluie: ['rainy', 'pouring', 'hail'],
  orage: ['lightning', 'lightning-rainy'],
  brouillard: ['fog'],
  neige: ['snowy', 'snowy-rainy'],
});

export function parseHomeAssistantDateTime(hass, entityId, now = new Date()) {
  const state = hass?.states?.[entityId];
  if (!state) return null;
  const raw = String(state.state || '').trim();
  let match = /^(\d{4})-(\d{1,2})-(\d{1,2})[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/.exec(raw);
  if (match) {
    const [, year, month, day, hour, minute, second = '0'] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const timestamp = Number(state.attributes?.timestamp);
  if (Number.isFinite(timestamp) && timestamp > 86400) return new Date(timestamp * 1000);
  match = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(raw);
  if (!match) return null;
  const date = new Date(now);
  date.setHours(Number(match[1]), Number(match[2]), Number(match[3] || 0), 0);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function resolveSolarPhase(config = {}, hass, now = new Date()) {
  const sunrise = parseHomeAssistantDateTime(hass, config.sunrise_entity, now);
  const sunset = parseHomeAssistantDateTime(hass, config.sunset_entity, now);
  if (!sunrise || !sunset) return 'nuit-profonde';
  const minute = 60000;
  const toRise = (sunrise - now) / minute;
  const fromRise = (now - sunrise) / minute;
  const fromSet = (now - sunset) / minute;
  if (toRise >= 0 && toRise <= 70) return 'pre-aube';
  if (fromRise >= -20 && fromRise <= 45) return 'aurore';
  if (fromRise > 45 && fromRise <= 240) return 'matin';
  if (fromSet >= -150 && fromSet < -45) return 'fin-apres-midi';
  if (fromSet >= -45 && fromSet <= 35) return 'crepuscule';
  if (fromSet > 35 && fromSet <= 210) return 'soiree';
  if (now >= sunrise && now <= sunset) return 'jour';
  return 'nuit-profonde';
}

export function resolveHome24SceneKey(phase, weather) {
  if (weather === 'orage') {
    if (['nuit-profonde', 'pre-aube', 'soiree'].includes(phase)) return 'nuit-profonde-orage';
    if (['fin-apres-midi', 'crepuscule'].includes(phase)) return 'crepuscule-orage';
    return 'jour-orage';
  }
  if (weather === 'brouillard') {
    if (['nuit-profonde', 'soiree'].includes(phase)) return 'nuit-profonde-brouillard';
    if (['pre-aube', 'aurore', 'matin'].includes(phase)) return 'aurore-brouillard';
    return 'jour-brouillard';
  }
  if (weather === 'neige') {
    return ['nuit-profonde', 'pre-aube', 'soiree'].includes(phase) ? 'nuit-profonde-neige' : 'jour-neige';
  }
  return `${phase}-${weather}`;
}

function resolveHome24Background(config, hass, date) {
  const entity = String(config.weather_entity || '').trim();
  const condition = String(hass?.states?.[entity]?.state || '');
  const normalizedCondition = condition.trim().toLowerCase();
  const weather = Object.entries(HOME24_WEATHER_GROUPS)
    .find(([, states]) => states.includes(normalizedCondition))?.[0] || 'eclaircies';
  const phase = resolveSolarPhase(config, hass, date);
  const key = resolveHome24SceneKey(phase, weather);
  const base = String(config.base_url || '/local/home24/backgrounds/scenes').replace(/\/$/, '');
  const src = imageSource(config.overrides?.[key]) || `${base}/${key}.png`;
  return { src, weather, time: phase, phase, key, entity, condition };
}

export function resolveDynamicBackground(config = {}, hass, date = new Date()) {
  if (!config?.enabled) return null;
  if (config.preset === 'home24_scenes') return resolveHome24Background(config, hass, date);
  const entity = String(config.weather_entity || '').trim();
  const condition = entity ? hass?.states?.[entity]?.state : '';
  const weather = resolveWeatherGroup(condition, config.weather_groups);
  const time = resolveTimeSlot(config.time_slots, date);
  const images = config.images || {};
  const candidates = [
    images?.[weather]?.[time],
    images?.[weather]?.default,
    images?.default?.[time],
    images?.default?.default,
    config.fallback,
  ];
  const source = candidates.map(imageSource).find(Boolean);
  if (!source) return null;
  return { src: source, weather, time, entity, condition: String(condition || '') };
}
