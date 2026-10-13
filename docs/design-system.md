# Design system

Digital exhibition with editorial typography, asymmetrical project layouts, generous spacing, and real artwork. The future-facing direction is an original interpretation, not a claim about established 2027 trends.

- Dark: navy #061F2B, surface #0B2B37, foreground #E5EFE7, aqua #81CABC.
- Light: warm #F4F3ED, neutral #E8EBE3, navy #102E37, deep teal #236A62.
- Shared contact section: mint #A6D9C6 with dark text. Project palettes remain independent.
- Typography: locally served Manrope Variable; system Georgia italic for the home-page editorial accent. No external font network requests.
- Desktop grid: 12 columns with staggered 7/5 and 5/7 project spans. Mobile: a single artwork column, readable captions, always-visible navigation.
- Layout: 4.5% horizontal gutters, 55–95px section spacing, fluid headings, responsive 390px/700px/1000px/1700px treatments.
- Motion: restrained image entry and hover transforms; slow procedural Three.js sculpture. Reduced motion replaces the canvas with a CSS sculpture and disables motion.
- 3D: one torus-knot mesh, local lights, no external HDR/model assets; 1–1.5 DPR, offscreen animation paused, automatic resource disposal. A camera framing correction followed visual QA.
- Vector UI: true SVG favicon and CSS geometry/rules, inspired by the source’s geometric layout. Project logos remain original raster extractions; no fake SVG wrappers or invented logo paths.
- Themes: next-themes prepaint script, system preference, persistent selection, stable server markup. Locale changes use full document navigation so document language and initial theme are correct.
- Interaction: semantic links/buttons, visible focus, native dialog focus trap/Escape handling, arrow-key image navigation, responsive touch controls. No cursor replacement, forced loading screen or fake video player.
