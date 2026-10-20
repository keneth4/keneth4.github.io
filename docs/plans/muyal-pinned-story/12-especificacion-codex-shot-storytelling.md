# CreatiVivid · 12. Especificación Codex — cinematic shot-based storytelling

**Base:** `main@31f41430e72cd64090aa9964817006a9c810d139` (20/oct/2026).  
**Feature branch:** `codex/creativivid-mollequiles-cinematic-shots`.  
**Storyboard:** [11-storyboard-cinematografico-por-tomas.md](11-storyboard-cinematografico-por-tomas.md).  
**Estado:** diseño y especificación; no es código implementado ni desplegado.

## 1. Objetivo y alcance

Evolucionar **el pinned de Mollequiles ya implementado**, sin reconstruirlo. Cada pose A/B/C/D debe formar una toma cinematográfica con título y descripción propios. El scrolling nativo une los planos; hay una pausa breve en B/C y la selección del copy cambia solo al llegar al ángulo correspondiente. Mantener una sola escena WebGL y la exploración opt-in.

**No tocar:** `assets/brand/muyal-canonical.png`, wordmark CreatiVivid/Sniglet, dimensiones, paleta, hero, servicios, proceso, contacto, formulario, links, SPZ/posters, scripts de otras secciones, intro/story comercial del proyecto ni idiomas existentes fuera de nuevas keys.

**Mantener:** `600svh` para el story y `100svh` para el pin cuando la medición real de layout lo permite, responsive incluso en móvil y landscape, fallback por espacio/reduced-motion, poster-latch, carga diferida, barra de cuatro vistas, un renderer, gesture handling, teclado, reentrada, dispose/bfcache y scroll nativo.

## 2. Inventario y archivos específicos en main

| Path | Papel actual | Cambio propuesto |
|---|---|---|
| `motion/story-timeline.mjs` | POSES A–D, `cameraAt`, fases/reveal/progreso | Añadir `SHOTS`, `shotAt`; modificar easing local para holds cortos sin alterar poses |
| `motion/pinned-case-controller.js` | Controla captions por `phaseAt`, barra y visor | Selección por `shotAt`, etiquetas/títulos/copy, compatibilidad con layout/idioma |
| `index.html` | Cuatro `p[data-case-caption]` en `.case-story-captions` | Convertir en cuatro bloques semánticos de toma (eyebrow, heading y desc) |
| `rework.js` | COPY en ES/EN/DE/JA, atributos `data-copy` | Añadir 4× keys para títulos, descripciones y nombres de toma, sin borrar traducciones de otro contenido |
| `rework.css` | Captions, medidas y estados de vista desktop/portrait/landscape | Estilo editorial que reserva altura máxima real para los 4 bloques, sin saltos ni tapar controles |
| Test suites existentes / QA | Contratos de cámara, gestos, fallback, marcas | Agregar paridad fases/títulos/sync en reversa y fotos de las poses |

**Nota:** `motion/splat-viewer.js` ya apunta a `ampm-mollequiles.spz` vía PlayCanvas, con configuración de modelo validada. No cambiar ni duplicar su configuración. `motion/story-timeline.mjs` contiene estos valores existentes: A p=.04 / 90°,45°,1.00; B p=.38 / 135°,34°,1.24; C p=.72 / 55°,68°,.78; D p=.90 / 105°,48°,1.04. Mantener `clampPose` (yaw -90..270, elev 30..88, zoom .5..1.5) y `VIEW`/`ORIENTATION` del visor.

## 3. Datos declarativos de shots (un solo origen)

**No** mantener dos mapas distintos de porcentajes para la cámara y los textos. Derivar los captions/indicador de una configuración única, con umbrales `p=.04,.38,.72,.90` ya aprobados. Los holds usan puntos de easing declarativos y no alteran los hitos de llegada.

