'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Ready to move with better property intelligence?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Search homes, compare local value, and speak with the right specialist before you commit your next move.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href="/sell"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Book a valuation
            </Link>
            <Link
              href="/agents"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Find an agent
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950">
                <i className="ri-building-4-line flex h-5 w-5 items-center justify-center text-xl"></i>
              </span>
              <span className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-pacifico)' }}>
                EstateHub
              </span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              A UK property platform for buyers and sellers who want listings, valuation context, mortgage clarity, and vetted local expertise in one flow.
            </p>
            <div className="mt-6 flex gap-3">
              {['facebook', 'twitter-x', 'instagram', 'linkedin'].map((network) => (
                <a
                  key={network}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                  aria-label={network}
                >
                  <i className={`ri-${network}-fill flex h-4 w-4 items-center justify-center`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/" className="text-slate-400 transition hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-slate-400 transition hover:text-white">
                  Find an Agent
                </Link>
              </li>
              <li>
                <Link href="/mortgage" className="text-slate-400 transition hover:text-white">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-slate-400 transition hover:text-white">
                  Sell Your Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-slate-400 transition hover:text-white">
                  Favourites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Services</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#" className="text-slate-400 transition hover:text-white">
                  Property Valuation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition hover:text-white">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition hover:text-white">
                  Investment Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition hover:text-white">
                  Rental Management
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition hover:text-white">
                  Commercial Properties
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Contact</h3>
            <div className="mt-5 space-y-4 text-sm text-slate-400">
              <p className="flex gap-3">
                <i className="ri-map-pin-line mt-0.5 flex h-4 w-4 items-center justify-center text-blue-300"></i>
                123 High Street, London, UK
              </p>
              <p className="flex gap-3">
                <i className="ri-phone-line mt-0.5 flex h-4 w-4 items-center justify-center text-blue-300"></i>
                020 7123 4567
              </p>
              <p className="flex gap-3">
                <i className="ri-mail-line mt-0.5 flex h-4 w-4 items-center justify-center text-blue-300"></i>
                hello@estatehub.co.uk
              </p>
              <p className="flex gap-3">
                <i className="ri-time-line mt-0.5 flex h-4 w-4 items-center justify-center text-blue-300"></i>
                Mon - Fri: 9:00 - 18:00
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 EstateHub. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="transition hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
