'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Copy, Check, Sparkles, Database } from 'lucide-react';

const SQL_EXAMPLES: Array<{
  query: string;
  sql: string;
  explanation: string;
  results: Record<string, string | number>[];
  columns: string[];
}> = [
  {
    query: 'Show me the top 5 customers by revenue',
    sql: `SELECT 
  c.customer_name,
  c.company,
  SUM(o.amount) AS total_revenue,
  COUNT(o.id) AS total_orders
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
GROUP BY c.id, c.customer_name, c.company
ORDER BY total_revenue DESC
LIMIT 5;`,
    explanation: 'This query joins the customers table with orders, aggregates revenue and order count per customer for the last year, and returns the top 5 by total revenue.',
    columns: ['customer_name', 'company', 'total_revenue', 'total_orders'],
    results: [
      { customer_name: 'Acme Corp', company: 'Acme Inc.', total_revenue: 284500, total_orders: 42 },
      { customer_name: 'TechStream', company: 'TechStream Ltd', total_revenue: 195200, total_orders: 28 },
      { customer_name: 'GlobalOps', company: 'Global Ops Pty', total_revenue: 156800, total_orders: 35 },
      { customer_name: 'DataVault', company: 'DataVault Co', total_revenue: 134200, total_orders: 19 },
      { customer_name: 'NovaSys', company: 'NovaSys AU', total_revenue: 118900, total_orders: 31 },
    ],
  },
  {
    query: 'What is the average order value by product category?',
    sql: `SELECT 
  p.category,
  COUNT(oi.id) AS total_items,
  ROUND(AVG(oi.unit_price), 2) AS avg_price,
  ROUND(AVG(o.amount), 2) AS avg_order_value
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
GROUP BY p.category
ORDER BY avg_order_value DESC;`,
    explanation: 'This query aggregates order items by product category, calculating the average unit price and average total order value per category.',
    columns: ['category', 'total_items', 'avg_price', 'avg_order_value'],
    results: [
      { category: 'Enterprise Software', total_items: 1240, avg_price: 450.00, avg_order_value: 3200.00 },
      { category: 'Cloud Services', total_items: 892, avg_price: 280.00, avg_order_value: 2100.00 },
      { category: 'Consulting', total_items: 456, avg_price: 175.00, avg_order_value: 1800.00 },
      { category: 'Hardware', total_items: 2100, avg_price: 95.50, avg_order_value: 840.00 },
    ],
  },
  {
    query: 'Show monthly revenue trend for this year',
    sql: `SELECT 
  FORMAT_DATE('%Y-%m', created_at) AS month,
  COUNT(*) AS orders,
  SUM(amount) AS revenue,
  ROUND(SUM(amount) / COUNT(*), 2) AS avg_order_value
FROM orders
WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY month
ORDER BY month ASC;`,
    explanation: 'This query groups orders by month for the current year, showing order count, total revenue, and average order value per month — useful for identifying trends.',
    columns: ['month', 'orders', 'revenue', 'avg_order_value'],
    results: [
      { month: '2026-01', orders: 142, revenue: 284000, avg_order_value: 2000 },
      { month: '2026-02', orders: 128, revenue: 256000, avg_order_value: 2000 },
      { month: '2026-03', orders: 165, revenue: 346500, avg_order_value: 2100 },
      { month: '2026-04', orders: 189, revenue: 415800, avg_order_value: 2200 },
      { month: '2026-05', orders: 201, revenue: 462300, avg_order_value: 2300 },
      { month: '2026-06', orders: 178, revenue: 409400, avg_order_value: 2300 },
    ],
  },
];

export function SQLAIDemo() {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<typeof SQL_EXAMPLES[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'sql' | 'results' | 'explanation'>('sql');

  const handleGenerate = async () => {
    if (!query.trim()) return;
    setIsGenerating(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    // Match to closest example or use first
    const matched = SQL_EXAMPLES.find(
      (e) => query.toLowerCase().includes('customer') || query.toLowerCase().includes('revenue')
        ? e.query.toLowerCase().includes('customer')
        : query.toLowerCase().includes('category') || query.toLowerCase().includes('average')
        ? e.query.toLowerCase().includes('average')
        : true
    ) ?? SQL_EXAMPLES[0];

    setResult(matched);
    setIsGenerating(false);
    setActiveTab('sql');
  };

  const copySQL = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A14] p-6 gap-6">
      {/* Input */}
      <div>
        <label className="text-xs text-slate-500 mb-2 block font-semibold uppercase tracking-wider">
          Ask in plain English
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. Show top customers by revenue..."
            className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors"
            aria-label="Natural language SQL query input"
          />
          <button
            onClick={handleGenerate}
            disabled={!query.trim() || isGenerating}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            aria-label="Generate SQL"
          >
            {isGenerating ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            )}
            Generate SQL
          </button>
        </div>

        {/* Example queries */}
        <div className="flex flex-wrap gap-2 mt-3">
          {SQL_EXAMPLES.map((ex) => (
            <button
              key={ex.query}
              onClick={() => setQuery(ex.query)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06] hover:text-white hover:border-white/[0.12] transition-colors"
            >
              {ex.query}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            className="flex items-center justify-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400 animate-pulse" aria-hidden="true" />
                <span className="text-sm text-slate-400">Generating SQL...</span>
              </div>
              <div className="w-48 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {result && !isGenerating && (
          <motion.div
            className="flex flex-col gap-4 flex-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-white/[0.06] pb-0">
              {(['sql', 'results', 'explanation'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'text-indigo-400 border-indigo-500'
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab}
                >
                  {tab}
                </button>
              ))}
              <div className="ml-auto">
                <button
                  onClick={copySQL}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors px-2 py-1"
                  aria-label="Copy SQL to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy SQL'}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto" role="tabpanel">
              {activeTab === 'sql' && (
                <pre className="bg-black/40 rounded-xl p-4 text-xs text-emerald-300 font-mono leading-relaxed overflow-x-auto border border-white/[0.04]">
                  {result.sql}
                </pre>
              )}

              {activeTab === 'results' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs" aria-label="Query results">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        {result.columns.map((col) => (
                          <th key={col} className="px-4 py-2 text-left text-slate-500 font-semibold uppercase tracking-wider">
                            {col.replace(/_/g, ' ')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.results.map((row, i) => (
                        <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                          {result.columns.map((col) => (
                            <td key={col} className="px-4 py-2.5 text-slate-300">
                              {typeof row[col] === 'number' && col.includes('revenue')
                                ? `$${Number(row[col]).toLocaleString()}`
                                : String(row[col])
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'explanation' && (
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                  <p className="text-sm text-slate-300 leading-relaxed">{result.explanation}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <Play className="w-3 h-3" aria-hidden="true" />
                    Inspired by VZSQL Editor — built at Verizon for BigQuery analytics
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
