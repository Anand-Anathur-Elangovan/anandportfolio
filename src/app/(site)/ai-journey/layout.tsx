import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My AI Journey',
  description:
    'From writing HTML in 2015 to designing enterprise multi-agent AI systems — a 10-year journey through React, Cloud, Python, LLMs, RAG, Agentic AI and beyond.',
  openGraph: {
    title: 'My AI Journey — Anand Anathur Elangovan',
    description: 'Frontend → Full Stack → Cloud → Python → AI → Vertex AI → RAG → Agentic AI → Enterprise AI System Architect.',
  },
};

export default function AIJourneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
