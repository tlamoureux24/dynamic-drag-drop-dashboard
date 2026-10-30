import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { purgeStalePageCopies, recoverFromStalePage } from '../src/ha/stale-page-recovery.js';

const ORIGIN = 'https://ha.example';
const page = (imports) => `<html><script>import("/frontend_latest/app.js");${imports}</script></html>`;

function fakeCaches(entries) {
  const stores = new Map();
  for (const [name, url, type, body] of entries) {
    if (!stores.has(name)) stores.set(name, new Map());
    stores.get(name).set(url, { type, body });
  }
  return {
    stores,
    keys: async () => [...stores.keys()],
    open: async (name) => {
      const store = stores.get(name);
      return {
        keys: async () => [...store.keys()].map((url) => ({ url })),
        match: async (request) => {
          const hit = store.get(request.url);
          const response = { headers: { get: () => hit.type }, text: async () => hit.body };
          return { ...response, clone: () => response };
        },
        delete: async (request) => store.delete(request.url),
      };
    },
  };
}

test('only cached pages that import the module are removed', async () => {
  const cacheStorage = fakeCaches([
    ['workbox-runtime', `${ORIGIN}/?homescreen=1`, 'text/html; charset=utf-8', page('import("/dynamic_drag_drop_dashboard/dynamic-drag-drop-dashboard.js?v=0.2.6");')],
    ['workbox-runtime', `${ORIGIN}/`, 'text/html', page('')],
    ['file-cache', `${ORIGIN}/maison/accueil`, 'text/html', page('import("/dynamic_drag_drop_dashboard/dynamic-drag-drop-dashboard.js?v=0.2.7");')],
    ['file-cache', `${ORIGIN}/dynamic_drag_drop_dashboard/dynamic-drag-drop-dashboard.js?v=0.2.6`, 'text/javascript', 'code'],
    ['other', 'https://elsewhere.example/page', 'text/html', page('/dynamic_drag_drop_dashboard/dynamic-drag-drop-dashboard.js')],
  ]);

  assert.equal(await purgeStalePageCopies({ cacheStorage, origin: ORIGIN }), 2);
  assert.deepEqual([...cacheStorage.stores.get('workbox-runtime').keys()], [`${ORIGIN}/`]);
  assert.deepEqual([...cacheStorage.stores.get('file-cache').keys()], [`${ORIGIN}/dynamic_drag_drop_dashboard/dynamic-drag-drop-dashboard.js?v=0.2.6`]);
  assert.equal(cacheStorage.stores.get('other').size, 1, 'other origins are left alone');
});

function session() {
  const values = new Map();
  return { getItem: (k) => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) };
}

test('a newer copy behind an old one purges and reloads once per version', async () => {
  const sessionStore = session();
  let reloads = 0;
  let purges = 0;
  const options = { installedVersion: '0.2.6', sessionStore, reload: () => { reloads += 1; }, purge: async () => { purges += 1; } };

  assert.equal(await recoverFromStalePage('0.2.10', options), true);
  assert.equal(await recoverFromStalePage('0.2.10', options), false, 'no reload loop');
  assert.deepEqual([reloads, purges], [1, 1]);
});

test('nothing happens when the same version is already installed or storage is unavailable', async () => {
  let reloads = 0;
  const reload = () => { reloads += 1; };
  assert.equal(await recoverFromStalePage('0.2.10', { installedVersion: '0.2.10', sessionStore: session(), reload }), false);
  assert.equal(await recoverFromStalePage('0.2.10', { installedVersion: '', sessionStore: session(), reload }), false);
  const broken = { getItem: () => { throw new Error('blocked'); }, setItem() {} };
  assert.equal(await recoverFromStalePage('0.2.10', { installedVersion: '0.2.6', sessionStore: broken, reload }), false);
  assert.equal(reloads, 0);
});

test('the entry module hands a second copy to the stale page recovery', async () => {
  const entry = await readFile(new URL('../src/drag-and-drop-card.js', import.meta.url), 'utf8');
  assert.match(entry, /\} else \{\s*recoverFromStalePage\(VERSION, \{ installedVersion \}\);/);
  assert.match(entry, /customElements\.get\('dynamic-drag-drop-dashboard'\) \? 'unknown'/);
});
