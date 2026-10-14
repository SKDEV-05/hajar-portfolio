import { projects, categories, copy, Locale } from '@/data/content';
import { ProjectCard } from './project-card';
import { Button } from './ui/button';
export function WorkFilter({
  locale,
  initialCategory = -1,
}: {
  locale: Locale;
  initialCategory?: number;
}) {
  const filter = initialCategory;
  const list = projects.filter((p) => filter === -1 || p.category === filter);
  return (
    <>
      <div
        className="filters"
        aria-label={locale === 'fr' ? 'Filtrer les projets' : 'Filter projects'}
      >
        {[copy[locale].all, ...categories.map((c) => c[locale])].map((label, i) => (
          <Button variant="outline" key={label} asChild>
            <a
              href={i === 0 ? `/${locale}/work` : `/${locale}/work?category=${i - 1}`}
              aria-current={filter === i - 1 ? 'true' : undefined}
              data-active={filter === i - 1}
            >
              {label}
              <sup>
                {i === 0 ? projects.length : projects.filter((p) => p.category === i - 1).length}
              </sup>
            </a>
          </Button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {list.length}{' '}
        {locale === 'fr'
          ? list.length === 1
            ? 'projet'
            : 'projets'
          : list.length === 1
            ? 'project'
            : 'projects'}
      </p>
      <div className="project-grid">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
        ))}
      </div>
    </>
  );
}
