# CreatiVivid — 04. Storyboard exacto por porcentaje: Mollequiles

**Estado:** especificación de diseño para implementar en una rama de feature; no implica publicación ni aprobación de asset todavía.  
**Secuencia seleccionada:** Opción A, bloque pinned en `#proyectos`.  
**Fuente:** AM:PM / Menu Maker. Sin SHARP.  
**Dependencia:** [05-especificacion-codex-mollequiles.md](05-especificacion-codex-mollequiles.md).

## 0. Precisión de la fuente y puertas de integración

La copia visible de `keneth4/menu_maker/exported-sites/AM PM/` contiene posters y sprites 360, **no** archivos SPZ individuales. En el `catalog.json` de ese export, «Mollequiles» es el nombre de una **opción de personalización** del producto «Chilaquiles», no un nombre de fichero comprobado. Hay un paquete de despliegue independiente en `deployments/ampm/ampm-site-deploy-2026-10-06.zip` (~99.7 MB), cuyo README documenta la estructura del runtime `playcanvas-spz-spike/`, pero todavía no se han leído sus bytes ni su catálogo interno. **No inventar** la ruta, extensión final, identificador de visual ni ajustes particulares del splat de Mollequiles. Codex debe verificar la asociación correcta dentro de ese ZIP antes de copiarlo o publicar.

Las cifras `minElevationDeg=30`, `maxElevationDeg=88`, `horizontalOrbitRangeDeg=360`, `minZoom=0.5`, `maxZoom=1` son **valores por defecto del código fuente de Menu Maker** (`src/catalog2/splat/defaults.ts`), no límites específicos confirmados para Mollequiles. El archivo exportado puede sobreescribirlos por visual. La demo anterior de la landing tiene otros límites; no trasladarlos ciegamente.

## 1. Definición de progreso

- Una sola sección `#proyectos` contiene el story y el contenido de caso real.
- El intro y los detalles son normales; solo el escenario visual interior queda sticky.
- En desktop, prototipo con `height: 300svh` para el tramo narrativo y escenario sticky `height:100svh` (`~200svh` de desplazamiento efectivo); adaptar por viewport y contenido real.
- El progreso `p` se calcula con `clamp(-scrollSectionRect.top / (scrollSectionHeight - window.innerHeight), 0, 1)`. Revisar cuando el alto sticky difiera del viewport. No depender de wheel events ni de una duración en milisegundos.
- Cada porcentaje describe progreso **dentro del tramo sticky**, no el porcentaje de la página completa.
- El scroll puede detenerse, retroceder o saltar: la pose y la composición deben ser funciones deterministas de `p`.
- Desplazamiento de scroll nativo; nunca secuestrar la rueda ni bloquear el documento.

## 2. Línea temporal exacta (p y efectos)

| p del story | Visual y transición | Cámara | Copy/acción | Condición |
|---|---|---|---|---|
| **0.00** | Poster auténtico de Mollequiles 100 %, sin Canvas visible | A (pose de poster) | «AM:PM · Una experiencia que puedes explorar» | Carga inicial legible sin JS |
| **0.00–0.20** | Poster estable, solo una pista gráfica MUYAL lateral avanza discretamente | A estable | Nombre/ubicación del proyecto; enlace «Ver sitio AM:PM» accesible | WebGL puede precargarse en segundo plano |
| **0.20–0.32** | Comienza crossfade poster→Canvas; opacidad de Canvas pasa de 0 a 0.40, poster 1→0.60 | A estable | «Una imagen con profundidad» | Transición **solo** si existe primer frame 3D válido |
| **0.32–0.45** | Crossfade termina: Canvas 0.40→1, poster 0.60→0 | A estable | «Explora el plato desde otra perspectiva» | Si no hay frame, dejar poster y copy; no congelar scroll |
| **0.45–0.60** | Splat a pantalla, sin adornos encima del plato | A→B, ease in-out | Etiqueta discreta «Captura espacial real» | La cámara no sale de las restricciones del visual |
| **0.60–0.70** | Splat estable; pequeño énfasis sobre profundidad | B→C, ease in-out | Breve descripción del detalle (texto DOM) | Evitar zoom excesivo y agujeros del modelo |
| **0.70–0.80** | Splat a cámara final, pausa visual al final del tramo | C→D; sin órbita completa | «Mira el trabajo de cerca» | Pose final validada con asset real |
| **0.80–0.90** | Splat estabilizado, comienza aparición de controles | D fijo | Botón «Explorar en 3D» + «Ver AM:PM» | El control libre solo se habilita con clic |
| **0.90–1.00** | Composición de salida; escenario sigue fijo hasta terminar sticky | D fijo | Los controles y enlace siguen accesibles | El sticky termina naturalmente; no retener scroll |
| **1.00** | Retorno al flujo normal de la página; sigue el texto del caso y luego Servicios | D fijo o poster según política de pausa | CTA intacta | Sin salto de layout |

**Importante:** cuando falta SPZ, `0.20–1.00` se representa mediante poster y textos estables; el botón de 3D no aparece. No interpolar la transparencia contra un Canvas negro o vacío.

## 3. Poses A, B, C y D: cómo definirlas sin inventar parámetros de AM:PM

Guardar `view`, `interaction`, `transform` y `orientation` extraídos de la configuración **del visual concreto de Mollequiles**. Conocer el contenedor y el visual final es requisito de integración.

