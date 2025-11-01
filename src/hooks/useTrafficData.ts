import { useState, useEffect } from 'react';

interface TrafficLight {
  id: string;
  position: [number, number, number];
  state: 'red' | 'yellow' | 'green';
  timing: number;
}

interface Vehicle {
  id: string;
  position: [number, number, number];
  type: 'car' | 'truck' | 'bus' | 'bike';
  speed: number;
  direction: number;
}

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

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  description: string;
  location: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high';
}

export function useTrafficData() {
  const [trafficData, setTrafficData] = useState({
    lights: [] as TrafficLight[],
    vehicles: [] as Vehicle[],
  });

  const [stats, setStats] = useState<Stats>({
    totalVehicles: 0,
    avgWaitTime: 0,
    congestionLevel: 0,
    vehicleTypes: {
      car: 0,
      truck: 0,
      bus: 0,
      bike: 0,
    },
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Initialize traffic lights
  useEffect(() => {
    const initialLights: TrafficLight[] = [
      { id: 'light-1', position: [2, 0.5, 0], state: 'green', timing: 30 },
      { id: 'light-2', position: [-2, 0.5, 0], state: 'red', timing: 30 },
      { id: 'light-3', position: [0, 0.5, 2], state: 'red', timing: 25 },
      { id: 'light-4', position: [0, 0.5, -2], state: 'green', timing: 25 },
    ];

    setTrafficData(prev => ({ ...prev, lights: initialLights }));
  }, []);

  // Simulate traffic light cycles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => ({
        ...prev,
        lights: prev.lights.map(light => {
          const states: ('red' | 'yellow' | 'green')[] = ['red', 'yellow', 'green'];
          const currentIndex = states.indexOf(light.state);
          const nextState = states[(currentIndex + 1) % states.length];
          
          return {
            ...light,
            state: nextState,
          };
        }),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate vehicles
  useEffect(() => {
    const interval = setInterval(() => {
      const vehicleTypes = ['car', 'truck', 'bus', 'bike'] as const;
      const numVehicles = Math.floor(Math.random() * 8) + 4;
      
      const vehicles: Vehicle[] = Array.from({ length: numVehicles }, (_, i) => ({
        id: `vehicle-${Date.now()}-${i}`,
        position: [
          Math.random() * 8 - 4,
          0.1,
          Math.random() * 8 - 4,
        ] as [number, number, number],
        type: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2,
      }));

      setTrafficData(prev => ({ ...prev, vehicles }));

      // Update stats
      const vehicleTypeCounts = vehicles.reduce(
        (acc, vehicle) => {
          acc[vehicle.type]++;
          return acc;
        },
        { car: 0, truck: 0, bus: 0, bike: 0 }
      );

      setStats({
        totalVehicles: vehicles.length,
        avgWaitTime: Math.floor(Math.random() * 30) + 15,
        congestionLevel: Math.min(vehicles.length * 10 + Math.random() * 20, 100),
        vehicleTypes: vehicleTypeCounts,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate alerts
  useEffect(() => {
    const alertTemplates = [
      {
        type: 'warning' as const,
        title: 'Heavy Traffic Detected',
        description: 'Congestion level above normal at intersection',
        location: 'Junction A1',
        severity: 'medium' as const,
      },
      {
        type: 'error' as const,
        title: 'Camera Malfunction',
        description: 'CCTV feed interrupted, switching to backup',
        location: 'Junction B2',
        severity: 'high' as const,
      },
      {
        type: 'info' as const,
        title: 'Emergency Vehicle Detected',
        description: 'Ambulance approaching, adjusting signal timing',
        location: 'Junction A1',
        severity: 'high' as const,
      },
      {
        type: 'success' as const,
        title: 'Traffic Flow Optimized',
        description: 'AI successfully reduced wait times by 15%',
        location: 'System Wide',
        severity: 'low' as const,
      },
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          ...template,
          timestamp: Date.now(),
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateSignalTiming = (intersection: string, timing: number) => {
    setTrafficData(prev => ({
      ...prev,
      lights: prev.lights.map(light =>
        light.id.includes(intersection) ? { ...light, timing } : light
      ),
    }));
  };

  return {
    trafficData,
    stats,
    alerts,
    updateSignalTiming,
  };
}