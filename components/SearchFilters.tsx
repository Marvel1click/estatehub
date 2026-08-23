"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import type { PropertyFilters } from "@/lib/search";

interface SearchFiltersProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onReset: () => void;
}

export default function SearchFilters({ filters, onChange, onReset }: SearchFiltersProps) {
  const update = <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <aside className="filters" aria-label="Filter illustrative listings">
      <div className="filters-heading">
        <span><SlidersHorizontal aria-hidden="true" size={18} /> Refine</span>
        <button type="button" onClick={onReset}><RotateCcw aria-hidden="true" size={14} /> Reset</button>
      </div>

      <label className="field">
        <span>Location or home</span>
        <div className="input-with-icon">
          <Search aria-hidden="true" size={17} />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => update("query", event.target.value)}
            placeholder="Try Manchester"
          />
        </div>
      </label>

      <label className="field">
        <span>Property type</span>
        <select value={filters.type} onChange={(event) => update("type", event.target.value as PropertyFilters["type"])}>
          <option value="All">All types</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Cottage">Cottage</option>
        </select>
      </label>

      <label className="field">
        <span>Minimum bedrooms</span>
        <select
          value={filters.minBedrooms}
          onChange={(event) => update("minBedrooms", Number(event.target.value))}
        >
          <option value={0}>Any</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
        </select>
      </label>

      <label className="field range-field">
        <span>Maximum price <strong>{filters.maxPrice >= 1500000 ? "£1.5m+" : `£${Math.round(filters.maxPrice / 1000)}k`}</strong></span>
        <input
          type="range"
          min={500000}
          max={1500000}
          step={25000}
          value={filters.maxPrice}
          onChange={(event) => update("maxPrice", Number(event.target.value))}
        />
      </label>
    </aside>
  );
}
