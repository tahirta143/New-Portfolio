'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap';
import { useRef } from 'react';
import { Code2, Database, Wrench, Sparkles, GraduationCap, Layers } from 'lucide-react';

export default function About() {
  const sectionRef = useRef();
  const triggerRef = useRef();

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code2,
      skills: ['C', 'C++', 'JavaScript', 'Java', 'HTML', 'CSS', 'Python', 'Dart']
    },
    {
      title: 'Frontend',
      icon: Layers,
      skills: ['React.js', 'Next.js', 'WordPress', 'Flutter', 'Tailwind CSS']
    },
    {
      title: 'Backend & DB',
      icon: Database,
      skills: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Firebase', 'REST APIs']
    },
    {
      title: 'AI & Machine Learning',
      icon: Sparkles,
      skills: ['AI Integration', 'Prompt Engineering', 'OpenAI API', 'Gemini API', 'AI Chatbot Dev']
    },
    {
      title: 'Tools & Version Control',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'Android Studio', 'VS Code', 'Excel', 'Postman']
    }
  ];

  const education = [
    {
      degree: 'BS Software Engineering',
      institution: 'Minhaj University of Lahore',
      period: '2021 – 2025',
      desc: 'Specialized in Software Architecture, Database Systems, Web Engineering, and Mobile Development.'
    },
    {
      degree: 'Intermediate (ICS)',
      institution: 'Government Degree College',
      period: '2019 – 2021',
      desc: 'Focused on Computer Science, Mathematics, and Statistics.'
    }
  ];

  const stats = [
    { label: 'Mobile Apps Built', display: '10+' },
    { label: 'Featured Projects', display: '5' },
    { label: 'APIs Integrated', display: '100+' },
    { label: 'UI Components', display: '50+' }
  ];

  useGSAP(() => {
    const pin = gsap.fromTo(sectionRef.current, { translateX: 0 }, {
      translateX: "-200vw", ease: "none", duration: 1,
      scrollTrigger: {
        trigger: triggerRef.current, start: "top top", end: "2000 top",
        scrub: 0.6, pin: true, anticipatePin: 1
      }
    });

    return () => pin.kill();
  }, { scope: triggerRef });

  return (
    <div id="about" ref={triggerRef} className="overflow-hidden">
      <div ref={sectionRef} className="flex h-screen w-[300vw] relative bg-[var(--bg-secondary)] text-[var(--text-primary)]">

        {/* Panel 1: Story & Summary */}
        <section className="h-full w-screen flex items-center justify-center px-8 md:px-16 relative overflow-hidden">
          <div className="absolute top-16 left-16 opacity-[0.03] text-[12rem] font-black italic select-none leading-none pointer-events-none text-[var(--text-primary)]">ABOUT</div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-[1400px] w-full">
            
            {/* Profile Card */}
            <div className="lg:col-span-5 relative aspect-[4/5] max-h-[65vh] rounded-3xl overflow-hidden group shadow-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <img src="/profile.png" alt="Muhammad Tahir" className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5 border border-[var(--card-border)]">
                <h4 className="text-xl font-bold tracking-tight text-[var(--text-primary)] mb-1">Muhammad Tahir</h4>
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] mb-2">Software Engineer | Full Stack & Flutter</p>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Available for Full-time Roles & Freelance</span>
                </div>
              </div>
            </div>

            {/* Story & Education */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] mb-3 uppercase">01 / Profile Summary</h2>
                <h3 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 leading-tight text-[var(--text-primary)]">BUILDING SCALABLE<br />WEB & MOBILE SOLUTIONS.</h3>
                <p className="text-sm md:text-base opacity-80 leading-relaxed text-[var(--text-primary)]">
                  Full Stack Developer experienced in building scalable and responsive web applications using Next.js, React, Node.js, Express.js, and REST APIs. Skilled in developing modern user interfaces, building robust backend systems, and managing databases such as MongoDB and MySQL. Focused on writing clean, maintainable, and high-performance code with a strong emphasis on usability and system efficiency.
                </p>
              </div>

              {/* Education section */}
              <div className="pt-2 border-t border-[var(--card-border)]">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-3">
                  <GraduationCap size={16} />
                  <span>Education</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="glass p-4 rounded-xl border border-[var(--card-border)] hover:border-[var(--accent)]/40 transition-colors">
                      <p className="text-xs font-bold text-[var(--accent)] mb-0.5">{edu.period}</p>
                      <h4 className="text-sm font-bold tracking-tight text-[var(--text-primary)]">{edu.degree}</h4>
                      <p className="text-xs opacity-60 font-medium mb-1.5">{edu.institution}</p>
                      <p className="text-[11px] opacity-70 leading-normal">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Panel 2: Technical Skills Grid */}
        <section className="h-full w-screen flex items-center justify-center bg-[var(--bg-surface)] px-8 md:px-16 relative">
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)', backgroundSize: '40px 40px'}} />
          <div className="max-w-[1400px] w-full">
            <div className="text-center mb-10">
              <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] mb-2 uppercase">02 / Technical Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--text-primary)]">SKILLS & TECH STACK</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {skillCategories.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <div key={idx} className="glass p-6 rounded-2xl border border-[var(--card-border)] hover:border-[var(--accent)]/40 transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                        <IconComponent size={20} />
                      </div>
                      <h4 className="text-base font-bold tracking-tight mb-4 text-[var(--text-primary)]">{cat.title}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s) => (
                          <span key={s} className="bg-[var(--chip-bg)] text-[var(--chip-text)] border border-[var(--chip-border)] px-2.5 py-1 rounded-md text-[10px] font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Panel 3: Statistics */}
        <section className="h-full w-screen flex items-center justify-center px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-[1400px] w-full">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group cursor-default glass p-8 rounded-3xl border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-all">
                <div className="mb-3">
                  <div className="text-6xl md:text-8xl font-black italic text-outline group-hover:text-[var(--accent)] transition-colors duration-500">
                    {stat.display}
                  </div>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-60 text-[var(--text-primary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}


