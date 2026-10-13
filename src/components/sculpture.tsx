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
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    const capable = !!gl && (navigator.hardwareConcurrency || 4) > 2;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    const update = () => setSupported(capable && !media.matches);
    update();
    media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    if (container.current) observer.observe(container.current);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
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
