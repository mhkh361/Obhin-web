'use client';

import React, { useState } from 'react';
import {
  Download,
  CheckCircle2,
  FileCode,
  Shield,
  Info,
  ExternalLink,
} from 'lucide-react';
import { WindowsVector, AppleVector, LinuxVector } from '@/components/ui/OsVectorIcons';

interface PlatformOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  version: string;
  formats: { label: string; arch: string; ext: string }[];
  tag: string;
  executionNote: string;
  commandSnippet?: string;
}

export function DownloadMatrix() {
  const [downloadingPlatform, setDownloadingPlatform] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const platforms: PlatformOption[] = [
    {
      id: 'WINDOWS',
      name: 'Windows',
      icon: <WindowsVector className="w-8 h-8 text-white" />,
      version: 'v4.0.0-PROD (x64 / ARM64)',
      formats: [
        { label: 'Installer (.exe)', arch: 'x64', ext: 'exe' },
        { label: 'Enterprise MSI (.msi)', arch: 'x64', ext: 'msi' },
      ],
      tag: 'Windows 10 / 11 Supported',
      executionNote: 'Windows SmartScreen notice: Click "More info" > "Run anyway" for community open-source binary.',
    },
    {
      id: 'MACOS',
      name: 'macOS',
      icon: <AppleVector className="w-8 h-8 text-white" />,
      version: 'v4.0.0-PROD (Universal)',
      formats: [
        { label: 'Apple Silicon (.dmg)', arch: 'arm64', ext: 'dmg' },
        { label: 'Intel Core (.dmg)', arch: 'x64', ext: 'dmg' },
      ],
      tag: 'macOS 12+ Ventura & Sonoma',
      executionNote: 'Gatekeeper unverified developer notice: Right-click app > Open, or run command below:',
      commandSnippet: 'xattr -cr /Applications/OBHIN.app',
    },
    {
      id: 'LINUX',
      name: 'Linux',
      icon: <LinuxVector className="w-8 h-8 text-white" />,
      version: 'v4.0.0-PROD (AppImage / DEB)',
      formats: [
        { label: 'Universal AppImage', arch: 'x86_64', ext: 'AppImage' },
        { label: 'Debian / Ubuntu (.deb)', arch: 'amd64', ext: 'deb' },
        { label: 'Arch / Tarball (.tar.gz)', arch: 'x86_64', ext: 'tar.gz' },
      ],
      tag: 'Glibc 2.31+ & Wayland/X11',
      executionNote: 'Execution permissions: Enable execute bit or install package:',
      commandSnippet: 'chmod +x OBHIN.AppImage',
    },
  ];

  const handleDownload = async (platformId: string, arch: string, label: string) => {
    setDownloadingPlatform(`${platformId}-${arch}`);
    try {
      const res = await fetch('/api/download/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: platformId,
          architecture: arch,
          appVersion: '4.0.0-PROD',
        }),
      });
      const data = await res.json();
      setDownloadSuccess(`Initiating download for ${label}...`);

      if (data.downloadUrl) {
        window.location.href = data.downloadUrl;
      }

      setTimeout(() => {
        setDownloadingPlatform(null);
        setTimeout(() => setDownloadSuccess(null), 4000);
      }, 1000);
    } catch {
      setDownloadSuccess(`Download triggered for ${label}`);
      setDownloadingPlatform(null);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }
  };

  return (
    <section id="downloads" className="w-full space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Release Terminal
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.04] text-white">
              Zero Paywalls
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Universal Desktop Binaries
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
            Native, high-performance desktop clients for Windows, macOS, and Linux. Built with zero cloud telemetry and air-gapped local model execution.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white bg-white/[0.04] border border-white/20 px-3 py-1.5 rounded-xl">
          <Shield className="w-4 h-4" />
          SHA-256 Verified Binaries
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 text-xs font-mono rounded-xl bg-white/[0.05] border border-white/20 text-white flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-white" />
          {downloadSuccess}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="prism-glass p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-white/40 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-zinc-950 border border-white/15">
                  {p.icon}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                  {p.tag}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{p.name}</h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">{p.version}</p>
              </div>

              {/* Formats Button List */}
              <div className="space-y-2 pt-1">
                {p.formats.map((fmt) => (
                  <button
                    key={fmt.label}
                    onClick={() => handleDownload(p.id, fmt.arch, fmt.label)}
                    disabled={Boolean(downloadingPlatform)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-white/10 hover:border-white/30 text-left transition-all duration-200 group/btn"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCode className="w-4 h-4 text-zinc-400 group-hover/btn:text-white transition-colors" />
                      <div>
                        <div className="text-xs font-semibold text-zinc-200">
                          {fmt.label}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          Arch: {fmt.arch}
                        </div>
                      </div>
                    </div>

                    <div className="p-1 rounded-lg bg-zinc-900 text-zinc-400 group-hover/btn:text-white group-hover/btn:bg-white/10 transition-all">
                      <Download className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Universal Desktop Binary Guidance Note */}
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/10 space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Execution Guidance:</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  {p.executionNote}
                </p>
                {p.commandSnippet && (
                  <div className="bg-black border border-white/15 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300 select-all">
                    $ {p.commandSnippet}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Automatic Updates: Enabled</span>
              <span className="text-white font-semibold">100% FOSS</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-2">
        <a
          href="https://github.com/mhkh361/Obhin-web/releases"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white underline transition-colors"
        >
          <span>View all releases, architectures & SHA256 checksums on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
