import test from 'node:test';
import assert from 'node:assert/strict';
import { POSES, cameraAt, clampPose, passAt, progressAt, revealAt } from '../motion/story-timeline.mjs';
test('sticky progress uses actual panel height and clamps anchor jumps', () => {
  assert.equal(progressAt(20, 2400, 800), 0);
  assert.equal(progressAt(-800, 2400, 800), .5);
  assert.equal(progressAt(-2500, 2400, 800), 1);
});
test('poses preserve validated keyframes and clamp outside timeline', () => {
  for (const {p,...pose} of POSES) assert.deepEqual(cameraAt(p), pose);
  assert.deepEqual(cameraAt(-1), cameraAt(.45));
  assert.deepEqual(cameraAt(2), cameraAt(.8));
  assert.deepEqual(clampPose({yawDeg:999,elevationDeg:0,zoom:9}),{yawDeg:270,elevationDeg:30,zoom:1.5});
});
test('segments are continuous and traversal is reversible', () => {
  for (const boundary of [.6,.7]) for (const k of ['yawDeg','elevationDeg','zoom']) {
    assert.ok(Math.abs(cameraAt(boundary-1e-6)[k]-cameraAt(boundary+1e-6)[k])<1e-6);
  }
  const ps=Array.from({length:101},(_,i)=>i/100);
  const forward=ps.map(cameraAt);
  assert.deepEqual([...ps].reverse().map(cameraAt).reverse(),forward);
});
test('reveal is complete before camera starts moving', () => {
  assert.equal(revealAt(.2),0); assert.equal(revealAt(.45),1); assert.equal(revealAt(1),1);
});
test('late ready latches poster until a full upward exit', () => {
  const initial={crossed:false,posterOnly:false};
  const late=passAt(initial,.2,false);
  assert.equal(late.posterOnly,true);
  assert.equal(passAt(late,.9,true).posterOnly,true);
  assert.equal(passAt(late,.1,true).posterOnly,true);
  assert.equal(passAt(late,1,true).posterOnly,true);
  const rearmed=passAt(late,0,true);
  assert.equal(passAt(rearmed,.2,true).posterOnly,false);
});
test('first advanced entry keeps poster, even when renderer is ready', () => {
  assert.equal(passAt({crossed:false,posterOnly:false},.65,true,true).posterOnly,true);
  const early=passAt({crossed:false,posterOnly:false},.199,false,true);
  assert.equal(passAt(early,.2,true).posterOnly,false);
});
