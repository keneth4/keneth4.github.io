# CreatiVivid · 12. Especificación cerrada — storytelling por tomas

**Base:** `main@31f41430e72cd64090aa9964817006a9c810d139`. **Rama:** `codex/creativivid-mollequiles-cinematic-shots`.
**Estado:** implementación local y QA automático disponibles el 20/oct/2026; aprobación visual y QA físico pendientes. Sin PR ni despliegue. Complementa al [storyboard 11](11-storyboard-cinematografico-por-tomas.md). Este documento es la fuente canónica de textos y contratos técnicos; sustituye sus ejemplos anteriores.

## 1. Alcance y decisiones confirmadas

Evolucionar el pinned existente, con una sola escena PlayCanvas. Mantener SPZ, orientación, target, FOV, límites, logo/wordmark, motivos, formulario y caso comercial. Por solicitud posterior del usuario se revisan A–D y se regenera el poster para que A muestre comida y plato completos. No generar imágenes sintéticas, usar otro renderer ni prometer reiluminación o una campaña ya producida.

El usuario eligió **arranque desde .04, pausas solo en B/C** y **progreso suavizado compartido**. Conservar 600svh/100svh cuando cabe, scroll nativo, gestos opt-in, reduced-motion, poster-latch, listeners/dispose/bfcache y comportamiento landscape de main. La prueba física previa valida la base, no este cambio de narrativa.

## 2. Una configuración y un progreso de presentación

`POSES` revisado tras feedback visual: A (.04,90°,45°,1.50), B (.38,180°,30°,1.45), C (.72,45°,88°,1.15), D (.90,0°,55°,.75). A presenta comida y plato completos; B es ángulo bajo, C vista superior y D detalle. El adaptador obtiene su vista inicial de POSES[0] para que el primer frame coincida con el nuevo poster; no cambian FOV, target, orientación ni el factor base .65. El master anterior se conserva como referencia histórica; nuevo master vivo2100×2100 y pruebas en ../../qa/cinematic-v3/. `SHOTS` referencia cada objeto de POSES e incluye únicamente id, keys de traducción y holdUntil: A=POSES[0].p; B=.425; C=.765; D=1. No repetir start/end ni porcentajes de llegada en metadatos, controller o HTML. Marca de cada toma = su pose.p.

Contratos de `motion/story-timeline.mjs`:

- `shotAt(q)` devuelve índice 0–3; el índice inicial es 0 incluso antes de .04. Para las demás tomas, seleccionar el último índice cuya pose.p <= q. Entradas finitas fuera de rango se limitan a 0–1; no finitas se tratan como 0.
- `cameraAt(q)` usa esa misma configuración. Hasta holdUntil devuelve la pose exacta; después interpola hacia la siguiente pose hasta su pose.p. A→B usa sin(t·π/2); B→C y C→D smoothstep. No overshoot; conservar clampPose y exports previos para compatibilidad. No introducir límites ni configuración del renderer en SHOTS.
- `travellingAt(q)` devuelve el índice de segmento0–2 solo después del hold y antes de la siguiente llegada; devuelve −1 en holds. Durante el movimiento se usa copy de transición neutral respecto a la dirección, sin afirmar que ya está visible la siguiente toma. `shotAt` sigue gobernando las cuatro marcas/contador; no se añade una quinta vista.
- `revealAt`, `passAt` y `progressAt` conservan sus contratos. El valor raw **p** sigue calculado con la distancia sticky medida y sirve para reveal, latch, entrada/salida, proximidad y resize; no para seleccionar una segunda fase visual.

El controller incorpora **q**, progreso presentado. Mientras hay timeline visible, una sola actualización aplica `q += (pTarget-q) * (1-exp(-dt/85))`, dt limitado a 100 ms. pTarget es p, salvo que esté a <=1 CSS px real de un hito de POSES: se ajusta a ese hito. Si la distancia restante entre q y pTarget es <=.25 CSS px, fijar q=pTarget para alcanzar exactamente holds y umbrales. Distancias expresadas en progreso se convierten usando `max(1, altoStory-altoPin)`. No ajustar q a un hito por adelantado de forma independiente.

**Cámara = cameraAt(q), texto/contador = shotAt(q), porcentaje y marcas = q.** Eliminar el segundo suavizado por componentes de pose durante timeline: no acumular dos filtros. La tolerancia se aplica al objetivo común, nunca por separado a barra/captions. Porcentaje normalizado entre A.p y D.p; antes de .04 muestra 0% y vista 1, con primera marca apagada hasta q=.04. Con q=.38/.72/.90, cámara exacta B/C/D, texto, contador y marca cambian en el mismo frame.

