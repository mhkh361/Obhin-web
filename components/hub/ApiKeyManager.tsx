'use client';

import React, { useState, useEffect } from 'react';
import {
  Cpu,
  ShieldCheck,
  Zap,
  RefreshCw,
  Server,
  Lock,
  Sparkles,
  Layers,
  Terminal,
} from 'lucide-react';

interface ApiProvider {
  id: string;
  providerKey: string;
  name: string;
  tag: string;
  description: string;
  defaultUrl?: string | null;
  isVisible: boolean;
  order?: number;
}

const DEFAULT_PROVIDERS: ApiProvider[] = [
  {
    id: 'prov-gemini',
    providerKey: 'GEMINI',
    name: 'Google Gemini',
    tag: 'Multimodal Frontier',
    description: 'Gemini 1.5 Pro, Flash, and 2.0 Flash Thinking models with extensive 1M+ token context windows.',
    defaultUrl: 'https://generativelanguage.googleapis.com/v1beta',
    isVisible: true,
  },
  {
    id: 'prov-nvidia',
    providerKey: 'NVIDIA',
    name: 'NVIDIA NIM',
    tag: 'Enterprise GPU',
    description: 'Accelerated foundation microservices running Llama-3.1-405B, Nemotron, and Mistral-NeMo.',
    defaultUrl: 'https://integrate.api.nvidia.com/v1',
    isVisible: true,
  },
  {
    id: 'prov-deepseek',
    providerKey: 'DEEPSEEK',
    name: 'DeepSeek AI',
    tag: 'Reasoning Engine',
    description: 'DeepSeek-V3 and DeepSeek-R1 open reasoning models with high-depth chain-of-thought capabilities.',
    defaultUrl: 'https://api.deepseek.com/v1',
    isVisible: true,
  },
  {
    id: 'prov-ollama',
    providerKey: 'OLLAMA',
    name: 'Local Ollama / vLLM',
    tag: 'Local Inference (Air-Gapped)',
    description: 'Zero-cloud, privacy-first local inference directly from your machine GPU (Llama 3.2, Qwen 2.5, Mistral).',
    defaultUrl: 'http://localhost:11434/v1',
    isVisible: true,
  },
  {
    id: 'prov-groq',
    providerKey: 'GROQ',
    name: 'Groq LPU',
    tag: 'Ultra-Low Latency',
    description: 'Real-time inference running on Groq Tensor Streaming Units at 500+ tokens per second.',
    defaultUrl: 'https://api.groq.com/openai/v1',
    isVisible: true,
  },
  {
    id: 'prov-openai',
    providerKey: 'OPENAI',
    name: 'OpenAI',
    tag: 'GPT-4o & Reasoning',
    description: 'State-of-the-art GPT-4o, GPT-4o-mini, and o1 reasoning models with multimodal support.',
    defaultUrl: 'https://api.openai.com/v1',
    isVisible: true,
  },
];

export function ApiKeyManager() {
  const [providers, setProviders] = useState<ApiProvider[]>(DEFAULT_PROVIDERS);
  const [loading, setLoading] = useState(false);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/api-hub');
      const data = await res.json();
      if (data.providers && Array.isArray(data.providers)) {
        setProviders(data.providers.filter((p: ApiProvider) => p.isVisible));
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <section id="apihub" className="w-full space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Zero Vendor Lock-In
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.04] text-white">
              Dynamic Multi-LLM Hub
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Decoupled Model Architecture
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
            Bring your own API keys or connect air-gapped local clusters. Choose from frontier reasoning models, ultra-low latency LPUs, or local inference.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-white/15 text-xs text-zinc-300 font-mono">
          <Lock className="w-3.5 h-3.5 text-white" />
          <span>Client-Side Local Keys (No Server Storage)</span>
        </div>
      </div>

      {/* Security Guarantee Banner */}
      <div className="prism-glass p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-zinc-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-white shrink-0" />
          <span>
            Privacy Guarantee: All user-provided API keys stay encrypted inside your local machine vault. Keys are never transmitted to or retained on any OBHIN backend database.
          </span>
        </div>
        <button
          onClick={fetchProviders}
          className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white shrink-0 transition-colors"
          title="Refresh supported providers"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Grid of Dynamically Loaded Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {providers.map((p) => (
          <div
            key={p.id}
            className="prism-glass p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/40 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/15 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-white/15 text-zinc-300">
                  {p.tag}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {p.name}
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">
                  KEY: {p.providerKey}
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {p.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="truncate max-w-[200px]">
                {p.defaultUrl || 'Direct API Adapter'}
              </span>
              <span className="text-white flex items-center gap-1 shrink-0">
                <Zap className="w-3 h-3" /> BYOK Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
