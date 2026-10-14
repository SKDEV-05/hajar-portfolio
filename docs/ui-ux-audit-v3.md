# V3 UI/UX audit — 13 October 2026

## Baseline and scope

Existing Next.js App Router, 14 projects, EN/FR, next-themes, shadcn Select/Button, Motion and lazy R3F scene are retained. Source checkpoint: `tmp/checkpoints/pre-v3.zip`. The deployed EN homepage was inspected in the in-app browser at a 1440 × 900 viewport. Prior local V2 screenshots established working filters, theme selection and lightbox; they are not V3 verification.

No README existed at the start of this audit. No new framework or dependency is required. The available production build predates the last interrupted V2 edits, so it is not an equivalent performance baseline for V3. Lighthouse/field metrics must not be inferred.

## Confirmed findings

| Issue | Route/component | Evidence | Severity | Correction | Performance effect | Test |
|---|---|---|---|---|---|---|
| Software showcase uses generic letters, including B3 | Homepage, source software-grid | Live DOM exposes Ai/Ps/Id/Xd/Ae/B3; source confirms text spans | Medium | Reuse six embedded PDF application icons | Small local image requests; zero extra JS | Icon recognition, alt labels, both themes |
| No active navigation state | Shared Header | Source has plain links without aria-current | Medium | Small pathname-aware nav component | Minimal client code | All routes, keyboard and nested project state |
| One generic gallery presentation for all categories | Work and case-study components | Shared template and columns CSS | Aesthetic opportunity | Deterministic category presentation variants | CSS only | Branding/UI/editorial/3D/film/art, mobile |
| Public PDF page metadata gets equal visual weight with contribution | Case details | Definition list in shared template | Low | Keep traceability in data/docs, reduce public prominence | None | Verify role/tools remain visible |

## Art-direction opportunities, not functional defects

- The deployed desktop hero is legible, but its tilted portrait, sticker and 3D overlay do not match the new editorial reference. Replace with a centered monochrome portrait, asymmetric text rhythm and fine CSS grid rules.
- The new reference is a design influence only; its identity, image and exact layout must not be copied.
- The authentic portrait is 807 × 1280 in the PDF, optimized to 630 × 1000 locally. Use the original photograph with CSS monochrome treatment. Do not generate a substitute face. A true cutout is optional; a controlled editorial image window preserves original pixels without unreliable hair masking.
- Existing typography hierarchy, project content, translations, source images and functional controls stay intact.

## Verification limits

The earlier approval service rejected a production-build request because its review usage limit was exhausted, not because the build was unsafe. Browser access to the live deployment now works. Local preview and final build verification are tracked separately in visual-validation.md; no unperformed audit is recorded as passed.
