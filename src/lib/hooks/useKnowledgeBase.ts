'use client';

import { useMemo } from 'react';
import faqs from '@/lib/knowledge/faqs.json';

interface FAQ {
  question: string;
  keywords: string[];
  answer: string;
}

function cosineSimilarity(a: string, b: string): number {
  const tokenize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

  const tokensA = tokenize(a);
  const tokensB = tokenize(b);

  const freq = (tokens: string[]) =>
    tokens.reduce<Record<string, number>>((acc, t) => {
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});

  const freqA = freq(tokensA);
  const freqB = freq(tokensB);
  const vocab = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);

  let dot = 0, normA = 0, normB = 0;
  for (const word of vocab) {
    const va = freqA[word] ?? 0;
    const vb = freqB[word] ?? 0;
    dot += va * vb;
    normA += va * va;
    normB += vb * vb;
  }

  return normA && normB ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0;
}

function keywordScore(query: string, keywords: string[]): number {
  const q = query.toLowerCase();
  return keywords.reduce((score, kw) => score + (q.includes(kw.toLowerCase()) ? 1 : 0), 0);
}

export function useKnowledgeBase() {
  const typedFaqs = faqs as FAQ[];

  const findAnswer = useMemo(() => {
    return (query: string): string => {
      if (!query.trim()) {
        return "Hi! I'm Anand's AI assistant. Ask me anything — about his experience, projects, skills, or why you should hire him!";
      }

      let best: { faq: FAQ; score: number } | null = null;

      for (const faq of typedFaqs) {
        const kwScore = keywordScore(query, faq.keywords);
        const simScore = cosineSimilarity(query, faq.question) * 5;
        const total = kwScore + simScore;

        if (!best || total > best.score) {
          best = { faq, score: total };
        }
      }

      if (best && best.score > 0.3) {
        return best.faq.answer;
      }

      return `Great question! I don't have a specific answer for that, but I can tell you about Anand's experience at Verizon, his AI projects (VZGPT, VZGenie, VZFlix), his technical skills, certifications, or why he'd be a great hire for your team. What would you like to know?`;
    };
  }, [typedFaqs]);

  const getSuggestedPrompts = (): string[] => [
    'Who is Anand?',
    'Tell me about VZGPT',
    'Explain your AI experience',
    'What is RAG?',
    'Why should we hire Anand?',
    'Show cloud experience',
    'Explain Agentic AI',
  ];

  return { findAnswer, getSuggestedPrompts };
}
