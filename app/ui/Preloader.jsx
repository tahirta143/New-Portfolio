'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from '@/app/lib/gsap';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.floor(Math.random() * 8) + 2;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        setTimeout(() => {
          gsap.timeline({ onComplete })
            .to('.pre-text', { y: -80, opacity: 0, duration: 0.6, ease: 'power4.inOut', stagger: 0.05 })
            .to(containerRef.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' });
        }, 400);
      }
      setCount(val);
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#050510] flex flex-col items-center justify-center">
      <div className="overflow-hidden mb-6">
        <h1 className="pre-text text-5xl md:text-8xl font-black tracking-tighter opacity-10 text-outline">MTAHIR.</h1>
      </div>
      <div className="pre-text text-5xl md:text-7xl font-mono font-light tabular-nums">{count}<span className="text-[var(--accent)]">%</span></div>
      <div className="pre-text mt-8 w-48 h-[2px] bg-neutral-900 rounded-full overflow-hidden">
        <div className="h-full bg-[var(--accent)] rounded-full transition-all duration-200" style={{ width: `${count}%` }} />
      </div>
      <p className="pre-text absolute bottom-8 text-[9px] font-mono opacity-20 uppercase tracking-widest">Loading Experience</p>
    </div>
  );
}