La reversibilidad exacta se exige para un mismo **q**, no para el mismo p instantáneo durante el asentamiento. Con scroll detenido, q alcanza pTarget y el resultado ya no depende de la dirección anterior. En saltos rápidos q atraviesa la misma ruta sin adelantar títulos a la pose objetivo. El movimiento termina al converger; sin rAF perpetuo.

En entrada, refresh avanzado, cambio de modo, reentrada desde fuera, pageshow y retorno de documento oculto: inicializar q=pTarget para no reproducir desde una posición obsoleta. En resize/idioma dentro de un mismo modo pinned: recalcular pTarget y mantener q mientras se asienta; si cambia el modo, reinicializarlo. El latch siempre usa p, conservando refresh avanzado con poster. Explorar solo cuando ready y q>=D.p (también tras carga tardía); durante exploración pausar q y mantener oculta la barra y, solo en landscape, el copy narrativo. Reset=D; al salir fijar q=pTarget y aplicar cameraAt(q). En estático reset=A y salir devuelve poster.

## 3. Tramos y entrada perceptible

| q | Cámara | Texto activo |
|---|---|---|
| 0–.04 | A; reveal usa p=.005–.04 | Toma 01 |
| .04–.38 | A→B desde el inicio aprobado, sin hold extra | Transición 01–02 |
| .38–.425 | Hold B | Toma 02 |
| .425–.72 | B→C | Transición 02–03 |
| .72–.765 | Hold C | Toma 03 |
| .765–.90 | C→D | Transición 03–04 |
| .90–1 | Hold D; explorar opt-in | Toma 04 |

No añadir hold hasta .055 ni alternativa de adelantar etiquetas durante el último 10% del travelling. El nombre y descripción específicos de una toma aparecen durante su hold; durante travelling se muestra el texto de intervalo definido abajo. No describir un ángulo bajo que ya se está abandonando. El estado depende solo de q y conserva el mismo texto al invertir scroll. Las pausas son tramos de scroll, no duración temporal mínima ni autoplay. La longitud del story no aumenta.

## 4. DOM, copy y transición

Convertir los cuatro párrafos `[data-case-caption]` en cuatro `article` con el mismo atributo y data-case-shot. Cada uno contiene label, h3 y descripción; son nodos DOM, con hidden solo mediante JS. Sin aria-live en la narración. Mantener etiqueta Mollequiles · AM:PM, enlace al caso y controles.

**Cambio instantáneo de bloque**, sin fade, desplazamiento ni temporizadores en esta iteración. El progreso de cámara ya aporta continuidad. No dejar implementación alternativa de polish pendiente. El contenedor tiene label localizado: ES «Tomas de Mollequiles», EN «Mollequiles shots», DE «Mollequiles-Aufnahmen», JA «モジェキレスのショット». La barra conserva las traducciones actuales de Vista n de 4.

Textos completos canónicos, incorporados al COPY existente (no crear un segundo almacén runtime):

