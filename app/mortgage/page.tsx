'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import MortgageCalculator from '@/components/MortgageCalculator';

export default function MortgagePage() {
  const [activeTab, setActiveTab] = useState('calculator');

  const mortgageTypes = [
    {
      title: 'Conventional Loan',
      rate: '6.875%',
      description: 'Standard loan with competitive rates for qualified borrowers',
      requirements: ['Credit score 620+', '3% down payment', 'Debt-to-income ratio under 43%']
    },
    {
      title: 'FHA Loan',
      rate: '6.625%',
      description: 'Government-backed loan with lower down payment requirements',
      requirements: ['Credit score 580+', '3.5% down payment', 'Mortgage insurance required']
    },
    {
      title: 'VA Loan',
      rate: '6.500%',
      description: 'Exclusive loan program for military veterans and service members',
      requirements: ['Military service', 'No down payment', 'No mortgage insurance']
    },
    {
      title: 'USDA Loan',
      rate: '6.750%',
      description: 'Rural development loan for eligible rural and suburban areas',
      requirements: ['Rural location', 'No down payment', 'Income limits apply']
    }
  ];

  const lenders = [
    {
      id: '1',
      name: 'Premier Mortgage Co.',
      rating: 4.9,
      reviews: 1248,
      rate: '6.625%',
      apr: '6.847%',
      phone: '(555) 123-4567',
      image: 'https://premiermortgageco.com/wp-content/uploads/2020/12/premier-mortgage-logo.png'
    },
    {
      id: '2',
      name: 'City Bank Mortgage',
      rating: 4.8,
      reviews: 892,
      rate: '6.750%',
      apr: '6.923%',
      phone: '(555) 234-5678',
      image: 'https://img.p.mapq.st/?url=https://s3.eu-central-1.amazonaws.com/uberall-userpics-prod/4069272/medium_vcvBlBByUZ.jpeg?w=3840&q=75'
    },
    {
      id: '3',
      name: 'HomeFirst Lending',
      rating: 4.7,
      reviews: 634,
      rate: '6.875%',
      apr: '7.012%',
      phone: '(555) 345-6789',
      image: 'https://portfolio.investmentguruindia.com/investmentguruimages/upload/post/2021/05/edd08f0feb1d9cd798eb97955a8befdf.jpg'
    }
  ];

  const tabs = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'rates', label: 'Current Rates' },
    { id: 'lenders', label: 'Lenders' },
    { id: 'prequalify', label: 'Pre-qualify' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mortgage Center</h1>
          <p className="text-gray-600">Calculate payments, compare rates, and find the right lender</p>
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
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'calculator' && (
              <MortgageCalculator />
            )}

            {activeTab === 'rates' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mortgageTypes.map((type, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{type.title}</h3>
                        <span className="text-2xl font-bold text-blue-600">{type.rate}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{type.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {type.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-500 mr-2"></i>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-gray-500 mt-6">
                  <p>*Rates are subject to change and may vary based on credit score, down payment, and other factors. Current as of {new Date().toLocaleDateString()}.</p>
                </div>
              </div>
            )}

            {activeTab === 'lenders' && (
              <div className="space-y-6">
                {lenders.map((lender) => (
                  <div key={lender.id} className="border rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <img
                        src={lender.image}
                        alt={lender.name}
                        className="w-full lg:w-48 h-32  rounded-lg object-top"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{lender.name}</h3>
                          <div className="flex items-center">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm text-gray-600 ml-1">{lender.rating}/5 ({lender.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Interest Rate</span>
                            <p className="text-lg font-bold text-blue-600">{lender.rate}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">APR</span>
                            <p className="text-lg font-bold text-blue-600">{lender.apr}</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                            Get Quote
                          </button>
                          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2 "></i>
                            {lender.phone}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'prequalify' && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Pre-qualification Application</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="$75,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Debt</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="$1,200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score Range</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                      <option>Select credit score range</option>
                      <option>Excellent (750+)</option>
                      <option>Good (700-749)</option>
                      <option>Fair (650-699)</option>
                      <option>Poor (600-649)</option>
                      <option>Bad (Below 600)</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Get Pre-qualified
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}