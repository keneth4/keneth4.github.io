# CreatiVivid · 11. Storyboard cinematográfico por tomas — Mollequiles

**Estado:** dirección narrativa propuesta para desarrollar y validar sobre `main@31f41430e72cd64090aa9964817006a9c810d139`. No se modifica producción con este documento.  
**Rama de trabajo:** `codex/creativivid-mollequiles-cinematic-shots`, nacida de `main`.  
**Documento complementario:** [12-especificacion-codex-shot-storytelling.md](12-especificacion-codex-shot-storytelling.md).

## 1. Decisión: del recorrido demostrativo a la dirección de cámara

El proyecto **ya tiene** una sección pinned funcional en `#proyectos`, con `assets/rework/ampm-mollequiles.spz` (~2.2 MB), poster real `mollequiles-560.webp` / `mollequiles-1120.webp`, visor PlayCanvas NGSP v4, cuatro poses A–D, barra de recorrido, cuatro captions, exploración libre, móvil y fallback. **No rehacer la experiencia**, no incorporar SHARP ni añadir otro renderer.

El nuevo objetivo no es exhibir la rotación como un efecto técnico: es demostrar cómo **una misma captura espacial puede servir para pensar diferentes planos, composiciones y piezas visuales**. Cada vista significativa tendrá **título, intención y texto propios**; los movimientos entre ellas constituirán pequeñas transiciones cinematográficas.

Este plan se superpone a las decisiones ya integradas en `main`. Los docs históricos 04–10 siguen reflejando el proceso previo; el presente doc define la propuesta de evolución narrativa sin reescribir ni atribuir aprobación nueva a su QA.

## 2. Principios creativos y límites

- Cuatro **planos del mismo Mollequiles**, no cuatro productos ni modelos.
- **Cada texto tiene una razón visual**: mostrar el tipo de decisión de encuadre/postproducción que la cámara demuestra.
- El logo MUYAL y la palabra **CreatiVivid** (Sniglet 400, dimensiones, espaciado, composición, colores) quedan **exactamente iguales**. Los motivos de otras secciones también permanecen.
- El splat representa una **captura/reconstrucción del plato**, no promete iluminación reeditable, geometría completa, fotografías físicamente nuevas o exports publicitarios aún no producidos.
- La experiencia debe poder comunicar el caso AM:PM y permitir llegar a contacto sin WebGL o sin completar el scroll.
- No agregar blur/DOF sintético agresivo, letterboxing permanente, texto dibujado en canvas, luces ficticias ni scroll hijacking.
- El encuadre de C recorta deliberadamente parte del plato: validarlo contra el asset y no hacer crop adicional que rompa la imagen.
- Preservar las restricciones de ángulo/zoom **del viewer integrado en main**: `clampPose` yaw `[-90,270]`, elevación `[30,88]`, distancia relativa `[0.5,1.5]`; no sustituir por defaults antiguos de Menu Maker.

## 3. Shot list editorial: cuatro tomas, cuatro mensajes

**Microcopy en español es propuesta editorial:** tras implementación debe traducirse con equivalencia de intención a EN, DE y JA y comprobar altura de cada idioma.

| Toma | Nombre de plano | Pose existente (`main`) | Titular visible | Texto de apoyo | Demostración concreta |
|---|---|---|---|---|---|
| **01 · A** | **Plano principal** | yaw 90°, elev 45°, distancia ×1.00 | **Una captura. Muchas posibilidades.** | «El plato se convierte en el punto de partida para contar una historia visual.» | Encuadre inicial/hero still coherente con el poster del propio splat |
| **02 · B** | **Perspectiva lateral** | yaw 135°, elev 34°, distancia ×1.24 | **Cambia el ángulo. Cambia la historia.** | «Un desplazamiento de cámara revela el volumen y crea otra lectura del mismo plato.» | Plano amplio y lateral para mostrar espacialidad y separación de capas |
| **03 · C** | **Plano detalle** | yaw 55°, elev 68°, distancia ×0.78 | **Los detalles también cuentan.** | «Un acercamiento pone el foco en texturas, ingredientes y contrastes del emplatado.» | Dolly-in a un close-up viable; sin inventar fotografía macro superior a la resolución real |
| **04 · D** | **Composición editorial** | yaw 105°, elev 48°, distancia ×1.04 | **Una escena. Distintas maneras de mostrarla.** | «De un plano general a uno de detalle, podemos explorar encuadres para experiencias y contenidos de marca.» | Regreso a una toma editorial equilibrada; invita a explorar manualmente |

