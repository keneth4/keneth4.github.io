# Diferencia local / producción — 20 de octubre de 2026

## Causa y evidencia

Después del PR #6, creativivid.com servía el HTML actualizado, CSS y SPZ, pero devolvía 404 para `motion/landing-motion.js`, `motion/pinned-case-controller.js` y `motion/story-timeline.mjs`. Chromium confirmó errores 404, ausencia de inicialización de `[data-case-story]` y cero canvas. El paquete de Cloudflare excluía `motion/`: la prueba local desde la raíz no reproducía esa omisión.

GitHub Pages completó su despliegue, pero no tiene CNAME configurado para creativivid.com. Su éxito no valida el dominio servido por el Worker Cloudflare `landing`. El check de Cloudflare fallido tampoco era inocuo: el log del build `5665c5bd-0210-4a02-a3f4-04ac3c2d9d97` muestra `npx wrangler versions upload` sin `.cloudflare-deploy` preparado.

## Corrección

- Incluir `motion/` en `scripts/build-cloudflare-assets.mjs`.
- Ejecutar preparación y comprobación del paquete con `build.command` de Wrangler, tanto en deploy como versions upload.
- Comprobar presencia y bytes del grafo de módulos propios, runtime, avisos, SPZ y posters antes de publicar. Los imports condicionales Node de terceros no son dependencias del navegador; se comprueba el runtime mediante browser QA.
- Esperar al estado geométrico del marcador de servicios en su test, evitando una carrera de render con espera fija.

## Validación previa

Wrangler 4.151.2 dry-run; 2 pruebas de paquete; 20 escenarios de story y 11 de motivos servidos desde `.cloudflare-deploy` (127.0.0.1:8773). Browser plugin no disponible; Playwright/Chromium utilizado. Sin cambios en poses, timeline, controles, formulario ni diseño de producción.

Capturas y resultados temporales: `/private/tmp/production-before.png`, `/private/tmp/cloudflare-package-story/`, `/private/tmp/cloudflare-package-motifs/`. Validación remota del dominio real obligatoria tras desplegar; no sustituirla por el estado de GitHub Pages.

## Revisión de landscape con barras del navegador

El usuario reporta fallback en landscape en Android/iPhone reales. Se reproduce al bajar de 300 px: el mínimo fijo desactivaba el pin incluso cuando cabía el panel. La prueba anterior de 360/390 px no cubría la altura útil con barras abiertas. Además, la medición forzaba simultáneamente instrucciones y controles incompatibles con el botón de activación.

Corrección: medir recorrido y exploración por separado, conservar foco, reservar padding real de 24 px en landscape, permitir pin desde 220 px solo si ambos estados caben, escuchar resize de visualViewport y reconocer touch landscape sin máximo arbitrario de ancho. Durante exploración horizontal, instrucciones/controles reemplazan captions y slot de progreso; al salir se restaura el recorrido. Reduced-motion y alturas insuficientes conservan fallback.

QA local: 20 escenarios de story aprobados, incluyendo 844×270, 740×270, 932×299 y 1200×320 en ES/EN/DE/JA; regreso a portrait; simulación de 100svh=250 con innerHeight=390; fallback a 200 px. Nueve pruebas de timeline y dos de paquete aprobadas. Versiones CSS/controlador actualizadas a landscape2. El retest físico del arreglo no se infiere de la emulación.
