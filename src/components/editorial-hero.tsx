import { DesignIntro } from './design-intro';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Locale, copy } from '@/data/content';
import { InteractivePortrait } from './interactive-portrait';
import { Sculpture } from './sculpture';
import { Button } from './ui/button';

export function EditorialHero({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const fr = locale === 'fr';
  return (
    <section className="editorial-hero" aria-labelledby="hero-name">
      <DesignIntro />
      <div className="editorial-meta">
        <span>
          <i className="status-dot" />
          {c.student}
        </span>
        <span>{c.location} · Portfolio</span>
      </div>
      <div className="editorial-identity">
        <h1 id="hero-name" className="editorial-name">
          <span>HAJAR</span>
          <span>
            SALMI<span className="editorial-period">.</span>
          </span>
        </h1>
        <figure className="editorial-portrait">
          <InteractivePortrait />
          <figcaption>
            Hajar Salmi <span>ENSAD / SAFI</span>
          </figcaption>
        </figure>
        <div className="editorial-composition">
          <div className="editorial-left">
            <span className="editorial-index">01 — {fr ? 'Un regard' : 'A perspective'}</span>
            <p className="editorial-statement">
              {fr ? 'Rendre' : 'Making'}
              <br />
              {fr ? 'les idées' : 'ideas'}
            </p>
            <p className="editorial-note">
              {fr
                ? 'Identités, images et mouvement. Une pratique guidée par la curiosité.'
                : 'Identity, imagery and motion. A practice shaped by curiosity.'}
            </p>
          </div>
          <div className="editorial-right">
            <span className="editorial-symbol" aria-hidden="true">
              ✳
            </span>
            <p className="editorial-statement">{fr ? 'visibles.' : 'visible.'}</p>
            <div className="editorial-actions">
              <Button asChild className="primary-link">
                <a href="#selected">
                  {c.selected}
                  <ArrowDown size={16} />
                </a>
              </Button>
              <Link className="quiet-link" href={`/${locale}/about`}>
                {c.moreAbout}
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="editorial-object">
              <Sculpture />
            </div>
          </div>
        </div>
      </div>
      <div className="editorial-footer">
        <span>{fr ? 'Du concept à l’émotion.' : 'From concept to feeling.'}</span>
        <a href="#story">
          {c.scroll}
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
