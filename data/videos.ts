// Videos shown on the Videos page. Files live in public/videos/ as <slug>.mp4 + <slug>.webp (poster).
import { basePath } from "./profile";

export type Video = {
  slug: string;
  title: string;
  description: string;
  venue: string;
  date: string; // ISO date, used for display and search-engine data
  duration: number; // seconds
  fullLength?: string; // set when the clip is a highlight from a longer recording
  journey?: string; // related /journeys/<slug>/ page
};

export const videos: Video[] = [
  {
    slug: "xjtu-lecture-2020",
    title: "Spray Cooling — Research Presentation",
    description:
      "Presenting research on spray cooling and heated-surface heat transfer to faculty and classmates during my M.Sc. in Power Engineering & Engineering Thermophysics.",
    venue: "Xi'an Jiaotong University, China",
    date: "2020-01-02",
    duration: 53,
    fullLength: "12 min",
    journey: "china",
  },
  {
    slug: "steam-power-plant-2019",
    title: "Steam Power Plants — Seminar Presentation",
    description: "A seminar presentation on steam power plants: how they work, their main components and operating principles.",
    venue: "Xi'an Jiaotong University, China",
    date: "2019-10-23",
    duration: 53,
    fullLength: "10 min",
    journey: "china",
  },
];

export const videoSrc = (v: Video) => `${basePath}/videos/${v.slug}.mp4`;
export const videoPoster = (v: Video) => `${basePath}/videos/${v.slug}.webp`;

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
