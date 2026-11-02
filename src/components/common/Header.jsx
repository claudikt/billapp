import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const {
    role,
    setRole,
    activeTab,
    activeScreen,
    setActiveScreen,
    totalClearedAmount
  } = useApp();

  const isSubScreen = activeTab === 'discover' && (activeScreen === 'settlement' || activeScreen === 'celebration');

  const getScreenTitle = () => {
    if (activeTab === 'discover') {
      if (activeScreen === 'settlement') return 'Bill Details & Settlement';
      if (activeScreen === 'celebration') return 'Kindness Delivered';
      return 'Discover Bills';
    }
    if (activeTab === 'requests') return 'Requests & Activity';
    if (activeTab === 'impact') return 'Kindness Ledger';
    if (activeTab === 'profile') return 'Profile & Security';
    return 'Discover Bills';
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-margin max-w-lg mx-auto flex items-center justify-between gap-space-sm">
        {/* Left: Logo or Back Button */}
        <div className="flex items-center gap-space-sm">
          {isSubScreen ? (
            <button
              aria-label="Go back"
              onClick={() => setActiveScreen('deck')}
              className="min-w-[40px] min-h-[40px] -ml-2 flex items-center justify-center text-primary rounded-full hover:bg-surface-container active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          {/* Kindly Emblem Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-fixed shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px] symbol-filled">volunteer_activism</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none font-bold">
                Kindly
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none mt-0.5">
                {getScreenTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Cleared Stat Pill & Role Toggle */}
        <div className="flex items-center gap-space-xs">
          {/* Cleared direct aid stat pill - Standardized to ₹ INR */}
          <div className="flex items-center bg-surface-container px-2.5 py-1 rounded-full shadow-[0_2px_8px_-2px_rgba(22,56,44,0.04)]">
            <span className="material-symbols-outlined text-[15px] text-primary-container mr-1">
              volunteer_activism
            </span>
            <span className="font-label-sm text-label-sm text-primary-container font-bold">
              ₹{totalClearedAmount.toLocaleString()} Cleared
            </span>
          </div>

          {/* Role Switcher Pill / Avatar */}
          <button
            onClick={() => setRole(role === 'benefactor' ? 'requester' : 'benefactor')}
            title={`Switch to ${role === 'benefactor' ? 'Requester' : 'Benefactor'} mode`}
            className="h-8 px-2 rounded-full bg-primary text-on-primary flex items-center gap-1 hover:bg-primary-container transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {role === 'benefactor' ? 'favorite' : 'person'}
            </span>
            <span className="font-label-sm text-[10px] uppercase font-bold tracking-wider">
              {role === 'benefactor' ? 'Ally' : 'Member'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
