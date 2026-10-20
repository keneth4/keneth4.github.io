export const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
export const POSES = Object.freeze([
  { p: .25, yawDeg: 90, elevationDeg: 45, zoom: 1 },
  { p: .48, yawDeg: 135, elevationDeg: 34, zoom: 1.08 },
  { p: .74, yawDeg: 55, elevationDeg: 68, zoom: .82 },
  { p: .90, yawDeg: 105, elevationDeg: 48, zoom: .96 }
]);
export function clampPose(pose) {
  return { yawDeg: clamp(pose.yawDeg, -90, 270), elevationDeg: clamp(pose.elevationDeg, 30, 88), zoom: clamp(pose.zoom, .5, 1.5) };
}
export function cameraAt(p) {
  const index = p < .48 ? 0 : p < .74 ? 1 : 2;
  const a = POSES[index], b = POSES[index + 1];
  let t = clamp((p - a.p) / (b.p - a.p), 0, 1);
  t = t * t * (3 - 2 * t);
  return clampPose(Object.fromEntries(['yawDeg', 'elevationDeg', 'zoom'].map(k => [k, a[k] + (b[k] - a[k]) * t])));
}
export function progressAt(top, containerHeight, panelHeight) {
  // Scroll offsets are integer CSS pixels; layout coordinates can be fractional.
  if (top >= -1) return 0;
  return clamp(-top / Math.max(1, containerHeight - panelHeight), 0, 1);
}
export function revealAt(p) { return clamp((p - .10) / .15, 0, 1); }
// A late first frame never changes the decision for the current pass.
export function passAt(previous, p, ready, first = false) {
  if (p <= 0) return { crossed: false, posterOnly: false };
  if (first && p >= .10) return { crossed: true, posterOnly: true };
  if (!previous.crossed && p >= .10) return { crossed: true, posterOnly: !ready };
  return previous;
}
