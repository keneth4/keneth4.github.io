# Cierre de gaps y auditoría de Mollequiles

## Decisiones cerradas
- Móvil y reduced-motion: modo estático sin pin ni timeline; botón independiente del progreso. Antes de cargar: botón de activación; durante carga: estado accesible; controles solo tras primer frame. Carga 3D únicamente por elección.
- Desktop: si no hay primer frame válido al cruzar p=0.20, mantener poster durante toda esa pasada. El modelo listo permite exploración voluntaria al llegar al cierre. Rearmar reveal solo al salir por arriba (p=0) y volver a entrar; no introducirlo a mitad de la pasada ni al regresar desde abajo.
- Móvil: media con relación de aspecto explícita; captions y controles en flujo debajo. Ajustar la proporción al poster y validar sin recortes.
- Táctil: desplazamiento vertical nativo, arrastre horizontal para rotación y botones de zoom; sin pinch en v1. Validar el arbitraje de gestos en teléfono real.

## Evidencia del paquete
Fuente: keneth4/menu_maker, deployments/ampm/ampm-site-deploy-2026-10-06.zip (main, descargado para auditoría).
ZIP: 99,656,465 bytes. SHA-256 verificado contra SHA256SUMS:
`1b11cc4068d4efd108fcad531894d49db6558076558ae66cd70f95babde04c81`

Asociación en catalog.json: products[7], id product-20, nombre Molletes → media.alternatives[0], id mollequiles, etiqueta Mollequiles.

SPZ: assets/items/platos-principales-molletes-mollequiles-spz.spz
- 2,201,784 bytes.
- SHA-256 calculado y coincidente con catálogo: 4156ff2caf74fc5c313dc4a6419d4a4c5b993a6035ee2cf97acac5794143de1c
- Cabecera 4e47535004000000: NGSP, versión 4.
- Catálogo: containerKind niantic-ngsp, engine evaluate-alternative, readiness experimental.

Poster: assets/items/platos-principales-molletes-mollequiles-mollequiles-poster.webp
- 1,164,330 bytes.
- SHA-256 calculado: 9a7cb0db3b9bc7047a4d324b6e0a27d4610ce6a34995b673c7dcc7d2d2dfb9c6

## Configuración específica extraída
- Vista: yaw 90°, elevación 45°, FOV 30°, distanceMultiplier 0.65, framingMargin 0.95, target (0, -0.1, 0).
- Límites: zoom 0.5–1.5, elevación 30–88°, órbita horizontal 360°.
- Orientación: preset flip-vertical, rotación (0,0,180)°, sin flips adicionales; transform.superSplatCorrection=true.
- Original: autoRotate=true, dirección cw, velocidad 0.5 rad/s, idleResetMs=3000, resetDurationMs=1000, preserveYawOnReset=true. Desactivar movimiento autónomo para story y reduced-motion.
- Motion original: hero-reveal, 3000 ms, startDistanceScale 0.78, arcDeg 24, elevationDeltaDeg 8. No confundir este movimiento con la timeline propuesta.

El ZIP contiene un bundle playCanvasSpzViewer, parser SPZ y dependencias Zstandard. No contiene runtime-manifest.json ni asset-manifest.json; catalog.json es la evidencia de asociación en este paquete.

## Resultado y límites
Identidad, existencia, integridad y contenedor del asset: verificados. El export anterior de sprites no era suficiente para identificar este visual.
Pendiente de validación técnica y visual: decodificación/render con el runtime real, aplicación conjunta de orientación y superSplatCorrection, coincidencia poster/pose A, vistas B–D sin artefactos y licencia/permiso de publicación. La cabecera y la presencia del runtime no equivalen a una prueba de render.
No se copiaron assets a producción, no se modificó la landing ni se preparó un plan de implementación.


