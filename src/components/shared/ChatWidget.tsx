'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Bot, User, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { useKnowledgeBase } from '@/lib/hooks/useKnowledgeBase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-blue-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function StreamingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="whitespace-pre-wrap leading-relaxed">
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-blink text-gray-400">▋</span>
      )}
    </span>
  );
}

export function ChatWidget() {
  const { chatOpen, setChatOpen } = usePortfolioStore();
  const { findAnswer, getSuggestedPrompts } = useKnowledgeBase();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Anand's AI assistant. Ask me anything about his experience, projects, skills, or why he'd be a great hire for your team!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [chatOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      setInput('');

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      setIsTyping(true);

      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

      const answer = findAnswer(text);
      const assistantId = (Date.now() + 1).toString();

      setIsTyping(false);
      setStreamingId(assistantId);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: answer,
          timestamp: new Date(),
        },
      ]);

      setTimeout(() => setStreamingId(null), answer.length * 12 + 500);
    },
    [findAnswer]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTyping) sendMessage(input);
  };

  const suggestedPrompts = getSuggestedPrompts();

  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 flex items-center justify-center transition-all"
            onClick={() => setChatOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Open AI chat"
          >
            <MessageCircle className="w-6 h-6" aria-hidden="true" />
            <span className="absolute w-full h-full rounded-full border-2 border-blue-400/40 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col"
            style={{ height: 'min(600px, calc(100vh - 6rem))' }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Chat with Anand AI"
            aria-modal="true"
          >
            <div className="flex flex-col h-full glass-strong rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/60 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Anand AI</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 min-h-0">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === 'assistant'
                          ? 'bg-gray-900'
                          : 'bg-blue-100'
                      }`}
                      aria-hidden="true"
                    >
                      {msg.role === 'assistant'
                        ? <Bot className="w-3.5 h-3.5 text-white" />
                        : <User className="w-3.5 h-3.5 text-blue-600" />
                      }
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gray-900 text-white rounded-tr-sm'
                          : 'bg-gray-100 text-gray-700 rounded-tl-sm'
                      }`}
                    >
                      {msg.id === streamingId && msg.role === 'assistant' ? (
                        <StreamingText text={msg.content} />
                      ) : (
                        <span className="whitespace-pre-wrap">{msg.content}</span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested prompts */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 shrink-0">
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedPrompts.slice(0, 4).map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200/60 hover:bg-gray-200 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-3 py-3 border-t border-gray-200/60 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-50 border border-gray-200/60 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-blue-400 transition-colors"
                  disabled={isTyping}
                  aria-label="Chat message input"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-xl bg-gray-900 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
