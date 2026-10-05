// Journeys: places lived, studied, worked and travelled.
// To add a trip: resize its photos to WebP in public/journeys/<slug>/ (full size + "-sm" thumbnail),
// list them in data/media/<slug>.json, import that manifest below, and add an entry to `journeys`.
import { basePath } from "./profile";
import bahrainMedia from "./media/bahrain.json";
import chinaMedia from "./media/china.json";

export type JourneyTag = "Study" | "Work" | "Tour";

// `video: true` entries are an .mp4 clip with a .webp poster frame of the same name.
type MediaFile = { file: string; w: number; h: number; video?: boolean };

export type Photo = { src: string; thumb: string; w: number; h: number; alt: string; video?: string };

export type Journey = {
  slug: string;
  place: string;
  country: string;
  tag: JourneyTag;
  period: string;
  summary: string;
  story: string[];
  links?: { label: string; href: string }[];
  cover: string;
  groups: { title: string; photos: Photo[] }[];
};

// Builds photo entries from a processed-media manifest; captions are keyed by file name.
function photos(slug: string, media: MediaFile[], captions: Record<string, string>): Photo[] {
  return Object.entries(captions).map(([file, alt]) => {
    const m = media.find((x) => x.file === file);
    if (!m) throw new Error(`Missing media file "${file}" for journey "${slug}"`);
    const dir = `${basePath}/journeys/${slug}`;
    return {
      src: `${dir}/${file}.webp`,
      thumb: `${dir}/${file}-sm.webp`,
      w: m.w,
      h: m.h,
      alt,
      ...(m.video && { video: `${dir}/${file}.mp4` }),
    };
  });
}

export const journeys: Journey[] = [
  {
    slug: "china",
    place: "Xi'an",
    country: "China",
    tag: "Study",
    period: "2019 – 2021",
    summary: "M.Sc. in Power Engineering & Engineering Thermophysics at Xi'an Jiaotong University.",
    story: [
      "In 2019 I moved to Xi'an for an M.Sc. in Power Engineering & Engineering Thermophysics at Xi'an Jiaotong University, one of China's leading engineering universities, graduating in 2021 with a CGPA of 3.63 / 4.0.",
      "Life in Xi'an went well beyond the lecture room: cycling races with an international team, cultural festivals, and weekends exploring one of China's ancient capitals — from the Terracotta Army to the city's lantern-lit waterfronts.",
    ],
    links: [
      { label: "M.Sc. Power Engineering & Engineering Thermophysics — Xi'an Jiaotong University", href: "/#about" },
      { label: "Watch my presentations from Xi'an Jiaotong University", href: "/videos/" },
    ],
    cover: `${basePath}/journeys/china/xian-university-china-sm.webp`,
    groups: [
      {
        title: "Campus life",
        photos: photos("china", chinaMedia, {
          "xian-university-china": "Xi'an Jiaotong University's main building reflected in the campus pool",
          "china-study-5": "With classmates in a lecture room at Xi'an Jiaotong University",
          "china-study-14": "On campus in front of the university's main building",
          "china-study-15": "With friends at a campus event",
          "china-study-13": "Celebrating with friends at a campus event",
        }),
      },
      {
        title: "Cycling",
        photos: photos("china", chinaMedia, {
          "china-study-8": "Lining up for a cycling race",
          "china-study-7": "In team kit before a cycling race",
          "china-study-6": "A group ride with international friends",
        }),
      },
      {
        title: "Exploring Xi'an",
        photos: photos("china", chinaMedia, {
          "china-study-2": "Among the Terracotta Army warriors",
          "china-study-17": "A walk through the courtyards of a historic Chinese-style mosque in Xi'an",
          "china-study-1": "By a lantern-lit pavilion at night",
          "china-study-10": "On the waterfront at night",
          "china-study-3": "At a scenic park below the mountains",
          "china-study-4": "Beside a fountain sculpture",
          "china-study-12": "In a red-pillared temple corridor",
        }),
      },
      {
        title: "Culture & food",
        photos: photos("china", chinaMedia, {
          "china-study-9": "With performers in traditional costume at a cultural show",
          "china-study-11": "With friends dressed in traditional Chinese cloaks",
          "china-study-16": "Steamed buns with chilli dipping sauce",
        }),
      },
    ],
  },
  {
    slug: "bahrain",
    place: "Manama",
    country: "Bahrain",
    tag: "Work",
    period: "Aug 2011 – Sep 2013",
    summary: "Two years as Quality Control Supervisor at Manama Packaging Industry — my first role abroad.",
    story: [
      "Bahrain was my first international posting. As Quality Control Supervisor at Manama Packaging Industry, I managed QC systems and ISO compliance across packaging production — from printed film rolls to finished packaging.",
      "Strengthening the quality-control process cut customer complaints and improved process efficiency by more than 80%. Outside the plant, evenings were spent along the seafront and getting to know a multicultural team.",
    ],
    links: [{ label: "Quality Control Supervisor — Manama Packaging Industry", href: "/#experience" }],
    cover: `${basePath}/journeys/bahrain/bahrain-work-5-sm.webp`,
    groups: [
      {
        title: "On the job",
        photos: photos("bahrain", bahrainMedia, {
          "bahrain-work-5": "On the production floor beside a film extrusion line at Manama Packaging",
          "bahrain-work-6": "With a colleague beside a printed film roll on the production line",
          "bahrain-work-1": "In the quality-control office, in front of shelves of printed packaging samples",
          "bahrain-work-4": "In hygiene gear before entering the production area",
          "bahrain-work-2": "In the quality-control office",
          "bahrain-work-3": "At the quality-control desk",
        }),
      },
      {
        title: "The team",
        photos: photos("bahrain", bahrainMedia, {
          "bahrain-group-2": "With the production team in uniforms and hairnets",
          "bahrain-group-3": "Team photo with production and quality-control staff",
          "bahrain-group-1": "With colleagues at Manama Packaging",
        }),
      },
      {
        title: "Off duty",
        photos: photos("bahrain", bahrainMedia, {
          "bahrain-outdoor-3": "Evening on the seafront",
          "bahrain-outdoor-4": "Sitting on the rocks by the sea",
          "bahrain-outdoor-1": "On the seaside promenade",
          "bahrain-outdoor-6": "An afternoon in the park",
          "bahrain-outdoor-2": "At a shopping mall fountain",
          "bahrain-outdoor-5": "Out at a food court",
        }),
      },
    ],
  },
];

// e.g. "16 photos · 1 video"
export function mediaSummary(j: Pick<Journey, "groups">): string {
  const all = j.groups.flatMap((g) => g.photos);
  const videos = all.filter((p) => p.video).length;
  const photoCount = all.length - videos;
  const parts = [`${photoCount} photo${photoCount === 1 ? "" : "s"}`];
  if (videos) parts.push(`${videos} video${videos === 1 ? "" : "s"}`);
  return parts.join(" · ");
}

export const journeyTags: JourneyTag[] = ["Study", "Work", "Tour"];

// Every country with photos in the travel archive; ones without a journey page yet show as "coming soon".
export const countriesVisited = ["Bahrain", "China", "Netherlands", "Belgium", "France", "Germany", "Spain", "Turkey", "Saudi Arabia"];
