"use client";

import Link from "next/link";
import { useState } from "react";
import type { Journey, JourneyTag } from "@/data/journeys";

type Card = Pick<Journey, "slug" | "place" | "country" | "tag" | "period" | "summary" | "cover"> & { media: string };

export default function JourneyGrid({ cards, tags }: { cards: Card[]; tags: JourneyTag[] }) {
  const [filter, setFilter] = useState<JourneyTag | "All">("All");
  const shown = filter === "All" ? cards : cards.filter((c) => c.tag === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter journeys">
        {(["All", ...tags] as const).map((t) => (
          <button key={t} type="button" aria-pressed={filter === t} onClick={() => setFilter(t)}>
            {t}
            <span className="meta">{t === "All" ? cards.length : cards.filter((c) => c.tag === t).length}</span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="empty">
          No {filter.toLowerCase()} journeys published yet. More are on the way<span className="cs-dots" aria-hidden="true" />
        </p>
      ) : (
        <ul className="journey-grid">
          {shown.map((c) => (
            <li key={c.slug}>
              <Link href={`/journeys/${c.slug}/`} className="journey-card">
                <div className="jc-img">
                  <img src={c.cover} alt="" loading="lazy" />
                  <span className={`tag tag-${c.tag.toLowerCase()}`}>{c.tag}</span>
                </div>
                <div className="jc-body">
                  {c.period && <p className="meta">{c.period}</p>}
                  <h2>
                    {c.place}, {c.country}
                  </h2>
                  <p>{c.summary}</p>
                  <span className="jc-more">
                    {c.media} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
