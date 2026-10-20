# Cinematic V2 — implementación local

Rama `codex/creativivid-mollequiles-cinematic-shots`. Sin PR, merge ni despliegue. Baseline de producto y hashes en `../cinematic-v2-baseline.md`.

## Avance

- Configuración SHOTS referencia POSES sin duplicar llegadas; holds B/C y helpers de progreso presentado implementados.
- 13 pruebas unitarias de timeline pasan: continuidad, ida/vuelta, holds, inicio, tolerancias y convergencia finita. Todavía no se atribuye a esto aprobación de integración visual ni QA físico.
- DOM de cuatro artículos, resumen progresivo y vista previa incorporados; COPY incluye 12 strings completas + 8 compactas + 3 estructurales por idioma. Los selectores de label/título/body sustituyen la regla genérica de párrafos. Esta etapa necesita el siguiente commit de controller para activar su selección/medición correcta.
