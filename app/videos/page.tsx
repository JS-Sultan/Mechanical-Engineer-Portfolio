import type { Metadata } from "next";
import Link from "next/link";
import { profile, siteUrl } from "@/data/profile";
import { formatDate, videoPoster, videos, videoSrc } from "@/data/videos";

const description =
  "Videos of Muhammad Ali, Mechanical Engineer — technical presentations on spray cooling and steam power plants at Xi'an Jiaotong University.";

export const metadata: Metadata = {
  title: "Videos — Talks & Presentations",
  description,
  alternates: { canonical: "/videos/" },
  openGraph: { title: "Videos — Talks & Presentations", description, url: "/videos/" },
};

// schema.org VideoObject entries so search engines can list the clips as videos.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": videos.map((v) => ({
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    uploadDate: v.date,
    duration: `PT${v.duration}S`,
    thumbnailUrl: `${siteUrl}/videos/${v.slug}.webp`,
    contentUrl: `${siteUrl}/videos/${v.slug}.mp4`,
    creator: { "@type": "Person", name: profile.name, url: siteUrl },
    locationCreated: { "@type": "Place", name: v.venue },
  })),
};

export default function VideosPage() {
  return (
    <div className="page" data-section="videos">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <header className="page-head">
          <p className="section-no">V-00</p>
          <h1>Videos</h1>
          <p className="lede">
            Technical talks and presentations — explaining engineering ideas to an international audience.
          </p>
        </header>

        <ul className="video-list">
          {videos.map((v) => (
            <li key={v.slug} className="video-card">
              <div className="video-frame">
                <video
                  src={videoSrc(v)}
                  poster={videoPoster(v)}
                  width={1280}
                  height={720}
                  controls
                  preload="none"
                  playsInline
                  aria-label={v.title}
                />
              </div>
              <div className="video-body">
                <p className="meta">
                  {formatDate(v.date)} · {v.venue}
                </p>
                <h2>{v.title}</h2>
                <p>{v.description}</p>
                <p className="video-tags">
                  {v.fullLength && (
                    <span className="tag tag-study">
                      Highlight · {v.duration}s of {v.fullLength}
                    </span>
                  )}
                  {v.journey && (
                    <Link className="tl-journey" href={`/journeys/${v.journey}/`}>
                      More from Xi&apos;an →
                    </Link>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="empty">
          More videos — CAD walkthroughs and engineering explainers — are on the way
          <span className="cs-dots" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