```js
const SHOT_COPY = {
  "es": {
    "caseShot1Label": "01/04 · Plano de conjunto",
    "caseShot1Title": "Una captura. Muchas posibilidades.",
    "caseShot1Body": "Comida y plato, juntos en una vista completa.",
    "caseShot2Label": "02/04 · Ángulo bajo",
    "caseShot2Title": "El volumen cambia la lectura.",
    "caseShot2Body": "Una vista más baja destaca la altura y las capas del plato.",
    "caseShot3Label": "03/04 · Vista superior",
    "caseShot3Title": "Desde arriba, otra composición.",
    "caseShot3Body": "La vista superior muestra la distribución de ingredientes y colores.",
    "caseShot4Label": "04/04 · Plano detalle",
    "caseShot4Title": "Ahora, los ingredientes de cerca.",
    "caseShot4Body": "El acercamiento concentra el encuadre en ingredientes, capas y texturas."
  },
  "en": {
    "caseShot1Label": "01/04 · Complete view",
    "caseShot1Title": "One capture. Many possibilities.",
    "caseShot1Body": "The food and plate, together in a complete view.",
    "caseShot2Label": "02/04 · Low angle",
    "caseShot2Title": "Volume changes the view.",
    "caseShot2Body": "A lower viewpoint reveals the height and layers of the dish.",
    "caseShot3Label": "03/04 · Overhead view",
    "caseShot3Title": "Another composition from above.",
    "caseShot3Body": "The view from above reveals the arrangement of ingredients and colors.",
    "caseShot4Label": "04/04 · Close-up",
    "caseShot4Title": "Now, a closer look at the ingredients.",
    "caseShot4Body": "A closer frame focuses on ingredients, layers and textures."
  },
  "de": {
    "caseShot1Label": "01/04 · Gesamtansicht",
    "caseShot1Title": "Eine Aufnahme. Viele Möglichkeiten.",
    "caseShot1Body": "Speise und Teller gemeinsam im vollständigen Bild.",
    "caseShot2Label": "02/04 · Tiefer Blickwinkel",
    "caseShot2Title": "Volumen verändert den Blick.",
    "caseShot2Body": "Ein tieferer Blickwinkel zeigt Höhe und Schichten des Gerichts.",
    "caseShot3Label": "03/04 · Draufsicht",
    "caseShot3Title": "Von oben entsteht ein anderes Bild.",
    "caseShot3Body": "Die Draufsicht zeigt die Anordnung von Zutaten und Farben.",
    "caseShot4Label": "04/04 · Detailaufnahme",
    "caseShot4Title": "Jetzt kommen die Zutaten näher.",
    "caseShot4Body": "Der nähere Ausschnitt konzentriert sich auf Zutaten, Schichten und Texturen."
  },
  "ja": {
    "caseShot1Label": "01/04 · 全体のショット",
    "caseShot1Title": "ひとつの撮影から、さまざまな表現へ。",
    "caseShot1Body": "料理と皿をひとつの構図に収めます。",
    "caseShot2Label": "02/04 · 低いアングル",
    "caseShot2Title": "高さと重なりが見えてくる。",
    "caseShot2Body": "低い視点から、料理の高さと層を見せます。",
    "caseShot3Label": "03/04 · 上からの視点",
    "caseShot3Title": "真上に近い視点で、構図が変わる。",
    "caseShot3Body": "上から、食材や色の配置を見せます。",
    "caseShot4Label": "04/04 · クローズアップ",
    "caseShot4Title": "次は、食材を間近に。",
    "caseShot4Body": "食材の重なりや質感に注目する構図です。"
  }
};
```

### Variantes compactas canónicas

Añadir keys `caseShotNTitleCompact` y `caseShotNBodyCompact`. El label es el mismo del contenido completo. Cada celda siguiente contiene **título / descripción**; no son candidatos opcionales.

| Toma | ES | EN | DE | JA |
|---|---|---|---|---|
| A | El plato completo. / Comida y plato en un solo encuadre. | See the whole dish. / Food and plate in one frame. | Das ganze Gericht. / Speise und Teller in einem Bild. | 料理も皿も、全体を。 / ひとつの構図で全体を見せます。 |
| B | El volumen se hace visible. / Un ángulo bajo para leer las capas. | See the volume. / A low angle reveals the layers. | Volumen wird sichtbar. / Ein tiefer Blick zeigt die Schichten. | 高さと重なりを見る。 / 低い視点で立体感を伝えます。 |
| C | El emplatado, desde arriba. / Ingredientes y colores en conjunto. | The arrangement, from above. / Ingredients and colors together. | Das Gericht von oben. / Zutaten und Farben im Überblick. | 上から見る盛り付け。 / 食材と色の配置を見渡します。 |
| D | Los ingredientes, de cerca. / Un recorte para observar las texturas. | Ingredients, up close. / A tighter frame reveals textures. | Zutaten aus der Nähe. / Ein enger Ausschnitt zeigt Texturen. | 食材を間近に。 / 構図を絞り、質感に注目します。 |

Las traducciones son contenido editorial fijado para implementar; no se les atribuye revisión nativa. Su equivalencia editorial y altura deben revisarse visualmente antes de aprobar el feature. No cambiar el copy ajeno a Mollequiles.

### Copy durante travellings

El feedback del usuario invalida mantener nombres de plano mientras la cámara ya los deja atrás. Usar `caseTravelNLabel/Title/Body` y sus `TitleCompact/BodyCompact` para los tres intervalos; cambiar strings solo al cambiar de estado, no cada frame. No usar verbos direccionales que sean falsos en reversa. La copia canónica completa y compacta en los cuatro idiomas está fijada en [copy.json](../../qa/cinematic-v3/copy.json), snapshot de COPY, sin segundo almacén runtime.

