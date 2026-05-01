'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Properties' },
  { href: '/agents', label: 'Agents' },
  { href: '/mortgage', label: 'Mortgage' },
  { href: '/sell', label: 'Sell' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label="EstateHub home">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
              <i className="ri-building-4-line flex h-5 w-5 items-center justify-center text-xl"></i>
            </span>
            <span
              className="text-2xl font-semibold tracking-[-0.04em] text-slate-950"
              style={{ fontFamily: 'var(--font-pacifico)' }}
            >
              EstateHub
            </span>
          </Link>

          <nav className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/favorites"
              className="hidden h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 md:inline-flex"
            >
              <i className="ri-heart-line mr-2 flex h-4 w-4 items-center justify-center"></i>
              Favourites
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                  aria-label="Open account menu"
                >
                  <i className="ri-user-line flex h-5 w-5 items-center justify-center"></i>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/10">
                    <Link href="/profile" className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Profile
                    </Link>
                    <Link href="/saved" className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Saved Properties
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsLoggedIn(false)}
                      className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden h-11 items-center justify-center rounded-full bg-blue-700 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800 sm:inline-flex"
              >
                Sign In
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
              aria-label="Toggle mobile menu"
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} flex h-5 w-5 items-center justify-center text-xl`}></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="pb-5 md:hidden">
            <nav className="rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                  <i className="ri-arrow-right-up-line flex h-4 w-4 items-center justify-center text-slate-400"></i>
                </Link>
              ))}
              <Link
                href="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Favourites
                <i className="ri-heart-line flex h-4 w-4 items-center justify-center text-slate-400"></i>
              </Link>
              {!isLoggedIn && (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 flex h-12 items-center justify-center rounded-2xl bg-blue-700 px-4 text-sm font-semibold text-white"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
