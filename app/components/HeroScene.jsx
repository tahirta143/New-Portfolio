'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { scrollState } from '@/app/lib/scrollStore';

const COUNT = 4000;
const PHI = (1 + Math.sqrt(5)) / 2;

/* ── shape generators using parametric math ── */

function genSphere(n) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = PHI * i * Math.PI * 2;
    p[i * 3] = Math.cos(theta) * r * 3;
    p[i * 3 + 1] = y * 3;
    p[i * 3 + 2] = Math.sin(theta) * r * 3;
  }
  return p;
}

function genTorus(n) {
  const p = new Float32Array(n * 3);
  const R = 3, r = 1.2;
  for (let i = 0; i < n; i++) {
    const u = (i / n) * Math.PI * 2 * 4;
    const v = ((i * PHI) % 1) * Math.PI * 2;
    p[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
    p[i * 3 + 1] = r * Math.sin(v);
    p[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
  }
  return p;
}

function genHelix(n) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 10;
    const strand = i % 2 === 0 ? 0 : Math.PI;
    p[i * 3] = Math.cos(t + strand) * 2.2;
    p[i * 3 + 1] = (i / n - 0.5) * 8;
    p[i * 3 + 2] = Math.sin(t + strand) * 2.2;
  }
  return p;
}

function genGalaxy(n) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const radius = Math.pow(Math.random(), 0.5) * 5;
    const arm = (i % 3) * ((Math.PI * 2) / 3);
    const angle = arm + radius * 1.2 + (Math.random() - 0.5) * 0.4;
    p[i * 3] = Math.cos(angle) * radius;
    p[i * 3 + 1] = (Math.random() - 0.5) * 0.4 * (1 - radius / 5);
    p[i * 3 + 2] = Math.sin(angle) * radius;
  }
  return p;
}

/* ── Particle system ── */

function Particles() {
  const ref = useRef();

  const shapes = useMemo(() => [genSphere(COUNT), genTorus(COUNT), genHelix(COUNT), genGalaxy(COUNT)], []);
  const positions = useMemo(() => new Float32Array(shapes[0]), [shapes]);
  const sizes = useMemo(() => {
    const s = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) s[i] = Math.random() * 0.5 + 0.3;
    return s;
  }, []);
  const colors = useMemo(() => {
    const c = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const col = new THREE.Color().setHSL((i / COUNT) * 0.15 + 0.95, 0.9, 0.65);
      c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
    }
    return c;
  }, []);

  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const prog = scrollState.progress;
    const seg = Math.min(Math.floor(prog * 3.999), 2);
    const local = THREE.MathUtils.clamp((prog * 3 - seg), 0, 1);
    const ease = local * local * (3 - 2 * local); // smoothstep

    const from = shapes[seg], to = shapes[seg + 1];
    const pos = ref.current.geometry.attributes.position.array;
    const col = ref.current.geometry.attributes.color.array;

    // Smooth mouse values for a more fluid feel (Lerp)
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, scrollState.mouseX, 0.1);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, -scrollState.mouseY, 0.1);
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Map normalized mouse (-1 to 1) to approximate 3D world coords at z=0
    // Camera is at z=7, fov=65. 
    const mouseX3D = mx * 4.5;
    const mouseY3D = my * 4.5;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const wave = Math.sin(t * 0.6 + i * 0.008) * 0.08;

      // Base morphed position
      const bx = from[i3] + (to[i3] - from[i3]) * ease + wave;
      const by = from[i3 + 1] + (to[i3 + 1] - from[i3 + 1]) * ease + Math.cos(t * 0.4 + i * 0.005) * 0.06;
      const bz = from[i3 + 2] + (to[i3 + 2] - from[i3 + 2]) * ease + Math.sin(t * 0.3 + i * 0.01) * 0.04;

      // Mouse Repulsion (Antigravity)
      const dx = bx - mouseX3D;
      const dy = by - mouseY3D;
      const distSq = dx * dx + dy * dy;
      const radius = 2.5;
      const radiusSq = radius * radius;

      let ox = 0, oy = 0;
      if (distSq < radiusSq) {
        const force = (1 - Math.sqrt(distSq) / radius) * 0.8;
        ox = dx * force;
        oy = dy * force;
      }

      pos[i3] = bx + ox;
      pos[i3 + 1] = by + oy;
      pos[i3 + 2] = bz;

      // color shift based on scroll
      const hue = ((i / COUNT) * 0.15 + 0.95 + prog * 0.3) % 1;
      const c = new THREE.Color().setHSL(hue, 0.85, 0.6);
      col[i3] = c.r; col[i3 + 1] = c.g; col[i3 + 2] = c.b;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.attributes.color.needsUpdate = true;

    // Ambient drift
    ref.current.rotation.y = t * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={COUNT} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={COUNT} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ── Floating ring ── */

function FloatingRing() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.2;
    ref.current.rotation.z = t * 0.1;
    ref.current.position.y = Math.sin(t * 0.5) * 0.4;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.8, 0.04, 16, 120]} />
      <meshStandardMaterial
        color="#f0e9e9"
        emissive="#f0e9e9"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ── Scene wrapper ── */

export default function HeroScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 65 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <Particles />
        <FloatingRing />
      </Canvas>
    </div>
  );
}
