import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveDynamicBackground,
  resolveHome24SceneKey,
  resolveSolarPhase,
  resolveTimeSlot,
  resolveWeatherGroup,
} from '../src/media/dynamic-background.js';

test('time slots support normal and overnight ranges', () => {
  const slots = [
    { id: 'day', start: '07:00', end: '20:00' },
    { id: 'night', start: '20:00', end: '07:00' },
  ];
  assert.equal(resolveTimeSlot(slots, new Date(2026, 7, 21, 12, 0)), 'day');
  assert.equal(resolveTimeSlot(slots, new Date(2026, 7, 21, 23, 0)), 'night');
  assert.equal(resolveTimeSlot(slots, new Date(2026, 7, 21, 6, 30)), 'night');
});

test('Home24 preset preserves solar phases and special weather scene names', () => {
  const hass = { states: {
    'weather.home': { state: 'lightning-rainy' },
    'input_datetime.sunrise': { state: '2026-08-21 07:00:00' },
    'input_datetime.sunset': { state: '2026-08-21 20:30:00' },
  } };
  const config = {
    enabled: true,
    preset: 'home24_scenes',
    weather_entity: 'weather.home',
    sunrise_entity: 'input_datetime.sunrise',
    sunset_entity: 'input_datetime.sunset',
    base_url: '/local/home24/backgrounds/scenes/',
  };
  assert.equal(resolveSolarPhase(config, hass, new Date(2026, 7, 21, 6, 10)), 'pre-aube');
  assert.equal(resolveHome24SceneKey('pre-aube', 'orage'), 'nuit-profonde-orage');
  assert.deepEqual(resolveDynamicBackground(config, hass, new Date(2026, 7, 21, 6, 10)), {
    src: '/local/home24/backgrounds/scenes/nuit-profonde-orage.png',
    weather: 'orage', time: 'pre-aube', phase: 'pre-aube', key: 'nuit-profonde-orage',
    entity: 'weather.home', condition: 'lightning-rainy',
  });
});

test('every Home24 phase and weather combination targets one of the 40 shipped scenes', () => {
  const phases = ['pre-aube', 'aurore', 'matin', 'jour', 'fin-apres-midi', 'crepuscule', 'soiree', 'nuit-profonde'];
  const weather = ['clair', 'eclaircies', 'couvert', 'pluie', 'orage', 'brouillard', 'neige'];
  const files = new Set(`
    aurore-brouillard aurore-clair aurore-couvert aurore-eclaircies aurore-pluie
    crepuscule-clair crepuscule-couvert crepuscule-eclaircies crepuscule-orage crepuscule-pluie
    fin-apres-midi-clair fin-apres-midi-couvert fin-apres-midi-eclaircies fin-apres-midi-pluie
    jour-brouillard jour-clair jour-couvert jour-eclaircies jour-neige jour-orage jour-pluie
    matin-clair matin-couvert matin-eclaircies matin-pluie
    nuit-profonde-brouillard nuit-profonde-clair nuit-profonde-couvert nuit-profonde-eclaircies
    nuit-profonde-neige nuit-profonde-orage nuit-profonde-pluie
    pre-aube-clair pre-aube-couvert pre-aube-eclaircies pre-aube-pluie
    soiree-clair soiree-couvert soiree-eclaircies soiree-pluie
  `.trim().split(/\s+/));
  assert.equal(files.size, 40);
  for (const phase of phases) {
    for (const condition of weather) assert.ok(files.has(resolveHome24SceneKey(phase, condition)), `${phase}/${condition}`);
  }
});

test('weather conditions resolve to extensible groups', () => {
  assert.equal(resolveWeatherGroup('partlycloudy'), 'cloudy');
  assert.equal(resolveWeatherGroup('exceptional', { alert: ['exceptional'] }), 'alert');
});

test('dynamic background selects weather and time with safe fallbacks', () => {
  const config = {
    enabled: true,
    weather_entity: 'weather.home',
    time_slots: [{ id: 'day', start: '07:00', end: '20:00' }],
    images: {
      rain: { day: '/local/rain-day.webp' },
      default: { default: '/local/fallback.webp' },
    },
  };
  const rainy = { states: { 'weather.home': { state: 'pouring' } } };
  assert.deepEqual(resolveDynamicBackground(config, rainy, new Date(2026, 7, 21, 12, 0)), {
    src: '/local/rain-day.webp', weather: 'rain', time: 'day', entity: 'weather.home', condition: 'pouring',
  });
  const unknown = { states: { 'weather.home': { state: 'exceptional' } } };
  assert.equal(resolveDynamicBackground(config, unknown, new Date(2026, 7, 21, 22, 0))?.src, '/local/fallback.webp');
});
