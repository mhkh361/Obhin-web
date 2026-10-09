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

  // Monochrome prismatic particle cloud
  const [particlesPos, particlesColors] = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const white = new THREE.Color('#ffffff');
    const zinc = new THREE.Color('#a1a1aa');
    const prismHigh = new THREE.Color('#e4e4e7');

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2.4 + (Math.random() - 0.5) * 0.5;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosen = Math.random() < 0.6 ? white : Math.random() < 0.85 ? zinc : prismHigh;
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
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main Prismatic Crystal Core (Icosahedron / Octahedron with transmission) */}
      <mesh ref={crystalMeshRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.02}
          transmission={0.96}
          thickness={1.2}
          ior={1.54}
          specularIntensity={1}
          specularColor={new THREE.Color('#ffffff')}
          transparent
          opacity={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Refraction Silhouette */}
      <mesh>
        <octahedronGeometry args={[1.51, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Internal Singularity Lattice */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.6} />
      </mesh>

      {/* Central High-Intensity Singularity Light */}
      <pointLight color="#ffffff" intensity={4} distance={6} decay={2} />

      {/* Prismatic Orbiting Rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.006, 16, 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.8, 0.005, 16, 120]} />
          <meshBasicMaterial color="#a1a1aa" transparent opacity={0.25} />
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

