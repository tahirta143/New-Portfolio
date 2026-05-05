'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

const categories = ['All', 'Web Design', 'E-commerce', 'AI/ML', 'Mobile Apps'];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const containerRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setProjects(data); else setProjects([]); })
      .catch(() => setProjects([]));
  }, []);

  useGSAP(() => {
    if (Array.isArray(projects) && projects.length > 0) {
      gsap.from('.project-card', {
        y: 100, opacity: 0, scale: 0.95, duration: 1.2, stagger: 0.15, ease: 'power4.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
      });
    }
  }, [projects, filter]);

  const filteredProjects = filter === 'All'
    ? (Array.isArray(projects) ? projects : [])
    : (Array.isArray(projects) ? projects.filter(p => p.category === filter) : []);

  const handleCardMouse = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <section id="portfolio" ref={containerRef} className="py-32 md:py-40 px-6 md:px-10 bg-[var(--bg-primary)] relative">
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)', backgroundSize: '50px 50px' }} />
      <div className="max-w-[1400px] mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="section-line" />
              <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] uppercase">03 / Selected Works</h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">FEATURED<br /><span className="text-outline">PROJECTS.</span></h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 ${filter === cat
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-[0_0_20px_rgba(255,77,77,0.3)]'
                  : 'border-neutral-800 hover:border-[var(--accent)]/50 hover:text-[var(--accent)]'
                  }`}
              >{cat}</button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 opacity-30">
            <p className="text-xl font-bold mb-2">No projects yet</p>
            <p className="text-sm">Add projects via the backend API</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-20 items-start">
          {filteredProjects.map((project, i) => (
            <div key={project.id} onMouseMove={handleCardMouse}
              className={`project-card project-glow group cursor-pointer ${i % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-[var(--bg-surface)]">
                <img src={project.image_url} alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6">
                  <div className="flex gap-3">
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[var(--accent)] transition-colors border border-white/20">
                        <ExternalLink size={18} className="text-white" />
                      </a>
                    )}
                    {project.repo_link && (
                      <a href={project.repo_link} target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[var(--accent)] transition-colors border border-white/20">
                        <Github size={18} className="text-white" />
                      </a>
                    )}
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                    <ArrowUpRight size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="px-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 mb-2">{project.category}</p>
                <h4 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-[var(--accent)] transition-colors mb-3">{project.title}</h4>
                {project.description && <p className="text-sm opacity-40 leading-relaxed mb-4 line-clamp-2">{project.description}</p>}
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack && typeof project.tech_stack === 'string' && project.tech_stack.split(',').map(tech => (
                    <span key={tech} className="text-[8px] font-bold uppercase tracking-widest opacity-40 border border-neutral-800 px-2.5 py-1 rounded-full">{tech.trim()}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
