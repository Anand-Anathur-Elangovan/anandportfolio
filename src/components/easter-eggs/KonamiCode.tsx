'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function KonamiCode() {
  const { discoverEgg, setTerminalMode } = usePortfolioStore();

  useEffect(() => {
    let sequence: string[] = [];

    const handler = (e: KeyboardEvent) => {
      sequence.push(e.key);
      if (sequence.length > KONAMI.length) {
        sequence = sequence.slice(-KONAMI.length);
      }
      if (sequence.join(',') === KONAMI.join(',')) {
        discoverEgg('konami');
        setTerminalMode(true);
        sequence = [];
      }

      // Secret: typing "AI" anywhere
      if (sequence.slice(-2).join('') === 'ai' || sequence.slice(-2).join('') === 'AI') {
        discoverEgg('ai-typing');
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [discoverEgg, setTerminalMode]);

  return null;
}
