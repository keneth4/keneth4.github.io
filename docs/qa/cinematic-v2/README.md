# Cinematic V2 — revisión local lista

Rama `codex/creativivid-mollequiles-cinematic-shots`, especificación `e43730d`, base de producto `main@31f41430`. Implementación disponible **solo en commits locales**: sin push de implementación, PR, merge ni despliegue. La revisión visual del usuario y el QA físico de esta versión están pendientes.

Vista Wi-Fi persistente: **http://MacBook-Air-de-Keneth.local:8776/?revision=cinematic-v2**. Sirve el paquete preparado de Cloudflare, con formulario en modo local sin envío. [Checklist de dispositivos](physical-devices.md). Mantener el Mac encendido y ambos dispositivos en la misma red.

## Cambios y contratos comprobados

- SHOTS referencia POSES; inicio .04, holds B hasta .425 y C hasta .765, posiciones y configuración del visor intactas.
- Progreso presentado q suavizado85ms compartido por cámara/copy/barra; tolerancia común1px y convergencia .25px. Se retiró el segundo filtro de pose durante timeline.
- Cuatro artículos semánticos y copy completo/compacto ES/EN/DE/JA. Cambio instantáneo, sin temporizadores de tipografía ni anuncios live al pasar de toma.
- Medición de copias inertes fuera de pantalla: cuatro bloques, recorrido/exploración/vista previa; no oculta controles reales enfocados ni modifica regiones live. Reserva máxima sin acumulación.
- Poster-latch/error no anuncia encuadres invisibles; resumen completo fuera del pin mediante ancla nativa. Late-ready permite explorar D y vuelve al poster al salir. Fallback antes de entrar, reduced-motion y no-JS conservan lectura completa.
- Los hashes y el test de invariantes protegen SPZ/posters, runtime/avisos, adaptador, logo/fuente, motivos, privacidad, HTML ajeno al story y todos los strings existentes del COPY.

## Resultados automáticos

| Suite | Resultado | Evidencia |
|---|---|---|
| Timeline | 13 unitarias | holds, continuidad, reversibilidad, clamps, snap y convergencia finita |
| Invariantes / copy | 2 unitarias | `protected-hashes.json`, 48 strings completas +32 compactas +12 estructurales |
| Paquete Cloudflare | 2 unitarias | grafo de módulos/bytes, assets y build automático |
| Story previo | 20 escenarios | `regression-story.json` |
| Cinematografía | 15 escenarios | `results.json` |
| Motivos / landing | 11 escenarios | `regression-landing.json` |
| Runtime Workers local | 5 tamaños | `package-smoke.json` |

**17 pruebas unitarias/paquete y 51 escenarios de navegador aprobados.** Browser plugin no disponible; Playwright/Chromium instalado. Workers emulado con Wrangler4.151.2 en127.0.0.1:8775, sin publicación. Se comprobaron bytes, MIME JavaScript, primer frame, cámara, progreso, explorar/reset/salida, un canvas y ausencia de errores de recursos del sitio o excepciones inesperadas. Errores503 de las pruebas negativas están registrados y filtrados explícitamente.

Matriz: desktop1440×900, tablet768×1024, portrait390×844; landscape844×390,740×360,844×270,740×270,932×299 y1200×320, con ES/EN/DE/JA. Simulación de100svh250 con innerHeight390 y texto al200%; fallback a200px. Incluye scroll inverso/saltos, sincronización en100 frames muestreados, foco, teclado, drag/pinch, cambio de orientación durante explorar, refresh avanzado, errores antes/dentro del tramo y reentrada desde ambos extremos. El ciclo bfcache/visibilidad se ejercita mediante eventos y estados simulados; no se atribuye a ello validación física del navegador.

[Baseline](../cinematic-v2-baseline.md) y `baseline/` guardan apertura/A–D antes del cambio. `after/` incluye las cuatro tomas en desktop, portrait, landscape y error con poster. La revisión local de capturas conserva el recorte intencional de C y la alineación del poster; no es aprobación visual del usuario.

## Rendimiento local

`performance.json`: tres cargas iniciales pareadas en contextos nuevos sobre este Mac, esperando decode/primer paint válido. Transferencia mediana: baseline2,653,523B → cinematic2,665,901B (**+12,378B**, sin nuevos bitmaps de producto). CLS0, sin tareas iniciales >50ms y sin canvas inicial en las seis cargas. LCP mediano156ms →144ms, con outlier1900ms en baseline: variación local, no promesa de mejora ni garantía móvil. La sincronización y finalización del asentamiento se verifican funcionalmente; no se declara un benchmark de FPS ni una medición física de consumo GPU.

## Reproducir

Configurar PLAYWRIGHT_MODULE y CHROMIUM_EXECUTABLE al Playwright/Chromium instalados. Servir el checkout para las suites de browser; preparar la carpeta antes del test de paquete:

```sh
node scripts/build-cloudflare-assets.mjs
node --test tests/story-timeline.test.mjs tests/cinematic-invariants.test.mjs tests/cloudflare-package.test.mjs
QA_URL=http://127.0.0.1:8774 node tests/browser-story.mjs
QA_URL=http://127.0.0.1:8774 node tests/browser-cinematic.mjs
QA_URL=http://127.0.0.1:8774 node tests/browser-landing-motion.mjs
QA_URL=http://127.0.0.1:8775 node tests/browser-package-smoke.mjs
```

El último comando usa Wrangler dev local con el config del repositorio; no ejecutar deploy para esta revisión. Las suites admiten QA_OUTPUT. La vista8776 persiste como servicio de sesión `com.codex.cinematic-preview`, plist y logs en `/private/tmp`; no requiere mantener un comando de terminal abierto.

## Pendientes antes de considerar main

Aprobación del ritmo/lectura por el usuario y retest físico nuevo en Poco/iPhone, con barras visibles, orientación, texto ampliado y gestos. Registrar modelos/versiones y límites de cobertura; los resultados físicos de la versión anterior no se trasladan. Esta entrega no autoriza PR ni publicación; ambas requieren una petición posterior y QA correspondiente.