```js
// motion/story-timeline.mjs — propuesta; conservar exports existentes
export const SHOTS = Object.freeze([
  { id: 'hero',   poseIndex: 0, start: 0,    end: .38,
    eyebrowKey: 'caseShot1Label', titleKey: 'caseShot1Title', bodyKey: 'caseShot1Body',
    shotType: 'establishing' },
  { id: 'volume', poseIndex: 1, start: .38,  end: .72,
    eyebrowKey: 'caseShot2Label', titleKey: 'caseShot2Title', bodyKey: 'caseShot2Body',
    shotType: 'lateral' },
  { id: 'detail', poseIndex: 2, start: .72,  end: .90,
    eyebrowKey: 'caseShot3Label', titleKey: 'caseShot3Title', bodyKey: 'caseShot3Body',
    shotType: 'close-up' },
  { id: 'editorial',poseIndex: 3, start: .90,end: 1.001,
    eyebrowKey: 'caseShot4Label', titleKey: 'caseShot4Title', bodyKey: 'caseShot4Body',
    shotType: 'editorial' }
]);
export const shotAt = p => SHOTS.findLastIndex(s => p >= s.start);
// 0, 1, 2 o 3, mismo índice que POSES / marcas
```

La primera toma comprende el poster y tránsito hasta B; B aparece en el hold `.38–.425`; C en `.72–.765`; D en `.90–1`. No agregar una quinta vista visual sin una quinta pose/ítem/barra y pruebas; el cierre es parte de la cuarta toma.

## 4. Modificación de timeline, cálculos y easing

`revealAt` y `passAt` quedan sin cambios: primer intento de reveal `.005–.04`, poster latched si el viewer no estaba listo.

La ruta propuesta conserva todos los **cuatro POSES** del main. El nuevo `cameraAt` mantiene hold A hasta .055 (para conservar respuesta visible cerca de .06); A→B de .055 a .38; hold B .38→.425; B→C .425→.72; hold C .72→.765; C→D .765→.90; hold D .90→1.

```js
const easeSmooth = t => t*t*(3-2*t);
const easeFirst = t => Math.sin(t*Math.PI/2);
const local = (p,start,end) => clamp((p-start)/(end-start),0,1);
const blend = (a,b,t) => clampPose({
  yawDeg: a.yawDeg + (b.yawDeg-a.yawDeg)*t,
  elevationDeg: a.elevationDeg + (b.elevationDeg-a.elevationDeg)*t,
  zoom: a.zoom + (b.zoom-a.zoom)*t
});
// Preserva POSES ya presentes.
export function cameraAt(p) {
  const A=POSES[0],B=POSES[1],C=POSES[2],D=POSES[3];
  if(p<=.055) return clampPose(A);
  if(p<.38) return blend(A,B,easeFirst(local(p,.055,.38)));
  if(p<=.425) return clampPose(B);
  if(p<.72) return blend(B,C,easeSmooth(local(p,.425,.72)));
  if(p<=.765) return clampPose(C);
  if(p<.90) return blend(C,D,easeSmooth(local(p,.765,.90)));
  return clampPose(D);
}
```

`cameraAt` es pura, reversible y no depende de timestamps. El controlador existente conserva su filtro exponencial de 85ms para asentamiento. No hay autoplay, intervalos ni tiempo real que desincronicen copy y vista. 

**Punto UX a validar:** en las transiciones largas, el caption de la toma anterior permanece hasta alcanzar la nueva. Evaluar con usuarios si se prefiere revelar la nueva etiqueta en el último 10% del movimiento, **solo si** la imagen ya comunica esa toma y sin perder univocidad de fase.

## 5. HTML semántico mínimo

Reemplazar **solo** los cuatro párrafos directos de `.case-story-captions` por cuatro bloques. Mantener `[data-case-caption]` para reaprovechar medición/layout/foco del controlador:

