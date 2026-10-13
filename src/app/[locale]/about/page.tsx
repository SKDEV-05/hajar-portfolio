import { Locale, copy, software } from '@/data/content';
import { metadata, siteUrl } from '@/lib/metadata';
import { ArtImage } from '@/components/art-image';
import { ContactBand } from '@/components/layout';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return metadata(
    locale,
    '/about',
    copy[locale].about,
    copy[locale].bio,
    '/images/hajar-salmi.webp',
  );
}
export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${siteUrl}/${locale}/about`,
    mainEntity: {
      '@type': 'Person',
      name: 'Hajar Salmi',
      description: c.bio,
      image: `${siteUrl}/images/hajar-salmi.webp`,
      email: 'safaeslm2005@gmail.com',
      homeLocation: { '@type': 'Place', name: c.location },
      knowsLanguage: ['ar', 'fr', 'en'],
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <section className="section about-page">
        <div className="page-heading">
          <p className="eyebrow">{c.student}</p>
          <h1>
            {c.aboutTitle}
            <br />
            <em>{c.aboutAccent}</em>
          </h1>
        </div>
        <div className="about-grid">
          <div className="portrait-frame">
            <ArtImage
              src="/images/hajar-salmi.webp"
              alt="Hajar Salmi"
              priority
              sizes="(max-width:700px) 90vw, 40vw"
            />
            <span className="portrait-note">HAJAR SALMI / {c.location}</span>
          </div>
          <div className="about-content">
            <p className="large-copy">{c.bio}</p>
            <p>{c.collab}</p>
            <div className="education">
              <h2>{c.education}</h2>
              <h3>{c.study1}</h3>
              <p>{c.study1note}</p>
              <h3>{c.study2}</h3>
              <p>{c.study2note}</p>
            </div>
            <h2>{c.languages}</h2>
            <p>{c.languageList}</p>
            <a className="pill-link" href="/hajar-salmi-portfolio.pdf" download>
              {c.download} ↓
            </a>
            <p className="small muted">{c.redacted}</p>
          </div>
        </div>
        <div className="software">
          <h2>{c.skills}</h2>
          <div className="software-list">
            {software.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="muted">{c.skillsNote}</p>
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
