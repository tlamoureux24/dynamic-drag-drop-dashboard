/*
 * Recovery from page copies cached by the Home Assistant service worker.
 *
 * Older releases were written into the page as an extra module. The service
 * worker keeps serving cached copies of that page, so an old release can run
 * before the current Lovelace resource and keep the custom elements. When this
 * newer copy finds itself second, it removes those page copies and reloads once.
 */

export const MODULE_PATH = '/dynamic_drag_drop_dashboard/dynamic-drag-drop-dashboard.js';
const RELOAD_FLAG = 'ddc-stale-page-reload';

export function isStalePageCopy(html = '') {
  return String(html).includes(MODULE_PATH);
}

// Delete same-origin HTML copies that import this module, from every cache.
export async function purgeStalePageCopies({ cacheStorage = globalThis.caches, origin = globalThis.location?.origin } = {}) {
  if (!cacheStorage?.keys) return 0;
  let removed = 0;
  for (const name of await cacheStorage.keys()) {
    const cache = await cacheStorage.open(name);
    for (const request of await cache.keys()) {
      if (origin && !String(request.url).startsWith(origin)) continue;
      const response = await cache.match(request);
      if (!String(response?.headers?.get?.('content-type') || '').includes('text/html')) continue;
      if (!isStalePageCopy(await response.clone().text())) continue;
      if (await cache.delete(request)) removed += 1;
    }
  }
  return removed;
}

// Returns true when the page is being reloaded.
export async function recoverFromStalePage(version, {
  installedVersion,
  sessionStore = globalThis.sessionStorage,
  reload = () => globalThis.location?.reload(),
  purge = purgeStalePageCopies,
} = {}) {
  if (!installedVersion || installedVersion === version) return false;
  const flag = `${RELOAD_FLAG}:${version}`;
  try {
    if (sessionStore?.getItem(flag)) return false;
    sessionStore?.setItem(flag, '1');
  } catch {
    // Without session storage there is no loop guard, so do not reload.
    return false;
  }
  try { await purge(); } catch { return false; }
  console.info(`dynamic-drag-drop-dashboard: v${installedVersion} came from a cached page; reloading for v${version}`);
  reload();
  return true;
}
