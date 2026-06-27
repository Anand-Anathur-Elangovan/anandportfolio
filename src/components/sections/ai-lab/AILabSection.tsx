'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Zap, CheckCircle } from 'lucide-react';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { GlowCard } from '@/components/shared/GlowCard';

const AI_DEMOS = [
  {
    id: 'anand-ai',
    emoji: '🤖',
    title: 'Chat with Anand AI',
    description: 'My digital twin. Ask about experience, projects, AI expertise — answered with local knowledge and streaming responses.',
    tags: ['NLP', 'Knowledge Base', 'Streaming'],
    status: 'Live',
    highlight: true,
  },
  {
    id: 'cam-to-code',
    emoji: '📷',
    title: 'CamToCode',
    description: 'Upload any UI screenshot or wireframe. Get production-ready React, Next.js, or Tailwind code with live preview.',
    tags: ['Vision AI', 'Code Gen', 'React'],
    status: 'Live',
    highlight: false,
  },
  {
    id: 'sql-ai',
    emoji: '🗄️',
    title: 'SQL AI — NL2SQL',
    description: 'Type in plain English, get optimised SQL. Inspired by the VZSQL Editor at Verizon. Run against a demo database.',
    tags: ['NL2SQL', 'BigQuery', 'LangChain'],
    status: 'Live',
    highlight: false,
  },
];

export function AILabSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="ai-lab" className="section relative overflow-hidden" aria-label="AI Lab">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-blue-50/50 blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Interactive
          </motion.p>
          <AnimatedText
            text="AI Lab"
            className="heading-section block"
            delay={0.1}
          />
          <motion.p
            className="text-gray-500 text-base mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Don&apos;t just read about AI — experience it. Live demos of the AI systems I build,
            running in production quality.
          </motion.p>
        </div>

        {/* 3-card demo teaser */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {AI_DEMOS.map((demo, i) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <GlowCard
                className={`h-full flex flex-col p-6 ${demo.highlight ? 'border-blue-200/50' : ''}`}
                glowColor="59, 130, 246"
              >
                {/* Emoji + status */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl" role="img" aria-label={demo.title}>{demo.emoji}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" aria-hidden="true" />
                    {demo.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-2">{demo.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{demo.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 border border-gray-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/ai-lab"
                  className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Try Demo
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/ai-lab"
            className="btn-primary text-sm"
          >
            <Zap className="w-5 h-5" aria-hidden="true" />
            Enter AI Lab
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
