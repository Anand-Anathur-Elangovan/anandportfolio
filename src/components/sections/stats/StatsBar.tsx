'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';

const STATS = [
  { value: 8,  suffix: '+', label: 'Years Experience',     description: 'Software, cloud & AI' },
  { value: 5,  suffix: '+', label: 'Years in Software Dev', description: 'Full-stack & cloud-native' },
  { value: 9,  suffix: '+', label: 'AI Products Shipped',  description: 'Production at Verizon' },
  { value: 4,  suffix: '+', label: 'GCP Products Used',    description: 'Gemini, Vertex, BigQuery, Cloud Run' },
  { value: 3,  suffix: '',  label: 'AI Specialisations',   description: 'Agentic · RAG · NL2SQL' },
];

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, { duration: 1.8, ease: 'easeOut' });
    const unsub = motionValue.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
    return () => { controls.stop(); unsub(); };
  }, [isInView, motionValue, value, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="py-14 border-y border-gray-200/60"
      aria-label="Key statistics"
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 font-mono">
                <CountUpNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-semibold text-gray-600 mb-0.5">{stat.label}</div>
              <div className="text-[11px] text-gray-400 leading-tight">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
