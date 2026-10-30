import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the bundled module URL carries the integration version so browsers fetch each release', async () => {
  const source = await readFile(
    new URL('../custom_components/dynamic_drag_drop_dashboard/__init__.py', import.meta.url),
    'utf8'
  );
  assert.match(source, /add_extra_js_url\(hass, f"\{FRONTEND_URL\}\?v=\{integration\.version\}"\)/);
  assert.doesNotMatch(source, /frontend_extra_module_url/);
});
