import test from 'node:test';
import assert from 'node:assert/strict';
import { installCardBuilderMethods } from '../src/cards/card-renderer.js';

class Host {}
installCardBuilderMethods(Host.prototype);

// Just enough DOM for the icon swap: tree walking, classes, events and replaceWith.
class FakeElement {
  constructor(localName, className = '') {
    this.localName = localName;
    this.children = [];
    this.parent = null;
    this.attributes = {};
    this.dataset = {};
    this.className = className;
    this.listeners = {};
  }
  get firstElementChild() { return this.children[0] || null; }
  append(...nodes) { for (const node of nodes) { node.parent = this; this.children.push(node); } return this; }
  getAttribute(name) { return this.attributes[name] ?? null; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatch(type) { for (const listener of this.listeners[type] || []) listener({ type }); }
  replaceWith(node) {
    const siblings = this.parent.children;
    siblings[siblings.indexOf(this)] = node;
    node.parent = this.parent;
  }
  closest(selector) {
    const classes = selector.split(',').map((part) => part.trim().replace(/^\./, ''));
    for (let el = this; el; el = el.parent) {
      if (classes.some((name) => el.className.split(' ').includes(name))) return el;
    }
    return null;
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
  const chip = new FakeElement('div', 'chip').append(new FakeElement('button', 'mini').append(icon('mdi:pencil')), icon('mdi:cog'));
  const actions = new FakeElement('div', 'ddc-card-edit-actions').append(icon('mdi:cog-outline'));
  const resize = new FakeElement('div', 'resize-handle').append(icon('mdi:resize-bottom-right'));
  return new FakeElement('div', 'card-wrapper').append(card, chip, actions, resize);
}

const iconNames = (wrap) => wrap.querySelectorAll('ha-icon').map((el) => el.getAttribute('icon')).sort();

function withDocument(run) {
  globalThis.document = { createElement: (name) => new FakeElement(name) };
  try { run(); } finally { delete globalThis.document; }
}

test('edit-control icons stay inert outside edit mode and are fully restored for editing', () => {
  withDocument(() => {
    const host = new Host();
    host.editMode = false;
    const wrap = wrapper();

    host._deferWrapperEditIcons_(wrap);
    assert.equal(wrap.dataset.ddcEditIconsDeferred, 'true');
    assert.deepEqual(iconNames(wrap), ['mdi:card-own'], 'the card itself is never touched');
    assert.equal(wrap.querySelectorAll('span.ddc-deferred-icon').length, 4);

    host._restoreWrapperEditIcons_(wrap);
    assert.equal(wrap.dataset.ddcEditIconsDeferred, undefined);
    assert.deepEqual(iconNames(wrap), ['mdi:card-own', 'mdi:cog', 'mdi:cog-outline', 'mdi:pencil', 'mdi:resize-bottom-right']);
  });
});

test('showing a card in edit mode restores only its handles; hover restores the menu', () => {
  withDocument(() => {
    const host = new Host();
    host.editMode = false;
    const wrap = wrapper();
    host._deferWrapperEditIcons_(wrap);

    host.editMode = true;
    host._restoreWrapperEditIcons_(wrap, { handlesOnly: true });
    assert.deepEqual(iconNames(wrap), ['mdi:card-own', 'mdi:resize-bottom-right']);
    assert.equal(wrap.dataset.ddcEditIconsDeferred, 'true');

    wrap.dispatch('pointerenter');
    assert.deepEqual(iconNames(wrap), ['mdi:card-own', 'mdi:cog', 'mdi:cog-outline', 'mdi:pencil', 'mdi:resize-bottom-right']);
    assert.equal(wrap.dataset.ddcEditIconsDeferred, undefined);
  });
});

test('hovering outside edit mode keeps the icons deferred', () => {
  withDocument(() => {
    const host = new Host();
    host.editMode = false;
    const wrap = wrapper();
    host._deferWrapperEditIcons_(wrap);
    wrap.dispatch('pointerenter');
    wrap.dispatch('focusin');
    assert.deepEqual(iconNames(wrap), ['mdi:card-own']);
  });
});

test('wrappers built in edit mode keep their icons', () => {
  const host = new Host();
  host.editMode = true;
  const wrap = wrapper();
  host._deferWrapperEditIcons_(wrap);
  assert.equal(wrap.querySelectorAll('ha-icon').length, 5);
  assert.equal(wrap.dataset.ddcEditIconsDeferred, undefined);
});
