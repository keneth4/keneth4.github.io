# Mollequiles runtime provenance

Source: `keneth4/menu_maker/deployments/ampm/ampm-site-deploy-2026-10-06.zip`.
Archive SHA-256: `1b11cc4068d4efd108fcad531894d49db6558076558ae66cd70f95babde04c81`.
The included engine identifies itself as PlayCanvas 2.21.4.

Local changes: Zstandard glue/WASM URLs resolve relative to the runtime module;
Vite preload URLs resolve relative to this directory instead of the site root.
No model, parser, orientation, camera or shader changes were made.

Retained notices:
- PlayCanvas engine/parser: MIT, `PlayCanvas-LICENSE.txt` (tag v2.21.4).
- Zstandard decoder: BSD-3-Clause, `Zstandard-LICENSE.txt`.
- zstddec WASM wrapper: MIT, `zstddec-LICENSE.txt`.
- libwebp capture encoder: BSD-style, `libwebp-COPYING.txt`.

The deployment's application-specific viewer/glue and restaurant artwork/model
are user-supplied project material, not covered by the engine's MIT license.
Public redistribution permission for that material remains a release gate.
The capture encoder is retained to preserve the audited module's lazy capture
interface; production does not load it during normal viewing.
