'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollMotion() {
  const path = usePathname();
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
          const context = gsap.context(() => {
            if (document.querySelector('.editorial-name'))
              gsap.from('.editorial-name > span', {
                y: 35,
                opacity: 0,
                stagger: 0.12,
                duration: 1,
                ease: 'power3.out',
                clearProps: 'all',
              });
            if (document.querySelector('.editorial-portrait'))
              gsap.from('.editorial-portrait', {
                y: 24,
                opacity: 0,
                duration: 1,
                delay: 0.18,
                clearProps: 'all',
              });
            gsap.to('.reading-progress', {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
            });
          });
          const seen = new WeakSet<Element>();
          const observe = () =>
            context.add(() => {
              document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
                if (seen.has(element)) return;
                seen.add(element);
                gsap.from(element, {
                  y: 30,
                  opacity: 0,
                  duration: 0.85,
                  ease: 'power3.out',
                  clearProps: 'all',
                  scrollTrigger: { trigger: element, start: 'top 94%', once: true },
                });
              });
              ScrollTrigger.refresh();
            });
          observe();
          const observer = new MutationObserver(observe);
          const main = document.getElementById('main');
          if (main) observer.observe(main, { childList: true, subtree: true });
          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener('load', refresh);
          document.fonts.ready.then(() => {
            if (!disposed) refresh();
          });
          return () => {
            observer.disconnect();
            window.removeEventListener('load', refresh);
            context.revert();
          };
        });
        cleanup = () => media.revert();
      })
      .catch(() => {
        /* Content stays visible if the animation chunk cannot load. */
      });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [path]);
  return <div className="reading-progress" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />;
}
