# QA físico asistido — revisión móvil v2

Vista temporal: http://192.168.100.3:8770 (misma red Wi-Fi). Recargar la página para recibir la revisión `20261020b`.
Mantener este equipo y el servidor encendidos. Si cambia la IP: `ipconfig getifaddr en0`.
Servidor: `python3 -m http.server 8770 --bind 0.0.0.0 --directory /private/tmp/creativivid-muyal`.
Los hosts privados y .local usan validación local del formulario, sin envío.

| Dispositivo | SO / navegador | Resultado |
|---|---|---|
| Poco X6 Pro físico | Android; versión y navegador pendientes | V1 probado por el usuario: giro solo horizontal y botones de zoom deficientes; pidió recorrido móvil y movimiento más visible. V2 pendiente de retest. |
| iPhone físico | Modelo, iOS y Safari pendientes | Pendiente |

No confundir los eventos táctiles de Chromium con validación en un teléfono físico. No cerrar feature ni abrir PR antes de completarla.

## Checklist v2

- Recargar; hero e identidad intactos. El formulario debe permanecer en modo local.
- Llegar al caso y seguir desplazando sin pulsar Explorar: ahora hay historia sticky también en móvil. El movimiento debe ser claramente visible y seguir el avance del dedo; el tramo es más largo, con posibilidad de parar y retroceder.
- Pasar lentamente por vistas lateral, superior y cierre; comprobar que no haya agujeros grandes, saltos de cámara, texto tapado o avance brusco entre dos vistas.
- Si el 3D llegó tarde, se conserva el poster esa pasada: volver por encima del inicio y entrar de nuevo para ver el recorrido cargado.
- Al final, pulsar Explorar: un dedo permite girar horizontal Y verticalmente; dos dedos permiten pinch-to-zoom sin botones +/− en pantalla táctil.
- Mientras exploras, el arrastre sobre el plato mueve el modelo. Para desplazar la página, deslizar fuera del plato o pulsar Volver al recorrido. Nunca bloquear todo el documento.
- Levantar un dedo tras el pinch: continuar arrastrando sin salto de zoom/órbita.
- Reset vuelve al cierre D; salir vuelve al progreso de scroll y recupera foco sin saltar la página.
- Girar el teléfono: si el contenido no cabe, usar fallback estático; no ocultar controles ni capturar scroll. Verificar las barras del navegador expandiéndose/contrayéndose.
- Probar zoom de texto y ES/EN/DE/JA; nada debe solaparse. En DE/JA el fallback estático por falta de espacio es aceptable.
- Con movimiento reducido: no pin ni cámara automática; exploración voluntaria y pinch siguen disponibles.
- Con red lenta: poster, explicación y enlaces siempre presentes.
- Completar formulario con datos ficticios: mensaje de validación local, sin envío.

Registrar modelo, versión del SO, navegador/versión, orientación, idioma y pasos/capturas de cualquier fallo. Volver a pedir retest cuando cambie el comportamiento.
