# Mollequiles — integration QA (revisión visual v3)

**V3 vigente:** entrada de cámara a .04 en lugar de .25, reveal .005–.04 y distancias A=1 / B=1.24 / C=.78 / D=1.04. El movimiento inicial responde pronto y los captions usan los mismos umbrales. Plan completo en [08-early-response-and-dolly.md](../../plans/muyal-pinned-story/08-early-response-and-dolly.md).

18 escenarios de navegador y 9 unit tests pasan. Evidencia en `v3/results.json` y `v3/zoom-camera-contact-sheet.jpg`. Las muestras del arranque y del dolly muestran cambio visible temprano y composiciones distintas sin agujeros grandes observados; C conserva el recorte de detalle.

El usuario confirmó el funcionamiento de scroll/órbita/pinch en desktop y Poco X6 Pro para V2. Sus observaciones restantes motivaron este refinamiento visual. Aceptación visual V3, iPhone/Safari y permisos de redistribución siguen pendientes; no PR/publicación.

## Historial V2

La revisión vigente implementa historia con scroll en móvil, cámara más amplia y 600svh de recorrido. Exploración voluntaria permite órbita en dos ejes y pinch; los botones de zoom no aparecen en pantallas táctiles. Plan vigente: [07-mobile-and-motion-revision.md](../../plans/muyal-pinned-story/07-mobile-and-motion-revision.md).

**V2 automatizado:** 18 escenarios de navegador y 7 unit tests pasan. `v2/results.json` contiene el detalle. La prueba de dos dedos usa Input.dispatchTouchEvent de Chromium, no eventos sintéticos DOM. Verifica cambio de zoom y elevación/yaw, canvas visible durante la historia, reentrada, scroll de un dedo sobre el plato durante la historia, traducciones móviles, fallbacks y regresiones.

`v2/wide-camera-contact-sheet.jpg` compara A, B, C, D y puntos intermedios. El lateral B y la vista superior C son claramente distintos; no se observaron agujeros grandes en esas capturas. C recorta el borde del plato deliberadamente. A/poster no cambian. `v2/mobile-story.png` y `v2/mobile-explore.png` documentan los modos separados. Una tolerancia de 1 CSS px en el inicio evita que offsets fraccionales impidan rearmar la pasada.

**QA físico:** el usuario probó V1 en Poco X6 Pro y reportó las limitaciones que motivaron V2. Retest V2 e iPhone/Safari siguen pendientes, igual que permisos de redistribución. No PR ni publicación.

La medición inicial controlada de V1 se conserva abajo como referencia; no se presenta como perfil de rendimiento de la nueva cámara en teléfonos. Se redujo además la configuración redundante de cámara al invocar pause(false) sin cambio de estado.

## Evidencia histórica de V1

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
