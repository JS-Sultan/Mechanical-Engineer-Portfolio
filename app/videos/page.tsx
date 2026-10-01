import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { upcoming } from "@/data/profile";

const page = upcoming.videos;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.description,
  alternates: { canonical: "/videos/" },
  openGraph: { title: page.seoTitle, description: page.description, url: "/videos/" },
};

export default function VideosPage() {
  return <ComingSoon no={page.no} title={page.title} message={page.message} variant="videos" />;
}
