import type { MetadataRoute } from "next";
import { properties } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://estatehub-3xnl.onrender.com";
  const routes = ["", "/agents", "/favorites", "/mortgage", "/sell", "/login"];
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date("2026-08-23") })),
    ...properties.map((property) => ({
      url: `${baseUrl}/property/${property.id}`,
      lastModified: new Date("2026-08-23"),
    })),
  ];
}
