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

export function TeamSection() {
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.members && Array.isArray(data.members)) {
        setTeam(data.members.sort((a: Member, b: Member) => a.order - b.order));
      }
    } catch {
      // handled
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
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

