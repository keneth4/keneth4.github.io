export const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
export const REVEAL_START = .005;
export const REVEAL_END = .04;
export const POSES = Object.freeze([
  { p: .04, yawDeg: 90, elevationDeg: 45, zoom: 1 },
  { p: .38, yawDeg: 135, elevationDeg: 34, zoom: 1.24 },
  { p: .72, yawDeg: 55, elevationDeg: 68, zoom: .78 },
  { p: .90, yawDeg: 105, elevationDeg: 48, zoom: 1.04 }
]);
export function clampPose(pose) {
  return { yawDeg: clamp(pose.yawDeg, -90, 270), elevationDeg: clamp(pose.elevationDeg, 30, 88), zoom: clamp(pose.zoom, .5, 1.5) };
}
export function cameraAt(p) {
  const index = p < .38 ? 0 : p < .72 ? 1 : 2;
  const a = POSES[index], b = POSES[index + 1];
  let t = clamp((p - a.p) / (b.p - a.p), 0, 1);
  // Begin the first dolly promptly; ease to rest at B without overshoot.
  t = index === 0 ? Math.sin(t * Math.PI / 2) : t * t * (3 - 2 * t);
  return clampPose(Object.fromEntries(['yawDeg', 'elevationDeg', 'zoom'].map(k => [k, a[k] + (b[k] - a[k]) * t])));
}
export function progressAt(top, containerHeight, panelHeight) {
  // Scroll offsets are integer CSS pixels; layout coordinates can be fractional.
  if (top >= -1) return 0;
  return clamp(-top / Math.max(1, containerHeight - panelHeight), 0, 1);
}
export function revealAt(p) { return clamp((p - REVEAL_START) / (REVEAL_END - REVEAL_START), 0, 1); }
// A late first frame never changes the decision for the current pass.
export function passAt(previous, p, ready, first = false) {
  if (p <= 0) return { crossed: false, posterOnly: false };
  if (first && p >= REVEAL_START) return { crossed: true, posterOnly: true };
  if (!previous.crossed && p >= REVEAL_START) return { crossed: true, posterOnly: !ready };
  return previous;
}

export function phaseAt(p) { return p < REVEAL_START ? 0 : p < REVEAL_END ? 1 : p < .90 ? 2 : 3; }
