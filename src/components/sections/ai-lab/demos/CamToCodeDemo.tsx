'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Code2, Eye, Copy, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

const FRAMEWORKS = ['React', 'Next.js', 'HTML', 'Tailwind', 'Vue'] as const;
type Framework = typeof FRAMEWORKS[number];

const GENERATED_CODE: Record<Framework, string> = {
  React: `import React from 'react';

interface CardProps {
  title: string;
  description: string;
  badge?: string;
}

export const Card: React.FC<CardProps> = ({ title, description, badge }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-sm hover:shadow-lg transition-shadow">
      {badge && (
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-4">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
        Learn More
      </button>
    </div>
  );
};`,
  'Next.js': `// app/components/Card.tsx
interface CardProps {
  title: string;
  description: string;
  badge?: string;
  href?: string;
}

export default function Card({ title, description, badge, href }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-sm hover:shadow-lg transition-all hover:-translate-y-1">
      {badge && (
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-4">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      <a href={href ?? '#'} className="mt-4 block text-center py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
        Learn More
      </a>
    </div>
  );
}`,
  HTML: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Component</title>
  <style>
    .card {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.07);
      padding: 1.5rem;
      max-width: 20rem;
      transition: box-shadow 0.2s;
    }
    .card:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .badge { background: #EEF2FF; color: #4F46E5; font-size: 0.75rem; padding: 0.25rem 0.75rem; border-radius: 999px; }
    .btn { width: 100%; padding: 0.5rem; background: #4F46E5; color: white; border: none; border-radius: 0.75rem; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">New</span>
    <h3>Card Title</h3>
    <p>Card description text goes here.</p>
    <button class="btn">Learn More</button>
  </div>
</body>
</html>`,
  Tailwind: `<!-- Tailwind CSS Card Component -->
<div class="bg-white rounded-2xl shadow-md p-6 max-w-sm hover:shadow-lg transition-all hover:-translate-y-1">
  <span class="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-4">
    New
  </span>
  <h3 class="text-lg font-bold text-gray-900 mb-2">Card Title</h3>
  <p class="text-gray-500 text-sm leading-relaxed mb-4">
    Card description text goes here with some detail.
  </p>
  <button class="w-full py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
    Learn More
  </button>
</div>`,
  Vue: `<template>
  <div class="card" @mouseover="hovered = true" @mouseleave="hovered = false">
    <span v-if="badge" class="badge">{{ badge }}</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button @click="$emit('click')">Learn More</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const hovered = ref(false);
defineProps<{ title: string; description: string; badge?: string }>();
defineEmits(['click']);
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; transition: box-shadow 0.2s; }
.badge { background: #EEF2FF; color: #4F46E5; font-size: 0.75rem; padding: 0.25rem 0.75rem; border-radius: 999px; }
</style>`,
};

export function CamToCodeDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('React');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'code' | 'preview'>('code');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setGenerated(false);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  };

  const generate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGenerated(true);
    setIsGenerating(false);
    setActiveView('code');
  };

  const copy = async () => {
    await navigator.clipboard.writeText(GENERATED_CODE[framework]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A14]">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left: Upload */}
        <div className="p-6 border-r border-white/[0.06] flex flex-col gap-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upload UI Screenshot</p>

          {previewUrl ? (
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] flex-1 min-h-[200px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Uploaded UI screenshot" className="w-full h-full object-contain bg-white/5" />
              <button
                onClick={() => { setFile(null); setPreviewUrl(null); setGenerated(false); }}
                className="absolute top-2 right-2 w-6 h-6 rounded-md bg-black/60 text-white text-xs flex items-center justify-center hover:bg-black/80"
                aria-label="Remove uploaded image"
              >
                ✕
              </button>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onDragOver={(e) => e.preventDefault()}
              className="flex-1 min-h-[200px] border-2 border-dashed border-white/[0.1] hover:border-indigo-500/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group"
              role="button"
              aria-label="Upload UI screenshot"
            >
              <ImageIcon className="w-8 h-8 text-slate-600 group-hover:text-indigo-400 transition-colors mb-2" aria-hidden="true" />
              <p className="text-xs text-slate-500">Click or drop screenshot here</p>
              <input ref={inputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
          )}

          {/* Framework selector */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Output Framework</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose output framework">
              {FRAMEWORKS.map((fw) => (
                <button
                  key={fw}
                  onClick={() => setFramework(fw)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    framework === fw ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:text-white'
                  }`}
                  aria-pressed={framework === fw}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>

          {file && (
            <button
              onClick={generate}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="w-4 h-4" aria-hidden="true" /> Generate {framework} Code</>
              )}
            </button>
          )}
        </div>

        {/* Right: Generated code */}
        <div className="flex flex-col">
          {generated ? (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1">
                  {(['code', 'preview'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveView(v)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeView === v ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {v === 'code' ? <Code2 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {v === 'code' ? 'Code' : 'Preview'}
                    </button>
                  ))}
                </div>
                <button onClick={copy} className="flex items-center gap-1 text-xs text-slate-500 hover:text-white transition-colors">
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {activeView === 'code' ? (
                <pre className="flex-1 p-4 text-xs text-emerald-300 font-mono leading-relaxed overflow-auto">
                  {GENERATED_CODE[framework]}
                </pre>
              ) : (
                <div className="flex-1 bg-white p-6 overflow-auto">
                  <div className="bg-white rounded-2xl shadow-md p-6 max-w-xs mx-auto">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-4">New</span>
                    <h3 className="text-base font-bold text-gray-900 mb-2">Card Component</h3>
                    <p className="text-gray-500 text-sm mb-4">Preview of the generated UI component from your screenshot.</p>
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium">Learn More</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <Code2 className="w-10 h-10 text-slate-700 mx-auto mb-3" aria-hidden="true" />
                <p className="text-sm text-slate-500">Generated code will appear here</p>
                <p className="text-xs text-slate-600 mt-1">Upload an image and click Generate</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
