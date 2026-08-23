import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const explore = [
  ["/", "Discover homes"],
  ["/favorites", "Saved homes"],
  ["/agents", "Local guides"],
  ["/mortgage", "Mortgage planner"],
  ["/sell", "Value a home"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-lead">
          <div>
            <p className="eyebrow eyebrow-light">A clearer way to explore</p>
            <h2>Make a considered move.</h2>
          </div>
          <Link href="/" className="button button-light">
            Browse illustrative homes <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="footer-grid">
          <div>
            <Link href="/" className="brand brand-light" aria-label="EstateHub home">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <path d="M6 13.2 16 5l10 8.2V26H6Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  <path d="M11 26V15h10v11M11 20h10" fill="none" stroke="currentColor" strokeWidth="2.2" />
                </svg>
              </span>
              <span>EstateHub</span>
            </Link>
            <p className="footer-copy">
              A fictional UK property product demonstrating discovery, planning and enquiry journeys. No homes are
              available through this site.
            </p>
          </div>
          <div>
            <p className="footer-heading">Explore</p>
            <ul className="footer-links">
              {explore.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-heading">About this demo</p>
            <p className="footer-copy">
              All names, addresses, prices, profiles and calculations are illustrative. Forms are client-side and send
              no data.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 EstateHub demo</p>
          <a
            href="https://digitalmarvels.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="made-by"
          >
            Made by Digital Marvels <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
