# Visual validation — V3

## Verified
- Deployed baseline EN homepage observed in browser at 1440 x 900 before V3 changes.
- TypeScript passes after final code edits.
- ESLint passes for hero/navigation changes; final gallery changes checked separately in tool results.
- Content checker: 14 projects, two complete locales, 105 gallery/hero references and source palettes pass.
- Authentic portrait inspected directly. Original PDF icons reused locally, no replacement identities or project artwork generated.
- Source review: existing localized routes, data, theme selector, native gallery dialog and image pipeline retained.

## Unverified / blocked
- Production build attempted: Next/SWC cannot canonicalize the workspace path on Windows (Access denied, OS error 5).
- Earlier elevated execution review was rejected because approval review usage was exhausted. No bypass attempted.
- Final local browser screenshots, interactions, all-route HTTP smoke checks and Lighthouse before/after comparison are not complete. A prior local browser access policy rejection also remains unresolved.
- 375/768/1024/1440/1920 layouts and both themes are implemented through CSS but must not be described as visually validated.
- No deployment performed. Live site remains the baseline.

## Follow-up validation
Run npm run build when permitted, then serve that build and check all 36 localized routes. Inspect hero and galleries at all five widths in both themes/languages, keyboard navigation, theme persistence, category filtering, dialog arrows/Escape and reduced-motion mode. Capture before/after Lighthouse using identical settings; no scores are claimed here.

## Portrait quality
Current optimized source is 630 x 1000; the PDF original is 807 x 1280. A higher-resolution original would improve sharpness on large high-density displays. The authentic photograph is retained in a rectangular editorial frame rather than using an unreliable hair cutout.

## PDF palette / floating navigation follow-up
- Restored navy #071e2b and aqua #60bfb9; light canvas is pale aqua #e7f4f1. Dark defaults for new visitors, saved theme choices retained.
- Replaced full-width named header with fixed glass pill, home symbol and compact controls.
- Enlarged existing pointer-reactive Three.js sculpture and reduced desktop headline height.
- Installed GSAP; scroll reveals and entrance animation use ScrollTrigger, media-query cleanup and route cleanup. Reduced-motion users retain static content.
- Production build PASSED (41 generated outputs), lint PASSED and content checks PASSED before the final minor selector guards and mobile header reset; rechecks recorded in tool results.
- Browser inspection blocked by browser URL security policy despite the supplied local HTTP URL. No alternate browser or policy bypass attempted. Visual/interaction validation and Lighthouse remain unverified.
- A dev server is already registered at localhost:3000 (PID 25328); attempted second startup exited without replacing it.

## Centered identity and portrait interaction
- Desktop identity grid places HAJAR / original portrait / SALMI in a single row. Mobile uses a legible name row and centered photograph beneath.
- A second optimized rendering of the same photograph is revealed through a soft radial CSS mask under the pointer. No recoloring, generated facial changes or full-photo hover transition.
- Small CSS perspective tilt supplies the recommended depth effect on her authentic photograph; it is not a generated 3D avatar. Existing Three.js sculpture remains separate.
- Both themes preserve the same navy/aqua identity. Reduced-motion disables tilt; touch devices retain the static monochrome photograph.
- Production compilation and TypeScript passed; build completion and lint results recorded in tool output. Content integrity: 14 projects, 2 locales, 105 image references pass.
- Browser visual checks remain unavailable under the previously returned browser security policy; no claim of verified screenshots or pointer interaction.

## Compact hero and interaction repair
- Limited central portrait column to 310px on desktop; aligned names at the top and placed intro, links and sculpture in the side columns.
- Added a CSS hover fallback for the local color window and explicit overlay stacking.
- Dev logs identified blocked requests from the user's LAN hostname 192.168.1.88. Added only that hostname to allowedDevOrigins; Next restarted and fresh browser logs confirm client execution. This is separate from the tooling's browser policy restriction.
- Project category controls are now real query-string links with server-rendered results and active state; functional without client hydration, with refresh/back/bookmark support.
- Light palette refined to a pale neutral aqua, retaining dark navy/aqua tokens.
- Production build, TypeScript and ESLint pass.
- Read-only HTTP smoke tests pass for all seven filter states in both locales: 14/4/1/2/3/2/2 cards, each HTTP 200.
- Final visual appearance, hover movement and theme interaction still require browser verification; no screenshots claimed.

## Alignment, larger sculpture and brand intro
- Names now align inward toward the portrait with matching top line-height; left editorial content aligns with HAJAR.
- Desktop sculpture viewport enlarged from 150 x 140 to up to 270 x 240; mobile 150 x 160.
- Added a 1.2-second SVG vector-drawing HS brand introduction, once per tab session. Content loads concurrently. Pointer/keyboard interaction dismisses immediately; reduced-motion and no-JS skip the overlay. CSS hides it after completion with a timer fallback.
- TypeScript, lint and production build passed. Final browser visual validation remains unavailable due to the previously reported browser policy restriction.
