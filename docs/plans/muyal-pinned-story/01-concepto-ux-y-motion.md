# CreatiVivid — 01. Concepto UX y dirección de movimiento

Estado: propuesta para revisión, no aprobación de implementación.  
Base: `main` posterior a la adopción de la escritura **CreatiVivid** (19 de octubre de 2026).

## 1. Objetivo

Conseguir que el usuario experimente los principios del estudio —imaginación, precisión, vitalidad y cercanía— mediante una única secuencia protagonista que haga visible la transición desde una presencia web 2D hacia una experiencia espacial real. Mantener entendible la oferta de sitios web, comercio electrónico y experiencias interactivas.

Concepto narrativo: **De la idea a la presencia**.

## 2. Invariantes de marca y producto

- No modificar la firma ni el símbolo MUYAL aprobado (`assets/brand/muyal-canonical.png`).
- No cambiar la fuente Sniglet 400, espaciado, proporciones, posición, puntos ni curvas del logo; mantener **CreatiVivid**.
- Mantener arquitectura editorial, base `#F6F4EF`, tinta `#181818`, acento `#5A3EE0` como implementación de partida (el manual los marca como dirección propuesta, no declarar aprobación adicional).
- Las curvas y puntos animados serán **motivos abstractos inspirados en** la firma, no copias transformadas del glifo ni una supuesta escritura maya nueva.
- Preservar español/inglés/alemán/japonés, la CTA a contacto, las funciones del formulario, política de privacidad y enlaces a AM:PM.
- No inventar clientes, testimonios, resultados, métricas ni capacidades del proyecto.

## 3. Secuencia propuesta por sección

| Sección actual | Intervención | Grado |
|---|---|---|
| Hero | Parallax discreto de un punto/curva fuera del texto, CTA y demo visual accesibles. Evitar escena WebGL duplicada si el splat se convierte en protagonista del caso. | Bajo |
| Proyectos / AM:PM | **Una** secuencia pinned que revele el caso desde captura real, transite al splat y termine permitiendo exploración voluntaria. | Alto |
| Servicios | Revelado sobrio de títulos y reglas de división; una curva decorativa puede continuar el recorrido en segundo plano. | Bajo |
| Proceso | Un punto marcador une Conversamos → Definimos → Creamos según el avance; no reemplaza la lectura del texto. | Medio |
| Contacto | Motivos abstractos recuperan una composición ordenada cercana al lenguaje MUYAL; firma oficial permanece inmóvil. | Bajo |

## 4. Storyboard de la sección pinned

**Entrada, p=0–0.20.** Título «Un negocio real. Una experiencia distinta». Captura auténtica de AM:PM; nombre, ubicación y un enlace directo al sitio siempre accesibles.

**Transformación, p=0.20–0.45.** La captura cede gradualmente al visor con una transición limpia (crossfade/clip mask, no geometría inventada); aparece la leyenda de tecnología y material real. Si la escena aún no está lista, se conserva la imagen sin bloquear la página.

**Recorrido espacial, p=0.45–0.80.** Una cámara predefinida recorre suavemente un splat existente: encuadre, ángulo lateral y detalle. El progreso de la cámara depende del desplazamiento y debe ser reversible.

**Salida, p=0.80–1.00.** La cámara queda en posición final, el texto «Explora el proyecto» se muestra, y la sección devuelve el flujo de scroll normal.

**Exploración libre (opt-in).** Botón «Explorar en 3D» activa OrbitControls para arrastrar/rotar, con «Restablecer vista» y «Volver al recorrido». El scroll vertical sigue disponible; rueda y gesto táctil no deben ser secuestrados.

Valores de p y longitud de escena son **hipótesis iniciales**, se ajustan con pruebas reales.

## 5. UX y accesibilidad

- La sección no requiere animación ni WebGL para entender el caso o llegar a contacto.
- El acceso directo al proyecto y la navegación por anclas funcionan mientras la escena está fija.
- Evitar scroll hijacking, esperas forzadas y scroll locking.
- Con `prefers-reduced-motion: reduce`: sustituir toda animación por captura/estado final, sin pin prolongado.
- En pantallas pequeñas, usar recorrido simplificado o sin pin según pruebas reales y rendimiento.
- Texto con contraste suficiente, foco visible, orden DOM coherente y estado del visor accesible.
- No crear decoración continua por encima del copy ni distraer de formularios.

## 6. Criterio creativo para evaluar el resultado

Al finalizar, alguien ajeno a Gaussian Splatting debe poder responder (1) qué hace CreatiVivid, (2) qué hizo con AM:PM y (3) cómo contactar, sin necesidad de completar la animación.

La secuencia debe expresar un principio de marca y demostrar trabajo real, no solamente parecer un efecto de Awwwards.

## 7. Referencias para estudiar, no clonar

- Awwwards / Unseen Studio: https://www.awwwards.com/sites/unseen-studio — jerarquía, transiciones entre galería y proyectos.
- Awwwards / WebGL Scrollytelling (Neyroo): https://www.awwwards.com/inspiration/webgl-scrollitelling-neyroo-your-corporate-metaverse-creator — caso de scroll narrativo con WebGL.
- Skiper UI / SVG Follow Scroll: https://skiper-ui.com/v1/skiper19 — progresión de trazo curvo sincronizada al scroll.
- Skiper UI / Scroll Images Reveal: https://skiper-ui.com/v1/skiper32 — tratamiento de revelados; **no** importar su grid 3D completo.
- Skiper UI proporciona ejemplos React/Framer; no implican migrar la landing existente a React.

## 8. Por decidir antes de integrar archivos nuevos

Seleccionar 1 splat protagonista y, opcionalmente, 1 segundo para otra escena. Verificar contenido y derechos de uso, peso, formatos, orientación, color y encuadres viables. Hasta contar con esos archivos, utilizar `assets/rework/ampm-huevos.spz` únicamente como piloto técnico.

