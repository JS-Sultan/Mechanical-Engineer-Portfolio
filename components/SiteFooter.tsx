import { profile } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
