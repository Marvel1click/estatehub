
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import PropertyCard from '@/components/PropertyCard';
import MapView from '@/components/MapView';
import Footer from '@/components/Footer';

export default function Home() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const allProperties = [
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
      description: 'This stunning modern apartment features floor-to-ceiling windows with breathtaking city views, high-end finishes throughout, and an open-concept living space perfect for entertaining.',
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
      description: 'Beautiful Victorian terraced house with original architectural details, spacious rooms, and a charming rear garden. Recently renovated with modern amenities while preserving historic charm.',
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
      description: 'Spectacular penthouse with panoramic city views, premium finishes, and exclusive amenities. Features a private terrace and access to building rooftop.',
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
      description: 'Charming stone cottage in the heart of the Cotswolds with original features, modern updates, and a beautiful private garden. Perfect for countryside living.',
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
      description: 'Stunning waterfront apartment with canal views, modern amenities, and access to waterfront parks. Building features concierge and fitness centre.',
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
      description: 'Industrial loft in trendy Shoreditch with exposed brick, high ceilings, and large windows. Perfect for creative professionals.',
      coordinates: { lat: 51.5244, lng: -0.0787 },
      images: ['/property6-1.jpg', '/property6-2.jpg', '/property6-3.jpg', '/property6-4.jpg'], 
    }
  ];

  useEffect(() => {
    setFilteredProperties(allProperties);
  }, []);

  const handleFiltersChange = (filters: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = allProperties;
      
      if (filters.location) {
        filtered = filtered.filter(property => 
          property.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.priceMin) {
        const minPrice = parseInt(filters.priceMin.replace(/[^0-9]/g, ''));
        filtered = filtered.filter(property => property.price >= minPrice);
      }
      
      if (filters.priceMax) {
        const maxPrice = parseInt(filters.priceMax.replace(/[^0-9]/g, ''));
        filtered = filtered.filter(property => property.price <= maxPrice);
      }
      
      if (filters.bedrooms) {
        filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms));
      }
      
      if (filters.bathrooms) {
        filtered = filtered.filter(property => property.bathrooms >= parseInt(filters.bathrooms));
      }
      
      if (filters.propertyType) {
        filtered = filtered.filter(property => property.type === filters.propertyType);
      }
      
      // Sort properties
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
      setIsLoading(false);
    }, 500);
  };

  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Home</h1>
          <p className="text-xl text-gray-600">Discover the perfect property from thousands of listings across the UK</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <SearchFilters onFiltersChange={handleFiltersChange} />
          </div>

          <div className="lg:w-3/4">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-900">
                  {isLoading ? 'Searching...' : `${filteredProperties.length} properties found`}
                </span>
                {filteredProperties.length > 0 && (
                  <span className="text-sm text-gray-500">
                    £{Math.min(...filteredProperties.map(p => p.price)).toLocaleString()} - £{Math.max(...filteredProperties.map(p => p.price)).toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <i className="ri-grid-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                    viewMode === 'map' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <i className="ri-map-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Map View
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading properties...</p>
                </div>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="space-y-6">
                    {filteredProperties.length === 0 ? (
                      <div className="text-center py-20">
                        <i className="ri-home-line w-16 h-16 flex items-center justify-center text-gray-400 mx-auto mb-4"></i>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No properties found</h3>
                        <p className="text-gray-600">Try adjusting your search filters to find more properties.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                          <PropertyCard key={property.id} property={property} />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-96 lg:h-[700px] rounded-lg overflow-hidden shadow-lg">
                    <MapView 
                      properties={filteredProperties} 
                      onPropertySelect={handlePropertySelect}
                      selectedProperty={selectedProperty}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
