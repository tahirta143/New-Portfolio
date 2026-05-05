'use client';

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [projectCount, setProjectCount] = useState(0);
  const sectionRef = useRef();
  const triggerRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjectCount(data.length);
      })
      .catch(() => setProjectCount(0));
  }, []);

  const skills = [
    'React / Next.js', 'Node.js', 'Three.js / R3F', 'React Native',
    'GSAP Motion', 'Flutter', 'TypeScript', 'MongoDB', 'Express.js', 'Tailwind CSS'
  ];

  const stats = [
    { label: 'Years Experience', value: 2, suffix: '+' },
    { label: 'Projects Completed', value: projectCount, suffix: '' },
    { label: 'Happy Clients', value: 5, suffix: '' },
    { label: 'Lines of Code', value: 20, suffix: 'k+' }
  ];

  useGSAP(() => {
    const pin = gsap.fromTo(sectionRef.current, { translateX: 0 }, {
      translateX: "-200vw", ease: "none", duration: 1,
      scrollTrigger: {
        trigger: triggerRef.current, start: "top top", end: "2000 top",
        scrub: 0.6, pin: true, anticipatePin: 1
      }
    });

    stats.forEach((_, i) => {
      gsap.from(`.stat-num-${i}`, {
        textContent: 0, duration: 2, ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: { trigger: triggerRef.current, start: "left center", containerAnimation: pin }
      });
    });

    return () => pin.kill();
  }, { scope: triggerRef });

  return (
    <div id="about" ref={triggerRef} className="overflow-hidden">
      <div ref={sectionRef} className="flex h-screen w-[300vw] relative bg-[var(--bg-secondary)]">

        {/* Panel 1: Story */}
        <section className="h-full w-screen flex items-center justify-center px-8 md:px-20 relative overflow-hidden">
          <div className="absolute top-16 left-16 opacity-[0.03] text-[12rem] font-black italic select-none leading-none">STORY</div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-[1400px]">
            <div className="relative aspect-[3/4] max-h-[70vh] rounded-3xl overflow-hidden group">
              <img src="/profile.png" alt="Muhammad Tahir" className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5">
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] mb-1">Based in Pakistan</p>
                <p className="text-sm opacity-60">Available for freelance & collaboration</p>
              </div>
            </div>
            <div>
              <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] mb-6 uppercase">01 / Behind the Screen</h2>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.95]">CRAFTING DIGITAL<br />NARRATIVES.</h3>
              <p className="text-lg opacity-50 leading-relaxed max-w-lg mb-10">
                I don't just write code; I build experiences. My philosophy centers on the intersection of technical excellence and emotional design — creating software that feels alive.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="bg-[var(--bg-surface)] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/10 hover:border-[var(--accent)]/40 transition-colors">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Panel 2: Philosophy */}
        <section className="h-full w-screen flex items-center justify-center bg-[var(--bg-surface)] px-10 relative">
          <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)', backgroundSize: '40px 40px'}} />
          <div className="text-center max-w-4xl relative">
            <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] mb-12 uppercase italic">02 / The Philosophy</h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-10">
              "DESIGN IS NOT JUST HOW IT <span className="text-outline">LOOKS</span>, BUT HOW IT <span className="italic text-[var(--accent)]">FEELS</span> UNDER THE SCROLL."
            </p>
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mx-auto" />
          </div>
        </section>

        {/* Panel 3: Stats */}
        <section className="h-full w-screen flex items-center justify-center px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-[1400px] w-full">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="overflow-hidden mb-4">
                  <div className={`stat-num-${i} text-6xl md:text-8xl font-black italic text-outline group-hover:text-[var(--accent)] transition-colors duration-500`}>
                    {stat.value}
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-30">{stat.suffix} {stat.label}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
