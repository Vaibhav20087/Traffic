import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Settings, AlertTriangle } from 'lucide-react';

interface ControlPanelProps {
  onSignalUpdate: (intersection: string, timing: number) => void;
}

export function ControlPanel({ onSignalUpdate }: ControlPanelProps) {
  const [manualMode, setManualMode] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [signalTimings, setSignalTimings] = useState({
    north: 30,
    south: 30,
    east: 25,
    west: 25,
  });

  const handleTimingChange = (direction: string, value: number) => {
    setSignalTimings(prev => ({ ...prev, [direction]: value }));
    onSignalUpdate(direction, value);
  };

  const handleEmergencyOverride = () => {
    setEmergencyMode(!emergencyMode);
    // In emergency mode, prioritize one direction
    if (!emergencyMode) {
      setSignalTimings({
        north: 60,
        south: 5,
        east: 5,
        west: 5,
      });
    } else {
      setSignalTimings({
        north: 30,
        south: 30,
        east: 25,
        west: 25,
      });
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Traffic Control</h3>
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Control Mode */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">Control Mode</span>
            <button
              onClick={() => setManualMode(!manualMode)}
              className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
                manualMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {manualMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{manualMode ? 'Manual' : 'Auto'}</span>
            </button>
          </div>
        </div>
        
        {/* Emergency Override */}
        <div className="bg-gray-700 rounded-lg p-3">
          <button
            onClick={handleEmergencyOverride}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded transition-colors ${
              emergencyMode 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>{emergencyMode ? 'Emergency Active' : 'Emergency Override'}</span>
          </button>
        </div>
        
        {/* Signal Timings */}
        <div className="bg-gray-700 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Signal Timings (seconds)</h4>
          <div className="space-y-3">
            {Object.entries(signalTimings).map(([direction, timing]) => (
              <div key={direction} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize">{direction}</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="5"
                    max="90"
                    value={timing}
                    onChange={(e) => handleTimingChange(direction, parseInt(e.target.value))}
                    className="w-20"
                    disabled={!manualMode}
                  />
                  <span className="text-white font-semibold w-8 text-right">{timing}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-gray-700 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center space-x-1 py-2 px-3 bg-gray-600 hover:bg-gray-500 rounded text-sm transition-colors">
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
            <button className="flex items-center justify-center space-x-1 py-2 px-3 bg-gray-600 hover:bg-gray-500 rounded text-sm transition-colors">
              <Play className="h-3 w-3" />
              <span>Optimize</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}