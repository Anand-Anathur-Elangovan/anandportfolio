'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Download, MessageCircle, MapPin, Briefcase, Star } from 'lucide-react';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { usePortfolioStore } from '@/lib/store';

const HeroScene = lazy(() =>
  import('@/components/three/scenes/HeroScene').then((m) => ({ default: m.HeroScene }))
);

const ROLES = [
  'System Architect Engineer',
  'AI Engineer',
  'Full Stack Developer',
  'Agentic AI Specialist',
];

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 overflow-hidden flex items-center">
      <motion.span
        key={index}
        className="text-base md:text-lg font-semibold text-blue-600"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -28, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {ROLES[index]}
      </motion.span>
    </div>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ── Parallax photo column ──────────────────────────────────── */
function PhotoColumn() {
  const { scrollY } = useScroll();

  // Each element moves at a different speed
  const photoY   = useTransform(scrollY, [0, 700], [0,  60]);
  const blob1Y   = useTransform(scrollY, [0, 700], [0,  110]);
  const blob2Y   = useTransform(scrollY, [0, 700], [0,  -50]);
  const card1Y   = useTransform(scrollY, [0, 700], [0,  80]);
  const card2Y   = useTransform(scrollY, [0, 700], [0,  40]);
  const ringY    = useTransform(scrollY, [0, 700], [0,  150]);

  const sPhoto = useSpring(photoY,  { stiffness: 60, damping: 20 });
  const sBlob1 = useSpring(blob1Y,  { stiffness: 40, damping: 18 });
  const sBlob2 = useSpring(blob2Y,  { stiffness: 50, damping: 20 });
  const sCard1 = useSpring(card1Y,  { stiffness: 70, damping: 22 });
  const sCard2 = useSpring(card2Y,  { stiffness: 80, damping: 24 });
  const sRing  = useSpring(ringY,   { stiffness: 35, damping: 16 });

  return (
    <div className="relative h-[520px] md:h-[600px] w-full" aria-hidden="true">

      {/* ── Layer 1 (furthest): large soft blobs ── */}
      <motion.div
        className="absolute top-[-8%] right-[-6%] w-72 h-72 rounded-full"
        style={{
          y: sBlob1,
          background: 'radial-gradient(circle, rgba(191,219,254,0.55) 0%, rgba(219,234,254,0.2) 60%, transparent 80%)',
        }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[-4%] w-56 h-56 rounded-full"
        style={{
          y: sBlob2,
          background: 'radial-gradient(circle, rgba(226,232,240,0.5) 0%, transparent 70%)',
        }}
      />

      {/* ── Layer 2: decorative rings ── */}
      <motion.div
        className="absolute top-[8%] right-[8%] w-48 h-48 rounded-full border-2 border-blue-200/40"
        style={{ y: sRing }}
      />
      <motion.div
        className="absolute top-[12%] right-[12%] w-36 h-36 rounded-full border border-slate-200/50"
        style={{ y: sRing }}
      />

      {/* ── Layer 3: main photo card ── */}
      <motion.div
        className="absolute top-[5%] right-[5%] left-[5%] md:left-auto md:w-[78%]"
        style={{ y: sPhoto }}
      >
        {/* Outer glow */}
        <div className="absolute inset-[-12px] rounded-3xl bg-gradient-to-br from-blue-100/70 via-white/40 to-slate-100/60 blur-[18px]" />

        {/* Main photo container */}
        <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/80">
          <div className="aspect-[3/4] relative">
            <Image
              src="/Student photo.JPG"
              alt="Anand Anathur Elangovan"
              fill
              sizes="(max-width:768px) 90vw, 40vw"
              className="object-cover object-top"
              priority
            />
            {/* Subtle gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        {/* Name tag on photo */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 glass rounded-2xl px-4 py-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <p className="text-xs font-bold text-slate-800 truncate">Anand Anathur Elangovan</p>
          <p className="text-[11px] text-slate-500">AI Architect · Verizon</p>
        </motion.div>
      </motion.div>

      {/* ── Layer 4: floating glass info cards ── */}

      {/* Card: Current role — top-right corner */}
      <motion.div
        className="absolute top-[4%] right-0 glass rounded-2xl px-3.5 py-2.5 shadow-lg z-10"
        style={{ y: sCard1 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] text-slate-600">Current Role</p>
            <p className="text-xs font-semibold text-slate-900 whitespace-nowrap">Sys Architect @ Verizon</p>
          </div>
        </div>
      </motion.div>

      {/* Card: Experience — bottom-left corner */}
      <motion.div
        className="absolute bottom-[22%] left-0 glass rounded-2xl px-3.5 py-2.5 shadow-lg z-10"
        style={{ y: sCard2 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <Star className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div>
            <p className="text-[10px] text-slate-600">Experience</p>
            <p className="text-xs font-semibold text-slate-900">8+ Years · 9+ AI Products</p>
          </div>
        </div>
      </motion.div>

      {/* 3D particle sphere — very subtle ambient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
    </div>
  );
}

/* ── Main Section ───────────────────────────────────────────── */
export function HeroSection() {
  const { setChatOpen } = usePortfolioStore();
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Hero gets no local bg — global parallax bg shows through */}
      {/* Very light overlay just for hero section depth */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" aria-hidden="true" />

      <div className="container-wide relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center min-h-[calc(100vh-5rem)]">

          {/* ── Left: Text content ── */}
          <motion.div
            className="flex flex-col justify-center order-2 lg:order-1"
            style={{ y: textY }}
          >
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass w-fit mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-600">Available for AI / Architect roles</span>
              <span className="text-slate-300 mx-0.5">·</span>
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-400">Chennai, India</span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-[clamp(2.8rem,5.5vw,4.8rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-slate-900"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                Anand Anathur
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-5">
              <motion.span
                className="block text-[clamp(2.8rem,5.5vw,4.8rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-gradient-blue"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
              >
                Elangovan
              </motion.span>
            </div>

            {/* Rotating role */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <RotatingRole />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Building{' '}
              <span className="text-slate-800 font-semibold">Enterprise AI</span>,{' '}
              <span className="text-blue-600 font-semibold">Agentic Systems</span> &amp; Cloud Applications at{' '}
              <span className="font-semibold text-slate-700">Verizon</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <MagneticButton className="btn-primary" aria-label="View projects">
                <Link href="/projects" className="flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
              <MagneticButton className="btn-outline" aria-label="Download resume">
                <a href="/AnandAnathurElangovanKCMVL.pdf" download className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </MagneticButton>
              <MagneticButton className="btn-outline" onClick={() => setChatOpen(true)} aria-label="Chat">
                <MessageCircle className="w-4 h-4" />
                Let&apos;s Talk
              </MagneticButton>
            </motion.div>

            {/* Social + stats */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <a
                href="https://github.com/Anand-Anathur-Elangovan"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/anandanathur-elangovan-50339b419"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <div className="w-px h-6 bg-slate-200" />
              {[
                { value: '8+', label: 'Years' },
                { value: '9+', label: 'AI Products' },
                { value: 'GCP', label: 'Certified' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="text-sm font-bold text-slate-900 leading-none">{s.value}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Parallax photo column ── */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <PhotoColumn />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-hidden="true"
      >
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-300/60 flex items-start justify-center pt-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-blue-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
