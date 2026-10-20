# Mini barra de avance de vistas

Añadir un indicador de lectura, sin interacción ni captura de gestos, junto al copy del caso. No alterar la cámara, las poses ni la longitud del recorrido visual aprobado.

- Progreso normalizado desde A (p=.04, 0%) hasta D (p=.90, 100%); permanece completo durante el outro.
- Cuatro marcas derivadas de los porcentajes reales de A/B/C/D, sin duplicar el mapa de cámara. Marcar vistas alcanzadas con tolerancia de un píxel para offsets de scroll fraccionales.
- Mostrar label localizado y porcentaje. `role=progressbar`, aria-valuenow y texto localizado «Vista n de 4» sin aria-live ni foco adicional.
- Avanzar y retroceder con el scroll nativo. No es un slider ni un enlace para saltar vistas.
- Mostrar únicamente durante una historia pinned lista. Ocultar en exploración libre, modo estático/reduced-motion, sin JS y poster retenido por carga tardía/error.
- Reservar un espacio estable al medir el panel; no desplazar el copy cuando aparece/desaparece el indicador. Reemplazar el pequeño motivo decorativo en modo historia para evitar dos líneas superpuestas.

QA: 19 escenarios de navegador pasan, incluido avance por keyframes y reversa, etiquetas y ocultación durante exploración/reduced-motion. Las nueve pruebas unitarias de cámara siguen pasando. Inspección visual en desktop 1440×900 y móvil emulado 390×844. Evidencia en `../../qa/mollequiles/v4/`. La aprobación del usuario para cámara/gestos se conserva; la barra es una adición posterior.
