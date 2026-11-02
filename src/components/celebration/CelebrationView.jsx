import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export default function CelebrationView() {
  const {
    lastReceipt,
    setActiveTab,
    setActiveScreen,
    setIsReceiptModalOpen,
    showToast
  } = useApp();

  // Trigger festive confetti burst on mount (respects prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fd8367', '#c5ebd9', '#ffd8ed', '#aacfbe', '#e06d53', '#16382c']
      });
    } catch {
      // Fallback gracefully
    }
  }, []);

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(lastReceipt.refNumber);
    showToast(`Reference ID #${lastReceipt.refNumber} copied to clipboard`, 'content_copy');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Kindly Impact Ripple',
        text: `A direct utility bill was just cleared in full on Kindly. Solidarity over charity!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText('A direct bill was just cleared on Kindly. Small micro-gifts create giant ripples of relief.');
      showToast('Shareable impact message copied to clipboard!', 'share');
    }
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden px-margin pb-space-xl max-w-lg mx-auto select-none">
      {/* Decorative Floating SVG Particles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-2 left-6 w-7 h-7 text-secondary-container opacity-80 animate-bounce" fill="currentColor" style={{ animationDuration: '3.2s' }} viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg className="absolute top-16 right-8 w-5 h-5 text-surface-tint opacity-70 animate-pulse" fill="currentColor" style={{ animationDuration: '2.4s' }} viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <svg className="absolute top-36 left-10 w-4 h-4 text-tertiary-fixed-dim opacity-75 animate-bounce" fill="currentColor" style={{ animationDuration: '4s' }} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
        </svg>
        <svg className="absolute top-28 right-16 w-6 h-6 text-secondary opacity-60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-5-2c0-2.76-2.24-5-5-5S2 7.24 2 10s2.24 5 5 5 5-2.24 5-5z" />
        </svg>
      </div>

      {/* Celebratory Icon & Hero Texts */}
      <div className="flex flex-col items-center text-center mt-space-md mb-space-lg relative z-10">
        <div className="relative mb-space-md flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center shadow-lg relative border-2 border-primary-fixed-dim">
            <span className="material-symbols-outlined text-primary text-4xl symbol-filled">
              volunteer_activism
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-md border-2 border-surface">
            <span className="material-symbols-outlined text-lg symbol-filled">check</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider mb-2 font-bold">
          <span className="material-symbols-outlined text-sm text-surface-tint symbol-filled">
            verified
          </span>
          Micro-Philanthropy Matched
        </span>

        <h1 className="font-headline-xl text-[32px] sm:text-headline-xl text-primary tracking-tight font-bold mb-2">
          Kindness Delivered
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xs leading-relaxed">
          You just cleared <strong className="font-bold text-on-surface">{lastReceipt.recipientName}’s</strong> bill of <strong className="font-bold text-secondary">₹{lastReceipt.amount.toLocaleString()}</strong>.
        </p>
      </div>

      {/* Official Settlement Receipt Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-md mb-space-md relative z-10 border border-outline-variant/30">
        {/* Reference ID Pill */}
        <div className="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-tint/15 flex items-center justify-center text-surface-tint shrink-0">
              <span className="material-symbols-outlined text-base">receipt_long</span>
            </div>
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Reference ID
              </p>
              <p className="font-body-md text-body-md font-mono font-bold text-on-surface">
                {lastReceipt.refNumber}
              </p>
            </div>
          </div>
          <button
            onClick={handleCopyRef}
            className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
            title="Copy Reference ID"
            type="button"
          >
            <span className="material-symbols-outlined text-base">content_copy</span>
          </button>
        </div>

        {/* Verification Items List */}
        <div className="space-y-3 px-1">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-surface-tint text-xl mt-0.5 symbol-filled shrink-0">
              schedule
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-label-md text-on-surface font-bold">
                Direct Disbursement Scheduled
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Payment queued directly to <span className="font-semibold text-on-surface">{lastReceipt.billerName}</span> • Receipt sync expected in 15 mins
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-surface-tint text-xl mt-0.5 symbol-filled shrink-0">
              account_circle
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-label-md text-on-surface font-bold">
                Verified Recipient
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {lastReceipt.recipientName} • Caregiver, {lastReceipt.city} Central
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-surface-tint text-xl mt-0.5 symbol-filled shrink-0">
              security
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-label-md text-on-surface font-bold">
                Zero Intermediary Leakage
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                100% routed directly to verified institutional billing code {lastReceipt.billerCode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Quote Panel with Lotus Symbol */}
      <div className="bg-surface-container rounded-2xl p-space-md mb-space-lg text-center relative overflow-hidden border border-outline-variant/30">
        <div className="absolute -right-4 -bottom-4 text-surface-variant opacity-40 select-none">
          <span className="material-symbols-outlined text-7xl">format_quote</span>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="material-symbols-outlined text-secondary text-2xl mb-1 symbol-filled">
            spa
          </span>
          <p className="font-headline-sm text-headline-sm text-primary italic max-w-xs leading-snug">
            “You took a heavy weight off a family’s shoulders today.”
          </p>
          <span className="mt-2 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
            Community Vouched • Kindness Ledger
          </span>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="flex flex-col gap-3 relative z-10">
        <button
          onClick={() => {
            setActiveTab('discover');
            setActiveScreen('deck');
          }}
          className="w-full h-[52px] rounded-xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] cta-glow"
          type="button"
        >
          <span>Keep Swiping & Helping</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>

        <button
          onClick={() => setIsReceiptModalOpen(true)}
          className="w-full h-[52px] rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 transition-colors hover:bg-primary shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          <span>Download 80G Tax Receipt</span>
        </button>

        <button
          onClick={handleShare}
          className="w-full py-3 text-center text-tertiary hover:text-on-tertiary-container font-label-md text-label-md font-semibold underline underline-offset-4 flex items-center justify-center gap-1.5 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-base">ios_share</span>
          <span>Share the Kindly ripple (without personal details)</span>
        </button>
      </div>
    </div>
  );
}
