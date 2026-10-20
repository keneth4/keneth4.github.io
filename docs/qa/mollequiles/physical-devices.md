# QA físico asistido — pendiente

Vista temporal en la red Wi-Fi del equipo: http://192.168.100.3:8770
No es un despliegue público. Mantener este equipo y el servidor encendidos.
Si cambia la IP, ejecutar `ipconfig getifaddr en0` y usar `http://IP:8770`.
Servidor: `python3 -m http.server 8770 --bind 0.0.0.0 --directory /private/tmp/creativivid-muyal`.
Los hosts localhost, .local y direcciones privadas usan validación local del formulario, sin envío.

## Registro requerido

| Dispositivo | Modelo | SO | Navegador/versión | Resultado |
|---|---|---|---|---|
| iPhone físico | Pendiente | Pendiente | Safari, pendiente | Pendiente del usuario |
| Android físico | Pendiente | Pendiente | Chrome, pendiente | Pendiente del usuario |

La emulación de Chromium no sustituye estos resultados. No cerrar feature ni abrir PR antes de completarlos.

## Checklist (cada teléfono)

- Abrir la página en vertical: hero e identidad intactos; texto legible, sin desbordamiento horizontal.
- Llegar al caso: poster cuadrado visible sin pin; explicación y enlace a AM:PM accesibles sin 3D.
- Pulsar Explorar: estado de carga anunciado y primer frame visible antes de controles.
- Arrastre horizontal rota; un dedo vertical permite bajar por la página, incluso empezando sobre el plato.
- Pinch y rueda no cambian zoom del visor; botones +/− acercan/alejan dentro de límites.
- Reset vuelve a A; salir devuelve poster, foco visible y controles ocultos.
- Salir del caso hacia arriba/abajo pausa la escena; volver no activa exploración automáticamente.
- Rotar el teléfono y expandir/contraer barras del navegador: sin recortes de texto ni controles inaccesibles.
- Aumentar tamaño de texto/zoom: leer todo y contactar sigue siendo posible.
- Activar movimiento reducido antes de cargar: sin pin, sin recorrido; 3D solo al pulsar.
- Probar ES/EN/DE/JA, especialmente DE y JA; navegación y privacidad mantienen el idioma.
- Probar red lenta: poster y contenido siguen presentes; carga no bloquea scroll.
- Completar formulario con datos ficticios: debe decir vista local y no enviar.
- Si dispones de teclado/lector de pantalla: etiquetas, estado de carga, salida y foco comprensibles.

Anotar por fallo: pasos, orientación, idioma, captura y resultado esperado/observado.
