import React from 'react';
import clsx from 'clsx';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  label,
}: ToggleSwitchProps) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          'w-11 h-6 flex items-center rounded-full p-1 duration-300 cursor-pointer transition-colors',
          checked
            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            : 'bg-slate-800 border border-slate-700/60',
          disabled && 'opacity-40 cursor-not-allowed'
        )}
      >
        <div
          className={clsx(
            'bg-slate-950 w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out transition-transform',
            checked ? 'translate-x-5 bg-slate-950' : 'translate-x-0 bg-slate-400'
          )}
        />
      </div>
      {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
    </label>
  );
}

