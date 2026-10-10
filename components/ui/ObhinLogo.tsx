import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  glow?: boolean;
}

export const ObhinLogo = ({
  className = 'w-8 h-8',
  glow = false,
  ...props
}: LogoProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${
      glow ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.35)]' : ''
    }`}
    {...props}
  >
    <defs>
      {/* Electric Blue & Purple Brand Gradient (PRD v1.0.0) */}
      <linearGradient id="obhinBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <linearGradient id="obhinCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
      <filter id="obhinGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* Subtle Dark Circular Background Canvas */}
    <circle
      cx="50"
      cy="50"
      r="47"
      fill="#080808"
      stroke="url(#obhinBrandGrad)"
      strokeWidth="2"
      strokeOpacity="0.4"
    />

    {/* Prismatic Hexagonal Crystal Frame */}
    <polygon
      points="50,14 84,33 84,67 50,86 16,67 16,33"
      stroke="url(#obhinBrandGrad)"
      strokeWidth="3.2"
      fill="rgba(56, 189, 248, 0.03)"
      filter="url(#obhinGlowFilter)"
    />

    {/* Internal Refraction Lattice */}
    <path
      d="M50 14L50 86M16 33L84 67M16 67L84 33"
      stroke="#38BDF8"
      strokeWidth="1.8"
      strokeOpacity="0.5"
    />

    {/* Central Radiant Singularity Core */}
    <circle cx="50" cy="50" r="7" fill="url(#obhinCoreGrad)" />
    <circle cx="50" cy="50" r="11" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.6" />
  </svg>
);
