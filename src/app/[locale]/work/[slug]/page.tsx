import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, locales, Locale, copy, categories, projectTitle } from '@/data/content';
import { metadata, siteUrl } from '@/lib/metadata';
import { ArtImage } from '@/components/art-image';
import { Gallery } from '@/components/gallery';
import { ProjectCard } from '@/components/project-card';
type Params = Promise<{ locale: Locale; slug: string }>;
export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}
export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return metadata(
    locale,
    `/work/${slug}`,
    projectTitle(p, locale),
    p.intro[locale],
    `/images/projects/${slug}/hero.webp`,
  );
}
export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const c = copy[locale];
  const title = projectTitle(p, locale);
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];
  const related = [
    ...projects.filter((q) => q.slug !== slug && q.category === p.category),
    ...projects.filter((q) => q.slug !== slug && q.category !== p.category),
  ].slice(0, 2);
  const images = [
    ...p.images.map((n) => `/images/projects/${slug}/image-${n}.webp`),
    ...p.pages.map((n) => `/images/projects/${slug}/page-${n}.webp`),
  ];
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: title,
        description: p.detail[locale],
        image: `${siteUrl}/images/projects/${slug}/hero.webp`,
        url: `${siteUrl}/${locale}/work/${slug}`,
        inLanguage: locale,
        creator: { '@type': 'Person', name: 'Hajar Salmi' },
        creditText: p.role[locale],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.home, item: `${siteUrl}/${locale}` },
          { '@type': 'ListItem', position: 2, name: c.work, item: `${siteUrl}/${locale}/work` },
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: `${siteUrl}/${locale}/work/${slug}`,
          },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
      />
      <section className="project-heading section">
        <Link className="text-link" href={`/${locale}/work`}>
          ← {c.back}
        </Link>
        <div className="project-heading-meta">
          <span className="eyebrow">{categories[p.category][locale]}</span>
          <span className="eyebrow">{String(index + 1).padStart(2, '0')} / 14</span>
        </div>
        <h1>{title}</h1>
        <p>{p.intro[locale]}</p>
      </section>
      <div className={`case-hero case-${slug}`}>
        <ArtImage
          src={`/images/projects/${slug}/hero.webp`}
          alt={`${title} — ${p.intro[locale]}`}
          priority
          sizes="100vw"
        />
      </div>
      <section className="case-details section">
        <div>
          <p className="eyebrow">01 / {c.concept}</p>
          <h2>{p.intro[locale]}</h2>
          <p>{p.detail[locale]}</p>
          {p.media && <p className="media-note">{p.media === 'stills' ? c.stills : c.prototype}</p>}
        </div>
        <dl>
          <div>
            <dt>{c.role}</dt>
            <dd>{p.role[locale]}</dd>
          </div>
          {p.tools.length > 0 && (
            <div>
              <dt>{c.tools}</dt>
              <dd>{p.tools.join(' · ')}</dd>
            </div>
          )}
          <div>
            <dt>{c.source}</dt>
            <dd>{p.pages.join(', ')}</dd>
          </div>
          {p.palette.length > 0 && (
            <div>
              <dt>{c.palette}</dt>
              <dd className="palette">
                {p.palette.map((color) => (
                  <span key={color}>
                    <i style={{ background: color }} />
                    <small>{color}</small>
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </section>
      <section className="section gallery-section">
        <div className="section-heading">
          <h2>{c.gallery}</h2>
          <span className="eyebrow">
            {c.artwork} / {images.length}
          </span>
        </div>
        <Gallery images={images} title={title} locale={locale} />
      </section>
      {related.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <h2>{c.related}</h2>
          </div>
          <div className="project-grid related-grid">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
            ))}
          </div>
        </section>
      )}
      <section className="next-project">
        <p className="eyebrow">{c.next}</p>
        <Link href={`/${locale}/work/${next.slug}`}>
          {projectTitle(next, locale)} <span>↗</span>
        </Link>
      </section>
    </>
  );
}
