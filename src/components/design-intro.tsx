'use client';
import { useEffect, useRef } from 'react';

/** A short brand introduction, independent of network/loading progress. */
export function DesignIntro() {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = panel.current;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || media.matches) return;
    try {
      if (sessionStorage.getItem('hajar-intro-seen')) return;
      sessionStorage.setItem('hajar-intro-seen', 'true');
    } catch {
      /* The intro still works when storage is unavailable. */
    }
    element.hidden = false;
    const dismiss = () => {
      element.hidden = true;
    };
    const timer = window.setTimeout(dismiss, 1400);
    window.addEventListener('pointerdown', dismiss, { once: true });
    window.addEventListener('keydown', dismiss, { once: true });
    media.addEventListener('change', dismiss);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('keydown', dismiss);
      media.removeEventListener('change', dismiss);
      dismiss();
    };
  }, []);
  return (
    <div ref={panel} className="design-intro" hidden aria-hidden="true">
      <div className="intro-emblem">
        <svg viewBox="0 0 160 160" fill="none">
          <rect
            className="intro-frame"
            x="21"
            y="21"
            width="118"
            height="118"
            stroke="currentColor"
          />
          <path
            className="intro-path"
            d="M42 108V52M42 80H76M76 52V108M120 57C97 42 88 64 106 77C130 94 113 117 92 103"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="square"
            pathLength="1"
          />
          <g className="intro-nodes" fill="currentColor">
            <rect x="17" y="17" width="8" height="8" />
            <rect x="135" y="17" width="8" height="8" />
            <rect x="17" y="135" width="8" height="8" />
            <rect x="135" y="135" width="8" height="8" />
          </g>
        </svg>
        <span>HAJAR SALMI</span>
        <small>IDENTITY · IMAGE · MOTION</small>
      </div>
    </div>
  );
}
