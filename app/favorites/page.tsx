'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import PropertyCard from '@/components/PropertyCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: 750000,
      location: 'Downtown Manhattan, NY',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      type: 'apartment',
      featured: true,
      daysOnMarket: 5,
      images: ['https://readdy.ai/api/search-image?query=Modern%20luxury%20apartment%20interior%20with%20floor-to-ceiling%20windows%20overlooking%20city%20skyline%2C%20contemporary%20furniture%2C%20hardwood%20floors%2C%20open%20concept%20living%20space%2C%20neutral%20color%20palette%2C%20natural%20lighting%2C%20minimalist%20design%2C%20urban%20living%20at%20its%20finest&width=400&height=300&seq=1&orientation=landscape'],
      addedToFavorites: '2 days ago'
    },
    {
      id: '3',
      title: 'Luxury Penthouse Suite',
      price: 2500000,
      location: 'Upper East Side, NY',
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2200,
      type: 'condo',
      featured: true,
      daysOnMarket: 8,
      images: ['https://readdy.ai/api/search-image?query=Luxury%20penthouse%20interior%20with%20panoramic%20city%20views%2C%20marble%20countertops%2C%20high-end%20appliances%2C%20spacious%20living%20room%2C%20elegant%20furnishings%2C%20floor-to-ceiling%20windows%2C%20sophisticated%20design%2C%20premium%20finishes%2C%20modern%20luxury%20living&width=400&height=300&seq=3&orientation=landscape'],
      addedToFavorites: '5 days ago'
    },
    {
      id: '5',
      title: 'Waterfront Condo',
      price: 1800000,
      location: 'Battery Park City, NY',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1500,
      type: 'condo',
      featured: true,
      daysOnMarket: 3,
      images: ['https://readdy.ai/api/search-image?query=Stunning%20waterfront%20condominium%20with%20floor-to-ceiling%20windows%2C%20harbor%20views%2C%20modern%20interior%20design%2C%20open%20floor%20plan%2C%20high-end%20finishes%2C%20balcony%20overlooking%20water%2C%20contemporary%20furniture%2C%20luxury%20amenities%2C%20waterfront%20living&width=400&height=300&seq=5&orientation=landscape'],
      addedToFavorites: '1 week ago'
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(property => property.id !== id));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">Properties you've saved for later</p>
          </div>
          
          {favorites.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-heart-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8">Start browsing properties and save your favorites to view them here</p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-search-line w-5 h-5 flex items-center justify-center mr-2"></i>
              Browse Properties
            </a>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{favorites.length} properties saved</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer whitespace-nowrap ${
                      viewMode === 'grid' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <i className="ri-grid-line w-4 h-4 flex items-center justify-center mr-1 "></i>
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer whitespace-nowrap ${
                      viewMode === 'list' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <i className="ri-list-unordered w-4 h-4 flex items-center justify-center mr-1 "></i>
                    List
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {favorites.map((property) => (
                  <div key={property.id} className="relative">
                    <PropertyCard property={property} />
                    <button
                      onClick={() => removeFavorite(property.id)}
                      className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors cursor-pointer"
                    >
                      <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
                      Added {property.addedToFavorites}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-24 h-24 object-cover rounded-lg object-top"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{property.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Added {property.addedToFavorites}</span>
                            <button
                              onClick={() => removeFavorite(property.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                            >
                              <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{property.location}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{property.bedrooms} bed</span>
                            <span>{property.bathrooms} bath</span>
                            <span>{property.sqft.toLocaleString()} sqft</span>
                          </div>
                          <div className="text-xl font-bold text-blue-600">
                            ${property.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}