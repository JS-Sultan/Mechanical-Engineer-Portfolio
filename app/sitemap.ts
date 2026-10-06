import type { MetadataRoute } from "next";
import { journeys } from "@/data/journeys";
import { siteUrl } from "@/data/profile";

export const dynamic = "force-static";

const pages = [
  { path: "/", priority: 1 },
  { path: "/projects/", priority: 0.8 },
  { path: "/projects/thesis/", priority: 0.8 },
  { path: "/journeys/", priority: 0.7 },
  ...journeys.map((j) => ({ path: `/journeys/${j.slug}/`, priority: 0.6 })),
  { path: "/interests/", priority: 0.6 },
  { path: "/videos/", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${siteUrl}${p.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
