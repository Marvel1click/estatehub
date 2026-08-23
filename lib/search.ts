import type { Property, PropertyType } from "./data";

export interface PropertyFilters {
  query: string;
  type: "All" | PropertyType;
  minBedrooms: number;
  maxPrice: number;
  sort: "recommended" | "price-asc" | "price-desc";
}

export const defaultFilters: PropertyFilters = {
  query: "",
  type: "All",
  minBedrooms: 0,
  maxPrice: 1500000,
  sort: "recommended",
};

export function filterProperties(items: Property[], filters: PropertyFilters) {
  const query = filters.query.trim().toLowerCase();
  const filtered = items.filter((property) => {
    const matchesQuery =
      !query || `${property.name} ${property.location} ${property.region}`.toLowerCase().includes(query);
    const matchesType = filters.type === "All" || property.type === filters.type;
    return matchesQuery && matchesType && property.bedrooms >= filters.minBedrooms && property.price <= filters.maxPrice;
  });

  if (filters.sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
  return filtered;
}
