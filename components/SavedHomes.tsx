"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import DemoNotice from "./DemoNotice";
import PropertyCard from "./PropertyCard";
import { properties } from "@/lib/data";
import { useSavedProperties } from "@/hooks/use-saved-properties";

export default function SavedHomes() {
  const { savedIds, ready } = useSavedProperties();
  const saved = properties.filter((property) => savedIds.includes(property.id));

  return (
    <main>
      <section className="page-hero compact-hero">
        <div className="shell">
          <p className="eyebrow">Your shortlist</p>
          <h1>Saved homes</h1>
          <p className="page-intro">Keep an illustrative shortlist on this device while you compare the details.</p>
          <DemoNotice compact />
        </div>
      </section>
      <section className="section shell">
        {!ready ? (
          <div className="loading-card" aria-live="polite">Loading your shortlist…</div>
        ) : saved.length ? (
          <div className="property-grid">{saved.map((property) => <PropertyCard key={property.id} property={property} />)}</div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon"><Heart aria-hidden="true" /></span>
            <h2>Your shortlist is empty</h2>
            <p>Use the heart on any illustrative home to keep it here. Saved homes stay only in this browser.</p>
            <Link href="/" className="button button-dark">Discover homes</Link>
          </div>
        )}
      </section>
    </main>
  );
}
