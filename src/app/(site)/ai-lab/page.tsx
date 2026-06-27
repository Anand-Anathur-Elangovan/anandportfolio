'use client';

import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

const AnandAI = lazy(() => import('@/components/sections/ai-lab/demos/AnandAI').then(m => ({ default: m.AnandAI })));
const SQLAIDemo = lazy(() => import('@/components/sections/ai-lab/demos/SQLAIDemo').then(m => ({ default: m.SQLAIDemo })));
const ArchitecturePlayground = lazy(() => import('@/components/sections/ai-lab/demos/ArchitecturePlayground').then(m => ({ default: m.ArchitecturePlayground })));
const ResumeAnalyzer = lazy(() => import('@/components/sections/ai-lab/demos/ResumeAnalyzer').then(m => ({ default: m.ResumeAnalyzer })));
const CamToCodeDemo = lazy(() => import('@/components/sections/ai-lab/demos/CamToCodeDemo').then(m => ({ default: m.CamToCodeDemo })));
const OCRIntelligence = lazy(() => import('@/components/sections/ai-lab/demos/OCRIntelligence').then(m => ({ default: m.OCRIntelligence })));
const PromptPlayground = lazy(() => import('@/components/sections/ai-lab/demos/PromptPlayground').then(m => ({ default: m.PromptPlayground })));
const VisionAI = lazy(() => import('@/components/sections/ai-lab/demos/VisionAI').then(m => ({ default: m.VisionAI })));
const WorkflowBuilder = lazy(() => import('@/components/sections/ai-lab/demos/WorkflowBuilder').then(m => ({ default: m.WorkflowBuilder })));
const KnowledgeAssistant = lazy(() => import('@/components/sections/ai-lab/demos/KnowledgeAssistant').then(m => ({ default: m.KnowledgeAssistant })));

const DEMOS = [
  { id: 'anand-ai',     emoji: '🤖', title: 'Chat with Anand AI',    desc: 'Ask my digital twin anything',        status: 'Live' as const, color: '#3B82F6' },
  { id: 'architecture', emoji: '🏗️', title: 'Architecture Playground',desc: 'Interactive AI architecture diagrams', status: 'Live' as const, color: '#3B82F6' },
  { id: 'sql-ai',       emoji: '🗄️', title: 'SQL AI',                 desc: 'Natural language to SQL',             status: 'Live' as const, color: '#F59E0B' },
  { id: 'resume',       emoji: '📄', title: 'Resume Analyzer',        desc: 'AI-powered resume insights',          status: 'Live' as const, color: '#10B981' },
  { id: 'cam-to-code',  emoji: '📷', title: 'CamToCode',              desc: 'Screenshot to React code',            status: 'Live' as const, color: '#3B82F6' },
  { id: 'ocr',          emoji: '🔍', title: 'OCR Intelligence',       desc: 'Document AI and extraction',          status: 'Live' as const, color: '#EF4444' },
  { id: 'prompt',       emoji: '✨', title: 'Prompt Playground',      desc: 'Prompt engineering lab',              status: 'Live' as const, color: '#F43F5E' },
  { id: 'vision',       emoji: '👁️', title: 'Vision AI',              desc: 'Image analysis and captioning',       status: 'Live' as const, color: '#0EA5E9' },
  { id: 'workflow',     emoji: '⚡', title: 'Workflow Builder',       desc: 'Visual AI workflow canvas',           status: 'Live' as const, color: '#FF6B35' },
  { id: 'knowledge',    emoji: '📚', title: 'Knowledge Assistant',    desc: 'Enterprise knowledge search',         status: 'Live' as const, color: '#7C3AED' },
];

function DemoContent({ demoId }: { demoId: string }) {
  if (demoId === 'anand-ai') return <AnandAI />;
  if (demoId === 'architecture') return <ArchitecturePlayground />;
  if (demoId === 'sql-ai') return <SQLAIDemo />;
  if (demoId === 'resume') return <ResumeAnalyzer />;
  if (demoId === 'cam-to-code') return <CamToCodeDemo />;
  if (demoId === 'ocr') return <OCRIntelligence />;
  if (demoId === 'prompt') return <PromptPlayground />;
  if (demoId === 'vision') return <VisionAI />;
  if (demoId === 'workflow') return <WorkflowBuilder />;
  if (demoId === 'knowledge') return <KnowledgeAssistant />;
  return null;
}

function DemoModal({ demoId, onClose }: { demoId: string; onClose: () => void }) {
  const demo = DEMOS.find((d) => d.id === demoId);
  if (!demo) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${demo.title} demo`}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        className="relative w-full max-w-4xl bg-[#0D0D17] border border-white/[0.1] rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        style={{ height: 'min(700px, 90vh)' }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">{demo.emoji}</span>
            <div>
              <h2 className="text-sm font-bold text-white">{demo.title}</h2>
              <p className="text-xs text-slate-500">{demo.desc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Close demo"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-60px)] overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-500/50 border-t-indigo-500 animate-spin" />
                  <span className="text-sm">Loading demo...</span>
                </div>
              </div>
            }
          >
            <DemoContent demoId={demoId} />
          </Suspense>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AILabPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <p className="section-label">Interactive</p>
          <h1 className="heading-section text-white mb-4">
            AI Lab
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Don&apos;t just read about AI — experience it. Live demos of the AI systems I build professionally.
            Click any demo to launch it in fullscreen.
          </p>
        </div>
      </div>

      {/* Demo grid */}
      <div className="container-wide pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DEMOS.map((demo, i) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setActiveDemo(demo.id)}
                className="w-full text-left glass rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 cursor-pointer transition-all duration-300 group"
                aria-label={`Open ${demo.title} demo`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl" aria-hidden="true">{demo.emoji}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 bg-white/10/20 text-white/60 border border-white/15">
                    <CheckCircle className="w-2.5 h-2.5" aria-hidden="true" />
                    Live
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{demo.title}</h3>
                <p className="text-xs text-slate-400">{demo.desc}</p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Demo modal */}
      <AnimatePresence>
        {activeDemo && (
          <DemoModal demoId={activeDemo} onClose={() => setActiveDemo(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
