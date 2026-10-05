import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { journeys, mediaSummary } from "@/data/journeys";
import { profile, siteUrl } from "@/data/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = journeys.find((x) => x.slug === slug);
  if (!j) return {};
  const title = j.period ? `${j.country}: ${j.tag} (${j.period})` : `${j.country}: ${j.tag}`;
  return {
    title,
    description: j.summary,
    alternates: { canonical: `/journeys/${j.slug}/` },
    openGraph: {
      title,
      description: j.summary,
      url: `/journeys/${j.slug}/`,
      images: [{ url: j.groups[0].photos[0].src.replace(/^.*?\/journeys\//, "/journeys/") }],
    },
  };
}

export default async function JourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = journeys.find((x) => x.slug === slug);
  if (!j) notFound();
  const media = mediaSummary(j);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${profile.name} in ${j.country}`,
    description: j.summary,
    url: `${siteUrl}/journeys/${j.slug}/`,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    contentLocation: { "@type": "Place", name: `${j.place}, ${j.country}` },
    image: j.groups.flatMap((g) => g.photos).map((p) => ({ "@type": "ImageObject", contentUrl: siteUrl + p.src.replace(/^.*?\/journeys\//, "/journeys/"), caption: p.alt })),
  };

  return (
    <div className="page" data-section="journeys" data-journey-tag={j.tag.toLowerCase()}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link href="/journeys/">Journeys</Link> <span aria-hidden="true">/</span> <span>{j.country}</span>
        </nav>

        <header className="journey-head">
          <div>
            <span className={`tag tag-${j.tag.toLowerCase()}`}>{j.tag}</span>
            <h1>
              {j.place}, {j.country}
            </h1>
            <p className="meta">
              {j.period ? `${j.period} · ${media}` : media}
            </p>
          </div>
          <div className="prose journey-story">
            {j.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {j.links && (
              <div className="related">
                <span className="meta">See also</span>
                {j.links.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label} →
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>

        <Gallery groups={j.groups} />

        <p className="back-row">
          <Link className="btn" href="/journeys/">
            ← All journeys
          </Link>
        </p>
      </div>
    </div>
  );
}
