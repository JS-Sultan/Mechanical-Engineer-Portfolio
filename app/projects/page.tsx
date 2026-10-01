import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { upcoming } from "@/data/profile";

const page = upcoming.projects;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.description,
  alternates: { canonical: "/projects/" },
  openGraph: { title: page.seoTitle, description: page.description, url: "/projects/" },
};

export default function ProjectsPage() {
  return <ComingSoon no={page.no} title={page.title} message={page.message} variant="projects" />;
}
