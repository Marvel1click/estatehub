export type PropertyType = "House" | "Apartment" | "Cottage";

export interface Property {
  id: string;
  name: string;
  location: string;
  region: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: PropertyType;
  image: string;
  accent: string;
  summary: string;
  description: string;
  features: string[];
  map: { x: number; y: number };
}

export interface Agent {
  id: string;
  name: string;
  initials: string;
  area: string;
  focus: string;
  note: string;
  color: string;
}

export const properties: Property[] = [
  {
    id: "1",
    name: "Alder House",
    location: "Canonbury, London",
    region: "London",
    price: 1350000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2190,
    type: "House",
    image: "/images/alder-house.jpg",
    accent: "#a45232",
    summary: "A composed Georgian-inspired home shaped around light, storage and an easy garden connection.",
    description: "This illustrative London home pairs period proportions with a calm, practical interior plan. The fictional listing is designed to demonstrate how EstateHub presents the details people need before arranging a conversation.",
    features: ["South-facing garden", "Flexible study", "Utility room", "Cycle storage"],
    map: { x: 67, y: 43 },
  },
  {
    id: "2",
    name: "Tideglass House",
    location: "St Ives, Cornwall",
    region: "South West",
    price: 975000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1840,
    type: "House",
    image: "/images/tideglass-house.jpg",
    accent: "#5d7469",
    summary: "A restrained coastal home with sea views, sheltered terraces and durable natural materials.",
    description: "Set above an illustrative stretch of Cornish coast, Tideglass House is a fictional example of a design-led home. Its details and price are sample data for exploring the interface only.",
    features: ["Coastal outlook", "Sheltered terrace", "Boot room", "Air-source heating"],
    map: { x: 22, y: 78 },
  },
  {
    id: "3",
    name: "Foundry Loft",
    location: "Ancoats, Manchester",
    region: "North West",
    price: 525000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1260,
    type: "Apartment",
    image: "/images/foundry-loft.jpg",
    accent: "#8a684f",
    summary: "A warm warehouse conversion with generous windows and a quietly zoned open-plan interior.",
    description: "Foundry Loft is an illustrative city listing created for the EstateHub demo. It balances original brick and steel with contemporary joinery, without representing real available inventory.",
    features: ["Warehouse windows", "Lift access", "Secure cycle store", "Resident courtyard"],
    map: { x: 48, y: 28 },
  },
  {
    id: "4",
    name: "Orchard Cottage",
    location: "Minchinhampton, Gloucestershire",
    region: "South West",
    price: 795000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1610,
    type: "Cottage",
    image: "/images/orchard-cottage.jpg",
    accent: "#667047",
    summary: "A characterful stone cottage with a small orchard garden and thoughtfully updated rooms.",
    description: "This fictional Cotswold cottage demonstrates a rural listing journey. The location context, price and features are illustrative and should not be used for real property decisions.",
    features: ["Orchard garden", "Wood-burning stove", "Garden studio", "Village-edge setting"],
    map: { x: 43, y: 58 },
  },
];

export const agents: Agent[] = [
  {
    id: "maya",
    name: "Maya Reed",
    initials: "MR",
    area: "North & East London",
    focus: "Period homes and careful renovations",
    note: "A fictional guide profile used to demonstrate the introduction flow.",
    color: "#b65f42",
  },
  {
    id: "theo",
    name: "Theo Grant",
    initials: "TG",
    area: "Manchester & Cheshire",
    focus: "City homes and adaptive reuse",
    note: "A fictional guide profile used to demonstrate the introduction flow.",
    color: "#526a63",
  },
  {
    id: "imogen",
    name: "Imogen Hart",
    initials: "IH",
    area: "Cotswolds & South West",
    focus: "Rural homes and coastal moves",
    note: "A fictional guide profile used to demonstrate the introduction flow.",
    color: "#8d704f",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);

export const getProperty = (id: string) => properties.find((property) => property.id === id);
