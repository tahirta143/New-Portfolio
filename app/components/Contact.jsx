'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone, Linkedin, Github, CheckCircle } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef();
  const [status, setStatus] = useState('');

  useGSAP(() => {
    gsap.from('.contact-reveal', {
      y: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
    });
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      e.target.reset();
    }, 600);
  };

  return (
    <section id="contact" ref={containerRef} className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 relative">
        <div>
          <div className="flex items-center gap-4 mb-6 contact-reveal">
            <div className="section-line" />
            <h2 className="text-[10px] font-mono tracking-[0.5em] text-[var(--accent)] uppercase">05 / Contact Details</h2>
          </div>
          <h3 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-8 contact-reveal text-[var(--text-primary)]">
            LET'S CONNECT<br />& <span className="text-outline italic">COLLABORATE.</span>
          </h3>
          <p className="text-base md:text-lg opacity-80 contact-reveal leading-relaxed mb-12 max-w-md text-[var(--text-primary)]">
            Feel free to reach out directly via email or phone, or connect through LinkedIn & GitHub.
          </p>

          <div className="space-y-6 contact-reveal">
            {/* Email */}
            <a href="mailto:mtahirmusman2@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white transition-all text-[var(--accent)] border border-[var(--card-border)]">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest opacity-60 font-mono font-bold mb-0.5">Email Address</p>
                <p className="text-base md:text-lg font-bold group-hover:text-[var(--accent)] transition-colors text-[var(--text-primary)]">mtahirmusman2@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:+923254828492" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white transition-all text-[var(--accent)] border border-[var(--card-border)]">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest opacity-60 font-mono font-bold mb-0.5">Phone Number</p>
                <p className="text-base md:text-lg font-bold group-hover:text-[var(--accent)] transition-colors text-[var(--text-primary)]">(+92) 3254828492</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[var(--accent)] border border-[var(--card-border)]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest opacity-60 font-mono font-bold mb-0.5">Location</p>
                <p className="text-base md:text-lg font-bold text-[var(--text-primary)]">Pakistan</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex gap-4">
              <a 
                href="https://www.linkedin.com/in/m-tahir-usman/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl border border-[var(--card-border)] text-xs font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[var(--text-primary)]"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://github.com/tahirta143" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl border border-[var(--card-border)] text-xs font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[var(--text-primary)]"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Static Contact Form */}
        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[2rem] contact-reveal relative overflow-hidden border border-[var(--card-border)] shadow-2xl bg-[var(--card-bg)]">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent)]/5 rounded-full blur-3xl" />
          <h4 className="text-xl font-bold tracking-tight mb-6 text-[var(--text-primary)]">Send a Direct Message</h4>
          <div className="space-y-5 relative">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest opacity-60 mb-2">Your Name</label>
              <input type="text" name="name" placeholder="John Doe" required
                className="w-full bg-[var(--bg-surface)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-xl px-4 py-3.5 text-base outline-none focus:border-[var(--accent)] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest opacity-60 mb-2">Your Email</label>
              <input type="email" name="email" placeholder="john@example.com" required
                className="w-full bg-[var(--bg-surface)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-xl px-4 py-3.5 text-base outline-none focus:border-[var(--accent)] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest opacity-60 mb-2">Message</label>
              <textarea name="message" placeholder="Tell me about your inquiry or project..." rows="4" required
                className="w-full bg-[var(--bg-surface)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-xl px-4 py-3.5 text-base outline-none focus:border-[var(--accent)] transition-colors resize-none" />
            </div>

            <button type="submit" disabled={status === 'sending'}
              className="w-full bg-[var(--accent)] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(255,77,77,0.4)] transition-all disabled:opacity-50 group mt-4">
              {status === 'sending' ? 'Sending Message...' : (
                <><span>Send Message</span><Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
              )}
            </button>
            
            {status === 'success' && (
              <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold text-sm mt-4 bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/20">
                <CheckCircle size={18} />
                <span>Thank you! Your message has been sent statically.</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}


