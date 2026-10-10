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
  Zap,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Layers,
  Image as ImageIcon,
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

interface SkillItem {
  id: string;
  order: number;
  title?: string;
  name?: string;
  category?: string;
  description: string;
  githubRepoUrl?: string | null;
  creatorName?: string | null;
  creatorUrl?: string | null;
  isLive?: boolean;
  stage?: string;
  iconType?: string;
}

interface ApiProviderItem {
  id: string;
  providerKey: string;
  name: string;
  tag: string;
  description: string;
  defaultUrl?: string | null;
  isVisible: boolean;
  order: number;
}

interface TrafficStats {
  pageViews: number;
  windows: number;
  mac: number;
  linux: number;
  totalDownloads: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'skills' | 'apihub' | 'team'>('analytics');

  // Data states
  const [stats, setStats] = useState<TrafficStats | null>(null);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [providers, setProviders] = useState<ApiProviderItem[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(1);

  // Status message
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // GitHub-Linked Skill Deployer form state (PRD v1.4.0)
  const [skillGithubUrl, setSkillGithubUrl] = useState('');
  const [skillTitle, setSkillTitle] = useState('');
  const [skillDesc, setSkillDesc] = useState('');
  const [skillCategory, setSkillCategory] = useState('Tool');
  const [skillCreatorName, setSkillCreatorName] = useState('');
  const [skillCreatorUrl, setSkillCreatorUrl] = useState('');

  const handleGithubUrlChange = (url: string) => {
    setSkillGithubUrl(url);
    try {
      if (url.includes('github.com/')) {
        const parts = url.split('github.com/')[1].split('/').filter(Boolean);
        if (parts[0] && !skillCreatorName) {
          setSkillCreatorName(`@${parts[0]}`);
          setSkillCreatorUrl(`https://github.com/${parts[0]}`);
        }
        if (parts[1] && !skillTitle) {
          setSkillTitle(parts[1].replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
        }
      }
    } catch {
      // ignore
    }
  };

  // New Provider form state
  const [newProvKey, setNewProvKey] = useState('');
  const [newProvName, setNewProvName] = useState('');
  const [newProvTag, setNewProvTag] = useState('Ready');
  const [newProvDesc, setNewProvDesc] = useState('');
  const [newProvUrl, setNewProvUrl] = useState('');

  // Team Member form state
  const [memName, setMemName] = useState('');
  const [memRole, setMemRole] = useState('');
  const [memBio, setMemBio] = useState('');
  const [memImage, setMemImage] = useState('');
  const [memGithub, setMemGithub] = useState('');
  const [memLinkedin, setMemLinkedin] = useState('');
  const [memTwitter, setMemTwitter] = useState('');
  const [useUrlInput, setUseUrlInput] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (!src) return;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.88);
          setMemImage(compressed);
        } else {
          setMemImage(src);
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'obhin2026' || password === 'admin' || password === 'founder') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Founder Passphrase. Use: obhin2026');
    }
  };

  const fetchAllData = async () => {
    try {
      const [analyticsRes, skillsRes, provRes, teamRes] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/skills'),
        fetch('/api/api-hub'),
        fetch('/api/team'),
      ]);

      const analyticsData = await analyticsRes.json();
      const skillsData = await skillsRes.json();
      const provData = await provRes.json();
      const teamData = await teamRes.json();

      if (analyticsData.stats) setStats(analyticsData.stats);
      if (skillsData.skills) setSkills(skillsData.skills);
      if (provData.providers) setProviders(provData.providers);
      if (teamData.members) {
        setMembers(teamData.members);
        populateTeamForm(selectedSlot, teamData.members);
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();

      // Real-time live analytics streaming interval (polls every 3s)
      const pollInterval = setInterval(() => {
        fetch('/api/analytics')
          .then((res) => res.json())
          .then((data) => {
            if (data.stats) {
              setStats(data.stats);
            }
          })
          .catch(() => {});
      }, 3000);

      return () => clearInterval(pollInterval);
    }
  }, [isAuthenticated]);

  const populateTeamForm = (slot: number, currentMembers: Member[]) => {
    const m = currentMembers.find((mem) => mem.order === slot);
    if (m) {
      setMemName(m.name);
      setMemRole(m.roleTitle);
      setMemBio(m.bio);
      setMemImage(m.imageUrl);
      setMemGithub(m.githubUrl || '');
      setMemLinkedin(m.linkedinUrl || '');
      setMemTwitter(m.twitterUrl || '');
    } else {
      setMemName('');
      setMemRole('');
      setMemBio('');
      setMemImage('');
      setMemGithub('');
      setMemLinkedin('');
      setMemTwitter('');
    }
  };

  const handleSlotChange = (slot: number) => {
    setSelectedSlot(slot);
    populateTeamForm(slot, members);
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: selectedSlot,
          name: memName,
          roleTitle: memRole,
          bio: memBio,
          imageUrl: memImage,
          githubUrl: memGithub || null,
          linkedinUrl: memLinkedin || null,
          twitterUrl: memTwitter || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage(`Team slot 0${selectedSlot} updated!`);
        fetchAllData();
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      setStatusMessage('Error saving team slot');
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: skillTitle,
          name: skillTitle,
          description: skillDesc,
          category: skillCategory,
          githubRepoUrl: skillGithubUrl || null,
          creatorName: skillCreatorName || null,
          creatorUrl: skillCreatorUrl || null,
          isLive: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage(`Skill "${skillTitle}" deployed to ecosystem!`);
        setSkillTitle('');
        setSkillDesc('');
        setSkillGithubUrl('');
        setSkillCreatorName('');
        setSkillCreatorUrl('');
        fetchAllData();
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      setStatusMessage('Error deploying skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
      setSkills((prev) => prev.filter((s) => s.id !== id));
      setStatusMessage('Skill removed from showcase.');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch {
      // fallback
    }
  };

  const handleAddProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/api-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerKey: newProvKey,
          name: newProvName,
          tag: newProvTag,
          description: newProvDesc,
          defaultUrl: newProvUrl || null,
          isVisible: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage(`Model Provider "${newProvName}" registered!`);
        setNewProvKey('');
        setNewProvName('');
        setNewProvDesc('');
        setNewProvUrl('');
        fetchAllData();
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      setStatusMessage('Error adding provider');
    }
  };

  const handleToggleProviderVisibility = async (providerKey: string, currentVal: boolean) => {
    try {
      await fetch('/api/api-hub', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerKey, isVisible: !currentVal }),
      });
      setProviders((prev) =>
        prev.map((p) => (p.providerKey === providerKey ? { ...p, isVisible: !currentVal } : p))
      );
    } catch {
      // fallback
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
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Skills CRUD • API Hub Management • Traffic Analytics • Team Profiles
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

      {statusMessage && (
        <div className="max-w-6xl mx-auto p-3 text-xs font-mono rounded-xl bg-white/[0.05] border border-white/20 text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-white" />
          {statusMessage}
        </div>
      )}

      {/* Navigation Tab Bar */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Traffic & Downloads</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeTab === 'skills'
              ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Skills Showcase CRUD</span>
        </button>

        <button
          onClick={() => setActiveTab('apihub')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeTab === 'apihub'
              ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>API Hub Models</span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeTab === 'team'
              ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Team Showcase</span>
        </button>
      </div>

      {/* Tab 1: Privacy-Preserving Traffic Analytics */}
      {activeTab === 'analytics' && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="prism-glass p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-bold font-mono text-white">
                      Privacy-First Aggregate Metrics
                    </h2>
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE STREAMING
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    100% Zero-PII • Live Real-Time Telemetry • Auto-syncs every 3s
                  </p>
                </div>
              </div>
              <button
                onClick={fetchAllData}
                className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white"
                title="Force Refresh Metrics"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">
                  Total Page Views
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  {stats ? stats.pageViews : 0}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 uppercase">
                  <Monitor className="w-3.5 h-3.5 text-sky-400" />
                  <span>Windows Dispatches</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {stats ? stats.windows : 0}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 uppercase">
                  <Apple className="w-3.5 h-3.5 text-zinc-300" />
                  <span>macOS Dispatches</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {stats ? stats.mac : 0}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 uppercase">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Linux Dispatches</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {stats ? stats.linux : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Skills Management (/admin/skills CRUD - PRD v1.4.0) */}
      {activeTab === 'skills' && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* GitHub-Linked Skill Deployer Form */}
          <div className="lg:col-span-5">
            <div className="prism-glass p-6 rounded-3xl space-y-4">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-white" />
                  GitHub-Linked Skill Deployer
                </h3>
                <p className="text-[11px] font-mono text-zinc-400 mt-1">
                  Deploy open-source community skills with automatic author attribution.
                </p>
              </div>

              <form onSubmit={handleAddSkill} className="space-y-3">
                {/* 1. GitHub Repo URL */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={skillGithubUrl}
                    onChange={(e) => handleGithubUrlChange(e.target.value)}
                    placeholder="https://github.com/developer/awesome-skill"
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                  />
                </div>

                {/* 2. Skill Title */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Skill Title / Display Name
                  </label>
                  <input
                    type="text"
                    value={skillTitle}
                    onChange={(e) => setSkillTitle(e.target.value)}
                    placeholder="e.g. Live Web Search"
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                    required
                  />
                </div>

                {/* 3. Category & Creator */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Category
                    </label>
                    <select
                      value={skillCategory}
                      onChange={(e) => setSkillCategory(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Tool">Tool</option>
                      <option value="Coding">Coding</option>
                      <option value="Vision">Vision</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Security">Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Creator Handle
                    </label>
                    <input
                      type="text"
                      value={skillCreatorName}
                      onChange={(e) => setSkillCreatorName(e.target.value)}
                      placeholder="@devname"
                      className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Creator Profile URL */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Creator Profile URL
                  </label>
                  <input
                    type="url"
                    value={skillCreatorUrl}
                    onChange={(e) => setSkillCreatorUrl(e.target.value)}
                    placeholder="https://github.com/developer"
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* 5. Description */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Description / Purpose
                  </label>
                  <textarea
                    rows={3}
                    value={skillDesc}
                    onChange={(e) => setSkillDesc(e.target.value)}
                    placeholder="Describe skill capabilities and execution behavior..."
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Deploy to Skill Ecosystem
                </button>
              </form>
            </div>
          </div>

          {/* List of Skills with Attribution */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
              <span>DEPLOYED ECOSYSTEM SKILLS ({skills.length})</span>
              <span className="text-zinc-500">Live Showcase</span>
            </div>
            {skills.map((s) => {
              const displayName = s.title || s.name || 'Skill';
              const cat = s.category || s.stage || 'Tool';
              const author = s.creatorName || (s.githubRepoUrl ? s.githubRepoUrl.split('/')[3] : 'Community');

              return (
                <div
                  key={s.id}
                  className="prism-glass p-4 rounded-2xl flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white truncate">{displayName}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                        {cat}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        by {author}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2 font-light">{s.description}</p>
                    {s.githubRepoUrl && (
                      <a
                        href={s.githubRepoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate">{s.githubRepoUrl}</span>
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(s.id)}
                    className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
                    title="Remove Skill from Ecosystem"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: API Hub Models (/admin/api-hub) */}
      {activeTab === 'apihub' && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add Provider Form */}
          <div className="lg:col-span-5">
            <div className="prism-glass p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Plus className="w-4 h-4 text-white" />
                Register Supported LLM
              </h3>

              <form onSubmit={handleAddProvider} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Provider Key
                    </label>
                    <input
                      type="text"
                      value={newProvKey}
                      onChange={(e) => setNewProvKey(e.target.value)}
                      placeholder="e.g. CLAUDE"
                      className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={newProvName}
                      onChange={(e) => setNewProvName(e.target.value)}
                      placeholder="e.g. Anthropic Claude"
                      className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Tag / Capability Badge
                  </label>
                  <input
                    type="text"
                    value={newProvTag}
                    onChange={(e) => setNewProvTag(e.target.value)}
                    placeholder="e.g. Extended Thinking"
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newProvDesc}
                    onChange={(e) => setNewProvDesc(e.target.value)}
                    placeholder="Model specs and capability..."
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Base URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={newProvUrl}
                    onChange={(e) => setNewProvUrl(e.target.value)}
                    placeholder="https://api.../v1"
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Supported Provider
                </button>
              </form>
            </div>
          </div>

          {/* List of Providers with Toggle Visibility */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono text-zinc-400 px-1">
              SUPPORTED MODEL PROVIDERS ({providers.length})
            </div>
            {providers.map((p) => (
              <div
                key={p.id}
                className="prism-glass p-4 rounded-2xl flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                      {p.tag}
                    </span>
                    {!p.isVisible && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/20">
                        HIDDEN
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{p.description}</p>
                </div>
                <button
                  onClick={() => handleToggleProviderVisibility(p.providerKey, p.isVisible)}
                  className={`p-2 rounded-lg border transition-colors shrink-0 ${
                    p.isVisible
                      ? 'border-white/20 text-white hover:bg-white/10'
                      : 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10'
                  }`}
                  title={p.isVisible ? 'Hide from public site' : 'Show on public site'}
                >
                  {p.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Team Showcase Management */}
      {activeTab === 'team' && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="prism-glass p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-base font-bold font-mono text-white">
                Founder Profile Registry
              </h2>
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

            <form onSubmit={handleSaveTeam} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={memName}
                    onChange={(e) => setMemName(e.target.value)}
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
                    value={memRole}
                    onChange={(e) => setMemRole(e.target.value)}
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
                  value={memBio}
                  onChange={(e) => setMemBio(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                  required
                />
              </div>

              {/* Profile Image Upload & Selection Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-zinc-300 flex items-center gap-1.5 font-medium">
                    <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Founder Profile Image</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setUseUrlInput(!useUrlInput)}
                    className="text-[11px] font-mono text-zinc-400 hover:text-white underline transition-colors"
                  >
                    {useUrlInput ? 'Switch to File Upload' : 'Or paste Image URL'}
                  </button>
                </div>

                {!useUrlInput ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-zinc-950/90 border border-white/15">
                    {/* Image Preview Thumbnail */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black border border-white/20 shrink-0 shadow-lg flex items-center justify-center group">
                      {memImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={memImage}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-600 gap-1 p-2 text-center">
                          <ImageIcon className="w-6 h-6" />
                          <span className="text-[9px] font-mono">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Upload Actions & Guidance */}
                    <div className="flex-1 space-y-2 text-left w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{memImage ? 'Change Photo' : 'Upload Image File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>

                        {memImage && (
                          <button
                            type="button"
                            onClick={() => setMemImage('')}
                            className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-mono transition-all flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <p className="text-[11px] font-mono text-zinc-400 font-light">
                        Supports PNG, JPG, WebP, SVG. Uploaded files are automatically optimized and compressed for instant loading.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or /assets/..."
                      value={memImage}
                      onChange={(e) => setMemImage(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-white/50"
                      required
                    />
                    <p className="text-[10px] font-mono text-zinc-500">
                      Paste a direct HTTPS URL to any image hosted online.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">GitHub</label>
                  <input
                    type="text"
                    value={memGithub}
                    onChange={(e) => setMemGithub(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={memLinkedin}
                    onChange={(e) => setMemLinkedin(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">X (Twitter)</label>
                  <input
                    type="text"
                    value={memTwitter}
                    onChange={(e) => setMemTwitter(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Slot 0{selectedSlot} Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
