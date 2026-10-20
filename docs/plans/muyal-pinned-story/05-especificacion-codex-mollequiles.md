# CreatiVivid — 05. Especificación ejecutable para Codex: Mollequiles pinned

> Revisión vigente de cámara, móvil y gestos: [07-mobile-and-motion-revision.md](07-mobile-and-motion-revision.md). Las decisiones anteriores sobre móvil sin pin y botones de zoom son históricas.
Estado: plan de desarrollo. Este documento no implementa ni publica cambios.

## 0. Contrato de trabajo

- Rama objetivo: `codex/creativivid-muyal-pinned-story`, nacida de `main`. No editar `main` directamente.
- Ejecutar los cambios en commits secuenciales pequeños, **documentando un paso Markdown por commit de planeación**. Los commits de implementación deben incluir su test y descripción.
- Abrir PR a `main` cuando el feature y QA estén completos, no antes.
- Mantener logo `assets/brand/muyal-canonical.png`, geometría, Sniglet 400, tamaños, espaciado y nombre **CreatiVivid** tal cual.
- No migrar a React, no añadir SHARP y no añadir una segunda escena WebGL al hero.
- Mantener ES/EN/DE/JA, CTA principal, navegación, caso real AM:PM, formulario y privacidad.

## 1. Gate A: identificar y recuperar el asset correcto

Fuente en GitHub: `keneth4/menu_maker`, directorio `deployments/ampm/ampm-site-deploy-2026-10-06.zip` (~99.7 MB). Extraerlo localmente, verificar `SHA256SUMS` y leer la estructura interna (no copiar el ZIP entero a la landing).

**Hecho verificado:** `exported-sites/AM PM/` es un export anterior basado en sprites 360, sin ficheros SPZ individuales; `catalog.json` llama «Mollequiles» a una opción del producto «Chilaquiles». No equiparar esa opción con un identificador SPZ sin pruebas. El README del ZIP indica que el despliegue sí contiene `playcanvas-spz-spike/`, pero todavía no se inspeccionaron los ficheros internos. **No inventar nombre ni ruta** del modelo.

Codex debe:

1. Extraer `catalog.json`, `runtime-manifest.json`, `asset-manifest.json` y listar `*.spz` del ZIP.
2. Identificar la asociación exacta «Mollequiles» ↔ producto ↔ visual ↔ SPZ. Si no existe ese modelo individual o no hay correspondencia verificable, **detener integración 3D**, producir reporte y continuar solo con shell/poster; no sustituir por chilaquiles/huevos sin avisar.
3. Capturar por visual: `view`, `interaction`, `transform`, `orientation`, `spzVisual/spz` o el equivalente exportado, ID, ruta, bytes y hash SHA-256.
4. Detectar formato por cabecera: gzip `1f 8b` = formato Spark gzip v1–v3; `NGSP` + versión 4 = Niantic NGSP v4 con PlayCanvas; otro formato = investigar/convertir explícitamente o detener. La extensión sola no basta.
5. Extraer o renderizar un poster **de ese modelo en la pose A**. Mantener el poster del caso original como respaldo hasta conseguir el correspondiente.
6. Copiar únicamente un asset final optimizado, poster y licencias a `assets/rework/`. Evitar duplicar la escena antigua y recursos innecesarios.

Fuentes para paridad: `keneth4/menu_maker/src/catalog2/splat/defaults.ts`, `src/catalog2/splat/cameraPose.ts`, `src/catalog2/spz-spike/spzCameraController.ts`, `src/catalog2/playcanvas-spz-spike/runtimeScript.ts`.

### Cámara, límites y zoom

El código de Menu Maker tiene por defecto `minElevationDeg=30`, `maxElevationDeg=88`, `horizontalOrbitRangeDeg=360`, `minZoom=0.5`, `maxZoom=1`, `yawDeg=0`, `elevationDeg=45`, `fieldOfViewDeg=30` y `distanceMultiplier=1`. **Son defaults generales, no configuración confirmada de Mollequiles.** Se deben usar valores efectivos **por visual** si están presentes en el ZIP.

El visor actual de CreatiVivid usa `OrbitControls` y límites distintos; no copiar de ahí los límites como si fuesen los de AM:PM.

En el runtime de Menu Maker, `zoom` es un multiplicador de distancia: 0.5 significa cámara más cercana que 1. Respetar el intervalo original y orientar el eje vertical exactamente como el runtime/export del modelo. Deshabilitar `autoRotate` durante scroll-story incluso si el runtime original lo tenía activo.

Guardar la configuración extraída y su procedencia en `docs/plans/muyal-pinned-story/asset-audit-mollequiles.md`, incluyendo captura de la pose inicial, poses A–D, compatibilidad del engine y SHA.

## 2. Arquitectura de archivos y DOM

Mantener HTML estático y JS nativo como el sitio actual:

