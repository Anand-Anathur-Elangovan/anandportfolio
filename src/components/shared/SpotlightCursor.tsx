'use client';

import { useEffect } from 'react';

export function SpotlightCursor() {
  useEffect(() => {
    const el = document.getElementById('spotlight');
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <div id="spotlight" className="spotlight-cursor" aria-hidden="true" />;
}
