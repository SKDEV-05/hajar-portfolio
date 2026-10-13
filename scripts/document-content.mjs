import { writeFileSync } from 'node:fs';
import { projects, projectTitle } from '../src/data/content.ts';
const rows = projects.map(
  (p) =>
    `| ${p.slug} | ${projectTitle(p, 'en')} | ${p.pages.join(', ')} | ${p.role.en} | ${p.tools.join(', ') || 'Not specified'} |`,
);
writeFileSync(
  'docs/project-inventory.md',
  [
    '# Project inventory',
    '',
    'Fourteen case studies, each available in English and French. Poster and portrait collections remain grouped as in the source.',
    '',
    '| Slug | Title | PDF pages | Contribution | Verified software |',
    '|---|---|---|---|---|',
    ...rows,
  ].join('\n'),
);
writeFileSync(
  'docs/source-traceability.md',
  [
    '# Source traceability',
    '',
    'The portfolio PDF is the factual source. Website headlines are editorial summaries, not claims of commercial outcomes. French descriptions faithfully paraphrase the source; English translations preserve their scope.',
    '',
    '| Website claim | Source |',
    '|---|---|',
    '| Name, graphic design role | 1, 3, 34 |',
    '| ENSAD studies and education dates | 3 |',
    '| Biography, collaboration skills, software and languages | 3 |',
    '| Email and city | 34 |',
    '| Portfolio edition 2026–2027 | 1, 34 |',
    ...projects.map(
      (p) =>
        `| ${projectTitle(p, 'en')}: concept, contribution and artwork | ${p.pages.join(', ')} |`,
    ),
    '',
    'Every public asset is linked to an original page in asset-manifest.json. Hero crops have normalized crop coordinates. No tool assignment is inferred from visual appearance. Safi documentary has an editorial English/French descriptive title; the Arabic source title is not presented as a verified translation.',
    '',
    'Global palette: sampled PDF navy #061f2b, aqua approximately #60bebb; website accent shades adjust for contrast. Project palette labels are transcribed only where valid. TIKIDA invalid token omitted.',
  ].join('\n'),
);
