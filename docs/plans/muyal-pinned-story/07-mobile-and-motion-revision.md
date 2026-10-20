# Plan actualizado: recorrido móvil y cámara expresiva

> Entrada, porcentajes y distancias vigentes: [08-early-response-and-dolly.md](08-early-response-and-dolly.md). Móvil y gestos de esta revisión se conservan.
Esta revisión sustituye las decisiones de movimiento, móvil y gestos de 04–06. Motivación: prueba física del usuario en Poco X6 Pro (Android; versión y navegador pendientes). La versión anterior limitaba el giro horizontal y reemplazaba pinch con botones; el recorrido era demasiado sutil y corto.

## Experiencia final

- El scroll nativo controla la cámara en escritorio y móvil. Panel sticky de 100svh dentro de 600svh: 500svh de desplazamiento efectivo, en lugar de 200svh.
- El progreso de cámara ocupa p=.25–.90: 325svh efectivos para mover el splat, frente a los 70svh anteriores. Aproximadamente 4.6 veces más distancia para recorrer la cámara.
- Mantener A durante poster/reveal. Crossfade p=.10–.25; A→B p=.25–.48; B→C p=.48–.74; C→D p=.74–.90. D estable y exploración voluntaria p≥.90.
- Seguir el progreso con asentamiento exponencial de 85 ms, independiente del framerate, para evitar saltos de cámara entre eventos de scroll. No bloquear rueda, documento ni desplazar al usuario desde un temporizador.

| Pose | p | Yaw | Elevación | Zoom relativo |
|---|---:|---:|---:|---:|
| A | .25 | 90° | 45° | 1.00 |
| B | .48 | 135° | 34° | 1.08 |
| C | .74 | 55° | 68° | .82 |
| D | .90 | 105° | 48° | .96 |

Conservar el asset, orientación, target y FOV auditados, distancia base .65 y límites originales. La amplitud visible es 80° de yaw y 34° de elevación. Validar también los puntos intermedios; no aprobar vistas que exhiban agujeros grandes.

## Móvil y controles

- Móvil adopta la misma historia. Reservar un panel estable con visual cuadrado y copy/controles debajo; dimensionar el visual con el espacio disponible en 100svh, incluyendo las traducciones y los controles de exploración.
- Si no caben al menos 180 px de visual más contenido, usar fallback estático. Desktop corto (<700 px de altura) y movimiento reducido mantienen modo estático. La accesibilidad y el acceso a contacto prevalecen sobre el pin.
- Durante la historia, el visual no captura gestos: un dedo sigue desplazando la página y la cámara.
- Pulsar «Explorar en 3D» activa órbita horizontal/vertical y pinch-to-zoom. Solo esa superficie usa touch-action:none mientras está activa; el resto de la página continúa desplazándose. La ayuda explica que se puede deslizar fuera del plato para mover la página.
- No mostrar botones de zoom en dispositivos de puntero grueso. Conservarlos como alternativa de escritorio y mantener teclado, reset, salida y Escape.
- Ocultar la activación durante exploración; la salida vuelve a mostrarla y devuelve el foco. Al terminar el modo libre, volver suavemente a la pose del progreso actual. Reset usa D en historia y A en modo estático.

## Carga, fallback y alcance

- Precarga desktop/móvil solo tras intención de scroll y proximidad de 1200 px. No competir con el primer render del hero.
- Si no hay primer frame al cruzar .10, conservar poster esa pasada; rearmar solo al salir por arriba y entrar de nuevo. Refresh avanzado conserva poster. Conservar primer-frame gate, fallback WebGL/red y renderer único.
- A no cambia: el poster directo y sus derivados siguen siendo válidos. B–D ampliadas requieren nueva evidencia visual. Mantener el asset y su hash intactos.
- Los demás invariantes (marca, cuatro idiomas, formulario, privacidad, licencias y no publicación) siguen vigentes.

## QA y cierre

- Actualizar unit tests para el nuevo mapa, continuidad, amplitud, límites y latch a .10.
- Automatizar móvil con historia, órbita diagonal, dos dedos vía eventos táctiles del navegador, límites de zoom y retorno a la historia; comprobar scroll normal fuera de exploración y fallback landscape/copy sobredimensionado.
- Repetir pruebas de anclas, scroll rápido/inverso, carga tardía, refresh, reduced-motion, cuatro idiomas, error GPU/red, teclado y formulario local.
- Capturar B/C/D y muestras intermedias ampliadas; registrar evidencia de la composición y recortes. No confundir esta revisión con validación física aprobada.
- Pedir retest en Poco X6 Pro con versión de SO/navegador y completar iPhone/Safari físico. No abrir PR ni publicar hasta resolver esos resultados y los permisos de redistribución pendientes.