## Validación de render en navegador
Prueba local con el bundle PlayCanvas incluido en el ZIP, en navegador integrado de Codex. Harness temporal fuera del repositorio. Canvas de comparación 280×280 CSS px, poster al lado con object-fit contain; sin motion ni autorrotación.
- NGSP v4 carga correctamente: estado ready, 98,180 splats, sin error reportado por visor. Primer frame de carga inicial observado ~1,067 ms y decode ~147 ms; recargas calientes ~109–120 ms. Son observaciones de esta máquina, no presupuestos de rendimiento ni pruebas móviles.
- Orientación exportada (rotación Z=180°, sin flips adicionales): plato derecho, alimentos arriba, coincidencia visual de ingredientes con poster. No se añadió otra inversión. El harness usa el normalizador del runtime exportado y su orientación; no implementa una corrección geométrica adicional independiente.
- A: yaw 90°, elevación 45°, zoom relativo 1.00; coincide visualmente en orientación, centro y escala general con el poster. El borde del plato difiere ligeramente en contorno/definición. NO se certifica identidad de píxeles ni crossfade imperceptible. Recomendación: regenerar poster con el mismo runtime y encuadre final de la landing antes de aprobar el reveal.
- B: yaw 102°, elevación 42°, zoom relativo .96: vista lateral legible, sin agujeros grandes observados. Bordes del plato recortados por el encuadre.
- C: yaw 110°, elevación 49°, zoom relativo .88: acercamiento legible, sin zonas ausentes grandes observadas. Es el encuadre más apretado; borde del plato y extremo derecho quedan recortados. Aceptable para detalle, no para mostrar plato completo.
- D: yaw 98°, elevación 46°, zoom relativo .92: cierre legible, sin agujeros grandes observados; plato parcialmente recortado.
- Regreso D→A recupera visualmente composición inicial. No se probó aún interpolación continua ni recorrido de scroll; son pruebas de poses estáticas.

Para obtener las poses estáticas se usó setConfiguration con yaw/elevación y distanceMultiplier original multiplicado por zoom relativo (.65, .624, .572, .598 respectivamente), manteniendo zoom del controlador en 1. Este mecanismo valida encuadres equivalentes de distancia; no demuestra todavía el adaptador de timeline definitivo.

Evidencia: mollequiles-A.png, mollequiles-B.png, mollequiles-C.png, mollequiles-D.png, en este mismo directorio. En todas: render izquierda, poster exportado derecha.

Resultado: render y orientación pasan esta prueba local; B–D son viables como encuadres candidatos con los recortes indicados. Coincidencia exacta poster→A sigue pendiente y requiere poster regenerado del runtime final. No se modificó producción ni se armó el plan de implementación.


## Poster regenerado y recorrido continuo
- Se generó primero un WebP mediante capturePoster del runtime (1200×1200). La comparación visual detectó una pequeña diferencia de escala entre captura offscreen y canvas visible. No usar ese primer archivo como poster definitivo.
- Poster definitivo: `mollequiles-poster-final.webp`, capturado directamente del canvas vivo, pose A, sin motion/autogiro; PNG fuente `mollequiles-poster-live.png`. Canvas CSS 1200×1200, framebuffer real 2100×2100 por DPR 1.75. Conversión a WebP sin pérdida verificada por igualdad de todos los bytes RGBA decodificados. Conservar la misma relación 1:1 y encuadre en integración; otros aspectos requieren revisión.
- Comparación final lado a lado: encuadre alineado visualmente. No se promete identidad de píxeles entre un render futuro y la imagen por diferencias de resolución, ordenado de splats y rasterización.
- Interpolación ejecutada con smoothstep por segmento (.45–.60 A→B, .60–.70 B→C, .70–.80 C→D), distancia base .65 multiplicada por zoom interpolado. Yaw 90→102→110→98; elevación 45→42→49→46; zoom relativo 1→.96→.88→.92. Sin giros de 360°, autorrotación ni movimiento original hero-reveal.
- Recorrido ida/vuelta de 16 segundos, aplicado por requestAnimationFrame y grabado desde el canvas. La hoja de contacto muestra progresión continua sin agujeros grandes ni inversiones; permanecen los recortes del plato ya documentados, más fuertes cerca de C. Este es un test de cámara temporal, todavía no integración con scroll.
- Primera prueba a canvas 280 CSS px: 960 actualizaciones, intervalo rAF p50 16.7 ms, p95 17.1 ms, cero intervalos >50 ms.
- Segunda prueba con framebuffer 2100×2100 y grabación: 784 actualizaciones, p50 16.7 ms, p95 33.4 ms, un intervalo >50 ms. Son intervalos de actualización de JS bajo grabación, no tiempos GPU ni garantía de FPS móvil.
- Comparación de 13 posiciones muestreadas en ida/vuelta, capturas offscreen 560×560: diferencia absoluta media por canal 0–0.428 en escala 0–255; máximo de canal 20. Composición reversible visualmente, pero NO identidad de píxeles. La prueba detecta pequeñas variaciones de rasterización; no atribuye causa exacta.
- Artefactos: mollequiles-poster-final.webp, mollequiles-poster-final-comparison.png, mollequiles-recorrido.mp4, mollequiles-recorrido-live.webm, mollequiles-motion-contact-sheet.png, mollequiles-interpolation-results.json, mollequiles-live-results.json y harness de referencia.

Conclusión: poster directo y recorrido de cámara quedan validados en esta prueba local, con los recortes y variaciones menores descritos. Falta QA de la futura integración (scroll, responsive, carga tardía y dispositivos reales); no se ha empezado esa implementación ni su plan.
