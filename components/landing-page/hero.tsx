"use client";

import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, Grid} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {Manrope} from "next/font/google";
import ContactFormButton from "./contact-form-button";
import Image from "next/image";

const manrope = Manrope({subsets: ["latin"]});

function AnimatedBox({
  initialPosition,
}: {
  initialPosition: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(...initialPosition)
  );
  const currentPosition = useRef(new THREE.Vector3(...initialPosition));

  const getAdjacentIntersection = (current: THREE.Vector3) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    return new THREE.Vector3(
      current.x + randomDirection[0] * 3,
      0.5,
      current.z + randomDirection[1] * 3
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current);
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x));
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z));
      setTargetPosition(newPosition);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      currentPosition.current.lerp(targetPosition, 0.1);
      meshRef.current.position.copy(currentPosition.current);
    }
  });

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      <lineSegments>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(1, 1, 1)]}
        />
        <lineBasicMaterial attach="material" color="#000000" linewidth={2} />
      </lineSegments>
    </mesh>
  );
}

function Scene() {
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9],
    [-3, 0.5, -3],
    [0, 0.5, 0],
    [3, 0.5, 3],
    [9, 0.5, 9],
    [-6, 0.5, 6],
    [6, 0.5, -6],
    [-12, 0.5, 0],
    [12, 0.5, 0],
    [0, 0.5, 12],
  ];

  return (
    <>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={new THREE.Color(0.55, 0.55, 0.8)}
        fadeDistance={50}
      />
      {initialPositions.map((position, index) => (
        <AnimatedBox key={index} initialPosition={position} />
      ))}
    </>
  );
}

export default function Component() {
  return (
    <div
      className={`relative w-full h-screen text-white overflow-hidden ${manrope.className}`}>
      <header className="absolute top-0 left-0 right-0 z-10 p-4"></header>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="p-8 rounded-2xl shadow-[0_0_10px_#a168d6] group transition-all duration-300 hover:shadow-[0_0_20px_#a168d6] bg-white/10 backdrop-blur-md border border-white/20">
          <h1 className="text-black dark:text-white text-6xl font-extrabold mb-4 max-w-4xl mx-auto">
            Hi, I'mHAHAHAHAHAHAHAHAasas
            <span className="block font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#7A7FEE] to-[#140c55] glitch animate-float">
              Earl Balitcha
            </span>
          </h1>
          <h2 className="text-black dark:text-gray-300 text-xl mb-10">
            I craft exceptional digital experiences with modern web
            technologies, specializing in React, Next.js, and full-stack
            development from Tarlac City, Philippines.
          </h2>
          <ContactFormButton />
        </div>
      </div>
      <Canvas
        shadows
        camera={{position: [20, 5, 10], fov: 50}}
        className="absolute inset-0">
        <Scene />
      </Canvas>
    </div>
  );
}
