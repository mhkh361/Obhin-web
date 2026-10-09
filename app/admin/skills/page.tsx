'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSkillsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Navigate directly to Founder Console Skills Tab
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3 font-mono text-xs text-zinc-400">
        <div className="w-8 h-8 rounded-full border border-white/20 border-t-white animate-spin" />
        <span>REDIRECTING TO GITHUB-LINKED SKILL DEPLOYER...</span>
      </div>
    </div>
  );
}

