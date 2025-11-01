import React from 'react';
import { TrafficCone as Traffic, Shield, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Traffic className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-white">SmartTraffic AI</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-400">
                <Zap className="h-4 w-4" />
                <span>AI Processing</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              <Shield className="h-4 w-4" />
              <span>Emergency Override</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}