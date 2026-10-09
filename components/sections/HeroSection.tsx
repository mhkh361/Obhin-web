'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Download,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Info,
  ExternalLink,
  X,
  CheckCircle,
} from 'lucide-react';
import { WindowsVector, AppleVector, LinuxVector } from '@/components/ui/OsVectorIcons';

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
  const [detectedOs, setDetectedOs] = useState<'WINDOWS' | 'MACOS' | 'LINUX' | 'ALL'>('WINDOWS');
  const [showHelperModal, setShowHelperModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Client-side browser hints detection
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('win')) {
      setDetectedOs('WINDOWS');
    } else if (ua.includes('mac') || ua.includes('darwin')) {
      setDetectedOs('MACOS');
    } else if (ua.includes('linux') || ua.includes('x11')) {
      setDetectedOs('LINUX');
    } else {
      setDetectedOs('ALL');
    }

    // Anonymous page view counter ping (Zero-PII)
    fetch('/api/analytics', { method: 'POST' }).catch(() => {});
  }, []);

  const handleSmartDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/api/download/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: detectedOs === 'ALL' ? 'WINDOWS' : detectedOs }),
      });
      const data = await res.json();
      if (data.downloadUrl) {
        window.location.href = data.downloadUrl;
      }
    } catch {
      // fallback
    } finally {
      setDownloading(false);
      setShowHelperModal(true);
    }
  };

  const getCtaContent = () => {
    switch (detectedOs) {
      case 'WINDOWS':
        return {
          icon: <WindowsVector className="w-4 h-4 text-white" />,
          label: 'Download for Windows (.exe / .msi)',
          tag: 'Windows 10 / 11 64-bit',
          bypassTitle: 'Windows SmartScreen Guidance',
          bypassText:
            'As an independent community open-source binary, Windows SmartScreen may show an unverified notice. Simply click "More info" and select "Run anyway" to proceed.',
        };
      case 'MACOS':
        return {
          icon: <AppleVector className="w-4 h-4 text-white" />,
          label: 'Download for macOS (.dmg / Universal)',
          tag: 'Apple Silicon & Intel',
          bypassTitle: 'macOS Gatekeeper Guidance',
          bypassText:
            'If macOS Gatekeeper shows an unverified developer warning: Right-click the app > Open, or run in Terminal: xattr -cr /Applications/OBHIN.app',
        };
      case 'LINUX':
        return {
          icon: <LinuxVector className="w-4 h-4 text-white" />,
          label: 'Download for Linux (.AppImage / .deb)',
          tag: 'x86_64 / ARM64',
          bypassTitle: 'Linux Execution Permissions',
          bypassText:
            'For AppImage, enable execution permission: chmod +x OBHIN.AppImage. For Debian/Ubuntu, install via: sudo dpkg -i obhin.deb',
        };
      default:
        return {
          icon: <Download className="w-4 h-4" />,
          label: 'Download for all platforms',
          tag: 'Win / Mac / Linux',
          bypassTitle: 'Universal Desktop Binaries',
          bypassText: 'Available as native binaries for Windows (.exe), macOS (.dmg), and Linux (.AppImage).',
        };
    }
  };

  const cta = getCtaContent();

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
              <span>Zero Personal Data (No PII)</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-white shrink-0" />
              <span>Multi-Provider BYOK</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-white shrink-0" />
              <span>Client-Side Keys</span>
            </div>
          </div>

          {/* Dynamic Smart Download CTA Row */}
          <div className="space-y-3 pt-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleSmartDownload}
                disabled={downloading}
                className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2.5 group"
              >
                {cta.icon}
                <span>{downloading ? 'Preparing Download...' : cta.label}</span>
              </button>

              <button
                onClick={() => setShowHelperModal(true)}
                className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/15 transition-all"
                title="Installation guidance & SmartScreen instructions"
              >
                <Info className="w-4 h-4" />
              </button>

              <a href="#downloads">
                <button className="px-5 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-white border border-white/15 text-xs font-mono transition-all">
                  All OS Releases
                </button>
              </a>
            </div>

            {/* Secondary Sub-text Link */}
            <div className="pt-1">
              <a
                href="https://github.com/mhkh361/Obhin-web/releases"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>View all releases, architectures & SHA256 checksums on GitHub</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Prismatic Crystal Core Viewport */}
        <div className="lg:col-span-5 h-[420px] sm:h-[520px] w-full relative rounded-3xl prism-glass flex items-center justify-center p-2 group">
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 pointer-events-none" />

          <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            PRISMATIC CRYSTAL CORE // SINGULARITY MATRIX
          </div>

          <PrismCore3D />
        </div>
      </div>

      {/* OS Installation Guidance Modal */}
      {showHelperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="prism-glass bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-white" />
                <h3 className="text-base font-bold font-mono text-white">
                  {cta.bypassTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowHelperModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300 font-light leading-relaxed">
              <p>{cta.bypassText}</p>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-[11px] text-zinc-300 space-y-1">
                <div className="text-white font-semibold">100% Free & Open-Source Software</div>
                <div>• Zero spyware or third-party telemetry</div>
                <div>• All releases signed by community build pipelines</div>
                <div>• SHA256 hashes available on GitHub releases</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="https://github.com/mhkh361/Obhin-web/releases"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-zinc-400 hover:text-white underline flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Checksum Hashes
              </a>
              <button
                onClick={() => setShowHelperModal(false)}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
