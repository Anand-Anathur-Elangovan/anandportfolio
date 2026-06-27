'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Play, Trash2, Zap, Database, Brain, Globe, Code2, MessageSquare } from 'lucide-react';

type NodeType = 'llm' | 'rag' | 'agent' | 'memory' | 'api' | 'database' | 'input' | 'output';

interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  x: number;
  y: number;
  config?: string;
}

const NODE_CONFIGS: Record<NodeType, { icon: React.ElementType; color: string; desc: string; label: string }> = {
  llm:      { icon: Brain,        color: '#3B82F6', desc: 'LLM call — Gemini, GPT, Claude',         label: 'LLM Node' },
  rag:      { icon: MessageSquare,color: '#3B82F6', desc: 'RAG retrieval from vector store',        label: 'RAG Node' },
  agent:    { icon: Zap,          color: '#F59E0B', desc: 'Agentic loop with tool use',             label: 'Agent Node' },
  memory:   { icon: Database,     color: '#10B981', desc: 'Store and retrieve context',             label: 'Memory' },
  api:      { icon: Globe,        color: '#3B82F6', desc: 'External API call',                      label: 'API Call' },
  database: { icon: Database,     color: '#F43F5E', desc: 'Query a database',                       label: 'Database' },
  input:    { icon: Code2,        color: '#94A3B8', desc: 'Workflow input / trigger',               label: 'Input' },
  output:   { icon: Code2,        color: '#94A3B8', desc: 'Workflow output / response',             label: 'Output' },
};

const PRESET_WORKFLOWS: { name: string; nodes: WorkflowNode[]; edges: [string, string][] }[] = [
  {
    name: 'RAG Pipeline',
    nodes: [
      { id: 'n1', type: 'input',    label: 'User Query',    x: 5,  y: 40 },
      { id: 'n2', type: 'rag',      label: 'RAG Retrieve',  x: 30, y: 40 },
      { id: 'n3', type: 'llm',      label: 'Gemini Pro',    x: 60, y: 40 },
      { id: 'n4', type: 'output',   label: 'Response',      x: 82, y: 40 },
    ],
    edges: [['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4']],
  },
  {
    name: 'Agentic Loop',
    nodes: [
      { id: 'n1', type: 'input',    label: 'Task',          x: 5,  y: 40 },
      { id: 'n2', type: 'agent',    label: 'Planner',       x: 28, y: 40 },
      { id: 'n3', type: 'api',      label: 'Tool Call',     x: 55, y: 20 },
      { id: 'n4', type: 'memory',   label: 'Memory',        x: 55, y: 60 },
      { id: 'n5', type: 'llm',      label: 'Reflect',       x: 75, y: 40 },
      { id: 'n6', type: 'output',   label: 'Answer',        x: 88, y: 40 },
    ],
    edges: [['n1','n2'], ['n2','n3'], ['n2','n4'], ['n3','n5'], ['n4','n5'], ['n5','n6']],
  },
];

