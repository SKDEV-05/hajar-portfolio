import Link from 'next/link';
import { copy, Locale } from '@/data/content';
import { Controls } from './controls';
import { Navigation } from './navigation';
export function Header({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <header className="site-header">
      <Link className="nav-home" href={`/${locale}`} aria-label={c.home}>
        <span className="mark" aria-hidden="true">
          ✳
        </span>
      </Link>
      <Navigation locale={locale} />
      <Controls locale={locale} />
    </header>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <footer className="site-footer">
      <Link className="wordmark" href={`/${locale}`}>
        hajar salmi
        <span className="mark" aria-hidden="true">
          ✳
        </span>
      </Link>
      <p>
        {c.location} <span className="dot">·</span> {c.rights}
      </p>
      <a href="mailto:safaeslm2005@gmail.com">{c.email} ↗</a>
      <a href="#top" aria-label={locale === 'fr' ? 'Retour en haut' : 'Back to top'}>
        ↑
      </a>
    </footer>
  );
}
export function ContactBand({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section className="contact-band" data-reveal>
      <p className="eyebrow">{c.talk}</p>
      <Link href={`/${locale}/contact`} className="contact-big">
        {c.together}
        <span>↗</span>
      </Link>
      <div className="contact-line">
        <span>{c.location}</span>
        <a href="mailto:safaeslm2005@gmail.com">safaeslm2005@gmail.com</a>
      </div>
    </section>
  );
}
