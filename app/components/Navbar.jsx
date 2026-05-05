'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { gsap } from '@/app/lib/gsap';

const navLinks = ['About', 'Portfolio', 'Experience', 'Contact'];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.from('.nav-reveal', { y: -40, opacity: 0, duration: 1, stagger: 0.08, ease: 'power4.out', delay: 2.2 });
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4' : 'py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center">
          <a href="#home" className="nav-reveal text-xl font-black tracking-tighter group">
            <span className="text-[var(--accent)]">M</span><span className="group-hover:text-[var(--accent)] transition-colors">TAHIR</span><span className="text-[var(--accent)]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="nav-reveal text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[var(--accent)] transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button onClick={toggleTheme}
              className="nav-reveal w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-surface)] transition-colors">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="nav-reveal">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button onClick={() => setIsOpen(!isOpen)} className="nav-reveal z-50">{isOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}
              className="text-3xl font-black uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
