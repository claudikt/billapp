import React from 'react';
import { useApp } from '../../context/AppContext';

export default function BottomNav() {
  const { activeTab, setActiveTab, setActiveScreen } = useApp();

  const navItems = [
    { id: 'discover', label: 'Discover', icon: 'style', targetScreen: 'deck' },
    { id: 'requests', label: 'Requests', icon: 'receipt_long', targetScreen: 'dashboard' },
    { id: 'impact', label: 'Impact', icon: 'handshake', targetScreen: 'impact' },
    { id: 'profile', label: 'Profile', icon: 'account_circle', targetScreen: 'profile' }
  ];

  const handleSelectTab = (item) => {
    setActiveTab(item.id);
    setActiveScreen(item.targetScreen);
  };

  return (
    <nav className="fixed bottom-0 w-full z-40 nav-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(22,56,44,0.05)] border-t border-outline-variant/30">
      <div className="h-16 px-space-xs max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 transition-all ${
                isActive
                  ? 'text-primary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span
                className={`material-symbols-outlined text-[24px] ${isActive ? 'symbol-filled' : ''}`}
              >
                {item.icon}
              </span>
              <span className={`font-label-sm text-label-sm mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
