import type { Metadata } from 'next';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical articles on AI architecture, Agentic AI, RAG, Vertex AI, Gemini, Cloud Run, and enterprise AI engineering.',
};

const POSTS = [
  {
    slug: 'agentic-ai-enterprise',
    title: 'Agentic AI in the Enterprise: What I Learned Shipping 9 AI Products at Verizon',
    excerpt: 'After shipping 9 production AI systems at Verizon — from VZGPT to VZGenie — here are the hard-won lessons about what makes agentic AI actually work in enterprise environments.',
    tags: ['Agentic AI', 'Enterprise', 'Lessons Learned'],
    readTime: 8,
    publishedAt: '2024-12-10',
    featured: true,
  },
  {
    slug: 'rag-beyond-basics',
    title: 'RAG Beyond the Basics: From Naive Retrieval to Agentic Multi-Source Reasoning',
    excerpt: 'Basic RAG is easy. Production RAG at scale — with Agentic retrieval, re-ranking, query planning, and multi-document synthesis — is a completely different beast. Here\'s how I built it.',
    tags: ['RAG', 'Vertex AI', 'Vector Search'],
    readTime: 12,
    publishedAt: '2024-11-22',
    featured: true,
  },
  {
    slug: 'gemini-vs-gpt-enterprise',
    title: 'Gemini vs GPT-4 for Enterprise AI: A Practical Comparison After 12 Months in Production',
    excerpt: 'After running both in production at scale, here\'s an honest comparison: context window, grounding, cost, latency, and real-world performance for enterprise use cases.',
    tags: ['Gemini', 'Enterprise AI', 'LLMs'],
    readTime: 10,
    publishedAt: '2024-10-15',
    featured: false,
  },
  {
    slug: 'prompt-engineering-production',
    title: 'Prompt Engineering at Scale: How We Manage 500+ Enterprise Prompts at Verizon',
    excerpt: 'When you have 20+ AI applications and hundreds of prompts, you need a system. Here\'s how we built Prompt Gallery — our enterprise prompt versioning and evaluation platform.',
    tags: ['Prompt Engineering', 'LangChain', 'Enterprise'],
    readTime: 7,
    publishedAt: '2024-09-28',
    featured: false,
  },
  {
    slug: 'cloud-run-ai-deployment',
    title: 'Deploying AI APIs on Cloud Run: The Setup I Use for Every Verizon AI Project',
    excerpt: 'Cloud Run is the perfect compute layer for AI microservices — serverless, scalable, and cheap. Here\'s the exact setup, CI/CD pipeline, and monitoring configuration I use.',
    tags: ['Cloud Run', 'GCP', 'DevOps'],
    readTime: 9,
    publishedAt: '2024-08-14',
    featured: false,
  },
];

export default function BlogPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="section">
        <div className="container-wide">
          <div className="mb-16">
            <p className="section-label">Writing</p>
            <h1 className="heading-section text-white mb-4">
              Technical Blog
            </h1>
            <p className="text-slate-400 text-base max-w-xl">
              Deep dives into enterprise AI, cloud architecture, and the lessons from shipping production AI at scale.
            </p>
          </div>

          {/* Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {POSTS.filter((p) => p.featured).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 font-medium">
                    Featured
                  </span>
                </div>
                <h2 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {post.readTime} min read
                    </span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500 border border-white/[0.04]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* All posts */}
          <div className="flex flex-col gap-4">
            {POSTS.filter((p) => !p.featured).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass rounded-xl px-6 py-4 border border-white/[0.06] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-200 group flex items-start gap-6"
              >
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mb-1 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs text-slate-600">
                    {new Date(post.publishedAt).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {post.readTime}m
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
