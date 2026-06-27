'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export function GlowCard({
  children,
  className,
  glowColor = '99, 102, 241',
  intensity = 0.15,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ref.current.style.setProperty('--mouse-x', `${x}px`);
      ref.current.style.setProperty('--mouse-y', `${y}px`);
      ref.current.style.setProperty('--glow-color', glowColor);
      ref.current.style.setProperty('--glow-intensity', String(intensity));
    },
    [glowColor, intensity]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--mouse-x', '-999px');
    ref.current.style.setProperty('--mouse-y', '-999px');
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('card-glow relative overflow-hidden', className)}
      style={{
        '--mouse-x': '-999px',
        '--mouse-y': '-999px',
      } as React.CSSProperties}
    >
      {/* Mouse follow glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(var(--glow-color, 99, 102, 241), var(--glow-intensity, 0.15)), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
