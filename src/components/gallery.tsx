'use client';
import { useRef, useState } from 'react';
import { copy, Locale } from '@/data/content';
import { ArtImage } from './art-image';
export function Gallery({
  images,
  title,
  locale,
}: {
  images: string[];
  title: string;
  locale: Locale;
}) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const c = copy[locale];
  function move(delta: number) {
    setSelected((s) => (s + delta + images.length) % images.length);
  }
  return (
    <>
      <div className="art-gallery">
        {images.map((src, i) => (
          <button
            data-reveal
            key={src}
            onClick={() => {
              setSelected(i);
              dialog.current?.showModal();
            }}
            aria-label={`${c.enlarge} — ${title}, ${i + 1}`}
          >
            <ArtImage
              src={src}
              alt={`${title} — ${c.artwork} ${i + 1}`}
              sizes="(max-width:700px) 92vw, 45vw"
            />
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${title} — ${c.gallery}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') move(1);
          if (e.key === 'ArrowLeft') move(-1);
        }}
      >
        <div className="lightbox-bar">
          <span>
            {title} / {selected + 1} — {images.length}
          </span>
          <button autoFocus onClick={() => dialog.current?.close()} aria-label={c.close}>
            ✕
          </button>
        </div>
        <ArtImage
          src={images[selected]}
          alt={`${title} — ${c.artwork} ${selected + 1}`}
          sizes="90vw"
        />
        <div className="lightbox-controls">
          <button onClick={() => move(-1)} aria-label={c.previous}>
            ←
          </button>
          <button onClick={() => move(1)} aria-label={c.nextImage}>
            →
          </button>
        </div>
      </dialog>
    </>
  );
}
