import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  buildEntityCardConfig,
  buildRecommendedEntityCardConfig,
  getCompatibleCardsForEntity,
  getCompatibleCustomCardsForEntity,
  getRecommendedCardForEntity,
  installSmartPickerMethods,
} from '../src/cards/smart-card-picker.js';

test('camera entities receive a live picture entity card', () => {
  const state = { state: 'idle', attributes: { friendly_name: 'Front door' } };

  assert.deepEqual(
    getRecommendedCardForEntity('camera.front_door', state),
    {
      domain: 'camera',
      type: 'picture-entity',
      name: 'Picture entity',
      icon: 'mdi:cctv',
      reason: 'Shows the camera image instead of only its state.',
    },
  );
  assert.deepEqual(
    buildRecommendedEntityCardConfig('camera.front_door', state),
    {
      type: 'picture-entity',
      entity: 'camera.front_door',
      camera_view: 'live',
      show_name: true,
      show_state: true,
    },
  );
});

test('weather and to-do entities receive their content-rich cards', () => {
  assert.deepEqual(
    buildRecommendedEntityCardConfig('weather.forecast_home', { state: 'partlycloudy' }),
    {
      type: 'weather-forecast',
      entity: 'weather.forecast_home',
      show_current: true,
      show_forecast: true,
      forecast_type: 'daily',
    },
  );
  assert.deepEqual(
    buildRecommendedEntityCardConfig('todo.household_tasks', { state: '1' }),
    {
      type: 'todo-list',
      entity: 'todo.household_tasks',
      hide_completed: false,
    },
  );
});

test('control, location, and sensor domains get useful defaults', () => {
  assert.equal(getRecommendedCardForEntity('light.kitchen').type, 'light');
  assert.equal(getRecommendedCardForEntity('climate.office').type, 'thermostat');
  assert.equal(getRecommendedCardForEntity('media_player.living_room').type, 'media-control');
  assert.deepEqual(
    buildRecommendedEntityCardConfig('person.alex'),
    { type: 'map', entities: ['person.alex'] },
  );
  assert.deepEqual(
    buildRecommendedEntityCardConfig('sensor.living_room_temperature', { state: '21.4' }),
    {
      type: 'sensor',
      entity: 'sensor.living_room_temperature',
      graph: 'line',
    },
  );
  assert.equal(
    getRecommendedCardForEntity('sensor.status', { state: 'unavailable' }).type,
    'tile',
  );
});

test('unknown domains fall back to an editable tile', () => {
  assert.deepEqual(
    buildRecommendedEntityCardConfig('switch.coffee_machine', { state: 'off' }),
    {
      type: 'tile',
      entity: 'switch.coffee_machine',
      features_position: 'bottom',
      vertical: false,
    },
  );
});

test('light entities expose every useful compatible starting card', () => {
  const options = getCompatibleCardsForEntity('light.kitchen', {
    state: 'on',
    attributes: { friendly_name: 'Kitchen lights' },
  });
  const types = options.map((option) => option.type);

  assert.deepEqual(types, [
    'light',
    'tile',
    'button',
    'entity',
    'entities',
    'glance',
    'history-graph',
    'custom:ddc-icon-card',
  ]);
  assert.equal(options[0].recommended, true);
  assert.equal(options.slice(1).some((option) => option.recommended), false);
});

test('domain-specific and numeric entities receive additional compatible choices', () => {
  assert.deepEqual(
    getCompatibleCardsForEntity('camera.front_door', { state: 'idle' })
      .slice(0, 2)
      .map((option) => option.type),
    ['picture-entity', 'picture-glance'],
  );

  const sensorTypes = getCompatibleCardsForEntity('sensor.energy_today', {
    state: '12.5',
    attributes: { state_class: 'total_increasing' },
  }).map((option) => option.type);
  assert.deepEqual(sensorTypes.slice(0, 3), ['sensor', 'gauge', 'statistics-graph']);
});

