# Cierre técnico y aceptación — cinematografía Mollequiles

20 de octubre de 2026. Rama `codex/creativivid-mollequiles-cinematic-shots`. Código probado: `825e71c`; los commits posteriores de cierre contienen documentación/evidencia. Base contrastada: `main@31f41430e72cd64090aa9964817006a9c810d139`, ancestro de la rama, sin conflictos. El usuario confirmó completadas las pruebas físicas pendientes y autorizó integrar a main.

## Resultado final

| Validación | Resultado | Evidencia |
|---|---|---|
| Timeline, invariantes, traducciones y paquete | 18 aprobadas | unit.log |
| Master y derivados del poster / alineación con A | 2 aprobadas | poster.log; ../cinematic-v3/framing-comparison.json |
| Funcionalidad del recorrido y formulario sin envío | 20 escenarios aprobados | story/results.json |
| Cinematografía y matriz responsive/idiomas | 15 escenarios aprobados | cinematic/results.json |
| Motivos, identidad y resto de landing | 11 escenarios aprobados | landing-motion/results.json |
| Paquete en Workers emulado con Wrangler | 5 tamaños aprobados | package-smoke/results.json |
| Cue y entrada portrait / desktop | Aprobado en ambos tamaños | entry/results.json y capturas |
| QA físico | Completado y aprobado, reportado por el usuario | physical-devices.md |

Total: **51 escenarios de navegador y 20 pruebas Node/Python**, más comprobación visual/funcional del cue. No errores inesperados de página, recursos propios ni overlay. Los 503 de descarga y fallos de contexto WebGL son casos negativos intencionales. Browser plugin no disponible: Playwright/Chromium instalado como fallback. Verificación sobre paquete estable en localhost8776 y Workers local8775, sin envío real del formulario. No se reconstruyó la carpeta servida durante las suites; todos los exits son cero (suite-exits.json).

Incluye scroll lento/rápido/inverso y saltos, anclas, refresh avanzado, reentrada, holds, q compartido, convergencia finita, una escena, foco/Escape/teclado, órbita y pinch, orientación durante explorar, altura útil250–299px, texto200%, ES/EN/DE/JA, reduced-motion, ausencia de JS, carga tardía/descarga fallida y WebGL fallido. Ciclos de visibilidad/bfcache se simulan en automatización; no equivalen a instrumentación del navegador físico.

Capturas finales A–D desktop/portrait/landscape en cinematic/. La entrada portrait acerca el visual ~94px en390px de ancho, vuelve a offset0 al inicio del sticky, y conserva geometría, cámara y poster. Desktop no recibe ese desplazamiento. El cue se muestra al inicio y se oculta al avanzar; no captura gestos.

## Rendimiento y conservación

performance.json: tres cargas iniciales pareadas en contextos nuevos, en este Mac, comparando una copia exacta de main (localhost8780) con el paquete final (localhost8776). Transferencia mediana 2,653,523 → 2,220,034 bytes (−433,489 bytes, principalmente poster regenerado); LCP mediano152 →124ms, con outlier2172ms en baseline. CLS0, sin tareas iniciales >50ms ni canvas inicial en las seis cargas. Métricas locales con ruido, no garantía de velocidad ni FPS móvil. El asentamiento finito/pausas se valida funcionalmente, sin atribuir medidas de GPU. Se conserva performance.json de V2 como referencia histórica.

package-hashes.json identifica los bytes desplegables probados. Invariantes protegen SPZ, runtime y avisos de terceros, logo/fuente, formulario, privacidad y superficies ajenas al cambio. Los únicos cambios autorizados a posters/adaptador están documentados en ../cinematic-v3/authorized-changes.json. Avisos de PlayCanvas/Zstandard/zstddec/libwebp conservados; no nuevas dependencias ni modelo. La procedencia y el pendiente documental de permisos del material suministrado se mantienen en assets/vendor/mollequiles/NOTICE.md; no se declara resuelta su titularidad por una prueba técnica.

## Integración

QA cerrado conforme a resultados automáticos y confirmación física del usuario. Integración a main autorizada en el chat. Se usará PR y merge sin reescribir historia ni modificar el checkout original. Integrar a main activa los builds existentes de Cloudflare Workers y GitHub Pages; no se ejecuta deploy manual ni se alteran DNS/configuración de producción. Modelos/versiones de teléfonos no proporcionados se mantienen como límite del registro, sin inventarlos.

## Reproducción

Configurar PLAYWRIGHT_MODULE y CHROMIUM_EXECUTABLE para la instalación local. Preparar el paquete una sola vez antes de iniciar servidores y suites:

```sh
node scripts/build-cloudflare-assets.mjs
node --test tests/story-timeline.test.mjs tests/cinematic-invariants.test.mjs tests/cloudflare-package.test.mjs
python3 tests/poster-framing.test.py
QA_URL=http://127.0.0.1:8776 node tests/browser-story.mjs
QA_URL=http://127.0.0.1:8776 node tests/browser-cinematic.mjs
QA_URL=http://127.0.0.1:8776 node tests/browser-landing-motion.mjs
QA_URL=http://127.0.0.1:8775 node tests/browser-package-smoke.mjs
```

QA_OUTPUT separa los artefactos por suite. Formulario localhost usa modo de validación local.
