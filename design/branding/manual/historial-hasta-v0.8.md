# Creativivid — Manual de marca e identidad

Versión 0.8 · Documento vivo · 12 de octubre de 2026

Este manual registra la dirección del estudio y las decisiones de identidad. No constituye aún una guía de producción cerrada. **Aceptado** indica una decisión del usuario; **provisional** indica una propuesta que sigue en evaluación. Cada nueva ronda deberá actualizar este documento, conservando el motivo de los cambios.

## 1. Esencia y propósito

**Aceptado.** Creativivid combina Creativo y Vívido. El estudio crea sitios web, experiencias online y comercio electrónico. Su horizonte incluye experiencias espaciales y tecnologías relacionadas con radiance fields, especialmente Gaussian Splatting.

**Provisional.** Expresar esa esencia como «dar presencia a lo imaginado». Es una brújula interna, pendiente de decidir si debe convertirse en texto público.

La identidad debe comunicar imaginación, precisión y vitalidad. El cliente debe poder apreciar la marca sin conocer la tecnología. Los gaussianos aportan un lenguaje material y una posibilidad de movimiento; no obligan a convertir cada comunicación en una explicación técnica.

## 2. Oferta y arquitectura de marca

**Aceptado.** Creativivid es el estudio. MenuMaker es una herramienta que utiliza, no el nombre del servicio ni la totalidad de su capacidad.

La oferta actual comprende creación de sitios web, experiencias online y e-commerce. AMPM es el caso público disponible: https://ampm.creativivid.com/. No atribuir resultados de ventas, conversión o rendimiento que no hayan sido medidos.

**Aceptado.** La landing se orienta a un mercado internacional, empezando por español. Mantener como horizonte las versiones EN, DE y JA existentes. La política comercial contempla propuestas adaptadas al alcance, negocio y presupuesto; no presentar tarifas fijas como una decisión consolidada.

## 3. Voz

**Provisional.** Clara, cercana, inventiva y precisa. Hablar de lo que el cliente podrá hacer y experimentar, apoyándose en ejemplos verificables. Preferir verbos concretos: crear, explorar, mostrar, comprar, recorrer.

Evitar promesas vacías de innovación, superioridad o resultados garantizados. Distinguir servicios disponibles de capacidades futuras. El lenguaje técnico entra cuando ayuda a comprender una experiencia o una decisión.

## 4. Identidad visual: decisiones actuales

**Aceptado, 12 octubre 2026.** Logo canónico actual: símbolo MUYAL compacto refinado, archivo `../muyal/04-compact-refined.png`. El raster se conserva como referencia aprobada; la construcción vectorial precisa queda pendiente. La inspiración proviene del glifo MUYAL documentado; la relación con nube de puntos y gaussianos es una reinterpretación contemporánea del estudio.

**Aceptado.** El nombre completo Creativivid se compone en una fuente, acompañado por el símbolo. Se deja atrás el tratamiento con elipses en ivivi. Las firmas 100/101/117/120/121 y el cubo quedan como historial de exploración y no como identidad vigente.

**En evaluación.** Diez familias: Manrope, DM Sans, Space Grotesk, Outfit, Plus Jakarta Sans, Sora, Urbanist, Inter, Instrument Sans y Fraunces. Comparación en `../type-muyal/review.html`. No hay fuente aprobada todavía.

## 5. Construcción descartada del símbolo111

Sistema de coordenadas: 1024 × 1024; eje y hacia abajo. Arista frontal de referencia: (512,460) a (512,820). Punto central del canal: P=(512,640), donde 640=(460+820)/2.

El brazo izquierdo va de (240,480) a P. Su pendiente 160/272 coincide con la arista de (240,300) a (512,460). El brazo derecho conecta P con (784,380), pendiente −260/272. Canal de 32 unidades, medido perpendicularmente, con encuentro en inglete. Una apertura poligonal derecha permite evaluar lectura de C.

En el estudio descartado111 la posición corresponde al eje del canal, no al borde inferior visible. No usar estas coordenadas para justificar la nueva geometría de107.

Archivo editable: ../round-111/111-geometric.svg. Construcción anotada: ../round-111/111-construction.svg. El generador verifica las relaciones de paralelismo y punto medio. Las proporciones exteriores son una construcción propuesta, no un calco exacto del raster 107.

## 6. Estudios gaussianos descartados para la firma

Las variantes 112–114 generan gaussianos tridimensionales procedurales para «ivivi», con semilla 42017. Cada registro tiene posición, escalas positivas, cuaternión unitario, color y opacidad. Se exportan en PLY con la disposición habitual de Graphdeco; no provienen de entrenamiento ni reconstrucción fotográfica.

