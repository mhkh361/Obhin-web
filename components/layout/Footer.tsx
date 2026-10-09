import React from 'react';
import { ObhinLogo } from '@/components/ui/ObhinLogo';
import { Shield, Github, BookOpen, Terminal, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black text-zinc-400 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center">
                <ObhinLogo className="w-5 h-5" />
              </div>
              <span className="font-mono font-bold text-white tracking-widest text-base">
                OBHIN
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              OBHIN (অভিন) — The Power of a New Era. An independent, 100% Free & Open-Source AI productivity system and autonomous execution engine.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/10">
              <Shield className="w-3.5 h-3.5 text-white" />
              Apache 2.0 / Zero Vendor Lock-in
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
              System Modules
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <a href="#singularity" className="hover:text-white transition-colors">
                  [01] Core Singularity
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  [02] Skills Ecosystem
                </a>
              </li>
              <li>
                <a href="#apihub" className="hover:text-white transition-colors">
                  [03] API Matrix (BYOK)
                </a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">
                  [04] Release Terminal
                </a>
              </li>
              <li>
                <a href="#engineers" className="hover:text-white transition-colors">
                  [05] The Engineers
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Specs */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
              Specs & Protocol
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" /> Source Repository
                </a>
              </li>
              <li>
                <a href="#singularity" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Technical Spec v4.0
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-400">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400" /> Founder Console (/admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Philosophy */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
              FOSS Directives
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Zero credit locks. Zero subscription tiers. 100% independent architecture created for the global developer vanguard.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-3">
          <p>© 2026 OBHIN (অভিন) Initiative. All rights open.</p>
          <div className="flex items-center gap-2">
            <span>The Power of a New Era</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
