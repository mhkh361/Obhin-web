'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  FileCode2,
  Cpu,
  RotateCw,
  RefreshCw,
  Eye,
  Search,
  ExternalLink,
} from 'lucide-react';
import { GithubVector } from '@/components/ui/OsVectorIcons';

interface SkillItem {
  id: string;
  title: string;
  name?: string;
  description: string;
  category: string; // Coding, Vision, Tool, Productivity, Security
  githubRepoUrl?: string | null;
  creatorName?: string | null;
  creatorUrl?: string | null;
  isLive?: boolean;
  stage?: string;
  iconType?: string;
}

const DEFAULT_SHOWCASE_SKILLS: SkillItem[] = [
  {
    id: 'skill-web-search-01',
    title: 'Live Web Search',
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
    title: 'Zero-Day AST Security Auditor',
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
    title: 'Autonomous Test Suite Synthesizer',
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
    title: 'Clean Architecture & Pattern Linter',
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
    title: 'Multi-Modal Vision Inspector',
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
    title: 'Air-Gapped Local GGUF Engine',
    description: 'Zero-cloud offline inference executor powered by high-performance C++ CPU/GPU tensor evaluation.',
    category: 'Productivity',
    githubRepoUrl: 'https://github.com/ggerganov/llama.cpp',
    creatorName: '@ggerganov',
    creatorUrl: 'https://github.com/ggerganov',
    isLive: true,
    iconType: 'cpu',
  },
];

export function SkillSwitchGrid() {
  const [skills, setSkills] = useState<SkillItem[]>(DEFAULT_SHOWCASE_SKILLS);
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/skills');
      const data = await res.json();
      if (data.skills && Array.isArray(data.skills)) {
        setSkills(data.skills);
      }
    } catch {
      // fallback to defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const getSkillIcon = (category: string, iconType?: string) => {
    if (iconType === 'shield' || category === 'Security') return <ShieldAlert className="w-5 h-5 text-white" />;
    if (iconType === 'layers' || category === 'Coding') return <Layers className="w-5 h-5 text-white" />;
    if (iconType === 'eye' || category === 'Vision') return <Eye className="w-5 h-5 text-white" />;
    if (iconType === 'search') return <Search className="w-5 h-5 text-white" />;
    if (iconType === 'test') return <CheckCircle2 className="w-5 h-5 text-white" />;
    if (iconType === 'cpu' || category === 'Productivity') return <Cpu className="w-5 h-5 text-white" />;
    return <Sparkles className="w-5 h-5 text-white" />;
  };

  return (
    <section id="skills" className="w-full space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Open-Source Attribution by Design
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.04] text-white">
              PRD v1.4.0 Ecosystem
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Skill Ecosystem Showcase
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
            Every capability is transparently credited to its open-source creator with direct source repository inspection. No black-box components.
          </p>
        </div>

        <button
          onClick={fetchSkills}
          className="p-2 rounded-xl border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
          title="Refresh skills showcase"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Grid of Clean Static Showcase Cards with Creator Attribution (Zero Toggles) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill) => {
          const displayName = skill.title || skill.name || 'Community Skill';
          const category = skill.category || skill.stage || 'Tool';
          const creatorName = skill.creatorName || (skill.githubRepoUrl ? skill.githubRepoUrl.split('/')[3] : 'Open Source');
          const repoUrl = skill.githubRepoUrl;
          const creatorUrl = skill.creatorUrl || repoUrl;

          return (
            <div
              key={skill.id}
              className="prism-glass p-6 rounded-2xl flex flex-col justify-between space-y-5 hover:border-white/40 transition-all duration-300"
            >
              <div className="space-y-3.5">
                {/* Header: Icon, Category Badge & GitHub Link */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/15 flex items-center justify-center">
                    {getSkillIcon(category, skill.iconType)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/10 uppercase tracking-wider">
                      {category}
                    </span>
                    {repoUrl && (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors border border-white/10"
                        title={`Inspect source repository on GitHub: ${repoUrl}`}
                      >
                        <GithubVector className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    {displayName}
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                    ID: {skill.id}
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>

              {/* Open-Source Attribution Footer (PRD v1.4.0 Requirement) */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <span className="text-zinc-500">Built by:</span>
                  {creatorUrl ? (
                    <a
                      href={creatorUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:underline flex items-center gap-1 font-medium"
                    >
                      {creatorName}
                      <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                    </a>
                  ) : (
                    <span className="text-zinc-300">{creatorName}</span>
                  )}
                </div>

                {repoUrl ? (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
                  >
                    <GithubVector className="w-3 h-3" />
                    <span>Source</span>
                  </a>
                ) : (
                  <span className="text-[10px] text-zinc-500">COMMUNITY</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
