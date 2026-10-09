import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ArchitectureBento } from '@/components/sections/ArchitectureBento';
import { SkillSwitchGrid } from '@/components/hub/SkillSwitchGrid';
import { ApiKeyManager } from '@/components/hub/ApiKeyManager';
import { DownloadMatrix } from '@/components/sections/DownloadMatrix';
import { TeamSection } from '@/components/sections/TeamSection';
import { PrivacySection } from '@/components/sections/PrivacySection';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* [01] Core Singularity (Hero + 3D Prismatic Crystal Core) */}
      <HeroSection />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-28 py-16">
        {/* Architectural Topology */}
        <ArchitectureBento />

        {/* [02] Skills Ecosystem (Toggleable Agent Capabilities Grid) */}
        <SkillSwitchGrid />

        {/* [03] API Matrix (Multi-Provider BYOK Vault) */}
        <ApiKeyManager />

        {/* [04] Release Terminal (Direct OS Binaries) */}
        <DownloadMatrix />

        {/* [05] The Engineers (Dynamic Team Showcase) */}
        <TeamSection />

        {/* [06] Privacy & Trust Protocol (Zero-PII Declaration) */}
        <PrivacySection />
      </div>
    </div>
  );
}
