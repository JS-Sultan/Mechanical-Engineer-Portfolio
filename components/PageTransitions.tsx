"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { basePath } from "@/data/profile";

const LEAVE_MS = 200;

// Blocks that fade up as they scroll into view (only ones that start below the fold).
const REVEAL =
  "main .section, main .featured, main .more-projects, main .awards, main .project-card, main .journey-grid > li, main .video-section, main .video-list > li, main .gal-group, main .tile, main .tl-item, main .card";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Page-to-page fade: internal link clicks first fade the current page out (html.page-leaving),
 * then navigate; the new page fades in through app/template.tsx. Also reveals content on scroll.
 */
export default function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();

  // Fade out before leaving the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.getAttribute("href") || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (/\.(pdf|mp4|webp|jpe?g|png|zip)$/i.test(url.pathname)) return; // files, not pages
      if (url.pathname === location.pathname) return; // same page (e.g. #section links): just scroll
      if (reducedMotion()) return;

      e.preventDefault();
      e.stopPropagation(); // keep next/link from navigating immediately; we navigate after the fade
      const path = url.pathname.startsWith(basePath) ? url.pathname.slice(basePath.length) || "/" : url.pathname;
      document.documentElement.classList.add("page-leaving");
      window.setTimeout(() => router.push(path + url.search + url.hash), LEAVE_MS);
      window.setTimeout(() => document.documentElement.classList.remove("page-leaving"), 2000); // failsafe
    };
    window.addEventListener("click", onClick, true); // capture: runs before next/link's handler
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  // New page is in: drop the leaving state and set up scroll reveals.
  useEffect(() => {
    document.documentElement.classList.remove("page-leaving");
    if (reducedMotion() || !("IntersectionObserver" in window)) return;

    let observerAlive = false;
    const io = new IntersectionObserver(
      (entries) => {
        observerAlive = true;
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    // A short timer (not requestAnimationFrame, which is paused in background tabs) lets layout settle first.
    const timer = window.setTimeout(() => {
      const fold = window.innerHeight;
      document.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
        if (el.closest(".reveal") || el.getBoundingClientRect().top < fold) return; // already visible: leave it
        const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
        el.classList.add("reveal");
        io.observe(el);
      });
    }, 60);

    // Safety net: an observer always reports once right after observe(). If it hasn't (e.g. the page is
    // hidden and the browser has paused it), show everything so content can never stay invisible.
    const failsafe = window.setTimeout(() => {
      if (observerAlive) return;
      io.disconnect();
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => el.classList.add("in-view"));
    }, 1500);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
