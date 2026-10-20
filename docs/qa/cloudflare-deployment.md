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
