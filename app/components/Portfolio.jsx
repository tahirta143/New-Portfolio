'use client';

import { useState } from 'react';
import { Code2, Globe, Smartphone, ShieldCheck, Activity, Github, CheckCircle2, X } from 'lucide-react';

const categories = ['All', 'Mobile Apps', 'Web Apps', 'Full Stack'];

const staticProjects = [
  {
    id: 'payroll-app',
    title: 'Payroll & Attendance App',
    category: 'Mobile Apps',
    badge: 'FLAGSHIP',
    icon: Code2,
    tech_stack: ['Flutter', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    description: 'Tailored mobile payroll & employee attendance management system designed to enforce Role-Based Access Control (RBAC), track daily attendance, automate salary slip generation, and streamline leave requests.',
    highlights: [
      'Enforced Role-Based Access Control (RBAC) to manage user roles and permissions.',
      'Built employee attendance management for tracking daily attendance records.',
      'Added salary management functionality for maintaining employee salary information.',
      'Automated salary slip generation for employees based on payroll data.',
      'Created leave and short leave management for handling employee requests.',
      'Connected REST APIs linking Flutter frontend with Node.js & Express.js backend.'
    ],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    repo_link: 'https://github.com/tahirta143'
  },
  {
    id: 'task-management',
    title: 'Task Management System',
    category: 'Full Stack',
    badge: 'ENTERPRISE',
    icon: Activity,
    tech_stack: ['React.js', 'Flutter', 'Node.js', 'Socket.IO', 'MySQL', 'FCM', 'TailwindCSS'],
    description: 'High-performance real-time project management workspace featuring interactive Kanban boards, automated task assignments, employee performance analytics, and Socket.IO powered instant chat.',
    highlights: [
      'Built dashboards, project & task management, task assignment, Kanban boards, progress tracking, and employee performance.',
      'Integrated task-level real-time chat using Socket.IO for team collaboration.',
      'Integrated REST APIs, JWT-based authentication, RBAC, and MySQL database.',
      'Configured Firebase Cloud Messaging (FCM) for real-time push notifications.'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    repo_link: 'https://github.com/tahirta143'
  },
  {
    id: 'company-portfolio',
    title: 'Company Portfolio Website',
    category: 'Web Apps',
    badge: 'CORE',
    icon: Globe,
    tech_stack: ['Next.js', 'React', 'Node.js', 'TypeScript', 'TailwindCSS'],
    description: 'High-performance, secure, responsive, and SEO-optimized web application built with modern frontend and backend frameworks for flawless showcase and client conversion.',
    highlights: [
      'Designed and built a responsive company portfolio website using Next.js, React.js, TypeScript, and Tailwind CSS.',
      'Showcases company services, projects, and contact information with a modern, mobile-friendly UI.',
      'Optimized application performance, asset loading speed, and component modularity.'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    repo_link: 'https://github.com/tahirta143'
  },
  {
    id: 'hims',
    title: 'HIMS Hospital Management',
    category: 'Full Stack',
    badge: 'ENTERPRISE',
    icon: ShieldCheck,
    tech_stack: ['React.js', 'Vite', 'Flutter', 'SQLite', 'MUI', 'ESC/POS Printing'],
    description: 'Architected enterprise-level Hospital Information Management System supporting OPD, patient records, EMR prescriptions, billing, pharmacy, inventory, IPD, and thermal receipt printing.',
    highlights: [
      'Architected enterprise HIMS supporting hospital operations including OPD, EMR prescriptions, billing, pharmacy, and IPD.',
      'Enforced Role-Based Access Control (RBAC) with granular permissions for hospital staff.',
      'Developed medical camp management for patient registration, medical consultations, and camp reporting.',
      'Integrated thermal receipt printing (ESC/POS) & PDF generation for clinical & billing receipts.'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    repo_link: 'https://github.com/tahirta143'
  },
  {
    id: 'contacts-app',
    title: 'Contacts & Event Manager',
    category: 'Mobile Apps',
    badge: 'FLAGSHIP',
    icon: Smartphone,
    tech_stack: ['Flutter', 'React Native', 'Node.js', 'MySQL', 'Firebase FCM'],
    description: 'Elegantly designed native and cross-platform mobile application for contact and event management, featuring scheduled reminders and real-time push notifications.',
    highlights: [
      'Built a full-stack Flutter mobile application featuring CRUD operations for contacts.',
      'Event creation and scheduling with organized event views by date, day, and event type.',
      'Configured Firebase Cloud Messaging (FCM) push notifications for event reminders.',
      'Node.js, Express.js, and MySQL backend handling data storage and REST APIs.'
    ],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    repo_link: 'https://github.com/tahirta143'
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = filter === 'All'
    ? staticProjects
    : staticProjects.filter(p => {
        if (filter === 'Mobile Apps') return p.category === 'Mobile Apps' || p.tech_stack.includes('Flutter');
        if (filter === 'Web Apps') return p.category === 'Web Apps' || p.tech_stack.includes('React.js') || p.tech_stack.includes('Next.js');
        if (filter === 'Full Stack') return p.category === 'Full Stack' || p.tech_stack.includes('Node.js');
        return p.category === filter;
      });

  return (
    <section id="portfolio" className="py-32 md:py-40 px-6 md:px-10 bg-[var(--bg-primary)] text-[var(--text-primary)] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-[var(--card-border)] pb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="section-line" />
              <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] uppercase">Featured Portfolio</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--text-primary)]">
              ENGINEERED <span className="text-outline">SOLUTIONS.</span>
            </h3>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl border transition-all duration-300 ${filter === cat
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-[0_0_20px_rgba(255,77,77,0.3)]'
                  : 'border-[var(--card-border)] bg-[var(--chip-bg)] text-[var(--chip-text)] hover:border-[var(--accent)]/40'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {filteredProjects.map((project) => {
            const IconComp = project.icon;
            return (
              <div 
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="bg-[var(--card-bg)] rounded-[2rem] border border-[var(--card-border)] p-5 md:p-6 flex flex-col justify-between group hover:border-[var(--accent)]/50 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-[var(--bg-surface)] border border-[var(--card-border)]">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                    />
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[var(--bg-surface)] border border-[var(--card-border)] flex items-center justify-center text-[var(--accent)] shadow-sm">
                      <IconComp size={20} />
                    </div>
                    <span className="px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[10px] font-mono font-bold tracking-widest text-[var(--accent)] uppercase">
                      {project.badge}
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--card-title)] group-hover:text-[var(--accent)] transition-colors mb-3">
                    {project.title}
                  </h4>

                  <p className="text-xs md:text-sm text-[var(--card-desc)] leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--card-border)]">
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-[var(--chip-bg)] text-[var(--chip-text)] text-[11px] font-mono border border-[var(--chip-border)] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-[2rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative shadow-2xl">
            <button 
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent)] border border-[var(--card-border)] text-[var(--text-primary)] hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            <span className="inline-block px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-xs font-mono font-bold tracking-widest text-[var(--accent)] uppercase mb-4">
              {activeModalProject.badge} • {activeModalProject.category}
            </span>

            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[var(--card-title)]">
              {activeModalProject.title}
            </h3>

            <p className="text-sm md:text-base text-[var(--card-desc)] leading-relaxed mb-6">
              {activeModalProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-3 font-bold">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tech_stack.map((tech, idx) => (
                  <span key={idx} className="bg-[var(--chip-bg)] text-[var(--chip-text)] border border-[var(--chip-border)] text-xs font-mono px-3.5 py-1.5 rounded-xl font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-3 font-bold">Key Responsibilities & Deliverables</h4>
              <ul className="space-y-3">
                {activeModalProject.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-[var(--text-primary)] leading-relaxed bg-[var(--bg-surface)] p-3.5 rounded-xl border border-[var(--card-border)]">
                    <CheckCircle2 size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 border-t border-[var(--card-border)]">
              <a 
                href={activeModalProject.repo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[var(--accent)]/90 transition-colors"
              >
                <Github size={18} />
                View Repository
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
