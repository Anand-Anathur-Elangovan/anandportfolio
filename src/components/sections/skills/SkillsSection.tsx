'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skills } from '@/lib/data/skills';
import { AnimatedText } from '@/components/shared/AnimatedText';
import type { Skill, SkillCategory } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORY_COLORS: Record<SkillCategory, string> = {
  'AI/ML':      '#1E40AF',
  'Cloud':      '#3B82F6',
  'Frontend':   '#6B7280',
  'Backend':    '#374151',
  'Data':       '#1E40AF',
  'DevOps':     '#3B82F6',
  'Languages':  '#6B7280',
  'Frameworks': '#374151',
};

function SkillPill({
  skill,
  isSelected,
  onClick,
  delay,
}: {
  skill: Skill;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={cn(
        'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border',
        isSelected
          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
          : 'text-gray-600 hover:text-gray-900 border-gray-200/60 hover:border-gray-300 bg-white'
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-pressed={isSelected}
      aria-label={`${skill.name} skill, ${skill.proficiency}% proficiency`}
    >
      {skill.name}
      {skill.proficiency >= 85 && (
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400" title="Expert level" aria-label="Expert level" />
      )}
    </motion.button>
  );
}

function SkillDetailPanel({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const color = CATEGORY_COLORS[skill.category] ?? '#3B82F6';

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
            style={{ background: color + '15', color }}
          >
            {skill.category}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-900 text-xs transition-colors"
          aria-label="Close skill details"
        >
          ✕
        </button>
      </div>

      {/* Proficiency bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-400">Proficiency</span>
          <span style={{ color }} className="font-mono font-bold">{skill.proficiency}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.proficiency}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="text-center">
          <div className="text-gray-900 font-bold">{skill.yearsOfExperience}+</div>
          <div className="text-xs text-gray-400">Years</div>
        </div>
        <div className="text-center">
          <div className="text-gray-900 font-bold capitalize">
            {skill.proficiency >= 85 ? 'Expert' : skill.proficiency >= 70 ? 'Advanced' : 'Intermediate'}
          </div>
          <div className="text-xs text-gray-400">Level</div>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [filterCategory, setFilterCategory] = useState<SkillCategory | 'All'>('All');

  const categories: (SkillCategory | 'All')[] = ['All', 'AI/ML', 'Cloud', 'Frontend', 'Backend', 'Data'];

  const filteredSkills = filterCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === filterCategory);

  return (
    <section ref={ref} id="skills" className="section section-bg" aria-label="Skills">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Expertise
          </motion.p>
          <AnimatedText
            text="Skills & Technologies"
            className="heading-section block"
            delay={0.1}
          />
          <motion.p
            className="text-gray-500 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Click any skill to see details. Stars indicate expert-level proficiency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Skills cloud */}
          <div className="lg:col-span-2">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter skills by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border',
                    filterCategory === cat
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'text-gray-500 hover:text-gray-900 bg-white border-gray-200/60 hover:border-gray-300'
                  )}
                  aria-pressed={filterCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills pills */}
            <div className="flex flex-wrap gap-3">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, i) => (
                  <SkillPill
                    key={skill.id}
                    skill={skill}
                    isSelected={selectedSkill?.id === skill.id}
                    onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
                    delay={i * 0.03}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Detail panel or category overview */}
          <div>
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <SkillDetailPanel
                  key={selectedSkill.id}
                  skill={selectedSkill}
                  onClose={() => setSelectedSkill(null)}
                />
              ) : (
                <motion.div
                  key="overview"
                  className="glass rounded-2xl p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-sm font-semibold text-gray-600 mb-4">By Category</h3>
                  <div className="flex flex-col gap-3">
                    {(Object.keys(CATEGORY_COLORS) as SkillCategory[]).map((cat) => {
                      const catSkills = skills.filter((s) => s.category === cat);
                      if (catSkills.length === 0) return null;
                      const avgProf = catSkills.reduce((a, s) => a + s.proficiency, 0) / catSkills.length;
                      const color = CATEGORY_COLORS[cat];
                      return (
                        <div key={cat}>
                          <div className="flex justify-between text-xs mb-1">
                            <span style={{ color }} className="font-medium">{cat}</span>
                            <span className="text-gray-400">{catSkills.length} skills</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: color }}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${avgProf}%` } : {}}
                              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
