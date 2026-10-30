import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const integrationFile = (name) => readFile(
  new URL(`../custom_components/dynamic_drag_drop_dashboard/${name}`, import.meta.url),
  'utf8'
);

test('the bundled module URL carries the integration version so browsers fetch each release', async () => {
  const source = await integrationFile('__init__.py');
  assert.match(source, /module_url = f"\{FRONTEND_URL\}\?v=\{integration\.version\}"/);
  assert.match(source, /add_extra_js_url\(hass, module_url\)/);
  assert.doesNotMatch(source, /frontend_extra_module_url/);
});

test('the module is also a Lovelace resource, so cached pages without the extra module still load it', async () => {
  const source = await integrationFile('__init__.py');
  assert.match(source, /await _async_sync_lovelace_resource\(hass, module_url\)/);
  assert.match(source, /async def async_remove_entry[\s\S]*_async_sync_lovelace_resource\(hass, None\)/);
  const manifest = JSON.parse(await integrationFile('manifest.json'));
  assert.ok(manifest.dependencies.includes('lovelace'));
});

test('a second copy of the module installs nothing', async () => {
  const entry = await readFile(new URL('../src/drag-and-drop-card.js', import.meta.url), 'utf8');
  assert.match(entry, /if \(!window\.__dynamicDragDropDashboardInstalled\) \{\s*window\.__dynamicDragDropDashboardInstalled = VERSION;\s*installDragAndDropCardFeatures/);
});
