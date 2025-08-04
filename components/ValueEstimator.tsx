
'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ValueEstimator() {
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('2');
  const [sqft, setSqft] = useState('1200');
  const [yearBuilt, setYearBuilt] = useState('2000');
  const [estimate, setEstimate] = useState<number | null>(null);

  const handleEstimate = () => {
    const basePrice = 350;
    const bedroomValue = parseInt(bedrooms) * 35000;
    const bathroomValue = parseInt(bathrooms) * 20000;
    const sqftValue = parseInt(sqft) * basePrice;
    const ageAdjustment = (2025 - parseInt(yearBuilt)) * -1500;
    
    const estimatedValue = bedroomValue + bathroomValue + sqftValue + ageAdjustment;
    setEstimate(estimatedValue);
  };

  const priceHistory = [
    { month: 'Jan 2024', price: 420000 },
    { month: 'Mar 2024', price: 435000 },
    { month: 'May 2024', price: 445000 },
    { month: 'Jul 2024', price: 455000 },
    { month: 'Sep 2024', price: 460000 },
    { month: 'Nov 2024', price: 470000 },
    { month: 'Jan 2025', price: 480000 }
  ];

  const comparableProperties = [
    {
      address: '42 Victoria Street',
      price: 465000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1150,
      soldDate: '2 weeks ago'
    },
    {
      address: '18 Park Lane',
      price: 520000,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1350,
      soldDate: '1 month ago'
    },
    {
      address: '7 Mill Road',
      price: 440000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1000,
      soldDate: '3 weeks ago'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get Your Property Value Estimate</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 High Street, London, SW1A 1AA"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor Area (sq ft)</label>
                <input
                  type="number"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1,200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
                <input
                  type="number"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000"
                />
              </div>
            </div>

            <button
              onClick={handleEstimate}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Get Free Valuation
            </button>
          </div>
        </div>

        <div>
          {estimate && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Estimated Property Value</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                £{estimate.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                Based on recent sales and market data
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>• This is a preliminary estimate</p>
                <p>• Actual value may vary based on condition and features</p>
                <p>• Contact an agent for a detailed market analysis</p>
              </div>
            </div>
          )}

          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Price Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `£${Number(value).toLocaleString()}`} />
                  <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {estimate && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Recently Sold Comparable Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparableProperties.map((property, index) => (
              <div key={index} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold">{property.address}</h4>
                  <span className="text-sm text-gray-500">{property.soldDate}</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-3">
                  £{property.price.toLocaleString()}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <i className="ri-hotel-bed-line w-4 h-4 flex items-center justify-center mr-1"></i>
                    {property.bedrooms} bed
                  </div>
                  <div className="flex items-center">
                    <i className="ri-drop-line w-4 h-4 flex items-center justify-center mr-1"></i>
                    {property.bathrooms} bath
                  </div>
                  <div className="flex items-center">
                    <i className="ri-ruler-line w-4 h-4 flex items-center justify-center mr-1"></i>
                    {property.sqft.toLocaleString()} sqft
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
