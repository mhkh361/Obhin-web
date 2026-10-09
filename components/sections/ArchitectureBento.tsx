'use client';

import React from 'react';
import {
  Layers,
  Cpu,
  Database,
  Shield,
  Zap,
  Lock,
  Workflow,
  Sparkles,
} from 'lucide-react';

export function ArchitectureBento() {
  return (
    <section className="w-full space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            System Topology
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.04] text-white">
            Decoupled Singularity
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          High-Level OBHIN Architecture
        </h2>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
          Engineered for zero-latency agentic loops, pluggable model routing, and end-to-end cryptographic key protection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Layer 1: Client Presentation */}
        <div className="prism-glass p-6 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Layer 01
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Client & 3D WebGL Canvas
            </h3>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            High-fidelity monochrome prism aesthetic with translucent refractions. Rendered via React Three Fiber with dynamic crystal raycasting and zero-hydration telemetry.
          </p>

          <ul className="space-y-2 text-xs font-mono text-zinc-300 pt-3 border-t border-white/10">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>Pitch Black (#000000) & Obsidian Surface</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>3D Prismatic Crystal Core Mesh</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>Left-Docked Side-Toggle Navigation Rail</span>
            </li>
          </ul>
        </div>

        {/* Layer 2: Backend Orchestration */}
        <div className="prism-glass p-6 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/20 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Layer 02
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Decoupled Backend Engine
            </h3>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            Interceptor pattern execution engine with pre-validation, adaptive multi-provider model routing, and post-execution security auditing.
          </p>

          <ul className="space-y-2 text-xs font-mono text-zinc-300 pt-3 border-t border-white/10">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>AES-256-GCM Zero-Trust Vault</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>Dynamic Interceptor Skill Pipeline</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>Error Self-Healing & Recovery Hooks</span>
            </li>
          </ul>
        </div>

        {/* Layer 3: Persistence Layer */}
        <div className="prism-glass p-6 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Layer 03
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Prisma & Storage Architecture
            </h3>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            Type-safe relational schema with dynamic team member registry, encrypted key tokens, and anonymous OS platform telemetry logs.
          </p>

          <ul className="space-y-2 text-xs font-mono text-zinc-300 pt-3 border-t border-white/10">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>Prisma ORM PostgreSQL Database</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>Dynamic Founder Team Member Schema</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>Anonymized Download Telemetry Logs</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Horizontal Pipeline Diagram Card */}
      <div className="prism-glass p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-white" /> SEQUENTIAL INTERCEPTOR PIPELINE
            </span>
            <h4 className="text-base font-bold text-white">
              Autonomous Self-Correcting Execution Lifecycle
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-white/10">
              1. Pre-Check (Arch Linter)
            </div>
            <span className="text-zinc-500">→</span>
            <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-white border border-white/20">
              2. Router (NVIDIA / Gemini / Groq)
            </div>
            <span className="text-zinc-500">→</span>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-white/10">
              3. Verification (Sec-Audit)
            </div>
            <span className="text-zinc-500">→</span>
            <div className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-white border border-white/30">
              4. Self-Heal on Fault
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
