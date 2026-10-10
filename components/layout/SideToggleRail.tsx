'use client';

import React, { useState } from 'react';
import { ObhinLogo } from '@/components/ui/ObhinLogo';
import {
  Compass,
  Zap,
  KeyRound,
  Download,
  Users,
  ChevronRight,
  ChevronLeft,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

interface NavItem {
  index: string;
  id: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    index: '01',
    id: 'singularity',
    label: 'Core Singularity',
    subtitle: 'Hero & 3D Prism Engine',
    icon: <Compass className="w-4 h-4 text-white" />,
  },
  {
    index: '02',
    id: 'skills',
    label: 'Skills Ecosystem',
    subtitle: 'Toggleable Agent Capabilities',
    icon: <Zap className="w-4 h-4 text-white" />,
  },
  {
    index: '03',
    id: 'apihub',
    label: 'API Matrix',
    subtitle: 'BYOK Multi-Provider Hub',
    icon: <KeyRound className="w-4 h-4 text-white" />,
  },
  {
    index: '04',
    id: 'downloads',
    label: 'Release Terminal',
    subtitle: 'OS Binary Distribution',
    icon: <Download className="w-4 h-4 text-white" />,
  },
  {
    index: '05',
    id: 'engineers',
    label: 'The Engineers',
    subtitle: 'Dynamic Team Showcase',
    icon: <Users className="w-4 h-4 text-white" />,
  },
];

export function SideToggleRail() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ObhinLogo className="w-8 h-8" glow={true} />
          <span className="font-mono font-bold tracking-widest text-sm text-white bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
            OBHIN
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-zinc-400 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 pt-20 px-6 space-y-4">
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] text-left hover:border-white/30"
              >
                <div className="p-2 rounded-lg bg-zinc-900 border border-white/10">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400">[{item.index}]</div>
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/admin"
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-2 p-2"
            >
              <Shield className="w-3.5 h-3.5" /> Founder Console (/admin)
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Side Navigation Rail */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 bottom-0 z-50 prism-rail flex-col justify-between transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
      >
        {/* Top Brand Mark Slot (PRD 1.2: 32x32px with ambient cyan glow) */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <button
            onClick={() => scrollTo('singularity')}
            className="flex items-center gap-3 overflow-hidden text-left group"
            title="OBHIN AI // Return to Core Singularity"
          >
            <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <ObhinLogo className="w-8 h-8" glow={true} />
            </div>
            {isExpanded && (
              <div className="whitespace-nowrap transition-opacity duration-200">
                <span className="font-mono font-bold tracking-widest text-sm text-white block bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
                  OBHIN
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block tracking-tight">
                  The Power of a New Era
                </span>
              </div>
            )}
          </button>

          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Collapse"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Center Nav Items */}
        <nav className="p-2 space-y-1.5 flex-1 flex flex-col justify-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 hover:bg-white/[0.05] border border-transparent hover:border-white/10 group"
              title={item.label}
            >
              <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                {item.icon}
              </div>
              {isExpanded && (
                <div className="whitespace-nowrap overflow-hidden text-left">
                  <div className="text-[10px] font-mono text-zinc-400 tracking-wider">
                    [{item.index}]
                  </div>
                  <div className="text-xs font-semibold text-white tracking-tight group-hover:text-zinc-200">
                    {item.label}
                  </div>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Expand Toggle & Admin Anchor */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full h-9 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              title="Expand Side Dock"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                href="/admin"
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                <span>Founder Console</span>
              </Link>
              <div className="text-[10px] font-mono text-zinc-400 px-2 tracking-tight">
                FOSS // ZERO LOCK-IN
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

