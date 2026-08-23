"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Heart, Maximize2, MapPin } from "lucide-react";
import { formatPrice, type Property } from "@/lib/data";
import { useSavedProperties } from "@/hooks/use-saved-properties";

export default function PropertyCard({ property }: { property: Property }) {
  const { savedIds, toggleSaved } = useSavedProperties();
  const saved = savedIds.includes(property.id);

  return (
    <article className="property-card">
      <div className="property-image">
        <Link href={`/property/${property.id}`} aria-label={`View ${property.name}`}>
          <Image
            src={property.image}
            alt={`Illustrative view of ${property.name}`}
            fill
            priority={property.id === "1"}
            sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        </Link>
        <span className="fictional-badge">Illustrative listing</span>
        <button
          type="button"
          className={saved ? "save-button is-saved" : "save-button"}
          onClick={() => toggleSaved(property.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${property.name} from saved homes` : `Save ${property.name}`}
        >
          <Heart fill={saved ? "currentColor" : "none"} aria-hidden="true" size={19} />
        </button>
      </div>
      <div className="property-content">
        <div className="property-price-row">
          <p className="property-price">{formatPrice(property.price)}</p>
          <span>{property.type}</span>
        </div>
        <h3>
          <Link href={`/property/${property.id}`}>{property.name}</Link>
        </h3>
        <p className="property-location">
          <MapPin aria-hidden="true" size={15} /> {property.location}
        </p>
        <p className="property-summary">{property.summary}</p>
        <div className="property-specs" aria-label="Property details">
          <span><BedDouble aria-hidden="true" size={16} /> {property.bedrooms} beds</span>
          <span><Bath aria-hidden="true" size={16} /> {property.bathrooms} baths</span>
          <span><Maximize2 aria-hidden="true" size={16} /> {property.sqft.toLocaleString()} sq ft</span>
        </div>
      </div>
    </article>
  );
}
