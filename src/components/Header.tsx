
import React from 'react';
import { Trophy } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-primary mr-2" />
            <span className="font-bold text-xl gradient-heading">FantasyEdge Strategist</span>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">How It Works</a>
            <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">About</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
