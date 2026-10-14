'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollMotion() {
  const path = usePathname();
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const init = () => {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (disposed) return;
          gsap.registerPlugin(ScrollTrigger);

          const context = gsap.context(() => {
            // Note: We intentionally do NOT hide or animate the above-the-fold hero elements
            // (.editorial-name, .editorial-portrait) from opacity: 0, ensuring instantaneous FCP/LCP.
            const seen = new WeakSet<Element>();
            const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
            elements.forEach((element) => {
              if (seen.has(element)) return;
              seen.add(element);
              gsap.from(element, {
                y: 28,
                opacity: 0,
                duration: 0.75,
                ease: 'power2.out',
                clearProps: 'all',
                scrollTrigger: { trigger: element, start: 'top 92%', once: true },
              });
            });

            // If browser doesn't support CSS scroll timeline, fall back to GSAP for the reading bar
            if (typeof CSS === 'undefined' || !CSS.supports || !CSS.supports('animation-timeline: scroll()')) {
              gsap.to('.reading-progress', {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
              });
            }
          });

          cleanup = () => context.revert();
        })
        .catch(() => {
          /* Fallback gracefully */
        });
    };

    // Defer GSAP initialization so it runs after initial paint, FCP, LCP, and hydration
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if ('requestIdleCallback' in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(init, { timeout: 1500 });
    } else {
      timerId = setTimeout(init, 400);
    }

    return () => {
      disposed = true;
      if (idleId && 'cancelIdleCallback' in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
      cleanup();
    };
  }, [path]);

  return <div className="reading-progress" aria-hidden="true" />;
}
