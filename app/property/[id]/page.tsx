import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProperty, properties } from "@/lib/data";
import PropertyDetail from "./PropertyDetail";

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) return { title: "Illustrative home not found" };
  return {
    title: property.name,
    description: `${property.summary} Fictional EstateHub listing for interface demonstration only.`,
    openGraph: { images: [{ url: property.image, width: 1800, height: 1200 }] },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();
  return <PropertyDetail property={property} />;
}
