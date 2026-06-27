'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const IMAGES = ['/heroimage.avif', '/heroimage3.avif'];

export function GlobalParallaxBackground() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { scrollY } = useScroll();

  // Image 0 — slowest layer (feels furthest away)
  const y0 = useTransform(scrollY, [0, 2000], ['0%', '-22%']);
  // Image 1 — slightly faster (creates depth between layers)
  const y1 = useTransform(scrollY, [0, 2000], ['0%', '-28%']);

  // Subtle scale: images breathe in as you scroll
  const scale = useTransform(scrollY, [0, 1000], [1.1, 1.0]);

  // Auto-crossfade every 7 seconds
  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % IMAGES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const yValues = [y0, y1];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* ── Crossfading parallax images ── */}
      {IMAGES.map((src, i) => (
        <AnimatePresence key={src}>
          {activeIdx === i && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.0, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute inset-[-8%]"
                style={{ y: yValues[i], scale }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  style={{
                    filter: 'blur(8px) saturate(0.85) brightness(1.06)',
                  }}
                  priority={i === 0}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* ── Frosted white overlay — glassmorphism base ── */}
      <div className="absolute inset-0 bg-white/65" />

      {/* ── Subtle colour gradient wash ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 15% 20%, rgba(219,234,254,0.45) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 85% 80%, rgba(226,232,240,0.35) 0%, transparent 60%)',
        }}
      />

      {/* ── Dot grid — adds depth across all sections ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.038]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="global-dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#3B82F6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#global-dots)" />
      </svg>
    </div>
  );
}
