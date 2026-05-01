'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import PropertyCard from '@/components/PropertyCard';
import MapView from '@/components/MapView';
import Footer from '@/components/Footer';
import Link from 'next/link';

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  featured: boolean;
  daysOnMarket: number;
  yearBuilt: number;
  parkingSpaces: number;
  description: string;
  coordinates: { lat: number; lng: number };
  images: string[];
};

const allProperties: Property[] = [
  {
    id: '1',
    title: 'Modern City Centre Apartment',
    price: 450000,
    location: 'Manchester City Centre, Manchester',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 950,
    type: 'apartment',
    featured: true,
    daysOnMarket: 5,
    yearBuilt: 2020,
    parkingSpaces: 1,
    description:
      'A sharply finished city apartment with floor-to-ceiling glazing, open-plan living, secure parking, and fast access to Manchester business districts.',
    coordinates: { lat: 53.4808, lng: -2.2426 },
    images: ['/property1-1.jpg', '/property1-2.jpg', '/property1-3.jpg', '/property1-4.jpg'],
  },
  {
    id: '2',
    title: 'Victorian Terraced House',
    price: 650000,
    location: 'Didsbury, Manchester',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1800,
    type: 'house',
    featured: false,
    daysOnMarket: 12,
    yearBuilt: 1895,
    parkingSpaces: 2,
    description:
      'A renovated period home with retained architectural detail, generous reception rooms, modern bathrooms, and a private garden in a prime village setting.',
    coordinates: { lat: 53.4167, lng: -2.2333 },
    images: ['/property2-1.jpg', '/property2-2.jpg', '/property2-3.jpg', '/property2-4.jpg'],
  },
  {
    id: '3',
    title: 'Luxury Penthouse Suite',
    price: 1200000,
    location: 'Canary Wharf, London',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1500,
    type: 'penthouse',
    featured: true,
    daysOnMarket: 8,
    yearBuilt: 2022,
    parkingSpaces: 2,
    description:
      'A high-spec penthouse with panoramic city views, private terrace, premium finishes, concierge support, and direct access to rooftop amenities.',
    coordinates: { lat: 51.5045, lng: -0.0197 },
    images: ['/property3-1.jpg', '/property3-2.jpg', '/property3-3.jpg', '/property3-4.jpg'],
  },
  {
    id: '4',
    title: 'Cotswolds Cottage',
    price: 485000,
    location: 'Chipping Campden, Gloucestershire',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    type: 'cottage',
    featured: false,
    daysOnMarket: 18,
    yearBuilt: 1920,
    parkingSpaces: 1,
    description:
      'A honey-stone cottage with original character, considered modern updates, mature planting, and a quiet location close to village amenities.',
    coordinates: { lat: 52.0406, lng: -1.7797 },
    images: ['/property4-1.jpg', '/property4-2.jpg', '/property4-3.jpg', '/property4-4.jpg'],
  },
  {
    id: '5',
    title: 'Waterfront Apartment',
    price: 825000,
    location: 'Salford Quays, Manchester',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    type: 'apartment',
    featured: true,
    daysOnMarket: 3,
    yearBuilt: 2019,
    parkingSpaces: 1,
    description:
      'A refined waterfront apartment with canal views, concierge, fitness facilities, secure parking, and immediate access to MediaCity and the quays.',
    coordinates: { lat: 53.4719, lng: -2.2906 },
    images: ['/property5-1.jpg', '/property5-2.jpg', '/property5-3.jpg', '/property5-4.jpg'],
  },
  {
    id: '6',
    title: 'Converted Warehouse Loft',
    price: 375000,
    location: 'Shoreditch, London',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    type: 'apartment',
    featured: false,
    daysOnMarket: 25,
    yearBuilt: 1925,
    parkingSpaces: 0,
    description:
      'An industrial loft with exposed brickwork, high ceilings, large windows, and a flexible plan designed for creative city living.',
    coordinates: { lat: 51.5244, lng: -0.0787 },
    images: ['/property6-1.jpg', '/property6-2.jpg', '/property6-3.jpg', '/property6-4.jpg'],
  },
];

const marketHighlights = [
  { label: 'Verified UK listings', value: '1,240+' },
  { label: 'Average agent response', value: '48 min' },
  { label: 'Local market reports', value: '32' },
];

