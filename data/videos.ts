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
    title: "Spray Cooling: Research Presentation",
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
    title: "Steam Power Plants: Seminar Presentation",
    description: "A seminar presentation on steam power plants: how they work, their main components and operating principles.",
    venue: "Xi'an Jiaotong University, China",
    date: "2019-10-23",
    duration: 53,
    fullLength: "10 min",
    journey: "china",
  },
];

// Press coverage hosted on YouTube (embedded click-to-play, privacy-enhanced mode).
export type PressVideo = {
  id: string; // YouTube video id
  title: string;
  originalTitle: string;
  description: string;
  channel: string;
  channelUrl: string;
  date: string; // ISO upload date
  duration: number; // seconds
  vertical?: boolean; // YouTube Short (9:16)
  thumb: string;
};

export const press: PressVideo[] = [
  {
    id: "X1qIVxcZSLs",
    title: "Pakistan's First Hybrid Bike: News Report",
    originalTitle: "Pakistan's First Hybrid Bike | 100 KiloMeter In 1Litre Only In 80000 | Quwat News",
    description:
      "Quwat News reports on a hybrid motorcycle built by students of the Government College of Technology, Lahore. The report highlights 100 km on one litre of fuel, a conversion cost of about PKR 80,000, and a winning entry at a UET competition.",
    channel: "Quwat News",
    channelUrl: "https://www.youtube.com/@quwatnews340",
    date: "2023-09-19",
    duration: 765,
    thumb: "https://i.ytimg.com/vi/X1qIVxcZSLs/hqdefault.jpg",
  },
  {
    id: "f_rFIkiENbQ",
    title: "First Hybrid Bike in Pakistan (YouTube Short)",
    originalTitle: "Pakistan's First Hybrid Bike | 100 KiloMeter In 1Litre Only In 80000 | Quwat News",
    description: "A one-minute YouTube Short on the same hybrid motorcycle: 100 km on one litre.",
    channel: "Quwat News",
    channelUrl: "https://www.youtube.com/@quwatnews340",
    date: "2023-09-21",
    duration: 58,
    vertical: true,
    thumb: "https://i.ytimg.com/vi/f_rFIkiENbQ/hq2.jpg",
  },
];

export const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export const videoSrc =(v: Video) => `${basePath}/videos/${v.slug}.mp4`;
export const videoPoster = (v: Video) => `${basePath}/videos/${v.slug}.webp`;

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
