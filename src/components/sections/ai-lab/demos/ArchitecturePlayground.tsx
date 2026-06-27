'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  type: string;
  description: string;
}

interface ArchDiagram {
  id: string;
  name: string;
  nodes: ArchNode[];
  edges: [string, string][];
}

const DIAGRAMS: ArchDiagram[] = [
  {
    id: 'rag',
    name: 'RAG Architecture',
    nodes: [
      { id: 'user', label: 'User Query', x: 50, y: 50, color: '#3B82F6', type: 'Input', description: 'User submits a natural language question' },
      { id: 'embed', label: 'Embed Query', x: 220, y: 50, color: '#3B82F6', type: 'AI', description: 'Query is converted to a dense vector embedding using text-embedding-004' },
      { id: 'vector', label: 'Vector Store', x: 400, y: 50, color: '#3B82F6', type: 'Database', description: 'Vertex AI Vector Search stores all document embeddings. ANN search returns top-k most similar chunks.' },
      { id: 'chunks', label: 'Retrieved Chunks', x: 400, y: 200, color: '#10B981', type: 'Data', description: 'Top-k relevant text chunks retrieved from the knowledge base' },
      { id: 'prompt', label: 'Prompt Builder', x: 220, y: 200, color: '#F59E0B', type: 'Logic', description: 'Combines system prompt + retrieved chunks + user query into an optimised prompt' },
      { id: 'llm', label: 'Gemini LLM', x: 50, y: 200, color: '#F43F5E', type: 'AI', description: 'Google Gemini generates a grounded, cited response using the retrieved context' },
      { id: 'response', label: 'Response + Citations', x: 50, y: 350, color: '#7C3AED', type: 'Output', description: 'Final response with source citations returned to the user' },
    ],
    edges: [
      ['user', 'embed'], ['embed', 'vector'], ['vector', 'chunks'],
      ['chunks', 'prompt'], ['prompt', 'llm'], ['llm', 'response'],
    ],
  },
  {
    id: 'agentic',
    name: 'Agentic AI',
    nodes: [
      { id: 'user', label: 'User Task', x: 50, y: 150, color: '#3B82F6', type: 'Input', description: 'User provides a complex multi-step task or question' },
      { id: 'planner', label: 'Planner Agent', x: 220, y: 150, color: '#3B82F6', type: 'Agent', description: 'Breaks the task into sub-steps and decides which tools to call' },
      { id: 'tools', label: 'Tool Registry', x: 400, y: 50, color: '#3B82F6', type: 'Service', description: 'Available tools: web search, database query, code execution, API calls' },
      { id: 'memory', label: 'Memory Store', x: 400, y: 150, color: '#10B981', type: 'Storage', description: 'Short-term context window + long-term vector memory for past interactions' },
      { id: 'executor', label: 'Executor Agent', x: 400, y: 250, color: '#F59E0B', type: 'Agent', description: 'Executes the planned steps, calls tools, and retrieves information' },
      { id: 'reflect', label: 'Reflection', x: 220, y: 250, color: '#F43F5E', type: 'Logic', description: 'Evaluates if the result is correct and complete — re-plans if not' },
      { id: 'output', label: 'Final Answer', x: 50, y: 250, color: '#7C3AED', type: 'Output', description: 'Verified, complete response returned to the user' },
    ],
    edges: [
      ['user', 'planner'], ['planner', 'tools'], ['planner', 'memory'],
      ['planner', 'executor'], ['executor', 'reflect'], ['reflect', 'output'],
      ['reflect', 'planner'],
    ],
  },
  {
    id: 'vzgpt',
    name: 'VZGPT Architecture',
    nodes: [
      { id: 'slack', label: 'Slack / Web UI', x: 50, y: 100, color: '#3B82F6', type: 'Interface', description: 'Users interact via Slack messages or the VZGPT web interface' },
      { id: 'api', label: 'Cloud Run API', x: 220, y: 100, color: '#3B82F6', type: 'Service', description: 'FastAPI backend on Cloud Run handles auth, session management, and routing' },
      { id: 'vertex', label: 'Vertex AI', x: 400, y: 50, color: '#3B82F6', type: 'AI', description: 'Google Vertex AI manages model deployment, Vector Search, and embeddings' },
      { id: 'gemini', label: 'Gemini Pro', x: 400, y: 150, color: '#F43F5E', type: 'AI', description: 'Google Gemini generates responses grounded in enterprise context' },
      { id: 'bq', label: 'BigQuery', x: 220, y: 250, color: '#F59E0B', type: 'Database', description: 'Conversation history, analytics, and prompt performance metrics stored in BigQuery' },
      { id: 'confluence', label: 'Confluence', x: 400, y: 250, color: '#10B981', type: 'Source', description: 'Internal Confluence pages indexed and embedded into Vector Search' },
      { id: 'response', label: 'AI Response', x: 50, y: 250, color: '#7C3AED', type: 'Output', description: 'Grounded, cited response delivered back to the user in Slack or web UI' },
    ],
    edges: [
      ['slack', 'api'], ['api', 'vertex'], ['api', 'gemini'],
      ['vertex', 'confluence'], ['gemini', 'bq'], ['api', 'response'],
      ['response', 'slack'],
    ],
  },
];

