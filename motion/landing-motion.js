// Decorative enhancement only. No content is hidden, no scroll is captured,
// and no canonical logo or Mollequiles node is selected by this module.
const sections = [...document.querySelectorAll('[data-landing-section]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const abort = new AbortController(), signal = abort.signal;
const active = new Set(), animations = new Set(), seen = new WeakSet();
const clamp01 = n => Math.max(0, Math.min(1, n));
const hero = sections.find(s => s.dataset.landingSection === 'hero');
const services = sections.find(s => s.dataset.landingSection === 'services');
const process = sections.find(s => s.dataset.landingSection === 'process');
const contact = sections.find(s => s.dataset.landingSection === 'contact');
const route = process?.querySelector('[data-process-route]');
const path = process?.querySelector('[data-process-path]');
const trace = process?.querySelector('[data-process-trace]');
const marker = process?.querySelector('[data-process-marker]');
const stations = [...(process?.querySelectorAll('[data-process-station]') || [])];
const steps = [...(process?.querySelectorAll('[data-process-step]') || [])];
let raf = 0, disposed = false, length = 0, stationProgress = [0,.5,1];
let contactPlayed = false, contactSettled = false;
function play(element, frames, options) {
  if (reduced.matches || !element?.animate) return;
  const animation = element.animate(frames, options);
  animations.add(animation);
  animation.finished.catch(() => {}).finally(() => animations.delete(animation));
}
function settleContact() {
  contactSettled = true;
  for (const animation of animations) if (contact?.contains(animation.effect?.target)) {
    animation.finish(); animations.delete(animation);
  }
  if (contact) contact.dataset.motifSettled = 'true';
}
function revealContact() {
  if (!contact || contactPlayed) return;
  contactPlayed = true;
  if (reduced.matches || contactSettled || document.querySelector('#project-form')?.contains(document.activeElement)) { settleContact(); return; }
  play(contact.querySelector('[data-contact-trace]'), [{strokeDashoffset:1},{strokeDashoffset:0}], {duration:900,easing:'cubic-bezier(.2,.7,.2,1)'});
  contact.querySelectorAll('[data-contact-dot]').forEach((dot,i) => {
    play(dot, [{opacity:.25,transform:`translate(${i%2 ? -10 : 10}px,12px)`},{opacity:.85,transform:'translate(0,0)'}], {duration:620,delay:i*45,easing:'cubic-bezier(.2,.7,.2,1)'});
  });
}
function drawRoute() {
  if (!route || !steps.length || disposed) return;
  process.dataset.routeReady = 'true';
  const rect = route.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const mobile = innerWidth <= 760;
  const points = steps.map(step => {
    const number = step.querySelector('.number').getBoundingClientRect();
    return mobile ? {x:12,y:number.top+number.height/2-rect.top} : {x:number.left+number.width/2-rect.left,y:rect.height/2};
  });
  let d = `M${points[0].x} ${points[0].y}`;
  const distances = [0];
  for (let i=1;i<points.length;i++) {
    const a=points[i-1],b=points[i];
    if (mobile) { const dy=(b.y-a.y)*.35; d+=` C${a.x-7} ${a.y+dy} ${b.x+7} ${b.y-dy} ${b.x} ${b.y}`; }
    else { const dx=(b.x-a.x)*.35; d+=` C${a.x+dx} ${a.y-28} ${b.x-dx} ${b.y+28} ${b.x} ${b.y}`; }
    distances.push(distances.at(-1)+Math.hypot(b.x-a.x,b.y-a.y));
  }
  route.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
  path.setAttribute('d',d); trace.setAttribute('d',d);
  points.forEach((p,i) => { stations[i].setAttribute('cx',p.x); stations[i].setAttribute('cy',p.y); });
  length = path.getTotalLength();
  stationProgress = distances.map(n=>n/(distances.at(-1)||1));
  process.dataset.routeAxis = mobile ? 'vertical' : 'horizontal';
  schedule();
}
function update() {
  raf = 0;
  if (disposed || document.hidden) return;
  for (const section of sections) {
    if (!active.has(section) && !reduced.matches) continue;
    const rect = section.getBoundingClientRect();
    const progress = clamp01((innerHeight*.8-rect.top)/(innerHeight*.5+rect.height*.6));
    if (section === hero) {
      const drift = reduced.matches ? 0 : Math.max(-1,Math.min(1,-rect.top/innerHeight))*(innerWidth<=760?5:10);
      hero.style.setProperty('--hero-drift',`${drift.toFixed(2)}px`);
    }
    if (section === services) {
      // Follow the visible motif, not the much taller services column.
      const motif = services.querySelector('.services-motif').getBoundingClientRect();
      const draw = clamp01((innerHeight * .9 - motif.top) / (innerHeight * .55));
      services.style.setProperty('--motif-draw', reduced.matches ? 1 : draw);
      const curve = services.querySelector('.motif-trace');
      const point = curve.getPointAtLength((reduced.matches ? 1 : draw) * curve.getTotalLength());
      services.querySelector('[data-services-marker]').setAttribute('transform', `translate(${point.x} ${point.y})`);
      services.querySelectorAll('[data-service-reveal]').forEach(row => {
        const top=row.getBoundingClientRect().top;
        row.style.setProperty('--rule-progress',reduced.matches ? 1 : clamp01((innerHeight*.95-top)/(innerHeight*.35)));
      });
    }
    if (section === process && length) {
      const p = reduced.matches ? 1 : progress;
      process.style.setProperty('--motif-draw',p);
      const point=path.getPointAtLength(p*length);
      marker.setAttribute('transform',`translate(${point.x} ${point.y})`);
      stations.forEach((node,i) => { node.dataset.passed=String(p>=stationProgress[i]-.005); });
      process.dataset.routeProgress=p.toFixed(4);
    }
    if (section === contact && rect.top < innerHeight*.9) revealContact();
  }
}
function schedule() { if (!disposed && !raf) raf=requestAnimationFrame(update); }
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) active.add(entry.target); else active.delete(entry.target);
  }
  schedule();
}, {rootMargin:'120px'}) : null;
for (const section of sections) { if (observer) observer.observe(section); else active.add(section); }
const reveals = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting || seen.has(entry.target)) continue;
    seen.add(entry.target); reveals.unobserve(entry.target);
    play(entry.target,[{opacity:.65,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.2,.7,.2,1)'});
  }
}, {rootMargin:'0px 0px -8% 0px',threshold:.1}) : null;
document.querySelectorAll('[data-section-reveal]').forEach(el=>reveals?.observe(el));
const resize = new ResizeObserver(drawRoute); if (process) resize.observe(process);
window.addEventListener('scroll',schedule,{passive:true,signal});
window.addEventListener('resize',()=>{drawRoute();schedule();},{passive:true,signal});
document.addEventListener('creativivid:locale',()=>{drawRoute();schedule();},{signal});
document.addEventListener('visibilitychange',()=>{
  if (document.hidden) { for (const animation of animations) animation.finish(); animations.clear(); cancelAnimationFrame(raf); raf=0; }
  else schedule();
},{signal});
document.querySelector('#project-form')?.addEventListener('focusin',settleContact,{signal});
reduced.addEventListener('change',()=>{
  if (reduced.matches) { for (const animation of animations) animation.finish(); animations.clear(); settleContact(); }
  drawRoute();schedule();
},{signal});
window.addEventListener('pageshow',()=>{drawRoute();schedule();},{signal});
window.addEventListener('pagehide',event=>{
  for (const animation of animations) animation.cancel(); animations.clear(); cancelAnimationFrame(raf); raf=0;
  if (!event.persisted) { disposed=true; abort.abort(); observer?.disconnect();reveals?.disconnect();resize.disconnect(); }
},{signal});
document.fonts?.ready.then(()=>{if(!disposed)drawRoute();});
drawRoute();schedule();
