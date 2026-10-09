import React from 'react';
import { Shield, Lock, Database, KeyRound, EyeOff, Terminal, CheckCircle2 } from 'lucide-react';

export function PrivacySection() {
  return (
    <section id="privacy" className="w-full space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono text-zinc-300">
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>Zero Personal Data Retention (Zero-PII)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            Privacy & Trust Protocol
          </h2>
          <p className="text-sm font-mono text-zinc-400">
            OBHIN (অভিন) is architected with strict mathematical privacy: zero user accounts, zero credentials on our servers.
          </p>
        </div>
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          [06] Strict Zero-PII Standard
        </div>
      </div>

      {/* Semantic Article Wrapper */}
      <article className="prism-glass p-8 sm:p-10 rounded-3xl space-y-8 border border-white/10 bg-zinc-950/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-mono font-semibold text-white">
              1. Zero Personal Data Storage
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              OBHIN AI does not require accounts, logins, email addresses, or phone numbers. Our database contains zero user records or personally identifiable records (PII).
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-mono font-semibold text-white">
              2. Client-Side BYOK Vault
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Your API keys (Google Gemini, NVIDIA NIM, DeepSeek, OpenAI, Groq) are stored strictly inside your local browser or desktop machine. They are never sent to our database.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-mono font-semibold text-white">
              3. Privacy-Preserving Aggregate Metrics
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We track only anonymous counters for total page views and OS download clicks. We do not store IP addresses, browser fingerprint hashes, or geolocation logs.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-mono font-semibold text-white">
              4. 100% Auditable Open Source
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Every line of code powering OBHIN is publicly auditable under the Apache 2.0 license on GitHub. Any developer can verify that no telemetry or surveillance backdoors exist.
            </p>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>GDPR, CCPA & Privacy-First Compliant by Design</span>
          </div>
          <span className="text-zinc-500">OBHIN AI // The Power of a New Era</span>
        </div>
      </article>
    </section>
  );
}

