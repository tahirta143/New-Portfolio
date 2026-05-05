'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { scrollState } from '@/app/lib/scrollStore';
import Preloader from '@/app/ui/Preloader';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Portfolio from '@/app/components/Portfolio';
import Timeline from '@/app/components/Timeline';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';

import { WovenLightHero } from '@/components/ui/woven-light-hero';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Global scroll → scrollStore for Three.js (can be kept if other sections use it)
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { scrollState.progress = self.progress; }
    });
  }, []);

  return (
    <main>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <WovenLightHero />
      <Navbar />
      <About />
      <Portfolio />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
