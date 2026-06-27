'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';

export function LoadingScreen() {
  const { isLoading, setIsLoading } = usePortfolioStore();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out progress
      const easedProgress = 1 - Math.pow(1 - step / steps, 3);
      setProgress(Math.min(Math.round(easedProgress * 100), 100));

      if (step >= steps) {
        clearInterval(timer);
        setPhase('done');
        setTimeout(() => setIsLoading(false), 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-[120px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Animated logo mark */}
            <motion.div
              className="relative w-16 h-16"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
                {/* Outer ring */}
                <motion.circle
                  cx="32" cy="32" r="30"
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                {/* Progress arc */}
                <motion.circle
                  cx="32" cy="32" r="30"
                  stroke="url(#loadGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * (1 - progress / 100)}`}
                  transform="rotate(-90 32 32)"
                />
                {/* Center A */}
                <motion.text
                  x="32" y="37"
                  textAnchor="middle"
                  fill="#111827"
                  fontSize="18"
                  fontWeight="700"
                  fontFamily="sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  A
                </motion.text>
                <defs>
                  <linearGradient id="loadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#93C5FD" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-1">
                Initialising
              </p>
              <h1 className="text-xl font-bold text-gray-900 tracking-wide">
                Anand Anathur Elangovan
              </h1>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-48 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-full h-[2px] bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-300 to-blue-500"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <motion.span
                className="text-xs font-mono text-slate-500"
                key={progress}
              >
                {phase === 'done' ? (
                  <span className="text-blue-500">Ready</span>
                ) : (
                  <span>{progress}%</span>
                )}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
