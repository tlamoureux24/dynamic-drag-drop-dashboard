import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const forbidden = [
  /hads\.smarti\.dev/i,
  /ddc_hads_/i,
  /hads_(?:api|store)_base/i,
  /picker-mode-tab--hads/i,
  /hads-store-/i,
];

async function javascriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const url = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    if (entry.isDirectory()) return javascriptFiles(url);
    return entry.name.endsWith('.js') ? [url] : [];
  }));
  return nested.flat();
}

test('distributed source contains no HADS marketplace endpoints or UI hooks', async () => {
  const sourceRoot = new URL('../src/', import.meta.url);
  for (const file of await javascriptFiles(sourceRoot)) {
    const source = await readFile(file, 'utf8');
    for (const pattern of forbidden) {
      assert.doesNotMatch(source, pattern, `${file.pathname} contains ${pattern}`);
    }
  }
});
