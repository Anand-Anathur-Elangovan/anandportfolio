// Note: This is a Client Component — metadata is set in a parent layout or via generateMetadata in a server wrapper.
'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, BarChart3, TrendingUp, Database, Cpu, Layers } from 'lucide-react';
import { AnimatedText } from '@/components/shared/AnimatedText';

const DS_PROJECTS = [
  {
    title: 'Employee Experience Scoring Engine',
    company: 'Verizon',
    description: 'ML model that ingests telemetry from 50+ data sources to score application health and employee experience. Powers executive dashboards and generates AI-driven improvement recommendations.',
    techs: ['Python', 'BigQuery ML', 'Vertex AI', 'Pandas', 'Scikit-learn'],
    metrics: [{ label: 'Data Sources', value: '50+' }, { label: 'Accuracy', value: '89%' }, { label: 'Users Impacted', value: '40K' }],
    color: '#3B82F6',
  },
  {
    title: 'Predictive Maintenance ML System',
    company: 'Caterpillar',
    description: 'Time-series anomaly detection on IoT sensor data from 50,000+ machines. Classifies failure risk and triggers proactive maintenance alerts, reducing unplanned downtime by 25%.',
    techs: ['Python', 'Scikit-learn', 'Time Series', 'AWS IoT', 'PostgreSQL'],
    metrics: [{ label: 'Machines Monitored', value: '50K+' }, { label: 'Downtime Reduction', value: '25%' }, { label: 'Events/day', value: '10M+' }],
    color: '#F59E0B',
  },
  {
    title: 'VZSQL NL-to-SQL Analytics Engine',
    company: 'Verizon',
    description: 'Natural language interface to BigQuery analytics. Translates business questions to optimised SQL, enabling 200+ non-technical users to self-serve data analysis without writing SQL.',
    techs: ['Gemini', 'BigQuery', 'LangChain', 'Python', 'Next.js'],
    metrics: [{ label: 'Non-Tech Users', value: '200+' }, { label: 'Query Accuracy', value: '91%' }, { label: 'Time Saved', value: '40hrs/wk' }],
    color: '#3B82F6',
  },
  {
    title: 'Application Health Analytics Platform',
    company: 'Verizon',
    description: 'Multi-model telemetry platform that scores application health across 100+ enterprise apps. Uses anomaly detection, trend analysis, and AI insights to surface actionable intelligence.',
    techs: ['Python', 'BigQuery', 'Vertex AI', 'Looker', 'Cloud Run'],
    metrics: [{ label: 'Apps Monitored', value: '100+' }, { label: 'Metrics Tracked', value: '500+' }, { label: 'Dashboards', value: '20+' }],
    color: '#10B981',
  },
];

const ML_SKILLS = [
  { name: 'Feature Engineering', proficiency: 85, color: '#3B82F6' },
  { name: 'Classification Models', proficiency: 82, color: '#3B82F6' },
  { name: 'Anomaly Detection', proficiency: 80, color: '#3B82F6' },
  { name: 'Time Series Forecasting', proficiency: 78, color: '#10B981' },
  { name: 'Clustering', proficiency: 75, color: '#F59E0B' },
  { name: 'A/B Testing', proficiency: 80, color: '#F43F5E' },
  { name: 'BigQuery ML', proficiency: 88, color: '#4285F4' },
  { name: 'Vertex AI AutoML', proficiency: 82, color: '#DB4437' },
  { name: 'NLP / Text Analytics', proficiency: 85, color: '#0EA5E9' },
  { name: 'Recommendation Systems', proficiency: 72, color: '#7C3AED' },
];

