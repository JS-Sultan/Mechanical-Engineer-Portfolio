// Line icons for the Expertise tiles, drawn in the site's technical-drawing style.
// Stroke uses currentColor so they follow the section accent and dark mode.
import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  thermo: (
    <>
      <path d="M9 13.6V5a2.5 2.5 0 0 1 5 0v8.6a4.5 4.5 0 1 1-5 0z" />
      <path d="M11.5 9v7.6" />
      <circle cx="11.5" cy="17" r="1.7" fill="currentColor" stroke="none" />
      <path d="M17.6 5.5c.9.9.9 1.8 0 2.7s-.9 1.8 0 2.7M20.4 5.5c.9.9.9 1.8 0 2.7s-.9 1.8 0 2.7" />
    </>
  ),
  design: (
    <>
      <path d="M12 2.5 19 6.3v7.6L12 17.7l-7-3.8V6.3z" />
      <path d="M5 6.3 12 10.1l7-3.8M12 10.1v7.6" />
      <path d="M5 21h14M5 19.8v2.4M19 19.8v2.4" strokeWidth="1.2" />
    </>
  ),
  quality: (
    <>
      <path d="M12 2.8 19 5.8v5.6c0 4.3-3 7.8-7 9.8-4-2-7-5.5-7-9.8V5.8z" />
      <path d="m8.7 12.2 2.3 2.3 4.4-4.7" />
    </>
  ),
  materials: (
    <>
      <path d="M5.5 8.5h3l1.5 2h4l1.5-2h3v7h-3l-1.5-2h-4l-1.5 2h-3z" />
      <path d="M11 10.5v3M13 10.5v3" strokeWidth="1.1" />
      <path d="M1.5 12h2.5M2.7 10.8 1.5 12l1.2 1.2M20 12h2.5M21.3 10.8 22.5 12l-1.2 1.2" strokeWidth="1.3" />
    </>
  ),
  production: (
    <>
      <path d="M3 20.5V11l5 3v-3l5 3V5.5h5v15z" />
      <path d="M2 20.5h20M13 5.5V3.5h2v2" />
      <path d="M6.5 17.5h1.5M10.5 17.5H12M15 17.5h1.5" />
    </>
  ),
  improve: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 3.6v4h-4" />
      <path d="m7.8 14.6 2.7-2.7 2 2 3.4-3.6" />
      <path d="M13.7 10.3h2.2v2.2" strokeWidth="1.3" />
    </>
  ),
  safety: (
    <>
      <path d="M4.5 15.5V14a7.5 7.5 0 0 1 15 0v1.5" />
      <path d="M10 15.5V8.2a2 2 0 0 1 4 0v7.3" />
      <path d="M2.8 15.5h18.4a1 1 0 0 1 1 1v.6a1 1 0 0 1-1 1H2.8a1 1 0 0 1-1-1v-.6a1 1 0 0 1 1-1z" />
    </>
  ),
  education: (
    <>
      <path d="M3 4h18v12H3z" />
      <path d="m8 21 4-5 4 5" />
      <path d="m7 12.5 3-3 2.2 2.2L16.5 7.5" />
      <path d="M2 4h20" />
    </>
  ),
};

export default function ExpertiseIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
