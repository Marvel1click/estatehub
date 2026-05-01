'use client';

import { useState } from 'react';

type FilterState = {
  location: string;
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  sortBy: string;
};

interface SearchFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

const initialFilters: FilterState = {
  location: '',
  priceMin: '',
  priceMax: '',
  bedrooms: '',
  bathrooms: '',
  propertyType: '',
  sortBy: 'newest',
};

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-4 focus:ring-blue-100';

const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500';

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onFiltersChange(initialFilters);
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <div className="border-b border-slate-100 bg-slate-950 p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.02em]">Advanced search</h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">Tune the shortlist around budget, space, and lifestyle.</p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <i className="ri-equalizer-2-line flex h-5 w-5 items-center justify-center text-xl"></i>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <label className={labelClass}>Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="City, neighbourhood, or postcode"
              value={filters.location}
              onChange={(event) => handleFilterChange('location', event.target.value)}
              className={`${inputClass} pr-11`}
            />
            <i className="ri-map-pin-line pointer-events-none absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-slate-400"></i>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Min price</label>
            <input
              type="text"
              placeholder="£0"
              value={filters.priceMin}
              onChange={(event) => handleFilterChange('priceMin', event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Max price</label>
            <input
              type="text"
              placeholder="Any"
              value={filters.priceMax}
              onChange={(event) => handleFilterChange('priceMax', event.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Bedrooms</label>
            <select
              value={filters.bedrooms}
              onChange={(event) => handleFilterChange('bedrooms', event.target.value)}
              className={inputClass}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Bathrooms</label>
            <select
              value={filters.bathrooms}
              onChange={(event) => handleFilterChange('bathrooms', event.target.value)}
              className={inputClass}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Property type</label>
          <select
            value={filters.propertyType}
            onChange={(event) => handleFilterChange('propertyType', event.target.value)}
            className={inputClass}
          >
            <option value="">All property types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="penthouse">Penthouse</option>
            <option value="cottage">Cottage</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Sort by</label>
          <select
            value={filters.sortBy}
            onChange={(event) => handleFilterChange('sortBy', event.target.value)}
            className={inputClass}
          >
            <option value="newest">Newest to market</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="beds">Most bedrooms</option>
            <option value="baths">Most bathrooms</option>
            <option value="sqft">Largest floor area</option>
          </select>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3 pt-1">
          <button
            type="button"
            onClick={() => onFiltersChange(filters)}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-blue-700 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Apply filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            aria-label="Reset filters"
          >
            <i className="ri-refresh-line flex h-5 w-5 items-center justify-center"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
