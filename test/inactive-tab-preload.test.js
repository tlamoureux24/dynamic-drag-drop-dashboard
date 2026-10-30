import test from 'node:test';
import assert from 'node:assert/strict';
import { installCardBuilderMethods } from '../src/cards/card-renderer.js';

class Host {}
installCardBuilderMethods(Host.prototype);

function preloadHost(count) {
  const wraps = Array.from({ length: count }, (_, index) => ({ id: index, dataset: { ddcDeferred: 'true' } }));
  const host = new Host();
  host.isConnected = true;
  host.editMode = false;
  host.__cardBuildSeq = 1;
  host._config = {};
  host.cardContainer = {
    querySelectorAll: () => wraps.filter((wrap) => wrap.dataset.ddcDeferred === 'true'),
  };
  host.hydrated = [];
  host._hydrateDeferredCardWrapper_ = async (wrap) => {
    delete wrap.dataset.ddcDeferred;
    host.hydrated.push(wrap.id);
    return true;
  };
  return host;
}

const flush = () => new Promise((resolve) => setImmediate(resolve));

async function advance(t, ms) {
  t.mock.timers.tick(ms);
  for (let i = 0; i < 20; i += 1) await flush();
}

test('inactive tab cards are created in small timed chunks until none remain', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const host = preloadHost(10);
  host._scheduleInactiveTabPreload_();

  await advance(t, 2999);
  assert.equal(host.hydrated.length, 0);
  await advance(t, 1);
  assert.equal(host.hydrated.length, 4);
  await advance(t, 150);
  assert.equal(host.hydrated.length, 8);
  await advance(t, 150);
  assert.equal(host.hydrated.length, 10);
  await advance(t, 150);
  assert.equal(host.__inactiveTabPreloadTimer, 0);
});

test('preloading stops on a newer build, in edit mode, or when disabled', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });

  const rebuilt = preloadHost(10);
  rebuilt._scheduleInactiveTabPreload_();
  rebuilt.__cardBuildSeq = 2;
  await advance(t, 4000);
  assert.equal(rebuilt.hydrated.length, 0);

  const editing = preloadHost(10);
  editing.editMode = true;
  editing._scheduleInactiveTabPreload_();
  await advance(t, 4000);
  assert.equal(editing.hydrated.length, 0);

  const disabled = preloadHost(10);
  disabled._config = { preload_inactive_tabs: false };
  disabled._scheduleInactiveTabPreload_();
  await advance(t, 4000);
  assert.equal(disabled.hydrated.length, 0);
});
