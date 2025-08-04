'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import PropertyCard from '@/components/PropertyCard';

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState('properties');
  
  const savedProperties = [
    {
      id: '2',
      title: 'Victorian Style House',
      price: 1200000,
      location: 'Brooklyn Heights, NY',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      type: 'house',
      featured: false,
      daysOnMarket: 12,
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20Victorian%20style%20house%20exterior%20with%20classic%20architecture%2C%20bay%20windows%2C%20ornate%20details%2C%20front%20porch%2C%20well-maintained%20garden%2C%20traditional%20charm%2C%20historic%20neighborhood%20setting%2C%20brick%20facade%2C%20wooden%20elements&width=400&height=300&seq=2&orientation=landscape',
      savedDate: '3 days ago'
    },
    {
      id: '4',
      title: 'Cozy Townhouse',
      price: 950000,
      location: 'Greenwich Village, NY',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      type: 'townhouse',
      featured: false,
      daysOnMarket: 18,
      image: 'https://readdy.ai/api/search-image?query=Charming%20townhouse%20exterior%20with%20brick%20facade%2C%20small%20front%20garden%2C%20traditional%20steps%2C%20window%20boxes%20with%20flowers%2C%20tree-lined%20street%2C%20historic%20neighborhood%20character%2C%20cozy%20residential%20setting%2C%20urban%20village%20atmosphere&width=400&height=300&seq=4&orientation=landscape',
      savedDate: '1 week ago'
    }
  ];

  const savedSearches = [
    {
      id: '1',
      name: 'Manhattan Apartments Under $1M',
      criteria: 'Manhattan • $500K - $1M • 2+ bedrooms',
      results: 23,
      lastChecked: '2 hours ago',
      newListings: 3
    },
    {
      id: '2',
      name: 'Brooklyn Family Homes',
      criteria: 'Brooklyn • $800K - $1.5M • 3+ bedrooms • House',
      results: 15,
      lastChecked: '1 day ago',
      newListings: 1
    },
    {
      id: '3',
      name: 'Luxury Condos with Views',
      criteria: 'Upper East Side • $2M+ • Condo • High floor',
      results: 8,
      lastChecked: '3 hours ago',
      newListings: 0
    }
  ];

  const savedAgents = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialty: 'Luxury Homes',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@estatehub.com',
      image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20female%20agent&width=100&height=100&seq=agent1&orientation=squarish',
      savedDate: '5 days ago'
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      specialty: 'First-Time Buyers',
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@estatehub.com',
      image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20female%20agent&width=100&height=100&seq=agent3&orientation=squarish',
      savedDate: '2 weeks ago'
    }
  ];

  const tabs = [
    { id: 'properties', label: 'Properties', count: savedProperties.length },
    { id: 'searches', label: 'Searches', count: savedSearches.length },
    { id: 'agents', label: 'Agents', count: savedAgents.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Items</h1>
          <p className="text-gray-600">Your saved properties, searches, and agents</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'properties' && (
              <div>
                {savedProperties.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="ri-bookmark-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">No saved properties</h2>
                    <p className="text-gray-600">Save properties while browsing to view them here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {savedProperties.map((property) => (
                      <div key={property.id} className="relative">
                        <PropertyCard property={property} />
                        <div className="absolute bottom-4 left-4 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
                          Saved {property.savedDate}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'searches' && (
              <div>
                {savedSearches.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="ri-search-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">No saved searches</h2>
                    <p className="text-gray-600">Save your search criteria to get notified of new listings</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedSearches.map((search) => (
                      <div key={search.id} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold">{search.name}</h3>
                          <div className="flex items-center space-x-2">
                            {search.newListings > 0 && (
                              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                                {search.newListings} new
                              </span>
                            )}
                            <button className="p-2 text-gray-400 hover:text-red-600 cursor-pointer">
                              <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{search.criteria}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{search.results} results • Last checked {search.lastChecked}</span>
                          <button className="text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap">
                            View Results
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'agents' && (
              <div>
                {savedAgents.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="ri-user-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">No saved agents</h2>
                    <p className="text-gray-600">Save agents you're interested in working with</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedAgents.map((agent) => (
                      <div key={agent.id} className="border rounded-lg p-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={agent.image}
                            alt={agent.name}
                            className="w-16 h-16 rounded-full object-cover object-top"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold">{agent.name}</h3>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Saved {agent.savedDate}</span>
                                <button className="p-1 text-gray-400 hover:text-red-600 cursor-pointer">
                                  <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">{agent.specialty}</p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-sm text-gray-500">
                                <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-1"></i>
                                {agent.phone}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-1"></i>
                                {agent.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                              Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}