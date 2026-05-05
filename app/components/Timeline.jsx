'use client';

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { useRef } from 'react';

const events = [
  { year: '2024', title: 'Senior Developer', company: 'Digital Dreamscape', desc: 'Leading high-end web experiences for global brands with cutting-edge tech stacks.' },
  { year: '2022', title: 'Creative Lead', company: 'Cinema Code', desc: 'Fusing motion design with scalable architecture for cinema-grade digital products.' },
  { year: '2020', title: 'Full Stack Dev', company: 'Startup Hub', desc: 'Building products from zero to one, wearing every hat from design to deployment.' },
  { year: '2018', title: 'Junior Dev', company: 'Web Agency', desc: 'Learning the foundations of the modern web and client-side engineering.' }
];

export default function Timeline() {
  const containerRef = useRef();
  const lineRef = useRef();

  useGSAP(() => {
    gsap.from(lineRef.current, {
      scaleY: 0, transformOrigin: 'top', ease: 'none',
      scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'bottom center', scrub: true }
    });
    gsap.from('.timeline-item', {
      x: (i) => i % 2 === 0 ? -80 : 80,
      opacity: 0, stagger: 0.3, duration: 1.2, ease: 'power4.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 60%' }
    });
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto relative">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="section-line" />
            <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] uppercase">04 / The Journey</h2>
            <div className="section-line" style={{transform: 'scaleX(-1)'}} />
          </div>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">MY <span className="text-outline">PATH.</span></h3>
        </div>

        <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-48 bottom-20 w-[1px] bg-gradient-to-b from-[var(--accent)] via-neutral-800 to-transparent z-0 hidden md:block" />

        <div className="space-y-16 md:space-y-32 relative z-10">
          {events.map((event, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} timeline-item`}>
                <div className={`glass rounded-2xl p-8 hover:border-[var(--accent)]/30 transition-colors group ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} max-w-md`}>
                  <p className="text-[10px] font-black tracking-widest text-[var(--accent)] mb-3">{event.year}</p>
                  <h3 className="text-3xl font-black tracking-tighter mb-2 group-hover:text-[var(--accent)] transition-colors">{event.title}</h3>
                  <h4 className="text-xs uppercase tracking-widest opacity-40 mb-6 font-bold">{event.company}</h4>
                  <p className="text-sm opacity-50 leading-relaxed">{event.desc}</p>
                </div>
              </div>
              <div className="relative flex items-center justify-center my-6 md:my-0">
                <div className="w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[var(--bg-secondary)] shadow-[0_0_20px_rgba(255,77,77,0.4)] z-10" />
                <div className="absolute w-8 h-8 rounded-full bg-[var(--accent)]/10 animate-ping" />
              </div>
              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
