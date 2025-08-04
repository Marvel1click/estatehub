
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Pacifico, serif' }}>
              EstateHub
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect property across the United Kingdom. 
              We connect buyers, sellers, and renters with their ideal homes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="ri-facebook-fill w-6 h-6 flex items-center justify-center"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="ri-twitter-fill w-6 h-6 flex items-center justify-center"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="ri-instagram-fill w-6 h-6 flex items-center justify-center"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="ri-linkedin-fill w-6 h-6 flex items-center justify-center"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Find an Agent
                </Link>
              </li>
              <li>
                <Link href="/mortgage" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Sell Your Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Favourites
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Property Valuation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Investment Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Rental Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Commercial Properties
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center text-blue-400 mr-3"></i>
                <span className="text-gray-400">123 High Street, London, UK</span>
              </div>
              <div className="flex items-center">
                <i className="ri-phone-line w-5 h-5 flex items-center justify-center text-blue-400 mr-3"></i>
                <span className="text-gray-400">020 7123 4567</span>
              </div>
              <div className="flex items-center">
                <i className="ri-mail-line w-5 h-5 flex items-center justify-center text-blue-400 mr-3"></i>
                <span className="text-gray-400">info@estatehub.co.uk</span>
              </div>
              <div className="flex items-center">
                <i className="ri-time-line w-5 h-5 flex items-center justify-center text-blue-400 mr-3"></i>
                <span className="text-gray-400">Mon - Fri: 9:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 EstateHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