```text
index.html                         # seccion #proyectos preserva semántica
rework.css                        # estilos base existentes
rework.js                         # i18n, CTA y formulario existentes
splat-demo.js                     # dejar como adaptador o retirarlo tras extracción del viewer
motion/
  case-story-config.js             # rangos de p, keyframes y asset config
  scroll-progress.js               # progreso normalizado + sticky lifecycle
  pinned-case-controller.js        # state machine, transiciones, control y fallback
  splat-viewer.js                  # instancia única de renderer + Spark O PlayCanvas
  mu yal-motifs.js                 # nombre sugerido cambiar a muyal-motifs.js
assets/rework/
  ampm-mollequiles.spz             # NOMBRE PROPUESTO, SOLO DESPUES DE VERIFICAR
  ampm-mollequiles-poster.webp
```

Usar archivo real `motion/muyal-motifs.js` (sin espacios) si se implementa.

HTML sugerido (mantener el copy dentro de DOM y los atributos data-copy de traducción):

```html
<section id="proyectos" class="case shell" aria-labelledby="case-title">
  <h2 id="case-title" data-lines="caseTitle">
    Un negocio real. Una experiencia distinta.
  </h2>
  <div class="case-intro">
    <!-- información AM:PM, ubicación, descripción y enlace actual -->
  </div>

  <div class="case-story-scroll" data-case-story>
    <div class="case-story-pin" data-case-pin>
      <figure class="case-story-media" data-case-media>
        <img class="case-story-poster"
             src="./assets/rework/ampm-mollequiles-poster.webp"
             alt="Mollequiles del restaurante AM:PM"
             data-case-poster />
        <div class="case-story-canvas" data-case-canvas aria-hidden="true"></div>
      </figure>
      <div class="case-story-overlay">
        <p data-case-caption data-copy="caseStoryIntro"></p>
        <div class="case-story-controls">
          <button type="button" data-case-explore hidden data-copy="caseExplore3d">
            Explorar en 3D
          </button>
          <button type="button" data-case-reset hidden data-copy="caseReset">
            Restablecer vista
          </button>
          <button type="button" data-case-exit hidden data-copy="caseExit">
            Volver al recorrido
          </button>
          <a href="https://ampm.creativivid.com/" target="_blank"
             rel="noopener noreferrer" data-copy="explore">Ver AM:PM</a>
        </div>
        <p role="status" aria-live="polite" data-case-status></p>
      </div>
    </div>
  </div>

  <div class="project-details">
    <!-- detalles del proyecto existentes -->
  </div>
</section>
```

El `src` del poster sugerido no debe publicarse hasta existir el archivo; mantener referencia actual/fallback en el primer commit.

## 3. CSS: sticky sin bloquear scroll

```css
.case-story-scroll {
  --story-progress: 0;
  position: relative;
  height: 300svh; /* hipótesis desktop, ajustar tras QA */
}
.case-story-pin {
  position: sticky;
  top: 0;
  height: 100svh;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  overflow: clip;
}
.case-story-media { position: relative; min-height: 0; margin: 0; }
.case-story-poster,
.case-story-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.case-story-poster { object-fit: contain; }
.case-story-canvas { opacity: 0; pointer-events: none; }
.case-story-canvas canvas { display: block; width: 100%; height: 100%; }
.case-story-controls { position: relative; z-index: 2; }
.case-story-pin[data-mode="explore"] .case-story-canvas {
  pointer-events: auto;
}
@media (max-width: 760px), (prefers-reduced-motion: reduce) {
  .case-story-scroll { height: auto; }
  .case-story-pin { position: relative; height: auto; min-height: 60svh; }
}
```

Implementar capas, contraste, safe-areas, captions y media queries a partir del diseño actual. No mostrar opciones cuando `WebGL` no esté listo. No usar `touch-action:none` a nivel de documento ni scroll locking.

## 4. JS: progreso, timeline y cámara

Contrato de progreso:

```js
const clamp01 = n => Math.min(1, Math.max(0, n));
const scrollProgress = (container, viewportHeight = window.innerHeight) => {
  const rect = container.getBoundingClientRect();
  return clamp01(-rect.top / Math.max(1, rect.height - viewportHeight));
};
const ease = t => t * t * (3 - 2 * t);
const phase = p =>
  p < .20 ? 'poster' :
  p < .45 ? 'reveal' :
  p < .80 ? 'camera' : 'outro';
```

Los intervalos son exactamente los del documento 04, con subrangos `.20–.32`, `.32–.45`, `.45–.60`, `.60–.70`, `.70–.80` y `.80–1.00`. Definirlos como constantes para evitar hardcoding inconsistente.

```js
const clamp = (v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const lerp = (a,b,t)=>a+(b-a)*t;
const segment = (p,a,b)=>ease(clamp01((p-a)/(b-a)));
function cameraAt(p, poses) {
  let a,b,t;
  if(p<.60){a=poses.A;b=poses.B;t=segment(p,.45,.60);}
  else if(p<.70){a=poses.B;b=poses.C;t=segment(p,.60,.70);}
  else {a=poses.C;b=poses.D;t=segment(p,.70,.80);}
  return {
    yawDeg:lerp(a.yawDeg,b.yawDeg,t),
    elevationDeg:lerp(a.elevationDeg,b.elevationDeg,t),
    zoom:lerp(a.zoom,b.zoom,t)
  };
}
```

