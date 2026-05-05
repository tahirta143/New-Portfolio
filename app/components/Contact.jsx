'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef();
  const [status, setStatus] = useState('');

  useGSAP(() => {
    gsap.from('.contact-reveal', {
      y: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
    });
  }, { scope: containerRef });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      });
      if (res.ok) { setStatus('success'); e.target.reset(); } else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" ref={containerRef} className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 relative">
        <div>
          <div className="flex items-center gap-4 mb-6 contact-reveal">
            <div className="section-line" />
            <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] uppercase">05 / Start a Conversation</h2>
          </div>
          <h3 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-10 contact-reveal">
            LET'S BUILD<br />THE <span className="text-outline italic">FUTURE.</span>
          </h3>
          <p className="text-xl opacity-40 contact-reveal leading-relaxed mb-16 max-w-md">
            Currently accepting new projects and collaborations for 2026. Reach out and I'll get back within 24h.
          </p>

          <div className="space-y-6 contact-reveal">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-[var(--accent)]/10 transition-colors">
                <Mail size={18} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest opacity-30 font-bold mb-1">Email</p>
                <p className="text-lg font-bold group-hover:text-[var(--accent)] transition-colors">hello@portfolio.design</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                <MapPin size={18} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest opacity-30 font-bold mb-1">Location</p>
                <p className="text-lg font-bold">Pakistan</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                <Clock size={18} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest opacity-30 font-bold mb-1">Response time</p>
                <p className="text-lg font-bold">~ 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[2rem] contact-reveal relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent)]/5 rounded-full blur-3xl" />
          <div className="space-y-6 relative">
            <div className="relative group">
              <input type="text" name="name" placeholder="Your name" required
                className="w-full bg-transparent border-b border-neutral-800 py-5 text-lg outline-none focus:border-[var(--accent)] transition-colors placeholder:opacity-30" />
            </div>
            <div className="relative group">
              <input type="email" name="email" placeholder="Your email" required
                className="w-full bg-transparent border-b border-neutral-800 py-5 text-lg outline-none focus:border-[var(--accent)] transition-colors placeholder:opacity-30" />
            </div>
            <div className="relative group">
              <textarea name="message" placeholder="Tell me about your project..." rows="4" required
                className="w-full bg-transparent border-b border-neutral-800 py-5 text-lg outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder:opacity-30" />
            </div>

            <button type="submit" disabled={status === 'sending'}
              className="w-full bg-[var(--accent)] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(255,77,77,0.3)] transition-all disabled:opacity-50 group mt-4">
              {status === 'sending' ? 'SENDING...' : (
                <><span>Send Message</span><Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
              )}
            </button>
            {status === 'success' && <p className="text-green-400 font-bold text-center text-sm mt-4">✓ Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-400 font-bold text-center text-sm mt-4">Something went wrong. Try again.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
