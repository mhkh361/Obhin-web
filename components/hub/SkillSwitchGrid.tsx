'use client';

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import {
  ShieldAlert,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  FileCode2,
  PlusCircle,
  Cpu,
  RotateCw,
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  stage: string;
  description: string;
  isEnabled: boolean;
  isCustom?: boolean;
}

const DEFAULT_SKILLS: Skill[] = [
  {
    id: 'sec-audit-v1',
    name: 'Security & Zero-Day Auditor',
    stage: 'POST_EXECUTION',
    description: 'Inspects inputs/outputs for credentials leakage, prompt injections, and OWASP Top 10 vulnerabilities.',
    isEnabled: true,
  },
  {
    id: 'arch-linter-v1',
    name: 'Core Architecture & Linter',
    stage: 'PRE_EXECUTION',
    description: 'Enforces SOLID boundaries, modular clean code conventions, and pattern integrity before model dispatch.',
    isEnabled: true,
  },
  {
    id: 'self-correct-v1',
    name: 'Workflow Guide & Auto-Correction',
    stage: 'ERROR_RECOVERY',
    description: 'Traps runtime execution faults, analyzes stack traces, and prompts models to self-heal and re-evaluate.',
    isEnabled: true,
  },
  {
    id: 'perf-bench-v1',
    name: 'Latency & Token Optimizer',
    stage: 'PRE_EXECUTION',
    description: 'Prunes conversation context history, executes semantic compression, and routes simple tasks to fast LPU.',
    isEnabled: true,
  },
  {
    id: 'test-gen-v1',
    name: 'Autonomous Test Runner',
    stage: 'POST_EXECUTION',
    description: 'Generates unit/integration test suites (Vitest, Jest, PyTest) for every synthesized component.',
    isEnabled: false,
  },
  {
    id: 'doc-engine-v1',
    name: 'Documentation & PRD Generator',
    stage: 'POST_EXECUTION',
    description: 'Synthesizes architecture summaries, Mermaid sequence diagrams, and inline TSDoc/JSDoc annotations.',
    isEnabled: true,
  },
];

export function SkillSwitchGrid() {
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const [customName, setCustomName] = useState('');
  const [customId, setCustomId] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [customStage, setCustomStage] = useState('POST_EXECUTION');

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        if (data.skills && Array.isArray(data.skills)) {
          setSkills(data.skills);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggle = async (skillId: string, newState: boolean) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, isEnabled: newState } : s))
    );

    try {
      const res = await fetch('/api/skills/toggle', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId, isEnabled: newState }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Skill "${skillId}" state persisted.`);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch {
      setMessage(`Updated local state for ${skillId}.`);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleCreateCustomSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !customId || !customPrompt) return;

    setLoading(true);
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customName,
          identifier: customId,
          stage: customStage,
          promptModifier: customPrompt,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSkills((prev) => [
          ...prev,
          {
            id: customId,
            name: customName,
            stage: customStage,
            description: customPrompt,
            isEnabled: true,
            isCustom: true,
          },
        ]);
        setMessage(`Custom skill "${customName}" registered!`);
        setShowCustomModal(false);
        setCustomName('');
        setCustomId('');
        setCustomPrompt('');
      }
    } catch {
      setMessage('Failed to register custom skill.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3500);
    }
  };

  const getSkillIcon = (id: string) => {
    switch (id) {
      case 'sec-audit-v1':
        return <ShieldAlert className="w-5 h-5 text-white" />;
      case 'arch-linter-v1':
        return <Layers className="w-5 h-5 text-white" />;
      case 'self-correct-v1':
        return <RotateCw className="w-5 h-5 text-white" />;
      case 'perf-bench-v1':
        return <Zap className="w-5 h-5 text-white" />;
      case 'test-gen-v1':
        return <CheckCircle2 className="w-5 h-5 text-white" />;
      case 'doc-engine-v1':
        return <FileCode2 className="w-5 h-5 text-white" />;
      default:
        return <Cpu className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="skills" className="w-full space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Pipeline Middleware
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.04] text-white">
              Autonomous Ecosystem
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Skills Ecosystem
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
            Modular agent middleware executing sequentially across pre-execution, inference routing, and post-execution verification loops.
          </p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="px-3.5 py-1.5 rounded-xl border border-white/20 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/40 text-xs font-mono text-white transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Inject Custom Skill</span>
        </button>
      </div>

      {message && (
        <div className="p-3 text-xs font-mono rounded-xl bg-white/[0.05] border border-white/20 text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          {message}
        </div>
      )}

      {/* Grid of Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="prism-glass p-6 rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/15 flex items-center justify-center">
                  {getSkillIcon(skill.id)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/10">
                    {skill.stage}
                  </span>
                  {skill.isCustom && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/20">
                      CUSTOM
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {skill.name}
                </h3>
                <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                  ID: {skill.id}
                </p>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-light line-clamp-3">
                {skill.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">
                Status:{' '}
                <span
                  className={skill.isEnabled ? 'text-white font-mono font-bold' : 'text-zinc-600 font-mono'}
                >
                  {skill.isEnabled ? 'ACTIVE' : 'BYPASSED'}
                </span>
              </span>
              <ToggleSwitch
                checked={skill.isEnabled}
                onChange={(checked) => handleToggle(skill.id, checked)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Custom Skill Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="prism-glass bg-zinc-950 border border-white/20 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-white" />
                Inject Custom Skill (OpenAPI/AST)
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomSkill} className="space-y-3">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Container Security Validator"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Unique Identifier
                  </label>
                  <input
                    type="text"
                    placeholder="container-val-user"
                    value={customId}
                    onChange={(e) => setCustomId(e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-white/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={customStage}
                    onChange={(e) => setCustomStage(e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="PRE_EXECUTION">PRE_EXECUTION</option>
                    <option value="INTERMEDIATE_ROUTING">INTERMEDIATE_ROUTING</option>
                    <option value="POST_EXECUTION">POST_EXECUTION</option>
                    <option value="ERROR_RECOVERY">ERROR_RECOVERY</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">
                  Prompt Modifier / Verification Directive
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Inspect generated configuration for non-root enforcement."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all"
                >
                  {loading ? 'Injecting...' : 'Register Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
