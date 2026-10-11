'use client';

import React, { useState, useEffect } from 'react';
import { Github, Globe, FileText, ExternalLink, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { CreditAttribution } from '@/app/api/credits/route';

const DEFAULT_CREDITS: CreditAttribution[] = [
  {
    id: 'credit-lucide',
    title: 'Lucide Icons',
    author: 'Lucide Contributors',
    sourceType: 'github',
    url: 'https://github.com/lucide-icons/lucide',
    description: 'Clean, lightweight, and customizable SVG icon system powering the entire OBHIN Cyber-Minimalist interface.'
  },
  {
    id: 'credit-threejs',
    title: 'Three.js / WebGL',
    author: 'Mr.doob & Community',
    sourceType: 'github',
    url: 'https://github.com/mrdoob/three.js',
    description: 'JavaScript 3D library driving the WebGL Prismatic Crystal Core and real-time interactive canvas.'
  },
  {
    id: 'credit-nextjs',
    title: 'Next.js & React 18',
    author: 'Vercel',
    sourceType: 'website',
    url: 'https://nextjs.org',
    description: 'High-performance React framework for hybrid static & serverless rendering with zero runtime latency.'
  },
  {
    id: 'credit-tailwind',
    title: 'Tailwind CSS',
    author: 'Tailwind Labs',
    sourceType: 'website',
    url: 'https://tailwindcss.com',
    description: 'Utility-first CSS engine powering the obsidian glass tokens, refraction borders, and cybernetic glows.'
  },
  {
    id: 'credit-semgrep',
    title: 'Semgrep AST Engine',
    author: 'Semgrep',
    sourceType: 'github',
    url: 'https://github.com/semgrep/semgrep',
    description: 'Static analysis engine referenced in the Zero-Day AST security auditor skill pipeline.'
  },
  {
    id: 'credit-biome',
    title: 'Biome Formatter & Linter',
    author: 'Biomejs Team',
    sourceType: 'doc',
    url: 'https://biomejs.dev',
    description: 'Ultra-fast toolchain referenced for clean architectural patterns, linter checks, and code formatting.'
  }
];

export function CreditsSection() {
  const [credits, setCredits] = useState<CreditAttribution[]>(DEFAULT_CREDITS);
  const [loading, setLoading] = useState(false);

  const fetchCredits = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/credits');
      const data = await res.json();
      let list = data.credits && Array.isArray(data.credits) && data.credits.length > 0
        ? data.credits
        : DEFAULT_CREDITS;

      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('obhin_custom_credits');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              list = parsed;
            }
          } catch {}
        }
      }

      setCredits(list);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('obhin_custom_credits');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCredits(parsed);
          }
        } catch {}
      }
    }

    fetchCredits();

    const handleSync = () => {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('obhin_custom_credits');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCredits(parsed);
            }
          } catch {}
        }
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('obhin_credits_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('obhin_credits_updated', handleSync);
    };
  }, []);

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="w-3.5 h-3.5" />;
      case 'doc':
        return <FileText className="w-3.5 h-3.5" />;
      default:
        return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="credits" className="w-full space-y-8 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Attributions & Ecosystem
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.04] text-white flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400/20" />
              Open-Source Credits
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1.5">
            Built on the Shoulders of Giants
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
            OBHIN is created with deep gratitude to the global open-source community, foundational research tools, and community-maintained SDKs.
          </p>
        </div>

        <button
          onClick={fetchCredits}
          className="p-2 rounded-xl border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
          title="Refresh Open-Source Credits"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credits.map((item) => (
          <div
            key={item.id}
            className="prism-glass rounded-2xl p-6 flex flex-col justify-between space-y-5 border border-white/10 hover:border-white/25 transition-all group relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/15 bg-white/[0.04] text-zinc-300 inline-flex items-center gap-1.5 uppercase tracking-wider">
                  {getSourceIcon(item.sourceType)}
                  <span>{item.sourceType}</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  by {item.author}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1.5">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors group/link"
              >
                <span>Inspect Source</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
              <span className="text-[10px] font-mono text-zinc-600">CREDIT ATTRIBUTION</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