| Intervalo | Label ES | Titular ES | Apoyo ES |
|---|---|---|---|
| A–B | 01–02 · Cambio de ángulo | Un nuevo ángulo cambia la lectura. | Un recorrido entre la vista de conjunto y el ángulo bajo. |
| B–C | 02–03 · Cambio de altura | La altura cambia la composición. | Un recorrido entre la vista baja y la vista superior. |
| C–D | 03–04 · Cambio de escala | La escala dirige la atención. | Un recorrido entre el conjunto y los ingredientes de cerca. |

## 5. Layout medido, landscape y accesibilidad

Sustituir los selectores amplios `.case-story-captions p` y sus overrides responsive: ya no deben dar tamaño de titular a label/body. Usar selectores explícitos con prioridad efectiva por variante y modo, sin conservar reglas antiguas que los sobreescriban. Label 11px/1.4; título completo clamp(24px,2.55vw,38px)/1.13 y body clamp(14px,1.1vw,17px)/1.5; compacto título 20px/1.15, body 13px/1.4. En touch landscape: título compacto 18px/1.15. No truncar, usar line-clamp, reducir transformando texto ni ocultar arbitrariamente descripciones.

Algoritmo de variante por medición:

1. Tras fonts.ready y en idioma/resize/visualViewport, medir los cuatro bloques y las tres variantes de transición a su ancho final con altura natural, sin stretch ni acumular la reserva anterior. Separar métricas del estado de recorrido, del de explorar y del panel de vista previa (titular A, aviso y enlace); usar su máximo y preservar foco. En landscape, explorar sustituye el bloque narrativo y el slot de barra por ayuda/controles, como en main.
2. Probar primero completa para desktop no táctil; probar primero compacta si ancho<=760 o touch landscape (any-pointer:coarse, ancho>alto, alto<=600). Si completa no cabe, probar compacta. No cambiar variantes por toma: se fija una para las cuatro en cada medición de layout.
3. Aplicar la medición y reglas vigentes: landscape desde 220px de altura útil solo si todos los estados medidos caben, padding real 24px; portrait exige visual mínimo 180px; desktop no táctil conserva mínimo 700px. Sin volver al mínimo landscape de 300px ni al límite de ancho 1100px. La altura estable 100svh puede ser menor que innerHeight por las barras del navegador. Con texto ampliado o espacio insuficiente, usar estático completo.
4. Reservar altura máxima de los cuatro planos y tres transiciones de la variante/idioma elegidos, incluidos márgenes. Medir de nuevo tras aplicar las strings seleccionadas; no observar un contenedor cuya altura crece por su propia reserva. Mantener overflow-anchor:none y slot estable de barra durante recorrido. Solo un bloque visible en pinned; estático muestra todos en flujo.

En estático (no-JS, reduced-motion o falta de espacio), usar copy completo y cuatro artículos en flujo, poster A, sin barra de avance falsa. No-JS trae ese HTML inicial completo; solo JS introduce variantes compactas y hidden.

## 6. Carga tardía, error y lectura completa

Distinguir **recorrido 3D activo** de **vista previa con poster**. Si la pasada queda latched al poster, no mostrar caption B/C/D ni contador/marcas de una cámara que no está visible. El panel muestra label Mollequiles · AM:PM, titular A completo/compacto según layout y aviso localizado de vista previa. No se trata de una quinta toma.

Para no colapsar 600svh ni desplazar contenido durante una pasada, mantener la geometría de la sección hasta la siguiente entrada desde arriba. El aviso incluye un enlace de ancla nativo a un resumen de las cuatro tomas, colocado inmediatamente **después del contenedor de scroll**, fuera del pin. Ese resumen está siempre disponible como `details` con summary localizado; contiene los cuatro labels/títulos/descripciones completos con las mismas keys. No duplicar IDs. Al seguir el ancla, abrir details antes del desplazamiento nativo; no animar ni compensar scroll manualmente. Los argumentos del caso se pueden leer sin recorrer todo el tramo. En no-JS/estático, los cuatro artículos principales ya son legibles y no se necesita mostrar un resumen duplicado; ocultar ese details de mejora progresiva por defecto y habilitarlo solo en modo pinned.

Error de descarga/WebGL/contexto perdido dentro de pinned: conservar poster y la misma presentación de vista previa, ocultar progreso y explorar, anunciar error solo en status accesible y mantener enlace al resumen/caso. No fingir recorrido visual ni reintentar en bucle. Si el error precede a la entrada, iniciar en estático. El error no rearma el renderer automáticamente. Carga tardía que finalmente queda ready: explorar puede habilitarse al alcanzar q>=D.p, mostrando directamente D al activar; al salir recupera poster, sin relanzar reveal en esa pasada. Rearmar reveal solo tras salida completa por arriba y nueva entrada, como main.

