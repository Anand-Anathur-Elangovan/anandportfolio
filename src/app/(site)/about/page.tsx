import type { Metadata } from 'next';
import { ExperienceSection } from '@/components/sections/experience/ExperienceSection';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Anand Anathur Elangovan — AI Engineer, System Architect, and Full Stack Developer with 6+ years experience building enterprise AI products.',
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[120px]" />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <p className="section-label">About Me</p>
            <h1 className="heading-section text-white mb-6">
              Building AI that actually{' '}
              <span className="text-gradient">moves the needle</span>
            </h1>
            <div className="space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                I&apos;m Anand Anathur Elangovan — a System Architect Engineer and AI Engineer
                currently at Verizon, where I lead the design and delivery of enterprise AI
                products. I&apos;ve shipped 9+ production AI systems that are used by thousands
                of Verizon employees every single day.
              </p>
              <p>
                My work sits at the intersection of AI research and production engineering.
                I specialise in agentic AI architectures, RAG pipelines, LLM-powered applications,
                and cloud-native systems on Google Cloud Platform — using Gemini, Vertex AI,
                LangChain, and vector search at enterprise scale.
              </p>
              <p>
                I&apos;m now targeting roles in Australia (Sydney / Melbourne), where I can bring
                rare enterprise AI experience to help ambitious teams build better products.
                I believe the best AI engineers are equal parts systems thinker, product designer,
                and pragmatic engineer.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { title: 'Build real things', desc: 'I bias toward shipping production systems over research prototypes. AI that nobody uses is just an interesting experiment.' },
                { title: 'Think in systems', desc: 'Great AI products are 10% model and 90% system design. I obsess over data flows, failure modes, and latency budgets.' },
                { title: 'Learn relentlessly', desc: 'I went from frontend developer to AI architect in 6 years by staying close to where the frontier is moving.' },
              ].map((v) => (
                <div key={v.title} className="glass rounded-xl p-4 border border-white/[0.06]">
                  <h3 className="text-sm font-bold text-indigo-400 mb-2">{v.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection />
    </div>
  );
}
