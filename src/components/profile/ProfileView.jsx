import React from 'react';
import { useApp } from '../../context/AppContext';

export default function ProfileView() {
  const { role, setRole, showToast, setIsSupportModalOpen } = useApp();

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-margin pt-space-xs pb-space-xl select-none">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-space-md">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-tint font-bold">
          Account & Preferences
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg text-primary tracking-tight font-bold">
          Profile & Security
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary text-xl font-bold shadow-sm">
            {role === 'benefactor' ? 'A' : 'R'}
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              {role === 'benefactor' ? 'Community Ally (You)' : 'Rajesh K. (You)'}
            </h2>
            <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-surface-tint symbol-filled">
                verified
              </span>
              <span>{role === 'benefactor' ? 'Verified Direct Giver' : 'Verified Member • Safe Space'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Role Switcher Section (Great for Demos & Testing Both Sides) */}
      <div className="bg-surface-container-low rounded-2xl p-space-md border border-outline-variant/30 flex flex-col gap-space-sm mb-space-md">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md font-bold text-primary">
            App Perspective / Role
          </span>
          <span className="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
            Live Preview Switcher
          </span>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Kindly empowers both Benefactors (who swipe and clear bills directly) and Requesters (who upload bills and track relief). Switch between them to test both workflows:
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => setRole('benefactor')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
              role === 'benefactor'
                ? 'bg-primary text-on-primary border-primary shadow-sm font-bold'
                : 'bg-surface-container-lowest text-on-surface border-outline-variant/40 hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
            <span className="text-xs font-bold">Benefactor View</span>
            <span className="text-[10px] opacity-80">Discover & Clear</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('requester')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
              role === 'requester'
                ? 'bg-primary text-on-primary border-primary shadow-sm font-bold'
                : 'bg-surface-container-lowest text-on-surface border-outline-variant/40 hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="text-xs font-bold">Requester View</span>
            <span className="text-[10px] opacity-80">Upload & Status</span>
          </button>
        </div>
      </div>

      {/* Privacy & Safeguard Settings */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-3 mb-space-md">
        <h3 className="font-headline-sm text-sm font-bold text-primary">
          Privacy & Protocol Safeguards
        </h3>

        <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-surface-tint">visibility_off</span>
            <span className="text-xs font-medium text-on-surface">Cryptographic PII Masking</span>
          </div>
          <span className="text-xs text-surface-tint font-bold">Active</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-surface-tint">no_sim</span>
            <span className="text-xs font-medium text-on-surface">Zero Data Brokering</span>
          </div>
          <span className="text-xs text-surface-tint font-bold">Guaranteed</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-surface-tint">shield</span>
            <span className="text-xs font-medium text-on-surface">Bharat BillPay (BBPS) Direct Rail</span>
          </div>
          <span className="text-xs text-surface-tint font-bold">Enabled</span>
        </div>
      </div>

      {/* Support Action */}
      <button
        onClick={() => setIsSupportModalOpen(true)}
        className="w-full h-12 rounded-xl bg-surface-container text-primary font-label-lg text-label-lg font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 shadow-sm border border-outline-variant/40"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">support_agent</span>
        <span>Chat with Community Ally</span>
      </button>

      <div className="text-center pt-space-lg text-xs text-outline">
        Kindly Protocol v1.0.0 • Warm Dignity System
      </div>
    </div>
  );
}
