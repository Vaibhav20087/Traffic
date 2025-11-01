import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

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

interface TrafficMapProps {
  trafficData: {
    lights: TrafficLight[];
    vehicles: Vehicle[];
  };
}

function TrafficLight({ position, state }: { position: [number, number, number]; state: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const getColor = () => {
    switch (state) {
      case 'red': return '#ef4444';
      case 'yellow': return '#f59e0b';
      case 'green': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <group position={position}>
      {/* Traffic Light Pole */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      {/* Traffic Light Box */}
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Light */}
      <mesh position={[0, 0.5, 0.11]}>
        <circleGeometry args={[0.1]} />
        <meshBasicMaterial color={getColor()} />
      </mesh>
      
      {/* Light Glow */}
      <pointLight
        position={[0, 0.5, 0.2]}
        color={getColor()}
        intensity={0.8}
        distance={3}
      />
    </group>
  );
}

function Vehicle({ position, type, direction }: { position: [number, number, number]; type: string; direction: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = 0.5;
      meshRef.current.position.x += Math.cos(direction) * speed * delta;
      meshRef.current.position.z += Math.sin(direction) * speed * delta;
      
      // Wrap around the scene
      if (meshRef.current.position.x > 5) meshRef.current.position.x = -5;
      if (meshRef.current.position.x < -5) meshRef.current.position.x = 5;
      if (meshRef.current.position.z > 5) meshRef.current.position.z = -5;
      if (meshRef.current.position.z < -5) meshRef.current.position.z = 5;
    }
  });

  const getColor = () => {
    switch (type) {
      case 'car': return '#3b82f6';
      case 'truck': return '#dc2626';
      case 'bus': return '#f59e0b';
      case 'bike': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getSize = () => {
    switch (type) {
      case 'car': return [0.4, 0.2, 0.8];
      case 'truck': return [0.5, 0.3, 1.2];
      case 'bus': return [0.6, 0.3, 1.5];
      case 'bike': return [0.2, 0.1, 0.4];
      default: return [0.4, 0.2, 0.8];
    }
  };

  const size = getSize() as [number, number, number];

  return (
    <mesh ref={meshRef} position={position} rotation={[0, direction, 0]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={getColor()} />
    </mesh>
  );
}

function Road() {
  return (
    <>
      {/* Main Roads */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 10]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[1, 10]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      {/* Road Markings */}
      <mesh position={[0, -0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 10]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      
      <mesh position={[0, -0.09, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.1, 10]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
    </>
  );
}

export function TrafficMap({ trafficData }: TrafficMapProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 h-96">
      <h3 className="text-lg font-semibold text-white mb-4">Real-time Traffic Visualization</h3>
      <div className="h-80 bg-gray-900 rounded">
        <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Road />
          
          {trafficData.lights.map((light) => (
            <TrafficLight
              key={light.id}
              position={light.position}
              state={light.state}
            />
          ))}
          
          {trafficData.vehicles.map((vehicle) => (
            <Vehicle
              key={vehicle.id}
              position={vehicle.position}
              type={vehicle.type}
              direction={vehicle.direction}
            />
          ))}
          
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Canvas>
      </div>
    </div>
  );
}