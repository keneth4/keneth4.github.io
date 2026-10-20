# QA del bloque 06

Implementación: hero, servicios, proceso y contacto. Sin cambio del logo ni del caso Mollequiles. Estado: QA técnico Chromium aprobado; revisión visual/QA físico del bloque pendientes. No PR/publicación.

## Entorno y reproducción

- URL: http://MacBook-Air-de-Keneth.local:8770/?revision=block06 (misma Wi-Fi); localhost: http://127.0.0.1:8770.
- Chromium local en macOS ARM64. Desktop 1440×900; móvil emulado 390×844, touch/DPR2. No es un teléfono físico.
- Browser plugin no disponible; se usó el flujo Playwright existente y el navegador ya instalado. Sin nuevas dependencias en producción.
- `PLAYWRIGHT_MODULE=/ruta/node_modules/playwright CHROMIUM_EXECUTABLE=/ruta/chrome node tests/browser-landing-motion.mjs`
- `QA_OUTPUT` permite guardar artefactos fuera del repo. `QA_BROWSER` / `BROWSER_EXECUTABLE` permiten otro motor compatible con la instalación Playwright. El harness tiene esperas acotadas y límite global de 90 s.
- Regresión del caso: `node tests/browser-story.mjs` con las mismas variables. Unit tests: `node --test tests/story-timeline.test.mjs`.

## Resultados

11 escenarios nuevos pasan en `results.json`; 19 regresiones del caso pasan en `mollequiles-regression.json`; 9 unit tests pasan. Sin errores inesperados en consola/página en Chromium. El único HTTP 503 de la regresión es intencional para comprobar fallback.

| Comprobación | Resultado |
|---|---|
| Identidad de página, contenido visible, sin overlay de errores | Pasa |
| Logo, fuente, módulos y HTML de Mollequiles comparados por SHA-256 | Idénticos a la versión previa |
| Hero: solo el motivo cambia de posición, copy/CTA/firma sin animación | Pasa |
| Servicios: dibujo de divisores y curva reversible | Pasa |
| Proceso: marcador y estaciones alineados, horizontal/vertical | Pasa |
| Contacto: ordenación finita y parada al enfocar el formulario | Pasa |
| Motivos sin solapar CTA, títulos ni formulario | Pasa |
| Cuatro idiomas sin overflow horizontal | Pasa |
| Reduced-motion sin nuevas animaciones | Pasa |
| No-JS con contenido y formulario disponibles | Pasa |
| Scroll, pinch, órbita, fallbacks y formulario local de Mollequiles | Pasa |

Observación corregida durante QA: la caja flex del número de proceso se estiraba a la altura del párrafo; al centrarla, los nodos móviles quedaban debajo del título. Se alineó el número al inicio y se agregó una comprobación de coordenadas contra cada h3.

## Rendimiento

`performance.json`: tres cargas frescas alternadas por versión, fuentes/pintura asentadas y espera de 1.8 s. Antes: snapshot de HEAD previo al bloque, servido en 8772. Después: checkout actual, 8770. Misma máquina, viewport y motor.

| Inicial | Antes | Bloque 06 |
|---|---:|---:|
| LCP mediano | 168 ms | 148 ms |
| CLS | 0 | 0 |
| Tareas largas >50 ms | 0 | 0 |
| Transferencia observada | 2,640,609 B | 2,650,178 B |
| Canvas WebGL inicial | 0 | 0 |

El incremento es 9,569 bytes (~9.6 KB). La dispersión de LCP local/caché no permite afirmar una aceleración; no se observa una regresión inicial en esta muestra. No son Core Web Vitals de campo ni perfil de FPS/consumo en teléfonos.

## Evidencia visual y correspondencia con el plan

`before/` conserva capturas previas con movimiento reducido. Las capturas desktop/mobile actuales muestran:

- `*-hero.png`: motivo bajo CTA, fuera del copy y de la firma.
- `*-services.png`: trazo de continuidad y divisores.
- `*-process.png`: tres pasos y ruta con marcador, vertical en móvil.
- `*-contact.png`: composición ordenada, fuera del formulario.

Las curvas son abstractas, no una reconstrucción/animación del logo. El caso aprobado conserva markup y módulos exactos. El título de proceso reutiliza `processLabel` en los cuatro idiomas.

## Pendientes concretos

La prueba adicional WebKit local no progresó más allá del arranque del harness y se interrumpió; no se registra como aprobada ni se atribuye una causa técnica no verificada. Safari/iPhone físico sigue pendiente.

Revisión asistida en Poco/iPhone: recargar; comprobar que los cuatro motivos no tapen textos/CTA, que la ruta cambie horizontal/vertical al rotar, que el marcador avance/retroceda y que contacto deje de moverse al escribir. Reduced-motion debe dejarlo estático. El logo y el recorrido Mollequiles deben verse como antes.

Las aprobaciones físicas del usuario sobre Mollequiles son anteriores a este bloque; se conservan pero no se presentan como prueba física de los motivos nuevos. Permisos de redistribución de material AM:PM/Menu Maker siguen siendo el otro gate antes del PR.
