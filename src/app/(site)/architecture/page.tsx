import type { Metadata } from 'next';
import { ArchitecturePlayground } from '@/components/sections/ai-lab/demos/ArchitecturePlayground';

export const metadata: Metadata = {
  title: 'Architecture',
  description: 'Interactive AI architecture diagrams: RAG pipelines, Agentic AI systems, VZGPT architecture, and cloud infrastructure visualisations.',
};

export default function ArchitecturePage() {
  return (
    <div className="pt-16 min-h-screen flex flex-col">
      <div className="section pb-8">
        <div className="container-wide">
          <p className="section-label">Engineering Thinking</p>
          <h1 className="heading-section text-white mb-4">
            Architecture Playground
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Interactive architecture diagrams showing how I design AI systems. Click any node to explore its role.
          </p>
        </div>
      </div>
      <div className="flex-1 mx-4 md:mx-8 lg:mx-12 mb-8 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ minHeight: '600px' }}>
        <ArchitecturePlayground />
      </div>
    </div>
  );
}
