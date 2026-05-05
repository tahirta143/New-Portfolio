"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';

import { useTheme } from '@/app/components/ThemeProvider';

// --- Main Hero Component ---
export const WovenLightHero = () => {
  const { theme } = useTheme();
  const textControls = useAnimation();
  const buttonControls = useAnimation();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Add a more elegant font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 1.5,
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));
    buttonControls.start({
        opacity: 1,
        transition: { delay: 2.5, duration: 1 }
    });

    return () => {
        if (document.head.contains(link)) {
            document.head.removeChild(link);
        }
    }
  }, [textControls, buttonControls]);

  const headline = "Muhammad Tahir";
  
  return (
    <div className={`relative flex h-screen w-full flex-col items-center justify-center overflow-hidden transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-[#f8f9fa]'}`}>
      <WovenCanvas theme={theme} />
      <HeroNav isDark={isDark} />
      <div className="relative z-10 text-center px-4">
        <h1 
          className={`text-6xl md:text-8xl transition-colors duration-700 ${isDark ? 'text-white' : 'text-slate-900'}`} 
          style={{ 
            fontFamily: "'Playfair Display', serif", 
            textShadow: isDark ? '0 0 50px rgba(255, 255, 255, 0.3)' : '0 0 30px rgba(0, 0, 0, 0.1)' 
          }}
        >
            {headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block">
                    {word.split("").map((char, j) => (
                        <motion.span key={j} custom={i * 5 + j} initial={{ opacity: 0, y: 50 }} animate={textControls} style={{ display: 'inline-block' }}>
                            {char}
                        </motion.span>
                    ))}
                    {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </h1>
        <motion.p
          custom={headline.length}
          initial={{ opacity: 0, y: 30 }}
          animate={textControls}
          className={`mx-auto mt-6 max-w-xl text-2xl font-medium tracking-widest uppercase transition-colors duration-700 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Software Engineer
        </motion.p>
      </div>
    </div>
  );
};

// --- Navigation Component ---
const HeroNav = ({ isDark }) => {
    return (
        <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
            className="absolute top-0 left-0 right-0 z-20 p-6"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {/* <span className={`text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>⎎</span> */}
                </div>
            </div>
        </motion.nav>
    );
};

// --- Three.js Canvas Component ---
const WovenCanvas = ({ theme }) => {
  const mountRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    // --- Woven Silk ---
    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    const torusPos = torusKnot.attributes.position;
    const torusCount = torusPos.count;

    for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % torusCount;
        const x = torusPos.getX(vertexIndex);
        const y = torusPos.getY(vertexIndex);
        const z = torusPos.getZ(vertexIndex);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        const color = new THREE.Color();
        // Unified color logic for both modes
        const h = Math.random();
        const s = 0.6;
        const l = 0.4;
        color.setHSL(h, s, l);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        blending: THREE.NormalBlending,
        transparent: true,
        opacity: 0.7,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const animate = () => {
        animationId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const cx = positions[ix];
            const cy = positions[iy];
            const cz = positions[iz];

            const dx = cx - mouseWorld.x;
            const dy = cy - mouseWorld.y;
            const dz = cz - mouseWorld.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 1.5) {
                const force = (1.5 - dist) * 0.01;
                velocities[ix] += (dx / dist) * force;
                velocities[iy] += (dy / dist) * force;
                velocities[iz] += (dz / dist) * force;
            }

            // Return to original position
            velocities[ix] += (originalPositions[ix] - cx) * 0.001;
            velocities[iy] += (originalPositions[iy] - cy) * 0.001;
            velocities[iz] += (originalPositions[iz] - cz) * 0.001;
            
            // Damping
            velocities[ix] *= 0.95;
            velocities[iy] *= 0.95;
            velocities[iz] *= 0.95;

            positions[ix] += velocities[ix];
            positions[iy] += velocities[iy];
            positions[iz] += velocities[iz];
        }
        geometry.attributes.position.needsUpdate = true;

        points.rotation.y = elapsedTime * 0.05;
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
  }, [theme]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};
