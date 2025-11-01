import React from 'react';
import { AlertTriangle, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  description: string;
  location: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high';
}

interface AlertsPanelProps {
  alerts: Alert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-400 bg-red-900/20 border-red-900/30';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-900/30';
      case 'success': return 'text-green-400 bg-green-900/20 border-green-900/30';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-900/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">System Alerts</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Live</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>All systems operational</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`border rounded-lg p-3 transition-colors ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {alert.title}
                      </h4>
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <span className="text-gray-400">{formatTime(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {alerts.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-700">
          <button className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View All Alerts
          </button>
        </div>
      )}
    </div>
  );
}