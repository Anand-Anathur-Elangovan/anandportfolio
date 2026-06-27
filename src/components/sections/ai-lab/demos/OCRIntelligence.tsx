'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Search, Table, Tag, MessageSquare, Sparkles } from 'lucide-react';

const MOCK_OCR = {
  rawText: `INVOICE #INV-2024-00892
Date: November 15, 2024
Due Date: December 15, 2024

BILL TO:
Verizon Business
One Verizon Way
Basking Ridge, NJ 07920

SERVICES RENDERED:
Cloud Infrastructure Services    $12,500.00
AI Model Deployment              $8,200.00
Support & Maintenance            $3,300.00

SUBTOTAL:                        $24,000.00
GST (10%):                       $2,400.00
TOTAL DUE:                       $26,400.00

Payment Terms: Net 30
Bank: ANZ Business Banking
BSB: 012-003
Account: 456789012`,

  entities: [
    { type: 'Invoice Number', value: 'INV-2024-00892', confidence: 0.99 },
    { type: 'Date', value: 'November 15, 2024', confidence: 0.98 },
    { type: 'Due Date', value: 'December 15, 2024', confidence: 0.97 },
    { type: 'Total Amount', value: '$26,400.00', confidence: 0.99 },
    { type: 'Company', value: 'Verizon Business', confidence: 0.96 },
    { type: 'Bank BSB', value: '012-003', confidence: 0.98 },
  ],

  tables: [
    { description: 'Cloud Infrastructure Services', amount: '$12,500.00' },
    { description: 'AI Model Deployment', amount: '$8,200.00' },
    { description: 'Support & Maintenance', amount: '$3,300.00' },
    { description: 'Subtotal', amount: '$24,000.00' },
    { description: 'GST (10%)', amount: '$2,400.00' },
    { description: 'Total Due', amount: '$26,400.00' },
  ],

  summary: 'This is a business invoice (#INV-2024-00892) dated November 15, 2024 from a cloud services provider to Verizon Business. The invoice covers Cloud Infrastructure Services ($12,500), AI Model Deployment ($8,200), and Support & Maintenance ($3,300), totalling $24,000 before GST. Including 10% GST, the total due is $26,400 with payment due by December 15, 2024.',

  qaResponses: {
    'What is the total amount due?': 'The total amount due is $26,400.00, which includes $24,000.00 in services plus $2,400.00 GST (10%).',
    'When is payment due?': 'Payment is due on December 15, 2024 (Net 30 terms from invoice date of November 15, 2024).',
    'What services are included?': 'Three services are billed: Cloud Infrastructure Services ($12,500), AI Model Deployment ($8,200), and Support & Maintenance ($3,300).',
    'What are the bank details?': 'ANZ Business Banking, BSB: 012-003, Account: 456789012.',
  },
};

type TabId = 'text' | 'entities' | 'table' | 'summary' | 'qa';

export function OCRIntelligence() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<typeof MOCK_OCR | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('text');
  const [question, setQuestion] = useState('');
  const [qaAnswer, setQaAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const process = async (f: File) => {
    setFile(f);
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult(MOCK_OCR);
    setIsProcessing(false);
    setActiveTab('summary');
  };

  const askQuestion = async () => {
    if (!question.trim() || !result) return;
    setQaAnswer('');
    await new Promise((r) => setTimeout(r, 800));
    const lq = question.toLowerCase();
    const matched = Object.entries(result.qaResponses).find(([q]) =>
      q.toLowerCase().split(' ').some((w) => lq.includes(w) && w.length > 3)
    );
    setQaAnswer(matched?.[1] ?? 'Based on the document, I can see invoice details, services, amounts, and payment terms. Please ask about the total, due date, services, or bank details.');
  };

    const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'entities', label: 'Entities', icon: Tag },
    { id: 'table', label: 'Tables', icon: Table },
    { id: 'text', label: 'Raw Text', icon: Search },
    { id: 'qa', label: 'Q&A', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A14] p-6 gap-5">
      {!result ? (
        <div className="flex flex-col gap-4 h-full">
          <div
            onClick={() => inputRef.current?.click()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) process(f); }}
            onDragOver={(e) => e.preventDefault()}
            className="flex-1 border-2 border-dashed border-white/[0.1] hover:border-indigo-500/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors group"
            role="button"
            aria-label="Upload document for OCR"
          >
            <input ref={inputRef} type="file" accept=".pdf,.jpg,.png,.jpeg" className="hidden"
              onChange={(e) => e.target.files?.[0] && process(e.target.files[0])} />
            <FileText className="w-10 h-10 text-slate-600 group-hover:text-indigo-400 transition-colors mb-3" aria-hidden="true" />
            <p className="text-sm font-semibold text-white mb-1">Upload Document</p>
            <p className="text-xs text-slate-500">PDF, JPG, PNG — Invoices, Forms, Reports</p>
          </div>

          {isProcessing && (
            <div className="text-center py-4">
              <div className="w-6 h-6 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-400">Extracting text and entities...</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {['Text Extraction', 'Table Detection', 'Entity Recognition', 'Q&A over Document', 'Summarisation', 'Confidence Scores'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" aria-hidden="true" />
                {f}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div className="flex flex-col gap-4 flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon as React.FC<{ className?: string }>;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/[0.04] hover:text-white'
                  }`}
                  role="tab" aria-selected={activeTab === tab.id}
                >
                  <TabIcon className="w-3 h-3" /> {tab.label}
                </button>
              );
            })}
            <button onClick={() => { setFile(null); setResult(null); }}
              className="ml-auto text-xs text-slate-500 hover:text-white px-2 whitespace-nowrap">
              New Doc
            </button>
          </div>

          <div className="flex-1 overflow-y-auto" role="tabpanel">
            {activeTab === 'text' && (
              <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                {result.rawText}
              </pre>
            )}

            {activeTab === 'entities' && (
              <div className="flex flex-col gap-2">
                {result.entities.map((e) => (
                  <div key={e.type} className="flex items-center justify-between glass rounded-xl p-3 border border-white/[0.04]">
                    <div>
                      <p className="text-xs text-indigo-400 font-semibold">{e.type}</p>
                      <p className="text-sm text-white">{e.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Confidence</p>
                      <p className="text-xs font-bold text-emerald-400">{(e.confidence * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'table' && (
              <table className="w-full text-xs" aria-label="Extracted table data">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="py-2 text-left text-slate-500 font-semibold">Description</th>
                    <th className="py-2 text-right text-slate-500 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {result.tables.map((row, i) => (
                    <tr key={i} className={`border-b border-white/[0.03] ${row.description.includes('Total') ? 'font-bold text-white' : 'text-slate-300'}`}>
                      <td className="py-2.5">{row.description}</td>
                      <td className="py-2.5 text-right">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'summary' && (
              <div className="glass rounded-xl p-5 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">AI Summary</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{result.summary}</p>
              </div>
            )}

            {activeTab === 'qa' && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                    placeholder="Ask about this document..."
                    className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500/50"
                    aria-label="Document question input"
                  />
                  <button onClick={askQuestion} className="px-4 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors">
                    Ask
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(result.qaResponses).map((q) => (
                    <button key={q} onClick={() => { setQuestion(q); setQaAnswer(result.qaResponses[q as keyof typeof result.qaResponses]); }}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06] hover:text-white transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
                {qaAnswer && (
                  <motion.div
                    className="glass rounded-xl p-4 border border-indigo-500/20 bg-indigo-600/5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-xs text-slate-300 leading-relaxed">{qaAnswer}</p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
