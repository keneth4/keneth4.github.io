# Landing · aplicación de identidad · 12 octubre 2026

Base: index.html, rework.css y rework.js ya servidos en 127.0.0.1:8766. Rama codex/creativivid-rework. Vista local; sin publicación.

Dirección del manual aplicada: MUYAL refinado y Sniglet 400 en firma vertical; cuerpo/títulos DM Sans; fondo #F6F4EF, tinta #181818, acento #5A3EE0, superficies suaves #ECE7FF. El logo fuente aprobado se copia sin alterar sus puntos o curva. Vector y adaptación de favicon siguen pendientes para optimización.

Referencias observadas: https://www.awwwards.com/sites/unseen-studio (composición inmersiva, imagen protagonista y jerarquía tipográfica). El acceso por web text falló; se revisaron la ficha y sus capturas mediante IAB. https://www.awwwards.com/case-study-spatzek-studio.html apareció en búsqueda pero no se pudo inspeccionar; no se atribuyen decisiones a ese caso.

Concepto ImageGen: style-concept.png, referencia orientativa coordinada. El manual y el sitio existente dirigen la implementación. Diferencias deliberadas: conservar texto multilingüe y orden de secciones originales; captura real de AMPM sin laptop inventada; servicios como lista abierta, sin iconos añadidos; firma raster canónica sin reconstruirla; formulario operativo local existente y consentimiento de privacidad conservados. No se declara fidelidad exacta a todos los detalles del concepto generado.

Demostración: assets/rework/ampm-huevos.spz, copia de Huevos AM-optimized.spz del proyecto local parallax_wiggle/Splats/AMPM (~2.1 MB). Spark 2.3.1 y Three.js 0.180.0, módulos locales y licencias en assets/vendor. Fuente técnica https://sparkjs.dev/docs/ y https://sparkjs.dev/docs/splat-mesh/ . Escena real cargada sólo al pulsar el botón; no video o geometría sustituta. Cámara inicial encuadra el 97% central de splats de opacidad suficiente; giro por arrastre/flechas, reset y regreso al sitio. Render limitado a 30 fps y detenido cuando la escena está oculta, fuera de viewport o la pestaña no está visible. No autorrotación. prefers-reduced-motion desactiva damping. La carga fallida conserva el acceso al sitio del cliente.

Verificación IAB a 1280×720: identidad, paleta, jerarquía, marco de AMPM, acción principal, carga SPZ real, reset, regreso, control por teclado, cambio a DE y retorno ES, formulario con datos ficticios confirmado como local sin envío. Sin errores registrados en consola. node --check para scripts y git diff --check pasan. Comparación visual del concepto y portada mediante view_image. Capturas: landing-proof.png y splat-proof.png.

Limitación: la capacidad de viewport IAB no cambió el tamaño solicitado de 390×844 (seguía reportando 1280). CSS móvil implementado, pero validación visual real a ese ancho pendiente; no se declara comprobada. EN/JA conservan sus traducciones existentes; no se realizó revisión lingüística editorial ni prueba física móvil de GPU. El formulario de producción no se envió.
