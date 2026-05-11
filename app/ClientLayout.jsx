'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from '@/app/components/ThemeProvider';

export const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function ClientLayout({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <LenisContext.Provider value={lenis}>
        {children}
      </LenisContext.Provider>
    </ThemeProvider>
  );
}
