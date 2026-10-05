"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { nav, profile } from "@/data/profile";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => !href.startsWith("/#") && pathname.startsWith(href.replace(/\/$/, ""));

  const links = nav.map((n) => (
    <li key={n.href}>
      <Link
        href={n.href}
        className={isActive(n.href) ? "active" : undefined}
        aria-current={isActive(n.href) ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        {n.label}
      </Link>
    </li>
  ));

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header id="top" className="topbar">
        <div className="wrap topbar-inner">
          <Link href="/" className="brand" aria-label={`${profile.name}, home page`} onClick={() => setOpen(false)}>
            <span className="brand-mark">{profile.initials}</span>
            <span className="brand-name">{profile.name}</span>
          </Link>
          <nav aria-label="Primary" className="nav-desktop">
            <ul className="nav">
              {links}
              <li>
                <a href={profile.resume} className="nav-cv">
                  CV
                </a>
              </li>
            </ul>
          </nav>
          <a href={profile.resume} className="nav-cv nav-cv-mobile">
            CV
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={open ? "burger open" : "burger"} aria-hidden="true" />
          </button>
        </div>
        <nav id="mobile-menu" aria-label="Mobile" className={open ? "nav-mobile open" : "nav-mobile"} hidden={!open}>
          <ul className="wrap">{links}</ul>
        </nav>
      </header>
    </>
  );
}
