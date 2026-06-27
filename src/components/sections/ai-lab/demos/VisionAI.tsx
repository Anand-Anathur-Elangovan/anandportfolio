'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Eye, Tag, FileText, Sparkles, Image as ImageIcon } from 'lucide-react';

const MOCK_VISION = {
  caption: 'A modern open-plan office with floor-to-ceiling glass windows, ergonomic workstations, and collaborative spaces. Natural light floods the space creating a productive and welcoming environment.',
  objects: [
    { label: 'Office chair', confidence: 0.97, bbox: [10, 30, 25, 60] },
    { label: 'Computer monitor', confidence: 0.95, bbox: [30, 20, 50, 55] },
    { label: 'Window', confidence: 0.98, bbox: [60, 5, 95, 90] },
    { label: 'Desk lamp', confidence: 0.88, bbox: [45, 15, 58, 40] },
    { label: 'Whiteboard', confidence: 0.91, bbox: [5, 10, 25, 40] },
  ],
  text: 'Q3 TARGETS\n• Revenue: $2.4M\n• NPS Score: 8.5\n• Team Growth: +5 engineers',
  insights: [
    'Modern workspace design indicating a tech or startup environment',
    'High-end equipment suggesting company invests in employee productivity',
    'Collaborative layout with both individual and team areas',
    'Natural light and plant life indicate focus on wellbeing',
  ],
  dominant_colors: ['#2E5F8A', '#E8E0D5', '#4A9B6F', '#F5F0E8'],
};

export function VisionAI() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState<typeof MOCK_VISION | null>(null);
  const [activeTab, setActiveTab] = useState<'caption' | 'objects' | 'ocr' | 'insights'>('caption');
  const inputRef = useRef<HTMLInputElement>(null);

  const analyse = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsAnalysing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult(MOCK_VISION);
    setIsAnalysing(false);
    setActiveTab('caption');
  };

  const tabs = [
    { id: 'caption' as const, label: 'Caption', icon: Eye },
    { id: 'objects' as const, label: 'Objects', icon: Tag },
    { id: 'ocr' as const, label: 'Text (OCR)', icon: FileText },
    { id: 'insights' as const, label: 'Insights', icon: Sparkles },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A14]">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left: Image */}
        <div className="p-6 border-r border-white/[0.06] flex flex-col gap-4">
          {previewUrl ? (
            <div className="relative flex-1 rounded-xl overflow-hidden border border-white/[0.08] min-h-[200px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Uploaded image for analysis" className="w-full h-full object-contain bg-black/40" />
              {isAnalysing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                    <p className="text-xs text-white">Analysing image...</p>
                  </div>
                </div>
              )}
              {/* Bounding boxes overlay */}
              {result && activeTab === 'objects' && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                  {result.objects.map((obj, i) => (
                    <rect key={i}
                      x={`${obj.bbox[0]}%`} y={`${obj.bbox[1]}%`}
                      width={`${obj.bbox[2]}%`} height={`${obj.bbox[3]}%`}
                      fill="none" stroke="#3B82F6" strokeWidth="2" rx="4"
                    />
                  ))}
                </svg>
              )}
              <button
                onClick={() => { setPreviewUrl(null); setResult(null); }}
                className="absolute top-2 right-2 w-6 h-6 rounded-md bg-black/70 text-white text-xs flex items-center justify-center"
                aria-label="Remove image"
              >✕</button>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) analyse(f); }}
              onDragOver={(e) => e.preventDefault()}
              className="flex-1 min-h-[200px] border-2 border-dashed border-white/[0.1] hover:border-indigo-500/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group"
              role="button"
              aria-label="Upload image for Vision AI analysis"
            >
              <ImageIcon className="w-10 h-10 text-slate-600 group-hover:text-indigo-400 mb-2 transition-colors" aria-hidden="true" />
              <p className="text-sm font-semibold text-white mb-1">Upload Image</p>
              <p className="text-xs text-slate-500">JPG, PNG, WebP</p>
              <input ref={inputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => e.target.files?.[0] && analyse(e.target.files[0])} />
            </div>
          )}

          {/* Color palette */}
          {result && (
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500 shrink-0">Dominant colors:</p>
              <div className="flex gap-1.5">
                {result.dominant_colors.map((c) => (
                  <div key={c} className="w-6 h-6 rounded-md border border-white/[0.1]"
                    style={{ background: c }} title={c} aria-label={`Color ${c}`} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Results */}
        <div className="flex flex-col p-6 gap-4">
          {result ? (
            <>
              <div className="flex gap-1 flex-wrap">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/[0.04] hover:text-white'
                    }`}
                    role="tab" aria-selected={activeTab === tab.id}
                  >
                    <tab.icon className="w-3 h-3" aria-hidden="true" /> {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto" role="tabpanel">
                {activeTab === 'caption' && (
                  <div className="glass rounded-xl p-5 border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                      <span className="text-xs font-semibold text-indigo-400">AI Caption</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{result.caption}</p>
                  </div>
                )}

                {activeTab === 'objects' && (
                  <div className="flex flex-col gap-2">
                    {result.objects.map((obj, i) => (
                      <div key={i} className="flex items-center justify-between glass rounded-xl p-3 border border-white/[0.04]">
                        <span className="text-sm text-white">{obj.label}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div className="h-full rounded-full bg-indigo-500"
                              initial={{ width: 0 }} animate={{ width: `${obj.confidence * 100}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 }} />
                          </div>
                          <span className="text-xs text-slate-500 w-10 text-right">{(obj.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'ocr' && (
                  <pre className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                    {result.text}
                  </pre>
                )}

                {activeTab === 'insights' && (
                  <div className="flex flex-col gap-3">
                    {result.insights.map((ins, i) => (
                      <motion.div key={i}
                        className="flex items-start gap-2.5 text-sm text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                        {ins}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <Eye className="w-10 h-10 text-slate-700 mx-auto mb-3" aria-hidden="true" />
                <p className="text-sm text-slate-500">Vision AI analysis will appear here</p>
                <p className="text-xs text-slate-600 mt-1">Upload an image to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
