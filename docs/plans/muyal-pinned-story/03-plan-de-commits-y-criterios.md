# CreatiVivid — 03. Plan incremental de Codex y criterios de aceptación

> Bloque 06 implementado: [10-block06-landing-motifs.md](10-block06-landing-motifs.md). Esta hoja conserva el plan original; estado y evidencia actuales en los documentos de implementación/QA.
Estado: planificación. Esta rama contiene documentos separados en commits separados; **no** modifica la web ni abre PR.

## 1. Forma de trabajo

- Rama creada desde `main`: `codex/creativivid-muyal-pinned-story`.
- Mantener decisiones y avances en documentos Markdown; un documento nuevo por commit de planificación.
- Cuando comience implementación, commits pequeños, autocontenidos, con tests y notas; abrir PR **hacia main** solo cuando el feature esté completado y validado.
- Las tres partes de este plan son guía, no aprobación de publicar ni modificar la identidad.
- Preservar cambios de otros autores; actualizar la rama respecto a main antes de PR.

## 2. Entregables del feature (orden recomendado)

| Commit sugerido | Alcance | Verificación para continuar |
|---|---|---|
| 01 | Baseline visual y rendimiento: capturas desktop/móvil, inventario de recursos y mini informe en docs | Datos verificables y screenshots |
| 02 | Extraer visor de `splat-demo.js` a módulo reutilizable sin cambiar comportamiento observable | El visor existente conserva controles y fallback |
| 03 | DOM y CSS del case pinned con poster y texto semántico, sin 3D | Sticky/reflow/salto de anclas funcionan |
| 04 | Controlador de progreso de scroll y timeline de fases, con poster→panel | Reversible; sin scroll hijacking |
| 05 | Conectar SPZ piloto, estados `loading/story/free/error`, keyframes reales | Renderer único, curva/cámara estable, fallback |
| 06 | Motivos decorativos MUYAL (SVG abstractos), servicios y proceso | Logo canónico sigue intacto |
| 07 | Responsive, reducción de movimiento, teclado, idiomas y performance | Cumple matriz de QA |
| 08 | Documentación de integración de splats nuevos y validación visual final | Capturas, mediciones y licencia de archivos |
| PR | Revisión del feature en conjunto y comparación antes/después | Todos los criterios de aceptación |

No hacer PR prematuro si hay pendientes de assets, pruebas móvil o regresiones.

## 3. Criterios de aceptación (obligatorios)

### Marca y contenido
- [ ] El logo real MUYAL se mantiene byte-identical, sin deformaciones ni animación del PNG original.
- [ ] Firma `CreatiVivid`, Sniglet 400 y geometría actual sin cambios.
- [ ] Hero dice con claridad qué ofrece el estudio y conserva su CTA.
- [ ] El caso AM:PM sigue contando el flujo real (3D, personalización y WhatsApp) sin claims de compra/cobro no implementados.
- [ ] Una persona puede encontrar servicios y llegar a contacto sin activar 3D.

### Interacción
- [ ] Scroll normal, sin capturarlo en un contenedor o bloquearlo.
- [ ] Progreso reversible; al reingresar en la sección la cámara vuelve al estado correspondiente.
- [ ] La experiencia pinned se detiene y se libera correctamente.
- [ ] La exploración libre se activa por elección, con reset y salida.
- [ ] Al hacer scroll rápido, al refrescar a mitad de sección y al usar anclas, no aparecen frames rotos.

### Accesibilidad y adaptabilidad
- [ ] `prefers-reduced-motion` muestra el contenido sin exigir secuencia animada.
- [ ] Teclado, foco, lector de pantalla y estados de error cubiertos.
- [ ] Móvil: sin scroll trap, sin texto oculto por escenas, sin bloquear gestos.
- [ ] ES/EN/DE/JA verificados con longitudes reales.
- [ ] Fallback sin WebGL muestra poster, explicación y links.

### Calidad técnica
- [ ] Solo una escena WebGL activa, sin fugas tras entrar/salir.
- [ ] La escena no bloquea contenido inicial ni empeora notablemente el LCP respecto a la baseline.
- [ ] FPS y recursos medidos en escritorio y móvil con dispositivo concreto.
- [ ] `node --check`, pruebas existentes relevantes, navegación y formulario sin regresiones.
- [ ] Licencias de los splats y assets comprobadas; nombres/rutas locales documentados.

## 4. Integración de los splats que entregará el usuario

Anotar para cada candidato: nombre del archivo, formato (`.spz`, `.ply`, otro), tamaño, fuente/origen, permiso de uso, orientación, objeto o espacio representado, fondo, ajustes de cámara y restricciones de publicación.

Elegir un candidato para MVP. El segundo es opcional y no debe cargarse simultáneamente sin necesidad. Si es de otro proyecto distinto de AM:PM, evitar hacerlo pasar por ese trabajo; considerarlo una futura sección de «Exploraciones del estudio».

## 5. Preguntas de revisión editorial (no bloquean primer prototipo)

1. ¿Se mantiene el caso AM:PM como protagonista o se utiliza un splat de exploración propia en una sección separada?
2. ¿Cuánto debe durar el pin en móvil? Resolver tras probar dispositivos reales, con preferencia por reducir o eliminar pin.
3. ¿La exploración libre se abre en el mismo panel o una vista enfocada? Elegir según accesibilidad y fricción comprobadas.

## 6. Fuentes / archivos consultados

- `index.html`, `rework.css`, `rework.js`, `splat-demo.js`
- `design/branding/manual/manual-de-marca.md`, versión 0.10
- `design/site-rework/README.md`
- https://skiper-ui.com/v1/skiper19
- https://skiper-ui.com/v1/skiper32
- https://www.awwwards.com/sites/unseen-studio

