# Creativivid — boceto de landing

Rama: `codex/creativivid-rework`.

## Brief acordado

Creativivid es un estudio de sitios web, experiencias online y comercio electrónico. MenuMaker es una herramienta interna, no el producto que vende la landing. Los Radiance Fields / Gaussian Splatting forman parte de la dirección del estudio; se comunican aquí mediante el caso real y la capacidad de exploración 3D, sin convertir la portada en una explicación técnica.

- Oferta actual: sitios web, comercio online y experiencias interactivas.
- AM:PM es el único caso de estudio. Enlace público: https://ampm.creativivid.com/.
- Español inicial; inglés, alemán y japonés disponibles.
- Sin tarifas públicas. Cotización por alcance, necesidades e inversión disponible.
- Objetivo de contacto: entender el proyecto y acordar una propuesta viable.
- Sin métricas de resultados, testimonios ni clientes inventados.
- AM:PM demuestra pedidos por WhatsApp; no demuestra checkout ni cobro online.

## Referencias visuales

Generadas con la herramienta integrada Image Gen (no API/CLI):

1. `01-hero.png`: portada, navegación y apertura del caso.
2. `02-case.png`: caso AM:PM, exploración y pedido.
3. `03-services-contact.png`: servicios, proceso y formulario.

Son bocetos propuestos para revisión, no una identidad aprobada por el cliente. El wordmark tipográfico y el acento lima son propuestas de esta dirección.

## Sistema del boceto

- Blanco real `#ffffff`, tinta `#161616`, acento `#e3ff67`.
- DM Sans local, con licencia incluida en `assets/rework`.
- Encabezados grandes de peso 750, tracking ajustado; controles definidos explícitamente.
- Gutter 22–48px; ancho máximo 1600px.
- Layout abierto, reglas finas, servicios en lista, botones redondeados.
- Portada → AM:PM → servicios → proceso → contacto.
- Responsive de una columna a partir de 760px; navegación visible sin menú oculto.
- Movimiento limitado a hover y scroll; respeta `prefers-reduced-motion`.

## Adaptaciones intencionales del concepto

La imagen generada de AM:PM se reemplazó por una captura real y completa del export de `deployments/ampm`, coincidente con el sitio público. No se usan fotos generadas para representar un trabajo real. Se conserva la relación 8:5 para no recortar el contenido de la captura.

El formulario conserva el endpoint de Formspree y la site key de Turnstile del sitio anterior. En localhost la validación funciona, pero no se envía información. El presupuesto es opcional y no tiene rangos que impliquen una tarifa pública. No se ha probado una entrega real a Formspree ni se ha publicado esta rama.

`styles.css`, `app.js`, los demos y la página de privacidad siguen disponibles. La nueva portada usa `rework.css` y `rework.js`; el empaquetado de Cloudflare incluye el nuevo directorio `assets`.

## Revisión pendiente con el usuario

- Dirección visual y uso del wordmark tipográfico frente al logo existente.
- Tono de textos y revisión editorial de traducciones.
- Qué acompañamiento y mantenimiento se incluyen en las propuestas.
- Validación final del canal de contacto antes de publicar.
