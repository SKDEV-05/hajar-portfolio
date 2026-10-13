import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { projects, locales, copy } from '../src/data/content.ts';
const manifest = JSON.parse(readFileSync('docs/asset-manifest.json', 'utf8'));
assert.equal(projects.length, 14);
assert.equal(new Set(projects.map((p) => p.slug)).size, 14);
assert.deepEqual(Object.keys(copy.en).sort(), Object.keys(copy.fr).sort());
let images = 0;
for (const p of projects) {
  for (const locale of locales) {
    for (const field of ['intro', 'detail', 'role'])
      assert.ok(p[field][locale], `${p.slug} missing ${field}/${locale}`);
  }
  for (const color of p.palette) assert.match(color, /^#[0-9A-F]{6}$/);
  for (const path of [
    `public/images/projects/${p.slug}/hero.webp`,
    ...p.images.map((n) => `public/images/projects/${p.slug}/image-${n}.webp`),
    ...p.pages.map((n) => `public/images/projects/${p.slug}/page-${n}.webp`),
  ]) {
    assert.ok(existsSync(path), `Missing ${path}`);
    assert.ok(
      manifest.some((e) => e.file.replaceAll('\\', '/') === path),
      `Untraced ${path}`,
    );
    images++;
  }
}
assert.ok(existsSync('public/hajar-salmi-portfolio.pdf'));
console.log(
  `PASS: 14 projects, 2 complete locales, ${images} gallery/hero references, palettes and source traceability.`,
);
