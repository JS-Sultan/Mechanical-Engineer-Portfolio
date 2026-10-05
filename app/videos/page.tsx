import type { Metadata } from "next";
import Link from "next/link";
import { profile, siteUrl } from "@/data/profile";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { formatDate, formatDuration, press, videoPoster, videos, videoSrc } from "@/data/videos";

const description =
  "Videos of Muhammad Ali, Mechanical Engineer: news coverage of Pakistan's first hybrid bike from the Government College of Technology, Lahore, and technical presentations on spray cooling and steam power plants at Xi'an Jiaotong University.";

export const metadata: Metadata = {
  title: "Videos: In the News & Talks",
  description,
  alternates: { canonical: "/videos/" },
  openGraph: { title: "Videos: In the News & Talks", description, url: "/videos/" },
};

// schema.org VideoObject entries so search engines can list the clips as videos.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...press.map((v) => ({
      "@type": "VideoObject",
      name: v.originalTitle,
      description: v.description,
      uploadDate: v.date,
      duration: `PT${v.duration}S`,
      thumbnailUrl: v.thumb,
      embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
      url: `https://www.youtube.com/watch?v=${v.id}`,
      publisher: { "@type": "Organization", name: v.channel, url: v.channelUrl },
    })),
    ...videos.map((v) => ({
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
  ],
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
            Engineering in the news, and technical talks explaining ideas to an international audience.
          </p>
        </header>

        <section aria-labelledby="news-h" className="video-section">
          <h2 id="news-h" className="col-label">
            In the news <span className="meta">· {press.length}</span>
          </h2>
          <ul className="press-grid">
            {press.map((v) => (
              <li key={v.id} className={v.vertical ? "video-card press-card vertical" : "video-card press-card"}>
                <div className="press-media">
                  <YouTubeEmbed id={v.id} title={v.title} thumb={v.thumb} vertical={v.vertical} />
                </div>
                <div className="video-body">
                  <p className="meta">
                    {formatDate(v.date)} · {formatDuration(v.duration)}
                  </p>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                  <p className="video-tags">
                    <a className="tl-journey" href={v.channelUrl} target="_blank" rel="noopener noreferrer">
                      Video: {v.channel} ↗
                    </a>
                    <a className="tl-journey" href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">
                      Watch on YouTube ↗
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <h2 className="col-label video-section-title">
          Talks &amp; presentations <span className="meta">· {videos.length}</span>
        </h2>
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
                <h3>{v.title}</h3>
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
          More videos, including CAD walkthroughs and engineering explainers, are on the way
          <span className="cs-dots" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
