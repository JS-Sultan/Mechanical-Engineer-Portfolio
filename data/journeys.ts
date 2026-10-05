// Journeys: places lived, studied, worked and travelled.
// To add a trip: resize its photos to WebP in public/journeys/<slug>/ (full size + "-sm" thumbnail),
// list them in data/media/<slug>.json, import that manifest below, and add an entry to `journeys`.
import { basePath } from "./profile";
import bahrainMedia from "./media/bahrain.json";
import chinaMedia from "./media/china.json";
import belgiumMedia from "./media/belgium.json";
import franceMedia from "./media/france.json";
import germanyMedia from "./media/germany.json";
import netherlandsMedia from "./media/netherlands.json";
import saudiMedia from "./media/saudi-arabia.json";
import spainMedia from "./media/spain.json";
import turkeyMedia from "./media/turkey.json";

export type JourneyTag = "Study" | "Work" | "Tour" | "Pilgrimage";

// `video: true` entries are an .mp4 clip with a .webp poster frame of the same name.
type MediaFile = { file: string; w: number; h: number; video?: boolean };

export type Photo = { src: string; thumb: string; w: number; h: number; alt: string; video?: string };

export type Journey = {
  slug: string;
  place: string;
  country: string;
  tag: JourneyTag;
  period?: string; // omitted when the date isn't known yet
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
    slug: "netherlands",
    place: "Zaandam",
    country: "Netherlands",
    tag: "Work",
    period: "May 2024 – Dec 2025",
    summary: "Production Supervisor at Hilton Foods in Zaandam — and weekends among windmills and canals.",
    story: [
      "In 2024 I moved to the Netherlands to work as a Production Supervisor at Hilton Foods in Zaandam, running daily line operations and enforcing quality, hygiene and safety standards in a European food-production plant.",
      "Zaandam sits on the doorstep of the Zaanse Schans windmills and a short train ride from Amsterdam, so days off were spent exploring canals, historic town squares and Dutch architecture.",
    ],
    links: [{ label: "Production Supervisor — Hilton Foods", href: "/#experience" }],
    cover: `${basePath}/journeys/netherlands/netherlands-1-sm.webp`,
    groups: [
      {
        title: "Zaandam & Zaanse Schans",
        photos: photos("netherlands", netherlandsMedia, {
          "netherlands-1": "At the Zaanse Schans windmills near Zaandam",
          "netherlands-12": "The Inntel Hotel in Zaandam, built from stacked traditional Zaan houses",
          "netherlands-11": "In front of Zaandam's stacked green-house architecture",
          "netherlands-10": "Green fields and Dutch houses on a sunny day",
        }),
      },
      {
        title: "Amsterdam",
        photos: photos("netherlands", netherlandsMedia, {
          "netherlands-4": "In front of Amsterdam Centraal Station",
          "netherlands-3": "On an Amsterdam canal bridge",
          "netherlands-7": "An Amsterdam canal at dusk",
          "netherlands-5": "At the National Monument on Dam Square",
          "netherlands-6": "In front of a graffiti wall",
          "netherlands-2": "Beside a bronze street sculpture",
          "netherlands-13": "Next to an Amsterdam tram on line 2 to Nieuw Sloten",
        }),
      },
      {
        title: "Dutch towns",
        photos: photos("netherlands", netherlandsMedia, {
          "netherlands-8": "Below an ornate historic building",
          "netherlands-9": "A historic town square with a clock tower",
        }),
      },
    ],
  },
  {
    slug: "france",
    place: "Paris",
    country: "France",
    tag: "Tour",
    period: "Summer 2024",
    summary: "Paris in its Olympic summer — the Eiffel Tower, the Arc de Triomphe and Montmartre.",
    story: [
      "Paris in the summer of its 2024 Olympic Games, with the Olympic rings hanging on the Eiffel Tower and Paris 2024 banners lining the Champs-Élysées — then up to Montmartre and the Sacré-Cœur.",
    ],
    cover: `${basePath}/journeys/france/france-2-sm.webp`,
    groups: [
      {
        title: "Paris",
        photos: photos("france", franceMedia, {
          "france-2": "Below the Eiffel Tower, decorated with the Olympic rings",
          "france-3": "At the Arc de Triomphe with Paris 2024 banners",
          "france-1": "Under the arch of the Arc de Triomphe",
          "france-4": "The Sacré-Cœur Basilica in Montmartre",
          "france-5": "The golden Joan of Arc statue on Place des Pyramides",
        }),
      },
    ],
  },
  {
    slug: "belgium",
    place: "Brussels",
    country: "Belgium",
    tag: "Tour",
    period: "Aug 2024",
    summary: "Brussels during the Flower Carpet — the Grand-Place, the cathedral and the Atomium.",
    story: [
      "Brussels at its most colourful: the Grand-Place covered by the Flower Carpet, the Gothic Cathedral of St. Michael and St. Gudula, the Cinquantenaire arch, and the Atomium.",
    ],
    cover: `${basePath}/journeys/belgium/belgium-6-sm.webp`,
    groups: [
      {
        title: "Brussels",
        photos: photos("belgium", belgiumMedia, {
          "belgium-6": "At the Flower Carpet on the Grand-Place",
          "belgium-5": "On the Grand-Place",
          "belgium-4": "A selfie on the Grand-Place",
          "belgium-8": "In front of the Atomium",
          "belgium-7": "The Cathedral of St. Michael and St. Gudula",
          "belgium-3": "At the Cinquantenaire arch",
          "belgium-2": "Beside a carved baroque pulpit inside a church",
          "belgium-1": "By a sculpted fountain and flower beds",
        }),
      },
    ],
  },
  {
    slug: "spain",
    place: "Barcelona & Costa Blanca",
    country: "Spain",
    tag: "Tour",
    summary: "Gaudí's Barcelona and the Mediterranean coast of Benidorm and Alicante.",
    story: [
      "From Barcelona's Sagrada Família, Arc de Triomf and the hill of Montjuïc, down to the Costa Blanca: Benidorm's skyline and beaches, and the flower-pot lanes of Alicante's old Santa Cruz quarter.",
    ],
    cover: `${basePath}/journeys/spain/spain-2-sm.webp`,
    groups: [
      {
        title: "Barcelona",
        photos: photos("spain", spainMedia, {
          "spain-7": "In front of the Sagrada Família",
          "spain-8": "The Arc de Triomf",
          "spain-11": "At the National Palace on Montjuïc",
          "spain-10": "The four columns of Montjuïc and the National Palace",
          "spain-13": "The view from Montjuïc over Plaça d'Espanya",
        }),
      },
      {
        title: "Benidorm & Alicante",
        photos: photos("spain", spainMedia, {
          "spain-2": "Benidorm's skyline across the bay",
          "spain-1": "On a seafront lookout above Benidorm",
          "spain-14": "By the Mediterranean with Benidorm in the distance",
          "spain-3": "On the beach at dusk",
          "spain-4": "The blue flower-pot lane in Alicante's Santa Cruz quarter",
          "spain-6": "A marina at sunset",
        }),
      },
      {
        title: "Along the way",
        photos: photos("spain", spainMedia, {
          "spain-9": "A rooftop view over a blue-tiled church dome",
          "spain-12": "Beside a stone church bell tower",
          "spain-5": "Among bronze statues in a town square",
        }),
      },
    ],
  },
  {
    slug: "turkey",
    place: "Istanbul",
    country: "Turkey",
    tag: "Tour",
    summary: "Istanbul's historic heart — the Blue Mosque and the Hagia Sophia.",
    story: [
      "A trip to Istanbul's historic Sultanahmet district, between the Blue Mosque and the Hagia Sophia, whose vast domed interior and calligraphy roundels are among the great works of Byzantine and Ottoman architecture.",
    ],
    cover: `${basePath}/journeys/turkey/turkey-8-sm.webp`,
    groups: [
      {
        title: "Istanbul",
        photos: photos("turkey", turkeyMedia, {
          "turkey-8": "The Hagia Sophia beyond the fountain in Sultanahmet Square",
          "turkey-7": "In Sultanahmet Square with the Hagia Sophia behind",
          "turkey-4": "Inside the Hagia Sophia, below the calligraphy roundels",
          "turkey-5": "Under the great dome of the Hagia Sophia",
          "turkey-2": "In the courtyard of the Blue Mosque",
          "turkey-3": "In front of the Blue Mosque",
          "turkey-6": "The Blue Mosque seen from Sultanahmet Park",
          "turkey-1": "A rooftop view over Istanbul",
        }),
      },
    ],
  },
  {
    slug: "germany",
    place: "Hamburg & Berlin",
    country: "Germany",
    tag: "Tour",
    summary: "Hamburg's canals and City Hall, and Berlin's landmarks from the Cathedral to the TV Tower.",
    story: [
      "A trip to two of Germany's great cities: Hamburg, with its canals, the Alster lake and the grand City Hall, and Berlin, from the Berlin Cathedral on Museum Island to the TV Tower on Alexanderplatz.",
    ],
    cover: `${basePath}/journeys/germany/germany-11-sm.webp`,
    groups: [
      {
        title: "Berlin",
        photos: photos("germany", germanyMedia, {
          "germany-11": "In front of the Berlin Cathedral",
          "germany-6": "At the entrance of the Berlin Cathedral",
          "germany-10": "St. Mary's Church and the TV Tower, Berlin",
          "germany-12": "The Berlin TV Tower on a clear day",
        }),
      },
      {
        title: "Hamburg",
        photos: photos("germany", germanyMedia, {
          "germany-4": "Hamburg City Hall seen across the canal",
          "germany-7": "By the Alster Arcades in Hamburg",
          "germany-5": "On the lakeshore beside a houseboat",
          "germany-1": "Above the river with hillside houses behind",
          "germany-2": "On a riverside walking path",
        }),
      },
      {
        title: "Around town",
        photos: photos("germany", germanyMedia, {
          "germany-13": "Between modern high-rise towers",
          "germany-8": "Outside a city shopping centre",
          "germany-3": "In a green park in spring",
        }),
      },
    ],
  },
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
  {
    slug: "saudi-arabia",
    place: "Makkah",
    country: "Saudi Arabia",
    tag: "Pilgrimage",
    summary: "Performing Umrah in Makkah — a journey of faith.",
    story: ["Performing Umrah in Makkah was a journey of faith, and one of the most meaningful I have made."],
    cover: `${basePath}/journeys/saudi-arabia/umrah-saudia-arabia-2-sm.webp`,
    groups: [
      {
        title: "Umrah",
        photos: photos("saudi-arabia", saudiMedia, {
          "umrah-saudia-arabia-1": "At the Masjid al-Haram in Makkah, with the Kaaba behind",
          "umrah-saudia-arabia-2": "On a rocky mountainside near Makkah",
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

export const journeyTags: JourneyTag[] = ["Study", "Work", "Tour", "Pilgrimage"];

// Every country with photos in the travel archive; ones without a journey page yet show as "coming soon".
export const countriesVisited = ["Bahrain", "China", "Netherlands", "Belgium", "France", "Germany", "Spain", "Turkey", "Saudi Arabia"];
