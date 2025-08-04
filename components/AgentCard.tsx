'use client';

import { useState } from 'react';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    sales: number;
    experience: number;
    phone: string;
    email: string;
    image: string;
    bio: string;
    languages: string[];
  };
}

export default function AgentCard({ agent }: AgentCardProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-16 h-16 rounded-full object-cover object-top mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.specialty}</p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm text-gray-600 ml-1">{agent.rating}/5 ({agent.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{agent.bio}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{agent.sales}</div>
            <div className="text-sm text-gray-500">Sales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{agent.experience}</div>
            <div className="text-sm text-gray-500">Years Exp.</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Languages:</div>
          <div className="flex flex-wrap gap-1">
            {agent.languages.map((lang, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">{lang}</span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center cursor-pointer whitespace-nowrap"
          >
            Contact
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-heart-line w-4 h-4 flex items-center justify-center"></i>
          </button>
        </div>

        {isContactOpen && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-blue-600 mr-2"></i>
                <span className="text-sm">{agent.phone}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center text-blue-600 mr-2"></i>
                <span className="text-sm">{agent.email}</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                  Call Now
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap">
                  Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}