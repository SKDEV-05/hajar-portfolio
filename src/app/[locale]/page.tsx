import Link from 'next/link';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Locale, copy, projects, categories, software } from '@/data/content';
import { metadata } from '@/lib/metadata';
import { Sculpture } from '@/components/sculpture';
import { FeaturedProject } from '@/components/project-card';
import { ContactBand } from '@/components/layout';
import { ArtImage } from '@/components/art-image';
import { PortraitMotion } from '@/components/scroll-motion';
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
      <section className="hero-v2">
        <div className="hero-introline">
          <span>
            <i className="status-dot" />
            {c.student}
          </span>
          <span>{c.location} / 2026—27</span>
        </div>
        <div className="hero-stage">
          <div className="hero-type">
            <p className="hero-salute">{fr ? 'Bonjour, je suis' : 'Hello, I’m'}</p>
            <h1>
              HAJAR
              <br />
              <span>
                SALMI<span className="name-dot">✳</span>
              </span>
            </h1>
            <p className="hero-position">
              {fr ? 'Je transforme les idées' : 'I turn ideas'}
              <br />
              <em>{fr ? 'en histoires visuelles.' : 'into visual stories.'}</em>
            </p>
            <div className="hero-actions">
              <Button asChild className="primary-link">
                <a href="#selected">
                  {c.selected}
                  <ArrowDown size={16} />
                </a>
              </Button>
              <Link className="quiet-link" href={`/${locale}/about`}>
                {c.moreAbout}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
          <PortraitMotion>
            <div className="portrait-outline" />
            <div className="hero-portrait">
              <ArtImage
                src="/images/hajar-salmi.webp"
                alt="Hajar Salmi"
                priority
                sizes="(max-width:700px) 65vw, 30vw"
              />
            </div>
            <span className="portrait-label">
              <span>✳</span>
              {fr ? 'Un regard curieux.' : 'A curious eye.'}
              <br />
              {fr ? 'Une énergie créative.' : 'A creative spirit.'}
            </span>
            <div className="hero-coordinate">{c.location}</div>
            <Sculpture />
          </PortraitMotion>
        </div>
        <div className="hero-bottomline">
          <p>
            {fr
              ? 'Identité visuelle, interfaces & mondes en mouvement.'
              : 'Visual identities, interfaces & worlds in motion.'}
          </p>
          <a href="#story">
            {c.scroll}
            <ArrowDown size={15} />
          </a>
        </div>
      </section>
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
              <span className={`software-icon software-${i}`}>
                {['Ai', 'Ps', 'Id', 'Xd', 'Ae', 'B3'][i]}
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