export function ArchitecturePlayground() {
  const [activeDiagram, setActiveDiagram] = useState(DIAGRAMS[0]);
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);
  const [animatingEdge, setAnimatingEdge] = useState<[string, string] | null>(null);

  const getNodeById = useCallback(
    (id: string) => activeDiagram.nodes.find((n) => n.id === id),
    [activeDiagram]
  );

  const handleNodeClick = useCallback((node: ArchNode) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));

    // Animate edges connected to this node
    const connected = activeDiagram.edges.find(([a, b]) => a === node.id || b === node.id);
    if (connected) {
      setAnimatingEdge(connected);
      setTimeout(() => setAnimatingEdge(null), 1500);
    }
  }, [activeDiagram]);

  return (
    <div className="flex flex-col h-full bg-[#0A0A14]">
      {/* Diagram selector */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.06]">
        {DIAGRAMS.map((d) => (
          <button
            key={d.id}
            onClick={() => { setActiveDiagram(d); setSelectedNode(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeDiagram.id === d.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.06]'
            }`}
          >
            {d.name}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-600">Click nodes to explore</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#070710]">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />

          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="rgba(59,130,246,0.5)" />
              </marker>
            </defs>
            {activeDiagram.edges.map(([from, to], i) => {
              const fromNode = getNodeById(from);
              const toNode = getNodeById(to);
              if (!fromNode || !toNode) return null;
              const isAnimating = animatingEdge?.[0] === from && animatingEdge?.[1] === to;
              return (
                <motion.line
                  key={i}
                  x1={`${fromNode.x + 12}%`}
                  y1={`${fromNode.y + 5}%`}
                  x2={`${toNode.x + 12}%`}
                  y2={`${toNode.y + 5}%`}
                  stroke={isAnimating ? '#3B82F6' : 'rgba(59,130,246,0.25)'}
                  strokeWidth={isAnimating ? 2 : 1}
                  strokeDasharray={isAnimating ? 'none' : '4,4'}
                  markerEnd="url(#arrow)"
                  animate={isAnimating ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 0.6, repeat: 2 }}
                />
              );
            })}
          </svg>

          {activeDiagram.nodes.map((node) => (
            <motion.button
              key={node.id}
              className="absolute flex flex-col items-center gap-1.5 group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => handleNodeClick(node)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${node.label}: ${node.description}`}
            >
              <div
                className={`w-24 h-12 rounded-xl flex items-center justify-center text-xs font-bold text-white border-2 transition-all duration-200 ${
                  selectedNode?.id === node.id ? 'scale-110' : ''
                }`}
                style={{
                  background: node.color + '30',
                  borderColor: selectedNode?.id === node.id ? node.color : node.color + '60',
                  boxShadow: selectedNode?.id === node.id ? `0 0 20px ${node.color}50` : 'none',
                }}
              >
                {node.label}
              </div>
              <span className="text-[10px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {node.type}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Node detail panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              className="w-64 border-l border-white/[0.06] bg-[#0D0D17] p-4 flex flex-col gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: selectedNode.color + '20', border: `1px solid ${selectedNode.color}40` }}
                aria-hidden="true"
              />
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{selectedNode.type}</span>
                <h3 className="text-sm font-bold text-white">{selectedNode.label}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{selectedNode.description}</p>
              <div className="mt-auto pt-3 border-t border-white/[0.06]">
                <p className="text-xs text-slate-600">
                  Part of: <span className="text-indigo-400">{activeDiagram.name}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
