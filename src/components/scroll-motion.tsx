'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export function ScrollMotion() {
  const path = usePathname();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useEffect(() => {
    if (reduced) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    const observe = () =>
      document
        .querySelectorAll('[data-reveal]:not(.is-visible)')
        .forEach((el) => observer.observe(el));
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(document.getElementById('main')!, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [path, reduced]);
  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: reduced ? 0 : scaleX }}
      aria-hidden="true"
    />
  );
}
export function PortraitMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className="hero-visual"
      initial={false}
      whileHover={reduced ? {} : { rotate: 1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
