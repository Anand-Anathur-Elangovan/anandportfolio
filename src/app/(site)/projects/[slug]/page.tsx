import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, TrendingUp, Layers, Zap } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import { CaseStudyClient } from './CaseStudyClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — Anand Anathur Elangovan`,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className={`relative py-24 overflow-hidden bg-gradient-to-br ${project.heroGradient}`}>
        <div className="absolute inset-0 bg-[#08080E]/60" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="container-wide relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All Projects
          </Link>
          <div className="flex flex-wrap items-start gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20">
              {project.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              project.status === 'Production'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}>
              {project.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/60 border border-white/10">
              {project.company} · {project.year}
            </span>
          </div>
          <h1 className="heading-hero text-white mb-3">{project.title}</h1>
          <p className="text-lg text-white/70 mb-4">{project.subtitle}</p>
          <p className="text-base text-white/50 max-w-2xl leading-relaxed">{project.description}</p>

          {/* Key metrics */}
          {project.businessImpact.length > 0 && (
            <div className="flex flex-wrap gap-6 mt-10">
              {project.businessImpact.slice(0, 3).map((impact) => (
                <div key={impact.metric} className="flex flex-col">
                  <span className="text-2xl font-bold text-white">{impact.value}</span>
                  <span className="text-xs text-white/50 mt-0.5">{impact.metric}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Case study body */}
      <CaseStudyClient project={project} />
    </div>
  );
}
