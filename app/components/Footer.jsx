'use client';

import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-10 bg-[var(--bg-primary)] border-t border-neutral-900/50 relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter">
            <span className="text-[var(--accent)]">M</span>TAHIR<span className="text-[var(--accent)]">.</span>
          </div>
          <div className="flex gap-6">
            {[{ icon: Github, label: 'GitHub' }, { icon: Linkedin, label: 'LinkedIn' }, { icon: Twitter, label: 'Twitter' }].map(({ icon: Icon, label }) => (
              <a key={label} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[var(--accent)]/10 transition-all group" aria-label={label}>
                <Icon size={16} className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all" />
              </a>
            ))}
          </div>
          <div className="text-[9px] font-mono opacity-20 uppercase tracking-[0.15em]">&copy; 2026 Built with passion by Muhammad Tahir</div>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-6 md:right-10 -top-5 w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,77,77,0.3)]">
          <ArrowUp size={16} className="text-white" />
        </button>
      </div>
    </footer>
  );
}