**Títulos y textos diferentes en cada vista son una condición de aceptación.** La categoría de plano debe ser legible incluso sin animación. Evitar afirmar que un SPZ por sí solo produce automáticamente una campaña: se trata de **potencial creativo** que el estudio dirige y postproduce.

## 4. Tramos exactos del scroll — propuesta de V2

La sección mantiene `height: 600svh` con panel `sticky:100svh` cuando el layout de `main` permite pin; el desplazamiento de progreso efectivo sigue en torno a **500svh**. `p` en 0–1 es progreso **dentro de la sección**, no progreso de la página.

Se conserva la **pose A (.04), B (.38), C (.72), D (.90)** del código vigente, así como el reveal rápido desde `.005` hasta `.04`. La propuesta cambia solo la distribución de la velocidad dentro de esos segmentos, introduciendo **holds** cortos sobre B y C para facilitar la lectura.

| Progreso p | Qué ve el usuario | Cámara | Texto activo |
|---|---|---|---|
| **0.000–0.005** | Poster real de Mollequiles, escena sin WebGL obligatorio | A | Toma 01 · Plano principal |
| **0.005–0.040** | Reveal real poster → primer fotograma; conservar el latch de carga tardía | A fija | Toma 01 |
| **0.040–0.055** | Hold estable del primer encuadre | A fija | Toma 01 |
| **0.055–0.380** | Movimiento lateral y dolly-out con easing expresivo, desacelerando hasta B | A → B | Toma 01; el texto cambia al llegar a B |
| **0.380–0.425** | **Hold / corte editorial** de la perspectiva lateral, ~22.5svh efectivos | B fija | Toma 02 · Perspectiva lateral |
| **0.425–0.720** | Cambio de altura + dolly-in hacia detalle, con easing de entrada/salida | B → C | Toma 02; el texto cambia al llegar a C |
| **0.720–0.765** | **Hold / corte editorial** de textura, ~22.5svh efectivos | C fija | Toma 03 · Plano detalle |
| **0.765–0.900** | Retirada y reencuadre hacia composición equilibrada | C → D | Toma 03; el texto cambia al llegar a D |
| **0.900–1.000** | **Hold final** con exploración libre voluntaria y enlace AM:PM; el sticky termina sin bloquear scroll | D fija | Toma 04 · Composición editorial |

**Por qué se cambia el copy al llegar a la toma:** no debe adelantarse la descripción de un detalle antes de que la cámara lo muestre. Los textos anteriores acompañan los travelings y el nuevo titular aparece durante el hold correspondiente. El usuario puede detenerse sobre la vista; nunca se dispara una reproducción temporal obligatoria.

**Trade-off:** las pausas alteran sutilmente la sensación de movimiento aprobada en V3. Son una nueva propuesta que requiere comparación A/B visual sobre la versión actual de `main`; si el arranque queda demasiado lento, acortar hold A sin retrasar el comienzo perceptible de la cámara (el vigente p≈.06). Mantener continuidad y reversible 100→0. No prometer que los nuevos timings estén ya probados físicamente.

## 5. Semántica del cambio de texto

- Mostrar siempre un **eyebrow de toma** (01/04, 02/04...), un **titular** y un **microcopy de una o dos líneas** cuando el espacio lo permita.
- Mantener la etiqueta «Mollequiles · AM:PM», el enlace al sitio de AM:PM y el CTA de exploración.
- Transición de copy breve, preferentemente opacidad + desplazamiento de 6–10px y 160–240ms; **solo si** no causa saltos y si no se aplica a reduced-motion.
- La transición de texto no está sincronizada a cronómetro: su estado activo depende solo de `p`, sin acumulación de timers. En scroll hacia atrás aparece la misma toma y el mismo texto.
- Evitar que cambie el ancho o alto de la columna: reservar el espacio de **la toma más larga del idioma actual**; recalcular layout al cambiar idioma y orientación.
- Semántica DOM: cada grupo de copy es un bloque de texto real, no render de WebGL; anuncio de cambios de toma con `aria-live` **desactivado** para no repetir texto al hacer scroll.
- En fallback estático mostrar de forma comprensible las cuatro tomas/ideas, en secuencia natural, o una lista resumida, sin una «diapositiva invisible» que requiera scroll animado para entenderse.

