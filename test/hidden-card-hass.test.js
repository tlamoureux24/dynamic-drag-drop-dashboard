import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { installVisibilityMethods } from '../src/layout/visibility.js';

class Host {}
installVisibilityMethods(Host.prototype);

function fakeWrap(hidden) {
  const classes = new Set(hidden ? ['ddc-hidden'] : []);
  return {
    style: { display: hidden ? 'none' : '' },
    inert: hidden,
    classList: {
      contains: (name) => classes.has(name),
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
    },
    firstElementChild: { hass: { stale: true } },
  };
}

test('a card that becomes visible receives the current hass', () => {
  const host = new Host();
  host._hass = { fresh: true };
  host._shouldWrapDisplayForCurrentContext_ = () => true;
  const wrap = fakeWrap(true);
  const result = host._applyWrapDisplayState_(wrap);
  assert.equal(result.becameVisible, true);
  assert.equal(wrap.firstElementChild.hass, host._hass);
});

test('a card that stays hidden keeps its previous hass', () => {
  const host = new Host();
  host._hass = { fresh: true };
  host._shouldWrapDisplayForCurrentContext_ = () => false;
  const wrap = fakeWrap(true);
  const previous = wrap.firstElementChild.hass;
  host._applyWrapDisplayState_(wrap);
  assert.equal(wrap.firstElementChild.hass, previous);
});

test('the hass setter skips hidden card wrappers', async () => {
  const source = await readFile(new URL('../src/core/element-lifecycle.js', import.meta.url), 'utf8');
  assert.match(source, /for \(const wrap of wraps\) \{\s*if \(wrap\.style\?\.display === 'none'\) continue;/);
});
