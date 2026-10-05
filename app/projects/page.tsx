import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import ProjectClip from "@/components/ProjectClip";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { siteUrl, profile } from "@/data/profile";
import { awardPhotos, awards, featured, projects } from "@/data/projects";
import { press } from "@/data/videos";

const description =
  "Projects and awards of Muhammad Ali, Mechanical Engineer: a supervised Hybrid Electric Bike that won 1st position at ICECE-2023 (UET Lahore), plus water-jet propulsion, cam-and-follower and roller-conveyor projects.";

export const metadata: Metadata = {
  title: "Projects & Awards",
  description,
  alternates: { canonical: "/projects/" },
  openGraph: { title: "Projects & Awards", description, url: "/projects/" },
};

const news = press.find((p) => p.id === featured.newsVideoId)!;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: featured.title,
  description: featured.summary[0],
  dateCreated: featured.year,
  contributor: { "@type": "Person", name: profile.name, url: siteUrl, roleName: featured.role },
  award: `${featured.award.title}, ${featured.award.event}`,
  image: siteUrl + featured.photo.src.replace(/^.*?\/projects\//, "/projects/"),
};

export default function ProjectsPage() {
  return (
    <div className="page" data-section="projects">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <header className="page-head">
          <p className="section-no">P-01</p>
          <h1>Projects &amp; Awards</h1>
          <p className="lede">
            Engineering projects I have supervised, from an award-winning hybrid motorcycle to working models of
            classic mechanisms, and the recognition earned along the way.
          </p>
        </header>

        {/* Featured project */}
        <article className="featured" aria-labelledby="featured-h">
          <div className="featured-copy">
            <p className="meta">
              {featured.role} · {featured.year}
            </p>
            <h2 id="featured-h">{featured.title}</h2>
            <p className="featured-context">{featured.context}</p>

            <div className="award-badge">
              <span className="award-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26">
                  <path
                    d="M7 3h10v3a5 5 0 0 1-10 0zM7 4H4v1a3 3 0 0 0 3 3M17 4h3v1a3 3 0 0 1-3 3M12 11v4m-3.5 5h7l-1-3h-5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <strong>{featured.award.title}</strong>
                <span>{featured.award.event}</span>
                <span className="meta">
                  {featured.award.host} · {featured.award.date} · {featured.award.prize}
                </span>
              </div>
            </div>

            {featured.summary.map((p, i) => (
              <p key={i} className="featured-text">
                {p}
              </p>
            ))}

            <ul className="figures">
              {featured.figures.map((f) => (
                <li key={f.label}>
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>

            <div className="featured-news">
              <h3 className="col-label">
                In the news <span className="meta">· {news.channel}</span>
              </h3>
              <div className="featured-news-player">
                <YouTubeEmbed id={news.id} title={news.title} thumb={news.thumb} />
              </div>
              <p className="video-tags">
                <Link className="tl-journey" href="/videos/">
                  More videos →
                </Link>
              </p>
            </div>
          </div>

          <div className="featured-media">
            <figure className="featured-photo">
              <img
                src={featured.photo.thumb}
                srcSet={`${featured.photo.thumb} 640w, ${featured.photo.src} ${featured.photo.w}w`}
                sizes="(min-width: 900px) 440px, 100vw"
                alt={featured.photo.alt}
                width={featured.photo.w}
                height={featured.photo.h}
              />
              <figcaption className="meta">ICECE-2023, UET Lahore: 1st position</figcaption>
            </figure>
            <figure className="featured-clip">
              <ProjectClip clip={featured.clip} />
              <figcaption className="meta">TEVTA Skills Project Competition 2023 · regional level</figcaption>
            </figure>
          </div>
        </article>

        {/* Other supervised projects */}
        <section aria-labelledby="more-h" className="more-projects">
          <h2 id="more-h" className="col-label">
            More supervised projects <span className="meta">· {projects.length}</span>
          </h2>
          <ul className="project-grid">
            {projects.map((p, i) => (
              <li key={p.title} className="project-card">
                <div className="project-media">
                  <ProjectClip clip={p.clip} />
                </div>
                <div className="project-body">
                  <span className="tile-no">{String(i + 2).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <ul className="chips">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Awards */}
        <section aria-labelledby="awards-h" className="awards">
          <h2 id="awards-h" className="col-label">
            Awards &amp; recognition <span className="meta">· {awards.length}</span>
          </h2>
          <ol className="award-list">
            {awards.map((a) => (
              <li key={a.title}>
                <span className="meta">{a.date}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <Gallery groups={[{ title: "Certificates & ceremonies", photos: awardPhotos }]} />
        </section>
      </div>
    </div>
  );
}
