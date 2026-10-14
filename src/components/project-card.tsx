import Link from 'next/link';
import { Project, Locale, categories, projectTitle, copy } from '@/data/content';
import { ArtImage } from './art-image';
import { ArrowUpRight } from 'lucide-react';
export function ProjectCard({
  project: p,
  locale,
  index = 0,
}: {
  project: Project;
  locale: Locale;
  index?: number;
}) {
  return (
    <article data-reveal className={`project-card project-${p.slug} card-category-${p.category}`}>
      <Link
        href={`/${locale}/work/${p.slug}`}
        className="project-image"
        aria-label={`${copy[locale].view} — ${projectTitle(p, locale)}`}
      >
        <ArtImage
          src={`/images/projects/${p.slug}/hero.webp`}
          alt={`${projectTitle(p, locale)} — ${p.intro[locale]}`}
          sizes="(max-width: 700px) 92vw, 60vw"
        />
        <span className="image-arrow" aria-hidden="true">
          ↗
        </span>
        <span className="image-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <h3>
            <Link href={`/${locale}/work/${p.slug}`}>{projectTitle(p, locale)}</Link>
          </h3>
          <p>{p.intro[locale]}</p>
        </div>
        <span className="category-label">{categories[p.category][locale]}</span>
      </div>
    </article>
  );
}
export function FeaturedProject({
  project: p,
  locale,
  index,
}: {
  project: Project;
  locale: Locale;
  index: number;
}) {
  return (
    <article className={`featured-project feature-${p.slug}`} data-reveal>
      <div className="feature-index">
        {String(index + 1).padStart(2, '0')}
        <span>/ {categories[p.category][locale]}</span>
      </div>
      <div className="feature-copy">
        <h3>
          <Link href={`/${locale}/work/${p.slug}`}>{projectTitle(p, locale)}</Link>
        </h3>
        <p className="feature-intro">{p.intro[locale]}</p>
        <p className="feature-description">{p.detail[locale]}</p>
        <div className="feature-role">{p.role[locale]}</div>
        <Link className="text-link" href={`/${locale}/work/${p.slug}`}>
          {copy[locale].view}
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <Link
        className="feature-artwork"
        href={`/${locale}/work/${p.slug}`}
        aria-label={`${copy[locale].view} — ${projectTitle(p, locale)}`}
      >
        <ArtImage
          src={`/images/projects/${p.slug}/hero.webp`}
          alt={`${projectTitle(p, locale)} — ${p.intro[locale]}`}
          sizes="(max-width:700px) 90vw, 48vw"
        />
        <span className="artwork-open">
          <ArrowUpRight size={22} />
        </span>
      </Link>
    </article>
  );
}