const DS_TOOLS = [
  { name: 'Python', icon: '🐍', category: 'Language' },
  { name: 'Pandas', icon: '🐼', category: 'Data' },
  { name: 'NumPy', icon: '🔢', category: 'Data' },
  { name: 'Scikit-learn', icon: '⚙️', category: 'ML' },
  { name: 'BigQuery', icon: '🔍', category: 'Data Warehouse' },
  { name: 'BigQuery ML', icon: '🧠', category: 'ML' },
  { name: 'Vertex AI', icon: '☁️', category: 'ML Platform' },
  { name: 'TensorFlow', icon: '🤖', category: 'Deep Learning' },
  { name: 'Matplotlib', icon: '📊', category: 'Viz' },
  { name: 'Looker', icon: '👁️', category: 'BI' },
  { name: 'Apache Kafka', icon: '⚡', category: 'Streaming' },
  { name: 'dbt', icon: '🔧', category: 'Transform' },
];

function SkillBar({ skill, delay }: { skill: typeof ML_SKILLS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-slate-300">{skill.name}</span>
        <span className="font-mono" style={{ color: skill.color }}>{skill.proficiency}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: skill.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function DataSciencePage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeProject, setActiveProject] = useState<typeof DS_PROJECTS[0] | null>(null);

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section ref={ref} className="section relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-white/10/5 blur-[120px]" />
        </div>
        <div className="container-wide relative z-10">
          <motion.p className="section-label" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}>
            Applied AI
          </motion.p>
          <AnimatedText text="Data Science & Applied AI" className="heading-section text-white block" delay={0.1} />
          <motion.p
            className="text-slate-400 text-base mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            From predictive maintenance on 50,000+ IoT machines to employee experience scoring across Verizon — applied ML and analytics at real enterprise scale.
          </motion.p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { value: '10M+', label: 'Events/day processed' },
              { value: '50K+', label: 'Machines monitored' },
              { value: '89%', label: 'Model accuracy' },
              { value: '5+', label: 'Production ML systems' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section pt-0" aria-label="Data Science projects">
        <div className="container-wide">
          <p className="section-label mb-6">Projects</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DS_PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] cursor-pointer transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                onClick={() => setActiveProject(activeProject?.title === project.title ? null : project)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: project.color + '20', border: `1px solid ${project.color}30` }}
                  >
                    <Brain className="w-5 h-5" style={{ color: project.color }} aria-hidden="true" />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-500 border border-white/[0.06]">
                    {project.company}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{project.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{project.description}</p>

                {/* Metrics */}
                <div className="flex gap-4 mb-4 py-3 px-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-white font-mono">{m.value}</span>
                      <span className="text-[10px] text-slate-600 leading-tight">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techs.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.04]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills + Tools */}
      <section className="section pt-0" aria-label="Data Science skills">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ML Skills */}
            <div>
              <p className="section-label mb-6">ML Capabilities</p>
              <div className="glass rounded-2xl p-6 border border-white/[0.06] flex flex-col gap-4">
                {ML_SKILLS.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} delay={i * 0.04} />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <p className="section-label mb-6">Tools & Libraries</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DS_TOOLS.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    className="glass rounded-xl p-4 border border-white/[0.06] flex flex-col items-center gap-2 text-center hover:border-indigo-500/30 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -2 }}
                  >
                    <span className="text-xl" role="img" aria-label={tool.name}>{tool.icon}</span>
                    <span className="text-xs font-semibold text-white">{tool.name}</span>
                    <span className="text-[10px] text-slate-600">{tool.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section pt-0" aria-label="Data Science approach">
        <div className="container-wide">
          <p className="section-label mb-6">My Approach</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: 'Data-First Thinking',
                desc: 'Start with the data. Understand distribution, quality, and gaps before choosing models. Most ML failures are data failures.',
                color: '#3B82F6',
              },
              {
                icon: TrendingUp,
                title: 'Business Metrics, Not Model Metrics',
                desc: "A 95% accurate model that doesn't move the business needle is worthless. Always anchor to real-world impact.",
                color: '#10B981',
              },
              {
                icon: Cpu,
                title: 'Production-Ready by Design',
                desc: 'Models that can\'t run in production are just expensive experiments. I build with monitoring, retraining, and drift detection from day one.',
                color: '#3B82F6',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="glass rounded-2xl p-6 border border-white/[0.06]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: item.color + '20', border: `1px solid ${item.color}30` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
