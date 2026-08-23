"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatPrice, type Property } from "@/lib/data";

interface MapViewProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MapView({ properties, selectedId, onSelect }: MapViewProps) {
  const selected = properties.find((property) => property.id === selectedId) ?? properties[0];

  if (!properties.length) {
    return <div className="map-empty">No pins to show for this search.</div>;
  }

  return (
    <div className="map-demo" aria-label="Illustrative map-style property view">
      <div className="map-label">Map-style demo · positions are illustrative</div>
      <div className="map-roads" aria-hidden="true" />
      {properties.map((property) => (
        <button
          key={property.id}
          type="button"
          className={selected?.id === property.id ? "map-pin is-active" : "map-pin"}
          style={{ left: `${property.map.x}%`, top: `${property.map.y}%` }}
          onClick={() => onSelect(property.id)}
          aria-label={`Select ${property.name}`}
        >
          <MapPin fill="currentColor" aria-hidden="true" size={23} />
        </button>
      ))}
      {selected && (
        <div className="map-card">
          <p className="eyebrow">{selected.type}</p>
          <h3>{selected.name}</h3>
          <p>{selected.location}</p>
          <strong>{formatPrice(selected.price)}</strong>
          <Link href={`/property/${selected.id}`}>View home</Link>
        </div>
      )}
    </div>
  );
}
