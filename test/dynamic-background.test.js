import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  resolveDynamicBackground,
  resolveHome24SceneKey,
  resolveSolarPhase,
  resolveSunDates,
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

test('Home24 solar phases fall back to sun.sun when helpers are unavailable', () => {
  const now = new Date('2026-08-21T14:32:00+02:00');
  const hass = { states: { 'sun.sun': {
    state: 'above_horizon',
    attributes: {
      next_rising: '2026-08-22T05:08:00+00:00',
      next_setting: '2026-08-21T18:55:00+00:00',
    },
  } } };
  assert.equal(resolveSunDates({}, hass, now)?.source, 'sun.sun');
  assert.equal(resolveSolarPhase({}, hass, now), 'jour');
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

test('Home24 settings use domain-filtered Home Assistant entity pickers', async () => {
  const template = await readFile(new URL('../src/dashboard/settings-template.js', import.meta.url), 'utf8');
  const controller = await readFile(new URL('../src/dashboard/settings-controller.js', import.meta.url), 'utf8');
  for (const id of ['ddc-home24-weather', 'ddc-home24-sun', 'ddc-home24-sunrise', 'ddc-home24-sunset']) {
    assert.match(template, new RegExp(`<ha-entity-picker id="${id}"`));
  }
  assert.match(controller, /configureEntityPicker\(inpHome24Weather, \['weather'\]/);
  assert.match(controller, /configureEntityPicker\(inpHome24Sun, \['sun'\]/);
  assert.match(controller, /configureEntityPicker\(inpHome24Sunrise, \['input_datetime'\]/);
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

test('a page-wide background follows the active dynamic scene', async () => {
  const { installBackgroundEffectsMethods } = await import('../src/media/background-effects.js');
  const host = {
    _config: {
      background_mode: 'image',
      background_image: { src: '/local/day.png', size: 'cover' },
      background_dynamic: { enabled: true },
    },
    _getDashboardBackgroundMode_: () => 'image',
    _normalizeMediaUrl_: (url) => url,
  };
  installBackgroundEffectsMethods(host);

  assert.equal(host._getPageBackgroundVisual_().lovelaceBackground, '/local/day.png');
  host.__dynamicBackgroundActive = { src: '/local/scenes/crepuscule-clair.png' };
  const visual = host._getPageBackgroundVisual_();
  assert.equal(visual.lovelaceBackground, '/local/scenes/crepuscule-clair.png');
  assert.equal(visual.backgroundSize, 'cover');
});

test('the screen saver shows the dynamic scene unless a custom image is set', async () => {
  const { installScreenSaverMethods } = await import('../src/media/screensaver.js');
  class Host {}
  installScreenSaverMethods(Host.prototype);
  const host = new Host();
  const props = {};
  host.screenSaverOverlay = { dataset: {}, style: { setProperty: (k, v) => { props[k] = v; }, removeProperty: (k) => { delete props[k]; } } };
  host._config = { background_dynamic: { enabled: true } };
  host.__dynamicBackgroundActive = { src: '/local/scenes/soiree-clair.png' };
  host.__screenSaverBgLoaded = new Set(['/local/scenes/soiree-clair.png', '/local/mine.png']);

  host._applyScreenSaverBackgroundImage_('visionos_glass');
  assert.equal(props['--ss-bg-image'], 'url("/local/scenes/soiree-clair.png")');
  assert.equal(host.screenSaverOverlay.dataset.ssBgSource, 'dynamic');

  host.screenSaverImage = '/local/mine.png';
  host._applyScreenSaverBackgroundImage_('visionos_glass');
  assert.equal(props['--ss-bg-image'], 'url("/local/mine.png")');

  host.screenSaverImage = '';
  host._config.background_dynamic.enabled = false;
  assert.equal(host._getScreenSaverDynamicImage_(), '');
});

test('the screen saver background follows the explicit choice, not the layout', async () => {
  const { installScreenSaverMethods } = await import('../src/media/screensaver.js');
  class Host {}
  installScreenSaverMethods(Host.prototype);
  const host = new Host();
  host._config = { background_dynamic: { enabled: true } };
  host.__dynamicBackgroundActive = { src: '/local/scenes/soiree-clair.png' };
  host.screenSaverImage = '/local/mine.png';
  const layoutImage = host._getScreenSaverBackgroundImage_('visionos_glass');

  assert.equal(host._getScreenSaverBackgroundSource_(), 'custom', 'old configs with an image keep it');
  host.screenSaverBackground = 'dynamic';
  assert.deepEqual(host._getScreenSaverBackgroundFor_('visionos_glass'), { url: '/local/scenes/soiree-clair.png', source: 'dynamic' });
  host.screenSaverBackground = 'style';
  assert.equal(host._getScreenSaverBackgroundFor_('visionos_glass').url, layoutImage);
  host.screenSaverBackground = 'custom';
  host.screenSaverImage = '';
  assert.equal(host._getScreenSaverBackgroundFor_('visionos_glass').url, layoutImage, 'an empty custom image falls back to the layout image');
});

test('layout previews hide the time and date when they are switched off', async () => {
  const { installScreenSaverMethods } = await import('../src/media/screensaver.js');
  class Host {}
  installScreenSaverMethods(Host.prototype);
  const host = new Host();
  host._config = {};
  assert.doesNotMatch(host._renderScreenSaverStyleOptions_(), /class="ss-mini-time" hidden/);
  host.screenSaverShowTime = false;
  host.screenSaverShowDate = false;
  const html = host._renderScreenSaverStyleOptions_();
  assert.match(html, /class="ss-mini-time" hidden/);
  assert.match(html, /class="ss-mini-date" hidden/);
});

test('screen saver text replaces entity placeholders with their current values', async () => {
  const { installScreenSaverMethods } = await import('../src/media/screensaver.js');
  class Host {}
  installScreenSaverMethods(Host.prototype);
  const host = new Host();
  host._hass = {
    states: {
      'sensor.outdoor': { state: '17.6', attributes: { unit_of_measurement: '°C' } },
      'weather.home': { state: 'sunny', attributes: {} },
    },
  };
  assert.equal(host._getScreenSaverText_(), '');
  host.screenSaverText = 'Dehors : {sensor.outdoor}\n{ weather.home } {sensor.missing}';
  assert.equal(host._getScreenSaverText_(), 'Dehors : 17.6 °C\nsunny {sensor.missing}');
  host._hass.formatEntityState = (stateObj) => (stateObj.state === 'sunny' ? 'Ensoleillé' : '17,6 °C');
  assert.equal(host._getScreenSaverText_(), 'Dehors : 17,6 °C\nEnsoleillé {sensor.missing}');
});
