import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { TrafficMap } from './TrafficMap';
import { StatsPanel } from './StatsPanel';
import { LiveFeed } from './LiveFeed';
import { ControlPanel } from './ControlPanel';
import { AlertsPanel } from './AlertsPanel';
import { useTrafficData } from '../hooks/useTrafficData';

export function TrafficDashboard() {
  const { trafficData, stats, alerts, updateSignalTiming } = useTrafficData();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TrafficMap trafficData={trafficData} />
          </div>
          <div>
            <StatsPanel stats={stats} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <LiveFeed />
          </div>
          <div>
            <ControlPanel onSignalUpdate={updateSignalTiming} />
          </div>
          <div>
            <AlertsPanel alerts={alerts} />
          </div>
        </div>
      </div>
    </div>
  );
}