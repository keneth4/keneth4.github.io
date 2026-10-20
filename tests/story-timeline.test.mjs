import test from 'node:test';
import assert from 'node:assert/strict';
import { POSES, cameraAt, clampPose, passAt, progressAt, revealAt, phaseAt, REVEAL_START, REVEAL_END } from '../motion/story-timeline.mjs';
test('sticky progress uses actual panel height and clamps anchor jumps', () => {
  assert.equal(progressAt(20, 2400, 800), 0);
  assert.equal(progressAt(-.4, 2400, 800), 0);
  assert.equal(progressAt(-800, 2400, 800), .5);
  assert.equal(progressAt(-2500, 2400, 800), 1);
});
test('poses preserve declared keyframes and clamp outside timeline', () => {
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

test('shots distinguish whole object, low angle, overhead and close-up over the extended scrub', () => {
  assert.equal(Math.max(...POSES.map(p=>p.yawDeg))-Math.min(...POSES.map(p=>p.yawDeg)),180);
  assert.equal(Math.max(...POSES.map(p=>p.elevationDeg))-Math.min(...POSES.map(p=>p.elevationDeg)),58);
  assert.ok((POSES.at(-1).p-POSES[0].p)*5>3.2);
});

test('early scroll already moves the camera instead of holding A for a viewport', () => {
  assert.deepEqual(cameraAt(REVEAL_END),cameraAt(0));
  assert.ok(cameraAt(.06).yawDeg>93);
  assert.ok(cameraAt(.06).zoom>1.02);
  assert.equal(phaseAt(.06),2);
});
test('wide establishing frame reaches a genuinely closer detail frame', () => {
  assert.ok(cameraAt(.38).zoom>1.2);
  assert.ok(cameraAt(.72).elevationDeg>=85);
  assert.ok(cameraAt(.9).zoom<.8);
});

import { SHOTS, shotAt, presentationTarget, advancePresentation } from '../motion/story-timeline.mjs';
test('shots reference the original poses and clamp all selection inputs',()=>{
  SHOTS.forEach((shot,i)=>assert.equal(shot.pose,POSES[i]));
  assert.equal(shotAt(-1),0);assert.equal(shotAt(NaN),0);assert.equal(shotAt(2),3);
  assert.deepEqual(cameraAt(NaN),cameraAt(0));
  for(const [p,i]of [[0,0],[.04,0],[.38,1],[.72,2],[.9,3],[1,3]])assert.equal(shotAt(p),i);
});
test('editorial holds preserve B/C exactly and begin movement immediately after A',()=>{
  for(const [a,b,i]of [[0,.04,0],[.38,.425,1],[.72,.765,2],[.9,1,3]]){
    for(let n=0;n<=10;n++)assert.deepEqual(cameraAt(a+(b-a)*n/10),clampPose(POSES[i]));
  }
  assert.notDeepEqual(cameraAt(.0401),cameraAt(.04));
  for(const p of [.04,.38,.425,.72,.765,.9])for(const key of ['yawDeg','elevationDeg','zoom'])assert.ok(Math.abs(cameraAt(p-1e-8)[key]-cameraAt(p+1e-8)[key])<.00001);
});
test('one-pixel tolerance snaps only the shared target at every pose',()=>{
  const travel=4500;
  for(const pose of POSES){
    for(const direction of [-1,1]){
      assert.equal(presentationTarget(pose.p+direction*.99/travel,travel),pose.p);
      assert.notEqual(presentationTarget(pose.p+direction*1.01/travel,travel),pose.p);
    }
  }
});
test('presented progress converges in both directions without overshoot or endless frames',()=>{
  for(const [from,to]of [[0,.38],[.9,.38],[0,1],[1,0],[.72,.765]]){
    let q=from,frames=0;while(q!==to&&frames<200){const next=advancePresentation(q,to,16,4500);assert.ok(next>=Math.min(q,to)&&next<=Math.max(q,to));q=next;frames++;}
    assert.equal(q,to);assert.ok(frames<100);assert.deepEqual(cameraAt(q),cameraAt(to));assert.equal(shotAt(q),shotAt(to));assert.equal(advancePresentation(q,to,16,4500),q);
  }
  assert.equal(advancePresentation(.5,.5+.2/4500,0,4500),.5+.2/4500);
  assert.equal(advancePresentation(0,1,1000,4500),advancePresentation(0,1,100,4500));
});

import {travellingAt} from '../motion/story-timeline.mjs';
test('shot-specific labels are reserved for holds; travels are reversible intervals',()=>{
  for(const p of [0,.04,.38,.4,.425,.72,.74,.765,.9,1])assert.equal(travellingAt(p),-1);
  for(const[p,i]of [[.1,0],[.6,1],[.83,2]]){assert.equal(travellingAt(p),i);assert.equal(shotAt(p),i);}
});