export function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(PRESET_WORKFLOWS[0].nodes);
  const [edges, setEdges] = useState<[string, string][]>(PRESET_WORKFLOWS[0].edges);
  const [selected, setSelected] = useState<WorkflowNode | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeEdge, setActiveEdge] = useState<number | null>(null);
  const [runStep, setRunStep] = useState(-1);

  const getNode = useCallback((id: string) => nodes.find((n) => n.id === id), [nodes]);

  const loadPreset = (preset: typeof PRESET_WORKFLOWS[0]) => {
    setNodes(preset.nodes);
    setEdges(preset.edges);
    setSelected(null);
    setRunStep(-1);
  };

  const addNode = (type: NodeType) => {
    const cfg = NODE_CONFIGS[type];
    const newNode: WorkflowNode = {
      id: `n${Date.now()}`,
      type,
      label: cfg.label,
      x: 20 + Math.random() * 60,
      y: 15 + Math.random() * 70,
    };
    setNodes((p) => [...p, newNode]);
  };

  const removeNode = (id: string) => {
    setNodes((p) => p.filter((n) => n.id !== id));
    setEdges((p) => p.filter(([a, b]) => a !== id && b !== id));
    if (selected?.id === id) setSelected(null);
  };

  const runWorkflow = async () => {
    setIsRunning(true);
    setRunStep(-1);
    for (let i = 0; i < edges.length; i++) {
      setActiveEdge(i);
      setRunStep(i);
      await new Promise((r) => setTimeout(r, 700));
    }
    setActiveEdge(null);
    setRunStep(-1);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A14]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] overflow-x-auto">
        <span className="text-xs text-slate-500 shrink-0">Presets:</span>
        {PRESET_WORKFLOWS.map((p) => (
          <button key={p.name} onClick={() => loadPreset(p)}
            className="px-3 py-1 rounded-lg text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:text-white whitespace-nowrap transition-colors">
            {p.name}
          </button>
        ))}
        <div className="h-4 w-px bg-white/[0.1] shrink-0" aria-hidden="true" />
        <span className="text-xs text-slate-500 shrink-0">Add node:</span>
        {(['llm', 'rag', 'agent', 'memory', 'api'] as NodeType[]).map((type) => {
          const cfg = NODE_CONFIGS[type];
          return (
            <button key={type} onClick={() => addNode(type)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors hover:text-white whitespace-nowrap"
              style={{ color: cfg.color, background: cfg.color + '15', border: `1px solid ${cfg.color}30` }}>
              <Plus className="w-3 h-3" aria-hidden="true" /> {type.toUpperCase()}
            </button>
          );
        })}
        <button onClick={runWorkflow} disabled={isRunning}
          className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-50 whitespace-nowrap shrink-0 transition-colors">
          <Play className="w-3 h-3" aria-hidden="true" />
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 relative bg-[#070710] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
            aria-hidden="true" />

          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {edges.map(([from, to], i) => {
              const fn = getNode(from); const tn = getNode(to);
              if (!fn || !tn) return null;
              const isActive = activeEdge === i;
              return (
                <g key={i}>
                  <line
                    x1={`${fn.x + 12}%`} y1={`${fn.y + 5}%`}
                    x2={`${tn.x}%`} y2={`${tn.y + 5}%`}
                    stroke={isActive ? '#3B82F6' : 'rgba(59,130,246,0.2)'}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? 'none' : '5,4'}
                  />
                  {isActive && (
                    <motion.circle r="4" fill="#3B82F6"
                      initial={{ cx: `${fn.x + 12}%`, cy: `${fn.y + 5}%` }}
                      animate={{ cx: `${tn.x}%`, cy: `${tn.y + 5}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const cfg = NODE_CONFIGS[node.type];
            const isRunning = runStep >= 0 && edges[runStep]?.includes(node.id);
            return (
              <motion.div
                key={node.id}
                className="absolute cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => setSelected(selected?.id === node.id ? null : node)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="flex flex-col items-center gap-1 w-20 p-2 rounded-xl border-2 transition-all duration-200"
                  style={{
                    background: cfg.color + '15',
                    borderColor: selected?.id === node.id ? cfg.color : isRunning ? '#F59E0B' : cfg.color + '40',
                    boxShadow: isRunning ? `0 0 16px ${cfg.color}60` : selected?.id === node.id ? `0 0 12px ${cfg.color}40` : 'none',
                  }}
                >
                  {(() => {
                    const NodeIcon = cfg.icon as React.FC<{ className?: string; style?: React.CSSProperties }>;
                    return <NodeIcon className="w-4 h-4" style={{ color: cfg.color }} />;
                  })()}
                  <span className="text-[10px] font-semibold text-white text-center leading-tight">{node.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Side panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="w-56 border-l border-white/[0.06] bg-[#0D0D17] p-4 flex flex-col gap-3 shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{selected.type}</p>
                  <p className="text-sm font-bold text-white">{selected.label}</p>
                </div>
                <button onClick={() => removeNode(selected.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${selected.label} node`}>
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{NODE_CONFIGS[selected.type].desc}</p>
              <div className="mt-auto pt-3 border-t border-white/[0.06]">
                <p className="text-[10px] text-slate-600">Drag to reposition · Click to select</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
