import type { Metadata } from 'next';
import { SkillsSection } from '@/components/sections/skills/SkillsSection';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills: Google Gemini, Vertex AI, LangChain, RAG, React, Next.js, Python, Cloud Run, BigQuery and more.',
};

export default function SkillsPage() {
  return (
    <div className="pt-16">
      <div className="pt-8">
        <SkillsSection />
      </div>
    </div>
  );
}
