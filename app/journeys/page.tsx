import type { Metadata } from "next";
import Link from "next/link";
import JourneyGrid from "@/components/JourneyGrid";
import { countriesVisited, journeys, journeyTags, mediaSummary } from "@/data/journeys";

const description =
  "Places Muhammad Ali, Mechanical Engineer, has studied, worked and travelled — from quality control in Bahrain to an M.Sc. in China and production supervision in the Netherlands.";

export const metadata: Metadata = {
  title: "Journeys — Study, Work & Travel",
  description,
  alternates: { canonical: "/journeys/" },
  openGraph: { title: "Journeys — Study, Work & Travel", description, url: "/journeys/" },
};

export default function JourneysPage() {
  const published = new Set(journeys.map((j) => j.country));
  const cards = journeys.map(({ groups, story, links, ...card }) => ({ ...card, media: mediaSummary({ groups }) }));

  return (
    <div className="page">
      <div className="wrap">
        <header className="page-head">
          <p className="section-no">J-00</p>
          <h1>Journeys</h1>
          <p className="lede">
            Studying, working and travelling across {countriesVisited.length} countries — the places behind the CV,
            from the factory floor to the lecture hall.
          </p>
        </header>

        <ul className="country-strip" aria-label="Countries">
          {countriesVisited.map((c) => {
            const j = journeys.find((x) => x.country === c);
            return (
              <li key={c} className={published.has(c) ? "live" : undefined}>
                {j ? <Link href={`/journeys/${j.slug}/`}>{c}</Link> : c}
                {!published.has(c) && <span className="soon">soon</span>}
              </li>
            );
          })}
        </ul>

        <JourneyGrid cards={cards} tags={journeyTags} />
      </div>
    </div>
  );
}
