import test from 'node:test';
import assert from 'node:assert/strict';
import { installCardBuilderMethods } from '../src/cards/card-renderer.js';

class Host {}
installCardBuilderMethods(Host.prototype);

// Just enough DOM for the icon swap: tree walking, attributes and replaceWith.
class FakeElement {
  constructor(localName) {
    this.localName = localName;
    this.children = [];
    this.parent = null;
    this.attributes = {};
    this.dataset = {};
    this.className = '';
  }
  get firstElementChild() { return this.children[0] || null; }
  append(...nodes) { for (const node of nodes) { node.parent = this; this.children.push(node); } return this; }
  getAttribute(name) { return this.attributes[name] ?? null; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  replaceWith(node) {
    const siblings = this.parent.children;
    siblings[siblings.indexOf(this)] = node;
    node.parent = this.parent;
  }
  querySelectorAll(selector) {
    const match = selector === 'ha-icon'
      ? (el) => el.localName === 'ha-icon'
      : (el) => el.localName === 'span' && el.className === 'ddc-deferred-icon';
    const found = [];
    const walk = (el) => { for (const child of el.children) { if (match(child)) found.push(child); walk(child); } };
    walk(this);
    return found;
  }
}

function icon(name) {
  const el = new FakeElement('ha-icon');
  el.setAttribute('icon', name);
  return el;
}

function wrapper() {
  const card = new FakeElement('hui-tile-card').append(icon('mdi:card-own'));
  const chip = new FakeElement('div').append(new FakeElement('button').append(icon('mdi:pencil')), icon('mdi:cog'));
  const resize = new FakeElement('div').append(icon('mdi:resize-bottom-right'));
  return new FakeElement('div').append(card, chip, resize);
}

test('edit-control icons stay inert outside edit mode and are restored for editing', () => {
  globalThis.document = { createElement: (name) => new FakeElement(name) };
  try {
    const host = new Host();
    host.editMode = false;
    const wrap = wrapper();

    host._deferWrapperEditIcons_(wrap);
    assert.equal(wrap.dataset.ddcEditIconsDeferred, 'true');
    const remaining = wrap.querySelectorAll('ha-icon').map((el) => el.getAttribute('icon'));
    assert.deepEqual(remaining, ['mdi:card-own'], 'the card itself is never touched');
    assert.equal(wrap.querySelectorAll('span.ddc-deferred-icon').length, 3);

    host._restoreWrapperEditIcons_(wrap);
    assert.equal(wrap.dataset.ddcEditIconsDeferred, undefined);
    assert.deepEqual(
      wrap.querySelectorAll('ha-icon').map((el) => el.getAttribute('icon')).sort(),
      ['mdi:card-own', 'mdi:cog', 'mdi:pencil', 'mdi:resize-bottom-right'],
    );
    assert.equal(wrap.querySelectorAll('span.ddc-deferred-icon').length, 0);
  } finally {
    delete globalThis.document;
  }
});

test('wrappers built in edit mode keep their icons', () => {
  const host = new Host();
  host.editMode = true;
  const wrap = wrapper();
  host._deferWrapperEditIcons_(wrap);
  assert.equal(wrap.querySelectorAll('ha-icon').length, 4);
  assert.equal(wrap.dataset.ddcEditIconsDeferred, undefined);
});
