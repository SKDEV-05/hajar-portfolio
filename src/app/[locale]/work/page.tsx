import { Locale, copy } from '@/data/content';
import { metadata } from '@/lib/metadata';
import { WorkFilter } from '@/components/work-filter';
import { ContactBand } from '@/components/layout';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return metadata(locale, '/work', copy[locale].archive, copy[locale].archiveText);
}
export default async function Work({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const selectedCategory =
    category !== undefined && /^[0-5]$/.test(category) ? Number(category) : -1;
  const c = copy[locale];
  return (
    <>
      <section className="section work-section">
        <div className="page-heading">
          <p className="eyebrow">{c.index}</p>
          <h1>
            {c.archive}
            <span className="heading-star">✳</span>
          </h1>
          <p>{c.archiveText}</p>
        </div>
        <WorkFilter key={selectedCategory} locale={locale} initialCategory={selectedCategory} />
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
