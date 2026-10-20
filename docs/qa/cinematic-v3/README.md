# Revisión visual V3 — objeto completo y cuatro planos distintos

Solo local, misma rama cinematográfica. Sustituye la elección de encuadres y copy de V2 tras el feedback del usuario: A/D parecían repetidos, los nombres no siempre correspondían a la imagen y A debía mostrar comida y plato completos. No se atribuye esta revisión a una aprobación física previa.

Vista: http://MacBook-Air-de-Keneth.local:8776/?revision=cinematic-v4 (misma Wi-Fi, Mac encendido). Servidor persistente del paquete local; sin publicación.

| Toma | Cámara yaw / elevación / distancia relativa | Lectura visual |
|---|---|---|
| A | 90° /45° /1.50 | Plano de conjunto con comida y plato completos, con margen |
| B | 180° /30° /1.45 | Ángulo bajo para altura y capas |
| C | 45° /88° /1.15 | Vista superior de la distribución de ingredientes |
| D | 0° /55° /.75 | Acercamiento a ingredientes/texturas; recorte deliberado |

Los hitos, holds y progreso suavizado no cambian. A está en el límite de distancia existente: no se promete dolly-out inicial. El encuadre cambia de forma más marcada que en V2. Durante cada hold se muestra su descripción específica; entre poses, los tres textos de intervalo describen cambio de ángulo/altura/escala sin afirmar que ya está visible una pose ni usar verbos falsos al invertir el scroll. Siguen existiendo solo cuatro marcas y cuatro planos, no siete vistas. `copy.json` registra las variantes completas/compactas ES/EN/DE/JA.

## Poster y primer frame

Master nuevo2100×2100 capturado directamente del canvas vivo del mismo adaptador, esperando su refinamiento de resolución estática. WebP master sin pérdida de ningún byte RGBA y transparencia preservada. Derivados560/1120 cuadrados sin crop y codificados sin pérdida. El master anterior permanece en los documentos históricos.

`poster-capture.json` documenta la cámara, dimensiones y límites de objeto con alpha>10: (174,495)–(1923,1693), separados de los cuatro bordes. `poster-at-A.png` y `rendered-A.png` comparan el mismo visual de650px dentro de la landing: bounding boxes (55,154,593,524) / (55,154,594,524). Diferencia máxima1px: variación de rasterización, sin desplazamiento de encuadre.

El adaptador obtiene su configuración inicial de POSES[0], evitando que el primer frame use el antiguo A recortado. FOV, target, orientación, factor base y runtime/decoder/SPZ permanecen iguales. Los módulos anidados y el poster tienen versión de URL nueva para no mezclar caché anterior.

`authorized-changes.json` registra hashes anteriores/nuevos de los posters y del adaptador modificados por esta petición. El manifiesto de hashes activo de V2 se actualiza solo en esos tres archivos; sus capturas y commits anteriores conservan la referencia histórica. Los hashes restantes siguen intactos.

## QA y revisión pendiente

**51 escenarios de navegador, 18 pruebas Node de timeline/copy/paquete y 2 pruebas offline de poster aprobados.** La suite cinematográfica cubre el copy transicional además de la cámara/barra. Resultados de navegador y capturas actualizadas en esta carpeta. Se conservan las pruebas de landscape250–299px, idiomas, texto ampliado, gestos y fallbacks.

Validación visual local del agente: A ya no corta plato/comida, B muestra el perfil bajo, C una vista superior y D un recorte cercano desde otro lado. No se presenta esa valoración como aprobación del usuario. Falta retest visual en desktop/Poco/iPhone de los nuevos encuadres, legibilidad durante los desplazamientos, orientación y el reveal del poster. Sin push de implementación, PR, merge ni despliegue.

Reproducir el control geométrico: `python3 tests/poster-framing.test.py` (Pillow instalado). Las otras suites conservan los comandos de cinematic-v2 con QA_OUTPUT separado. La prueba de paquete admite imports versionados y compara los archivos locales sin query strings.

## Ajuste de entrada y cue de scroll

Se añade «Desliza para cambiar de vista» con flecha SVG y traducción ES/EN/DE/JA en el margen inferior del visual inicial. Solo aparece en recorrido disponible, hasta q=.10; no aparece en exploración, poster tardío/error, modo estático, reduced-motion o ausencia de JavaScript. No ocupa altura de layout ni recibe eventos.

En portrait ≤760px, el visual entra hasta min(96px,24vw) más arriba y recupera su posición original al llegar el inicio del sticky al borde superior. El desplazamiento depende de la distancia real de entrada, es reversible y no cambia geometría sticky, p/q, cámara, tamaño ni encuadre del poster. Landscape y desktop conservan su composición. A partir del inicio el offset vale cero, incluida exploración. Revisión física del ajuste pendiente.

## Cierre posterior

El usuario declara completadas las pruebas físicas pendientes y autoriza integrar a main. La evidencia y el estado final se consolidan en [cinematic-final](../cinematic-final/README.md); los pendientes anteriores describen el estado de aquella entrega, no el estado actual.
