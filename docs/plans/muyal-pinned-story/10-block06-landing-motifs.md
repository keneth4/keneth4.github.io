# Bloque 06 — sistema de motivos y movimiento de la landing

Estado: implementado en `codex/creativivid-muyal-pinned-story`. Autorización del usuario: completar hero, servicios, proceso y contacto en esta rama, conservando logo y recorrido Mollequiles. No implica publicación.

## Dirección aplicada

Sistema vectorial de curvas abiertas y puntos con clases compartidas (`landing-motif`, `motif-track`, `motif-ink`, `motif-dot`, `motif-trace`). Es decoración abstracta: no copia ni transforma el símbolo MUYAL, ni representa una nueva escritura. SVG inline mantiene un resultado estático sin JavaScript y no necesita imágenes generadas, framework ni WebGL adicional.

- Hero: trazo de 190×52 bajo la CTA, en flujo normal. Parallax solo del motivo, limitado a 10 px en desktop y 5 px en móvil; texto y firma permanecen inmóviles.
- Servicios: curva bajo el título, divisores que se dibujan con el scroll y entrada única de títulos (12 px, 480 ms). El texto nunca depende de opacity:0 ni se oculta sin JS.
- Proceso: título con la traducción ya existente de «Cómo trabajamos», ruta que conecta los tres pasos y marcador reversible. Horizontal en desktop, vertical en móvil. La geometría se recalcula tras fuentes, resize e idioma, alineando estaciones con los encabezados.
- Contacto: composición propia de curva y siete puntos; se ordena una vez al entrar (trazo 900 ms; puntos 620 ms escalonados). Queda estática y termina inmediatamente al enfocar el formulario. No hay movimiento continuo mientras se escribe.

## Arquitectura y límites

`motion/landing-motion.js` administra los cuatro sectores mediante IntersectionObserver, un rAF coalescido por evento de scroll, ResizeObserver para la ruta y Web Animations para entradas finitas. Pausa/termina animaciones con documento oculto y limpia listeners/observers al salir. Conserva bfcache.

SVG decorativos fuera de zonas interactivas, aria-hidden y no enfocables. No capturan puntero. Sin JS: copy, servicios, pasos, contacto y motivos estáticos disponibles; la ruta móvil que necesita geometría calculada se omite. Reduced-motion: motivos ordenados, recorrido de proceso completado y ninguna animación nueva. No hay otra sección sticky ni scroll locking.

La firma, fuente y logo mantienen sus bytes. También permanecen idénticos los tres módulos de Mollequiles y todo el HTML de `#proyectos`. El bloque no modifica poses, duración, gestos, carga, mini barra ni fallbacks del caso. Los hashes previos quedan en `../../qa/block06/protected-hashes.json`.

## Validación y cierre

- 11 escenarios del bloque pasan en Chromium: identidad/semántica, parallax, divisores, ruta horizontal/vertical, alineación con títulos, contacto/foco, idiomas, no-JS y reduced-motion.
- Los 19 escenarios de Mollequiles y sus 9 unit tests siguen pasando.
- Comparación inicial local, tres cargas por versión: CLS 0, sin tareas >50 ms, sin canvas inicial; ~9.6 KB adicionales de transferencia. LCP mediano 168 ms antes / 148 ms después: variación local, no una promesa de mejora en producción.
- Capturas desktop 1440×900 y móvil emulado 390×844 en `../../qa/block06/`. Prueba adicional local WebKit no completó el arranque; no se declara aprobada ni equivalente a iPhone físico.

El trabajo de diseño previsto para estas cuatro secciones queda implementado. Siguen revisión visual del usuario sobre el bloque, Safari/iPhone físico y permisos de redistribución pendientes antes del PR/publicación. No se añaden otros splats ni cambios a la identidad.
