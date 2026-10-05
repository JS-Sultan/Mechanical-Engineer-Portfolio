// Supervised projects and awards shown on the Projects page.
// Media lives in public/projects/; image sizes come from data/media/projects.json.
import type { Photo } from "./journeys";
import { basePath } from "./profile";
import media from "./media/projects.json";

const dir = `${basePath}/projects`;

export type Clip = { src: string; poster: string; w: number; h: number; label: string };

const clip = (name: string, w: number, h: number, label: string): Clip => ({
  src: `${dir}/${name}.mp4`,
  poster: `${dir}/${name}.webp`,
  w,
  h,
  label,
});

const image = (file: string, alt: string): Photo => {
  const m = media.find((x) => x.file === file);
  if (!m) throw new Error(`Missing project image "${file}"`);
  return { src: `${dir}/${file}.webp`, thumb: `${dir}/${file}-sm.webp`, w: m.w, h: m.h, alt };
};

export const featured = {
  title: "Hybrid Electric Bike",
  role: "Project supervisor",
  context: "Final-year student project · Government College of Technology, Railway Road, Lahore",
  year: "2023",
  award: {
    title: "1st Position, Student Project Competition",
    event: "ICECE-2023, 6th International Conference on Energy Conservation and Efficiency",
    host: "Centre of Energy Research & Development, UET Lahore",
    date: "15–16 March 2023",
    prize: "Rs 25,000 cash prize",
  },
  summary: [
    "A petrol motorcycle converted into a hybrid electric bike by DAE students I supervised at the Government College of Technology, Lahore. The hybrid drive combines electric propulsion with the original engine to cut fuel use.",
    "The team reported a range of about 100 km on one litre of fuel, at a conversion cost of around PKR 80,000, an affordable route to cleaner commuting. The project took first place among student projects at ICECE-2023 at UET Lahore, was presented at the TEVTA Skills Project Competition 2023 (regional level), and was featured in the news.",
  ],
  figures: [
    { value: "1st", label: "Student projects, ICECE-2023" },
    { value: "~100 km", label: "per litre of fuel (reported)" },
    { value: "~PKR 80k", label: "conversion cost (reported)" },
  ],
  photo: image("icece-2023-team", "The Hybrid Electric Bike team with the ICECE-2023 Student Project Competition 1st Position board"),
  clip: clip("hybrid-bike-competition", 480, 480, "The Hybrid Electric Bike at the TEVTA Skills Project Competition 2023"),
  newsVideoId: "X1qIVxcZSLs",
};

export const projects = [
  {
    title: "Water Jet Propulsion",
    summary:
      "A water-jet propulsion model: a pump draws water in and expels it as a high-velocity jet, demonstrating thrust by Newton's third law, the same principle used in jet boats and some submarines.",
    tags: ["Fluid mechanics", "Propulsion", "Pumps"],
    clip: clip("water-jet-propulsion", 352, 640, "Water jet propulsion model producing thrust in a water tank"),
  },
  {
    title: "Cam & Follower Step Lifter",
    summary:
      "A cam-and-follower mechanism converts the motor's rotation into the reciprocating motion of stepped plates, lifting a bottle up the staircase one step at a time, as in the classic step feeders used in automated handling.",
    tags: ["Mechanisms", "Cam design", "Automation"],
    clip: clip("cam-and-follower", 352, 640, "Cam and follower step lifter moving a bottle up the steps"),
  },
  {
    title: "Roller Conveyor",
    summary:
      "A motorised roller conveyor that moves loads along a line of driven rollers. Conveyors like this are the backbone of material handling in packaging and production lines.",
    tags: ["Material handling", "Drives", "Production"],
    clip: clip("roller-conveyor", 352, 640, "Roller conveyor carrying a sack along driven rollers"),
  },
];

export const awards = [
  {
    date: "Mar 2023",
    title: "1st Position, ICECE-2023 Student Project Competition",
    detail: "As supervisor of the Hybrid Electric Bike team · Centre of Energy R&D, UET Lahore · Rs 25,000 prize",
  },
  {
    date: "2023",
    title: "TEVTA Skills Project Competition 2023 (Regional Level)",
    detail: "Hybrid Electric Bike presented by the GCT Railway Road team",
  },
  {
    date: "Jul 2021",
    title: "Merit Member, XJTU Silk Road Summer Camp",
    detail: "University Alliance of the Silk Road Summer Camp, Xi'an Jiaotong University",
  },
  {
    date: "Jan 2021",
    title: "Excellent Student, XJTU Winter Camp of the Silk Road",
    detail: "“Cloud catches the Times, Innovation drives the future” · Xi'an Jiaotong University",
  },
];

export const awardPhotos: Photo[] = [
  image("tevta-certificate-ceremony", "Receiving a certificate at the TEVTA Centre of Excellence, Lahore"),
  image("icece-2023-team", "With the Hybrid Electric Bike team after winning 1st position at ICECE-2023"),
  image("xjtu-excellent-student-2021", "Excellent Student certificate, XJTU Winter Camp of the Silk Road, January 2021"),
  image("xjtu-merit-member-2021", "Merit Member certificate, XJTU Silk Road Summer Camp, July 2021"),
];
