import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ObhinLogo } from '@/components/ui/ObhinLogo';
import { PrivacySection } from '@/components/sections/PrivacySection';

export const metadata: Metadata = {
  title: 'Privacy Policy | OBHIN AI - Open Source & Privacy First',
  description:
    'OBHIN AI collects no personal user data or credentials. Completely open-source and local-first architecture.',
  keywords: [
    'OBHIN AI Privacy Policy',
    'Open Source AI Privacy',
    'Zero PII Policy',
    'Privacy First AI',
    'No User Tracking',
  ],
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Back */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Core Singularity</span>
          </Link>
          <div className="flex items-center gap-2">
            <ObhinLogo className="w-5 h-5" />
            <span className="font-mono text-xs tracking-widest text-zinc-400">
              OBHIN AI // PRIVACY
            </span>
          </div>
        </div>

        {/* Semantic Article Wrapper from PrivacySection */}
        <PrivacySection />
      </div>
    </div>
  );
}
