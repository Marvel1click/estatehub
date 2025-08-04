'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AgentCard from '@/components/AgentCard';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const agents = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialty: 'Luxury Homes',
      rating: 4.9,
      reviews: 127,
      sales: 89,
      experience: 8,
      phone: '(555) 123-4567',
      email: 'sarah.johnson@estatehub.com',
      image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20female%20agent&width=300&height=300&seq=agent1&orientation=squarish',
      bio: 'Specializing in luxury properties with over 8 years of experience. Known for exceptional client service and market expertise.',
      languages: ['English', 'Spanish']
    },
    {
      id: '2',
      name: 'Michael Chen',
      specialty: 'Commercial',
      rating: 4.8,
      reviews: 94,
      sales: 156,
      experience: 12,
      phone: '(555) 234-5678',
      email: 'michael.chen@estatehub.com',
      image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20male%20agent&width=300&height=300&seq=agent2&orientation=squarish',
      bio: 'Commercial real estate expert with extensive experience in office buildings and retail spaces.',
      languages: ['English', 'Mandarin']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      specialty: 'First-Time Buyers',
      rating: 4.9,
      reviews: 203,
      sales: 145,
      experience: 6,
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@estatehub.com',
      image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20female%20agent&width=300&height=300&seq=agent3&orientation=squarish',
      bio: 'Dedicated to helping first-time homebuyers navigate the market with patience and expertise.',
      languages: ['English', 'Spanish']
    },
    {
      id: '4',
      name: 'David Thompson',
      specialty: 'Investment Properties',
      rating: 4.7,
      reviews: 78,
      sales: 234,
      experience: 15,
      phone: '(555) 456-7890',
      email: 'david.thompson@estatehub.com',
      image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20male%20agent&width=300&height=300&seq=agent4&orientation=squarish',
      bio: 'Investment property specialist with proven track record in identifying profitable opportunities.',
      languages: ['English']
    },
    {
      id: '5',
      name: 'Lisa Park',
      specialty: 'Luxury Homes',
      rating: 4.9,
      reviews: 156,
      sales: 112,
      experience: 10,
      phone: '(555) 567-8901',
      email: 'lisa.park@estatehub.com',
      image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20female%20agent&width=300&height=300&seq=agent5&orientation=squarish',
      bio: 'Luxury home specialist known for discretion and exceptional service to high-end clients.',
      languages: ['English', 'Korean']
    },
    {
      id: '6',
      name: 'Robert Wilson',
      specialty: 'Condos & Apartments',
      rating: 4.8,
      reviews: 189,
      sales: 178,
      experience: 9,
      phone: '(555) 678-9012',
      email: 'robert.wilson@estatehub.com',
      image: 'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%20headshot%2C%20confident%20smile%2C%20business%20attire%2C%20professional%20photography%2C%20friendly%20appearance%2C%20trustworthy%20demeanor%2C%20clean%20background%2C%20high-quality%20portrait%2C%20male%20agent&width=300&height=300&seq=agent6&orientation=squarish',
      bio: 'Condo and apartment specialist with deep knowledge of urban living options.',
      languages: ['English', 'French']
    }
  ];

  const specialties = ['all', 'Luxury Homes', 'Commercial', 'First-Time Buyers', 'Investment Properties', 'Condos & Apartments'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || agent.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Agent</h1>
          <p className="text-gray-600">Connect with experienced real estate professionals</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                <input
                  type="text"
                  placeholder="Search agents by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specialties' : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">{filteredAgents.length} agents found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}