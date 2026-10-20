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
// Arrival positions live only in POSES; editorial holds do not duplicate them.
export const SHOTS = Object.freeze(POSES.map((pose, index) => Object.freeze({
  id: ['hero', 'volume', 'detail', 'editorial'][index], pose,
  holdUntil: [POSES[0].p, .425, .765, 1][index],
  labelKey: `caseShot${index + 1}Label`, titleKey: `caseShot${index + 1}Title`, bodyKey: `caseShot${index + 1}Body`
})));
const normalized = value => Number.isFinite(value) ? clamp(value, 0, 1) : 0;
export function shotAt(value) {
  const q = normalized(value);
  let index = 0;
  for (let i = 1; i < SHOTS.length; i++) if (q >= SHOTS[i].pose.p) index = i;
  return index;
}
export function cameraAt(value) {
  const q = normalized(value), index = shotAt(q);
  const shot = SHOTS[index], next = SHOTS[index + 1];
  if (!next || q <= shot.holdUntil) return clampPose(shot.pose);
  let t = clamp((q - shot.holdUntil) / (next.pose.p - shot.holdUntil), 0, 1);
  t = index === 0 ? Math.sin(t * Math.PI / 2) : t * t * (3 - 2 * t);
  return clampPose(Object.fromEntries(['yawDeg', 'elevationDeg', 'zoom'].map(k => [k, shot.pose[k] + (next.pose[k] - shot.pose[k]) * t])));
}
// A single target tolerance drives camera, copy, marks and counter together.
export function presentationTarget(value, travel) {
  const p = normalized(value), distance = Math.max(1, travel);
  const nearest = POSES.reduce((a, b) => Math.abs(b.p - p) < Math.abs(a.p - p) ? b : a);
  return Math.abs(nearest.p - p) * distance <= 1 + Number.EPSILON * distance ? nearest.p : p;
}
export function advancePresentation(value, target, dt, travel) {
  const q = normalized(value), p = normalized(target);
  const next = q + (p - q) * (1 - Math.exp(-clamp(dt, 0, 100) / 85));
  return Math.abs(p - next) * Math.max(1, travel) <= .25 ? p : next;
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
