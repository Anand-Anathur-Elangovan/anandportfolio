'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Star, TrendingUp, Zap } from 'lucide-react';

const MOCK_ANALYSIS = {
  atsScore: 82,
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'REST APIs', 'Agile'],
  strengths: [
    'Strong technical background with modern stack',
    'Quantified achievements with business impact',
    'Clear progression of responsibilities',
  ],
  weaknesses: [
    'Missing keywords: "CI/CD", "Docker", "Kubernetes"',
    'No mention of team leadership or mentoring',
    'Education section could include relevant certifications',
  ],
  improvements: [
    'Add "Led a team of X engineers" to show leadership',
    'Include specific metrics: "Reduced load time by 40%"',
    'Add cloud certifications prominently',
    'Use action verbs: "Architected", "Shipped", "Scaled"',
  ],
  coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your company. With 5+ years of experience building production-grade applications using React, TypeScript, and cloud infrastructure, I am confident I can make an immediate impact on your engineering team.

In my current role, I have shipped multiple features that directly contributed to business growth — including a redesigned checkout flow that increased conversion by 18% and an API optimisation that reduced infrastructure costs by $200K annually.

I am particularly excited about your work in [Company Area] and believe my background in scalable systems and developer experience aligns perfectly with your team's goals.

I would welcome the opportunity to discuss how my skills can benefit your team.

Best regards,
[Your Name]`,
  interviewQuestions: [
    'Tell me about a time you improved system performance significantly.',
    'How do you approach debugging a production issue at 2am?',
    'Describe your experience with microservices architecture.',
    'What is your process for code reviews?',
    'How do you prioritise technical debt vs new features?',
  ],
};

export function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState<typeof MOCK_ANALYSIS | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'cover-letter' | 'interview'>('overview');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const analyse = async () => {
    if (!file) return;
    setIsAnalysing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult(MOCK_ANALYSIS);
    setIsAnalysing(false);
    setActiveTab('overview');
  };

  const scoreColor = (score: number) =>
    score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#F43F5E';

  return (
    <div className="flex flex-col h-full bg-[#0A0A14] p-6 gap-6">
      {!result ? (
        <>
          {/* Upload area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-white/[0.1] hover:border-indigo-500/50 rounded-2xl p-12 text-center cursor-pointer transition-colors group"
            role="button"
            aria-label="Upload resume file"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              aria-label="Resume file input"
            />
            <Upload className="w-10 h-10 text-slate-600 group-hover:text-indigo-400 transition-colors mx-auto mb-4" aria-hidden="true" />
            <p className="text-sm font-semibold text-white mb-1">Drop your resume here</p>
            <p className="text-xs text-slate-500">PDF, DOC, DOCX, or TXT — up to 5MB</p>
          </div>

          {file && (
            <motion.div
              className="flex items-center justify-between glass rounded-xl p-4 border border-indigo-500/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                onClick={analyse}
                disabled={isAnalysing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {isAnalysing ? (
                  <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Analysing...</>
                ) : (
                  <><Zap className="w-4 h-4" aria-hidden="true" /> Analyse Resume</>
                )}
              </button>
            </motion.div>
          )}

          {/* What it analyses */}
          <div className="grid grid-cols-2 gap-3">
            {['ATS Score', 'Skills Extraction', 'Cover Letter', 'Interview Questions', 'Strengths/Weaknesses', 'Improvements'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </>
      ) : (
        <motion.div className="flex flex-col gap-4 flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* ATS Score */}
          <div className="flex items-center gap-6 glass rounded-xl p-4 border border-white/[0.06]">
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <motion.circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke={scoreColor(result.atsScore)}
                  strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 15.9}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 15.9}` }}
                  animate={{ strokeDashoffset: `${2 * Math.PI * 15.9 * (1 - result.atsScore / 100)}` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: scoreColor(result.atsScore) }}>
                {result.atsScore}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">ATS Score</p>
              <p className="text-sm font-bold text-white">
                {result.atsScore >= 80 ? 'Strong' : result.atsScore >= 60 ? 'Good' : 'Needs Work'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {result.atsScore >= 80 ? 'This resume will pass most ATS filters' : 'Some improvements recommended'}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {(['overview', 'cover-letter', 'interview'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-white/[0.04]'
                }`}
                role="tab" aria-selected={activeTab === tab}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
            <button
              onClick={() => { setFile(null); setResult(null); }}
              className="ml-auto text-xs text-slate-500 hover:text-white transition-colors"
            >
              Upload New
            </button>
          </div>

          <div className="flex-1 overflow-y-auto" role="tabpanel">
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Detected Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {result.skills.map((s) => (
                      <span key={s} className="px-2 py-1 rounded-lg text-xs bg-indigo-600/20 text-indigo-300 border border-indigo-500/20">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Strengths</p>
                  {result.strengths.map((s) => (
                    <div key={s} className="flex items-start gap-2 text-xs text-slate-300 mb-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" /> {s}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Areas to Improve</p>
                  {result.weaknesses.map((w) => (
                    <div key={w} className="flex items-start gap-2 text-xs text-slate-300 mb-1.5">
                      <AlertCircle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" aria-hidden="true" /> {w}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Recommendations</p>
                  {result.improvements.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 mb-1.5">
                      <span className="text-indigo-400 shrink-0">▸</span> {r}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cover-letter' && (
              <pre className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                {result.coverLetter}
              </pre>
            )}

            {activeTab === 'interview' && (
              <div className="flex flex-col gap-3">
                {result.interviewQuestions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 glass rounded-xl p-3 border border-white/[0.04]">
                    <span className="text-indigo-400 font-mono text-xs shrink-0 mt-0.5">Q{i + 1}</span>
                    <span className="text-xs text-slate-300">{q}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
