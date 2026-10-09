import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
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

export interface MockKeyData {
  id: string;
  userId: string;
  provider: string;
  label?: string;
  encryptedKey: string;
  iv: string;
  authTag: string;
  baseUrl?: string | null;
  isActive?: boolean;
  isDefault?: boolean;
  lastTestedAt?: string;
  latencyMs?: number;
  createdAt: string;
}

// In-memory fallback repository for instant local exploration if DB is unmigrated
export const mockStore = {
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
  keys: [
    {
      id: 'key-demo-nvidia',
      userId: 'default-user',
      provider: 'NVIDIA_NIM',
      label: 'Primary GPU Cluster',
      encryptedKey: 'c838f...encrypted',
      iv: 'a1b2c3d4',
      authTag: 'e5f6',
      baseUrl: 'https://integrate.api.nvidia.com/v1',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'key-demo-gemini',
      userId: 'default-user',
      provider: 'GOOGLE_GEMINI',
      label: 'Google Multimodal Pro',
      encryptedKey: 'f941...encrypted',
      iv: 'd4c3b2a1',
      authTag: '6f5e',
      baseUrl: '',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'key-demo-groq',
      userId: 'default-user',
      provider: 'GROQ',
      label: 'Ultra-Fast LPU',
      encryptedKey: 'e410...encrypted',
      iv: 'b2a1c4d3',
      authTag: '3e4f',
      baseUrl: 'https://api.groq.com/openai/v1',
      isActive: true,
      isDefault: false,
      createdAt: new Date().toISOString(),
    },
  ] as MockKeyData[],
  skills: [
    {
      id: 'sec-audit-v1',
      name: 'Security & Zero-Day Auditor',
      stage: 'POST_EXECUTION',
      description: 'Inspects inputs/outputs for credentials leakage, prompt injections, and OWASP Top 10 vulnerabilities.',
      isEnabled: true,
      priorityOrder: 1,
    },
    {
      id: 'arch-linter-v1',
      name: 'Core Architecture & Linter',
      stage: 'PRE_EXECUTION',
      description: 'Enforces SOLID boundaries, modular clean code conventions, and pattern integrity before model dispatch.',
      isEnabled: true,
      priorityOrder: 2,
    },
    {
      id: 'self-correct-v1',
      name: 'Workflow Guide & Auto-Correction',
      stage: 'ERROR_RECOVERY',
      description: 'Traps runtime execution faults, analyzes stack traces, and prompts models to self-heal and re-evaluate.',
      isEnabled: true,
      priorityOrder: 3,
    },
    {
      id: 'perf-bench-v1',
      name: 'Latency & Token Optimizer',
      stage: 'PRE_EXECUTION',
      description: 'Prunes conversation context history, executes semantic compression, and routes simple tasks to fast LPU.',
      isEnabled: true,
      priorityOrder: 4,
    },
    {
      id: 'test-gen-v1',
      name: 'Autonomous Test Runner',
      stage: 'POST_EXECUTION',
      description: 'Generates unit/integration test suites (Vitest, Jest, PyTest) for every synthesized component.',
      isEnabled: false,
      priorityOrder: 5,
    },
    {
      id: 'doc-engine-v1',
      name: 'Documentation & PRD Generator',
      stage: 'POST_EXECUTION',
      description: 'Synthesizes architecture summaries, Mermaid sequence diagrams, and inline TSDoc/JSDoc annotations.',
      isEnabled: true,
      priorityOrder: 6,
    },
  ],
  downloads: [
    { id: 'dl-1', platform: 'WINDOWS', version: '4.0.0-PROD', downloadedAt: new Date().toISOString() },
    { id: 'dl-2', platform: 'WINDOWS', version: '4.0.0-PROD', downloadedAt: new Date().toISOString() },
    { id: 'dl-3', platform: 'MACOS', version: '4.0.0-PROD', downloadedAt: new Date().toISOString() },
    { id: 'dl-4', platform: 'LINUX', version: '4.0.0-PROD', downloadedAt: new Date().toISOString() },
  ] as Array<{ id?: string; platform: string; version?: string; downloadedAt?: string | Date; timestamp?: string }>,
};
