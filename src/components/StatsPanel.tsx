import React from 'react';
import { TrendingUp, TrendingDown, Car, Truck, Bus, Bike } from 'lucide-react';

interface Stats {
  totalVehicles: number;
  avgWaitTime: number;
  congestionLevel: number;
  vehicleTypes: {
    car: number;
    truck: number;
    bus: number;
    bike: number;
  };
}

interface StatsPanelProps {
  stats: Stats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const getCongestionColor = (level: number) => {
    if (level < 30) return 'text-green-400';
    if (level < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getCongestionIcon = (level: number) => {
    return level > 50 ? TrendingUp : TrendingDown;
  };

  const CongestionIcon = getCongestionIcon(stats.congestionLevel);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Traffic Statistics</h3>
      
      <div className="space-y-4">
        {/* Total Vehicles */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Total Vehicles</span>
            <span className="text-xl font-bold text-blue-400">{stats.totalVehicles}</span>
          </div>
        </div>
        
        {/* Average Wait Time */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Avg Wait Time</span>
            <span className="text-xl font-bold text-yellow-400">{stats.avgWaitTime}s</span>
          </div>
        </div>
        
        {/* Congestion Level */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Congestion Level</span>
            <div className="flex items-center space-x-2">
              <CongestionIcon className={`h-5 w-5 ${getCongestionColor(stats.congestionLevel)}`} />
              <span className={`text-xl font-bold ${getCongestionColor(stats.congestionLevel)}`}>
                {stats.congestionLevel}%
              </span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  stats.congestionLevel < 30 ? 'bg-green-400' :
                  stats.congestionLevel < 70 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${stats.congestionLevel}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Vehicle Types */}
        <div className="bg-gray-700 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Vehicle Distribution</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Car className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Cars</span>
              </div>
              <span className="text-blue-400 font-semibold">{stats.vehicleTypes.car}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">Trucks</span>
              </div>
              <span className="text-red-400 font-semibold">{stats.vehicleTypes.truck}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bus className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-300">Buses</span>
              </div>
              <span className="text-yellow-400 font-semibold">{stats.vehicleTypes.bus}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bike className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">Bikes</span>
              </div>
              <span className="text-green-400 font-semibold">{stats.vehicleTypes.bike}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}