## 6. Escenografía, cinematografía y postproducción honesta

- **Hero/establishing shot (A):** composición limpia, respiración visual, posible ligero acercamiento tipográfico (no en el logo). El poster es un frame real del modelo.
- **Revelación lateral (B):** el dolly-out da espacio y evidencia paralaje; composición 3/4 con lectura clara del plato.
- **Detalle (C):** close-up a la región realmente capturada, no zoom arbitrario al pixel. El splat no cambia su iluminación físicamente: el atractivo viene del encuadre.
- **Editorial (D):** equilibrar plato y espacio negativo para acompañar CTA; opcionalmente, después del MVP, evaluar un **único** marco de aspecto editorial o una tira de **stills exportados realmente del propio modelo**, sin renderers adicionales.
- No agregar «mockups» de campaña con resultados ficticios. Si se muestran proporciones `16:9`, `4:5` o `1:1`, tratarlas como *posibilidades de encuadre* hasta que existan exports verificables del mismo splat.
- Sistema MUYAL ya implementado en hero/servicios/proceso/contacto permanece inmóvil; el splat es el único centro dramático aquí.

## 7. Indicador de progreso y UX

En `main`, el indicador de 4 marcas se deriva de `POSES` (`p=.04, .38, .72, .90`). **Conservar esas marcas** y sincronizar el índice y label «Vista n de 4» con el mismo shot activo. `p=.04` debe marcar 1, `p=.38` 2, `p=.72` 3 y `p=.90` 4; comprobar la tolerancia existente de un píxel de scroll en fronteras.

**Mantener íntegro el comportamiento de `main`**: pin también en móvil si cabe, fallback por espacio, modo reduce-motion, progreso sin scroll hijack, inicio de carga solo por intención de scroll/proximidad, poster latched si primer frame se retrasa, gestos pinch/órbita solo al activar explorar, teclado, foco y cambio ES/EN/DE/JA.

Con pantalla pequeña, reducir el texto de apoyo cuando sea necesario **sin ocultar el valor del plano**. El header de toma y titular son prioritarios; preferir una versión editorial corta localizada antes de forzar una altura que deshabilite la historia.

## 8. QA y definición de terminado

- [ ] Comparación visual real contra `main` en A/B/C/D, con imágenes de referencia del modelo.
- [ ] Las cuatro tomas muestran titulares y textos específicos y distintos, acordes al ángulo.
- [ ] No hay caption de B antes de llegar al ángulo lateral, ni caption de C antes de ver detalle.
- [ ] Las entradas/salidas de las cuatro tomas son suaves, sin parpadeo de texto, CLS ni lag notable.
- [ ] Misma pose y mismo texto para un mismo `p`, independientemente de la dirección del scroll.
- [ ] Las cuatro marcas y el contador «Vista n de 4» siguen sincronizados con captions y poses.
- [ ] La vista en C no expone agujeros ni sobre-zoom; B conserva volumen y D espacio útil para copy.
- [ ] Desktop, Poco móvil, iPhone móvil, landscape y traducciones reales sin solapamientos; las validaciones anteriores no se trasladan automáticamente.
- [ ] Fallo WebGL/carga tardía: poster, todos los argumentos narrativos y el enlace siguen disponibles.
- [ ] Accesibilidad: foco, lectura sin JS, reduced-motion, navegación por anclas, scroll nativo y formulario.
- [ ] Se conservan el símbolo MUYAL original, wordmark, recursos, licencias y el resto del sitio sin cambios.

## 9. Estado y referencias de la base examinada

Código de `main` (20 oct 2026, `31f41430`): `index.html`, `motion/story-timeline.mjs`, `motion/pinned-case-controller.js`, `motion/splat-viewer.js`, `rework.css`, `rework.js`. Documentación previa: [07-mobile-and-motion-revision.md](07-mobile-and-motion-revision.md), [08-early-response-and-dolly.md](08-early-response-and-dolly.md), [09-view-progress.md](09-view-progress.md), [10-block06-landing-motifs.md](10-block06-landing-motifs.md). La documentación anterior conserva valor histórico; esta propuesta es la fuente nueva del **lenguaje cinematográfico y sus textos**, no una negación de la implementación existente.
