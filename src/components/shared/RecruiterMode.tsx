'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Download, ExternalLink, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';

const RECRUITER_STEPS = [
  {
    id: 0,
    duration: '30 sec',
    title: 'Meet Anand',
    subtitle: 'System Architect Engineer · AI Engineer',
    content: {
      headline: 'Hi, I\'m Anand Anathur Elangovan 👋',
      body: 'I\'m a System Architect Engineer and AI Engineer at Verizon, Chennai. 8+ years experience, with the last 2 years deeply focused on enterprise AI — RAG, Agentic AI, NL2SQL, and Gemini-powered applications.',
      highlights: [
        '8+ years total experience, 5+ in software engineering',
        'Currently: Verizon Data Services India — Mar 2024 to Present',
        '9+ enterprise AI products in production at Verizon',
        '3× Google Cloud certified',
        'Open to AI Architect / Engineer roles globally',
      ],
    },
  },
  {
    id: 1,
    duration: '1 min',
    title: 'Enterprise AI at Verizon',
    subtitle: 'Production AI serving 5,000+ users daily',
    content: {
      headline: 'Real AI. Real Scale. Real Impact.',
      body: 'At Verizon, I architected and shipped enterprise AI production systems using Google Gemini, Vertex AI, LangChain, RAG, Agentic AI, DSPy, Cloud Run, and BigQuery.',
      highlights: [
        'VZGPT — Enterprise AI copilot on Gemini + RAG + Slack integration',
        'VZSQL — NL to BigQuery SQL with LangChain schema reasoning',
        'VZGenie — Agentic RAG over enterprise knowledge bases',
        'VZFlix — Video AI with semantic search and Q&A',
        'Hypercare / Citrix / YubiKey Bots — Gemini-powered enterprise bots',
      ],
    },
  },
  {
    id: 2,
    duration: '1 min',
    title: 'Live AI Demos',
    subtitle: 'Don\'t just read about it — try it',
    content: {
      headline: 'Experience the AI Lab',
      body: 'I\'ve built an interactive AI Lab with 10 live demos showcasing the same type of AI I build professionally. From a chat interface with my digital twin to architecture playgrounds and NL-to-SQL engines.',
      highlights: [
        'Chat with Anand AI — ask me anything in real time',
        'Architecture Playground — interactive system diagrams',
        'SQL AI — natural language to database queries',
        'Resume Analyzer — AI-powered resume insights',
        'CamToCode — screenshot to production React code',
      ],
    },
  },
  {
    id: 3,
    duration: '1 min',
    title: 'Engineering Architecture',
    subtitle: 'How I think about complex systems',
    content: {
      headline: 'Systems Thinking at Scale',
      body: 'My strength is designing systems that work at enterprise scale — combining AI capabilities with rock-solid engineering principles. I think in data flows, failure modes, latency budgets, and business impact.',
      highlights: [
        'Agentic AI architectures with planning and memory',
        'RAG pipelines from basic to advanced agentic variants',
        'Cloud-native microservices on GCP (Cloud Run, Vertex AI)',
        'Vector search and embedding pipelines at scale',
        'Multi-model orchestration with prompt management',
      ],
    },
  },
  {
    id: 4,
    duration: '1 min',
    title: 'Why Hire Me',
    subtitle: 'Certifications, availability, and contact',
    content: {
      headline: 'Let\'s Build Something Great Together',
      body: 'I\'m a full-spectrum AI engineer — I can architect the system, write the code, ship it to production, and explain it to stakeholders. Deep enterprise AI production experience with Google Gemini and Vertex AI.',
      highlights: [
        'GCP Professional Cloud Architect (2024)',
        'GCP Professional Data Engineer (2023)',
        'TensorFlow Developer Certificate',
        'AWS Solutions Architect Associate',
        'Open to AI Engineer, ML Engineer, AI Architect roles',
      ],
    },
  },
];

export function RecruiterMode() {
  const { recruiterModeActive, recruiterStep, setRecruiterMode, setRecruiterStep } = usePortfolioStore();

  const totalSteps = RECRUITER_STEPS.length;

  const handleNext = useCallback(() => {
    if (recruiterStep < totalSteps - 1) {
      setRecruiterStep(recruiterStep + 1);
    } else {
      setRecruiterMode(false);
    }
  }, [recruiterStep, totalSteps, setRecruiterStep, setRecruiterMode]);

  const handlePrev = useCallback(() => {
    if (recruiterStep > 0) {
      setRecruiterStep(recruiterStep - 1);
    }
  }, [recruiterStep, setRecruiterStep]);

  // Keyboard navigation
  useEffect(() => {
    if (!recruiterModeActive) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') handleNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') handlePrev();
      if (e.key === 'Escape') setRecruiterMode(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [recruiterModeActive, handleNext, handlePrev, setRecruiterMode]);

  const step = RECRUITER_STEPS[recruiterStep];

  return (
    <AnimatePresence>
      {recruiterModeActive && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Recruiter Mode presentation"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setRecruiterMode(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-2xl glass-strong rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)]"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-200/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gray-500" aria-hidden="true" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Recruiter Mode
                </span>
                <span className="text-xs text-gray-400">
                  {recruiterStep + 1}/{totalSteps}
                </span>
              </div>
              <button
                onClick={() => setRecruiterMode(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Exit Recruiter Mode"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-1 px-6 py-3">
              {RECRUITER_STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setRecruiterStep(i)}
                  className="flex-1 h-1 rounded-full overflow-hidden bg-gray-200"
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                >
                  <motion.div
                    className="h-full rounded-full bg-gray-900"
                    initial={{ width: 0 }}
                    animate={{ width: i < recruiterStep ? '100%' : i === recruiterStep ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={recruiterStep}
                className="px-6 py-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-400">{step.duration}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{step.subtitle}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{step.content.headline}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{step.content.body}</p>

                <ul className="flex flex-col gap-2">
                  {step.content.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <span className="text-blue-500 shrink-0 mt-0.5">▸</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Footer navigation */}
            <div className="flex items-center justify-between px-6 pb-6 pt-2">
              <button
                onClick={handlePrev}
                disabled={recruiterStep === 0}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                Back
              </button>

              <div className="flex items-center gap-3">
                <a
                  href="/AnandAnathurElangovanKCMVL.pdf"
                  download
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
                  aria-label="Download resume"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  Resume
                </a>

                <button
                  onClick={handleNext}
                  className="btn-primary"
                  aria-label={recruiterStep === totalSteps - 1 ? 'Finish presentation' : 'Next step'}
                >
                  {recruiterStep === totalSteps - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
