'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight, CheckCircle, AlertTriangle, TrendingUp,
  Layers, Code2, Target, ExternalLink
} from 'lucide-react';
import type { Project } from '@/types';
import { ArchitecturePlayground } from '@/components/sections/ai-lab/demos/ArchitecturePlayground';

interface SectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  color?: string;
}

function Section({ title, icon: Icon, children, color = '#3B82F6' }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 md:p-8 border border-white/[0.06]"
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: color + '20', border: `1px solid ${color}30` } as React.CSSProperties}
        >
          <Icon className="w-4 h-4" style={{ color } as React.CSSProperties} aria-hidden="true" />
        </div>
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export function CaseStudyClient({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'impact'>('overview');

  return (
    <div className="container-wide py-16">
      {/* Tab navigation */}
      <div className="flex items-center gap-1 mb-10 border-b border-white/[0.06] pb-0 overflow-x-auto">
        {(['overview', 'architecture', 'impact'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === tab
                ? 'text-indigo-400 border-indigo-500'
                : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab === 'overview' ? 'Overview' : tab === 'architecture' ? 'Architecture' : 'Business Impact'}
          </button>
        ))}
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors px-2 py-1 whitespace-nowrap">
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> Live Demo
          </a>
        )}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem */}
          <Section title="The Problem" icon={AlertTriangle} color="#F59E0B">
            <p className="text-sm text-slate-400 leading-relaxed">{project.problem}</p>
          </Section>

          {/* Solution */}
          <Section title="The Solution" icon={CheckCircle} color="#10B981">
            <p className="text-sm text-slate-400 leading-relaxed">{project.solution}</p>
          </Section>

          {/* Challenges */}
          <Section title="Key Challenges" icon={Target} color="#F43F5E">
            <ul className="flex flex-col gap-2">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                  <span className="text-rose-400 shrink-0 mt-0.5 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                  {c}
                </li>
              ))}
            </ul>
          </Section>

          {/* Tech Stack */}
          <Section title="Tech Stack" icon={Layers} color="#3B82F6">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center gap-1">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.05] text-slate-200 border border-white/[0.08]">
                    {tech.name}
                  </span>
                  <span className="text-[10px] text-slate-600">{tech.category}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Long description */}
          {project.longDescription && (
            <div className="lg:col-span-2">
              <Section title="Deep Dive" icon={Code2} color="#3B82F6">
                <p className="text-sm text-slate-400 leading-relaxed">{project.longDescription}</p>
              </Section>
            </div>
          )}
        </div>
      )}

      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden" style={{ height: '560px' }}>
            <ArchitecturePlayground />
          </div>
          <div className="glass rounded-2xl p-6 border border-white/[0.06]">
            <h3 className="text-sm font-bold text-white mb-3">Architecture Notes</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The interactive diagram above shows the conceptual architecture for {project.title}.
              Each node represents a system component — click any node to explore its role and how it connects to the broader system.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.techStack.map((t) => (
                <span key={t.name} className="text-xs px-2 py-1 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'impact' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.businessImpact.map((impact, i) => (
            <motion.div
              key={impact.metric}
              className="glass rounded-2xl p-6 border border-white/[0.06]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1 font-mono">{impact.value}</div>
                  <div className="text-sm font-semibold text-indigo-400 mb-1">{impact.metric}</div>
                  <div className="text-xs text-slate-500">{impact.description}</div>
                </div>
              </div>
            </motion.div>
          ))}

          {project.metrics && (
            <div className="md:col-span-2 glass rounded-2xl p-6 border border-white/[0.06]">
              <h3 className="text-sm font-bold text-white mb-4">System Metrics</h3>
              <div className="flex gap-8">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="text-xl font-bold text-white font-mono">{m.value}{m.unit}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Related projects */}
      <div className="mt-16 pt-12 border-t border-white/[0.04]">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">More Projects</h3>
        <div className="flex gap-3 flex-wrap">
          {['VZGPT', 'VZGenie', 'CamToCode', 'VZSQL Editor'].map((name) => (
            <span key={name} className="px-4 py-2 rounded-xl glass border border-white/[0.06] text-sm text-slate-400 hover:text-white hover:border-white/[0.12] transition-colors cursor-pointer">
              {name} <ArrowRight className="w-3 h-3 inline ml-1" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
