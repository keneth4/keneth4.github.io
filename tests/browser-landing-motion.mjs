import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const engines=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const engine=process.env.QA_BROWSER||'chromium';
const base=process.env.QA_URL||'http://127.0.0.1:8770';
const out=process.env.QA_OUTPUT||'/private/tmp/block06-qa';await mkdir(out,{recursive:true});
const executable=process.env.BROWSER_EXECUTABLE||process.env.CHROMIUM_EXECUTABLE;
const browser=await engines[engine].launch({headless:true,...(executable?{executablePath:executable}:{})});
const results=[],errors=[];
const deadline=setTimeout(async()=>{results.push({status:'fail',error:'Browser run exceeded the 90-second safety deadline'});await writeFile(out+'/results.json',JSON.stringify({engine,results,errors},null,2));process.exit(1);},90000);
async function check(name,fn){await fn();results.push({name,status:'pass'});console.log('PASS',name)}
async function open(options={}){const ctx=await browser.newContext({viewport:{width:1440,height:900},...options});const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.setDefaultTimeout(15000);await p.goto(base,{waitUntil:'domcontentloaded',timeout:15000});await p.waitForFunction(()=>document.readyState==='complete'&&document.fonts.status==='loaded',null,{timeout:10000});return p;}
async function top(page,selector,y=120){await page.locator(selector).evaluate((e,y)=>scrollTo({top:scrollY+e.getBoundingClientRect().top-y,behavior:'instant'}),y);await page.waitForTimeout(180);
  if(selector==='.services-motif')await page.waitForFunction(()=>{
    const motif=document.querySelector('.services-motif');
    const expected=Math.max(0,Math.min(1,(innerHeight*.9-motif.getBoundingClientRect().top)/(innerHeight*.55)));
    const curve=motif.querySelector('.motif-trace'),point=curve.getPointAtLength(expected*curve.getTotalLength());
    const matrix=motif.querySelector('[data-services-marker]').transform.baseVal.consolidate().matrix;
    return Math.abs(Number(getComputedStyle(motif).getPropertyValue('--motif-draw'))-expected)<.01&&Math.hypot(matrix.e-point.x,matrix.f-point.y)<1;
  });
}
const marker=p=>p.locator('[data-process-marker]').getAttribute('transform');
async function point(p){return (await marker(p)).match(/[-\d.]+/g).map(Number)}
function overlaps(a,b){return a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;}
try{
  await check('protected logo, asset, viewer and surrounding landing markup remain identical',async()=>{
    const hashes=JSON.parse(await readFile('docs/qa/cinematic-v2/protected-hashes.json','utf8'));
    const html=await readFile('index.html','utf8');
    const slices={
      'before-story':html.slice(html.indexOf('<body>'),html.indexOf('      <div class="case-story-scroll"')),
      'after-story':html.slice(html.indexOf('      <div class="project-details">')),
      'other-sections':html.slice(html.indexOf('    <section id="servicios"'),html.indexOf('</body>')+7)
    };
    for(const[name,expected]of Object.entries(hashes)){
      if(name.startsWith('copy:'))continue;
      let bytes;
      if(name.startsWith('html:')){
        const key=name.slice(5);if(key==='hero'||key==='form')continue;
        bytes=slices[key];assert.ok(bytes,name);
      }else bytes=await readFile(name);
      assert.equal(createHash('sha256').update(bytes).digest('hex'),expected,name);
    }
  });
  const page=await open();
  await check('page identity and decorative SVG accessibility',async()=>{
    assert.match(await page.title(),/CreatiVivid/);assert.ok((await page.locator('h1').innerText()).length>15);
    assert.equal(await page.locator('[data-landing-section]').count(),4);
    for(const svg of await page.locator('.landing-motif').all())assert.equal(await svg.getAttribute('aria-hidden'),'true');
    assert.equal(await page.locator('.landing-motif a,.landing-motif button,.landing-motif [tabindex]').count(),0);
    assert.equal(await page.locator('canvas').count(),0);
  });
  await page.screenshot({path:out+'/desktop-hero.png'});
  await check('hero parallax affects only the motif, not copy or canonical signature',async()=>{
    const before=await page.locator('.hero').evaluate(e=>parseFloat(e.style.getPropertyValue('--hero-drift')));
    await page.evaluate(()=>scrollTo({top:250,behavior:'instant'}));await page.waitForTimeout(180);
    const after=await page.locator('.hero').evaluate(e=>parseFloat(e.style.getPropertyValue('--hero-drift')));
    assert.notEqual(before,after);assert.ok(Math.abs(after)<=10);
    assert.equal(await page.locator('#hero-title').evaluate(e=>getComputedStyle(e).transform),'none');
    assert.ok(!overlaps(await page.locator('.hero-motif').boundingBox(),await page.locator('.hero-copy>.button').boundingBox()));
    for(const img of await page.locator('.wordmark img').all())assert.equal(await img.evaluate(e=>e.getAnimations().length),0);
  });
  await check('services curve and divider reveal follow normal scroll reversibly',async()=>{
    await top(page,'.services-motif',810);const early=await page.locator('#servicios').evaluate(e=>Number(e.style.getPropertyValue('--motif-draw')));
    await top(page,'.services-motif',315);const markerEnd=await page.locator('[data-services-marker]').getAttribute('transform');assert.ok(markerEnd);
    const late=await page.locator('#servicios').evaluate(e=>Number(e.style.getPropertyValue('--motif-draw')));assert.ok(late>early);
    await top(page,'.services-motif',810);
    const visibleStart=await page.locator('#servicios').evaluate(e=>Number(e.style.getPropertyValue('--motif-draw')));
    assert.notEqual(await page.locator('[data-services-marker]').getAttribute('transform'),markerEnd);
    assert.ok(visibleStart<.05,'curve starts as its own SVG enters the viewport');
    await top(page,'.services-motif',315);
    assert.ok(await page.locator('#servicios').evaluate(e=>Number(e.style.getPropertyValue('--motif-draw'))>.99),'curve completes while SVG remains visible');
    const rules=await page.locator('[data-service-reveal]').evaluateAll(els=>els.map(e=>Number(e.style.getPropertyValue('--rule-progress'))));assert.ok(rules.every(v=>v>=0&&v<=1));assert.ok(rules.some(v=>v>.9));
    await top(page,'.services-motif',810);assert.ok(await page.locator('#servicios').evaluate((e,v)=>Number(e.style.getPropertyValue('--motif-draw'))<v,late));
    await top(page,'.services-motif',315);await page.waitForTimeout(550);
    assert.ok(!overlaps(await page.locator('.services-motif').boundingBox(),await page.locator('#services-title').boundingBox()));
  });await page.screenshot({path:out+'/desktop-services.png'});
  await check('desktop process connects all three steps, marker advances and reverses',async()=>{
    await top(page,'.process',740);const start=await point(page);
    assert.equal(await page.locator('.process').getAttribute('data-route-axis'),'horizontal');
    await top(page,'.process',80);const end=await point(page);assert.ok(end[0]>start[0]+100);
    await top(page,'.process',740);assert.ok((await point(page))[0]<end[0]-100);
    await top(page,'.process',180);assert.equal(await page.locator('[data-process-station]').count(),3);
  });await page.screenshot({path:out+'/desktop-process.png'});
  await check('contact motif settles once and stops when the form receives focus',async()=>{
    await top(page,'.contact-copy',180);await page.locator('input[name=contact_name]').focus();await page.waitForTimeout(50);
    assert.equal(await page.locator('.contact-copy').getAttribute('data-motif-settled'),'true');
    assert.equal(await page.locator('.contact-motif').evaluate(e=>e.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);
    assert.ok(!overlaps(await page.locator('.contact-motif').boundingBox(),await page.locator('#project-form').boundingBox()));
  });await page.screenshot({path:out+'/desktop-contact.png'});
  await check('desktop translations keep content and motifs within the viewport',async()=>{
    for(const locale of ['en','de','ja','es']){await page.locator('#language').selectOption(locale);await page.waitForTimeout(100);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok((await page.locator('.process-heading').innerText()).length>0);}
  });await page.context().close();
  const mobile=await open({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  await mobile.screenshot({path:out+'/mobile-hero.png'});
  await top(mobile,'#servicios',80);await mobile.waitForTimeout(550);await mobile.screenshot({path:out+'/mobile-services.png'});
  await check('mobile process uses a vertical route aligned to all three steps',async()=>{
    await top(mobile,'.process',700);const start=await point(mobile);
    assert.equal(await mobile.locator('.process').getAttribute('data-route-axis'),'vertical');
    const offsets=await mobile.locator('.process').evaluate(e=>{const r=e.querySelector('[data-process-route]').getBoundingClientRect();return [...e.querySelectorAll('[data-process-step]')].map((step,i)=>{const title=step.querySelector('h3').getBoundingClientRect();const node=e.querySelectorAll('[data-process-station]')[i];return Math.abs(r.top+Number(node.getAttribute('cy'))-(title.top+title.height/2));});});assert.ok(offsets.every(v=>v<4),'route stations align with the step headings');
    await top(mobile,'.process',-120);const end=await point(mobile);assert.ok(end[1]>start[1]+80);assert.ok(Math.abs(end[0]-start[0])<15);
    await top(mobile,'.process',100);assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  });await mobile.screenshot({path:out+'/mobile-process.png'});
  await top(mobile,'.contact-copy',100);await mobile.waitForTimeout(1000);await mobile.screenshot({path:out+'/mobile-contact.png'});
  await check('mobile motifs do not overlap hero CTA, service heading or contact form',async()=>{
    for(const[a,b]of [['.hero-motif','.hero-copy>.button'],['.services-motif','#services-title'],['.contact-motif','#project-form']])assert.ok(!overlaps(await mobile.locator(a).boundingBox(),await mobile.locator(b).boundingBox()),a);
    for(const lang of ['en','de','ja','es']){await mobile.locator('#language').selectOption(lang);await mobile.waitForTimeout(100);assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  });await mobile.context().close();
  const reduce=await open({reducedMotion:'reduce'});
  await check('reduced motion is static, readable and keeps a completed route',async()=>{
    for(const selector of ['.hero','#servicios','.process','.contact-copy']){await top(reduce,selector,100);assert.equal(await reduce.locator('[data-landing-section]').evaluateAll(els=>els.flatMap(e=>e.getAnimations({subtree:true})).filter(a=>a.playState==='running').length),0);}
    assert.equal(await reduce.locator('.hero').evaluate(e=>Number.parseFloat(e.style.getPropertyValue('--hero-drift'))),0);
    assert.equal(await reduce.locator('.process').getAttribute('data-route-progress'),'1.0000');
  });await reduce.context().close();
  const nojs=await open({viewport:{width:390,height:844},javaScriptEnabled:false});
  await check('no JavaScript keeps all services, steps, contact fields and static motifs',async()=>{
    assert.equal(await nojs.locator('[data-service-reveal]').count(),3);assert.equal(await nojs.locator('[data-process-step]').count(),3);
    assert.equal(await nojs.locator('.hero-motif').getAttribute('aria-hidden'),'true');assert.ok(await nojs.locator('#project-form').isVisible());
    assert.ok(await nojs.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  });await nojs.context().close();
  assert.deepEqual(errors,[],'unexpected console/page errors');
}catch(e){results.push({status:'fail',error:e.stack});console.error(e);process.exitCode=1;}finally{await writeFile(out+'/results.json',JSON.stringify({engine,results,errors},null,2));await browser.close();clearTimeout(deadline);}