Antes de usar `cameraAt`, normalizar yaw para evitar discontinuidad al cruzar 360°, y clamplear **todas** las poses e interpolaciones a los límites del visual. Para órbita parcial, el rango yaw permitido se centra en el valor de `view.yawDeg` y cubre medio arco por lado, según `spzCameraController.ts`. Revisar invertidos/flip del modelo. En modo libre, `cameraAt` no pisa la cámara hasta salir de exploración.

Adaptador de visor requerirá esta interfaz estable:

```js
// Contrato conceptual (no implementacion definitiva)
const viewer = await createMollequilesViewer({
  host: canvasHost,
  source,       // {url, format, assetHash}
  view,         // extraido del visual AM:PM
  interaction,  // limites efectivos del visual
  orientation,
  onReady: () => {}, onError: () => {}
});
viewer.setPose({yawDeg, elevationDeg, zoom});  // ya clamped
viewer.setInteractive(false);
viewer.renderIfNeeded();
viewer.resize();
viewer.pause();
viewer.dispose();
```

Detectar motor por contenedor real: **Spark para gzip SPZ v1–v3, PlayCanvas parser para NGSP v4**. Un archivo NGSP v4 no debe enviarse al `SplatMesh` de Spark sin conversión validada. Reutilizar Three/Spark locales cuando corresponda; si requiere PlayCanvas, respetar licencias, carga diferida y arquitectura de visor aislada.

Carga bajo demanda: `IntersectionObserver` con margen de prefetch moderado (p.ej. `500px`, ajustable), poster primero, Canvas solo visible tras primer frame. `requestAnimationFrame` único para leer scroll+aplicar progreso, con `passive:true` en scroll; desuscribir en dispose. Pausar render cuando el caso no está visible o `document.hidden`.

Estados: `poster → loading → story → explore → story` y alternativas `static/error`. Al dar clic en «Explorar», conservar la pose actual, habilitar arrastre y pinch sin wheel zoom; con «Salir» aplicar la pose correspondiente al progreso actual; «Reset» aplica D. Si el pinned termina o una ancla saca al visitante de él, desactivar `explore` sin atrapar scroll.

## 5. Reglas para el copy, movimiento y marca

- El recorrido empieza y termina con un caso auténtico y CTA a AM:PM.
- Los motivos de puntos/curvas pueden entrar en los márgenes, nunca tapar el plato o texto.
- No animar, deformar ni reemplazar el PNG/logo MUYAL o su firma.
- Evitar otro WebGL en hero; el hero mantiene mensaje y CTA.
- Animación `prefers-reduced-motion` desactivada por defecto; explorar voluntariamente puede seguir disponible si dispositivo compatible.
- Todos los strings nuevos en `rework.js` tienen ES, EN, DE, JA; el texto permanece en DOM.
- No afirmar que el icono MUYAL sea equivalente histórico a gaussianos.

## 6. Tareas y commits de implementación sugeridos

1. **Asset audit**: abrir ZIP de AM:PM, localizar la geometría verdadera de Mollequiles, determinar formato/perfil por visual. Generar `asset-audit-mollequiles.md`; detener SPZ si asociación no verificable.
2. **Viewer extraction**: extraer visor actual conservando su comportamiento sin regresión y documentar formato soportado.
3. **Story DOM + CSS**: case sticky accesible con poster, navegación y CTA; probar sin JS y en escritorio/móvil.
4. **Timeline + reverse scroll**: progreso determinista, crossfade y señales de fase con unit tests; poster aún suficiente.
5. **SPZ**: lazy import correcto de Spark o PlayCanvas, posar A–D, clamping, un solo renderer, poster coincidente y modo libre.
6. **Motion system**: trazos/puntos decorativos derivados de MUYAL sin modificar logo.
7. **QA**: tests de scroll rápido/inverso, red lenta, WebGL fallido, reduced-motion, teclado, cuatro idiomas y formulario.
8. **Perf, polish y PR**: medición antes/después, limpieza, revisión de licensing, screenshots de diferentes anchos y PR a `main`.

**Sin copiar assets ni publicar** hasta pasar Gate A. Reutilizar commits de planificación 01–05 como contexto para Codex.

## 7. Criterios de aceptación adicionales

- [ ] Asset de Mollequiles correcto, ruta verificada desde ZIP, `SHA-256` y formato en docs.
- [ ] Config de interacción específica del visual, no solo defaults genéricos.
- [ ] A y poster con coincidencia de encuadre; B/C/D no revelan lados defectuosos.
- [ ] Progreso 0→100→0 reproduce mismos frames en los mismos puntos.
- [ ] Resize, orientación, salto por ancla y refresh en medio de story sin teletransportes.
- [ ] 3D opcional; sin WebGL no desaparece proyecto/copy/enlaces.
- [ ] Scroll vertical no se usa para zoom; no hay bloqueo táctil.
- [ ] Un único renderer activo, sin duplicar hero; liberar recursos al desmontar.
- [ ] MUYAL, Sniglet, wordmark y responsive actuales conservados.
- [ ] QA móvil real, desktop, ES/EN/DE/JA, lector de pantalla, reduced-motion y rendimiento.

