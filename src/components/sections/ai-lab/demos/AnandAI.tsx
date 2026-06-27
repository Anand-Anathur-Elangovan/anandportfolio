'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { useKnowledgeBase } from '@/lib/hooks/useKnowledgeBase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function StreamingMessage({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        onDone?.();
      }
    }, 10);
    return () => clearInterval(timer);
  }, [text, onDone]);

  return (
    <span className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
      {displayed}
      {displayed.length < text.length && (
        <span className="text-indigo-400 animate-pulse">▋</span>
      )}
    </span>
  );
}

const SUGGESTED = [
  'Who is Anand?',
  'Tell me about VZGPT',
  'What is Agentic AI?',
  'Show cloud experience',
  'Why should we hire Anand?',
  'What is RAG?',
  'Explain your AI experience',
  'What projects have you built?',
];

export function AnandAI() {
  const { findAnswer } = useKnowledgeBase();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Anand's AI assistant — trained on his experience, projects, and expertise. Ask me anything! 🚀\n\nI can tell you about his work at Verizon, explain AI concepts like RAG and Agentic AI, or help you understand why he'd be a great hire.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((p) => [...p, userMsg]);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));

    const answer = findAnswer(text);
    const aid = (Date.now() + 1).toString();

    setIsTyping(false);
    setStreamingId(aid);
    setMessages((p) => [...p, { id: aid, role: 'assistant', content: answer }]);
    setTimeout(() => setStreamingId(null), answer.length * 10 + 500);
  }, [isTyping, findAnswer]);

  return (
    <div className="flex flex-col h-full bg-[#0A0A14]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 min-h-0">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant'
                  ? 'bg-gradient-to-br from-indigo-500 to-violet-600'
                  : 'bg-white/[0.1]'
              }`}
              aria-hidden="true"
            >
              {msg.role === 'assistant'
                ? <Bot className="w-4 h-4 text-white" />
                : <User className="w-4 h-4 text-white" />
              }
            </div>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white text-sm rounded-tr-sm'
                  : 'bg-white/[0.05] rounded-tl-sm border border-white/[0.06]'
              }`}
            >
              {msg.id === streamingId ? (
                <StreamingMessage text={msg.content} />
              ) : (
                <span className="text-sm leading-relaxed whitespace-pre-wrap text-slate-200">
                  {msg.content}
                </span>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div className="bg-white/[0.05] rounded-2xl rounded-tl-sm border border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-1" aria-label="Assistant is typing">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                    transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-3">
          <p className="text-xs text-slate-600 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-600/30 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 pb-6 pt-2 border-t border-white/[0.06]">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex items-center gap-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Anand..."
            className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors"
            disabled={isTyping}
            aria-label="Chat message input"
          />
          <button
            type="button"
            onClick={() => {
              setMessages([{
                id: '1',
                role: 'assistant',
                content: "Hi! I'm Anand's AI assistant. Ask me anything! 🚀",
              }]);
            }}
            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Clear conversation"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-white" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
