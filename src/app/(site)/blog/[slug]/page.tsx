import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const POSTS: Record<string, {
  title: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  content: string;
}> = {
  'agentic-ai-enterprise': {
    title: 'Agentic AI in the Enterprise: What I Learned Shipping 9 AI Products at Verizon',
    publishedAt: '2024-12-10',
    readTime: 8,
    tags: ['Agentic AI', 'Enterprise', 'Lessons Learned'],
    content: `
## The Reality of Enterprise AI

After 2+ years building production AI systems at Verizon — from VZGPT to VZGenie to the Hypercare AI Assistant — I've learned that the gap between "AI demo" and "AI in production" is enormous.

Here's what nobody tells you when you start.

## Lesson 1: Most AI Failures Are Systems Problems, Not Model Problems

When VZGPT first launched, we saw a 70% user satisfaction rate. Not bad, but not good enough for enterprise adoption. The model was working correctly. The problem was everything around it:

- **Latency**: Users expect search-engine speed. 8-second responses feel broken.
- **Context staleness**: Our Confluence index was 2 weeks old. Users were getting outdated answers.
- **Hallucination on edge cases**: When the retrieval failed, the model would confidently make things up.

The fix wasn't a better model. It was better RAG chunking, async index updates, and explicit "I don't know" prompting.

## Lesson 2: Prompt Management is Non-Negotiable at Scale

When you have 20 AI applications, each with 10-20 system prompts, you need a system. We were storing prompts in code. This meant:

- Changing a prompt required a deployment
- No A/B testing capability
- No evaluation framework
- Prompts diverged across applications

This is why I built **Prompt Gallery** — an enterprise prompt versioning and evaluation platform. Treat prompts like code: version control, review, test, deploy.

## Lesson 3: Agentic AI Requires Defensive Architecture

Agentic systems that can plan, use tools, and take actions are powerful. They're also unpredictable. What happens when:

- An agent loops indefinitely?
- An agent makes 500 API calls instead of 5?
- An agent executes an action it shouldn't?

You need: step limits, cost budgets, human-in-the-loop checkpoints, audit logging, and rollback capability. Build these in from day one.

## Lesson 4: User Trust is Built in Milliseconds, Destroyed in Microseconds

Enterprise users are sceptical of AI. One bad answer — especially a confident wrong answer — can destroy months of adoption work. Our solutions:

- Mandatory citations on every answer
- Explicit uncertainty signals ("I'm not confident about this")
- Source highlighting in retrieved documents
- "Report incorrect answer" feedback loop

## Lesson 5: The Last 20% Takes 80% of the Time

Getting to 80% accuracy in a demo is easy. Getting to 94% in production with real users asking unpredictable questions is hard. Budget for it.

---

The AI products that succeed in enterprise aren't the ones with the best models. They're the ones with the best systems around the models.

That's what I build.
    `.trim(),
  },
  'rag-beyond-basics': {
    title: 'RAG Beyond the Basics: From Naive Retrieval to Agentic Multi-Source Reasoning',
    publishedAt: '2024-11-22',
    readTime: 12,
    tags: ['RAG', 'Vertex AI', 'Vector Search'],
    content: `
## The Problem with Basic RAG

Everyone knows basic RAG: embed documents, store vectors, retrieve top-k, stuff in context, generate response.

It works for demos. It breaks in production.

Here's why, and how I built something better for VZGenie at Verizon.

## Stage 1: Naive RAG (and why it fails)

\`\`\`python
# Naive RAG — works in demos, fails in production
def naive_rag(query: str) -> str:
    chunks = vector_store.search(query, k=5)
    context = "\\n".join(chunks)
    return llm.generate(f"Context: {context}\\n\\nQuery: {query}")
\`\`\`

Problems:
- **Semantic mismatch**: The query embedding ≠ the answer embedding
- **No re-ranking**: Top-5 cosine similarity ≠ most relevant chunks
- **Single retrieval**: One query can't capture multi-faceted questions
- **No temporal awareness**: Can't handle "recent" or "latest" queries
- **Context stuffing**: 5 chunks * 500 tokens = 2500 tokens that may be irrelevant

## Stage 2: Advanced RAG

Improvements that actually move the needle:

### Multi-Query Retrieval
\`\`\`python
def multi_query_rag(query: str) -> str:
    # Generate 3 query variations
    sub_queries = llm.generate_sub_queries(query)
    
    all_chunks = []
    for q in [query] + sub_queries:
        chunks = vector_store.search(q, k=3)
        all_chunks.extend(chunks)
    
    # Deduplicate and re-rank
    unique_chunks = deduplicate(all_chunks)
    ranked_chunks = cross_encoder.rerank(query, unique_chunks)
    
    return llm.generate(context=ranked_chunks[:5], query=query)
\`\`\`

### Hybrid Search (Semantic + Keyword)

Pure semantic search misses exact matches. Adding BM25 keyword search improves recall significantly, especially for technical terms, product names, and codes.

## Stage 3: Agentic RAG

For VZGenie, we needed to reason across 100,000+ Confluence pages. That required an agentic approach:

\`\`\`python
class AgenteRAG:
    def answer(self, query: str) -> str:
        # Plan: decompose complex query
        plan = self.planner.decompose(query)
        
        # Execute: parallel retrieval across sub-queries
        results = parallel_retrieve(plan.sub_queries)
        
        # Synthesize: combine evidence
        evidence = self.synthesizer.combine(results)
        
        # Verify: check for contradictions
        verified = self.verifier.check(evidence)
        
        # Cite: attach sources
        return self.generator.answer_with_citations(query, verified)
\`\`\`

## The Results

On VZGenie:
- Naive RAG: 71% accuracy
- Advanced RAG: 84% accuracy  
- Agentic RAG: 92% accuracy

The 8% improvement from Advanced→Agentic took 3x longer to build. But for an enterprise knowledge platform, that accuracy gap is the difference between adoption and rejection.

---

The right RAG architecture depends on your use case. But if you're building for enterprise, don't stop at naive.
    `.trim(),
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: `${post.readTime} min read · ${post.tags.join(', ')}`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug] ?? {
    title: 'Coming Soon',
    publishedAt: '2024-12-01',
    readTime: 5,
    tags: ['AI', 'Engineering'],
    content: `This article is being written. Check back soon!\n\nIn the meantime, explore the other articles or try the AI Lab demos.`,
  };

  const lines = post.content.split('\n');

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="py-20 border-b border-white/[0.04]">
        <div className="container-wide max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-600/20 text-indigo-400 border border-indigo-500/20">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">{post.title}</h1>

          <div className="flex items-center gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              {new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {post.readTime} min read
            </span>
            <span>by Anand Anathur Elangovan</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide max-w-3xl py-16">
        <article className="prose prose-invert prose-sm max-w-none">
          {lines.map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4">{line.slice(3)}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-base font-bold text-indigo-400 mt-6 mb-3">{line.slice(4)}</h3>;
            }
            if (line.startsWith('```')) {
              return null; // handled below
            }
            if (line.startsWith('- **')) {
              const match = line.match(/\*\*(.+?)\*\*: (.+)/);
              if (match) {
                return (
                  <p key={i} className="text-sm text-slate-400 leading-relaxed pl-4 border-l-2 border-indigo-500/30 my-2">
                    <strong className="text-white">{match[1]}:</strong> {match[2]}
                  </p>
                );
              }
            }
            if (line.startsWith('- ')) {
              return (
                <p key={i} className="text-sm text-slate-400 leading-relaxed flex gap-2 my-1">
                  <span className="text-indigo-400 shrink-0">▸</span>
                  {line.slice(2)}
                </p>
              );
            }
            if (line.startsWith('---')) {
              return <hr key={i} className="border-white/[0.06] my-8" />;
            }
            if (line.trim() === '') {
              return <div key={i} className="h-3" />;
            }
            return (
              <p key={i} className="text-sm text-slate-400 leading-relaxed my-2">
                {line.replace(/\*\*(.+?)\*\*/g, '').trim() || line}
              </p>
            );
          })}
        </article>

        {/* Author card */}
        <div className="mt-16 pt-12 border-t border-white/[0.04]">
          <div className="glass rounded-2xl p-6 border border-white/[0.06] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shrink-0">
              A
            </div>
            <div>
              <p className="text-sm font-bold text-white">Anand Anathur Elangovan</p>
              <p className="text-xs text-slate-500 mt-0.5 mb-3">System Architect Engineer · AI Engineer at Verizon</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Building production AI systems at enterprise scale. 9+ AI products shipped at Verizon.
                Available for AI engineering roles in Sydney and Melbourne, Australia.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/blog" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
