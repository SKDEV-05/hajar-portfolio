'use client';
import { useRef, useSyncExternalStore, type PointerEvent } from 'react';
import { ArtImage } from './art-image';

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};
const getSnapshot = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const getServerSnapshot = () => false;

export function InteractivePortrait() {
  const surface = useRef<HTMLDivElement>(null);
  const canHover = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
      onPointerMove={canHover ? move : undefined}
      onPointerLeave={canHover ? reset : undefined}
      onPointerCancel={canHover ? reset : undefined}
    >
      <div className="portrait-depth" ref={surface}>
        <ArtImage
          className="portrait-monochrome"
          src="/images/hajar-salmi.webp"
          alt="Hajar Salmi"
          priority
          sizes="(max-width: 700px) 70vw, (max-width: 1100px) 45vw, 28vw"
        />
        {canHover && (
          <div className="portrait-color-window" aria-hidden="true">
            <ArtImage
              src="/images/hajar-salmi.webp"
              alt=""
              sizes="(max-width: 700px) 70vw, (max-width: 1100px) 45vw, 28vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}
