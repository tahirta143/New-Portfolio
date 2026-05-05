'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const container = useRef();
  const titleRef = useRef();

  useEffect(() => {
    const handleMouse = (e) => {
      const img = document.querySelector('.profile-img-wrap');
      if (!img) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      img.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 2.5 });

    const chars = titleRef.current.innerText.split('');
    titleRef.current.innerHTML = chars
      .map((c) => `<span class="hero-char inline-block">${c === ' ' ? '&nbsp;' : c}</span>`)
      .join('');

    tl.from('.hero-char', {
      y: 120, opacity: 0, filter: 'blur(12px)', rotateX: -90,
      stagger: 0.025, duration: 1.4, ease: 'expo.out'
    })
    .from('.hero-sub', { y: 40, opacity: 0, filter: 'blur(5px)', duration: 1, ease: 'power3.out' }, '-=1')
    .from('.hero-cta', { scale: 0.8, opacity: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.8')
    .from('.hero-scroll', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5');

    gsap.to('.hero-bg', {
      yPercent: 40, ease: 'none',
      scrollTrigger: { trigger: container.current, start: 'top top', end: 'bottom top', scrub: true }
    });
  }, { scope: container });

  return (
    <section ref={container} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-10">
      <div className="hero-bg absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] rounded-full blur-[200px] animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#6C63FF] rounded-full blur-[160px] opacity-40" />
      </div>

      <div className="max-w-[1400px] w-full flex flex-col items-center text-center">
        {/* Text content centered */}
        <div className="max-w-4xl">
          <p className="hero-sub text-[var(--accent)] font-mono tracking-[0.4em] mb-6 uppercase text-[10px] md:text-xs">
            MUHAMMAD TAHIR — Software Engineer
          </p>
          <h1 ref={titleRef} className="text-[13vw] md:text-[5.5vw] font-black leading-[0.9] tracking-tighter mb-8 overflow-hidden">
            CRAFTING DIGITAL EXPERIENCES
          </h1>
          <div className="hero-sub max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-2xl font-medium opacity-50 leading-relaxed">
              Building immersive web applications where <span className="text-[var(--text-primary)] font-bold">code meets art</span>. Specialized in high-performance apps with advanced motion design & <span className="text-[var(--accent)]">Three.js</span>.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="#portfolio" className="hero-cta bg-[var(--accent)] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(255,77,77,0.4)] transition-all duration-300">
              View Projects
            </a>
            <a href="#contact" className="hero-cta border border-[var(--text-primary)]/30 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300">
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 flex flex-col items-center">
        <p className="text-[9px] uppercase tracking-[0.3em] mb-3 font-bold">Scroll to explore</p>
        <div className="w-5 h-8 rounded-full border border-[var(--text-primary)]/40 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-[var(--accent)] animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
