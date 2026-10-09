import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 hover:border-slate-600 hover:scale-[1.01] active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-slate-800/40 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    danger:
      'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 hover:border-rose-400',
  };

  return (
    <button
      className={clsx(base, sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

