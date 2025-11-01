import React, { useEffect, useState } from 'react';
import { Camera, Eye, Zap } from 'lucide-react';

interface Detection {
  id: string;
  type: 'car' | 'truck' | 'bus' | 'bike';
  confidence: number;
  x: number;
  y: number;
  timestamp: number;
}

export function LiveFeed() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate YOLO detections
      const newDetections: Detection[] = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
        id: `detection-${Date.now()}-${i}`,
        type: ['car', 'truck', 'bus', 'bike'][Math.floor(Math.random() * 4)] as any,
        confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50,
        timestamp: Date.now(),
      }));
      
      setDetections(newDetections);
      setIsProcessing(false);
      
      // Reset processing state
      setTimeout(() => setIsProcessing(true), 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'car': return 'border-blue-400 text-blue-400';
      case 'truck': return 'border-red-400 text-red-400';
      case 'bus': return 'border-yellow-400 text-yellow-400';
      case 'bike': return 'border-green-400 text-green-400';
      default: return 'border-gray-400 text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Live CCTV Feed</h3>
        <div className="flex items-center space-x-2">
          {isProcessing && <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />}
          <Camera className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        {/* Simulated camera feed */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          </div>
          
          {/* Detection boxes */}
          {detections.map((detection) => (
            <div
              key={detection.id}
              className={`absolute border-2 ${getTypeColor(detection.type)} animate-pulse`}
              style={{
                left: `${detection.x}px`,
                top: `${detection.y}px`,
                width: '60px',
                height: '40px',
              }}
            >
              <div className={`absolute -top-6 left-0 text-xs px-2 py-1 rounded ${getTypeColor(detection.type)} bg-gray-900`}>
                {detection.type} {(detection.confidence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
          
          {/* Camera info overlay */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs text-white">
            <div className="flex items-center space-x-2">
              <Eye className="h-3 w-3 text-green-400" />
              <span>Junction A1 - Live</span>
            </div>
          </div>
          
          <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-xs text-white animate-pulse">
            ● REC
          </div>
        </div>
        
        {/* Detection summary */}
        <div className="p-3 bg-gray-700">
          <div className="text-xs text-gray-300">
            Detected: {detections.length} vehicles | 
            Processing: YOLOv8 | 
            FPS: 30 | 
            Latency: 45ms
          </div>
        </div>
      </div>
    </div>
  );
}