Strings adicionales canónicas (vista previa / enlace-resumen y summary): ES «Vista previa: el recorrido 3D no está activo.» / «Ver las cuatro tomas»; EN «Preview: the 3D story is not active.» / «View all four shots»; DE «Vorschau: Die 3D-Sequenz ist nicht aktiv.» / «Alle vier Aufnahmen ansehen»; JA «プレビュー：3Dの動きは表示されていません。» / «4つのショットを見る». En error, el aviso de error existente explica el motivo; no reemplazarlo por el aviso genérico. Mantener formularios y enlaces externos sin cambios.

## 7. QA y entrega antes de PR

- Capturar baseline del main actualizado: A/B/C/D, apertura, timings, portrait/landscape; registrar commit. No atribuirle QA cinematográfico.
- Unitarias: configuración única; hitos y holds; continuidad de posición; q/cameraAt/shotAt reversibles; clamps y entradas no finitas; normalización de barra; fronteras ±1px; convergencia y fin de rAF. Primer movimiento desde .04 y apreciable cerca de .06, sin pausa adicional.
- Browser: verificar cámara, copy, contador y marcas en el **mismo frame** ante scroll lento/rápido/inverso, saltos/anclas y paradas exactas en B/C/D. Capturar salida del periodo de asentamiento; no exigir misma imagen al mismo p mientras q aún converge.
- Medir los cuatro idiomas completos/compactos y zoom de texto 200%; desktop1440×900, tablet, portrait390×844, landscape844×390,740×360,844×270,740×270,932×299,1200×320. Simular 100svh250 con innerHeight390 y barras abiertas/cerradas; 200px mantiene fallback si no cabe. No usar 844×280 como fallback obligatorio. Comprobar explorar/reset/salida/foco y cambios portrait↔landscape durante recorrido/exploración.
- Simular ready antes/después de .005, refresh avanzado, reentrada desde ambos extremos, carga abortada, GPU fallida y pérdida de contexto. En poster-only/error no hay captions de poses invisibles; se puede abrir y alcanzar el resumen y el caso sin completar el scroll.
- Probar reduced-motion, sin JS, bfcache, ocultar documento, teclado, pinch y órbita solo opt-in, contacto y validación del formulario sin enviar solicitudes reales. No live-announcements al cruzar tomas, un renderer, sin CLS atribuible al cambio de caption ni modificaciones de identidad/asset.
- Comparación visual A/B frente a main y aprobación del usuario de holds/textos, incluyendo Poco/Android e iPhone físicos con barras visibles y zoom de texto; registrar modelos/versiones cuando se suministren y marcar cobertura desconocida sin inferirla.
- Verificar **paquete de Cloudflare**, no solo repo local: módulos motion, MIME y assets; mantener build/check de dependencias. Tras un despliegue autorizado comprobar creativivid.com con bytes, primer frame y navegación en tamaños bajos. Un build de GitHub Pages no acredita ese dominio.

Commits: baseline/documentación; datos+progreso compartido/tests; copy+DOM+i18n/layout; integración de estados; QA/evidencia. No abrir PR hasta tests, comparación visual y QA físico aprobados. Esta fase solo cierra documentos: no ejecutar implementación, PR, merge ni despliegue con esa aprobación documental.

## Estado de implementación local — 20/oct/2026

Implementado en esta rama a petición expresa del usuario posterior al cierre documental. QA automático local y evidencia disponibles en [cinematic-v2](../../qa/cinematic-v2/README.md). Pendientes aprobación visual y retest físico de esta evolución. Los estados anteriores de «sin implementar» describen el momento de cierre de la especificación. Sin PR, integración a main ni despliegue.

## Revisión visual posterior — objeto completo y planos distintos

La revisión del usuario detectó similitud A/D y descripciones que no correspondían durante movimiento. Su petición de ver comida y plato completos en A sustituye la restricción inicial de conservar poses/poster. Mantener los hitos, holds y progreso compartido; reemplazar únicamente encuadres/copy y poster derivados. A ahora está en el máximo de distancia permitido, por lo que el primer segmento no promete dolly-out. Evidencia, hashes autorizados y QA de esta revisión: [cinematic-v3](../../qa/cinematic-v3/README.md). Solo local; sin PR ni despliegue.