Las vistas usan proyección ortográfica y composición alfa de huellas gaussianas, con la misma covarianza de los datos exportados. No son elipses sólidas ni imágenes generadas por IA. Densidades: 1600, 850 y 450 gaussianos. Una densidad menor puede abrir huecos y perder continuidad; una mayor puede saturar los trazos. La opacidad tiene caída suave y los bordes no equivalen a un logo vectorial nítido.

«Creat» y «d» usan Avenir Next Bold como soporte temporal para comparar; no reproducen exactamente el lettering aceptado. Revisar altura, espaciado y peso antes de crear la firma definitiva. La disponibilidad local de una fuente no establece sus permisos de distribución.

Validación actual: lectura de todos los registros PLY, valores finitos, escalas positivas y cuaterniones normalizados. **Pendiente:** carga en PlayCanvas/Spark u otro visor nativo, evaluación de orientación/cámara y reducción óptica. No anunciar compatibilidad comprobada antes de realizarla.

Referencia técnica: [3D Gaussian Splatting, Kerbl et al.](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/).

## 7. Uso y pendientes de producción

Por ahora evaluar en negro sobre blanco. Color, tipografía secundaria, composición final, área de protección, tamaños mínimos y versiones inversas siguen pendientes. No asignar medidas arbitrarias como si estuvieran aprobadas.

La firma principal deberá conservar lectura completa de Creativivid. El símbolo tendrá una versión pequeña evaluada por separado. Los renders gaussianos pueden funcionar como versión expresiva o animada, pero la necesidad de una versión sólida sigue abierta.

Evitar deformaciones no uniformes, cambios casuales de semilla, cámaras u opacidad y sustituciones del símbolo por estudios descartados. Cuando se apruebe una versión, archivar SVG, PLY, configuración, semilla y capturas de referencia juntos.

## 8. Próximas decisiones

1. Refinar107 conservando curvas y extremo derecho; revisar posición del vértice inferior.
2. Refinar100/101 con tratamiento híbrido de elipses, continuidad y contorno nítido; evitar apariencia de cuentas.
3. Evaluar lectura a tamaño pequeño del híbrido; reservar la validación PLY para futuras versiones expresivas.
4. Integrar el lettering propio y ajustar la relación símbolo/firma.
5. Definir color y aplicaciones en la landing.

## Registro

11/10/2026 — v0.1: documento inicial; preferencias 100/101/107; construcción 111; gaussianos 112–114. Ninguno de los nuevos estudios se declara final antes de revisión.

11/10/2026 — v0.2: usuario descarta111–114 para la identidad. Conservarlos como registro técnico. Preferir híbrido gráfico a render gaussiano literal: tipografía dirige geometría, elipses aportan materialidad. Ronda115–118 pendiente de aprobación; no declara medidas geométricas exactas en sus imágenes raster.

Ronda115: contorno y extremo derecho conservados aproximadamente, vértice bajado; brazo izquierdo aún no paralelo. Dos ediciones raster no resolvieron esa restricción. Ronda116–118: híbridos nítidos, no gaussianos físicos; persiste posible asociación con cuentas. Todas pendientes de aprobación.

## Actualización v0.3 · reconstrucción vectorial

**Aceptado:**117 es la dirección tipográfica elegida; el ajuste del usuario es la referencia vigente del símbolo, guardada en../vector-v1/user-symbol-reference.png.

**Pendiente de aprobación:**119 reconstruye sus curvas enSVG;120 define26 elipses completas paraivivi;121 muestra sus identificadores. La reconstrucción no es un calco exacto de117. Su encuentro inferior y peso deberán revisarse.

Especificación reproducible: [construcción](../vector-v1/construction-spec.md), [parámetrosJSON](../vector-v1/ellipse-parameters.json), [CSV](../vector-v1/ellipse-parameters.csv). No depende de semilla ni generación de imágenes. Mantener estas listas como fuente de verdad hasta aprobar cambios.

## Actualización v0.4 · isometría

**Aceptado por el usuario:**117,120 y121. Su construcción explícita permanece vigente.

**En revisión:**119 debe ganar regularidad isométrica y alineación del vacío.122–124 usan hexágono regular, ejes±30°/vertical y giro centrado a media arista frontal. [Justificación y construcción](../isometric-v2/construction.md). No declarar ninguna de estas variantes como símbolo final antes de revisión.

## Actualizaciónv0.5 · terminales de la C

