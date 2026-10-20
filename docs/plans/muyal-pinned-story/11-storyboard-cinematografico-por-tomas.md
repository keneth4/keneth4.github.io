# CreatiVivid · 11. Storyboard cinematográfico por tomas — Mollequiles

**Base:** `main@31f41430e72cd64090aa9964817006a9c810d139`. **Rama:** `codex/creativivid-mollequiles-cinematic-shots`.
**Estado:** implementado y validado automáticamente en local el 20/oct/2026; aprobación visual y QA físico pendientes. Sin PR ni despliegue. Contratos y copy canónico: [documento 12](12-especificacion-codex-shot-storytelling.md). En caso de discrepancia técnica o editorial prevalece el 12.

## 1. Dirección narrativa y límites

Evolucionar el recorrido funcional existente: cuatro planos del **mismo Mollequiles**, unidos por scroll nativo, que muestran decisiones de encuadre y potencial creativo. No reconstruir la experiencia, añadir SHARP ni otra escena WebGL. La captura no promete reiluminación física, geometría completa, macro más allá de la resolución real ni una campaña ya producida.

Conservar SPZ NGSP v4, posters reales, pose A alineada con el poster, PlayCanvas, orientación, target, FOV y clampPose vigente (yaw −90..270, elevación30..88, distancia relativa .5..1.5). A debe contener comida y plato completos con margen. C muestra el emplatado desde arriba; D permite el recorte intencional de detalle. Validar contra el asset, sin crop CSS adicional. No modificar logo MUYAL, wordmark/Sniglet ni motivos/estructura de hero, servicios, proceso y contacto. Sin blur/DOF agresivo, letterboxing, luces ficticias ni texto en canvas.

La lectura del caso, el enlace AM:PM y contacto permanecen disponibles sin completar el recorrido o disponer de WebGL.

## 2. Cuatro planos, cuatro mensajes

Los textos siguientes coinciden con la versión completa canónica del 12. Sus variantes compactas y traducciones ES/EN/DE/JA también están fijadas allí; no son decisiones delegadas a implementación.

| Toma | Pose revisada | Titular ES | Descripción ES | Razón visual |
|---|---|---|---|---|
| 01/04 · Plano de conjunto | A:90°,45°,×1.50 | Una captura. Muchas posibilidades. | Comida y plato, juntos en una vista completa. | Comida y plato completos; poster del mismo frame |
| 02/04 · Ángulo bajo | B:180°,30°,×1.45 | El volumen cambia la lectura. | Una vista más baja destaca la altura y las capas del plato. | Altura y capas desde un ángulo bajo |
| 03/04 · Vista superior | C:45°,88°,×1.15 | Desde arriba, otra composición. | La vista superior muestra la distribución de ingredientes y colores. | Distribución de ingredientes y colores desde arriba |
| 04/04 · Plano detalle | D:0°,55°,×.75 | Ahora, los ingredientes de cerca. | El acercamiento concentra el encuadre en ingredientes, capas y texturas. | Acercamiento real a ingredientes y texturas |

No quinta vista, proporciones publicitarias ni mockups ficticios. Cualquier futura tira de stills deberá exportarse realmente del modelo y validarse en otra iteración.

## 3. Recorrido y sincronización cerrados con el usuario

Se conserva el comienzo de cámara en **.04**, sin hold nuevo hasta .055. Pausas solo en B y C. Se mantienen las llegadas A=.04, B=.38, C=.72, D=.90, las dimensiones de 600svh/100svh si cabe y el reveal basado en p=.005–.04.

Distinguir **p** (scroll medido, para carga/reveal/latch) y **q** (progreso presentado, suavizado85ms). Cámara, texto, contador y marcas se calculan todos con q. No filtrar después la pose otra vez. Un único modelo declarativo referencia POSES y declara las salidas de hold B=.425 y C=.765; los umbrales no se copian en varios mapas.

| q | Cámara | Texto |
|---|---|---|
| 0–.04 | A | Toma01 |
| .04–.38 | A→B desde .04, sin hold extra | Cambio de ángulo 01–02 |
| .38–.425 | B fija | Toma02 |
| .425–.72 | B→C | Cambio de altura 02–03 |
| .72–.765 | C fija | Toma03 |
| .765–.90 | C→D | Cambio de escala 03–04 |
| .90–1 | D fija; explorar cuando ready | Toma04 |

