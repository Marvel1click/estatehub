
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Pacifico, serif' }}>
                EstateHub
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 cursor-pointer whitespace-nowrap">
              Properties
            </Link>
            <Link href="/agents" className="text-gray-700 hover:text-blue-600 cursor-pointer whitespace-nowrap">
              Agents
            </Link>
            <Link href="/mortgage" className="text-gray-700 hover:text-blue-600 cursor-pointer whitespace-nowrap">
              Mortgage
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600 cursor-pointer whitespace-nowrap">
              Sell
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="hidden md:inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap">
              <i className="ri-heart-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Favourites
            </Link>
            
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white w-4 h-4 flex items-center justify-center"></i>
                  </div>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </Link>
                    <Link href="/saved" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Saved Properties
                    </Link>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                Sign In
              </Link>
            )}

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 cursor-pointer"
            >
              <i className="ri-menu-line w-6 h-6 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                Properties
              </Link>
              <Link href="/agents" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                Agents
              </Link>
              <Link href="/mortgage" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                Mortgage
              </Link>
              <Link href="/sell" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                Sell
              </Link>
              <Link href="/favorites" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                Favourites
              </Link>
              {!isLoggedIn && (
                <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
