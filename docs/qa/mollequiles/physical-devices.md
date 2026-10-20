# QA físico asistido — revisión visual v3

Vista temporal: http://MacBook-Air-de-Keneth.local:8770 (misma red Wi-Fi). Recargar la página para recibir la revisión `20261020c`.
Mantener este equipo y el servidor encendidos. Si cambia la IP: `ipconfig getifaddr en0`.
Servidor: `python3 -m http.server 8770 --bind 0.0.0.0 --directory /private/tmp/creativivid-muyal`.
Los hosts privados y .local usan validación local del formulario, sin envío.

| Dispositivo | SO / navegador | Resultado |
|---|---|---|
| Poco X6 Pro físico | Android; versión y navegador pendientes | V1 probado por el usuario: giro solo horizontal y botones de zoom deficientes; pidió recorrido móvil y movimiento más visible. V2: el usuario confirma que scroll y gestos funcionan bien en móvil y desktop. V3: el usuario aprueba la apariencia y el recorrido en desktop y móvil. |
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

## Confirmación funcional y refinamiento visual

El usuario confirmó funcionamiento correcto de V2 en móvil y escritorio. Se conserva ese resultado; la objeción restante fue visual: entrada demasiado larga y distancias poco variadas. V3 acorta la entrada y añade alejamiento B/acercamiento C/recuperación D. El usuario revisó de nuevo en desktop y móvil y aprobó el resultado visual. Esto cierra la revisión funcional y visual reportada en Poco; el checklist completo de iPhone/Safari permanece pendiente.
