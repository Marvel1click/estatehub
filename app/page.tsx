"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  Grid2X2,
  Map,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import DemoNotice from "@/components/DemoNotice";
import MapView from "@/components/MapView";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import { properties } from "@/lib/data";
import { defaultFilters, filterProperties, type PropertyFilters } from "@/lib/search";

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [selectedId, setSelectedId] = useState<string | null>("1");
  const results = useMemo(() => filterProperties(properties, filters), [filters]);

  return (
    <main>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Property discovery, thoughtfully edited</p>
            <h1>A clearer way to find your place.</h1>
            <p className="page-intro">
              Explore a small, considered collection of illustrative UK homes—then compare, plan and save at your
              own pace.
            </p>
            <div className="hero-actions">
              <a href="#discover" className="button button-dark">
                Explore the collection <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link href="/sell" className="button button-outline">Try the valuation flow</Link>
            </div>
            <DemoNotice />
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <Image
                src="/images/alder-house.jpg"
                alt="Illustrative red-brick London townhouse"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 55vw"
              />
            </div>
            <div className="hero-caption">
              <div>
                <p>Featured illustrative home</p>
                <strong>Alder House · London</strong>
              </div>
              <Link href="/property/1">View details</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Demo principles">
        <div className="shell trust-grid">
          <div className="trust-item">
            <span className="trust-icon"><ShieldCheck size={20} aria-hidden="true" /></span>
            <div><strong>Transparent by design</strong><p>Sample content is labelled wherever it appears.</p></div>
          </div>
          <div className="trust-item">
            <span className="trust-icon"><BookOpenCheck size={20} aria-hidden="true" /></span>
            <div><strong>Details kept close</strong><p>Price, size and context stay easy to compare.</p></div>
          </div>
          <div className="trust-item">
            <span className="trust-icon"><Sparkles size={20} aria-hidden="true" /></span>
            <div><strong>Quietly useful</strong><p>No pop-ups, invented urgency or lead capture.</p></div>
          </div>
        </div>
      </section>

      <section id="discover" className="section shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">The illustrative collection</p>
            <h2>Homes with a point of view.</h2>
          </div>
          <p>
            Four fictional homes show how EstateHub handles very different moves—from city loft to coastal retreat.
          </p>
        </div>

        <div className="discover-layout">
          <SearchFilters filters={filters} onChange={setFilters} onReset={() => setFilters(defaultFilters)} />
          <div>
            <div className="results-toolbar">
              <p className="results-count">
                {results.length} {results.length === 1 ? "home" : "homes"} <span>in this demo</span>
              </p>
              <div className="toolbar-controls">
                <select
                  value={filters.sort}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, sort: event.target.value as PropertyFilters["sort"] }))
                  }
                  aria-label="Sort homes"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
                <div className="view-toggle" aria-label="View options">
                  <button
                    type="button"
                    className={view === "grid" ? "is-active" : ""}
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    aria-pressed={view === "grid"}
                  >
                    <Grid2X2 size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={view === "map" ? "is-active" : ""}
                    onClick={() => setView("map")}
                    aria-label="Map-style view"
                    aria-pressed={view === "map"}
                  >
                    <Map size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {results.length ? (
              view === "grid" ? (
                <div className="property-grid">
                  {results.map((property) => <PropertyCard key={property.id} property={property} />)}
                </div>
              ) : (
                <MapView properties={results} selectedId={selectedId} onSelect={setSelectedId} />
              )
            ) : (
              <div className="empty-state">
                <span className="empty-icon"><Grid2X2 aria-hidden="true" /></span>
                <h2>No illustrative homes match</h2>
                <p>Widen the price range or reset the filters to bring the full sample collection back.</p>
                <button type="button" className="button button-dark" onClick={() => setFilters(defaultFilters)}>
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="story-section section">
        <div className="shell story-grid">
          <div>
            <p className="eyebrow eyebrow-light">Plan with context</p>
            <h2>Useful tools, without the sales theatre.</h2>
            <p>
              EstateHub keeps the early thinking together. Save a home locally, model an illustrative mortgage and
              walk through a no-send valuation request.
            </p>
          </div>
          <div className="story-cards">
            <Link href="/mortgage" className="story-card">
              <Calculator aria-hidden="true" />
              <h3>Mortgage planner</h3>
              <p>Explore example repayments with a clear calculation disclaimer.</p>
            </Link>
            <Link href="/agents" className="story-card">
              <BookOpenCheck aria-hidden="true" />
              <h3>Local guides</h3>
              <p>See a transparent introduction flow using fictional profiles.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
