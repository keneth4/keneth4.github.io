import test from 'node:test';
import assert from 'node:assert/strict';
import { POSES, cameraAt, clampPose, passAt, progressAt, revealAt, phaseAt, REVEAL_START, REVEAL_END } from '../motion/story-timeline.mjs';
test('sticky progress uses actual panel height and clamps anchor jumps', () => {
  assert.equal(progressAt(20, 2400, 800), 0);
  assert.equal(progressAt(-.4, 2400, 800), 0);
  assert.equal(progressAt(-800, 2400, 800), .5);
  assert.equal(progressAt(-2500, 2400, 800), 1);
});
test('poses preserve validated keyframes and clamp outside timeline', () => {
  for (const {p,...pose} of POSES) assert.deepEqual(cameraAt(p), pose);
  assert.deepEqual(cameraAt(-1), cameraAt(.04));
  assert.deepEqual(cameraAt(2), cameraAt(.9));
  assert.deepEqual(clampPose({yawDeg:999,elevationDeg:0,zoom:9}),{yawDeg:270,elevationDeg:30,zoom:1.5});
});
test('segments are continuous and traversal is reversible', () => {
  for (const boundary of [.38,.72]) for (const k of ['yawDeg','elevationDeg','zoom']) {
    assert.ok(Math.abs(cameraAt(boundary-1e-6)[k]-cameraAt(boundary+1e-6)[k])<1e-6);
  }
  const ps=Array.from({length:101},(_,i)=>i/100);
  const forward=ps.map(cameraAt);
  assert.deepEqual([...ps].reverse().map(cameraAt).reverse(),forward);
});
test('reveal is complete before camera starts moving', () => {
  assert.equal(revealAt(REVEAL_START),0); assert.equal(revealAt(REVEAL_END),1); assert.equal(revealAt(1),1);
});
test('late ready latches poster until a full upward exit', () => {
  const initial={crossed:false,posterOnly:false};
  const late=passAt(initial,REVEAL_START,false);
  assert.equal(late.posterOnly,true);
  assert.equal(passAt(late,.9,true).posterOnly,true);
  assert.equal(passAt(late,REVEAL_START/2,true).posterOnly,true);
  assert.equal(passAt(late,1,true).posterOnly,true);
  const rearmed=passAt(late,0,true);
  assert.equal(passAt(rearmed,REVEAL_START,true).posterOnly,false);
});
test('first advanced entry keeps poster, even when renderer is ready', () => {
  assert.equal(passAt({crossed:false,posterOnly:false},.65,true,true).posterOnly,true);
  const early=passAt({crossed:false,posterOnly:false},REVEAL_START/2,false,true);
  assert.equal(passAt(early,REVEAL_START,true).posterOnly,false);
});

test('revised motion spans 80 degrees yaw and 34 degrees elevation over a longer scrub', () => {
  assert.equal(Math.max(...POSES.map(p=>p.yawDeg))-Math.min(...POSES.map(p=>p.yawDeg)),80);
  assert.equal(Math.max(...POSES.map(p=>p.elevationDeg))-Math.min(...POSES.map(p=>p.elevationDeg)),34);
  assert.ok((POSES.at(-1).p-POSES[0].p)*5>3.2);
});

test('early scroll already moves the camera instead of holding A for a viewport', () => {
  assert.deepEqual(cameraAt(REVEAL_END),cameraAt(0));
  assert.ok(cameraAt(.06).yawDeg>93);
  assert.ok(cameraAt(.06).zoom>1.02);
  assert.equal(phaseAt(.06),2);
});
test('distance pulls back, pushes in, then recovers for the outro', () => {
  assert.ok(cameraAt(.38).zoom>1.2);
  assert.ok(cameraAt(.72).zoom<.8);
  assert.ok(cameraAt(.9).zoom>1);
});