test('installed Mushroom and universal custom cards are matched to the selected domain', () => {
  const installed = [
    { type: 'mushroom-light-card', name: 'Mushroom Light Card', icon: 'mdi:mushroom' },
    { type: 'mushroom-climate-card', name: 'Mushroom Climate Card' },
    { type: 'mushroom-entity-card', name: 'Mushroom Entity Card' },
    { type: 'button-card', name: 'Button Card' },
    { type: 'bubble-card', name: 'Bubble Card' },
    { type: 'mini-media-player', name: 'Mini Media Player' },
    { type: 'drag-and-drop-card', name: 'Drag & Drop Card' },
  ];
  const options = getCompatibleCardsForEntity('light.kitchen', { state: 'on' }, installed);

  assert.deepEqual(options.slice(0, 5).map((option) => option.type), [
    'light',
    'custom:mushroom-light-card',
    'custom:bubble-card',
    'custom:button-card',
    'custom:mushroom-entity-card',
  ]);
  assert.equal(options[1].installed, true);
  assert.equal(options[1].icon, 'mdi:mushroom');
  assert.ok(!options.some((option) => option.type === 'custom:mushroom-climate-card'));
  assert.ok(!options.some((option) => option.type === 'custom:mini-media-player'));
  assert.ok(!options.some((option) => option.type === 'custom:drag-and-drop-card'));
});

test('custom card metadata and conservative type names can declare domain support', () => {
  const matches = getCompatibleCustomCardsForEntity('sensor.power', [
    { type: 'power-summary-card', name: 'Power Summary', domains: ['sensor'] },
    { type: 'compact-sensor-card', name: 'Compact Sensor' },
    { type: 'unrelated-panel-card', name: 'Unrelated Panel' },
  ]);

  assert.deepEqual(matches.map((option) => option.type), [
    'custom:compact-sensor-card',
    'custom:power-summary-card',
  ]);
});

test('the selected compatible card receives the chosen entity', () => {
  assert.deepEqual(
    buildEntityCardConfig('light.kitchen', 'button', { state: 'on' }),
    {
      type: 'button',
      entity: 'light.kitchen',
      show_name: true,
      show_icon: true,
    },
  );
  assert.deepEqual(
    buildEntityCardConfig('camera.front_door', 'picture-glance', { state: 'idle' }),
    {
      type: 'picture-glance',
      camera_image: 'camera.front_door',
      camera_view: 'live',
      entities: [],
    },
  );
  assert.deepEqual(
    buildEntityCardConfig('sensor.energy_today', 'custom:mini-graph-card', { state: '12.5' }),
    {
      type: 'custom:mini-graph-card',
      entities: ['sensor.energy_today'],
      hours_to_show: 24,
    },
  );
  assert.deepEqual(
    buildEntityCardConfig('light.kitchen', 'custom:bubble-card', { state: 'on' }),
    {
      type: 'custom:bubble-card',
      entity: 'light.kitchen',
      card_type: 'button',
      button_type: 'slider',
      show_state: true,
    },
  );
});

test('the card catalog exposes To-do list as a first-class card', () => {
  class PickerHarness {
    _dragAndDropCardsCatalog() { return []; }
  }
  installSmartPickerMethods(PickerHarness.prototype);
  const items = new PickerHarness()._catalog().flatMap((section) => section.items || []);

  assert.ok(items.some((item) => item.type === 'todo-list'));
});

test('the picker exposes a searchable two-step By entity source', async () => {
  const source = await readFile(
    new URL('../src/cards/smart-card-picker.js', import.meta.url),
    'utf8',
  );

  assert.match(source, /id="pickerEntitiesTab"[\s\S]*?<span>By entity<\/span>/);
  assert.match(source, /Search entities by name, ID, domain, or state/);
  assert.match(source, /Search compatible cards/);
  assert.match(source, /Choose a card/);
  assert.match(source, /getCompatibleCardsForEntity\(selectedEntityId, selectedState, installedCustomCards\)/);
  assert.doesNotMatch(source, /hads\.smarti\.dev/i);
});
