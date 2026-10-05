"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/journeys";

export default function Gallery({ groups }: { groups: { title: string; photos: Photo[] }[] }) {
  const all = groups.flatMap((g) => g.photos);
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  // Every way out (close button, backdrop click, Escape) goes through here, so a playing video is
  // always stopped and unmounted. The dialog's own "close" event isn't relied on: some browsers skip it.
  const close = useCallback(() => {
    const dialog = dialogRef.current;
    dialog?.querySelector("video")?.pause();
    dialog?.close();
    setIndex(null);
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + all.length) % all.length)), [all.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step, close]);

  let offset = 0;
  const photo = index === null ? null : all[index];

  return (
    <>
      {groups.map((g) => {
        const start = offset;
        offset += g.photos.length;
        return (
          <section key={g.title} className="gal-group" aria-labelledby={`g-${start}`}>
            <h2 id={`g-${start}`} className="col-label">
              {g.title} <span className="meta">· {g.photos.length}</span>
            </h2>
            <ul className="gal-grid">
              {g.photos.map((p, i) => (
                <li key={p.src} className={p.h > p.w ? "tall" : undefined}>
                  <button
                    type="button"
                    onClick={() => open(start + i)}
                    aria-label={`${p.video ? "Play video" : "View photo"}: ${p.alt}`}
                  >
                    <img src={p.thumb} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
                    {p.video && (
                      <span className="play-badge" aria-hidden="true">
                        ▶
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Photo viewer"
        onClick={(e) => e.target === e.currentTarget && close()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {photo && (
          <figure>
            {photo.video ? (
              <video
                key={photo.video}
                src={photo.video}
                poster={photo.src}
                width={photo.w}
                height={photo.h}
                controls
                autoPlay
                playsInline
                preload="metadata"
                aria-label={photo.alt}
              />
            ) : (
              <img key={photo.src} src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} />
            )}
            <figcaption>
              <span>{photo.alt}</span>
              <span className="meta">
                {index! + 1} / {all.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="lb-btn lb-close" onClick={close} aria-label="Close">
          ✕
        </button>
        <button type="button" className="lb-btn lb-prev" onClick={() => step(-1)} aria-label="Previous photo">
          ‹
        </button>
        <button type="button" className="lb-btn lb-next" onClick={() => step(1)} aria-label="Next photo">
          ›
        </button>
      </dialog>
    </>
  );
}
