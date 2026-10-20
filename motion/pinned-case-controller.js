import { cameraAt, clampPose, passAt, progressAt, revealAt } from './story-timeline.mjs';
import { createViewer } from './splat-viewer.js';
const section = document.querySelector('[data-case-story]');
if (section) {
  const pin = section.querySelector('[data-case-pin]');
  const media = section.querySelector('[data-case-media]');
  const host = section.querySelector('[data-case-canvas]');
  const input = section.querySelector('[data-case-input]');
  const captions = [...section.querySelectorAll('[data-case-caption]')];
  const explore = section.querySelector('[data-case-explore]');
  const controls = section.querySelector('[data-case-controls]');
  const status = section.querySelector('[data-case-status]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const abort = new AbortController(), signal = abort.signal;
  let viewer, loading, ready = false, failed = false, exploring = false;
  let pinned = false, p = 0, pass = { crossed: false, posterOnly: false };
  let first = true, raf = 0, inView = false, near = false, pose = cameraAt(0), lastPose = '';
  let pointer, disposed = false;
  let scrollIntent = scrollY > 0 || !!location.hash;
  const words = () => window.creativividCopy || {};
  function announce(key = '') { status.textContent = words()[key] || ''; status.dataset.key = key; }
  function returnFocus() {
    if (controls.contains(document.activeElement) || document.activeElement === input) explore.focus({ preventScroll: true });
  }
  function exit(focus = false) {
    if (!exploring) return;
    exploring = false; pointer = undefined;
    viewer?.setInteractive(false); input.hidden = true; controls.hidden = true;
    if (focus || controls.contains(document.activeElement) || document.activeElement === input) {
      const target = pinned && p < .8 ? section.querySelector('a') : explore;
      target.focus({ preventScroll: true });
    }
    pose = cameraAt(pinned ? p : 0); lastPose = ''; announce(); schedule();
  }
  function fail() {
    returnFocus(); exit(); failed = true; ready = false; loading = null;
    viewer?.dispose(); viewer = null;
    section.dataset.state = 'error'; announce('case3dError'); schedule();
  }
  async function load() {
    if (ready || loading || failed || disposed) return loading;
    announce('case3dLoading'); section.dataset.state = 'loading';
    viewer = createViewer(host, fail);
    loading = viewer.load().then(() => {
      if (disposed) return;
      ready = true; loading = null; announce(); schedule();
    }).catch(() => { if (!disposed) fail(); });
    return loading;
  }
  function layout() {
    // Measure all translated captions, even when an enhanced phase hides them.
    const widthOK = innerWidth > 760, heightOK = innerHeight >= 700;
    section.classList.add('case-story-measuring');
    const copy = section.querySelector('.case-story-copy');
    const captionHeight = Math.max(...captions.map(caption => caption.getBoundingClientRect().height)) + 16;
    section.style.setProperty('--caption-height', `${captionHeight}px`);
    const required = Math.max(340, copy.scrollHeight + 64);
    section.classList.remove('case-story-measuring');
    const next = widthOK && heightOK && !reduced.matches && required <= innerHeight;
    if (next !== pinned) {
      returnFocus(); exit(); pinned = next; first = true;
      pass = { crossed: false, posterOnly: false };
    }
    section.dataset.pinned = String(pinned);
    schedule();
  }
  function update() {
    raf = 0;
    const rect = section.getBoundingClientRect();
    inView = rect.bottom > 0 && rect.top < innerHeight;
    p = pinned ? progressAt(rect.top, rect.height, pin.getBoundingClientRect().height) : 0;
    if (pinned) pass = passAt(pass, p, ready, first);
    first = false;
    if (!inView || document.hidden) exit();
    if (pinned && near && scrollIntent && !ready && !failed) load();
    const alpha = exploring ? 1 : pinned && ready && !pass.posterOnly ? revealAt(p) : 0;
    media.style.setProperty('--canvas-opacity', alpha);
    // Both layers share one square and the same background; no geometry morph.
    media.style.setProperty('--poster-opacity', 1 - alpha);
    section.dataset.state = failed ? 'error' : exploring ? 'explore' : ready ? 'story' : loading ? 'loading' : 'poster';
    section.dataset.posterOnly = String(pass.posterOnly);
    const canExplore = !failed && (!pinned || (ready && p >= .8));
    if (!canExplore && document.activeElement === explore) section.querySelector('a').focus({ preventScroll: true });
    explore.hidden = !canExplore;
    explore.disabled = !!loading;
    controls.hidden = !exploring;
    input.hidden = !exploring;
    const phase = p < .20 ? 0 : p < .45 ? 1 : p < .80 ? 2 : 3;
    captions.forEach((caption, index) => { caption.hidden = pinned && index !== phase; });
    viewer?.pause(!inView || document.hidden);
    if (ready && inView && !document.hidden) {
      if (!exploring) pose = cameraAt(pinned ? p : 0);
      const key = JSON.stringify(pose);
      if (key !== lastPose) { viewer.setPose(pose); lastPose = key; }
    }
    section.dataset.progress = p.toFixed(4);
    section.dataset.ready = String(ready);
  }
  function schedule() { if (!disposed && !raf) raf = requestAnimationFrame(update); }
  explore.addEventListener('click', async () => {
    await load();
    if (!ready || disposed || !inView || (pinned && p < .8)) return;
    exploring = true; pose = cameraAt(pinned ? p : 0); lastPose = '';
    viewer.setInteractive(true); input.hidden = false; controls.hidden = false;
    announce('case3dHelp'); input.focus({ preventScroll: true }); schedule();
  }, { signal });
  function move(deltaYaw = 0, deltaElevation = 0, deltaZoom = 0) {
    pose = clampPose({ yawDeg: pose.yawDeg + deltaYaw, elevationDeg: pose.elevationDeg + deltaElevation, zoom: pose.zoom + deltaZoom }); schedule();
  }
  input.addEventListener('pointerdown', e => { if (e.isPrimary && e.button === 0) pointer = { id: e.pointerId, x: e.clientX, y: e.clientY, locked: false }; }, { signal });
  input.addEventListener('pointermove', e => {
    if (!pointer || pointer.id !== e.pointerId || !exploring) return;
    const dx = e.clientX - pointer.x, dy = e.clientY - pointer.y;
    if (!pointer.locked) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 5) { pointer = undefined; return; }
      if (Math.abs(dx) < 5) return;
      pointer.locked = true; input.setPointerCapture(e.pointerId);
    }
    move(-dx * .2); pointer.x = e.clientX; pointer.y = e.clientY;
  }, { signal });
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) input.addEventListener(name, () => { pointer = undefined; }, { signal });
  section.addEventListener('keydown', e => {
    if (!exploring) return;
    if (e.key === 'Escape') { e.preventDefault(); exit(true); return; }
    if (e.target !== input) return;
    const actions = { ArrowLeft: () => move(-3), ArrowRight: () => move(3), ArrowUp: () => move(0, 3), ArrowDown: () => move(0, -3), '+': () => move(0, 0, -.05), '-': () => move(0, 0, .05), Home: () => { pose = cameraAt(pinned ? 1 : 0); schedule(); } };
    if (actions[e.key]) { e.preventDefault(); actions[e.key](); }
  }, { signal });
  section.querySelector('[data-case-reset]').addEventListener('click', () => { pose = cameraAt(pinned ? 1 : 0); schedule(); }, { signal });
  section.querySelector('[data-case-exit]').addEventListener('click', () => exit(true), { signal });
  section.querySelector('[data-case-zoom-in]').addEventListener('click', () => move(0, 0, -.05), { signal });
  section.querySelector('[data-case-zoom-out]').addEventListener('click', () => move(0, 0, .05), { signal });
  const observer = new IntersectionObserver(entries => { near = entries[0].isIntersecting; schedule(); }, { rootMargin: '500px' });
  observer.observe(section);
  const resize = new ResizeObserver(layout); resize.observe(section.querySelector('.case-story-copy'));
  window.addEventListener('scroll', () => { scrollIntent = true; schedule(); }, { passive: true, signal });
  for (const event of ['hashchange', 'pageshow']) window.addEventListener(event, schedule, { passive: true, signal });
  window.addEventListener('resize', layout, { passive: true, signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) exit(); schedule(); }, { signal });
  document.addEventListener('creativivid:locale', () => { announce(status.dataset.key); layout(); }, { signal });
  reduced.addEventListener('change', layout, { signal });
  function dispose() { disposed = true; abort.abort(); observer.disconnect(); resize.disconnect(); cancelAnimationFrame(raf); viewer?.dispose(); }
  window.addEventListener('pagehide', e => { if (!e.persisted) dispose(); else { exit(); viewer?.pause(); } }, { signal });
  section.classList.add('case-story-enhanced'); explore.hidden = false; layout();
}
