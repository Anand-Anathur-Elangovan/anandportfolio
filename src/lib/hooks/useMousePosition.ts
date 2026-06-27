'use client';

import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(containerRef?: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef?.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({
        x,
        y,
        normalizedX: (x / rect.width) * 2 - 1,
        normalizedY: -((y / rect.height) * 2 - 1),
      });
    } else {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    }
  }, [containerRef]);

  useEffect(() => {
    const target = containerRef?.current ?? window;
    target.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => target.removeEventListener('mousemove', handleMouseMove as EventListener);
  }, [handleMouseMove, containerRef]);

  return position;
}
