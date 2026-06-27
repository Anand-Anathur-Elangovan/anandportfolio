'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, RefreshCw, ChevronDown } from 'lucide-react';

const PROMPT_TEMPLATES = [
  {
    name: 'Customer Support',
    prompt: 'You are a helpful customer support agent for a SaaS company. Be friendly, concise, and always offer a solution. If you cannot solve the issue, escalate with empathy.',
    category: 'Business',
  },
  {
    name: 'Code Reviewer',
    prompt: 'You are an expert senior software engineer. Review the provided code for: bugs, security vulnerabilities, performance issues, and code style. Be specific with line numbers and provide corrected code snippets.',
    category: 'Engineering',
  },
  {
    name: 'RAG System',
    prompt: 'You are a helpful assistant. Answer the question using ONLY the provided context. If the context does not contain enough information, say "I don\'t have enough information to answer this." Always cite your sources.\n\nContext: {context}\n\nQuestion: {question}',
    category: 'AI',
  },
  {
    name: 'SQL Generator',
    prompt: 'You are a BigQuery SQL expert. Convert natural language questions to optimised SQL. Always:\n1. Use appropriate aggregations\n2. Add WHERE clauses for performance\n3. Include comments explaining complex logic\n4. Format for readability\n\nSchema: {schema}',
    category: 'Data',
  },
];

const OPTIMISED_SUFFIXES = [
  '\n\nIMPORTANT: Be concise. Use bullet points. Limit response to 3 paragraphs maximum.',
  '\n\nAlways start your response with a one-sentence summary. Then provide details.',
  '\n\nFormat your response as: [SUMMARY], [DETAILS], [ACTION ITEMS].',
  '\n\nThink step-by-step before answering. Show your reasoning.',
];

const MODELS = ['Gemini 2.0 Flash', 'Gemini 2.0 Pro', 'GPT-4o mini', 'Claude 3 Haiku'] as const;

export function PromptPlayground() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState<typeof MODELS[number]>('Gemini 2.0 Flash');
  const [optimised, setOptimised] = useState('');
  const [isOptimising, setIsOptimising] = useState(false);
  const [copied, setCopied] = useState<'original' | 'optimised' | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'compare'>('editor');

  const optimisePrompt = async () => {
    if (!prompt.trim()) return;
    setIsOptimising(true);
    await new Promise((r) => setTimeout(r, 1500));
    const suffix = OPTIMISED_SUFFIXES[Math.floor(Math.random() * OPTIMISED_SUFFIXES.length)];
    const improved = prompt
      .replace(/you are/gi, 'You are an expert')
      .replace(/help me/gi, 'Provide detailed assistance to')
      + suffix;
    setOptimised(improved);
    setIsOptimising(false);
    setActiveTab('compare');
  };

  const copyText = async (text: string, id: 'original' | 'optimised') => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A14] p-6 gap-5">
      {/* Model selector */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500 shrink-0">Model:</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select AI model">
          {MODELS.map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                model === m ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:text-white'
              }`}
              aria-pressed={model === m}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        {(['editor', 'compare'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-white/[0.1] text-white' : 'text-slate-500 hover:text-white'
            }`}
          >
            {tab === 'editor' ? 'Prompt Editor' : 'Before / After'}
          </button>
        ))}
      </div>

      {activeTab === 'editor' && (
        <div className="flex flex-col gap-4 flex-1">
          {/* Templates */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Load Template</p>
            <div className="flex flex-wrap gap-2">
              {PROMPT_TEMPLATES.map((t) => (
                <button key={t.name} onClick={() => setPrompt(t.prompt)}
                  className="px-3 py-1 rounded-lg text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:text-white hover:border-white/[0.12] transition-colors">
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt textarea */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your system prompt here...

Example: You are a helpful assistant that specialises in explaining AI concepts to non-technical stakeholders. Use analogies and avoid jargon."
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/40 resize-none font-mono leading-relaxed"
            aria-label="Prompt editor"
          />

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-xs text-slate-600">
              <span>{prompt.length} chars</span>
              <span>~{Math.ceil(prompt.length / 4)} tokens</span>
            </div>
            <button
              onClick={optimisePrompt}
              disabled={!prompt.trim() || isOptimising}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors disabled:opacity-40"
            >
              {isOptimising ? (
                <><RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" /> Optimising...</>
              ) : (
                <><Sparkles className="w-4 h-4" aria-hidden="true" /> Optimise Prompt</>
              )}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'compare' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {/* Original */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Original</span>
              <button onClick={() => copyText(prompt, 'original')} className="text-xs text-slate-500 hover:text-white flex items-center gap-1 transition-colors">
                {copied === 'original' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-xs text-slate-400 font-mono leading-relaxed overflow-y-auto">
              {prompt || <span className="text-slate-600">No prompt entered yet</span>}
            </div>
            <div className="text-xs text-slate-600">{Math.ceil(prompt.length / 4)} tokens</div>
          </div>

          {/* Optimised */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Optimised</span>
              <button onClick={() => copyText(optimised, 'optimised')} className="text-xs text-slate-500 hover:text-white flex items-center gap-1 transition-colors">
                {copied === 'optimised' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <div className="flex-1 bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 text-xs text-slate-300 font-mono leading-relaxed overflow-y-auto">
              {optimised || (
                <span className="text-slate-600">
                  {isOptimising ? 'Optimising...' : 'Click "Optimise Prompt" to see improvements'}
                </span>
              )}
            </div>
            {optimised && <div className="text-xs text-slate-600">{Math.ceil(optimised.length / 4)} tokens</div>}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="pt-3 border-t border-white/[0.04]">
        <p className="text-xs text-slate-600">
          💡 Tip: Good prompts have a clear role, specific constraints, output format instructions, and examples.
          Inspired by the <span className="text-indigo-400">Prompt Gallery</span> enterprise system I built at Verizon.
        </p>
      </div>
    </div>
  );
}
