# Recorrido vigente: respuesta temprana y distancia por pose

Sustituye los porcentajes, zoom y entrada de la revisión 07. El usuario confirmó que el recorrido, la órbita de dos ejes y el pinch funcionan bien en desktop y en su Poco X6 Pro. Queda refinamiento visual: demasiado scroll sin respuesta al inicio y más contraste entre distancias.

## Inicio y cámara

- Conservar el tramo de 600svh y scroll nativo de V2. La cámara aprovecha más de ese recorrido; no acortar las vistas intermedias.
- Poster inicial estable hasta p=.005. Revelar entre .005–.04 (17.5svh de recorrido efectivo). A queda alineada con el poster hasta completar el reveal.
- El movimiento empieza en .04: 20svh desde el inicio sticky, frente a 125svh anteriores. Reducir por tanto el tramo inicial sin cámara de 1.25 pantallas a .20 pantallas.
- A→B usa seno de cuarto de onda (sin sobrepasar límites) para dar respuesta visible pronto y desacelerar en B. Los demás segmentos conservan smoothstep y el seguimiento temporal de 85 ms. Las uniones siguen siendo continuas y el scroll reversible.

| Pose | p | Yaw | Elevación | Distancia relativa a A |
|---|---:|---:|---:|---:|
| A | .04 | 90° | 45° | 1.00 |
| B | .38 | 135° | 34° | 1.24 (alejamiento) |
| C | .72 | 55° | 68° | .78 (acercamiento) |
| D | .90 | 105° | 48° | 1.04 (recuperar distancia) |

Estos valores multiplican la distancia base .65; no son factores de magnificación. A/poster no cambian ni requieren regeneración. El acercamiento C recorta parte del plato y conserva el alimento como protagonista; validar nuevamente si se altera el visual o el aspecto cuadrado.

## Estados e interacción

Conservar scroll móvil, exploración opt-in, pinch y giro en ambos ejes, fallback por espacio/reduced-motion, teclado y límites originales. El latch de carga tardía se evalúa ahora al cruzar .005; conservar poster esa pasada si no hay primer frame. La precarga por intención de scroll/proximidad de 1200 px sigue vigente.

Centralizar la fase del caption con los mismos umbrales del reveal, evitando que texto y cámara usen mapas anteriores. El primer movimiento debe apreciarse ya en p=.06.

## Evidencia y cierre

- Nueve unit tests: continuidad, reversibilidad, límites, inicio temprano, dolly alejar→acercar→recuperar y latch actualizado.
- Repetir los 18 escenarios de navegador que cubren móvil/touch, navegación, fallbacks y formulario.
- Capturar A, movimiento inicial, B, C, D y puntos intermedios; comprobar composición y ausencia de agujeros grandes. Evidencia en `../../qa/mollequiles/v3/`.
- V3 revisada y aprobada visualmente por el usuario en desktop y móvil, además de la validación funcional previa en Poco X6 Pro. iPhone/Safari físico y permisos de redistribución siguen pendientes; después corresponde revisión final del diff y actualización contra main antes del PR. Publicación fuera de alcance.
