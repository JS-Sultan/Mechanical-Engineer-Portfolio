"use client";

import { useEffect, useRef } from "react";
import type { Clip } from "@/data/projects";

// Short project clip: plays muted on a loop while on screen (like a GIF, but with controls
// to unmute). Visitors who prefer reduced motion get a still poster and press play themselves.
export default function ProjectClip({ clip, autoPlay = true }: { clip: Clip; autoPlay?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || !autoPlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [autoPlay]);

  return (
    <video
      ref={ref}
      className="project-clip"
      src={clip.src}
      poster={clip.poster}
      width={clip.w}
      height={clip.h}
      muted
      loop={autoPlay}
      playsInline
      controls
      preload="none"
      aria-label={clip.label}
    />
  );
}
