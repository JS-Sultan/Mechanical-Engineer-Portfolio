import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { profile, education, experience, siteUrl, skills } from "@/data/profile";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display", display: "swap" });

const description =
  "Muhammad Ali is a Mechanical Engineer with an M.Sc. in Power Engineering from Xi'an Jiaotong University and 7+ years in production supervision, quality control, ISO compliance and CAD design across the Netherlands, Bahrain, China and Pakistan.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl + "/"),
  title: {
    default: `${profile.name} | ${profile.title} | Production, Quality & CAD Design`,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [
    "Muhammad Ali",
    "Mechanical Engineer",
    "Production Supervisor",
    "Quality Control Engineer",
    "ISO Compliance",
    "SolidWorks",
    "AutoCAD",
    "Autodesk Inventor",
    "Power Engineering",
    "Xi'an Jiaotong University",
    "Lahore",
    "Pakistan",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `Portfolio of ${profile.name}`,
    title: `${profile.name} | ${profile.title}`,
    description,
    locale: "en_US",
    firstName: "Muhammad",
    lastName: "Ali",
    images: [{ url: profile.portrait.og, width: 800, height: 800, alt: `Portrait of ${profile.name}` }],
  },
  twitter: { card: "summary", title: `${profile.name} | ${profile.title}`, description, images: [profile.portrait.og] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d2238" },
  ],
};

// schema.org Person data so search engines can build a knowledge panel.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description,
  url: siteUrl,
  image: `${siteUrl}${profile.portrait.og}`,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  sameAs: [profile.linkedin],
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  hasOccupation: { "@type": "Occupation", name: profile.title, skills: skills.flatMap((s) => s.items).join(", ") },
  worksFor: { "@type": "Organization", name: experience[0].org },
  knowsAbout: profile.interests,
};

// Runs before paint so the saved theme never flashes.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
