import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import ResultsChart from "@/components/ResultsChart";
import { profile, siteUrl } from "@/data/profile";
import { thesis } from "@/data/thesis";

const description =
  "M.Sc. thesis by Muhammad Ali, Xi'an Jiaotong University (2021): a BIM-based design and optimisation approach for a net-zero energy office building in Islamabad that cut simulated energy use and CO₂ emissions by 53%.";

export const metadata: Metadata = {
  title: "M.Sc. Thesis: Net-Zero Energy Building",
  description,
  alternates: { canonical: "/projects/thesis/" },
  openGraph: { title: "M.Sc. Thesis: Net-Zero Energy Building", description, url: "/projects/thesis/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Thesis",
  name: thesis.title,
  description,
  inSupportOf: thesis.degree,
  datePublished: "2021-05",
  author: { "@type": "Person", name: profile.name, url: siteUrl },
  sourceOrganization: { "@type": "CollegeOrUniversity", name: thesis.university },
  about: ["Net-zero energy building", "Building information modelling", "Building energy simulation", "Renewable energy"],
  url: `${siteUrl}/projects/thesis/`,
};

export default function ThesisPage() {
  return (
    <div className="page" data-section="projects">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link href="/projects/">Projects &amp; Awards</Link> <span aria-hidden="true">/</span> <span>M.Sc. thesis</span>
        </nav>

        <header className="thesis-head">
          <p className="section-no">R-01</p>
          <p className="meta thesis-kicker">M.Sc. thesis · {thesis.date}</p>
          <h1>{thesis.title}</h1>
          <dl className="thesis-meta">
            <div>
              <dt>University</dt>
              <dd>{thesis.university}</dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>{thesis.degree}</dd>
            </div>
            <div>
              <dt>Supervisor</dt>
              <dd>{thesis.supervisor}</dd>
            </div>
          </dl>
        </header>

        <ul className="headline-figures">
          {thesis.headline.map((h) => (
            <li key={h.label}>
              <strong>{h.value}</strong>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>

        <section className="thesis-grid" aria-labelledby="overview-h">
          <div className="prose">
            <h2 id="overview-h" className="col-label">
              Overview
            </h2>
            {thesis.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className="panel spec">
            <h3 className="panel-title">Case-study building</h3>
            <dl>
              {thesis.building.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <section aria-labelledby="method-h" className="thesis-block">
          <h2 id="method-h" className="col-label">
            Method: three design stages
          </h2>
          <ol className="stages">
            {thesis.stages.map((s, i) => (
              <li key={s.title}>
                <span className="stage-no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="tools">
            <span className="meta">Tools</span>
            {thesis.tools.map((t) => (
              <span key={t} className="tool-chip">
                {t}
              </span>
            ))}
          </p>
        </section>

        <section aria-labelledby="results-h" className="thesis-block">
          <h2 id="results-h" className="col-label">
            Results
          </h2>
          <ResultsChart rows={thesis.results} />
          <p className="thesis-note">{thesis.insight}</p>
          <ul className="findings">
            {thesis.findings.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <div className="thesis-block">
          <Gallery groups={[{ title: "From the analysis: site and building studies", photos: thesis.figures }]} />
        </div>

        <section aria-labelledby="future-h" className="thesis-block">
          <h2 id="future-h" className="col-label">
            Future work
          </h2>
          <ul className="tick-list">
            {thesis.future.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <p className="back-row thesis-links">
          <Link className="btn" href="/projects/">
            ← Projects &amp; Awards
          </Link>
          <Link className="btn" href="/journeys/china/">
            Life in Xi&apos;an →
          </Link>
        </p>
      </div>
    </div>
  );
}
