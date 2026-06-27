'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help          — show this message
  whoami        — about Anand
  skills        — list top skills
  experience    — work history
  projects      — list projects
  contact       — contact info
  clear         — clear terminal
  exit          — close terminal`,

  whoami: `Anand Anathur Elangovan
System Architect Engineer | AI Engineer
Verizon · 6+ years experience
Building enterprise AI at scale.
Target: Sydney / Melbourne, Australia`,

  skills: `TOP SKILLS:
  ▸ Google Gemini       ████████████ 95%
  ▸ Vertex AI           ███████████  90%
  ▸ RAG Systems         ███████████  90%
  ▸ Python              ███████████  90%
  ▸ React / Next.js     ███████████  92%
  ▸ Cloud Run           ███████████  90%
  ▸ LangChain           ██████████   88%
  ▸ Prompt Engineering  ███████████  92%`,

  experience: `WORK HISTORY:
  2022-Present  Verizon        AI Engineer / System Architect
  2020-2022     LTIMindtree    Senior Software Engineer
  2019-2020     Caterpillar    Software Engineer (IoT/ML)
  2018-2019     KunaAerospace  Frontend Developer
  2023-Present  Living Fire AU Freelance Full Stack (Sydney)`,

  projects: `ENTERPRISE AI PROJECTS:
  01  VZGPT           — Enterprise AI Copilot (5K DAUs)
  02  VZSQL Editor    — NL to BigQuery SQL
  03  VZGenie         — Agentic Knowledge Platform
  04  VZFlix          — AI Video Intelligence
  05  Prompt Gallery  — Enterprise Prompt Management
  06  Hypercare AI    — Incident Triage Assistant
  07  Citrix AI       — Troubleshooting Assistant
  08  CamToCode       — Image to UI Code
  09  Living Fire AU  — Premium e-commerce (Sydney)`,

  contact: `CONTACT:
  Email:    anand.anathur@email.com
  LinkedIn: linkedin.com/in/anand-anathur
  GitHub:   github.com/anand-anathur
  Location: Sydney, Australia (open to remote)
  Status:   Available for AI/ML/Engineering roles`,
};

interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: string;
}

export function TerminalMode() {
  const { terminalMode, setTerminalMode, discoverEgg } = usePortfolioStore();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: '🔓 Developer mode activated. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalMode) {
      discoverEgg('terminal');
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [terminalMode, discoverEgg]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TerminalLine[] = [
      { type: 'input', content: `$ ${cmd}` },
    ];

    if (cmd === 'clear') {
      setLines([{ type: 'system', content: 'Terminal cleared.' }]);
      setInput('');
      return;
    }

    if (cmd === 'exit') {
      setTerminalMode(false);
      setInput('');
      return;
    }

    const response = COMMANDS[cmd];
    if (response) {
      newLines.push({ type: 'output', content: response });
    } else {
      newLines.push({ type: 'output', content: `Command not found: "${cmd}". Type "help" for available commands.` });
    }

    setLines((prev) => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {terminalMode && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-label="Developer terminal"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={() => setTerminalMode(false)}
            aria-hidden="true"
          />
          <motion.div
            className="relative w-full max-w-2xl bg-[#0A0A0F] border border-green-500/30 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.2)] font-mono"
            style={{ height: 'min(500px, 80vh)' }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-black/50 border-b border-green-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" aria-hidden="true" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" aria-hidden="true" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" aria-hidden="true" />
              </div>
              <span className="text-xs text-green-400/60">anand@portfolio ~ terminal</span>
              <button
                onClick={() => setTerminalMode(false)}
                className="text-green-500/60 hover:text-green-400 transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Output */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 text-xs" style={{ height: 'calc(100% - 80px)' }}>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === 'input'
                      ? 'text-white'
                      : line.type === 'system'
                      ? 'text-indigo-400'
                      : 'text-green-400'
                  }`}
                >
                  {line.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-green-500/20 bg-black/30">
              <span className="text-green-400 text-xs shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white text-xs outline-none caret-green-400"
                placeholder="type a command..."
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
