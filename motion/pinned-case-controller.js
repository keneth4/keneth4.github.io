import { cameraAt, clampPose, passAt, progressAt, revealAt, phaseAt, POSES, clamp } from './story-timeline.mjs';
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
  const progress = section.querySelector('[data-case-progress]');
  const progressBar = section.querySelector('[data-case-progress-bar]');
  const progressValue = section.querySelector('[data-case-progress-value]');
  const progressMarks = [...section.querySelectorAll('[data-case-progress-mark]')];
  const viewProgress = p => clamp((p - POSES[0].p) / (POSES.at(-1).p - POSES[0].p), 0, 1);
  progressMarks.forEach((mark, i) => { mark.style.left = `${viewProgress(POSES[i].p) * 100}%`; });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const abort = new AbortController(), signal = abort.signal;
  let viewer, loading, ready = false, failed = false, exploring = false;
  let pinned = false, p = 0, pass = { crossed: false, posterOnly: false };
  let first = true, raf = 0, inView = false, near = false, pose = cameraAt(0), lastPose = '';
  const pointers = new Map();
  let pinch, disposed = false;
  let renderPose = cameraAt(0), lastFrame = 0;
  let scrollIntent = scrollY > 0 || !!location.hash;
  const words = () => window.creativividCopy || {};
  function announce(key = '') { status.textContent = words()[key] || ''; status.dataset.key = key; }
  function returnFocus() {
    if (controls.contains(document.activeElement) || document.activeElement === input) explore.focus({ preventScroll: true });
  }
  function exit(focus = false) {
    if (!exploring) return;
    exploring = false; pointers.clear(); pinch = undefined;
    viewer?.setInteractive(false); input.hidden = true; controls.hidden = true; explore.hidden = false;
    if (focus || controls.contains(document.activeElement) || document.activeElement === input) {
      const target = pinned && p < .9 ? section.querySelector('a') : explore;
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
    const mobile = innerWidth <= 760;
    section.classList.toggle('case-story-mobile', mobile);
    section.classList.add('case-story-measuring');
    // Measure the stable small viewport and every translated caption/control.
    section.dataset.pinned = 'true';
    const screenHeight = pin.getBoundingClientRect().height;
    const copy = section.querySelector('.case-story-copy');
    const captionHeight = Math.max(...captions.map(caption => caption.getBoundingClientRect().height)) + 12;
    section.style.setProperty('--caption-height', `${captionHeight}px`);
    const required = copy.scrollHeight + (mobile ? 32 : 64);
    const mediaSize = Math.min(section.clientWidth, screenHeight - required);
    const next = !reduced.matches && (mobile ? mediaSize >= 180 : innerHeight >= 700 && required <= screenHeight);
    section.style.setProperty('--case-media-size', `${Math.max(180, mediaSize)}px`);
    section.classList.remove('case-story-measuring');
    if (next !== pinned) {
      returnFocus(); exit(); pinned = next; first = true;
      pass = { crossed: false, posterOnly: false };
    }
    section.dataset.pinned = String(pinned);
    schedule();
  }
  function update(now) {
    raf = 0;
    const dt = lastFrame ? Math.min(100, now - lastFrame) : 100;
    lastFrame = now;
    const rect = section.getBoundingClientRect();
    inView = rect.bottom > 0 && rect.top < innerHeight;
    p = pinned ? progressAt(rect.top, rect.height, pin.getBoundingClientRect().height) : 0;
    if (pinned) pass = passAt(pass, p, ready, first);
    first = false;
    if (!inView || document.hidden) exit();
    if (pinned && near && scrollIntent && !ready && !failed) load();
    section.querySelector('#case-3d-help').hidden = !exploring;
    const alpha = exploring ? 1 : pinned && ready && !pass.posterOnly ? revealAt(p) : 0;
    media.style.setProperty('--canvas-opacity', alpha);
    // Both layers share one square and the same background; no geometry morph.
    media.style.setProperty('--poster-opacity', 1 - alpha);
    section.dataset.state = failed ? 'error' : exploring ? 'explore' : ready ? 'story' : loading ? 'loading' : 'poster';
    section.dataset.posterOnly = String(pass.posterOnly);
    progress.hidden = !pinned || exploring || !ready || pass.posterOnly || failed;
    const percent = Math.round(viewProgress(p) * 100);
    progress.style.setProperty('--view-progress', viewProgress(p));
    progressValue.textContent = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', String(percent));
    const reachedP = p + 1 / Math.max(1, rect.height - pin.offsetHeight);
    const currentView = Math.max(1, POSES.filter(view => reachedP >= view.p).length);
    progressBar.setAttribute('aria-valuetext', (words().caseProgressView || 'View {current} of {total}').replace('{current}', currentView).replace('{total}', POSES.length));
    progressMarks.forEach((mark, i) => { mark.dataset.reached = String(reachedP >= POSES[i].p); });
    const canExplore = !failed && (!pinned || (ready && p >= .9));
    if (!canExplore && document.activeElement === explore) section.querySelector('a').focus({ preventScroll: true });
    explore.hidden = !canExplore || exploring;
    explore.disabled = !!loading;
    controls.hidden = !exploring;
    input.hidden = !exploring;
    const phase = phaseAt(p);
    captions.forEach((caption, index) => { caption.hidden = pinned && index !== phase; });
    viewer?.pause(!inView || document.hidden);
    if (ready && inView && !document.hidden) {
      if (!exploring) pose = cameraAt(pinned ? p : 0);
      // Follow native scroll with a short, time-based settle, never wheel hijacking.
      const factor = exploring || reduced.matches ? 1 : 1 - Math.exp(-dt / 85);
      let settling = false;
      for (const key of ['yawDeg', 'elevationDeg', 'zoom']) {
        const delta = pose[key] - renderPose[key];
        const epsilon = key === 'zoom' ? .0001 : .01;
        if (Math.abs(delta) > epsilon) { renderPose[key] += delta * factor; settling = true; }
        else renderPose[key] = pose[key];
      }
      const key = JSON.stringify(renderPose);
      if (key !== lastPose) { viewer.setPose(renderPose); lastPose = key; }
      if (settling && !exploring) schedule();
    }
    section.dataset.progress = p.toFixed(4);
    section.dataset.ready = String(ready);
    section.dataset.pose = JSON.stringify(renderPose);
  }
  function schedule() { if (!disposed && !raf) raf = requestAnimationFrame(update); }
  explore.addEventListener('click', async () => {
    await load();
    if (!ready || disposed || !inView || (pinned && p < .9)) return;
    exploring = true; pose = cameraAt(pinned ? p : 0); lastPose = '';
    viewer.setInteractive(true); input.hidden = false; controls.hidden = false;
    announce('case3dActive'); input.focus({ preventScroll: true }); schedule();
  }, { signal });
  function move(deltaYaw = 0, deltaElevation = 0, deltaZoom = 0) {
    pose = clampPose({ yawDeg: pose.yawDeg + deltaYaw, elevationDeg: pose.elevationDeg + deltaElevation, zoom: pose.zoom + deltaZoom }); schedule();
  }
  function beginPinch() {
    if (pointers.size !== 2) { pinch = undefined; return; }
    const [a, b] = [...pointers.values()];
    pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: pose.zoom };
  }
  input.addEventListener('pointerdown', e => {
    if (!exploring || e.button !== 0) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    input.setPointerCapture(e.pointerId); beginPinch();
  }, { signal });
  input.addEventListener('pointermove', e => {
    const previous = pointers.get(e.pointerId);
    if (!previous || !exploring) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && pinch?.distance > 0) {
      const [a, b] = [...pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > 0) { pose = clampPose({ ...pose, zoom: pinch.zoom * pinch.distance / distance }); schedule(); }
    } else if (pointers.size === 1) move(-(e.clientX - previous.x) * .25, (e.clientY - previous.y) * .22);
    e.preventDefault();
  }, { signal, passive: false });
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) input.addEventListener(name, e => { pointers.delete(e.pointerId); beginPinch(); }, { signal });
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
  const observer = new IntersectionObserver(entries => { near = entries[0].isIntersecting; schedule(); }, { rootMargin: '1200px' });
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