Las categorías de plano aparecen en los holds; durante travellings se describe el intervalo entre encuadres, con copy neutral también en reversa. No adelantar el nombre de la siguiente toma ni mantener un ángulo que la cámara ya abandona. Cambios instantáneos, **sin fade ni desplazamiento tipográfico**. En scroll rápido los cuatro componentes se asientan juntos; la igualdad ida/vuelta se exige para el mismo q y, tras converger, para el mismo p. No se promete igualdad del frame para un p instantáneo mientras q sigue convergiendo. Los holds son distancia de scroll, sin reproducción temporal forzada.

Las cuatro marcas siguen derivadas de POSES. Antes de q=.04: vista1/0% y primera marca apagada; en q=.38/.72/.90: pose, copy, contador y marca coinciden en el mismo frame. Tolerancias de píxel y convergencia definidas únicamente en el 12.

## 4. Lectura, responsive y ausencia de 3D

Siempre se preserva el valor de cada plano: label, título y descripción distintos. Desktop intenta copy completo; móvil/landscape intenta el compacto localizado. Si el completo no cabe, probar compacto; si ni el compacto cabe junto al visual y controles reales, usar estático completo. Medir las cuatro tomas del idioma actual y mantener una misma variante/reserva para toda la pasada, salvo resize/idioma. No truncar ni ocultar palabras para conservar pin.

No reinstalar el límite landscape de 300px: conservar el ajuste de main desde 220px solo si cabe, escuchar visualViewport y probar 100svh menor que innerHeight por las barras del navegador. En exploración landscape, ayuda/controles reemplazan el copy y slot de barra; salir devuelve caption/barra actuales. No alterar gestos/foco/reset de la base.

Si la pasada conserva poster A por carga tardía, no mostrar titulares de B/C/D como si esas vistas fueran visibles. Usar titular A y aviso de vista previa; barra oculta. Las cuatro ideas completas están disponibles en un resumen fuera del pin, con enlace de ancla nativo para alcanzarlo sin completar el scroll. Mantener geometría de la pasada para evitar un salto de página; rearmar reveal solo tras salida completa por arriba. Si carga tarde pero ya está ready al final, explorar permite ver D voluntariamente; al salir retorna al poster.

Error de carga/WebGL durante la pasada usa poster, aviso accesible y resumen, sin controles inservibles ni progreso ficticio. Error antes de entrar, no-JS, reduced-motion y falta de espacio muestran las cuatro tomas completas en flujo estático. No atribuir validaciones anteriores de asset/dispositivo a los nuevos textos y timings.

## 5. Aceptación y límites de esta aprobación

- Cámara, cuatro títulos/descripciones, contador y marcas sincronizados en q, incluidos saltos, reversa y fronteras exactas; primer movimiento desde .04.
- Copy ES/EN/DE/JA fijado en el 12, con label accesible localizado y sin aria-live al hacer scroll; todas las ideas legibles en fallback.
- Sin CLS atribuible a cambios de toma, sin foco perdido al medir ni recorte por tipografías antiguas heredadas en label/body.
- Comparar A/B/C/D y el arranque contra main; validar recortes/holes y el ritmo de los holds con el usuario.
- Repetir QA en Poco/Android e iPhone físicos: portrait, landscape con barras abiertas/cerradas y zoom de texto; cubrir alturas250–299px y 200px de fallback cuando no cabe, sin asumir que 844×280 debe ser estático.
- Verificar render único, gestos opt-in, teclado, carga tardía/error, anclas, documento oculto/bfcache, enlaces y acceso al formulario sin envío real de pruebas.
- Validar paquete de Cloudflare y, tras despliegue autorizado, dominio real creativivid.com; un pase de GitHub Pages no sustituye esa prueba.

Esta aprobación cierra la dirección y especificación, no los resultados de implementación. No iniciar cambios de producto, abrir PR ni desplegar bajo esta tarea documental. El PR de implementación requiere los checks y revisión física/visual definidos en el 12.

## Estado de implementación local — 20/oct/2026

Implementado en esta rama a petición expresa del usuario posterior al cierre documental. QA automático local y evidencia disponibles en [cinematic-v2](../../qa/cinematic-v2/README.md). Pendientes aprobación visual y retest físico de esta evolución. Los estados anteriores de «sin implementar» describen el momento de cierre de la especificación. Sin PR, integración a main ni despliegue.

## Revisión visual solicitada por el usuario

El usuario pidió corregir tomas repetidas y descripciones que no coincidían, y mostrar comida y plato completos en la principal. Las poses/poster de esta revisión sustituyen los valores conservados al comienzo de la implementación. A no se recorta y su nuevo master se captura del mismo runtime; se mantienen SPZ, orientación, target, FOV y límites. Los cuatro planos y las tres transiciones de texto se fijan en el documento12 actualizado. Ver [evidencia cinematic-v3](../../qa/cinematic-v3/README.md). Validación física de esta revisión pendiente.
