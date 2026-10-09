import React from 'react';
import clsx from 'clsx';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: 'cyan' | 'emerald' | 'violet' | 'none';
}

export function GlassCard({
  children,
  className,
  glow = 'none',
  ...props
}: GlassCardProps) {
  const glowClasses = {
    cyan: 'hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    emerald: 'hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    violet: 'hover:border-violet-500/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    none: 'hover:border-slate-700/80',
  };

  return (
    <div
      className={clsx(
        'backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group',
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {/* Subtle futuristic gradient highlight on top edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

