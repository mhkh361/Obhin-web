'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import {
  Download,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ObhinLogo } from '@/components/ui/ObhinLogo';

// Client-only dynamic import of Three.js Prismatic Crystal Core
const PrismCore3D = dynamic(() => import('@/components/canvas/PrismCore3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full border border-white/20 border-t-white animate-spin" />
        <span className="text-[11px] font-mono tracking-widest text-zinc-400">
          ALIGNING PRISMATIC CRYSTAL CORE...
        </span>
      </div>
    </div>
  ),
});

export function HeroSection() {
  return (
    <section id="singularity" className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-6 pb-16 scroll-mt-20">
      {/* Background Refraction Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-zinc-700/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/15 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            <span className="text-xs font-mono text-zinc-300 font-medium">
              The Power of a New Era
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">100% Free & Open-Source</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
            OBHIN{' '}
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-mono text-zinc-400 font-normal mt-2 tracking-tight">
              (অভিন) — Autonomous AI Workspace
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-light">
            An independent, next-generation autonomous productivity system and execution engine. Connect multi-provider models with encrypted BYOK keys, trigger live self-correcting agent capabilities, and build freely with zero subscription paywalls.
          </p>

          {/* Highlights Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span>Zero-Trust Vault</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-white shrink-0" />
              <span>Multi-Provider BYOK</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-white shrink-0" />
              <span>Self-Correction Loop</span>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a href="#downloads">
              <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download OBHIN v4.0
              </button>
            </a>
            <a href="#apihub">
              <button className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 text-sm transition-all flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-400" />
                Configure API Matrix
              </button>
            </a>
          </div>

          {/* Telemetry Indicator */}
          <div className="pt-2 text-xs font-mono text-zinc-500 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
            <span>Windows, macOS & Linux Binaries Available • No Signup Required</span>
          </div>
        </div>

        {/* Right Column: 3D Prismatic Crystal Core Viewport */}
        <div className="lg:col-span-5 h-[420px] sm:h-[520px] w-full relative rounded-3xl prism-glass flex items-center justify-center p-2 group">
          {/* Subtle Corner Reticles */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 pointer-events-none" />

          {/* Top telemetry tag */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            PRISMATIC CRYSTAL CORE // SINGULARITY MATRIX
          </div>

          <PrismCore3D />
        </div>
      </div>
    </section>
  );
}
