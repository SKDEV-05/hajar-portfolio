'use client';
import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState } from 'react';
const Scene = dynamic(() => import('./sculpture-scene'), { ssr: false });
class Boundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function Sculpture() {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // 1. Skip heavy 3D WebGL bundle on mobile viewports to eliminate 190 KiB unused JS on mobile Lighthouse
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    // 2. Defer loading Three.js until main thread is completely idle (after initial paint, FCP, LCP, hydration)
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const loadScene = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        const capable = !!gl && (navigator.hardwareConcurrency || 4) > 2;
        gl?.getExtension('WEBGL_lose_context')?.loseContext();
        if (capable) {
          setSupported(true);
        }
      } catch {
        /* Fallback stays visible */
      }
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(loadScene, { timeout: 2000 });
    } else {
      timerId = setTimeout(loadScene, 1200);
    }

    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    if (container.current) observer.observe(container.current);

    return () => {
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
      observer.disconnect();
    };
  }, []);
  return (
    <div className="sculpture" ref={container} aria-hidden="true">
      <div className="sculpture-fallback">
        <i />
        <i />
        <i />
      </div>
      {supported && (
        <Boundary>
          <Scene active={active} />
        </Boundary>
      )}
      <span className="sculpture-cross cross-one">+</span>
      <span className="sculpture-cross cross-two">+</span>
      <div className="sculpture-caption">
        FORM / 001 <span>↗</span>
      </div>
    </div>
  );
}