```html
<div class="case-story-captions" aria-label="Tomas cinematográficas de Mollequiles">
  <article data-case-caption data-case-shot="hero">
    <p class="case-story-shot-label" data-copy="caseShot1Label">01 · Plano principal</p>
    <h3 class="case-story-shot-title" data-copy="caseShot1Title">Una captura. Muchas posibilidades.</h3>
    <p class="case-story-shot-body" data-copy="caseShot1Body">
      El plato es el punto de partida para una historia visual.
    </p>
  </article>
  <article data-case-caption data-case-shot="volume">
    <p class="case-story-shot-label" data-copy="caseShot2Label">02 · Perspectiva lateral</p>
    <h3 class="case-story-shot-title" data-copy="caseShot2Title">Cambia el ángulo. Cambia la historia.</h3>
    <p class="case-story-shot-body" data-copy="caseShot2Body">
      Un nuevo ángulo revela el volumen y cambia la lectura de la escena.
    </p>
  </article>
  <article data-case-caption data-case-shot="detail">
    <p class="case-story-shot-label" data-copy="caseShot3Label">03 · Plano detalle</p>
    <h3 class="case-story-shot-title" data-copy="caseShot3Title">Los detalles también cuentan.</h3>
    <p class="case-story-shot-body" data-copy="caseShot3Body">
      Un acercamiento destaca texturas, ingredientes y contrastes.
    </p>
  </article>
  <article data-case-caption data-case-shot="editorial">
    <p class="case-story-shot-label" data-copy="caseShot4Label">04 · Composición editorial</p>
    <h3 class="case-story-shot-title" data-copy="caseShot4Title">Una escena. Distintas maneras de mostrarla.</h3>
    <p class="case-story-shot-body" data-copy="caseShot4Body">
      De planos generales a primeros planos para contar nuevas historias.
    </p>
  </article>
</div>
```

**Importante:** `rework.js` debe traducir las nueve palabras de estructura que cambien (si aplica), preservar atributos de idioma, y dar equivalentes a las 12 keys del nuevo contenido. Mantener el caso comercial AM:PM fuera del storyboard sin cambios.

## 6. Localización editorial propuesta (revisar con hablantes)

Las siguientes strings son ejemplo de contenido requerido, no traducciones verificadas por hablantes nativos. Priorizar equivalencia de intención sobre literalidad, y revisar particularmente longitud de DE/JA.

```js
const SHOT_COPY = {
  es: {
    caseShot1Label:'01 · Plano principal', caseShot1Title:'Una captura. Muchas posibilidades.', caseShot1Body:'El plato es el punto de partida para una historia visual.',
    caseShot2Label:'02 · Perspectiva lateral', caseShot2Title:'Cambia el ángulo. Cambia la historia.', caseShot2Body:'Un nuevo ángulo revela el volumen y cambia la lectura de la escena.',
    caseShot3Label:'03 · Plano detalle', caseShot3Title:'Los detalles también cuentan.', caseShot3Body:'Un acercamiento destaca texturas, ingredientes y contrastes.',
    caseShot4Label:'04 · Composición editorial', caseShot4Title:'Una escena. Distintas maneras de mostrarla.', caseShot4Body:'De planos generales a primeros planos para contar nuevas historias.'
  },
  en: {
    caseShot1Label:'01 · Hero shot', caseShot1Title:'One capture. Many possibilities.', caseShot1Body:'The dish becomes the starting point for a visual story.',
    caseShot2Label:'02 · Side perspective', caseShot2Title:'Change the angle. Change the story.', caseShot2Body:'A new angle reveals volume and a different reading of the scene.',
    caseShot3Label:'03 · Close-up', caseShot3Title:'Details tell a story too.', caseShot3Body:'A close-up brings textures, ingredients and contrasts into focus.',
    caseShot4Label:'04 · Editorial frame', caseShot4Title:'One scene. More ways to show it.', caseShot4Body:'Explore wide shots and close-ups for different visual stories.'
  },
  de: {
    caseShot1Label:'01 · Hauptaufnahme', caseShot1Title:'Eine Aufnahme. Viele Möglichkeiten.', caseShot1Body:'Das Gericht wird zum Ausgangspunkt einer visuellen Geschichte.',
    caseShot2Label:'02 · Seitenperspektive', caseShot2Title:'Neuer Blickwinkel. Neue Wirkung.', caseShot2Body:'Ein anderer Kamerawinkel zeigt Volumen und eine neue Perspektive.',
    caseShot3Label:'03 · Detailaufnahme', caseShot3Title:'Auch Details erzählen.', caseShot3Body:'Eine Nahaufnahme betont Texturen, Zutaten und Kontraste.',
    caseShot4Label:'04 · Editorial-Komposition', caseShot4Title:'Eine Szene. Viele Blickwinkel.', caseShot4Body:'Von der Totalen bis zum Detail entstehen neue Bildideen.'
  },
  ja: {
    caseShot1Label:'01 · メインショット', caseShot1Title:'ひとつの撮影から、さまざまな表現へ。', caseShot1Body:'料理の記録が、映像表現の出発点になります。',
    caseShot2Label:'02 · サイドアングル', caseShot2Title:'角度が変わると、見え方も変わる。', caseShot2Body:'視点を動かすことで、料理の奥行きや立体感が伝わります。',
    caseShot3Label:'03 · クローズアップ', caseShot3Title:'細部にも物語がある。', caseShot3Body:'質感や食材、色のコントラストを引き立てます。',
    caseShot4Label:'04 · エディトリアル', caseShot4Title:'ひとつのシーンに、いくつもの構図。', caseShot4Body:'引きの画から寄りの画まで、多彩な表現を探れます。'
  }
};
```

