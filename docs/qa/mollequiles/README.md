# Mollequiles — integration QA

Status: implemented locally; automated QA passed. Physical-device QA and asset/application-glue redistribution permission are pending. No PR or publication.

## Reproduction

- Branch: `codex/creativivid-muyal-pinned-story`, isolated checkout `/private/tmp/creativivid-muyal`.
- `node --test tests/story-timeline.test.mjs` (6 tests).
- `python3 -m http.server 8770 --bind 0.0.0.0` from the checkout.
- `PLAYWRIGHT_MODULE=/path/to/node_modules/playwright CHROMIUM_EXECUTABLE=/path/to/chrome node tests/browser-story.mjs`.
- Optional: `QA_URL`, `BASELINE_URL`, `QA_OUTPUT`. Browser script needs Playwright but adds no production dependency. Test output defaults outside the repo.
- Browser skill/plugin was not available; terminal Playwright used for the explicitly requested automation. Installed Chromium / local Playwright harness, macOS ARM64, desktop 1440×900 and touch emulation 390×844 DPR2. Emulation is not physical iOS/Android coverage.

## Passed

16 browser scenarios in `results.json`, six unit tests, and Node syntax checks. No unexpected page/console errors; intentional HTTP 503 was induced to test fallback. Browser identity/content, screenshot evidence and interactive state changes verified.

Coverage: first valid NGSP frame, renderer count, exact/fast/reverse scroll, camera drag, zoom/reset/Escape/focus, normal wheel scroll, leaving/reentering, refresh mid-story, changing reduced-motion, four locales and links, local form and privacy, static mobile square, short viewport fallback, no-JS, deferred/late asset, unavailable WebGL and GPU context loss.

No-JS exposes all captions and project links. Mobile/reduced-motion allocate no WebGL or SPZ until activation. Desktop automatic loading requires both proximity and scroll intent, so initial hero paint is not competing with engine compilation. Captions reserve the longest measured translated phase; the story opts out of native scroll anchoring. Switching to static mode leaves the original document flow intact.

The canonical logo is byte-identical to origin/main. No brand/font changes, framework migration, external runtime CDN, second renderer or duplicate hero activation.

## Performance evidence and limits

`performance.json` uses an identical load + 2.5-second settling protocol in three fresh contexts per version, alternating baseline and feature on this machine. Baseline is the original checkout (dc99176), not an assumption about an uninspected deployment.

| Measurement | Baseline | Feature |
|---|---:|---:|
| Initial LCP median | 168 ms | 140 ms |
| Initial CLS (all three runs) | 0 | 0 |
| Initial long tasks | 0 | 0 |
| Initial WebGL canvases | 0 | 0 |
| Transferred resources observed | 1,616,757 B | 2,633,935 B |

These localhost figures are not field Core Web Vitals or network/device guarantees. One baseline cold run was 1,756 ms; medians and protocol are recorded rather than interpreted as a speedup. Extra initial transfer is primarily the browser's native lazy-image prefetch of the lossless case poster. The same hero image remains the LCP element.

`results.json` also records snapshots during interaction; their LCP timestamps include capture/font settling and are not comparable to the controlled load protocol above. Initial CLS is 0; accumulated CLS after phase/mode/locale changes was ~0.054 in the final interaction run. Engine loading/decoding produced main-thread long tasks (~395 and 110 ms). The late-load poster rule protects reveal continuity, but physical slow-device responsiveness still needs validation.

## Evidence

- `desktop-hero.png`: static hero, canonical identity and link to the case.
- `desktop-story.png`: live case at the outro and opt-in control.
- `mobile-static.png`: full mobile layout before requesting 3D.
- `asset-error.png`: poster/content/links with unavailable SPZ.
- Asset/camera provenance and regenerated master poster: `../../plans/muyal-pinned-story/evidence/`.

## Remaining gates

- Complete `physical-devices.md` on physical iPhone/Safari and Android/Chrome. User was given the LAN URL and asked for device/version/results. Currently pending, not passed.
- Confirm redistribution permission for the restaurant SPZ/poster and Menu Maker application glue. Third-party engine/decoder notices are included; their licenses do not establish artwork ownership.
- Recheck performance on actual phones and slow network; fix any scroll/gesture/readability issues reported.
- Only after these gates: final review, PR to main. Publication is outside this task.
