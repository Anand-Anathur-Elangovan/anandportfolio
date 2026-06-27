import type { Skill } from '@/types';

export const skills: Skill[] = [
  // ── AI / ML ──────────────────────────────────────────
  { id: 'gemini',       name: 'Google Gemini',     category: 'AI/ML',    proficiency: 92, color: '#3B82F6', yearsOfExperience: 2, description: 'Multimodal LLM APIs, system prompting, function calling, grounding and fine-tuning on Vertex AI.' },
  { id: 'vertex',       name: 'Vertex AI',         category: 'AI/ML',    proficiency: 90, color: '#3B82F6', yearsOfExperience: 2, description: 'Model deployment, Vertex AI Search, Vector Search, AutoML, Pipelines and MLOps.' },
  { id: 'dialogflow',   name: 'Dialogflow CX',     category: 'AI/ML',    proficiency: 85, color: '#3B82F6', yearsOfExperience: 1, description: 'Enterprise conversational AI, intent management, webhook integrations.' },
  { id: 'dspy',         name: 'DSPy',              category: 'AI/ML',    proficiency: 78, color: '#3B82F6', yearsOfExperience: 1, description: 'Declarative prompt optimisation and LLM pipeline composition.' },
  { id: 'langchain',    name: 'LangChain',         category: 'AI/ML',    proficiency: 88, color: '#3B82F6', yearsOfExperience: 2, description: 'Chains, agents, tool use, RAG pipelines and memory management.' },
  { id: 'rag',          name: 'RAG / NL2SQL',      category: 'AI/ML',    proficiency: 90, color: '#3B82F6', yearsOfExperience: 2, description: 'Vector-based and vectorless retrieval, semantic search, NL to SQL generation.' },
  { id: 'agentic',      name: 'Agentic AI',        category: 'AI/ML',    proficiency: 87, color: '#3B82F6', yearsOfExperience: 1, description: 'Autonomous agents, tool-use, planning loops, multi-agent orchestration.' },
  { id: 'prompt',       name: 'Prompt Engineering', category: 'AI/ML',   proficiency: 92, color: '#3B82F6', yearsOfExperience: 2, description: 'System prompt design, few-shot learning, chain-of-thought, evaluation.' },

  // ── Cloud ────────────────────────────────────────────
  { id: 'cloudrun',     name: 'Cloud Run',         category: 'Cloud',    proficiency: 90, color: '#60A5FA', yearsOfExperience: 2, description: 'Serverless container deployments, traffic splitting, autoscaling, Cloud Job orchestration.' },
  { id: 'bigquery',     name: 'BigQuery',          category: 'Cloud',    proficiency: 88, color: '#60A5FA', yearsOfExperience: 2, description: 'Data warehousing, BigQuery ML, analytics pipelines and NL2SQL integration.' },
  { id: 'gcp',          name: 'GCP (Cloud SQL / Redis)', category: 'Cloud', proficiency: 85, color: '#60A5FA', yearsOfExperience: 2, description: 'Managed PostgreSQL on Cloud SQL, Memorystore Redis for caching and session management.' },
  { id: 'docker',       name: 'Docker',            category: 'Cloud',    proficiency: 85, color: '#60A5FA', yearsOfExperience: 4, description: 'Containerisation, multi-stage builds, CI/CD pipelines.' },
  { id: 'cicd',         name: 'GitLab CI/CD',      category: 'Cloud',    proficiency: 82, color: '#60A5FA', yearsOfExperience: 3, description: 'Pipeline automation, deployment stages, environments, GitLab runners.' },
  { id: 'jenkins',      name: 'Jenkins',           category: 'Cloud',    proficiency: 78, color: '#60A5FA', yearsOfExperience: 3, description: 'Build automation, pipeline configuration, and deployment workflows.' },

  // ── Frontend ─────────────────────────────────────────
  { id: 'react',        name: 'React / Redux',     category: 'Frontend', proficiency: 92, color: '#93C5FD', yearsOfExperience: 6, description: 'Component architecture, Redux Toolkit, performance optimisation, hooks.' },
  { id: 'nextjs',       name: 'Next.js',           category: 'Frontend', proficiency: 90, color: '#93C5FD', yearsOfExperience: 4, description: 'App Router, Server Components, SSG, ISR, API routes.' },
  { id: 'typescript',   name: 'TypeScript',        category: 'Frontend', proficiency: 90, color: '#93C5FD', yearsOfExperience: 5, description: 'Strict typing, generics, type-safe APIs and component interfaces.' },
  { id: 'microfrontend',name: 'Microfrontends',    category: 'Frontend', proficiency: 80, color: '#93C5FD', yearsOfExperience: 2, description: 'Module federation, shared design systems, independent deployments.' },

  // ── Backend ──────────────────────────────────────────
  { id: 'python',       name: 'Python',            category: 'Backend',  proficiency: 90, color: '#BFDBFE', yearsOfExperience: 5, description: 'FastAPI, data processing, ML pipelines, GCP integrations.' },
  { id: 'fastapi',      name: 'FastAPI',           category: 'Backend',  proficiency: 88, color: '#BFDBFE', yearsOfExperience: 2, description: 'High-performance async APIs, dependency injection, OpenAPI docs.' },
  { id: 'nodejs',       name: 'Node.js / NestJS',  category: 'Backend',  proficiency: 85, color: '#BFDBFE', yearsOfExperience: 5, description: 'REST APIs, NestJS decorators, microservices, event-driven systems.' },
  { id: 'java',         name: 'Java Spring Boot',  category: 'Backend',  proficiency: 72, color: '#BFDBFE', yearsOfExperience: 3, description: 'Enterprise Java applications, REST APIs, Spring ecosystem.' },
  { id: 'postgres',     name: 'PostgreSQL / Redis', category: 'Backend', proficiency: 85, color: '#BFDBFE', yearsOfExperience: 5, description: 'Relational DB design, query optimisation, Redis caching.' },
  { id: 'security',     name: 'SSO / RBAC / API Security', category: 'Backend', proficiency: 82, color: '#BFDBFE', yearsOfExperience: 3, description: 'OAuth 2.0, JWT, RBAC, API gateway security, enterprise SSO.' },
];
