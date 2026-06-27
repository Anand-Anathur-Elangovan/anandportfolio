'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, ChevronDown } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

import { projects } from '@/lib/data/projects';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { GlowCard } from '@/components/shared/GlowCard';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Enterprise AI', 'Full Stack', 'Personal AI', 'Freelance'] as const;
type Category = typeof CATEGORIES[number];

// Category badge colours (light, no green/red)
const CAT_STYLES: Record<string, string> = {
  'Enterprise AI': 'bg-blue-50 text-blue-700 border-blue-200/60',
  'Full Stack':    'bg-slate-100 text-slate-600 border-slate-200/60',
  'Personal AI':   'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  'Freelance':     'bg-gray-100 text-gray-600 border-gray-200/60',
  'Data Science':  'bg-slate-100 text-slate-600 border-slate-200/60',
  'Cloud':         'bg-sky-50 text-sky-700 border-sky-200/60',
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.07 }}
    >
      <GlowCard className="h-full flex flex-col group" glowColor="59, 130, 246" intensity={0.06}>
        <div className="p-6 flex flex-col h-full">
          {/* Category + status */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={cn(
              'text-[11px] px-2.5 py-0.5 rounded-full font-medium border',
              CAT_STYLES[project.category] ?? 'bg-gray-100 text-gray-500 border-gray-200/60'
            )}>
              {project.category}
            </span>
            <span className={cn(
              'text-[11px] px-2.5 py-0.5 rounded-full font-medium border',
              project.status === 'Production'
                ? 'bg-blue-50 text-blue-600 border-blue-200/60'
                : 'bg-slate-50 text-slate-500 border-slate-200/60'
            )}>
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 mb-0.5">{project.title}</h3>
          <p className="text-[11px] text-slate-400 mb-3">{project.company} · {project.year}</p>

          {/* Description */}
          <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200/60"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[11px] px-2 py-0.5 text-slate-400">+{project.tags.length - 4}</span>
            )}
          </div>

          {/* Links row */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group/link"
            >
              Case Study
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
            <div className="flex items-center gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                  aria-label={`${project.title} on GitHub`}
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                  aria-label={`${project.title} live`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const INITIAL_COUNT = 6;
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  return (
    <section ref={ref} id="projects" className="section section-bg" aria-label="Projects">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              className="section-label"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
            >
              Work
            </motion.p>
            <AnimatedText
              text="Projects & Products"
              className="heading-section block"
              delay={0.1}
            />
            <motion.p
              className="text-slate-500 text-sm mt-3 max-w-md"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Enterprise AI products, full-stack platforms, and personal projects — from Verizon to freelance.
            </motion.p>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Project categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                role="tab"
                aria-selected={activeCategory === cat}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                  activeCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'text-slate-500 hover:text-slate-900 bg-white border-slate-200/60 hover:border-slate-300'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count label */}
        <motion.p
          className="text-xs text-slate-400 mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
        >
          Showing {visible.length} of {filtered.length} projects
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Load More / Show Less */}
        {hasMore && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-outline"
            >
              {showAll ? 'Show Less' : `Load More (${filtered.length - INITIAL_COUNT} more)`}
              <ChevronDown className={cn('w-4 h-4 transition-transform', showAll && 'rotate-180')} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
