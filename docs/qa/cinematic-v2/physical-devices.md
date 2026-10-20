# Revisión local asistida — cinematic V2 (histórico)

**Revisión vigente:** [cinematic-v3](../cinematic-v3/README.md), con A completo y encuadres/copy revisados por feedback posterior. La aprobación física de V3 sigue pendiente.


URL persistente: http://MacBook-Air-de-Keneth.local:8776/?revision=cinematic-v2
Respaldo de IP actual: http://192.168.101.109:8776/?revision=cinematic-v2
Misma Wi-Fi y Mac encendido. Se sirve el paquete `.cloudflare-deploy`, no producción. El formulario local valida pero no envía. Servicio de sesión `com.codex.cinematic-preview`; logs en `/private/tmp/cinematic-preview*.log`. La IP puede cambiar; preferir hostname.

| Entorno | Modelo / sistema / navegador | Resultado cinematic V2 |
|---|---|---|
| Desktop físico | Por registrar | Pendiente de revisión visual del usuario |
| Android físico | Poco X6 Pro; versiones por registrar | Pendiente; no reutilizar aprobación de la versión anterior |
| iPhone físico | Modelo/iOS/navegador por registrar | Pendiente; no reutilizar aprobación de la versión anterior |

## Checklist de aprobación

- [ ] La cámara comienza a responder al inicio del recorrido; el reveal coincide con el poster A.
- [ ] En B y C hay pausa breve que permite leer el nuevo título; los cuatro textos son distintos y corresponden al encuadre.
- [ ] Scroll lento, rápido e inverso: títulos, marcas y barra acompañan la imagen sin adelantarse al detalle.
- [ ] Portrait y landscape con barras de navegador visibles/ocultas; repetir giro mientras se explora.
- [ ] Pinch y órbita en ambos ejes tras activar; reset, salida y regreso a la pose del scroll.
- [ ] ES/EN/DE/JA sin solapamientos; ampliación de texto conserva lectura o fallback completo.
- [ ] Con movimiento reducido: cuatro ideas legibles, sin timeline obligatoria; explorar sigue siendo voluntario.
- [ ] Carga tardía/refresh intermedio: poster y aviso, enlace a las cuatro tomas; no se describe un detalle invisible. Salir por arriba y reentrar permite nuevo reveal.
- [ ] Acceso al caso, contacto, privacidad y validación del formulario local sin envío.

Registrar problemas con idioma, orientación y barras visibles, más modelo/SO/navegador cuando se conozcan. Si falta dispositivo o una prueba no puede ejecutarse, mantenerla pendiente. No PR, integración ni despliegue con QA físico pendiente.
