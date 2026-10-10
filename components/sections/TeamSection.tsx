'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Sparkles, Shield, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Member {
  id: string;
  order: number;
  name: string;
  roleTitle: string;
  bio: string;
  imageUrl: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
}

const DEFAULT_FALLBACK_TEAM: Member[] = [
  {
    id: 'dev-1',
    order: 1,
    name: 'Lead Systems Architect',
    roleTitle: 'Core Architecture & Autonomous Conductor',
    bio: 'Architected the OBHIN decoupled singularity, multi-agent interceptor pipelines, and high-concurrency execution loops.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://x.com',
  },
  {
    id: 'dev-2',
    order: 2,
    name: 'Cryptographic Security Lead',
    roleTitle: 'Zero-Trust Vault & Cloud Infrastructure',
    bio: 'Designed the AES-256-GCM BYOK token shielding protocol, low-latency API proxy routing, and zero-plaintext storage.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://x.com',
  },
  {
    id: 'dev-3',
    order: 3,
    name: 'Creative Technologist',
    roleTitle: '3D Prismatic UI & Real-Time Interaction',
    bio: 'Engineered the WebGL Prismatic Crystal Core, monochrome cyber-minimalist glass tokens, and dynamic camera response.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://x.com',
  },
];

export function TeamSection() {
  const [team, setTeam] = useState<Member[]>(DEFAULT_FALLBACK_TEAM);
  const [loading, setLoading] = useState(false);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/team');
      const data = await res.json();
      let list: Member[] = data.members && Array.isArray(data.members) ? data.members : [];

      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('obhin_custom_team');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const map = new Map<number, Member>();
              list.forEach((m: Member) => map.set(m.order, m));
              parsed.forEach((m: Member) => map.set(m.order, { ...map.get(m.order), ...m }));
              list = Array.from(map.values());
            }
          } catch {
            // ignore
          }
        }
      }

      if (list.length > 0) {
        setTeam(list.sort((a: Member, b: Member) => a.order - b.order));
      }
    } catch {
      // handled
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('obhin_custom_team');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTeam(parsed.sort((a: Member, b: Member) => a.order - b.order));
          }
        } catch {
          // ignore
        }
      }
    }

    fetchTeam();

    const handleSync = () => {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('obhin_custom_team');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setTeam(parsed.sort((a: Member, b: Member) => a.order - b.order));
            }
          } catch {
            // ignore
          }
        }
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('obhin_team_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('obhin_team_updated', handleSync);
    };
  }, []);

  return (
    <section id="engineers" className="w-full space-y-8 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              The Engineers
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.04] text-white">
              Core Founders
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1.5">
            Architects of a New Era
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
            Dynamic profile registry powered by the OBHIN decentralized core. Profile data, bios, and links are managed live via the Founder Console.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/40 text-xs font-mono text-zinc-300 transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-zinc-400" />
            <span>Admin Console</span>
          </Link>
          <button
            onClick={fetchTeam}
            className="p-1.5 rounded-xl border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
            title="Refresh Team Profiles"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="prism-glass rounded-2xl p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            {/* Ambient Refraction Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none group-hover:bg-white/[0.05] transition-all" />

            <div className="space-y-5">
              {/* Profile Image & Order Badge */}
              <div className="flex items-start justify-between">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl group-hover:border-white/50 transition-all">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      // Fallback image avatar
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-md border border-white/15 bg-white/[0.04] text-zinc-300">
                  SLOT 0{member.order}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono tracking-wide text-zinc-400 block uppercase">
                  {member.roleTitle}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5 tracking-tight">
                  {member.name}
                </h3>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-light line-clamp-4">
                {member.bio}
              </p>
            </div>

            {/* Social Anchor Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.twitterUrl && (
                  <a
                    href={member.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    title="X (Twitter) Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                VERIFIED FOUNDER
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

