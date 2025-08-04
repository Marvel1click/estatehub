
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PriceComparison from '@/components/PriceComparison';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface PropertyDetailProps {
  propertyId: string;
}

export default function PropertyDetail({ propertyId }: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      yearBuilt: 2020,
      parkingSpaces: 1,
      lotSize: 'N/A',
      serviceFees: 180,
      councilTax: 1400,
      images: ['/property1-1.jpg', '/property1-2.jpg', '/property1-3.jpg', '/property1-4.jpg'], 
      description: 'This stunning modern apartment features floor-to-ceiling windows with breathtaking city views, high-end finishes throughout, and an open-concept living space perfect for entertaining. The kitchen boasts premium appliances and quartz worktops, while the master suite includes a walk-in wardrobe and spa-like bathroom.',
      features: [
        'Floor-to-ceiling windows',
        'Engineered wood floors',
        'In-unit washing machine',
        'Central heating',
        'Dishwasher',
        'Integrated appliances',
        'Walk-in wardrobe',
        'Balcony',
        'Gym access',
        'Concierge',
        'Pet-friendly',
        'Secure parking'
      ],
      agent: {
        name: 'Sarah Johnson',
        title: 'Licensed Estate Agent',
        rating: 4.9,
        reviews: 127,
        phone: '020 7123 4567',
        email: 'sarah@estatehub.co.uk',
        languages: ['English', 'Spanish'],
        responseTime: 'Usually within 1 hour',
        image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait&width=80&height=80&seq=agent1&orientation=squarish'
      }
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
      yearBuilt: 1895,
      parkingSpaces: 2,
      lotSize: '0.15 acres',
      serviceFees: 0,
      councilTax: 2200,
      images: ['/property2-1.jpg', '/property2-2.jpg', '/property2-3.jpg', '/property2-4.jpg'], 
      description: 'Beautiful Victorian terraced house with original architectural details, spacious rooms, and a charming rear garden. Recently renovated with modern amenities while preserving historic charm. Features original hardwood floors, ceiling roses, and period features.',
      features: [
        'Original hardwood floors',
        'Ceiling roses',
        'Bay windows',
        'Open fireplace',
        'Fitted kitchen',
        'Modern bathrooms',
        'Private rear garden',
        'Driveway parking',
        'Cellar storage',
        'Period features',
        'High ceilings',
        'Double glazing'
      ],
      agent: {
        name: 'Michael Chen',
        title: 'Senior Property Specialist',
        rating: 4.8,
        reviews: 95,
        phone: '0161 234 5678',
        email: 'michael@estatehub.co.uk',
        languages: ['English', 'Mandarin'],
        responseTime: 'Usually within 2 hours',
        image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20male%20agent&width=300&height=300&seq=agent2&orientation=squarish',
      }
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
      yearBuilt: 2022,
      parkingSpaces: 2,
      lotSize: 'N/A',
      serviceFees: 450,
      councilTax: 3500,
      images: ['/property3-1.jpg', '/property3-2.jpg', '/property3-3.jpg', '/property3-4.jpg'], 
      description: 'Spectacular penthouse with panoramic city views, premium finishes, and exclusive amenities. Features a private terrace, marble worktops, and access to building rooftop. This is luxury living at its finest with every detail carefully curated.',
      features: [
        'Panoramic city views',
        'Private terrace',
        'Marble worktops',
        'Premium appliances',
        'Smart home technology',
        'Wine storage',
        'Rooftop access',
        'Concierge service',
        'Valet parking',
        'Fitness centre',
        'Pool access',
        'Storage unit'
      ],
      agent: {
        name: 'Emily Rodriguez',
        title: 'Luxury Property Specialist',
        rating: 4.9,
        reviews: 203,
        phone: '020 7345 6789',
        email: 'emily@estatehub.co.uk',
        languages: ['English', 'Spanish', 'French'],
        responseTime: 'Usually within 30 minutes',
        image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20female%20agent&width=300&height=300&seq=agent3&orientation=squarish',
      }
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
      yearBuilt: 1920,
      parkingSpaces: 1,
      lotSize: '0.25 acres',
      serviceFees: 0,
      councilTax: 1800,
      images: ['/property4-1.jpg', '/property4-2.jpg', '/property4-3.jpg', '/property4-4.jpg'], 
      description: 'Charming stone cottage in the heart of the Cotswolds with original features, modern updates, and a beautiful private garden. Perfect for countryside living with the convenience of village amenities.',
      features: [
        'Honey-coloured stone',
        'Private garden',
        'Exposed stone walls',
        'Fitted kitchen',
        'Flagstone floors',
        'Inglenook fireplace',
        'Mature gardens',
        'Storage outbuildings',
        'Quiet lane',
        'Historic character',
        'Village location',
        'Countryside views'
      ],
      agent: {
        name: 'David Thompson',
        title: 'Rural Property Specialist',
        rating: 4.7,
        reviews: 78,
        phone: '01386 456 789',
        email: 'david@estatehub.co.uk',
        languages: ['English', 'Korean'],
        responseTime: 'Usually within 3 hours',
        image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20male%20agent&width=300&height=300&seq=agent4&orientation=squarish',
      }
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
      yearBuilt: 2019,
      parkingSpaces: 1,
      lotSize: 'N/A',
      serviceFees: 220,
      councilTax: 1650,
     images: ['/property5-1.jpg', '/property5-2.jpg', '/property5-3.jpg', '/property5-4.jpg'], 
      description: 'Stunning waterfront apartment with canal views, modern amenities, and access to waterfront parks. Building features concierge, fitness centre, and is pet-friendly. Wake up to breathtaking water views every morning.',
      features: [
        'Canal views',
        'Floor-to-ceiling windows',
        'Waterfront location',
        'Modern amenities',
        'Building concierge',
        'Fitness centre',
        'Pet-friendly',
        'Waterfront parks',
        'Metrolink access',
        'Restaurants nearby',
        'Shopping centre',
        'MediaCityUK'
      ],
      agent: {
        name: 'Lisa Park',
        title: 'Waterfront Property Expert',
        rating: 4.8,
        reviews: 156,
        phone: '0161 567 8901',
        email: 'lisa@estatehub.co.uk',
        languages: ['English', 'Italian'],
        responseTime: 'Usually within 1 hour',
        image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20female%20agent&width=300&height=300&seq=agent5&orientation=squarish',
      }
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
      yearBuilt: 1925,
      parkingSpaces: 0,
      lotSize: 'N/A',
      serviceFees: 120,
      councilTax: 1200,
      images: ['/property6-1.jpg', '/property6-2.jpg', '/property6-3.jpg', '/property6-4.jpg'], 
      description: 'Industrial loft in trendy Shoreditch with exposed brick, high ceilings, and large windows. Perfect for creative professionals. This unique space combines historic character with modern convenience.',
      features: [
        'Exposed brick walls',
        'High ceilings',
        'Large windows',
        'Industrial character',
        'Hardwood floors',
        'Open floor plan',
        'Trendy neighbourhood',
        'Art galleries nearby',
        'Restaurants',
        'Shopping',
        'Tube station',
        'Creative community'
      ],
      agent: {
        name: 'Robert Wilson',
        title: 'East London Specialist',
        rating: 4.6,
        reviews: 89,
        phone: '020 7678 9012',
        email: 'alex@estatehub.co.uk',
        languages: ['English', 'Spanish', 'Portuguese'],
        responseTime: 'Usually within 2 hours',
        image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20male%20agent&width=300&height=300&seq=agent6&orientation=squarish',
      }
    }
  ];

  useEffect(() => {
    const foundProperty = allProperties.find(p => p.id === propertyId);
    setProperty(foundProperty);
    setLoading(false);
  }, [propertyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading property details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <i className="ri-home-line w-16 h-16 flex items-center justify-center text-gray-400 mx-auto mb-4"></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
              Back to Properties
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = property.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'price', label: 'Price Analysis' },
    { id: 'neighbourhood', label: 'Neighbourhood' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 cursor-pointer">
                Properties
              </Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
            </li>
            <li className="text-gray-600 capitalize">{property.type}</li>
            <li>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
            </li>
            <li className="text-gray-900 font-medium truncate">{property.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96 lg:h-[500px]">
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full  object-top"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <i className="ri-image-line w-16 h-16 flex items-center justify-center text-gray-400"></i>
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white transition-colors cursor-pointer shadow-md"
                >
                  <i className="ri-arrow-left-s-line w-6 h-6 flex items-center justify-center"></i>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white transition-colors cursor-pointer shadow-md"
                >
                  <i className="ri-arrow-right-s-line w-6 h-6 flex items-center justify-center"></i>
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setIsVirtualTourOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap shadow-md"
              >
                <i className="ri-camera-line w-4 h-4 flex items-center justify-center mr-2 "></i>
                Virtual Tour
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors cursor-pointer shadow-md"
              >
                <i
                  className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'} w-5 h-5 flex items-center justify-center`}
                ></i>
              </button>
            </div>
          </div>

          {/* Property Information */}
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">£{property.price.toLocaleString()}</h1>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <i className="ri-hotel-bed-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-drop-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    {property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-ruler-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    {property.sqft.toLocaleString()} sqft
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  Arrange Viewing
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                  Contact Agent
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Description</h2>
                      <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-500 mr-2"></i>
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Property Type</span>
                          <p className="text-gray-900 capitalize">{property.type}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Year Built</span>
                          <p className="text-gray-900">{property.yearBuilt}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Parking Spaces</span>
                          <p className="text-gray-900">{property.parkingSpaces}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Lot Size</span>
                          <p className="text-gray-900">{property.lotSize}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Floor Area</span>
                          <p className="text-gray-900">{property.sqft.toLocaleString()} sqft</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Price per sqft</span>
                          <p className="text-gray-900">£{Math.round(property.price / property.sqft)}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Service Charge</span>
                          <p className="text-gray-900">£{property.serviceFees}/month</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Council Tax</span>
                          <p className="text-gray-900">£{property.councilTax.toLocaleString()}/year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'price' && <PriceComparison property={property} />}

                {activeTab === 'neighbourhood' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Neighbourhood</h2>
                      <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155421.8976469757!2d-0.26674089999999997!3d51.52848865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1735123456789!5m2!1sen!2sus"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Nearby Amenities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <i className="ri-shopping-cart-line w-4 h-4 flex items-center justify-center text-blue-500 mr-2"></i>
                          <span className="text-sm">Supermarket - 0.2 miles</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-train-line w-4 h-4 flex items-center justify-center text-blue-500 mr-2"></i>
                          <span className="text-sm">Train Station - 0.3 miles</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-hospital-line w-4 h-4 flex items-center justify-center text-blue-500 mr-2"></i>
                          <span className="text-sm">Hospital - 0.8 miles</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-school-line w-4 h-4 flex items-center justify-center text-blue-500 mr-2"></i>
                          <span className="text-sm">Primary School - 0.5 miles</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-restaurant-line w-4 h-4 flex items-center justify-center text-blue-500 mr-2"></i>
                          <span className="text-sm">Restaurants - 0.1 miles</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-bank-line w-4 h-4 flex items-center justify-center text-blue-500 mr-2"></i>
                          <span className="text-sm">Bank - 0.4 miles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Agent Information */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-full object-cover object-top"
                    />
                    <div>
                      <h4 className="font-medium">{property.agent.name}</h4>
                      <p className="text-sm text-gray-500">{property.agent.title}</p>
                      <p className="text-sm text-gray-500">⭐ {property.agent.rating}/5 ({property.agent.reviews} reviews)</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2 "></i>
                      {property.agent.phone}
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2 "></i>
                      Send Message
                    </button>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Response time: {property.agent.responseTime}</p>
                    <p>Languages: {property.agent.languages.join(', ')}</p>
                    <p>Email: {property.agent.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {isVirtualTourOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Virtual Tour - {property.title}</h3>
              <button
                onClick={() => setIsVirtualTourOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i className="ri-camera-line w-16 h-16 flex items-center justify-center text-gray-400 mx-auto mb-4"></i>
                <p className="text-xl text-gray-600 mb-2">Virtual Tour Coming Soon</p>
                <p className="text-sm text-gray-500">Interactive 360° view of {property.title}</p>
                <p className="text-sm text-gray-500 mt-2">Contact the agent to arrange a live virtual tour</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
