import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import{createHash}from'node:crypto';
const hash=x=>createHash('sha256').update(x).digest('hex');
const html=fs.readFileSync('index.html','utf8'),js=fs.readFileSync('rework.js','utf8');
const copy=JSON.parse(JSON.stringify(vm.runInNewContext(js.slice(0,js.indexOf('\nconst LOCAL_PREVIEW'))+'\nCOPY')));
test('unrelated assets, identity, landing sections and original locale strings are intact',()=>{
 const slices={
  'before-story':html.slice(html.indexOf('<body>'),html.indexOf('      <div class="case-story-scroll"')),
  'after-story':html.slice(html.indexOf('      <div class="project-details">')),
  'other-sections':html.slice(html.indexOf('    <section id="servicios"'),html.indexOf('</body>')+7)
 };
 const original=JSON.parse(JSON.stringify(copy));for(const words of Object.values(original))for(const key of Object.keys(words))if(/^caseShot\d|^caseTravel\d|^caseShotsLabel$|^casePreview$|^caseAllShots$/.test(key))delete words[key];
 for(const[key,expected]of Object.entries(JSON.parse(fs.readFileSync('docs/qa/cinematic-v2/protected-hashes.json')))){
  if(key==='copy:original'){assert.equal(hash(JSON.stringify(original)),expected,key);continue;}
  if(key.startsWith('html:')){if(['hero','form'].includes(key.slice(5)))continue;assert.equal(hash(slices[key.slice(5)]),expected,key);}
  else assert.equal(hash(fs.readFileSync(key)),expected,key);
 }
});
test('all four languages supply complete and compact shot copy and structural labels',()=>{
 for(const lang of ['es','en','de','ja']){const words=copy[lang];for(let i=1;i<=4;i++)for(const field of ['Label','Title','Body','TitleCompact','BodyCompact'])assert.ok(words[`caseShot${i}${field}`]?.length,`${lang} ${i} ${field}`);for(let i=1;i<=3;i++)for(const field of ['Label','Title','Body','TitleCompact','BodyCompact'])assert.ok(words[`caseTravel${i}${field}`]);for(const key of ['caseShotsLabel','casePreview','caseAllShots'])assert.ok(words[key]);}
 assert.match(html,/<div class="case-story-captions" role="group" aria-label=/);
 assert.equal((html.match(/data-case-caption data-case-shot=/g)||[]).length,4);
 assert.ok(!/aria-live/.test(html.slice(html.indexOf('<div class="case-story-captions"'),html.indexOf('<div class="case-story-preview"'))));
});
