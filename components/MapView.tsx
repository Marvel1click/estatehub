
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MapViewProps {
  properties: any[];
  onPropertySelect: (property: any) => void;
  selectedProperty?: any;
}

export default function MapView({ properties, onPropertySelect, selectedProperty }: MapViewProps) {
  const [hoveredProperty, setHoveredProperty] = useState<any>(null);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const handlePropertyClick = (property: any) => {
    onPropertySelect(property);
  };

  const handlePropertyHover = (property: any) => {
    setHoveredProperty(property);
  };

  return (
    <div className="relative h-full bg-gray-100 rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19800.123456789!2d-0.1277583!3d51.5073509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3333333333%3A0xabcdefabcdefabcd!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1699123456789!5m2!1sen!2suk"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button 
          onClick={() => setShowAllProperties(!showAllProperties)}
          className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          title="Toggle property list"
        >
          <i className="ri-list-unordered w-5 h-5 flex items-center justify-center text-gray-700"></i>
        </button>
        <button className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <i className="ri-zoom-in-line w-5 h-5 flex items-center justify-center text-gray-700"></i>
        </button>
        <button className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <i className="ri-zoom-out-line w-5 h-5 flex items-center justify-center text-gray-700"></i>
        </button>
        <button className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <i className="ri-focus-3-line w-5 h-5 flex items-center justify-center text-gray-700"></i>
        </button>
      </div>

      {/* Property Count & Filter Info */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-4 max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {properties.length}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {properties.length > 0 ? 
            `$${Math.min(...properties.map(p => p.price)).toLocaleString()} - $${Math.max(...properties.map(p => p.price)).toLocaleString()}` :
            'No properties found'
          }
        </p>
      </div>

      {/* Selected Property Info */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-start space-x-3">
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="w-16 h-16 object-cover rounded-lg object-top"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">{selectedProperty.title}</h4>
              <p className="text-lg font-bold text-blue-600">${selectedProperty.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 truncate">{selectedProperty.location}</p>
              <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                <span>{selectedProperty.bedrooms} bed</span>
                <span>{selectedProperty.bathrooms} bath</span>
                <span>{selectedProperty.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <Link
              href={`/property/${selectedProperty.id}`}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-center cursor-pointer whitespace-nowrap text-sm font-medium"
            >
              View Details
            </Link>
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      )}

      {/* Property List Sidebar */}
      {showAllProperties && (
        <div className="absolute top-4 right-20 bottom-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Properties</h3>
              <button 
                onClick={() => setShowAllProperties(false)}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
              >
                <i className="ri-close-line w-5 h-5 flex items-center justify-center text-gray-500"></i>
              </button>
            </div>
          </div>
          
          <div className="h-full overflow-y-auto">
            <div className="p-2 space-y-2">
              {properties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => handlePropertyClick(property)}
                  onMouseEnter={() => handlePropertyHover(property)}
                  onMouseLeave={() => setHoveredProperty(null)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedProperty?.id === property.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : hoveredProperty?.id === property.id
                      ? 'bg-gray-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-12 h-12 object-cover rounded object-top"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate">{property.title}</h4>
                      <p className="text-sm font-semibold text-blue-600">${property.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 truncate">{property.location}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <span>{property.bedrooms}bd</span>
                        <span>{property.bathrooms}ba</span>
                        <span>{property.sqft.toLocaleString()}sqft</span>
                      </div>
                    </div>
                    {property.featured && (
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Property Markers (simulated) */}
      <div className="absolute inset-0 pointer-events-none">
        {properties.slice(0, 6).map((property, index) => (
          <div
            key={property.id}
            className={`absolute w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transform transition-all duration-200 pointer-events-auto cursor-pointer ${
              selectedProperty?.id === property.id ? 'scale-125 bg-blue-700' : 'hover:scale-110'
            }`}
            style={{
              left: `${20 + (index * 12)}%`,
              top: `${30 + (index * 8)}%`,
            }}
            onClick={() => handlePropertyClick(property)}
          >
            ${Math.round(property.price / 1000)}k
          </div>
        ))}
      </div>
    </div>
  );
}
