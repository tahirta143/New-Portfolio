'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

function BackgroundElements() {
  const sphereRef = useRef < THREE.Mesh > (null);
  const groupRef = useRef < THREE.Group > (null);

  useGSAP(() => {
    // Animate sphere based on scroll
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        if (sphereRef.current) {
          // Rotate and scale based on scroll progress
          sphereRef.current.rotation.y = self.progress * Math.PI * 2;
          sphereRef.current.scale.setScalar(1 + self.progress * 0.5);
        }
        if (groupRef.current) {
          // Move group slightly
          groupRef.current.position.y = -self.progress * 5;
        }
      }
    });
  }, []);

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[1, 100, 100]} position={[2, 0, -2]}>
          <MeshDistortMaterial
            color="#ff4d4d"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff4d4d" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <BackgroundElements />
      </Canvas>
    </div>
  );
}
