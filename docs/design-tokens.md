# Design tokens — V3

Existing theme variables remain authoritative in src/app/globals.css.

| Token | Light | Dark | Purpose |
|---|---|---|---|
| --bg | #f2f1eb | #071e27 | Page canvas |
| --fg | #122e36 | #e9eee8 | Primary text |
| --accent | #226e65 | #a0d8c0 | Links and restrained highlights |
| --line | #cdd3cb | #2a4249 | Editorial grid and dividers |
| --muted | #5c6b6b | #a4b8b7 | Supporting text |

Typography: locally hosted Manrope Variable. Hero name clamp(80px,14.6vw,225px), mobile 14vw. Editorial statement clamp(35px,5.3vw,80px). Desktop three-column composition changes to one column at 700px. Portrait retains intrinsic proportions and uses CSS grayscale; no altered facial pixels or generated portrait. Existing 3D uses an independent reserved area.

Motion: short opacity/translation entrance; disabled by prefers-reduced-motion. Existing scroll reveal and paused-offscreen 3D retained. No new dependencies.
