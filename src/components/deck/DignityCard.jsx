import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function DignityCard({
  bill,
  dragOffset = { x: 0, y: 0 },
  isDragging = false,
  onInspect,
  onClear,
  onSkip
}) {
  const { setInspectedBill } = useApp();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [bill?.id]);

  if (!bill) return null;

  // Calculate remaining payable amount if partial solidarity pooling is active
  const hasPooling = bill.poolingPercentage && bill.poolingPercentage > 0;
  const payableAmount = hasPooling && bill.amountFunded
    ? Math.max(bill.amount - bill.amountFunded, 0)
    : bill.amount;

  // Calculate rotation and stamp opacity based on drag
  const rotateDeg = dragOffset.x * 0.05;
  const payStampOpacity = dragOffset.x > 20 ? Math.min((dragOffset.x - 20) / 80, 1) : 0;
  const skipStampOpacity = dragOffset.x < -20 ? Math.min((Math.abs(dragOffset.x) - 20) / 80, 1) : 0;

  const cardStyle = {
    transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotateDeg}deg)`,
    transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  };

  return (
    <article
      style={cardStyle}
      className="relative w-full rounded-[24px] bg-surface-container-lowest text-on-surface shadow-[0_4px_24px_-4px_rgba(22,56,44,0.08),0_16px_40px_-6px_rgba(56,30,47,0.07)] border border-outline-variant/30 p-space-md flex flex-col gap-space-md select-none touch-none will-change-transform z-10"
    >
      {/* Stamp: PASS FOR NOW (Left Drag) */}
      <div
        style={{ opacity: skipStampOpacity }}
        className="absolute top-8 right-6 transform rotate-12 px-4 py-1.5 rounded-xl bg-surface-variant text-on-surface-variant pointer-events-none z-30 shadow-md border border-outline/30 transition-opacity"
      >
        <span className="font-label-lg text-label-lg tracking-widest font-bold">PASS FOR NOW</span>
      </div>

      {/* Stamp: CLEAR BILL (Right Drag) */}
      <div
        style={{ opacity: payStampOpacity }}
        className="absolute top-8 left-6 transform -rotate-12 px-4 py-1.5 rounded-xl bg-primary-container text-primary-fixed pointer-events-none z-30 shadow-md border border-primary-fixed/40 transition-opacity flex items-center gap-1.5"
      >
        <span className="material-symbols-outlined text-[18px] text-secondary-container symbol-filled">
          favorite
        </span>
        <span className="font-label-lg text-label-lg tracking-widest font-bold">CLEAR BILL</span>
      </div>

      {/* Card Top: Category, Urgency & Bill Amount */}
      <div className="flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-xs flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low text-primary-container font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[15px] text-secondary">
              {bill.categoryIcon || 'receipt'}
            </span>
            {bill.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
            {bill.urgencyText}
          </span>
        </div>

        {/* Direct Bill Amount Callout */}
        <div className="text-right">
          <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
            Direct Bill
          </span>
          <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
            ₹{bill.amount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Requester Dignity Profile Header */}
      <div className="flex items-center gap-space-sm pt-1">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-surface-container-high border border-outline-variant/50">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-primary-container text-primary-fixed font-bold text-sm">
              {bill.requester.fallbackInitials}
            </div>
          ) : (
            <img
              src={bill.requester.avatar}
              alt={bill.requester.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
              {bill.requester.name}, {bill.requester.age}
            </h2>
            <span className="text-on-surface-variant text-[13px]">• {bill.requester.city}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-tint/15 text-primary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[13px] text-surface-tint symbol-filled">
                verified
              </span>
              {bill.requester.verificationLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Redacted Official Utility Bill Document Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-space-sm flex items-center justify-between gap-space-sm border border-outline-variant/30">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-primary-container">
            <span className="material-symbols-outlined text-[20px]">
              {bill.categoryIcon === 'bolt' ? 'electric_meter' : bill.categoryIcon}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                {bill.biller.shortName}
              </span>
              <span className="inline-flex items-center text-[10px] px-1.5 py-[1px] rounded bg-surface-container text-on-surface-variant uppercase font-semibold">
                Official
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
              <span>Consumer A/C</span>
              <span className="tracking-widest font-mono text-on-surface font-semibold">
                {bill.biller.accountMasked}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onInspect) onInspect(bill);
            else setInspectedBill(bill);
          }}
          className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold shadow-sm hover:bg-surface border border-outline-variant/40 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>Inspect</span>
        </button>
      </div>

      {/* Solidarity Pooling Progress Bar (if active) */}
      {hasPooling && (
        <div className="w-full rounded-2xl bg-surface-container-low p-3 flex flex-col gap-1.5 border border-outline-variant/30">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="font-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-surface-tint">group</span>
              Solidarity Pooling
            </span>
            <span className="font-label-sm text-primary font-bold">
              ₹{bill.amountFunded?.toLocaleString()} of ₹{bill.amount.toLocaleString()} raised ({bill.poolingPercentage}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
            <div
              className="h-full rounded-full bg-secondary-container transition-all"
              style={{ width: `${bill.poolingPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-0.5">
            <span>Remaining community balance:</span>
            <strong className="text-secondary font-bold font-mono">₹{payableAmount.toLocaleString()}</strong>
          </div>
        </div>
      )}

      {/* Hinge-Style Editorial Prompt 1 */}
      <div className="rounded-2xl bg-surface-container-low p-space-md flex flex-col gap-1.5 border border-outline-variant/30">
        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide">
          <span className="material-symbols-outlined text-[15px] text-secondary">format_quote</span>
          <span>{bill.story.prompt1Title}</span>
        </div>
        <p className="font-headline-sm text-headline-sm text-on-surface font-normal italic leading-relaxed">
          {bill.story.prompt1Text}
        </p>
      </div>

      {/* Hinge-Style Editorial Prompt 2 */}
      <div className="rounded-2xl bg-surface-container-low p-space-md flex flex-col gap-1.5 border border-outline-variant/30">
        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide">
          <span className="material-symbols-outlined text-[15px] text-primary-container">
            favorite_border
          </span>
          <span>{bill.story.prompt2Title}</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {bill.story.prompt2Text}
        </p>
      </div>

      {/* Direct Disbursement Guarantee Well */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-fixed/35 text-on-primary-fixed-variant border border-primary-fixed/50">
        <span className="material-symbols-outlined text-[18px] text-primary-container shrink-0">
          shield_with_heart
        </span>
        <span className="font-label-sm text-label-sm">{bill.guaranteeText}</span>
      </div>

      {/* Floating Tactical Micro-Controls (Bottom Row Inside Card) */}
      <div className="flex items-center justify-between gap-space-sm pt-space-xs mt-auto">
        {/* Skip Button */}
        <button
          aria-label="Skip request"
          onClick={(e) => {
            e.stopPropagation();
            onSkip();
          }}
          className="flex-1 h-12 py-2 px-3 rounded-2xl bg-surface-container-high text-on-surface-variant hover:bg-surface-variant active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm font-label-lg text-label-lg font-semibold"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
          <span>Next</span>
        </button>

        {/* Bill Details Sheet Button */}
        <button
          aria-label="View verification details"
          onClick={(e) => {
            e.stopPropagation();
            if (onInspect) onInspect(bill);
            else setInspectedBill(bill);
          }}
          className="w-12 h-12 p-2 rounded-2xl bg-surface-container text-on-surface hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">description</span>
        </button>

        {/* Direct Pay Action */}
        <button
          aria-label="Clear this bill"
          onClick={(e) => {
            e.stopPropagation();
            onClear(bill);
          }}
          className="flex-[1.5] h-12 py-2 px-4 rounded-2xl bg-secondary text-on-secondary hover:bg-on-secondary-container active:scale-95 transition-all flex items-center justify-center gap-1.5 cta-glow font-label-lg text-label-lg font-semibold"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px] symbol-filled">volunteer_activism</span>
          <span>{hasPooling ? `Clear Balance ₹${payableAmount.toLocaleString()}` : `Clear ₹${payableAmount.toLocaleString()}`}</span>
        </button>
      </div>
    </article>
  );
}
