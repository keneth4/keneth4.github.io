// Run with PLAYWRIGHT_MODULE pointing to a locally installed playwright package.
// Optional CHROMIUM_EXECUTABLE and QA_URL / BASELINE_URL / QA_OUTPUT override defaults.
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.QA_URL || 'http://127.0.0.1:8770';
const out = process.env.QA_OUTPUT || '/private/tmp/mollequiles-browser-qa-v2';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}) });
const results = [], errors = [], metrics = [];
const story = '[data-case-story]';
async function pageFor(options = {}) {
  const context = await browser.newContext({viewport:{width:1440,height:900},...options});
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  await page.route('**/challenges.cloudflare.com/**', r => r.fulfill({status:200,body:'/* local QA: no network challenge */'}));
  await page.addInitScript(() => {
    window.qaMetrics={lcp:0,cls:0,longTasks:[]};
    new PerformanceObserver(l=>{for(const e of l.getEntries()) window.qaMetrics.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput) window.qaMetrics.cls+=e.value}).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(l=>{for(const e of l.getEntries()) window.qaMetrics.longTasks.push(e.duration)}).observe({type:'longtask',buffered:true});
  });
  return page;
}
async function at(page,p) {
  await page.locator(story).evaluate((el,p)=>{const pin=el.querySelector('[data-case-pin]');window.scrollTo({top:scrollY+el.getBoundingClientRect().top+p*(el.offsetHeight-pin.offsetHeight),behavior:"instant"});},p);
  await page.waitForFunction(p => Math.abs(Number(document.querySelector('[data-case-story]').dataset.progress)-p)<.01,p,{timeout:10000});
}
async function check(name, fn) { await fn(); results.push({name,status:'pass'}); console.log('PASS',name); }
try {
  const page=await pageFor();await page.goto(base,{waitUntil:'domcontentloaded'});
  await check('identity, hero static, no initial WebGL',async()=>{
    assert.match(await page.title(),/CreatiVivid/);assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('canvas').count(),0);assert.equal(await page.locator('#demo-start').count(),0);
  });
  await page.screenshot({path:out+'/desktop-hero.png'});
  metrics.push({version:'feature',stage:'initial',...(await page.evaluate(()=>({...window.qaMetrics,resourceBytes:performance.getEntriesByType('resource').reduce((s,e)=>s+e.transferSize,0)})))});
  await at(page,0);await page.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.ready==='true');
  await check('desktop: first frame, one canvas, no duplicate hero',async()=>{assert.equal(await page.locator('canvas').count(),1);assert.equal(await page.locator(story).getAttribute('data-pinned'),'true')});
  await check('reversible scroll through keyframes and fast jumps',async()=>{
    for(const p of [.1,.3,.45,.6,.7,.8,.95,.7,.6,.45,.3,0,1,0]) {await at(page,p);assert.ok(Math.abs(Number(await page.locator(story).getAttribute('data-progress'))-p)<.01, `expected ${p}; actual ${await page.locator(story).getAttribute('data-progress')}; pinned ${await page.locator(story).getAttribute('data-pinned')}`);}
    assert.equal(await page.locator(story).getAttribute('data-poster-only'),'false');
  });
  await at(page,.95);await page.screenshot({path:out+'/desktop-story.png'});
  await check('explore / zoom / reset / Escape / focus',async()=>{
    await page.locator('[data-case-explore]').click();await page.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.state==='explore');
    const before=await page.locator('[data-case-media]').screenshot();const box=await page.locator('[data-case-input]').boundingBox();
    await page.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.65,box.y+box.height*.5,{steps:10});await page.mouse.up();await page.waitForTimeout(200);
    assert.notEqual(Buffer.compare(before,await page.locator('[data-case-media]').screenshot()),0,'horizontal drag changes rendered pose');
    await page.locator('[data-case-input]').press('ArrowRight');await page.locator('[data-case-zoom-in]').click();await page.locator('[data-case-reset]').click();
    await page.locator('[data-case-input]').focus();await page.keyboard.press('Escape');await page.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.state==='story');
    assert.equal(await page.locator(story).getAttribute('data-state'),'story');assert.ok(await page.locator('[data-case-explore]').evaluate(e=>e===document.activeElement));
  });
  await check('wheel remains document scroll during explore; exit on leaving case',async()=>{
    await at(page,.95);await page.locator('[data-case-explore]').click();await page.locator('[data-case-input]').hover();const y=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,180);await page.waitForTimeout(200);assert.ok(await page.evaluate(y=>scrollY>y,y));
    await page.locator('#contacto').scrollIntoViewIfNeeded();await page.waitForTimeout(200);assert.notEqual(await page.locator(story).getAttribute('data-state'),'explore');
  });
  await check('ES EN DE JA, translated labels, layout and anchors',async()=>{
    for(const lang of ['en','de','ja','es']) {await page.locator('#language').selectOption(lang);await at(page,.95);assert.equal(await page.locator('html').getAttribute('lang'),lang);assert.ok((await page.locator('[data-case-explore]').innerText()).length>0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
    await page.locator('header a[href="#contacto"]').click();await page.waitForTimeout(200);assert.equal(new URL(page.url()).hash,'#contacto');
  });
  await check('local form validation and privacy link preserved',async()=>{
    await page.locator('input[name=contact_name]').fill('QA local');await page.locator('input[name=email]').fill('qa@example.test');await page.locator('input[name=business]').fill('QA');await page.locator('textarea[name=message]').fill('Prueba local sin envio');await page.locator('input[name=consent]').check();await page.locator('button[type=submit]').click();await page.waitForTimeout(100);assert.match(await page.locator('#form-status').innerText(),/local|enviado/i);assert.match(await page.locator('[data-privacy]').first().getAttribute('href'),/privacy.html\?lang=es/);
  });
  metrics.push({version:'feature',stage:'after story + interactions',...(await page.evaluate(()=>({...window.qaMetrics,resourceBytes:performance.getEntriesByType('resource').reduce((s,e)=>s+e.transferSize,0)})))});
  await check('refresh in middle keeps poster, dynamic reduced motion releases pin',async()=>{
    await at(page,.5);await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(200);
    await page.waitForFunction(()=>Number(document.querySelector('[data-case-story]').dataset.progress)>.2);
    assert.equal(await page.locator(story).getAttribute('data-poster-only'),'true');
    await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.pinned==='false');
    assert.equal(await page.locator('[data-case-caption]:visible').count(),4);
  });
  await page.context().close();
  const mobile=await pageFor({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});await mobile.goto(base,{waitUntil:'domcontentloaded'});await mobile.locator(story).scrollIntoViewIfNeeded();await mobile.waitForTimeout(300);
  await check('mobile: native scroll story with extended scrub and no input capture',async()=>{
    assert.equal(await mobile.locator(story).getAttribute('data-pinned'),'true');
    await at(mobile,0);await mobile.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.ready==='true');
    await at(mobile,.1);await at(mobile,.25);await at(mobile,.48);await mobile.waitForTimeout(600);
    const size=await mobile.locator('[data-case-media]').boundingBox();assert.ok(Math.abs(size.width-size.height)<2);
    assert.ok(await mobile.locator('[data-case-input]').isHidden());
    const data=await mobile.locator(story).evaluate(e=>({pose:JSON.parse(e.dataset.pose),height:e.offsetHeight,viewport:innerHeight}));
    assert.ok(data.pose.yawDeg>130);assert.ok(data.height/data.viewport>5.8);
    assert.equal(await mobile.locator(story).getAttribute('data-poster-only'),'false');
    assert.equal(await mobile.locator('[data-case-media]').evaluate(e=>e.style.getPropertyValue('--canvas-opacity')),'1');
  });
  await check('mobile: one-finger story scroll stays native and translations fit',async()=>{
    const cdp=await mobile.context().newCDPSession(mobile);const b=await mobile.locator('[data-case-media]').boundingBox();const x=b.x+b.width/2,y=b.y+b.height/2;
    const before=await mobile.evaluate(()=>scrollY);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});
    for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-i*12,id:1}]});await mobile.waitForTimeout(25)}
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(300);assert.ok(await mobile.evaluate(y=>scrollY>y+30,before));await cdp.detach();
    for(const lang of ['en','de','ja','es']){await mobile.locator('#language').selectOption(lang);await mobile.waitForTimeout(150);assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
    await at(mobile,.48);await mobile.waitForTimeout(600);
  });
  await mobile.screenshot({path:out+'/mobile-story.png'});await at(mobile,.95);
  await mobile.locator('[data-case-explore]').click();await mobile.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.state==='explore');
  await check('mobile: two-axis orbit and real two-finger pinch, no zoom buttons',async()=>{
    assert.equal(await mobile.locator('[data-case-input]').evaluate(e=>getComputedStyle(e).touchAction),'none');
    assert.ok(await mobile.locator('[data-case-zoom-in]').isHidden());
    const cdp=await mobile.context().newCDPSession(mobile);const b=await mobile.locator('[data-case-input]').boundingBox();const x=b.x+b.width/2,y=b.y+b.height/2;
    const start=await mobile.locator(story).evaluate(e=>JSON.parse(e.dataset.pose));
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});
    for(let i=1;i<=6;i++) await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+i*5,y:y+i*5,id:1}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(200);
    const orbit=await mobile.locator(story).evaluate(e=>JSON.parse(e.dataset.pose));assert.ok(Math.abs(orbit.yawDeg-start.yawDeg)>3);assert.ok(Math.abs(orbit.elevationDeg-start.elevationDeg)>3);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-30,y,id:1},{x:x+30,y,id:2}]});
    for(let i=1;i<=6;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-30-i*4,y,id:1},{x:x+30+i*4,y,id:2}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(200);
    const zoom=await mobile.locator(story).evaluate(e=>JSON.parse(e.dataset.pose));assert.ok(zoom.zoom<orbit.zoom-.1);
    assert.ok(zoom.zoom>=.5);await cdp.detach();
  });
  await mobile.screenshot({path:out+'/mobile-explore.png'});await mobile.locator('[data-case-exit]').click();await mobile.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.state==='story');
  await check('mobile explore returns to scroll story, landscape falls back when content cannot fit',async()=>{
    assert.ok(await mobile.locator('[data-case-input]').isHidden());
    await mobile.setViewportSize({width:844,height:390});await mobile.waitForTimeout(200);assert.equal(await mobile.locator(story).getAttribute('data-pinned'),'false');
  });await mobile.context().close();
  const reduce=await pageFor({reducedMotion:'reduce'});await reduce.goto(base,{waitUntil:'domcontentloaded'});await reduce.locator(story).scrollIntoViewIfNeeded();
  await check('reduced motion: static, no automatic 3D, all captions readable',async()=>{assert.equal(await reduce.locator(story).getAttribute('data-pinned'),'false');assert.equal(await reduce.locator('canvas').count(),0);assert.equal(await reduce.locator('[data-case-caption]:visible').count(),4)});await reduce.context().close();
  const lost=await pageFor({reducedMotion:'reduce'});await lost.goto(base,{waitUntil:'domcontentloaded'});await lost.locator('[data-case-explore]').click();await lost.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.ready==='true');await lost.locator('canvas').evaluate(c=>c.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await lost.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.state==='error');
  await check('GPU context loss disposes renderer and retains fallback',async()=>{assert.equal(await lost.locator('canvas').count(),0);assert.ok(await lost.locator('[data-case-status]').innerText())});await lost.context().close();
  const nojs=await pageFor({javaScriptEnabled:false});await nojs.goto(base,{waitUntil:'domcontentloaded'});await check('no JavaScript: poster, case and links retained',async()=>{assert.equal(await nojs.locator('[data-case-caption]').count(),4);assert.ok(await nojs.locator('[data-case-media] img').isVisible());assert.ok(await nojs.locator('[data-case-explore]').isHidden());assert.equal(await nojs.locator('canvas').count(),0)});await nojs.context().close();
  const slow=await pageFor();let release;const gate=new Promise(r=>release=r);await slow.route('**/ampm-mollequiles.spz',async route=>{await gate;await route.continue()});await slow.goto(base,{waitUntil:'domcontentloaded'});await at(slow,.5);await slow.waitForTimeout(300);assert.equal(await slow.locator(story).getAttribute('data-poster-only'),'true');release();await slow.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.ready==='true');
  await check('late load stays poster, bottom reentry does not rearm; upward exit does',async()=>{await at(slow,.95);assert.equal(await slow.locator('[data-case-media]').evaluate(e=>e.style.getPropertyValue('--canvas-opacity')),'0');await at(slow,1);await at(slow,.5);assert.equal(await slow.locator(story).getAttribute('data-poster-only'),'true');await at(slow,0);await at(slow,.5);assert.equal(await slow.locator(story).getAttribute('data-poster-only'),'false')});await slow.context().close();
  const fail=await pageFor();await fail.route('**/ampm-mollequiles.spz',r=>r.fulfill({status:503,body:'QA intentional asset failure'}));await fail.goto(base,{waitUntil:'domcontentloaded'});await at(fail,.5);await fail.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.state==='error');await check('failed asset: poster and links survive',async()=>{assert.ok(await fail.locator('[data-case-status]').innerText());assert.ok(await fail.locator('[data-case-media] img').isVisible());assert.equal(await fail.locator('canvas').count(),0)});await fail.screenshot({path:out+'/asset-error.png'});await fail.context().close();
  const gpu=await pageFor({reducedMotion:'reduce'});await gpu.addInitScript(()=>{window.WebGL2RenderingContext=undefined});await gpu.goto(base,{waitUntil:'domcontentloaded'});await gpu.locator('[data-case-explore]').click();await gpu.waitForFunction(()=>document.querySelector('[data-case-story]').dataset.state==='error');await check('WebGL unavailable: accessible fallback',async()=>{assert.ok(await gpu.locator('[data-case-status]').innerText());assert.equal(await gpu.locator('canvas').count(),0)});await gpu.context().close();
  if(process.env.BASELINE_URL){const baseline=await pageFor();await baseline.goto(process.env.BASELINE_URL,{waitUntil:'domcontentloaded'});await baseline.waitForTimeout(1000);metrics.push({version:'baseline',stage:'initial',...(await baseline.evaluate(()=>({...window.qaMetrics,resourceBytes:performance.getEntriesByType('resource').reduce((s,e)=>s+e.transferSize,0)})))});await baseline.context().close()}
  const unexpected=errors.filter(e=>!e.includes('503 (Service Unavailable)') && !e.includes('CONTEXT_LOST_WEBGL'));
  assert.deepEqual(unexpected,[],'unexpected browser errors');
} catch(e) {results.push({status:'fail',error:e.stack});console.error(e);process.exitCode=1;} finally {await writeFile(out+'/results.json',JSON.stringify({results,errors,metrics},null,2));await browser.close();}
