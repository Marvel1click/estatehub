
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    images: string[];
    type: string;
    featured: boolean;
    daysOnMarket: number;
    yearBuilt?: number;
    parkingSpaces?: number;
    description?: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

const images = property.images || [];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const pricePerSqft = Math.round(property.price / property.sqft);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <div className="relative h-56 bg-gray-100">
          <img
            src={images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
          
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <i className="ri-image-line w-8 h-8 flex items-center justify-center text-gray-400"></i>
            </div>
          )}
        </div>
        
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {property.featured && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
              <i className="ri-star-line w-3 h-3 flex items-center justify-center mr-1"></i>
              Featured
            </div>
          )}
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
            {property.daysOnMarket} days on market
          </div>
        </div>

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-md cursor-pointer"
          >
            <i className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'} w-5 h-5 flex items-center justify-center`}></i>
          </button>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-md cursor-pointer"
          >
            <i className="ri-arrow-left-s-line w-5 h-5 flex items-center justify-center"></i>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-md cursor-pointer"
          >
            <i className="ri-arrow-right-s-line w-5 h-5 flex items-center justify-center"></i>
          </button>
        </div>

        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              £{property.price.toLocaleString()}
            </h3>
            <p className="text-sm font-medium text-gray-500">£{pricePerSqft}/sqft</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
              {property.type}
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-3 font-medium">{property.location}</p>
        
        <div className="flex items-center space-x-5 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <i className="ri-hotel-bed-line w-4 h-4 flex items-center justify-center mr-1.5 text-gray-500"></i>
            <span className="font-medium">{property.bedrooms}</span>
            <span className="ml-1">bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <i className="ri-drop-line w-4 h-4 flex items-center justify-center mr-1.5 text-gray-500"></i>
            <span className="font-medium">{property.bathrooms}</span>
            <span className="ml-1">bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <i className="ri-ruler-line w-4 h-4 flex items-center justify-center mr-1.5 text-gray-500"></i>
            <span className="font-medium">{property.sqft.toLocaleString()}</span>
            <span className="ml-1">sqft</span>
          </div>
        </div>

        {property.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>
        )}

        <div className="flex items-center space-x-3">
          <Link
            href={`/property/${property.id}`}
            className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center cursor-pointer whitespace-nowrap font-medium"
          >
            View Details
          </Link>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
          </button>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-message-line w-4 h-4 flex items-center justify-center"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
