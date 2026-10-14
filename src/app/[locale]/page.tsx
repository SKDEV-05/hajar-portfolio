import Link from 'next/link';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Locale, copy, projects, categories, software } from '@/data/content';
import { metadata } from '@/lib/metadata';
import { EditorialHero } from '@/components/editorial-hero';
import { FeaturedProject } from '@/components/project-card';
import { ContactBand } from '@/components/layout';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return metadata(
    locale,
    '',
    locale === 'fr'
      ? 'Designer graphique · Identités, images & mouvement'
      : 'Graphic designer · Identity, imagery & motion',
    copy[locale].heroText,
  );
}
export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const fr = locale === 'fr';
  return (
    <>
      <EditorialHero locale={locale} />
      <div className="discipline-ribbon" aria-hidden="true">
        <div>
          {[...categories, ...categories].map((cat, i) => (
            <span key={i}>
              {cat[locale]}
              <i>✳</i>
            </span>
          ))}
        </div>
      </div>
      <section className="section story-section" id="story">
        <div className="section-kicker" data-reveal>
          <span>01 / {c.about}</span>
          <span>ENSAD · SAFI</span>
        </div>
        <div className="story-grid">
          <h2 data-reveal>
            {fr ? 'Le design commence' : 'Design begins'}
            <br />
            {fr ? 'par une' : 'with a'}
            <br />
            <em>{fr ? 'curiosité.' : 'curiosity.'}</em>
            <span className="story-star">✳</span>
          </h2>
          <div className="story-copy" data-reveal>
            <p className="large-copy">{c.bio}</p>
            <p>{c.collab}</p>
            <Link className="text-link" href={`/${locale}/about`}>
              {fr ? 'Mon parcours & mes inspirations' : 'My background & creative practice'}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="fact-strip" data-reveal>
          <div>
            <span>01</span>
            <h3>{c.study1}</h3>
            <p>{c.study1note}</p>
          </div>
          <div>
            <span>02</span>
            <h3>{c.study2}</h3>
            <p>{c.study2note}</p>
          </div>
          <div>
            <span>03</span>
            <h3>{c.languages}</h3>
            <p>{c.languageList}</p>
          </div>
        </div>
      </section>
      <section className="section selected-v2" id="selected">
        <div className="section-kicker" data-reveal>
          <span>02 / {fr ? 'Explorations créatives' : 'Creative explorations'}</span>
          <span>2026—2027</span>
        </div>
        <div className="section-heading" data-reveal>
          <h2>
            {fr ? 'Une idée.' : 'An idea.'}
            <br />
            <em>{fr ? 'Plusieurs expressions.' : 'Many expressions.'}</em>
          </h2>
          <div>
            <p>{c.creativeText}</p>
            <Link className="text-link" href={`/${locale}/work`}>
              {c.all} <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="featured-list">
          {projects.slice(0, 5).map((p, i) => (
            <FeaturedProject key={p.slug} project={p} locale={locale} index={i} />
          ))}
        </div>
        <div className="all-work-line">
          <span>
            {fr
              ? 'Identités, édition, 3D, cinéma, dessin.'
              : 'Identity, editorial, 3D, cinema, drawing.'}
          </span>
          <Button asChild variant="outline" className="outline-link">
            <Link href={`/${locale}/work`}>
              {c.explore} <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <section className="section practice-section">
        <div className="section-kicker" data-reveal>
          <span>03 / {fr ? 'Ma pratique' : 'My practice'}</span>
          <span>{fr ? 'Du concept à l’image' : 'From concept to image'}</span>
        </div>
        <div className="practice-heading" data-reveal>
          <h2>{c.creative}</h2>
          <p>
            {fr
              ? 'J’explore différents supports pour trouver la forme juste : un signe, une page, une interface ou une scène.'
              : 'I explore different media to find the right form: a mark, a page, an interface or a scene.'}
          </p>
        </div>
        <div className="discipline-list">
          {categories.map((cat, i) => (
            <Link data-reveal href={`/${locale}/work?category=${i}`} key={cat.en}>
              <span>0{i + 1}</span>
              <h3>{cat[locale]}</h3>
              <MoveUpRight size={24} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section toolkit-section">
        <div className="toolkit-heading" data-reveal>
          <p className="eyebrow">04 / {c.skills}</p>
          <h2>
            {fr ? 'Apprendre. Explorer.' : 'Learn. Explore.'}
            <br />
            <em>{fr ? 'Créer. Recommencer.' : 'Create. Repeat.'}</em>
          </h2>
          <p>{c.skillsNote}</p>
        </div>
        <div className="software-grid">
          {software.map((s, i) => (
            <div data-reveal key={s}>
              <span className="software-icon">
                <Image src={`/images/software/${i}.png`} alt="" width={48} height={48} />
              </span>
              <span>{s}</span>
              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