## 7. Controller — dos fuentes a sincronizar

Actualmente el controller llama `phaseAt(p)` y `captions.forEach((caption,index)=>caption.hidden=pinned && index!==phase)`. Debe pasar a `shotAt(p)` con las mismas fronteras de `POSES`. Conservar el funcionamiento del estado no-pinned:

```js
// Cambiar import phaseAt por shotAt, conservar progressAt/passAt/revealAt.
const activeShot = shotAt(p);
captions.forEach((caption, index) => {
  caption.hidden = pinned && index !== activeShot;
});
const reachedP = p + 1 / Math.max(1, rect.height - pin.offsetHeight);
const currentView = Math.max(1, POSES.filter(v => reachedP >= v.p).length);
// Garantizar paridad actual-view vs activo en fronteras y posterior.
```

En `p<.04`, `shotAt` devuelve 0, mientras la barra puede mostrar 1 sin haber alcanzado la marca A. Se admite esta condición como «vista inicial», pero debe definirse si la primera marca se enciende en .04 o inmediatamente; conservar la implementación y sus tests de `main` a menos que QA revele confusión.

**Accesibilidad y animación tipográfica:** la opción más robusta es **cambio instantáneo** al cruzar el umbral con CSS fade breve solo cuando `prefers-reduced-motion:no-preference`. Un efecto de desvanecimiento CSS basado en el cambio de atributo no debe dejar palabras superpuestas ni pérdida de foco; no ocultar con opacity=0 de forma permanente. El diseño puede optar por cambio sin transición si la semántica es más clara.

**No hacer que `aria-live` anuncie cada toma**. La barra mantiene `aria-valuetext="Vista n de 4"`; los bloques son DOM y aparecen de forma ordenada con scrolling. En fallback/no-JS, todos los captions permanecen legibles con flujo natural; no fijar `hidden` en HTML inicial.

## 8. CSS — estabilidad visual del copy

El controller mide `Math.max(...captions.map(el=>el.getBoundingClientRect().height))` y alterna temporalmente estados `story`/`explore` para encontrar espacio de ambos. Los nuevos `<article>` pueden aumentar considerablemente esa altura. **No usar** altura estática de 5em o truncamiento indiscriminado.

Implementación orientativa:

```css
/* Agregar despues del CSS actual, conservando estilos de pinned/movil/landscape */
.case-story-captions [data-case-caption] {
  min-width: 0;
  align-self: start;
}
.case-story-shot-label {
  font-size: 11px;
  line-height: 1.45;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: var(--muted);
}
.case-story-shot-title {
  font-size: clamp(24px, 2.55vw, 38px);
  line-height: 1.13;
  letter-spacing: -.035em;
  margin: .5rem 0;
  max-width: 22ch;
}
.case-story-shot-body {
  font-size: clamp(14px, 1.1vw, 17px);
  line-height: 1.5;
  max-width: 44ch;
}
@media(max-width:760px) {
  .case-story-scroll[data-pinned="true"] .case-story-shot-title {
    font-size: clamp(20px, 5.8vw, 26px);
    max-width: none;
  }
  .case-story-scroll[data-pinned="true"] .case-story-shot-body {
    font-size: 13px;
    line-height: 1.4;
  }
}
```

