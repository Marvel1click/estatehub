'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    images: string[];
    type: string;
    featured: boolean;
    daysOnMarket: number;
    yearBuilt?: number;
    parkingSpaces?: number;
    description?: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = property.images || [];
  const activeImage = images[currentImageIndex] ?? images[0];
  const pricePerSqft = Math.round(property.price / property.sqft);

  const nextImage = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((previous) => (previous + 1) % images.length);
    }
  };

  const prevImage = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((previous) => (previous - 1 + images.length) % images.length);
    }
  };

  const toggleFavorite = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/60">
      <div className="relative overflow-hidden bg-slate-100">
        <div className="relative aspect-[4/3]">
          {activeImage ? (
            <img
              src={activeImage}
              alt={property.title}
              className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100">
              <i className="ri-image-line flex h-10 w-10 items-center justify-center text-3xl text-slate-400"></i>
            </div>
          )}
        </div>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {property.featured && (
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-lg shadow-slate-950/10">
              <i className="ri-star-line mr-1 flex h-3.5 w-3.5 items-center justify-center"></i>
              Featured
            </span>
          )}
          <span className="rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {property.daysOnMarket} days
          </span>
        </div>

        <button
          type="button"
          onClick={toggleFavorite}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg shadow-slate-950/10 transition hover:scale-105 hover:text-red-500"
          aria-label={isFavorite ? 'Remove from favourites' : 'Save to favourites'}
        >
          <i className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line'} flex h-5 w-5 items-center justify-center text-xl`}></i>
        </button>

        {images.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-0 right-0 opacity-0 transition group-hover:opacity-100">
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg transition hover:scale-105"
                aria-label="Previous property image"
              >
                <i className="ri-arrow-left-s-line flex h-5 w-5 items-center justify-center text-xl"></i>
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg transition hover:scale-105"
                aria-label="Next property image"
              >
                <i className="ri-arrow-right-s-line flex h-5 w-5 items-center justify-center text-xl"></i>
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition ${
                    index === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/65 hover:bg-white'
                  }`}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              £{property.price.toLocaleString()}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">£{pricePerSqft}/sq ft</p>
          </div>
          <span className="rounded-full bg-[#e7f0ed] px-3 py-1.5 text-xs font-semibold capitalize text-[#1f6f64]">
            {property.type}
          </span>
        </div>

        <h3 className="mt-4 line-clamp-1 text-lg font-semibold tracking-[-0.02em] text-slate-950">{property.title}</h3>
        <p className="mt-1 flex items-center text-sm font-medium text-slate-600">
          <i className="ri-map-pin-line mr-1.5 flex h-4 w-4 items-center justify-center text-slate-400"></i>
          <span className="line-clamp-1">{property.location}</span>
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2">
          <div className="rounded-xl bg-white p-3 text-center">
            <div className="text-sm font-semibold text-slate-950">{property.bedrooms}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Beds</div>
          </div>
          <div className="rounded-xl bg-white p-3 text-center">
            <div className="text-sm font-semibold text-slate-950">{property.bathrooms}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Baths</div>
          </div>
          <div className="rounded-xl bg-white p-3 text-center">
            <div className="text-sm font-semibold text-slate-950">{property.sqft.toLocaleString()}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Sq ft</div>
          </div>
        </div>

        {property.description && (
          <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">{property.description}</p>
        )}

        <div className="mt-5 flex items-center gap-2">
          <Link
            href={`/property/${property.id}`}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-800"
          >
            View home
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
            aria-label="Call agent"
          >
            <i className="ri-phone-line flex h-4 w-4 items-center justify-center"></i>
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
            aria-label="Message agent"
          >
            <i className="ri-message-3-line flex h-4 w-4 items-center justify-center"></i>
          </button>
        </div>
      </div>
    </article>
  );
}
