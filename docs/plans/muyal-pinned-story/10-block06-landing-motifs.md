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

El trabajo de diseño previsto para estas cuatro secciones queda implementado. La revisión visual del usuario está aprobada. Siguen Safari/iPhone físico y permisos de redistribución pendientes antes del PR/publicación. No se añaden otros splats ni cambios a la identidad.

## Revisión landscape y visibilidad de servicios

La revisión del usuario aprueba los motivos y detecta dos casos: móvil horizontal entraba en fallback por altura; el dibujo de servicios se percibía estático en desktop. Se conserva el dibujo reversible durante la entrada del SVG y se añade un punto que recorre la curva, sin bucle ni movimiento con reduced-motion.

En touch horizontal hasta 1100 px de ancho y 600 px de alto, Mollequiles usa dos columnas compactas. El pin se permite desde 300 px de altura solo cuando todos los captions y controles medidos caben; por debajo o con texto ampliado se conserva el fallback. Portrait, poses, interpolación, poster y gestos no cambian. El controlador deja de ser byte-idéntico al snapshot de bloque 06 únicamente por esta decisión de layout; visor, timeline, HTML del caso e identidad siguen protegidos por hashes. La comprobación física de esta revisión en Poco está aprobada; Safari/iPhone sigue pendiente.

Verificación local de la revisión: 20 escenarios de story, 11 de motivos y 9 pruebas unitarias pasan en Chromium/Playwright (Browser plugin no disponible). Landscape táctil 844×390 y 740×360 mantiene recorrido/barra y captions dentro del viewport en ES/EN/DE/JA, con regreso a portrait; 844×280 conserva fallback. Se corrige también la medición de altura natural de captions superpuestos para evitar que el estiramiento del grid infle la reserva. Capturas temporales: `/private/tmp/mollequiles-browser-qa-v4/touch-landscape.png` y `/private/tmp/block06-qa/desktop-services.png`. No equivale a Safari/iPhone físico.

## Aprobación del usuario — 20 de octubre de 2026

El usuario revisó la corrección en Poco X6 Pro físico y desktop e informó que todo funciona bien. Se registra aprobación de la revisión de landscape y servicios, además de la aprobación visual previa del bloque. No se proporcionaron versiones de Android/navegador ni detalles del equipo desktop. No se extiende esta aprobación a Safari/iPhone ni al icono del crédito en el sitio independiente de AM:PM.

## Autorización de integración — 20 de octubre de 2026

El usuario reporta funcionamiento correcto en iPhone físico tras las aprobaciones de Poco y desktop, y solicita integrar a main. Esta instrucción sustituye la espera anterior para abrir PR/integrar. No se inventan versiones de dispositivos ni se declara resuelta la documentación de permisos del asset. GitHub Pages está configurado para publicar desde main.
