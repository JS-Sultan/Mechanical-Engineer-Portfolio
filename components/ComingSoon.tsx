import Link from "next/link";
import { profile } from "@/data/profile";

type Variant = "projects" | "interests" | "videos";

// Each page gets its own sketch; strokes are "drafted" in by CSS (see .cs-draw in globals.css).
function Sketch({ variant }: { variant: Variant }) {
  if (variant === "projects") {
    return (
      <>
        {/* bracket part with holes + dimension line */}
        <path className="cs-draw" d="M40 150 V70 H120 V110 H160 V150 Z" />
        <circle className="cs-draw d2" cx="70" cy="100" r="12" />
        <circle className="cs-draw d2" cx="135" cy="130" r="8" />
        <path className="cs-draw d3 cs-dim" d="M40 170 H160 M40 164 V176 M160 164 V176" />
        <text className="cs-label" x="100" y="190" textAnchor="middle">
          120.00
        </text>
      </>
    );
  }
  if (variant === "interests") {
    return (
      <>
        {/* drafting compass drawing an arc */}
        <path className="cs-draw" d="M100 40 L65 150 M100 40 L135 150" />
        <circle className="cs-draw d2" cx="100" cy="40" r="7" />
        <path className="cs-draw d3 cs-dim" d="M60 160 A70 40 0 0 0 140 160" />
        <path className="cs-draw d2" d="M85 95 H115" />
      </>
    );
  }
  return (
    <>
      {/* screen with play button */}
      <rect className="cs-draw" x="35" y="55" width="130" height="90" rx="6" />
      <path className="cs-draw d2" d="M88 80 L120 100 L88 120 Z" />
      <path className="cs-draw d3" d="M80 165 H120 M100 145 V165" />
    </>
  );
}

export default function ComingSoon({
  no,
  title,
  message,
  variant,
}: {
  no: string;
  title: string;
  message: string;
  variant: Variant;
}) {
  const word = "Coming soon";
  return (
    <section className="cs">
      <div className="wrap cs-inner">
        <div className="cs-sheet" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="cs-svg">
            <Sketch variant={variant} />
          </svg>
          <svg viewBox="0 0 100 100" className="cs-gear">
            <circle cx="50" cy="50" r="26" />
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x="45" y="12" width="10" height="12" rx="1.5" transform={`rotate(${i * 36} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="8" />
          </svg>
          <span className="cs-stamp">In progress</span>
          <span className="cs-sheet-no">{no}</span>
        </div>

        <div className="cs-copy">
          <p className="section-no cs-no">{no}</p>
          <h1 className="cs-title">{title}</h1>
          <p className="cs-word" aria-label={word}>
            {word.split("").map((ch, i) => (
              <span key={i} aria-hidden="true" style={{ animationDelay: `${0.6 + i * 0.05}s` }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          <p className="cs-message">{message}</p>
          <div className="cs-progress" role="progressbar" aria-label="Page in progress" aria-valuetext="In progress">
            <span />
          </div>
          <p className="meta cs-status">
            Drafting in progress<span className="cs-dots" aria-hidden="true" />
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/">
              ← Back to home
            </Link>
            <a className="btn" href={profile.resume} download>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
