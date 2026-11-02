import React from 'react';
import { useApp } from '../../context/AppContext';

export default function ImpactView() {
  const {
    totalClearedAmount,
    clearedTransactions,
    setIsReceiptModalOpen,
    setViewingReceipt,
    showToast
  } = useApp();

  const handleViewReceipt = (tx) => {
    setViewingReceipt({
      refNumber: tx.receiptId,
      amount: tx.amount,
      billerName: tx.billerName,
      recipientName: tx.beneficiaryName,
      city: tx.city,
      billerCode: '#BBPS-VERIFIED',
      date: tx.date,
      note: tx.blessing
    });
    setIsReceiptModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-margin pt-space-xs pb-space-xl select-none">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-space-md">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-tint font-bold">
          Direct Philanthropy Feed
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg text-primary tracking-tight font-bold">
          Your Kindness Ledger
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          100% direct-to-biller disbursement with auditable proof.
        </p>
      </div>

      {/* Hero Stats Card */}
      <div className="rounded-2xl bg-primary text-on-primary p-space-md shadow-md border border-primary-container flex flex-col gap-space-sm mb-space-md">
        <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
          Lifetime Direct Relief
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-headline-xl text-3xl sm:text-headline-xl font-bold font-serif text-surface-bright">
            ₹{totalClearedAmount.toLocaleString()}
          </span>
          <span className="font-label-md text-label-md text-primary-fixed-dim">
            disbursed directly to billers
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-primary-container/70 text-center">
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg font-bold text-surface-bright">
              {clearedTransactions.length}
            </span>
            <span className="font-label-sm text-[11px] text-primary-fixed-dim">Bills Cleared</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg font-bold text-surface-bright">₹0.00</span>
            <span className="font-label-sm text-[11px] text-primary-fixed-dim">Intermediary Leakage</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg font-bold text-surface-bright">100%</span>
            <span className="font-label-sm text-[11px] text-primary-fixed-dim">Direct BBPS</span>
          </div>
        </div>
      </div>

      {/* Tax Receipts Quick Download Bar */}
      <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-outline-variant/30 mb-space-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold text-primary">
              Section 80G Tax Exemption
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">
              Download cumulative tax certificate for AY 2026-27
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            setViewingReceipt(null);
            setIsReceiptModalOpen(true);
          }}
          className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-xs font-bold border border-outline-variant/40 hover:bg-surface transition-colors shadow-sm"
          type="button"
        >
          View 80G
        </button>
      </div>

      {/* Cleared Bills Feed */}
      <div className="flex flex-col gap-space-sm">
        <h3 className="font-headline-md text-headline-sm text-primary font-bold">
          Settlement History
        </h3>

        {clearedTransactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface">
                    {tx.beneficiaryName} ({tx.city})
                  </h4>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    {tx.billerName} • {tx.date}
                  </span>
                </div>
              </div>
              <span className="font-headline-sm text-base font-bold text-secondary font-mono">
                ₹{tx.amount.toLocaleString()}
              </span>
            </div>

            {tx.blessing && (
              <div className="p-2.5 rounded-lg bg-surface-container-low text-xs text-on-surface-variant italic font-serif border border-outline-variant/20">
                "{tx.blessing}"
              </div>
            )}

            {tx.thankYouNote && (
              <div className="p-2.5 rounded-lg bg-primary-fixed/20 text-xs text-primary font-sans border border-primary-fixed/40 flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-surface-tint symbol-filled shrink-0">
                  volunteer_activism
                </span>
                <span><strong>Thank-you received:</strong> "{tx.thankYouNote}"</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 text-[11px] text-on-surface-variant font-mono">
              <span>Ref #{tx.receiptId}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleViewReceipt(tx)}
                  className="text-primary font-bold hover:underline"
                  type="button"
                >
                  View 80G
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(tx.receiptId);
                    showToast('Reference ID copied', 'check');
                  }}
                  className="text-surface-tint hover:underline"
                  type="button"
                >
                  Copy Ref
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
