"use client";

import { useState } from "react";

// Click-to-play YouTube embed: shows only the thumbnail until clicked, then loads the player
// from youtube-nocookie.com (privacy-enhanced mode), so nothing from YouTube runs before then.
export default function YouTubeEmbed({ id, title, thumb, vertical }: { id: string; title: string; thumb: string; vertical?: boolean }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={vertical ? "yt yt-vertical" : "yt"}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt-facade" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={thumb} alt="" loading="lazy" decoding="async" />
          <span className="yt-play" aria-hidden="true">
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path d="M66.5 7.7A8.5 8.5 0 0 0 60.5 1.7C55.2.3 34 .3 34 .3S12.8.3 7.5 1.7a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#f00" />
              <path d="M27 34.2 44.8 24 27 13.8z" fill="#fff" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
