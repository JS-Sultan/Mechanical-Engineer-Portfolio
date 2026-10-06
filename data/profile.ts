// All portfolio content lives here. Edit this file to update the site.

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://js-sultan.github.io/Mechanical-Engineer-Portfolio").replace(/\/$/, "");
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const profile = {
  name: "Muhammad Ali",
  initials: "MA",
  title: "Mechanical Engineer",
  tagline: "Production Supervision · Quality Control · CAD Design",
  location: "Lahore, Pakistan",
  email: "engineerali658@gmail.com",
  phone: "+92 313 4390156",
  linkedin: "https://www.linkedin.com/in/muhammad-ali1988",
  whatsapp: "https://wa.me/923134390156",
  // Web3Forms access key (public by design). Without it the contact form falls back to opening the visitor's mail app.
  contactFormKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
  maps: "https://www.google.com/maps/search/?api=1&query=Lahore%2C%20Pakistan",
  resume: `${basePath}/Muhammad-Ali-Resume.pdf`,
  portrait: {
    src: `${basePath}/portrait.webp`, // 800×800
    small: `${basePath}/portrait-sm.webp`, // 400×400
    og: "/portrait-og.jpg", // social-share image, resolved against the site URL
  },
  summary: [
    "Muhammad Ali is a Mechanical Engineer with a Master's in Power Engineering & Engineering Thermophysics from Xi'an Jiaotong University and more than seven years of combined experience across industrial production supervision, quality control, and engineering education.",
    "His work spans four countries (the Netherlands, Bahrain, China, and Pakistan), where he has supervised production operations, enforced quality and safety standards, and improved process efficiency. He designs with AutoCAD, SolidWorks, and Autodesk Inventor, and has trained the next generation of technologists through hands-on, project-based teaching.",
    "He is seeking a production, quality, or design engineering role in a multinational organization.",
  ],
  interests: [
    "Production Supervision",
    "Quality Control & ISO Compliance",
    "Process Improvement",
    "Mechanical Design (CAD)",
    "Thermodynamics & Power Engineering",
  ],
};

export const education = [
  {
    degree: "M.Sc. Power Engineering & Engineering Thermophysics",
    school: "Xi'an Jiaotong University, China",
    years: "2019 – 2021",
    grade: "CGPA 3.63 / 4.0",
    journey: "china",
    thesis: "/projects/thesis/",
  },
  {
    degree: "B.Sc. Mechanical Technology",
    school: "University of Lahore",
    years: "2013 – 2017",
    grade: "CGPA 3.84 / 4.0",
  },
  {
    degree: "DAE Mechanical Technology",
    school: "PBTE Lahore",
    years: "2010",
    grade: "",
  },
];

export const stats = [
  { value: "7+", label: "Years of experience" },
  { value: "4", label: "Countries worked in" },
  { value: "80%+", label: "Process-efficiency gain in QC" },
  { value: "60%", label: "Improvement in student results" },
];

export const expertise = {
  foundations: [
    { icon: "thermo", title: "Thermodynamics", text: "Power engineering and engineering thermophysics at postgraduate level." },
    { icon: "design", title: "Mechanical Design", text: "Part and assembly modelling in AutoCAD, SolidWorks and Inventor." },
    { icon: "quality", title: "Quality Systems", text: "QC systems, ISO compliance and root-cause analysis." },
    { icon: "materials", title: "Materials Testing", text: "Material testing and failure investigation in the field." },
  ],
  applications: [
    { icon: "production", title: "Production", text: "Line supervision, scheduling and workforce coordination." },
    { icon: "improve", title: "Process Improvement", text: "Removing waste and complaints from manufacturing flows." },
    { icon: "safety", title: "Health & Safety", text: "Hygiene, workplace-safety and regulatory standards." },
    { icon: "education", title: "Engineering Education", text: "Lectures, design projects and technical competitions." },
  ],
};

export type Role = {
  role: string;
  org: string;
  place: string;
  period: string;
  tag: "Industry" | "Academia";
  points: string[];
  journey?: string; // slug of a related page under /journeys/
};

export const experience: Role[] = [
  {
    role: "Visiting Instructor",
    org: "Government College of Technology",
    place: "Lahore, Pakistan",
    period: "Aug 2025 – May 2026",
    tag: "Academia",
    points: [
      "Delivered mechanical engineering lectures and supervised final-year design projects.",
      "Drove project-based learning that strengthened students' practical and technical skills.",
      "Guided students into industrial projects and technical competitions.",
    ],
  },
  {
    role: "Production Supervisor",
    org: "Hilton Foods",
    place: "Zaandam, Netherlands",
    period: "May 2024 – Dec 2025",
    tag: "Industry",
    journey: "netherlands",
    points: [
      "Supervised daily production operations and workforce activities across the line, keeping output on schedule.",
      "Enforced quality, hygiene, and workplace-safety standards in line with company and regulatory requirements.",
      "Trained and coached production staff, improving team efficiency and operational consistency.",
    ],
  },
  {
    role: "Visiting Lecturer",
    org: "Government College of Technology",
    place: "Lahore, Pakistan",
    period: "Aug 2021 – May 2023",
    tag: "Academia",
    points: [
      "Delivered mechanical engineering lectures and supervised final-year design projects.",
      "Drove project-based learning that strengthened students' practical and technical skills.",
      "Guided students into industrial projects and technical competitions.",
    ],
  },
  {
    role: "Mechanical Instructor",
    org: "Lahore Polytechnic Institute",
    place: "Lahore, Pakistan",
    period: "Dec 2017 – Sep 2019",
    tag: "Academia",
    points: [
      "Improved student results by 60% through innovative, hands-on teaching methods.",
      "Organized technical competitions and training activities to raise engagement.",
    ],
  },
  {
    role: "Quality Control Supervisor",
    org: "Manama Packaging Industry",
    place: "Bahrain",
    period: "Aug 2011 – Sep 2013",
    tag: "Industry",
    journey: "bahrain",
    points: [
      "Managed QC systems and ISO compliance across packaging production.",
      "Cut customer complaints and improved process efficiency by over 80% through stronger quality-control processes.",
    ],
  },
];

export const internships = [
  {
    org: "Pakistan Engineering Company",
    period: "Jun – Jul 2017",
    focus: "Process improvement and production optimization.",
  },
  {
    org: "Pakistan Railways",
    period: "Jun – Jul 2016",
    focus: "Material testing and root-cause analysis.",
  },
];

export const skills = [
  { group: "Design & CAD", items: ["AutoCAD", "SolidWorks", "Autodesk Inventor"] },
  {
    group: "Production & Quality",
    items: ["Production Management", "Quality Control", "ISO Compliance", "Process Improvement", "Health & Safety", "Inventory Management"],
  },
  { group: "Software & Other", items: ["MS Office", "Teaching & Training", "Project Supervision", "Workforce Training"] },
];

// Links starting with "/#" jump to a section on the home page; the others are separate pages.
export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects/", label: "Projects & Awards" },
  { href: "/journeys/", label: "Journeys" },
  { href: "/interests/", label: "Interests" },
  { href: "/videos/", label: "Videos" },
  { href: "/#contact", label: "Contact" },
];

// Placeholder pages. When material is ready, replace the page's <ComingSoon /> with real content.
export const upcoming = {
  interests: {
    no: "P-02",
    title: "Hobbies & Interests",
    seoTitle: "Hobbies & Interests",
    description: "Hobbies and interests of Muhammad Ali, Mechanical Engineer, beyond the shop floor and the classroom.",
    message: "A look at life beyond the shop floor and the classroom is on its way.",
  },
};
