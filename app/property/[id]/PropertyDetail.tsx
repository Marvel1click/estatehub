"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Check,
  CheckCircle2,
  Heart,
  MapPin,
  Maximize2,
} from "lucide-react";
import { type FormEvent, useCallback, useState } from "react";
import DemoNotice from "@/components/DemoNotice";
import Modal from "@/components/Modal";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { formatPrice, type Property } from "@/lib/data";

export default function PropertyDetail({ property }: { property: Property }) {
  const { savedIds, toggleSaved } = useSavedProperties();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const saved = savedIds.includes(property.id);
  const close = useCallback(() => {
    setOpen(false);
    setSent(false);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="property-detail">
      <div className="shell">
        <div className="property-detail-top">
          <Link href="/" className="back-link"><ArrowLeft size={16} aria-hidden="true" /> Back to discovery</Link>
          <button
            type="button"
            className={saved ? "button button-dark button-small" : "button button-outline button-small"}
            onClick={() => toggleSaved(property.id)}
            aria-pressed={saved}
          >
            <Heart size={16} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
            {saved ? "Saved" : "Save home"}
          </button>
        </div>

        <div className="property-hero-image">
          <Image
            src={property.image}
            alt={`Illustrative view of ${property.name}`}
            fill
            priority
            sizes="(max-width: 1260px) 100vw, 1240px"
          />
          <span className="fictional-badge">Illustrative listing · not available</span>
        </div>

        <div className="property-detail-grid">
          <div>
            <div className="property-title-row">
              <div>
                <p className="eyebrow">{property.type}</p>
                <h1>{property.name}</h1>
                <p className="detail-location"><MapPin size={16} aria-hidden="true" /> {property.location}</p>
              </div>
              <p className="detail-price">{formatPrice(property.price)}</p>
            </div>

            <div className="detail-specs">
              <div><span>Bedrooms</span><strong><BedDouble size={18} aria-hidden="true" /> {property.bedrooms}</strong></div>
              <div><span>Bathrooms</span><strong><Bath size={18} aria-hidden="true" /> {property.bathrooms}</strong></div>
              <div><span>Internal area</span><strong><Maximize2 size={18} aria-hidden="true" /> {property.sqft.toLocaleString()} sq ft</strong></div>
            </div>

            <h2>About this illustrative home</h2>
            <p className="detail-description">{property.description}</p>
            <ul className="feature-list">
              {property.features.map((feature) => (
                <li key={feature}><CheckCircle2 size={17} aria-hidden="true" /> {feature}</li>
              ))}
            </ul>
          </div>

          <aside className="panel enquiry-card">
            <DemoNotice compact />
            <h2>Ask about the experience</h2>
            <p className="panel-copy">
              Preview how an enquiry would feel without contacting an agent, creating a lead or sending personal data.
            </p>
            <button type="button" className="button button-dark button-full" onClick={() => setOpen(true)}>
              Open demo enquiry
            </button>
            <Link href="/mortgage" className="button button-outline button-full">Model an example mortgage</Link>
          </aside>
        </div>
      </div>

      <Modal open={open} onClose={close} eyebrow="Client-side demo" title={sent ? "Enquiry complete" : `Ask about ${property.name}`}>
        {sent ? (
          <div className="success-state" aria-live="polite">
            <span className="success-icon"><Check aria-hidden="true" /></span>
            <h2>Nothing was sent.</h2>
            <p className="panel-copy">
              This finished confirmation state is illustrative. Your details stayed in the browser and will be
              discarded when the dialog closes.
            </p>
            <button type="button" className="button button-dark" onClick={close}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="panel-copy">Enter sample details to see the confirmation state. There is no backend.</p>
            <div className="form-grid">
              <label className="field"><span>Name</span><input name="name" autoComplete="name" required /></label>
              <label className="field"><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
              <label className="field span-two"><span>Message</span><textarea name="message" minLength={12} required defaultValue={`I would like to learn more about the ${property.name} demo.`} /></label>
            </div>
            <button type="submit" className="button button-dark button-full">Show confirmation</button>
            <p className="form-note">Demo only — this form makes no network request.</p>
          </form>
        )}
      </Modal>
    </main>
  );
}
