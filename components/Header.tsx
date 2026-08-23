"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Discover" },
  { href: "/agents", label: "Local guides" },
  { href: "/mortgage", label: "Mortgage planner" },
  { href: "/sell", label: "Value a home" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="EstateHub home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" role="img">
              <path d="M6 13.2 16 5l10 8.2V26H6Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
              <path d="M11 26V15h10v11M11 20h10" fill="none" stroke="currentColor" strokeWidth="2.2" />
            </svg>
          </span>
          <span>EstateHub</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <Link href="/favorites" className="saved-link">
            <Heart size={17} aria-hidden="true" />
            <span>Saved</span>
          </Link>
          <Link href="/login" className="button button-dark button-small desktop-signin">
            Demo sign in
          </Link>
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          <div className="shell">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/favorites">Saved homes</Link>
            <Link href="/login" className="button button-dark">
              Demo sign in
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
