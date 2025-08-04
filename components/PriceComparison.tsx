'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceComparisonProps {
  property: any;
}

export default function PriceComparison({ property }: PriceComparisonProps) {
  const priceHistory = [
    { month: 'Jan', price: property.price - 15000, market: property.price - 10000 },
    { month: 'Feb', price: property.price - 12000, market: property.price - 8000 },
    { month: 'Mar', price: property.price - 8000, market: property.price - 5000 },
    { month: 'Apr', price: property.price - 5000, market: property.price - 3000 },
    { month: 'May', price: property.price - 2000, market: property.price - 1000 },
    { month: 'Jun', price: property.price, market: property.price + 2000 },
  ];

  const similarProperties = [
    { address: '123 Oak Street', price: property.price - 25000, sqft: property.sqft - 200, pricePerSqft: Math.round((property.price - 25000) / (property.sqft - 200)) },
    { address: '456 Pine Avenue', price: property.price + 15000, sqft: property.sqft + 150, pricePerSqft: Math.round((property.price + 15000) / (property.sqft + 150)) },
    { address: '789 Maple Drive', price: property.price - 10000, sqft: property.sqft - 100, pricePerSqft: Math.round((property.price - 10000) / (property.sqft - 100)) },
    { address: '321 Elm Street', price: property.price + 30000, sqft: property.sqft + 300, pricePerSqft: Math.round((property.price + 30000) / (property.sqft + 300)) },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Price History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="This Property"
              />
              <Line 
                type="monotone" 
                dataKey="market" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Market Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Similar Properties</h3>
        <div className="space-y-4">
          {similarProperties.map((comp, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{comp.address}</h4>
                <p className="text-sm text-gray-500">{comp.sqft.toLocaleString()} sqft</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${comp.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">${comp.pricePerSqft}/sqft</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Market Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">-2.5%</div>
            <div className="text-sm text-gray-600">Below Market</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">${Math.round(property.price / property.sqft)}</div>
            <div className="text-sm text-gray-600">Price per sqft</div>
          </div>
        </div>
      </div>
    </div>
  );
}