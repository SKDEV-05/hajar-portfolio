import { Locale, copy } from '@/data/content';
import { metadata } from '@/lib/metadata';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return metadata(locale, '/contact', copy[locale].contact, copy[locale].contactText);
}
export default async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  return (
    <section className="contact-page section">
      <div className="contact-orbit" aria-hidden="true">
        ✳
      </div>
      <p className="eyebrow">{c.contactSmall}</p>
      <h1>
        {c.talk}
        <br />
        <em>{c.together}</em>
      </h1>
      <p className="large-copy">{c.contactText}</p>
      <a className="email-link" href="mailto:safaeslm2005@gmail.com">
        safaeslm2005@gmail.com <span>↗</span>
      </a>
      <div className="contact-page-bottom">
        <span>{c.location}</span>
        <span>{c.student}</span>
        <a href="/hajar-salmi-portfolio.pdf" download>
          {c.download} ↓
        </a>
      </div>
      <p className="small muted">{c.redacted}</p>
    </section>
  );
}
