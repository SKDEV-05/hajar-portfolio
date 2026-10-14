'use client';
import { useRef, type PointerEvent } from 'react';
import { ArtImage } from './art-image';

export function InteractivePortrait() {
  const surface = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    const element = surface.current;
    if (!element || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    element.style.setProperty('--pointer-x', `${x * 100}%`);
    element.style.setProperty('--pointer-y', `${y * 100}%`);
    element.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`);
    element.style.setProperty('--tilt-y', `${(x - 0.5) * 9}deg`);
    element.dataset.active = 'true';
  }
  function reset() {
    if (!surface.current) return;
    surface.current.dataset.active = 'false';
    surface.current.style.setProperty('--tilt-x', '0deg');
    surface.current.style.setProperty('--tilt-y', '0deg');
  }
  return (
    <div
      className="portrait-interaction"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <div className="portrait-depth" ref={surface}>
        <ArtImage
          className="portrait-monochrome"
          src="/images/hajar-salmi.webp"
          alt="Hajar Salmi"
          priority
          sizes="(max-width:700px) 60vw, 28vw"
        />
        <div className="portrait-color-window" aria-hidden="true">
          <ArtImage src="/images/hajar-salmi.webp" alt="" sizes="(max-width:700px) 60vw, 28vw" />
        </div>
      </div>
    </div>
  );
}