Las siguientes posiciones son **desplazamientos artísticos tentativos** desde la pose inicial real del visual, no «límites de AM:PM». Para cada valor se hace `clamp` a los límites efectivos del visual y se valida con render y capturas.

| Pose | Yaw relativo | Elevación relativa | Zoom relativo | Intención |
|---|---:|---:|---:|---|
| **A** | 0° | 0° | 1.00× | Coincidir exactamente con el poster |
| **B** | +12° | −3° | 0.96× | Dar volumen lateral sin perder el plato |
| **C** | +20° | +4° | 0.88× | Revelar textura/profundidad |
| **D** | +8° | +1° | 0.92× | Cierre legible y buena posición para explorar |

El signo y la orientación final del yaw dependen del asset. Si el lateral elegido presenta agujeros, invertir el signo o reducir el desplazamiento; si `horizontalOrbitRangeDeg` es menor de 360, respetar el centro y el semiancho definidos por el runtime real.

**Zoom en Menu Maker:** `zoom` es multiplicador de distancia de cámara. Valores menores acercan; no confundirlo con el ratio inverso del viewer anterior de CreatiVivid. Para la pose de poster, preferir vista/cámara poster capturada del mismo visual, no una captura 2D distinta. Para que el A→B→C→D sea reversible, usar interpolación angular continua sin salto alrededor de 360°; yaw debe normalizarse contra el intervalo permitido antes de interpolar.

Las poses se aprobarán solo después de inspeccionar fotogramas del modelo y confirmar que ninguna vista revela zonas incompletas o artefactos.

## 4. Microcopy español (provisional) y objetivos UX

| Fase | Hablamos de | Copy mínimo |
|---|---|---|
| 0–20 % | Caso real | «Una identidad que se puede explorar.» |
| 20–45 % | Cambio de medio | «De la imagen a la presencia.» |
| 45–80 % | Espacialidad | «Un platillo real, reconstruido para explorarlo.» |
| 80–100 % | Elección del usuario | «Explora Mollequiles en 3D.» |

Mantener visible el hecho comercial verificable: AM:PM tiene presencia digital y menú personalizable con pedido por WhatsApp; el splat solo ejemplifica su experiencia 3D. No afirmar cobro online, resultados o métricas.

Agregar equivalentes naturales a `rework.js` para ES, EN, DE y JA. La accesibilidad y el copy comercial **no** dependen de un texto pintado en WebGL.

## 5. Exploración libre y salida

- El botón «Explorar en 3D» (disponible a partir de p≥0.80 si primer frame listo) conmuta de `story` a `explore`.
- Al entrar a `explore`, conservar la pose D o la pose actual correspondiente a p, habilitar drag/pinch/teclado **dentro de límites originales del visual**. Deshabilitar rueda de zoom para no capturar el scroll vertical; ofrecer controles +/− si procede.
- «Restablecer vista» vuelve a la pose D aprobada (no necesariamente la pose del export).
- «Volver al recorrido» regresa al modo `story` y aplica la pose del porcentaje p actual.
- Si se abandona el pinned hacia arriba/abajo, salir del modo libre, pausar render y liberar scroll sin sobresaltos.
- El enlace externo a AM:PM permanece accesible sin entrar al 3D.
- La acción de explorar no congela, bloquea ni arrastra al usuario a una escena fullscreen por sorpresa.

## 6. UX por dispositivo y movimiento reducido

- **Desktop**: secuencia completa 0–100 % y pin real de corta duración, sin elementos intrusivos sobre la escena.
- **Tablet**: simplificar texto e intentar pin solo si el escenario permite lectura y navegación.
- **Móvil**: comenzar **sin pin**; poster visible, reveal corto opcional y botón de explorar por decisión. Pin móvil requiere validación real antes de habilitarse.
- **Reduce motion**: sin pin, sin interpolación scroll→cámara, poster + caso + enlace; botón voluntario a 3D solo si técnicamente soportado y sin autoplay.
- **Sin GPU/WebGL, red lenta o SPZ incompatible**: poster y contenido siguen accesibles.
- **Teclado**: el tabulado recorre enlaces/controles; `Escape` sale del modo libre; controles etiquetados; foco visible.

## 7. Señales de aceptación visual

- [ ] No hay salto de encuadre perceptible poster→SPZ en la pose A.
- [ ] Cada etapa tiene una intención comunicativa y el texto puede leerse aunque se atraviese el scroll rápidamente.
- [ ] Se aprecia profundidad pero no agujeros/artefactos graves en A–D.
- [ ] En reversa (100→0) la transición vuelve exactamente a la imagen inicial.
- [ ] No se altera MUYAL, Sniglet ni «CreatiVivid».
- [ ] Los cuatro idiomas y anclas del sitio siguen funcionando.
- [ ] Con WebGL apagado todo el proyecto se entiende y se puede contactar.
- [ ] No se atribuye un modelo incorrecto al nombre «Mollequiles».

## 8. Material de referencia inspeccionado

- `keneth4/menu_maker/src/catalog2/splat/defaults.ts`
- `keneth4/menu_maker/src/catalog2/spz-spike/spzCameraController.ts`
- `keneth4/menu_maker/src/catalog2/splat/cameraPose.ts`
- `keneth4/menu_maker/exported-sites/AM PM/catalog.json`
- `keneth4/menu_maker/deployments/ampm/README.md`
- `keneth4/keneth4.github.io/index.html`, `splat-demo.js` y manual v0.10.

