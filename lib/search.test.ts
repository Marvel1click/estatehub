import { describe, expect, it } from "vitest";
import { properties } from "./data";
import { defaultFilters, filterProperties } from "./search";

describe("filterProperties", () => {
  it("finds listings by region", () => {
    expect(filterProperties(properties, { ...defaultFilters, query: "Manchester" })).toHaveLength(1);
  });

  it("combines bedroom and price filters", () => {
    const results = filterProperties(properties, { ...defaultFilters, minBedrooms: 3, maxPrice: 900000 });
    expect(results.map((property) => property.id)).toEqual(["4"]);
  });

  it("sorts by ascending price", () => {
    const results = filterProperties(properties, { ...defaultFilters, sort: "price-asc" });
    expect(results[0].id).toBe("3");
  });
});