Dirección preferida por usuario:124. Estudios125/126 aplican cortes verticales a32/52 unidades del extremo derecho teórico, preservando el canal36 y las curvas originales de los vértices restantes.126 profundiza el truncado, no desplaza el encuentro interior del canal. Ambas pendientes de aprobación. Se mantiene la retícula como referencia aun cuando los terminales abandonan su vértice extremo.

## Actualizaciónv0.6 · nuevo concepto volumétrico

El usuario propone un cubo negro con cortes que evocan V en la cara izquierda y C en la derecha; referencia conceptual, no literal. Primer modelo3D: [construcción](../cube-3d/README.md). Cortes procedurales, cámara ortográfica isométrica, malla cerrada exportadaOBJ/STL. Aún no es símbolo aprobado. Evaluar ranuras y aperturas en3D antes de fijar una proyección2D.117/120/121 siguen aceptados.

Corrección del modelo3D: el corte izquierdo es horizontal en espacio3D, y=0. Visto frontalmente a esa cara, paralelo a la base; en isometría comparte su inclinación proyectada. El giro vertical no convierte la banda inicial en una diagonal en el plano de la cara.

## Rough de Blender aportado por usuario

Nueva fuente geométrica: Cube y tres cortadores originales. Copia con modificadores booleanosExact; posiciones y dimensiones conservadas. [Documentación](../blender-rough/README.md). Resultado cerrado de32 vértices/60 triángulos. Revisar esta base antes de refinar; las mallas procedurales anteriores quedan como estudios históricos.

## Iteración del vacío continuo · 11 de octubre de 2026

El usuario autoriza desarrollar la dirección recomendada en la revisión del rough. [Construcción y evaluación](../continuous-cut/README.md). Se mantiene horizontal el corte izquierdo, en Z=0 en las coordenadas nativas de Blender. Su retorno conserva la posición lateral y se eleva según H=L/2 para equilibrar la altura proyectada de los extremos en la cámara isométrica.

Los cortes se prolongan por el volumen mediante túneles alineados con los rayos de la vista canónica, despejando el fondo de la V y de la boca de la C. Conservan un puente sólido entre sí: la continuidad es visual y constructiva, no una unión literal de todos los vacíos. Resultado final cerrado, una componente, 80 vértices y 156 triángulos. Modelo editable con booleanas exactas; el rough original permanece intacto.

Pruebas directas a 16/24/32/48 px, en positivo y negativo. El retorno es más claro a 32/48; la versión de 16 necesita adaptación óptica antes de usarla como favicon. La geometría favorece la vista isométrica canónica; su lectura varía al girar. Símbolo en revisión, no aprobado como identidad definitiva. La firma 117/120/121 sigue aceptada.


## Dirección vigente · 12 octubre 2026

El usuario establece como logo canónico actual el símbolo MUYAL compacto refinado, 04-compact-refined.png. Fuente raster vigente: ../muyal/04-compact-refined.png; copia para comparación: ../type-muyal/canonical-logo.png. La reproducción vectorial queda pendiente.

Se abandona el tratamiento de elipses en ivivi. La firma se compone del símbolo junto al nombre completo Creativivid usando una sola familia tipográfica. Los estudios 117/120/121 y el cubo son archivo histórico, no identidad vigente.

Diez familias en evaluación: Manrope, DM Sans, Space Grotesk, Outfit, Plus Jakarta Sans, Sora, Urbanist, Inter, Instrument Sans y Fraunces. Ninguna fuente está aprobada aún. Comparación: ../type-muyal/review.html. Se usa peso 600, tamaño 48 px y espaciado −0.025 em para la primera revisión; las compensaciones ópticas se definirán tras selección.

El símbolo es una reinterpretación contemporánea basada en una referencia documentada de MUYAL. Su relación con gaussianos es una lectura creativa del estudio, no un significado histórico atribuido al glifo.


## Firma aprobada · E · 12 octubre 2026

El usuario elige E. La firma vigente combina el símbolo MUYAL compacto refinado (04-compact-refined.png) centrado sobre el nombre Creativivid en Sniglet Regular, peso 400, espaciado −0.025 em. Se conserva el texto completo en una sola fuente, sin elipses en ivivi. Composición aprobada: ../type-muyal/dosis-sniglet/canonical.html.

La comparación usa texto 48 px y lienzo del símbolo 220 px, con márgenes blancos propios del PNG. Las medidas definitivas del símbolo visible y las adaptaciones para tamaños pequeños se fijarán al reconstruir el activo vectorial. No tratar el margen del PNG como área de protección oficial. La composición horizontal no está aprobada como firma principal.
