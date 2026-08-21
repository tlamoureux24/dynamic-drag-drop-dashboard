import test from 'node:test';
import assert from 'node:assert/strict';
import { installCardSettingsMenuMethods } from '../src/cards/card-options-menu.js';

test('dark configured card backgrounds receive a readable automatic text color', () => {
  const proto = {};
  installCardSettingsMenuMethods(proto);
  assert.equal(proto._contrastTextForBackground_('linear-gradient(135deg, #111827, #1f2937)'), '#f8fafc');
  assert.equal(proto._contrastTextForBackground_('linear-gradient(#ffffff, #e5e7eb)'), '');
  assert.equal(proto._contrastTextForBackground_('var(--ha-card-background)'), '');
});

