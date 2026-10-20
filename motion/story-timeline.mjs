export const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
export const POSES = Object.freeze([
  { p: .45, yawDeg: 90, elevationDeg: 45, zoom: 1 },
  { p: .60, yawDeg: 102, elevationDeg: 42, zoom: .96 },
  { p: .70, yawDeg: 110, elevationDeg: 49, zoom: .88 },
  { p: .80, yawDeg: 98, elevationDeg: 46, zoom: .92 }
]);
export function clampPose(pose) {
  return { yawDeg: clamp(pose.yawDeg, -90, 270), elevationDeg: clamp(pose.elevationDeg, 30, 88), zoom: clamp(pose.zoom, .5, 1.5) };
}
export function cameraAt(p) {
  const index = p < .60 ? 0 : p < .70 ? 1 : 2;
  const a = POSES[index], b = POSES[index + 1];
  let t = clamp((p - a.p) / (b.p - a.p), 0, 1);
  t = t * t * (3 - 2 * t);
  return clampPose(Object.fromEntries(['yawDeg', 'elevationDeg', 'zoom'].map(k => [k, a[k] + (b[k] - a[k]) * t])));
}
export function progressAt(top, containerHeight, panelHeight) {
  return clamp(-top / Math.max(1, containerHeight - panelHeight), 0, 1);
}
export function revealAt(p) { return clamp((p - .20) / .25, 0, 1); }
// A late first frame never changes the decision for the current pass.
export function passAt(previous, p, ready, first = false) {
  if (p <= 0) return { crossed: false, posterOnly: false };
  if (first && p >= .20) return { crossed: true, posterOnly: true };
  if (!previous.crossed && p >= .20) return { crossed: true, posterOnly: !ready };
  return previous;
}
