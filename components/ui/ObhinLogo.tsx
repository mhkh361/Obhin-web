import React from 'react';

export const ObhinLogo = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="prismLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#71717a" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#18181b" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Prismatic Diamond Geometry */}
    <polygon
      points="50,6 92,35 92,65 50,94 8,65 8,35"
      stroke="url(#prismLight)"
      strokeWidth="2"
      fill="rgba(255, 255, 255, 0.02)"
    />
    {/* Internal Refraction Lattice */}
    <path
      d="M50 6L50 94M8 35L92 65M8 65L92 35"
      stroke="#ffffff"
      strokeWidth="1.2"
      strokeOpacity="0.5"
    />
    <circle cx="50" cy="50" r="4" fill="#ffffff" />
  </svg>
);

