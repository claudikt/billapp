import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.visible) return null;

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] bg-primary text-on-primary px-space-md py-2.5 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 animate-in fade-in slide-in-from-top-4 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <span className="material-symbols-outlined text-[18px] text-primary-fixed symbol-filled">
        {toast.icon || 'check_circle'}
      </span>
      <span className="font-label-md text-label-md font-semibold text-surface-bright tracking-wide">
        {toast.message}
      </span>
    </div>
  );
}