Revisar los estilos actuales `.case-story-captions p` porque afectan ahora a label+body; crear selectors específicos y evitar que hereden una tipografía de titular de 28–44px por accidente. Calcular `--caption-height` como altura máxima de los **cuatro bloques**, incluidos títulos/descripcion, medir después de cambio de idioma, `document.fonts.ready`, viewport resize y estado de botones reales. Mantener `overflow-anchor:none` y reservar la fila de progress bar. En viewport corto reducir el texto auxiliar (mediante versión corta editorial, no ocultación arbitraria) antes de perder pin. Los tests existentes sobre paisaje táctil pequeño y controles deben pasar.

## 9. Dónde radica la cinematografía y qué NO prometer

La cinematografía aquí proviene de:
- el guion de **cuatro planos** y el porqué de cada uno;
- transiciones de cámara **reversibles** con aceleración/desaceleración deliberada;
- pausas y cambio editorial de textos según la llegada a la pose;
- encuadre que respeta agujeros/bordes de la reconstrucción y poster real;
- composición de copy que permite lectura, no de efectos de trailer.

No prometer capacidad de reiluminación libre, fotos completamente nuevas desde ángulos no capturados, ni campaña publicitaria creada; el mensaje describe **potencial de selección y dirección de cámara a partir de un modelo**. Los distintos recortes finales se convierten en entregables solo tras producir/validar archivos de salida reales.

## 10. Orden de trabajo y commits recomendados

1. **Baseline**: captura el actual `main` y sus números de QA; documentar `docs/qa/cinematic-v2-baseline.md` con 4 poses y móvil/desktop, sin mover engine.
2. **Shot data y timeline**: `SHOTS`, `shotAt`, `cameraAt` holds y tests de fronteras (0,.005,.04,.055,.38,.425,.72,.765,.90,1), continuidad/reversa, límites y primer movimiento alrededor de .06.
3. **Copy e i18n**: markup 4× `article`, 12 keys en 4 idiomas, CSS de estabilidad, alturas medidas y fallback no-JS.
4. **Controller**: conectar `shotAt` y mantener progress bar exactamente alineado a POSES y captions; activar el título para cada pose.
5. **Polish**: transiciones suaves del copy, ajuste fino de crop/timing basado en capturas físicas, sin modificar parámetros del visor ni crear otro renderer.
6. **QA y documentación**: Playwright/Unit desktop 1440×900, tablet, móviles 390×844, Poco, iPhone, landscape 844×390, 740×360, 844×280 fallback, ES/EN/DE/JA, reduce-motion, WebGL off, carga tardía, foco/teclado, acceso a contacto, compare/main y control de assets.
7. **PR**: abrir a `main` una vez completas pruebas y revisión visual del usuario, no antes. Cada commit de implementación verificable; Markdown por avance importante.

## 11. Checklist de aceptación

- [ ] Logo/wordmark y assets SPZ/poster no cambian ni se renombran.
- [ ] Cuatro tomas con cuatro textos y razones visuales distintos, ES/EN/DE/JA.
- [ ] Un único `shotAt` determina copy y barra de vistas; umbrales de llegada exactos.
- [ ] Misma `cameraAt(p)` para scroll ida/vuelta; holds B/C suaves, sin saltos angulares.
- [ ] Primer movimiento apreciable aprox. p=.06; no alargar el silencio de apertura.
- [ ] Móvil y landscape conservan pin cuando cabe, pinch óptico y orbita; reduced-motion sin animación obligatoria.
- [ ] No-JS/ error muestra todos los planos como texto legible y enlace.
- [ ] Ninguna toma añade artefactos ni duplica escena GPU; failover poster.
- [ ] Medición de captions y botones evita recortes, CLS o scroll anchoring.
- [ ] Progressbar accesible, teclado/foco/formulario/traducciones intactos.
- [ ] Documentación de QA y evidencia visual comparativa; PR después de validar.

## 12. Fuentes internas

- [11-storyboard-cinematografico-por-tomas.md](11-storyboard-cinematografico-por-tomas.md)
- `main:motion/story-timeline.mjs`, `motion/pinned-case-controller.js`, `motion/splat-viewer.js`
- `main:index.html`, `rework.css`, `rework.js`
- `docs/plans/muyal-pinned-story/07-mobile-and-motion-revision.md`
- `docs/plans/muyal-pinned-story/08-early-response-and-dolly.md`
- `docs/plans/muyal-pinned-story/09-view-progress.md`
- `docs/plans/muyal-pinned-story/10-block06-landing-motifs.md`
