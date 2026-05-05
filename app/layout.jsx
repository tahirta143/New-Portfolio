'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import '@/app/globals.css';

const LenisContext = createContext(null);

export default function RootLayout({ children }) {
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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,900&f[]=neue-montreal@400,700&display=swap" />
      </head>
      <body>
        <ThemeProvider>
          <LenisContext.Provider value={lenis}>
            {children}
          </LenisContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const useLenis = () => useContext(LenisContext);
