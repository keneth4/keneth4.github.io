import { cameraAt, clampPose, passAt, progressAt, revealAt, shotAt, travellingAt, SHOTS, POSES, clamp, presentationTarget, advancePresentation } from './story-timeline.mjs?v=cinematic3';
import { createViewer } from './splat-viewer.js?v=cinematic3';
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
  const copy = section.querySelector('.case-story-copy');
  const captionBox = section.querySelector('.case-story-captions');
  const preview = section.querySelector('[data-case-preview]');
  const help = section.querySelector('#case-3d-help');
  const summary = document.querySelector('[data-case-summary]');
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
  let renderPose = cameraAt(0), lastFrame = 0, q = 0, target = 0, travel = 1;
  let lastCopyKey = '';
  let syncQ = true, wasInView = false, failedBeforeEntry = false, measuring = false, measuredWidth = 0;
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
      const focusTarget = pinned && q < POSES.at(-1).p ? section.querySelector('.case-story-actions>a') : explore;
      focusTarget.focus({ preventScroll: true });
    }
    q = target = presentationTarget(p, travel);
    pose = cameraAt(pinned ? q : 0); lastPose = ''; announce(); schedule();
  }
  function fail() {
    returnFocus(); exit(); failed = true; ready = false; loading = null;
    viewer?.dispose(); viewer = null;
    section.dataset.state = 'error'; announce('case3dError');
    failedBeforeEntry = !inView; if (failedBeforeEntry) layout(); else schedule();
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
  function writeCaption(caption, index, variant, travelling = false) {
    const prefix = `${travelling ? 'caseTravel' : 'caseShot'}${index + 1}`;
    for (const [selector, field] of [['.case-story-shot-label', 'Label'], ['[data-shot-title]', 'Title'], ['[data-shot-body]', 'Body']]) {
      const node = caption.querySelector(selector);
      node.dataset.copy = prefix + field + (field !== 'Label' && variant === 'compact' ? 'Compact' : '');
      node.textContent = words()[node.dataset.copy] || '';
    }
  }
  function applyVariant(root, variant) {
    root.dataset.copyVariant = variant;
    root.querySelectorAll('[data-case-caption]').forEach((caption, i) => writeCaption(caption, i, variant));
    const title = root.querySelector('[data-preview-title]');
    title.dataset.copy = SHOTS[0].titleKey + (variant === 'compact' ? 'Compact' : '');
    title.textContent = words()[title.dataset.copy] || '';
  }
  function layout() {
    if (measuring || disposed) return;
    measuring = true;
    const landscape = matchMedia('(any-pointer: coarse)').matches && innerWidth > innerHeight && innerHeight <= 600;
    const mobile = innerWidth <= 760 && !landscape;
    section.classList.toggle('case-story-landscape', landscape);
    section.classList.toggle('case-story-mobile', mobile);
    // Inert offscreen copy: measuring never hides a focused real control or
    // mutates an aria-live region. It contains no canvas and no duplicate IDs.
    section.dataset.pinned = 'true';
    const screenHeight = pin.getBoundingClientRect().height;
    const width = copy.getBoundingClientRect().width;
    const probe = section.cloneNode(false), content = copy.cloneNode(true);
    probe.removeAttribute('data-case-story'); probe.removeAttribute('id');
    probe.classList.add('case-story-measuring'); probe.inert = true;
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = `position:fixed;left:-100000px;top:0;width:${width}px;height:auto;margin:0;visibility:hidden;pointer-events:none;--caption-height:0px`;
    content.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    content.querySelectorAll('[aria-live]').forEach(node => node.removeAttribute('aria-live'));
    probe.append(content); section.after(probe);
    const blocks = [...content.querySelectorAll('[data-case-caption]')];
    const probeHelp = content.querySelector('.case-story-help');
    const probeControls = content.querySelector('[data-case-controls]');
    const probeExplore = content.querySelector('[data-case-explore]');
    const probePreview = content.querySelector('[data-case-preview]');
    const probeStatus = content.querySelector('[data-case-status]');
    let selected = mobile || landscape ? 'compact' : 'full', result;
    function measure(variant) {
      applyVariant(probe, variant); probe.dataset.state = 'story'; probe.dataset.presentation = 'narrative';
      probePreview.hidden = true;
      probe.style.setProperty('--caption-height', '0px');
      let captionHeight = Math.max(...blocks.map(node => node.getBoundingClientRect().height));
      for (let i = 0; i < blocks.length - 1; i++) {
        writeCaption(blocks[i], i, variant, true);
        captionHeight = Math.max(captionHeight, blocks[i].getBoundingClientRect().height);
        writeCaption(blocks[i], i, variant);
      }
      probe.style.setProperty('--caption-height', `${captionHeight}px`);
      probeHelp.hidden = true; probeControls.hidden = true; probeExplore.hidden = false;
      probeStatus.textContent = words().case3dLoading || '';
      const storyHeight = content.scrollHeight;
      probe.dataset.state = 'explore'; probeHelp.hidden = false; probeControls.hidden = false; probeExplore.hidden = true;
      probeStatus.textContent = words().case3dActive || '';
      const exploreHeight = content.scrollHeight;
      probe.dataset.state = 'error'; probe.dataset.presentation = 'preview';
      probeHelp.hidden = true; probeControls.hidden = true; probeExplore.hidden = false; probePreview.hidden = false;
      // Error and generic preview are exclusive, but measure both real states.
      const note = probePreview.querySelector('.case-story-preview-note');
      note.hidden = true; probeStatus.textContent = words().case3dError || '';
      const errorHeight = content.scrollHeight;
      note.hidden = false; probeStatus.textContent = '';
      const previewHeight = content.scrollHeight;
      const required = Math.max(storyHeight, exploreHeight, errorHeight, previewHeight) + (landscape ? 24 : mobile ? 32 : 64);
      const mediaSize = Math.min(section.clientWidth, screenHeight - required);
      const fits = !reduced.matches && !failedBeforeEntry && (mobile ? mediaSize >= 180 : (landscape ? screenHeight >= 220 : innerHeight >= 700) && required <= screenHeight);
      return { captionHeight, mediaSize, fits, required };
    }
    result = measure(selected);
    if (!result.fits && selected === 'full') { selected = 'compact'; result = measure(selected); }
    probe.remove();
    if (!result.fits) selected = 'full';
    applyVariant(section, selected); lastCopyKey = '';
    section.style.setProperty('--caption-height', `${result.captionHeight}px`);
    section.style.setProperty('--case-media-size', `${Math.max(180, result.mediaSize)}px`);
    section.dataset.requiredHeight = String(result.required);
    section.dataset.viewportHeight = String(screenHeight);
    if (result.fits !== pinned) {
      returnFocus(); exit(); pinned = result.fits; first = true; syncQ = true;
      pass = { crossed: false, posterOnly: false };
    }
    section.dataset.pinned = String(pinned); summary.hidden = !pinned;
    measuredWidth = copy.getBoundingClientRect().width;
    viewer?.resize(); measuring = false; schedule();
  }
  function update(now) {
    raf = 0;
    const dt = lastFrame ? Math.min(100, now - lastFrame) : 100;
    lastFrame = now;
    const rect = section.getBoundingClientRect();
    inView = rect.bottom > 0 && rect.top < innerHeight;
    travel = Math.max(1, rect.height - pin.getBoundingClientRect().height);
    p = pinned ? progressAt(rect.top, rect.height, pin.getBoundingClientRect().height) : 0;
    target = presentationTarget(p, travel);
    if (syncQ || (inView && !wasInView)) { q = target; syncQ = false; }
    else if (!exploring && inView && !document.hidden) q = advancePresentation(q, target, dt, travel);
    wasInView = inView;
    if (pinned) pass = passAt(pass, p, ready, first);
    first = false;
    if (!inView || document.hidden) exit();
    if (pinned && near && scrollIntent && !ready && !failed) load();
    const posterOnly = pinned && (!ready || pass.posterOnly || failed);
    const previewing = posterOnly && !exploring;
    section.dataset.presentation = previewing ? 'preview' : 'narrative';
    preview.hidden = !previewing;
    preview.querySelector('.case-story-preview-note').hidden = failed;
    help.hidden = !exploring;
    const alpha = exploring ? 1 : pinned && ready && !pass.posterOnly ? revealAt(p) : 0;
    media.style.setProperty('--canvas-opacity', alpha);
    media.style.setProperty('--poster-opacity', 1 - alpha);
    section.dataset.state = failed ? 'error' : exploring ? 'explore' : ready ? 'story' : loading ? 'loading' : 'poster';
    section.dataset.posterOnly = String(pass.posterOnly);
    progress.hidden = !pinned || exploring || !ready || pass.posterOnly || failed;
    const percent = Math.round(viewProgress(q) * 100);
    progress.style.setProperty('--view-progress', viewProgress(q));
    progressValue.textContent = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', String(percent));
    const activeShot = shotAt(q), travelIndex = travellingAt(q);
    const copyKey = `${pinned}:${previewing}:${travelIndex}:${section.dataset.copyVariant}:${document.documentElement.lang}`;
    if (lastCopyKey !== copyKey) {
      applyVariant(section, section.dataset.copyVariant);
      if (pinned && !previewing && travelIndex >= 0) writeCaption(captions[travelIndex], travelIndex, section.dataset.copyVariant, true);
      lastCopyKey = copyKey;
    }
    section.dataset.copyState = !pinned ? 'static' : previewing ? 'preview' : travelIndex >= 0 ? `travel-${travelIndex + 1}` : `shot-${activeShot + 1}`;
    progressBar.setAttribute('aria-valuetext', (words().caseProgressView || 'View {current} of {total}').replace('{current}', activeShot + 1).replace('{total}', SHOTS.length));
    progressMarks.forEach((mark, i) => { mark.dataset.reached = String(q >= SHOTS[i].pose.p); });
    const canExplore = !failed && (!pinned || (ready && q >= POSES.at(-1).p));
    if (!canExplore && document.activeElement === explore) section.querySelector('.case-story-actions>a').focus({ preventScroll: true });
    explore.hidden = !canExplore || exploring;
    explore.disabled = !!loading;
    controls.hidden = !exploring; input.hidden = !exploring;
    captions.forEach((caption, index) => { caption.hidden = pinned && (previewing || index !== activeShot); });
    viewer?.pause(!inView || document.hidden);
    if (!exploring) pose = cameraAt(pinned && !posterOnly ? q : 0);
    renderPose = { ...pose };
    if (ready && inView && !document.hidden) {
      const key = JSON.stringify(renderPose);
      if (key !== lastPose) { viewer.setPose(renderPose); lastPose = key; }
    }
    section.dataset.progress = p.toFixed(6);
    section.dataset.presentedProgress = q.toFixed(9);
    section.dataset.ready = String(ready);
    section.dataset.shot = previewing ? 'preview' : SHOTS[activeShot].id;
    section.dataset.pose = JSON.stringify(renderPose);
    if (pinned && inView && !document.hidden && !exploring && q !== target) schedule();
  }
  function schedule() { if (!disposed && !raf) raf = requestAnimationFrame(update); }
  explore.addEventListener('click', async () => {
    await load();
    if (!ready || disposed || !inView || (pinned && q < POSES.at(-1).p)) return;
    exploring = true; pose = cameraAt(pinned ? 1 : 0); lastPose = '';
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
  const resize = new ResizeObserver(() => {
    if (!measuring && Math.abs(copy.getBoundingClientRect().width - measuredWidth) > .5) layout();
  }); resize.observe(copy);
  section.querySelector('[data-case-summary-link]').addEventListener('click', () => { summary.open = true; }, { signal });
  window.addEventListener('scroll', () => { scrollIntent = true; schedule(); }, { passive: true, signal });
  for (const event of ['hashchange', 'pageshow']) window.addEventListener(event, () => { syncQ = true; schedule(); }, { passive: true, signal });
  window.addEventListener('resize', layout, { passive: true, signal });
  window.visualViewport?.addEventListener('resize', layout, { passive: true, signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) exit(); syncQ = true; schedule(); }, { signal });
  document.addEventListener('creativivid:locale', () => { announce(status.dataset.key); layout(); }, { signal });
  reduced.addEventListener('change', layout, { signal });
  function dispose() { disposed = true; abort.abort(); observer.disconnect(); resize.disconnect(); cancelAnimationFrame(raf); viewer?.dispose(); }
  window.addEventListener('pagehide', e => { if (!e.persisted) dispose(); else { exit(); viewer?.pause(); } }, { signal });
  document.fonts?.ready.then(() => { if (!disposed) layout(); });
  section.classList.add('case-story-enhanced'); explore.hidden = false; layout();
}
