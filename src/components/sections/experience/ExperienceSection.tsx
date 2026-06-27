'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronDown } from 'lucide-react';
import { experiences } from '@/lib/data/experience';
import { AnimatedText } from '@/components/shared/AnimatedText';

function ExperienceCard({
  exp,
  index,
}: {
  exp: typeof experiences[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
  const [expanded, setExpanded] = useState(false);
  const visibleHighlights = expanded ? exp.highlights : exp.highlights.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      className="glass rounded-2xl p-6 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: exp.color }}
          >
            {exp.company.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">{exp.company}</h3>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{exp.role}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-500 bg-white/60">
          {exp.type}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" aria-hidden="true" />
          {exp.duration}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" aria-hidden="true" />
          {exp.location}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{exp.description}</p>

      {/* Highlights */}
      <ul className="flex flex-col gap-2 mb-4">
        <AnimatePresence initial={false}>
          {visibleHighlights.map((h, i) => (
            <motion.li
              key={h}
              className="flex items-start gap-2 text-xs text-gray-500"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
            >
              <span className="text-blue-400 shrink-0 mt-0.5">▸</span>
              {h}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Load More button */}
      {exp.highlights.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn-outline text-xs py-1.5 px-3"
        >
          {expanded ? 'Show Less' : `Show All (${exp.highlights.length})`}
          <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
        {exp.technologies.slice(0, 8).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-md text-xs text-gray-500 bg-gray-100 border border-gray-200/60"
          >
            {tech}
          </span>
        ))}
        {exp.technologies.length > 8 && (
          <span className="px-2 py-0.5 rounded-md text-xs text-gray-400">
            +{exp.technologies.length - 8} more
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section ref={ref} id="experience" className="section section-bg-alt" aria-label="Work experience">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Career Journey
          </motion.p>
          <AnimatedText
            text="Where I've Worked"
            className="heading-section block"
            delay={0.1}
          />
          <motion.p
            className="text-gray-500 text-sm mt-3 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            8+ years of professional experience — from aerospace manufacturing to enterprise AI at Verizon.
          </motion.p>
        </div>

        {/* Experience cards */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {visibleExperiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* Show all button */}
        {!showAll && experiences.length > 3 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="btn-outline"
            >
              Load More ({experiences.length - 3} more roles)
              <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
