'use client';

import React, { useState, useEffect } from 'react';
import { ObhinLogo } from '@/components/ui/ObhinLogo';
import {
  Shield,
  KeyRound,
  Save,
  Upload,
  CheckCircle2,
  RefreshCw,
  LogOut,
  ArrowLeft,
  Users,
  BarChart3,
  Monitor,
  Apple,
  Terminal,
  ExternalLink,
} from 'lucide-react';
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

interface AnalyticsStats {
  WINDOWS: number;
  MACOS: number;
  LINUX: number;
  total: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [members, setMembers] = useState<Member[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);

  // Form states for the selected member
  const [name, setName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default founder master key or environment pass
    if (password === 'obhin2026' || password === 'admin' || password === 'founder') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Founder Access Key. Use: obhin2026');
    }
  };

  const fetchData = async () => {
    try {
      const [teamRes, statsRes] = await Promise.all([
        fetch('/api/team'),
        fetch('/api/download/track'),
      ]);
      const teamData = await teamRes.json();
      const statsData = await statsRes.json();

      if (teamData.members) {
        setMembers(teamData.members.sort((a: Member, b: Member) => a.order - b.order));
        populateSlotForm(selectedSlot, teamData.members);
      }
      if (statsData.stats) {
        setStats(statsData.stats);
      }
    } catch {
      // handled
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const populateSlotForm = (slot: number, currentMembers: Member[]) => {
    const mem = currentMembers.find((m) => m.order === slot);
    if (mem) {
      setName(mem.name);
      setRoleTitle(mem.roleTitle);
      setBio(mem.bio);
      setImageUrl(mem.imageUrl);
      setGithubUrl(mem.githubUrl || '');
      setLinkedinUrl(mem.linkedinUrl || '');
      setTwitterUrl(mem.twitterUrl || '');
    } else {
      setName('');
      setRoleTitle('');
      setBio('');
      setImageUrl('');
      setGithubUrl('');
      setLinkedinUrl('');
      setTwitterUrl('');
    }
  };

  const handleSlotChange = (slot: number) => {
    setSelectedSlot(slot);
    populateSlotForm(slot, members);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: selectedSlot,
          name,
          roleTitle,
          bio,
          imageUrl,
          githubUrl: githubUrl || null,
          linkedinUrl: linkedinUrl || null,
          twitterUrl: twitterUrl || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(`Slot 0${selectedSlot} updated successfully!`);
        fetchData();
        setTimeout(() => setSaveSuccess(null), 3500);
      } else {
        setSaveSuccess(data.error || 'Failed to update slot.');
      }
    } catch {
      setSaveSuccess('Network error saving slot.');
    } finally {
      setSaving(false);
    }
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="prism-glass p-8 rounded-3xl max-w-md w-full border border-white/10 space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/20 flex items-center justify-center">
              <ObhinLogo className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold font-mono tracking-widest text-white mt-2">
              FOUNDER CONSOLE
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Restricted Access // Core Founder Registry
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                Access Passphrase
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter secret passphrase (obhin2026)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white/50"
                  required
                />
                <KeyRound className="w-4 h-4 text-zinc-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {loginError && (
              <p className="text-xs font-mono text-rose-400 bg-rose-950/40 border border-rose-500/20 p-2.5 rounded-lg">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Authenticate & Unlock
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-zinc-500 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Singularity
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 space-y-8">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/20 flex items-center justify-center">
            <ObhinLogo className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-mono tracking-widest text-white">
                FOUNDER CONSOLE
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/5 text-zinc-300">
                ACTIVE SESSION
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Dynamic Team Editor & System Download Analytics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Site
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 text-xs font-mono text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Exit
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Team Slot Management */}
        <div className="lg:col-span-8 space-y-6">
          <div className="prism-glass p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-zinc-400" />
                <h2 className="text-base font-bold font-mono text-white">
                  Founder Profile Registry
                </h2>
              </div>

              {/* Slot Switcher Tabs */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleSlotChange(slot)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      selectedSlot === slot
                        ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    Slot 0{slot}
                  </button>
                ))}
              </div>
            </div>

            {saveSuccess && (
              <div className="p-3 text-xs font-mono rounded-xl bg-white/[0.05] border border-white/20 text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                {saveSuccess}
              </div>
            )}

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Founder Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lead Architect"
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Role & Title
                  </label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. Core Architecture Lead"
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">
                  Bio & Technical Vectors
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe architectural specialization and engineering contributions..."
                  className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                  required
                />
              </div>

              {/* Image URL & File Upload */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">
                  Profile Picture (Image URL or Upload from Device)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Image Preview Box */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-zinc-950 shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-zinc-600">
                        EMPTY
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://... or upload file"
                    className="flex-1 w-full bg-zinc-950 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-white/50"
                    required
                  />

                  <label className="cursor-pointer px-3 py-2 rounded-xl border border-white/20 hover:border-white/40 text-xs font-mono text-zinc-300 flex items-center gap-1.5 shrink-0 bg-white/[0.03]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                    X (Twitter) URL
                  </label>
                  <input
                    type="text"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://x.com/..."
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Syncing with Registry...' : `Save Slot 0${selectedSlot} Changes`}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Download Analytics & Diagnostics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="prism-glass p-6 rounded-3xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-zinc-400" />
                <h3 className="text-sm font-bold font-mono text-white">
                  Download Analytics
                </h3>
              </div>
              <button
                onClick={fetchData}
                className="p-1 text-zinc-400 hover:text-white"
                title="Refresh Analytics"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Monitor className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-mono text-zinc-300">Windows (.exe)</span>
                </div>
                <span className="text-sm font-bold font-mono text-white">
                  {stats?.WINDOWS ?? 0}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Apple className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-mono text-zinc-300">macOS (.dmg)</span>
                </div>
                <span className="text-sm font-bold font-mono text-white">
                  {stats?.MACOS ?? 0}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-mono text-zinc-300">Linux (.AppImage)</span>
                </div>
                <span className="text-sm font-bold font-mono text-white">
                  {stats?.LINUX ?? 0}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/20 flex items-center justify-between mt-2">
                <span className="text-xs font-mono text-zinc-300 uppercase">
                  Total Dispatches
                </span>
                <span className="text-lg font-extrabold font-mono text-white">
                  {stats?.total ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

