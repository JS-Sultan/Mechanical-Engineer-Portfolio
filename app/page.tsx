import Link from "next/link";
import { GmailIcon, LinkedInIcon, LocationIcon, WhatsAppIcon } from "@/components/ContactIcons";
import HeroMechanism from "@/components/HeroMechanism";
import { education, experience, expertise, internships, profile, skills, stats } from "@/data/profile";

function SectionHead({ no, title, kicker }: { no: string; title: string; kicker?: string }) {
  return (
    <header className="section-head">
      <span className="section-no">{no}</span>
      <h2>{title}</h2>
      {kicker && <p className="kicker">{kicker}</p>}
    </header>
  );
}

export default function Home() {
  return (
    <>
        {/* ── Hero ─────────────────────────────── */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <div className="hero-id">
                <figure className="portrait">
                  <img
                    src={profile.portrait.src}
                    srcSet={`${profile.portrait.small} 400w, ${profile.portrait.src} 800w`}
                    sizes="(min-width: 720px) 184px, 136px"
                    width={800}
                    height={800}
                    alt={`Portrait of ${profile.name}`}
                    fetchPriority="high"
                  />
                  <figcaption className="meta">Fig. 1 · {profile.name}</figcaption>
                </figure>
                <p className="eyebrow">
                  <span className="dot" aria-hidden="true" /> {profile.location} · Open to opportunities
                </p>
              </div>
              <h1>
                {profile.name}
                <span className="h1-sub">{profile.title}</span>
              </h1>
              <p className="lede">
                Building reliable production lines, tighter quality systems and well-designed mechanical parts — from
                the shop floor in the Netherlands to the classroom in Lahore.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary" href={profile.resume} download>
                  Download CV
                </a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="btn" href={`mailto:${profile.email}`}>
                  Email me
                </a>
              </div>
            </div>

            {/* Drawing-style title block */}
            <aside className="title-block" aria-label="Profile summary">
              <div className="tb-figure">
                <HeroMechanism initials={profile.initials} />
              </div>
              <dl className="tb-table">
                <div>
                  <dt>Name</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt>Discipline</dt>
                  <dd>Mechanical Eng.</dd>
                </div>
                <div>
                  <dt>Degree</dt>
                  <dd>M.Sc. Power Eng.</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>7+ yrs</dd>
                </div>
                <div className="tb-wide">
                  <dt>Focus</dt>
                  <dd>{profile.tagline}</dd>
                </div>
                <div>
                  <dt>Sheet</dt>
                  <dd>01 / 01</dd>
                </div>
                <div>
                  <dt>Rev.</dt>
                  <dd>2026</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="wrap">
            <ul className="stats">
              {stats.map((s) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── About ─────────────────────────────── */}
        <section id="about" className="section">
          <div className="wrap">
            <SectionHead no="01" title="About" />
            <div className="about-grid">
              <div className="prose">
                {profile.summary.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="about-side">
                <div className="panel">
                  <h3 className="panel-title">Interests</h3>
                  <ul className="tick-list">
                    {profile.interests.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
                <div className="panel">
                  <h3 className="panel-title">Education</h3>
                  <ol className="edu-list">
                    {education.map((e) => (
                      <li key={e.degree}>
                        <p className="edu-degree">{e.degree}</p>
                        <p className="edu-school">{e.school}</p>
                        <p className="meta">
                          {e.years}
                          {e.grade && ` · ${e.grade}`}
                        </p>
                        {e.journey && (
                          <Link className="tl-journey" href={`/journeys/${e.journey}/`}>
                            See photos from my studies →
                          </Link>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Expertise ─────────────────────────────── */}
        <section id="expertise" className="section section-alt">
          <div className="wrap">
            <SectionHead no="02" title="Expertise" kicker="Engineering fundamentals, applied on the line." />
            <div className="exp-cols">
              {(
                [
                  ["Foundations", expertise.foundations],
                  ["Applications", expertise.applications],
                ] as const
              ).map(([label, items]) => (
                <div key={label}>
                  <h3 className="col-label">{label}</h3>
                  <ul className="tiles">
                    {items.map((t, i) => (
                      <li key={t.title} className="tile">
                        <span className="tile-no">{String(i + 1).padStart(2, "0")}</span>
                        <h4>{t.title}</h4>
                        <p>{t.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ─────────────────────────────── */}
        <section id="experience" className="section">
          <div className="wrap">
            <SectionHead no="03" title="Experience" kicker="Industry and academia, across four countries." />
            <ol className="timeline">
              {experience.map((r) => (
                <li key={r.role + r.period} className="tl-item">
                  <div className="tl-when">
                    <span className="meta">{r.period}</span>
                    <span className={`tag tag-${r.tag.toLowerCase()}`}>{r.tag}</span>
                  </div>
                  <article className="tl-card">
                    <h3>{r.role}</h3>
                    <p className="tl-org">
                      {r.org} <span className="meta">· {r.place}</span>
                    </p>
                    <ul>
                      {r.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    {r.journey && (
                      <Link className="tl-journey" href={`/journeys/${r.journey}/`}>
                        See photos from {r.place} →
                      </Link>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Field work ─────────────────────────────── */}
        <section id="fieldwork" className="section section-alt">
          <div className="wrap">
            <SectionHead no="04" title="Field Work" kicker="Industrial internships during undergraduate studies." />
            <ul className="cards">
              {internships.map((x) => (
                <li key={x.org} className="card">
                  <span className="meta">{x.period}</span>
                  <h3>{x.org}</h3>
                  <p>{x.focus}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Skills ─────────────────────────────── */}
        <section id="skills" className="section">
          <div className="wrap">
            <SectionHead no="05" title="Technical Skills" />
            <div className="skill-grid">
              {skills.map((g) => (
                <div key={g.group} className="panel">
                  <h3 className="panel-title">{g.group}</h3>
                  <ul className="chips">
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────── */}
        <section id="contact" className="section contact">
          <div className="wrap contact-inner">
            <SectionHead no="06" title="Let's work together" />
            <p className="lede">
              Looking for a production, quality or design engineer for a multinational team? I'd be glad to talk.
            </p>
            <ul className="contact-list">
              {[
                { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: GmailIcon },
                { label: "WhatsApp", value: profile.phone, href: profile.whatsapp, Icon: WhatsAppIcon, external: true },
                {
                  label: "LinkedIn",
                  value: (
                    <>
                      linkedin.com/in/
                      <wbr />
                      muhammad-ali1988
                    </>
                  ),
                  href: profile.linkedin,
                  Icon: LinkedInIcon,
                  external: true,
                },
                { label: "Location", value: profile.location, href: profile.maps, Icon: LocationIcon, external: true },
              ].map(({ label, value, href, Icon, external }) => (
                <li key={label}>
                  <a
                    className="contact-item"
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <span className="contact-icon">
                      <Icon size={26} />
                    </span>
                    <span className="contact-text">
                      <span className="meta">{label}</span>
                      <span className="contact-value">{value}</span>
                    </span>
                    <span className="contact-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
    </>
  );
}
