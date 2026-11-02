import React from 'react';
import { useApp } from '../../context/AppContext';

export default function RequesterDashboard() {
  const {
    requesterItems,
    setIsUploadWizardOpen,
    setIsGratitudeModalOpen,
    setSelectedGratitudeItem,
    setIsSupportModalOpen,
    showToast
  } = useApp();

  const handleOpenGratitude = (item) => {
    setSelectedGratitudeItem(item);
    setIsGratitudeModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-margin pt-space-xs pb-space-xl select-none">
      {/* Editorial Greeting & Dignity Promise */}
      <div className="flex flex-col gap-1 mb-space-md">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-tint font-bold">
            Verified Member
          </span>
          <div className="flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-surface-tint animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              Safe Space Active
            </span>
          </div>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg text-primary tracking-tight font-bold">
          Hello, Rajesh
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-surface-tint symbol-filled">
            shield_lock
          </span>
          <span>Your Dignity First • Mutual Solidarity Ledger</span>
        </p>
      </div>

      {/* Upload Primary CTA */}
      <div
        onClick={() => setIsUploadWizardOpen(true)}
        className="relative overflow-hidden rounded-2xl bg-primary text-on-primary p-space-md shadow-md flex items-center justify-between gap-space-md group cursor-pointer transition-transform active:scale-[0.99] border border-primary-container"
      >
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary-fixed shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-[26px]">add_circle</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-bold text-surface-bright tracking-tight leading-snug">
              Upload a New Bill
            </span>
            <span className="font-body-sm text-body-sm text-primary-fixed-dim opacity-90">
              Medical, grocery, utility or education support
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed shrink-0">
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </div>
      </div>

      {/* Active Requests Header */}
      <div className="flex items-center justify-between pt-space-lg pb-space-sm">
        <div className="flex items-baseline gap-2">
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Active Requests
          </h2>
          <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-bold border border-outline-variant/30">
            {requesterItems.length} in ledger
          </span>
        </div>
        <button
          onClick={() => showToast('Full historical archive synchronized', 'history')}
          className="font-label-sm text-label-sm text-surface-tint font-bold hover:underline flex items-center gap-0.5"
          type="button"
        >
          <span>History</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </button>
      </div>

      {/* Request Cards Stream */}
      <div className="flex flex-col gap-space-md">
        {requesterItems.map((item) => (
          <article
            key={item.id}
            className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden transition-all duration-300 border border-outline-variant/30"
          >
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[22px]">
                    {item.categoryIcon || 'receipt'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary leading-tight font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary tabular-nums font-bold">
                ₹{item.amount.toLocaleString()}
              </span>
            </div>

            {/* Pill Status Badges */}
            <div className="flex items-center flex-wrap gap-2">
              {item.status === 'funded' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[14px] symbol-filled">check_circle</span>
                  {item.statusLabel}
                </span>
              )}

              {item.status === 'live' && (
                <>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                    {item.statusLabel}
                  </span>
                  {item.urgencyText && (
                    <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {item.urgencyText}
                    </span>
                  )}
                </>
              )}

              {item.status === 'review' && (
                <>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-variant text-on-surface font-label-sm text-label-sm font-bold border border-outline-variant/40">
                    <span className="material-symbols-outlined text-[14px] text-surface-tint animate-spin">
                      autorenew
                    </span>
                    {item.statusLabel}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {item.submittedTime}
                  </span>
                </>
              )}
            </div>

            {/* Inset Note / Progress Details Well */}
            {item.status === 'funded' && (
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-2 border border-outline-variant/30">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-surface-tint shrink-0 mt-0.5 symbol-filled">
                    favorite
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {item.note}
                  </p>
                </div>
                <div className="pt-1 flex items-center justify-between border-t border-outline-variant/30">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant text-[10px]">
                      <span className="material-symbols-outlined text-[12px]">verified_user</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      {item.receiptNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenGratitude(item)}
                    className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform ${
                      item.hasThankYouSent
                        ? 'bg-surface-container text-on-surface-variant'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {item.hasThankYouSent ? 'mark_email_read' : 'edit_note'}
                    </span>
                    <span>{item.hasThankYouSent ? 'Note Sent ✓' : 'Send a thank-you note'}</span>
                  </button>
                </div>
              </div>
            )}

            {item.status === 'live' && (
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-2 border border-outline-variant/30">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant font-semibold">Solidarity Pooling</span>
                  <span className="text-primary font-bold">
                    ₹{item.amountRaised?.toLocaleString()} of ₹{item.amount.toLocaleString()} raised
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full rounded-full bg-secondary-container transition-all duration-500"
                    style={{ width: `${item.progressPercentage || 60}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant pt-0.5">
                  <span className="font-body-sm text-[12px] truncate">
                    Disbursement target: {item.disbursementTarget}
                  </span>
                  <span className="font-label-sm text-label-sm font-bold text-surface-tint">
                    {item.progressPercentage || 60}% Pledged
                  </span>
                </div>
              </div>
            )}

            {item.status === 'review' && (
              <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm border border-outline-variant/30">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-surface-tint shrink-0">
                  <span className="material-symbols-outlined text-[18px] symbol-filled">verified</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {item.note}
                  </p>
                  <span className="font-label-sm text-label-sm text-surface-tint font-bold">
                    {item.estimatedApproval}
                  </span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Dignity Guarantee Reassurance Callout Banner */}
      <section className="bg-primary-container text-on-primary-container rounded-2xl p-space-md shadow-sm relative overflow-hidden mt-space-md border border-primary">
        <div className="flex gap-space-sm items-start">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-fixed shrink-0">
            <span className="material-symbols-outlined text-[22px]">privacy_tip</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-headline-sm text-headline-sm text-surface-bright leading-tight font-bold">
              Your privacy is guarded
            </h4>
            <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
              Benefactors never see your surname, phone, or exact address. All utility and education bills are settled directly to service providers, preserving your privacy and honoring your story.
            </p>
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <span className="font-label-sm text-label-sm text-primary-fixed flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px]">lock</span> Zero Data Sold
              </span>
              <span className="font-label-sm text-label-sm text-primary-fixed flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px]">shield_with_heart</span> Zero Pity Dynamic
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Quick Access & Connection Hub */}
      <div className="grid grid-cols-2 gap-space-sm pt-space-md">
        {/* Thank-You Notes Sent */}
        <div
          onClick={() => showToast('2 Anonymous thank-you notes safely delivered this month', 'mark_email_read')}
          className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between gap-3 cursor-pointer active:bg-surface-container-low transition-colors border border-outline-variant/30"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-bold">
              2 Delivered
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-bold text-primary">
              Thank-You Notes
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Anonymous solidarity letters
            </span>
          </div>
        </div>

        {/* Dignity Support / Need Help */}
        <div
          onClick={() => setIsSupportModalOpen(true)}
          className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between gap-3 cursor-pointer active:bg-surface-container-low transition-colors border border-outline-variant/30"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <span className="font-label-sm text-label-sm text-surface-tint font-bold">
              Online
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-bold text-primary">
              Need Help?
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Talk with a community ally
            </span>
          </div>
        </div>
      </div>

      {/* Community Mutual Aid Ethos Quote */}
      <div className="py-space-lg px-space-md text-center flex flex-col items-center gap-1">
        <span className="font-headline-sm text-headline-sm italic text-on-surface-variant opacity-80 leading-snug">
          “We all need a gentle hand to bridge the gap sometimes.”
        </span>
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest font-semibold mt-1">
          Kindly Solidarity Protocol
        </span>
      </div>
    </div>
  );
}
