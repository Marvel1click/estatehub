'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  daysOnMarket: number;
  yearBuilt: number;
  parkingSpaces: number;
  description: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  image?: string;
  featured: boolean;
}

interface MapViewProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  selectedProperty?: Property | null;
}

const getPropertyImage = (property: Property) => property.images?.[0] ?? property.image ?? '/property1-1.jpg';

export default function MapView({ properties, onPropertySelect, selectedProperty }: MapViewProps) {
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [showAllProperties, setShowAllProperties] = useState(false);

  return (
    <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-slate-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19800.123456789!2d-0.1277583!3d51.5073509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3333333333%3A0xabcdefabcdefabcd!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1699123456789!5m2!1sen!2suk"
        width="100%"
        height="100%"
        className="grayscale-[0.2] saturate-[0.85]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl shadow-slate-950/10 backdrop-blur">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-950">Map shortlist</h3>
            <p className="mt-1 text-sm text-slate-600">
              {properties.length > 0
                ? `£${Math.min(...properties.map((property) => property.price)).toLocaleString()} to £${Math.max(
                    ...properties.map((property) => property.price)
                  ).toLocaleString()}`
                : 'No properties found'}
            </p>
          </div>
          <span className="rounded-full bg-blue-700 px-3 py-1 text-sm font-semibold text-white">{properties.length}</span>
        </div>
      </div>

      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowAllProperties(!showAllProperties)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:text-slate-950"
          title="Toggle property list"
        >
          <i className="ri-list-unordered flex h-5 w-5 items-center justify-center text-xl"></i>
        </button>
        <button type="button" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5">
          <i className="ri-focus-3-line flex h-5 w-5 items-center justify-center text-xl"></i>
        </button>
      </div>

      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/70 bg-white/95 p-4 shadow-2xl shadow-slate-950/15 backdrop-blur md:right-auto md:max-w-md">
          <div className="flex items-start gap-4">
            <img
              src={getPropertyImage(selectedProperty)}
              alt={selectedProperty.title}
              className="h-20 w-20 rounded-2xl object-cover object-center"
            />
            <div className="min-w-0 flex-1">
              <h4 className="truncate font-semibold text-slate-950">{selectedProperty.title}</h4>
              <p className="mt-1 text-lg font-semibold text-blue-700">£{selectedProperty.price.toLocaleString()}</p>
              <p className="truncate text-sm text-slate-600">{selectedProperty.location}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                <span>{selectedProperty.bedrooms} bed</span>
                <span>{selectedProperty.bathrooms} bath</span>
                <span>{selectedProperty.sqft.toLocaleString()} sq ft</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/property/${selectedProperty.id}`}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              View home
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:text-slate-950"
              aria-label="Call agent"
            >
              <i className="ri-phone-line flex h-4 w-4 items-center justify-center"></i>
            </button>
          </div>
        </div>
      )}

      {showAllProperties && (
        <div className="absolute bottom-4 right-4 top-20 w-[calc(100%-2rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/15 sm:w-96">
          <div className="flex items-center justify-between border-b border-slate-100 p-4">
            <h3 className="text-base font-semibold text-slate-950">All properties</h3>
            <button
              type="button"
              onClick={() => setShowAllProperties(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 hover:text-slate-950"
              aria-label="Close property list"
            >
              <i className="ri-close-line flex h-5 w-5 items-center justify-center text-xl"></i>
            </button>
          </div>

          <div className="h-[calc(100%-4.5rem)] overflow-y-auto p-2">
            {properties.map((property) => (
              <button
                type="button"
                key={property.id}
                onClick={() => onPropertySelect(property)}
                onMouseEnter={() => setHoveredProperty(property)}
                onMouseLeave={() => setHoveredProperty(null)}
                className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                  selectedProperty?.id === property.id
                    ? 'bg-blue-50 ring-1 ring-blue-200'
                    : hoveredProperty?.id === property.id
                      ? 'bg-slate-50'
                      : 'hover:bg-slate-50'
                }`}
              >
                <img src={getPropertyImage(property)} alt={property.title} className="h-14 w-14 rounded-xl object-cover object-center" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-950">{property.title}</span>
                  <span className="mt-0.5 block text-sm font-semibold text-blue-700">£{property.price.toLocaleString()}</span>
                  <span className="block truncate text-xs text-slate-500">{property.location}</span>
                </span>
                {property.featured && <span className="rounded-full bg-[#e7f0ed] px-2 py-1 text-xs font-semibold text-[#1f6f64]">Featured</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        {properties.slice(0, 6).map((property, index) => (
          <button
            type="button"
            key={property.id}
            className={`pointer-events-auto absolute rounded-full px-3 py-2 text-xs font-bold text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 ${
              selectedProperty?.id === property.id ? 'bg-blue-800 ring-4 ring-blue-200' : 'bg-slate-950'
            }`}
            style={{
              left: `${18 + index * 12}%`,
              top: `${30 + index * 8}%`,
            }}
            onClick={() => onPropertySelect(property)}
          >
            £{Math.round(property.price / 1000)}k
          </button>
        ))}
      </div>
    </div>
  );
}