const advisoryCards = [
  {
    title: 'Market-ready guidance',
    description: 'Pricing context, days-on-market signals, and agent advice before you book a viewing.',
    icon: 'ri-line-chart-line',
  },
  {
    title: 'Mortgage clarity',
    description: 'Compare deposit scenarios and monthly affordability without leaving the search journey.',
    icon: 'ri-bank-card-line',
  },
  {
    title: 'Trusted local agents',
    description: 'Shortlist specialists by area, property type, and response speed when you are ready to move.',
    icon: 'ri-user-star-line',
  },
];

export default function Home() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [quickLocation, setQuickLocation] = useState('');
  const [quickType, setQuickType] = useState('');

  const featuredProperties = useMemo(
    () => allProperties.filter((property) => property.featured).slice(0, 3),
    []
  );

  const averagePrice = filteredProperties.length
    ? Math.round(filteredProperties.reduce((total, property) => total + property.price, 0) / filteredProperties.length)
    : 0;

  const handleFiltersChange = (filters: any) => {
    setIsLoading(true);

    setTimeout(() => {
      let filtered = [...allProperties];

      if (filters.location) {
        filtered = filtered.filter((property) =>
          property.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.priceMin) {
        const minPrice = parseInt(filters.priceMin.replace(/[^0-9]/g, ''), 10);
        if (!Number.isNaN(minPrice)) {
          filtered = filtered.filter((property) => property.price >= minPrice);
        }
      }

      if (filters.priceMax) {
        const maxPrice = parseInt(filters.priceMax.replace(/[^0-9]/g, ''), 10);
        if (!Number.isNaN(maxPrice)) {
          filtered = filtered.filter((property) => property.price <= maxPrice);
        }
      }

      if (filters.bedrooms) {
        filtered = filtered.filter((property) => property.bedrooms >= parseInt(filters.bedrooms, 10));
      }

      if (filters.bathrooms) {
        filtered = filtered.filter((property) => property.bathrooms >= parseInt(filters.bathrooms, 10));
      }

      if (filters.propertyType) {
        filtered = filtered.filter((property) => property.type === filters.propertyType);
      }

      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'beds':
          filtered.sort((a, b) => b.bedrooms - a.bedrooms);
          break;
        case 'baths':
          filtered.sort((a, b) => b.bathrooms - a.bathrooms);
          break;
        case 'sqft':
          filtered.sort((a, b) => b.sqft - a.sqft);
          break;
        default:
          filtered.sort((a, b) => a.daysOnMarket - b.daysOnMarket);
      }

      setFilteredProperties(filtered);
      setSelectedProperty(filtered[0] ?? null);
      setIsLoading(false);
    }, 350);
  };

  const handleQuickSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFiltersChange({
      location: quickLocation,
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: quickType,
      sortBy: 'newest',
    });

    document.getElementById('featured-homes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-950">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 -z-10">
            <img
              src="/property3-1.jpg"
              alt=""
              className="h-full w-full object-cover object-center opacity-45"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,20,0.96)_0%,rgba(10,24,45,0.82)_42%,rgba(10,24,45,0.36)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f7f4ee] via-[#f7f4ee]/55 to-transparent" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-16 lg:pt-16">
            <div className="flex min-h-[540px] flex-col justify-center">
              <div className="max-w-3xl animate-fade-in-up">
                <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
                  Find property with sharper market insight
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Search verified homes across the UK, compare value, and connect with vetted local specialists.
                </p>
              </div>

              <form
                onSubmit={handleQuickSearch}
                className="mt-10 grid gap-3 rounded-[1.75rem] border border-white/15 bg-white p-3 text-slate-950 shadow-2xl shadow-slate-950/35 sm:grid-cols-[1.4fr_1fr_auto] sm:items-end"
              >
                <label className="block">
                  <span className="mb-2 block px-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Location
                  </span>
                  <span className="relative block">
                    <i className="ri-map-pin-line pointer-events-none absolute left-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-blue-700"></i>
                    <input
                      type="text"
                      value={quickLocation}
                      onChange={(event) => setQuickLocation(event.target.value)}
                      placeholder="City, area, or postcode"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block px-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Property type
                  </span>
                  <select
                    value={quickType}
                    onChange={(event) => setQuickType(event.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Any home</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="cottage">Cottage</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="inline-flex h-14 items-center justify-center rounded-2xl bg-blue-700 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  <i className="ri-search-line mr-2 flex h-5 w-5 items-center justify-center"></i>
                  Start your search
                </button>
              </form>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {marketHighlights.map((highlight, index) => (
                  <div
                    key={highlight.label}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur animate-fade-in-up"
                    style={{ animationDelay: `${120 + index * 80}ms` }}
                  >
                    <div className="text-2xl font-semibold tracking-[-0.02em]">{highlight.value}</div>
                    <div className="mt-1 text-sm text-slate-300">{highlight.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden items-end lg:flex">
              <div className="w-full animate-fade-in-up rounded-[2rem] border border-white/15 bg-white/12 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-md animation-delay-200">
                <div className="overflow-hidden rounded-[1.5rem] bg-white text-slate-950">
                  <div className="relative h-80">
                    <img
                      src={featuredProperties[0].images[0]}
                      alt={featuredProperties[0].title}
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/92 p-4 shadow-xl backdrop-blur">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-blue-700">Featured home</p>
                          <h2 className="mt-1 text-xl font-semibold">{featuredProperties[0].title}</h2>
                          <p className="mt-1 text-sm text-slate-600">{featuredProperties[0].location}</p>
                        </div>
                        <p className="text-xl font-semibold tracking-[-0.02em]">
                          £{featuredProperties[0].price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-slate-100">
                    <div className="p-4">
                      <div className="text-lg font-semibold">{featuredProperties[0].bedrooms}</div>
                      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Beds</div>
                    </div>
                    <div className="p-4">
                      <div className="text-lg font-semibold">{featuredProperties[0].bathrooms}</div>
                      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Baths</div>
                    </div>
                    <div className="p-4">
                      <div className="text-lg font-semibold">{featuredProperties[0].sqft.toLocaleString()}</div>
                      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Sq ft</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-3 lg:px-8">
            {advisoryCards.map((card) => (
              <div key={card.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e7f0ed] text-[#1f6f64]">
                  <i className={`${card.icon} flex h-5 w-5 items-center justify-center text-xl`}></i>
                </div>
                <div>
                  <h2 className="font-semibold tracking-[-0.01em] text-slate-950">{card.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="featured-homes" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Featured homes, filtered around your move
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Refine by location, budget, bedrooms, and property style. Every card keeps the decision details close to the image, price, and next step.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-medium text-slate-500">Average shown price</div>
              <div className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-950">
                {averagePrice ? `£${averagePrice.toLocaleString()}` : 'No matches'}
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <SearchFilters onFiltersChange={handleFiltersChange} />
            </aside>

            <div>
              <div className="mb-6 flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.01em] text-slate-950">
                    {isLoading ? 'Searching matching homes...' : `${filteredProperties.length} properties found`}
                  </p>
                  {filteredProperties.length > 0 && (
                    <p className="mt-1 text-sm text-slate-500">
                      £{Math.min(...filteredProperties.map((property) => property.price)).toLocaleString()} to £
                      {Math.max(...filteredProperties.map((property) => property.price)).toLocaleString()} across current matches
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${
                      viewMode === 'grid'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <i className="ri-grid-line mr-2 flex h-4 w-4 items-center justify-center"></i>
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('map')}
                    className={`inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${
                      viewMode === 'map'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <i className="ri-map-2-line mr-2 flex h-4 w-4 items-center justify-center"></i>
                    Map
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex min-h-[420px] items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-blue-100 border-t-blue-700"></div>
                    <p className="text-sm font-medium text-slate-600">Loading curated matches...</p>
                  </div>
                </div>
              ) : viewMode === 'grid' ? (
                filteredProperties.length === 0 ? (
                  <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-12 text-center">
                    <i className="ri-home-search-line mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl text-slate-500"></i>
                    <h3 className="mt-5 text-xl font-semibold text-slate-950">No homes match this search</h3>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                      Adjust the location, budget, or property type to widen the shortlist.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )
              ) : (
                <div className="h-[560px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:h-[720px]">
                  <MapView
                    properties={filteredProperties}
                    onPropertySelect={setSelectedProperty}
                    selectedProperty={selectedProperty}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                A search experience built for real decisions
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                EstateHub brings listings, valuation context, agent access, and mortgage planning into one polished flow so buyers and sellers can move with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sell"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Book a valuation
                </Link>
                <Link
                  href="/mortgage"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-950"
                >
                  Check mortgage options
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredProperties.map((property, index) => (
                <Link
                  key={property.id}
                  href={`/property/${property.id}`}
                  className={`group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[#f7f4ee] shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    index === 0 ? 'sm:row-span-2' : ''
                  }`}
                >
                  <div className={index === 0 ? 'h-72 sm:h-[22rem]' : 'h-44'}>
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-blue-700">£{property.price.toLocaleString()}</p>
                    <h3 className="mt-1 font-semibold text-slate-950">{property.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{property.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
