'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function PrismaticCrystalCore() {
  const crystalMeshRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const ringRef = useRef<THREE.Group>(null!);

  // Electric Cyan & Purple neon prismatic particle cloud (PRD v1.0.0)
  const [particlesPos, particlesColors] = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color('#38BDF8');
    const purple = new THREE.Color('#818CF8');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2.4 + (Math.random() - 0.5) * 0.5;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const rand = Math.random();
      const chosen = rand < 0.45 ? cyan : rand < 0.8 ? purple : white;
      colors[i * 3] = chosen.r;
      colors[i * 3 + 1] = chosen.g;
      colors[i * 3 + 2] = chosen.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (crystalMeshRef.current) {
      crystalMeshRef.current.rotation.y += delta * 0.2;
      crystalMeshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.35;
      innerCoreRef.current.rotation.z += delta * 0.15;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
      ringRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group>
      {/* Outer Prismatic Particle Field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlesPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[particlesColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main Prismatic Crystal Core */}
      <mesh ref={crystalMeshRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color="#f0f9ff"
          roughness={0.04}
          transmission={0.94}
          thickness={1.3}
          ior={1.56}
          specularIntensity={1.2}
          specularColor={new THREE.Color('#38BDF8')}
          transparent
          opacity={0.92}
          wireframe={false}
        />
      </mesh>

      {/* Electric Cyan Neon Wireframe Edge Lighting (PRD 4.2) */}
      <mesh>
        <octahedronGeometry args={[1.515, 0]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.45} />
      </mesh>

      {/* Internal Purple Singularity Lattice (PRD 4.2) */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color="#818CF8" wireframe transparent opacity={0.65} />
      </mesh>

      {/* Central Cyan High-Intensity Singularity Light */}
      <pointLight color="#38BDF8" intensity={5} distance={7} decay={2} />
      <pointLight color="#818CF8" intensity={2} distance={5} decay={2} />

      {/* Prismatic Orbiting Rings with Cyan & Violet Neon Accents */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.008, 16, 120]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.8, 0.007, 16, 120]} />
          <meshBasicMaterial color="#818CF8" transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  );
}

export default function PrismCore3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -5, -3]} intensity={0.5} color="#71717a" />
        <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
          <PrismaticCrystalCore />
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.8}
        />
      </Canvas>
      <div className="absolute bottom-4 right-4 pointer-events-none text-[10px] font-mono tracking-widest text-zinc-400 bg-black/80 px-2.5 py-1 rounded border border-white/10 backdrop-blur-md">
        CORE SINGULARITY // 4.0-PROD
      </div>
    </div>
  );
}

