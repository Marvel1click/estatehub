"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ValueEstimator from "@/components/ValueEstimator";
import Link from "next/link";

export default function SellPage() {
  const [activeTab, setActiveTab] = useState("estimate");

  const sellingSteps = [
    {
      step: 1,
      title: "Get Your Home Value",
      description:
        "Use our free home value estimator to understand your property's worth",
      icon: "ri-home-line",
    },
    {
      step: 2,
      title: "Choose an Agent",
      description: "Connect with top-rated agents in your area",
      icon: "ri-user-line",
    },
    {
      step: 3,
      title: "Prepare Your Home",
      description: "Get tips and recommendations to maximize your sale price",
      icon: "ri-tools-line",
    },
    {
      step: 4,
      title: "List Your Property",
      description: "Professional photos and marketing to attract buyers",
      icon: "ri-camera-line",
    },
    {
      step: 5,
      title: "Review Offers",
      description: "Negotiate and accept the best offer for your home",
      icon: "ri-file-text-line",
    },
    {
      step: 6,
      title: "Close the Sale",
      description: "Complete the transaction and get paid",
      icon: "ri-check-line",
    },
  ];

  const marketInsights = [
    {
      title: "Average Days on Market",
      value: "28 days",
      trend: "down",
      change: "12%",
      description: "Properties are selling faster than last year",
    },
    {
      title: "Median Sale Price",
      value: "$785,000",
      trend: "up",
      change: "8.5%",
      description: "Year-over-year price increase",
    },
    {
      title: "Inventory Level",
      value: "2.8 months",
      trend: "down",
      change: "15%",
      description: "Lower inventory means more competition among buyers",
    },
    {
      title: "Price-to-List Ratio",
      value: "98.2%",
      trend: "up",
      change: "2.1%",
      description: "Sellers are getting closer to asking price",
    },
  ];

  const tabs = [
    { id: "estimate", label: "Home Value" },
    { id: "process", label: "Selling Process" },
    { id: "market", label: "Market Insights" },
    { id: "list", label: "List Your Home" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Sell Your Home with Confidence
            </h1>
            <p className="text-xl mb-8">
              Get the best price for your property with our expert guidance
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
                Get Free Estimate
              </button>
              <Link href="/agents">
                <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap">
                  Find an Agent
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "estimate" && <ValueEstimator />}

            {activeTab === "process" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    How to Sell Your Home
                  </h2>
                  <p className="text-gray-600">
                    Follow these steps to maximize your sale price and minimize
                    stress
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellingSteps.map((step) => (
                    <div
                      key={step.step}
                      className="border rounded-lg p-6 text-center"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i
                          className={`${step.icon} text-blue-600 w-8 h-8 flex items-center justify-center`}
                        ></i>
                      </div>
                      <div className="text-sm font-bold text-blue-600 mb-2">
                        STEP {step.step}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Why Choose EstateHub?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        95%
                      </div>
                      <div className="text-sm text-gray-600">
                        Of list price achieved
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        21
                      </div>
                      <div className="text-sm text-gray-600">
                        Average days on market
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        4.9
                      </div>
                      <div className="text-sm text-gray-600">
                        Client satisfaction rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "market" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Local Market Insights
                  </h2>
                  <p className="text-gray-600">
                    Current market conditions in your area
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {marketInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-6 text-center"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {insight.title}
                      </h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {insight.value}
                      </div>
                      <div
                        className={`flex items-center justify-center space-x-1 mb-2 ${
                          insight.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <i
                          className={`${
                            insight.trend === "up"
                              ? "ri-arrow-up-line"
                              : "ri-arrow-down-line"
                          } w-4 h-4 flex items-center justify-center`}
                        ></i>
                        <span className="text-sm font-medium">
                          {insight.change}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Market Forecast
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Next 3 Months</h4>
                      <p className="text-sm text-gray-600">
                        Expect continued strong demand with steady price growth.
                        Best time to list is typically spring season.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Next 6 Months</h4>
                      <p className="text-sm text-gray-600">
                        Market may begin to cool slightly but will remain
                        favorable for sellers with proper pricing strategy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "list" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">List Your Property</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                        <option>1</option>
                        <option>1.5</option>
                        <option>2</option>
                        <option>2.5</option>
                        <option>3+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Square Feet
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1,200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                      <option>Single Family Home</option>
                      <option>Townhouse</option>
                      <option>Condominium</option>
                      <option>Apartment</option>
                      <option>Multi-Family</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="750,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your property's unique features, recent renovations, or special circumstances..."
                      maxLength={500}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Submit Listing Request
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
