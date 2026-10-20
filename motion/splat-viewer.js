import { clampPose, POSES } from './story-timeline.mjs?v=cinematic3';
const VIEW = Object.freeze({ yawDeg: 90, elevationDeg: 45, fieldOfViewDeg: 30, distanceMultiplier: .65, framingMargin: .95, target: { x: 0, y: -.1, z: 0 } });
const ORIENTATION = { preset: 'flip-vertical', rotationDeg: { x: 0, y: 0, z: 180 }, flip: { x: false, y: false, z: false } };
export function createViewer(host, onFailure) {
  let runtime, pending, disposed = false, current = clampPose(POSES[0]), paused = false;
  const viewFor = pose => ({ ...VIEW, yawDeg: pose.yawDeg, elevationDeg: pose.elevationDeg, distanceMultiplier: .65 * pose.zoom });
  const abort = new AbortController();
  function setPose(pose) {
    current = clampPose(pose);
    if (!runtime || paused || disposed) return;
    runtime.setConfiguration({ view: viewFor(current), resetInitialView: true, playbackPaused: true });
  }
  return {
    async load() {
      if (pending) return pending;
      pending = (async () => {
        const { p } = await import('../assets/vendor/mollequiles/playCanvasSpzViewer-XM1S__iy.js');
        if (disposed) throw new Error('Viewer disposed');
        runtime = p.createPlayCanvasSpzViewer({ host, view: viewFor(current), orientation: ORIENTATION, interaction: { minZoom: .5, maxZoom: 1.5, minElevationDeg: 30, maxElevationDeg: 88, horizontalOrbitRangeDeg: 360, autoRotate: false, idleResetMs: 0 }, motion: { preset: 'static' }, playbackPaused: true });
        // Native controls capture wheel/pinch and start idle resets. The product uses
        // its own accessible input surface; native canvas never receives input.
        host.style.pointerEvents = 'none';
        await runtime.loadUrl(new URL('../assets/rework/ampm-mollequiles.spz', import.meta.url).href, ORIENTATION);
        if (disposed) throw new Error('Viewer disposed');
        if (runtime.getState().status !== 'ready') throw new Error(runtime.getState().error || 'No visible first frame');
        host.querySelector('canvas')?.addEventListener('webglcontextlost', () => onFailure?.(), { signal: abort.signal });
        if (current) setPose(current);
      })().catch(error => { runtime?.dispose(); runtime = null; throw error; });
      return pending;
    },
    setPose,
    setInteractive(active) { host.dataset.interactive = String(active); },
    resize() { if (current) setPose(current); },
    pause(value = true) { if (paused === value) return; paused = value; if (!value && current) setPose(current); },
    dispose() { disposed = true; abort.abort(); runtime?.dispose(); runtime = null; host.replaceChildren(); }
  };
}
