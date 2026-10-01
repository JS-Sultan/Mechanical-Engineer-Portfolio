import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";

export const dynamic = "force-static";

const pages = [
  { path: "/", priority: 1 },
  { path: "/projects/", priority: 0.8 },
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
