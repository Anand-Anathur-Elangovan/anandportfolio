'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    year: '2015',
    title: 'Frontend Developer',
    tech: 'HTML, CSS, JavaScript',
    desc: 'Started building interactive UIs. Fell in love with the browser as a canvas.',
    color: '#94A3B8',
  },
  {
    year: '2017',
    title: 'React Developer',
    tech: 'React, Redux, REST APIs',
    desc: 'Adopted React early. Built complex SPAs with state management and API integration.',
    color: '#61DAFB',
  },
  {
    year: '2019',
    title: 'Full Stack Engineer',
    tech: 'Node.js, PostgreSQL, AWS',
    desc: 'Moved to full stack. Started shipping end-to-end features independently.',
    color: '#68A063',
  },
  {
    year: '2020',
    title: 'Cloud Architecture',
    tech: 'GCP, Cloud Run, Kubernetes',
    desc: 'Deep dived into cloud infrastructure. Designed scalable, serverless architectures.',
    color: '#4285F4',
  },
  {
    year: '2021',
    title: 'Python & Data Engineering',
    tech: 'Python, BigQuery, Pandas',
    desc: 'Added Python and data engineering to the stack. Built ETL pipelines and analytics.',
    color: '#3776AB',
  },
  {
    year: '2022',
    title: 'First AI Projects',
    tech: 'OpenAI, LangChain, Embeddings',
    desc: 'GPT-3 changed everything. Built first LLM-powered features and RAG prototypes.',
    color: '#10B981',
  },
  {
    year: '2022',
    title: 'Vertex AI & Gemini',
    tech: 'Vertex AI, Gemini, Cloud AI',
    desc: 'Moved to Google\'s AI stack. Built first production AI APIs on Vertex AI.',
    color: '#DB4437',
  },
  {
    year: '2023',
    title: 'Enterprise RAG Systems',
    tech: 'LangChain, Vector Search, RAG',
    desc: 'Shipped VZGPT and VZGenie — enterprise RAG with 92% accuracy on 100K+ docs.',
    color: '#3B82F6',
  },
  {
    year: '2023',
    title: 'Agentic AI',
    tech: 'ReAct, Tool Use, Planning',
    desc: 'Built first agentic systems that can plan, use tools, and execute multi-step tasks.',
    color: '#F59E0B',
  },
  {
    year: '2024',
    title: 'Multi-Agent Systems',
    tech: 'Multi-Agent, Orchestration',
    desc: 'Designed multi-agent architectures with specialised agents and orchestration layers.',
    color: '#EF4444',
  },
  {
    year: '2024',
    title: 'Enterprise AI Platform',
    tech: 'MLOps, Prompt Engineering, Eval',
    desc: 'Built the full enterprise AI stack: prompt management, evaluation, monitoring, RAG.',
    color: '#3B82F6',
  },
  {
    year: '2025',
    title: 'AI System Architect',
    tech: 'Architecture, Strategy, Leadership',
    desc: 'Now designing end-to-end AI systems from architecture to deployment to scaling.',
    color: '#3B82F6',
    current: true,
  },
];

function JourneyStep({ step, i }: { step: typeof JOURNEY_STEPS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const isRight = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex items-start gap-4 md:gap-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isRight ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Content */}
      <div className={`flex-1 ${isRight ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div className={`glass rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-colors ${step.current ? 'border-indigo-500/30 bg-indigo-950/20' : ''}`}>
          <div className={`flex items-center gap-2 mb-2 ${isRight ? 'md:flex-row-reverse' : ''}`}>
            <span className="text-xs font-mono font-bold" style={{ color: step.color }}>{step.year}</span>
            {step.current && (
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/20">
                <Zap className="w-2.5 h-2.5" aria-hidden="true" /> Current
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
          <p className="text-xs text-indigo-400 mb-2">{step.tech}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center shrink-0">
        <div
          className="w-4 h-4 rounded-full border-2 z-10 relative"
          style={{ borderColor: step.color, background: step.current ? step.color : '#070710', boxShadow: step.current ? `0 0 16px ${step.color}60` : 'none' }}
          aria-hidden="true"
        />
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function AIJourneyPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="pt-16 min-h-screen">
      <section ref={ref} className="section">
        <div className="container-wide max-w-4xl">
          <motion.p className="section-label" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}>
            Career Evolution
          </motion.p>
          <motion.h1 className="heading-section text-white mb-4" initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
            My AI Journey
          </motion.h1>
          <motion.p className="text-slate-400 max-w-xl mb-16" initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            From writing my first HTML page to designing enterprise multi-agent AI systems — a 10-year evolution, one technology at a time.
          </motion.p>

          {/* Timeline */}
          <div className="relative">
            {/* Centre line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" aria-hidden="true" />

            <div className="flex flex-col gap-8">
              {JOURNEY_STEPS.map((step, i) => (
                <JourneyStep key={`${step.year}-${step.title}`} step={step} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
