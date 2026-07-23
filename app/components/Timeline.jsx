'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap';
import { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    period: 'Current',
    role: 'Flutter Developer',
    company: 'Afaq Technologies',
    highlights: [
      'Engineered 10+ cross-platform Flutter applications, delivering responsive and user-friendly mobile experiences.',
      'Created 50+ reusable UI components, accelerating development across multiple projects.',
      'Connected 100+ REST APIs and performed JSON parsing for seamless data exchange.',
      'Applied Provider & GetX for state management, improving code maintainability and reducing UI update issues.',
      'Oversaw app navigation, routing, and screen lifecycle efficiently.',
      'Used Firebase Authentication and Firestore for secure user management and cloud-based data storage.',
      'Configured Firebase Cloud Messaging (FCM) to deliver real-time push notifications.',
      'Resolved 50+ application bugs and performance issues, increasing application stability.',
      'Handled production releases and APK deployments for multiple application updates.'
    ]
  },
  {
    period: '2025',
    role: 'Full Stack Developer',
    company: 'Core Tech',
    highlights: [
      'Enhanced and maintained full-stack web applications using Next.js and Node.js.',
      'Built responsive and modern UI components using React and Tailwind CSS.',
      'Designed and integrated RESTful APIs for seamless frontend-backend communication.',
      'Oversaw database operations using MongoDB and MySQL.',
      'Applied secure authentication and user session management.',
      'Optimized application performance and loading speed.'
    ]
  },
  {
    period: '2025',
    role: 'Full Stack Developer',
    company: 'Heap ware',
    highlights: [
      'Constructed 5+ responsive web applications using Next.js and React.js.',
      'Architected and maintained RESTful APIs with Node.js and Express.js, supporting frontend and mobile applications.',
      'Structured MongoDB database schemas and optimized queries, improving data retrieval performance.',
      'Incorporated third-party APIs to enhance application functionality and user experience.',
      'Leveraged Git and GitHub for version control and collaborative development.'
    ]
  }
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
      y: 60, opacity: 0, stagger: 0.25, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
    });
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <div className="max-w-[1200px] mx-auto relative">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="section-line" />
            <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] uppercase">03 / Work History</h2>
            <div className="section-line" style={{transform: 'scaleX(-1)'}} />
          </div>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-[var(--text-primary)]">PROFESSIONAL <span className="text-outline">EXPERIENCE.</span></h3>
        </div>

        <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-48 bottom-20 w-[1px] bg-gradient-to-b from-[var(--accent)] via-neutral-500 to-transparent z-0 hidden md:block" />

        <div className="space-y-12 md:space-y-20 relative z-10">
          {experiences.map((exp, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-start w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} timeline-item`}>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <div className="glass rounded-3xl p-8 hover:border-[var(--accent)]/40 transition-all border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl group">
                  <div className={`flex items-center gap-2 mb-3 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border border-[var(--accent)]/20">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-1 group-hover:text-[var(--accent)] transition-colors text-[var(--card-title)]">{exp.role}</h3>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 font-mono mb-6 flex items-center gap-1.5 justify-start md:justify-inherit text-[var(--text-primary)]">
                    <Briefcase size={13} className="text-[var(--accent)] inline" />
                    <span>{exp.company}</span>
                  </h4>
                  
                  <ul className="space-y-2.5 text-left text-xs md:text-sm opacity-80 leading-relaxed text-[var(--text-primary)]">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Timeline Center Dot */}
              <div className="relative flex items-center justify-center my-6 md:my-0 shrink-0 self-center">
                <div className="w-5 h-5 rounded-full bg-[var(--accent)] border-4 border-[var(--bg-secondary)] shadow-[0_0_20px_rgba(255,77,77,0.6)] z-10" />
                <div className="absolute w-10 h-10 rounded-full bg-[var(--accent)]/20 animate-ping" />
              </div>

              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


