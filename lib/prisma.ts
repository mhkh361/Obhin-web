import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const hasDb = Boolean(
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.includes('localhost') &&
  !process.env.DATABASE_URL.includes('127.0.0.1')
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma: any = hasDb
  ? (global.prisma ||
      new PrismaClient({
        log: ['error'],
      }))
  : null;

if (process.env.NODE_ENV !== 'production' && hasDb) {
  global.prisma = prisma;
}

export interface SkillItemData {
  id: string;
  order: number;
  title: string;
  name?: string;
  stage?: string;
  description: string;
  category: string;
  iconType?: string;
  githubRepoUrl?: string | null;
  creatorName?: string | null;
  creatorUrl?: string | null;
  isLive: boolean;
  isEnabled?: boolean;
}

export interface ApiProviderData {
  id: string;
  providerKey: string;
  name: string;
  tag: string;
  description: string;
  defaultUrl?: string | null;
  isVisible: boolean;
  order: number;
}

export interface TeamMemberData {
  id: string;
  order: number;
  name: string;
  roleTitle: string;
  bio: string;
  imageUrl: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  updatedAt?: string | Date;
}

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const trafficFilePath = path.join(os.tmpdir(), 'obhin_real_traffic_v1.json');

// In-memory zero-PII fallback store for resilient serverless & local runtime
export const mockStore = {
  keys: [] as Array<{ id: string; [key: string]: any }>,
  traffic: {
    totalPageViews: 0,
    windowsDownloads: 0,
    macDownloads: 0,
    linuxDownloads: 0,
  },
  skills: [
    {
      id: 'skill-web-search-01',
      order: 1,
      title: 'Live Web Search',
      name: 'Live Web Search',
      description: 'Enables real-time search engine browsing and web synthesis capabilities directly within the client.',
      category: 'Tool',
      githubRepoUrl: 'https://github.com/brave/brave-search-api',
      creatorName: '@brave-community',
      creatorUrl: 'https://github.com/brave',
      isLive: true,
      iconType: 'search',
    },
    {
      id: 'skill-sec-audit-02',
      order: 2,
      title: 'Zero-Day AST Security Auditor',
      name: 'Zero-Day AST Security Auditor',
      description: 'Scans AST code outputs to ensure generated artifacts contain zero credential leaks, prompt injections, or OWASP vulnerabilities.',
      category: 'Security',
      githubRepoUrl: 'https://github.com/semgrep/semgrep',
      creatorName: '@semgrep',
      creatorUrl: 'https://github.com/semgrep',
      isLive: true,
      iconType: 'shield',
    },
    {
      id: 'skill-test-gen-03',
      order: 3,
      title: 'Autonomous Test Suite Synthesizer',
      name: 'Autonomous Test Suite Synthesizer',
      description: 'Generates blazing-fast unit and integration test fixtures (Vitest, Jest, PyTest) for all synthesized components.',
      category: 'Coding',
      githubRepoUrl: 'https://github.com/vitest-dev/vitest',
      creatorName: '@vitest-dev',
      creatorUrl: 'https://github.com/vitest-dev',
      isLive: true,
      iconType: 'test',
    },
    {
      id: 'skill-arch-linter-04',
      order: 4,
      title: 'Clean Architecture & Pattern Linter',
      name: 'Clean Architecture & Pattern Linter',
      description: 'Enforces SOLID boundaries, modular clean code separation, and AST structural integrity prior to model payload dispatch.',
      category: 'Coding',
      githubRepoUrl: 'https://github.com/biomejs/biome',
      creatorName: '@biomejs',
      creatorUrl: 'https://github.com/biomejs',
      isLive: true,
      iconType: 'layers',
    },
    {
      id: 'skill-vision-05',
      order: 5,
      title: 'Multi-Modal Vision Inspector',
      name: 'Multi-Modal Vision Inspector',
      description: 'Analyzes screenshots, UI schematics, and design mocks to extract design tokens, layout trees, and accessibility tags.',
      category: 'Vision',
      githubRepoUrl: 'https://github.com/google/generative-ai-js',
      creatorName: '@google-gemini',
      creatorUrl: 'https://github.com/google',
      isLive: true,
      iconType: 'eye',
    },
    {
      id: 'skill-local-gguf-06',
      order: 6,
      title: 'Air-Gapped Local GGUF Engine',
      name: 'Air-Gapped Local GGUF Engine',
      description: 'Zero-cloud offline inference executor powered by high-performance C++ CPU/GPU tensor evaluation.',
      category: 'Productivity',
      githubRepoUrl: 'https://github.com/ggerganov/llama.cpp',
      creatorName: '@ggerganov',
      creatorUrl: 'https://github.com/ggerganov',
      isLive: true,
      iconType: 'cpu',
    },
  ] as SkillItemData[],
  providers: [
    {
      id: 'prov-gemini',
      providerKey: 'GEMINI',
      name: 'Google Gemini',
      tag: 'Multimodal Frontier',
      description: 'Gemini 1.5 Pro, Flash, and 2.0 Flash Thinking models with extensive 1M+ token context windows.',
      defaultUrl: 'https://generativelanguage.googleapis.com/v1beta',
      isVisible: true,
      order: 1,
    },
    {
      id: 'prov-nvidia',
      providerKey: 'NVIDIA',
      name: 'NVIDIA NIM',
      tag: 'Enterprise GPU',
      description: 'Accelerated foundation microservices running Llama-3.1-405B, Nemotron, and Mistral-NeMo.',
      defaultUrl: 'https://integrate.api.nvidia.com/v1',
      isVisible: true,
      order: 2,
    },
    {
      id: 'prov-deepseek',
      providerKey: 'DEEPSEEK',
      name: 'DeepSeek AI',
      tag: 'Reasoning Engine',
      description: 'DeepSeek-V3 and DeepSeek-R1 open reasoning models with high-depth chain-of-thought capabilities.',
      defaultUrl: 'https://api.deepseek.com/v1',
      isVisible: true,
      order: 3,
    },
    {
      id: 'prov-ollama',
      providerKey: 'OLLAMA',
      name: 'Local Ollama / vLLM',
      tag: 'Local Inference (Air-Gapped)',
      description: 'Zero-cloud, privacy-first local inference directly from your machine GPU (Llama 3.2, Qwen 2.5, Mistral).',
      defaultUrl: 'http://localhost:11434/v1',
      isVisible: true,
      order: 4,
    },
    {
      id: 'prov-groq',
      providerKey: 'GROQ',
      name: 'Groq LPU',
      tag: 'Ultra-Low Latency',
      description: 'Real-time inference running on Groq Tensor Streaming Units at 500+ tokens per second.',
      defaultUrl: 'https://api.groq.com/openai/v1',
      isVisible: true,
      order: 5,
    },
    {
      id: 'prov-openai',
      providerKey: 'OPENAI',
      name: 'OpenAI',
      tag: 'GPT-4o & Reasoning',
      description: 'State-of-the-art GPT-4o, GPT-4o-mini, and o1 reasoning models with multimodal support.',
      defaultUrl: 'https://api.openai.com/v1',
      isVisible: true,
      order: 6,
    },
  ] as ApiProviderData[],
  teamMembers: [
    {
      id: 'dev-1',
      order: 1,
      name: 'Lead Systems Architect',
      roleTitle: 'Core Architecture & Autonomous Conductor',
      bio: 'Architected the OBHIN decoupled singularity, multi-agent interceptor pipelines, and high-concurrency execution loops.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://x.com',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'dev-2',
      order: 2,
      name: 'Cryptographic Security Lead',
      roleTitle: 'Zero-Trust Vault & Cloud Infrastructure',
      bio: 'Designed the AES-256-GCM BYOK token shielding protocol, low-latency API proxy routing, and zero-plaintext storage.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://x.com',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'dev-3',
      order: 3,
      name: 'Creative Technologist',
      roleTitle: '3D Prismatic UI & Real-Time Interaction',
      bio: 'Engineered the WebGL Prismatic Crystal Core, monochrome cyber-minimalist glass tokens, and dynamic camera response.',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://x.com',
      updatedAt: new Date().toISOString(),
    },
  ] as TeamMemberData[],
};

export function getTrafficCounts() {
  try {
    if (fs.existsSync(trafficFilePath)) {
      const data = JSON.parse(fs.readFileSync(trafficFilePath, 'utf-8'));
      if (typeof data.totalPageViews === 'number') {
        mockStore.traffic.totalPageViews = Math.max(mockStore.traffic.totalPageViews, data.totalPageViews);
        mockStore.traffic.windowsDownloads = Math.max(mockStore.traffic.windowsDownloads, data.windowsDownloads);
        mockStore.traffic.macDownloads = Math.max(mockStore.traffic.macDownloads, data.macDownloads);
        mockStore.traffic.linuxDownloads = Math.max(mockStore.traffic.linuxDownloads, data.linuxDownloads);
      }
    }
  } catch {
    // ignore
  }
  return mockStore.traffic;
}

export function saveTrafficCounts() {
  try {
    fs.writeFileSync(trafficFilePath, JSON.stringify(mockStore.traffic), 'utf-8');
  } catch {
    // ignore
  }
}

const teamFilePath = path.join(os.tmpdir(), 'obhin_team_members_v1.json');
const repoTeamFilePath = path.join(process.cwd(), 'lib', 'team-data.json');

export function getTeamMembers(): TeamMemberData[] {
  try {
    if (fs.existsSync(teamFilePath)) {
      const data = JSON.parse(fs.readFileSync(teamFilePath, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) {
        mockStore.teamMembers = data;
        return mockStore.teamMembers;
      }
    }
  } catch {
    // ignore
  }

  try {
    if (fs.existsSync(repoTeamFilePath)) {
      const data = JSON.parse(fs.readFileSync(repoTeamFilePath, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) {
        mockStore.teamMembers = data;
        return mockStore.teamMembers;
      }
    }
  } catch {
    // ignore
  }

  return mockStore.teamMembers;
}

export function saveTeamMembers(members: TeamMemberData[]) {
  mockStore.teamMembers = members;
  try {
    fs.writeFileSync(teamFilePath, JSON.stringify(members, null, 2), 'utf-8');
  } catch {
    // ignore
  }
  try {
    fs.writeFileSync(repoTeamFilePath, JSON.stringify(members, null, 2), 'utf-8');
  } catch {
    // ignore
  }
}


