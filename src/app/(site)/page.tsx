import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { ProjectsSection } from '@/components/sections/projects/ProjectsSection';
import { ExperienceSection } from '@/components/sections/experience/ExperienceSection';
import { SkillsSection } from '@/components/sections/skills/SkillsSection';
import { CertificationsSection } from '@/components/sections/certifications/CertificationsSection';
import { ContactCTA } from '@/components/sections/contact/ContactCTA';

export const metadata: Metadata = {
  title: 'Anand Anathur Elangovan — AI Architect & System Engineer',
  description:
    'System Architect Engineer at Verizon, Chennai. Building enterprise AI, Agentic systems, RAG and cloud-native applications with Google Gemini, Vertex AI and LangChain.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactCTA />
    </>
  );
}
