import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { upcoming } from "@/data/profile";

const page = upcoming.interests;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.description,
  alternates: { canonical: "/interests/" },
  openGraph: { title: page.seoTitle, description: page.description, url: "/interests/" },
};

export default function InterestsPage() {
  return <ComingSoon no={page.no} title={page.title} message={page.message} variant="interests" />;
}
