# CreatiVivid — 02. Especificación técnica pinned / splats

Estado: arquitectura propuesta. No modifica código de producción.

## 1. Punto de partida confirmado en main

- `index.html`: hero con `#splat-stage`, `#demo-start` y bloque de caso `#proyectos` con imagen AM:PM, story y características.
- `splat-demo.js`: Three.js + Spark locales; carga `assets/rework/ampm-huevos.spz` solo bajo demanda; cámara inicial, OrbitControls, zoom limitado, teclado y pausa render fuera del viewport.
- `rework.css`: layout responsivo, paleta, MUYAL + Sniglet, estilos de caso y formulario.
- `rework.js`: strings y metadata en ES/EN/DE/JA, además de lógica del formulario.
- `design/branding/manual/manual-de-marca.md`: MUYAL y firma aprobados; movimiento discreto y reduced-motion.

El origen del contenido del sitio público no se considera prueba de una auditoría visual en móvil; realizar capturas reales antes de cerrar implementación.

## 2. Estructura DOM recomendada

Conservar `<section id="proyectos">` y su contenido semántico. Encapsular la experiencia en:

```html
<section id="proyectos" class="case" aria-labelledby="case-title">
  <!-- intro del caso: debe quedar legible sin JS -->
  <div class="case-story-scroll">
    <div class="case-story-pin">
      <figure class="case-story-media">
        <img class="case-story-poster" alt="..." />
        <div class="case-story-canvas" hidden></div>
      </figure>
      <div class="case-story-copy">
        <!-- heading y captions visibles en estado estático -->
      </div>
    </div>
  </div>
  <!-- enlace al sitio AM:PM y detalles del proyecto -->
</section>
```

No duplicar un canvas con WebGL activo en el hero. Tomar una decisión explícita: hero con captura/CTA y caso con experiencia 3D protagonista. Conservar fallback y enlaces originales.

## 3. Modelo de scroll

Implementar inicialmente con CSS `position: sticky` sobre el contenedor del caso, sin scroll hijacking ni smooth-scroll global. Como hipótesis, contenedor de 240–280vh y panel sticky de hasta 100dvh; ajustar para encabezado, tamaños pequeños y longitudes de traducción.

Calcular progreso `p` normalizado entre 0 y 1 a partir del rectángulo de sección y distancia real recorrible. No atarlo a números fijos de píxeles. La secuencia soporta scroll hacia atrás. Usar un único `requestAnimationFrame` para aplicar cambios; actualizar solo cuando el progreso cambia; manejar `resize`, cambios de idioma, foco y navegación por ancla.

Mapa inicial de keyframes (propuesto):

| p | Vista | Cámara | Texto |
|---|---|---|---|
| 0.00 | Poster 100% | inicial | Presentación |
| 0.20 | comienza crossfade | inicial | transición |
| 0.45 | SPZ 100% si cargó | keyframe A | tecnología/proyecto |
| 0.65 | SPZ | keyframe B | detalle |
| 0.80 | SPZ | keyframe C | CTA y opción de explorar |
| 1.00 | escena final | keyframe C | CTA permanente |

Elegir curvas de easing y encuadres en función del splat real. Nunca interpolar un giro completo por espectáculo; la cámara debe mantener el objeto reconocible.

## 4. Máquina de estados

`poster` → `loading` → `scroll-story` → `free-explore`; caminos alternos `static-fallback` y `error`.

- `poster`: HTML visible inmediatamente.
- `loading`: precargar visor cerca del viewport si el dispositivo cumple; no bloquear scroll.
- `scroll-story`: interpolación de cámara basada en p; deshabilitar OrbitControls mientras el scroll dicta el encuadre.
- `free-explore`: la activación por botón permite mouse/touch/teclado; rueda mantiene scroll vertical y zoom explícito es preferible al wheel zoom accidental.
- `error` y `static-fallback`: captura, captions y links siempre presentes.
- `reduced-motion`: eliminar pin largo y transiciones; exhibir poster con link o una interacción voluntaria sin autoplay.

## 5. Visor y organización de archivos propuesta

- `motion/story-progress.js`: progreso de scroll, lifecycle, enabled/disabled y fallback.
- `motion/story-timeline.js`: config declarativa de fases y keyframes.
- `motion/muyal-motifs.js` o SVG/CSS: trazos abstractos animables (no alterar el logo).
- `splat-viewer.js`: extraer de `splat-demo.js` la creación de Spark/Three, render, resize, fallbacks y controles reutilizables.
- `splat-demo.js`: adaptador temporal o reemplazo integrado; no dejar lógica duplicada.
- `assets/rework/ampm-huevos.spz`: piloto existente, sin añadir otros splats hasta recibirlos.

Mantener `index.html`, `rework.js` y `rework.css` compatibles con el sitio estático. No migrar a React solo por utilizar conceptos de Skiper UI. Para el primer prototipo, scroll calculado en JS + CSS sticky; evaluar GSAP ScrollTrigger solo si el prototipo lo exige, respetando licencias.

## 6. Rendimiento

- Poster real (y opcionalmente versión optimizada) siempre prioritario para la primera vista.
- Crear WebGL cuando el caso se acerque al viewport, con umbral de margen; diferir archivos voluminosos.
- Máximo un WebGL activo; soltar o pausar su render cuando el caso deje la zona visible.
- Limitar DPR/fps según dispositivo, evitar objetos temporales por frame, listeners repetidos o leaks.
- Cargar una escena a la vez; no precargar ambos splats por defecto.
- Fallback cuando `WebGLRenderer`, SPZ o la GPU fallan.
- Medir tamaño de recursos, LCP, CLS, responsiveness, long tasks, frame time y consumo GPU antes/después; los presupuestos numéricos se fijarán con baseline real, no se presumen.

## 7. Accesibilidad / responsive

- Mobile-first: si un pin prolongado consume demasiado viewport, usar crossfade breve sin pin; siempre preferir navegabilidad.
- `prefers-reduced-motion`: ninguna transición imprescindible ni scroll forzado.
- Teclado: controles con botones etiquetados, enfoque visible, `Escape` para salir de exploración libre cuando aplique; el scroll normal siempre funciona.
- Translations en ES/EN/DE/JA: layout sin solapes ni captions cortados; texto del case es DOM y no dibujado en canvas.
- Anchor `#proyectos` y `#contacto` navegan correctamente incluso en mitad de una sección sticky.
- `aria-live` solo anuncia estados significativos; evitar novedades continuas al hacer scroll.

## 8. Estrategia de testing

Capturas y recorrido en escritorio y móvil reales; prueba de scroll inverso y salidas rápidas; teclado y reduce-motion; sin WebGL; red lenta; fallback del asset; transferencia a formulario y cambio de idioma. Verificar que no haya saltos al cambiar la altura del sticky ni dos renders activos.

