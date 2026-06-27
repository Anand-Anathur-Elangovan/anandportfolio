import type { Metadata } from 'next';
import { ProjectsSection } from '@/components/sections/projects/ProjectsSection';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Enterprise AI projects: VZGPT, VZGenie, VZSQL Editor, VZFlix, CamToCode and more. Production AI systems at Verizon serving thousands of users.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <div className="pt-16">
        <ProjectsSection />
      </div>
    </div>
  );
}
