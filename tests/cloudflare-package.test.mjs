import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import path from 'node:path';
const output='.cloudflare-deploy';
test('Cloudflare package includes the exact landing module graph and 3D assets',()=>{
  const visited=new Set();
  function visit(relative){
    if(visited.has(relative))return;visited.add(relative);
    const deployed=path.join(output,relative);
    assert.ok(existsSync(deployed),`Missing deployment dependency: ${relative}`);
    assert.deepEqual(readFileSync(deployed),readFileSync(relative),`Stale deployment dependency: ${relative}`);
    // Third-party bundles include Node-only conditional imports; verify their bytes
    // here and exercise browser dependencies in the rendered smoke tests.
    if(relative.startsWith('assets/vendor/') || !/\.(m?js|html)$/.test(relative))return;
    const source=readFileSync(deployed,'utf8');
    const patterns=relative.endsWith('.html') ? [/\bsrc="(\.\/[^"?]+\.js)(?:\?[^" ]*)?"/g] : [/(?:from\s*|import\s*\(\s*)['"](\.[^'"]+)['"]/g];
    for(const regex of patterns)for(const match of source.matchAll(regex))visit(path.normalize(path.join(path.dirname(relative),match[1].split(/[?#]/)[0])));
  }
  visit('index.html');
  for(const name of readdirSync('motion'))visit(`motion/${name}`);
  for(const name of readdirSync('assets/vendor/mollequiles'))visit(`assets/vendor/mollequiles/${name}`);
  for(const name of ['ampm-mollequiles.spz','mollequiles-560.webp','mollequiles-1120.webp'])visit(`assets/rework/${name}`);
  assert.ok(!existsSync(path.join(output,'docs')),'QA/design documents are not deploy assets');
});
test('Wrangler creates its asset directory for deploy and versions upload',()=>{
  const config=JSON.parse(readFileSync('wrangler.jsonc','utf8'));
  assert.match(config.build.command,/node scripts\/build-cloudflare-assets\.mjs/);
  assert.match(config.build.command,/node --test tests\/cloudflare-package\.test\.mjs/);
  assert.equal(config.assets.directory,output);
});
