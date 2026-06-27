'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, BookOpen, ExternalLink, Bot, User, ChevronRight } from 'lucide-react';

const KNOWLEDGE_BASE = [
  { id: 'k1', title: 'Agentic AI Overview', source: 'Confluence / AI Architecture', content: 'Agentic AI refers to AI systems that autonomously plan, use tools, and execute multi-step tasks. Key components include: an LLM as the reasoning engine, a tool registry for actions, short-term and long-term memory, and a reflection mechanism to validate outputs.' },
  { id: 'k2', title: 'RAG Architecture Guide', source: 'Confluence / Engineering Docs', content: 'RAG (Retrieval Augmented Generation) enhances LLM outputs by retrieving relevant context from a vector store. Best practices: chunk at sentence boundaries, use hybrid search (BM25 + semantic), implement re-ranking with a cross-encoder, and add explicit citation tracking.' },
  { id: 'k3', title: 'Vertex AI Setup', source: 'Internal Runbooks', content: 'Vertex AI is Google Cloud\'s managed ML platform. Key services: Vertex AI Search for enterprise semantic search, Vertex AI Vector Search for nearest-neighbour retrieval, Model Garden for foundation models, and Pipelines for MLOps automation.' },
  { id: 'k4', title: 'Cloud Run Deployment', source: 'DevOps Handbook', content: 'Cloud Run is a serverless container platform on GCP. Best practices for AI APIs: set min-instances=1 to avoid cold starts, use --cpu=2 for model inference, enable Cloud Tracing for observability, and use Cloud SQL Auth Proxy for database connections.' },
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: typeof KNOWLEDGE_BASE;
}

export function KnowledgeAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm the Knowledge Assistant. I can search across enterprise documents, Confluence pages, and technical runbooks to answer your questions with citations. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setInput('');
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    setMessages((p) => [...p, userMsg]);
    setIsSearching(true);
    await new Promise((r) => setTimeout(r, 1200));

    const q = query.toLowerCase();
    const relevant = KNOWLEDGE_BASE.filter((doc) =>
      doc.content.toLowerCase().split(' ').some((w) => q.includes(w) && w.length > 4) ||
      doc.title.toLowerCase().split(' ').some((w) => q.includes(w) && w.length > 3)
    );

    const sources = relevant.length > 0 ? relevant.slice(0, 2) : KNOWLEDGE_BASE.slice(0, 1);
    const answer = sources.length > 0
      ? `Based on the enterprise knowledge base:\n\n${sources[0].content}\n\nThis information is sourced from "${sources[0].title}" in ${sources[0].source}.`
      : "I searched across 100K+ enterprise documents but couldn't find a specific match. Try rephrasing your question or ask about Agentic AI, RAG, Vertex AI, or Cloud Run.";

    setIsSearching(false);
    setMessages((p) => [...p, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: answer,
      sources,
    }]);
  }, []);

  const suggestions = ['What is Agentic AI?', 'How does RAG work?', 'Vertex AI setup guide', 'Cloud Run deployment'];

  return (
    <div className="flex flex-col h-full bg-[#0A0A14]">
      {/* Source index header */}
      <div className="px-6 py-3 border-b border-white/[0.06] flex items-center gap-3">
        <BookOpen className="w-4 h-4 text-indigo-400" aria-hidden="true" />
        <span className="text-xs text-slate-400">Searching across</span>
        <div className="flex gap-2">
          {['Confluence', 'Runbooks', 'Tech Docs'].map((s) => (
            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/20">{s}</span>
          ))}
        </div>
        <span className="ml-auto text-xs text-slate-600">4 docs indexed</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 min-h-0">
        {messages.map((msg) => (
          <motion.div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'bg-white/[0.1]'}`}>
              {msg.role === 'assistant' ? <Bot className="w-3.5 h-3.5 text-white" aria-hidden="true" /> : <User className="w-3.5 h-3.5 text-white" aria-hidden="true" />}
            </div>
            <div className="max-w-[80%] flex flex-col gap-2">
              <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white/[0.05] text-slate-200 rounded-tl-sm border border-white/[0.06]'}`}>
                <span className="whitespace-pre-wrap">{msg.content}</span>
              </div>
              {/* Citations */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  {msg.sources.map((src) => (
                    <div key={src.id} className="flex items-start gap-2 glass rounded-lg px-3 py-2 border border-indigo-500/15 bg-indigo-950/20">
                      <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-indigo-300">{src.title}</p>
                        <p className="text-[10px] text-slate-500">{src.source}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-600 ml-auto shrink-0" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isSearching && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </div>
            <div className="bg-white/[0.05] rounded-2xl rounded-tl-sm border border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-3 h-3 rounded-full border border-indigo-500/50 border-t-indigo-500 animate-spin" />
                Searching knowledge base...
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button key={s} onClick={() => search(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-600/30 transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); search(input); }}
        className="flex items-center gap-3 px-6 py-4 border-t border-white/[0.06]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search across enterprise knowledge..."
          className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50"
          aria-label="Knowledge search input"
        />
        <button type="submit" disabled={!input.trim() || isSearching}
          className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 flex items-center justify-center transition-colors"
          aria-label="Search">
          <Send className="w-4 h-4 text-white" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
