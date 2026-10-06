// M.Sc. thesis summary. All figures are taken from the thesis (tables 4-1, 4-5, 6-1, 6-2 and chapter 7).
import type { Photo } from "./journeys";
import { basePath } from "./profile";
import media from "./media/thesis.json";

const img = (file: string, alt: string): Photo => {
  const m = media.find((x) => x.file === file);
  if (!m) throw new Error(`Missing thesis figure "${file}"`);
  const dir = `${basePath}/thesis`;
  return { src: `${dir}/${file}.webp`, thumb: `${dir}/${file}-sm.webp`, w: m.w, h: m.h, alt };
};

export const thesis = {
  title: "Design and Optimization of a Net‑Zero Energy Building", // non-breaking hyphen keeps "Net-Zero" together
  degree: "M.Eng., Power Engineering & Engineering Thermophysics",
  university: "Xi'an Jiaotong University",
  supervisor: "Prof. Haihu Liu",
  date: "May 2021",
  pages: 91,
  summary: [
    "Buildings consume roughly 40% of the world's energy, much of it from fossil fuels, so cutting their demand is one of the most direct ways to reduce CO₂ emissions. A net-zero energy building (NZEB) goes further: over a year it meets all of its own energy demand from on-site renewable sources, balancing what it imports from and exports to the grid.",
    "My thesis developed a practical design approach for reaching net-zero at the early design stage, using Building Information Modelling (BIM) tools and whole-building energy simulation, and applied it to an office building in Islamabad, Pakistan.",
  ],
  building: [
    ["Location", "Islamabad, Pakistan"],
    ["Building type", "Single-storey office, ≈10,000 m²"],
    ["Layout", "Two service cores, reception, four offices and a lobby"],
    ["Envelope (baseline)", "Walls U = 0.57 W/m²·K, roof U = 0.44 W/m²·K, 40% window-to-wall ratio (Pakistan Building Energy Code)"],
    ["Floor height", "3.5 m"],
    ["Weather data", "Local weather station: wind, solar radiation, humidity and temperature"],
  ] as [string, string][],
  stages: [
    {
      title: "Passive design",
      text: "Optimise orientation, walls, roof, windows, shading and the thermo-physical properties of the envelope, guided by Revit sun-path and solar studies.",
    },
    {
      title: "Active systems & controls",
      text: "Cut the demand of lighting, equipment and HVAC with efficient systems and controls, including stepped lighting control.",
    },
    {
      title: "On-site renewables",
      text: "Size and place the photovoltaic system for maximum yield, optimising its area, orientation and efficiency to cover the remaining demand.",
    },
  ],
  tools: ["Autodesk Revit", "Green Building Studio", "Autodesk Insight", "DesignBuilder", "EnergyPlus"],
  // DesignBuilder results, initial vs final simulation (kWh per year), table 6-2; pct = reduction as stated in the thesis
  results: [
    { label: "Cooling", before: 481076, after: 215548, pct: 55 },
    { label: "Lighting", before: 495600, after: 253110, pct: 49 },
    { label: "Fans", before: 466423, after: 94297, pct: 78 },
    { label: "Total energy", before: 1599435, after: 742937, pct: 53 },
  ],
  headline: [
    { value: "−53%", label: "total energy use" },
    { value: "−53%", label: "annual CO₂ emissions" },
    { value: "−55%", label: "cooling energy" },
    { value: "161 → 108", label: "kWh/m²·yr energy use intensity (Autodesk Insight)" },
  ],
  insight: "Autodesk Insight showed the energy use intensity falling from 161 to 108 kWh/m² per year (−33%) and operating cost falling by 61%.",
  findings: [
    "Lighting and cooling dominated the baseline demand, so they were the main optimisation targets.",
    "Both tool chains, Autodesk (Green Building Studio + Insight) and DesignBuilder (EnergyPlus), can carry a building from first simulation to optimised design. DesignBuilder was more flexible, because every element can be set to match the national energy code.",
    "Cooling remained the largest load after optimisation, pointing to further active and passive cooling measures.",
  ],
  future: [
    "Smart, sensor-controlled windows for natural ventilation and daylight",
    "Phase-change materials in walls and roofs to store and release heat",
    "Battery storage paired with the PV system",
    "Uncertainty analysis, and BIM tools linked with Python for more accurate design",
    "Retrofitting existing buildings, where the largest savings lie",
  ],
  figures: [
    img("building-model", "Revit model of the single-storey office building: service cores, offices, reception and lobby"),
    img("sun-path-summer", "Revit sun-path study for the summer months, used to position shading and PV"),
    img("sun-path-winter", "Revit sun-path study for the winter months"),
    img("wind-rose", "Annual wind rose for the Islamabad site from local weather-station data"),
    img("monthly-design-temperatures", "Monthly design temperature data for the site"),
  ],
};
