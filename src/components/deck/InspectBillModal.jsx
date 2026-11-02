import React from 'react';
import { useApp } from '../../context/AppContext';

export default function InspectBillModal() {
  const { inspectBill, setInspectedBill, handleSelectBillForSettlement } = useApp();

  if (!inspectBill) return null;

  const hasPooling = inspectBill.poolingPercentage && inspectBill.poolingPercentage > 0;
  const payableAmount = hasPooling && inspectBill.amountFunded
    ? Math.max(inspectBill.amount - inspectBill.amountFunded, 0)
    : inspectBill.amount;

  const handleClear = () => {
    const billToClear = inspectBill;
    setInspectedBill(null);
    handleSelectBillForSettlement(billToClear);
  };

  const biller = inspectBill.biller || {};
  const requester = inspectBill.requester || {};

  return (
    <div
      className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in duration-200"
      onClick={() => setInspectedBill(null)}
    >
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-t-[28px] p-space-lg flex flex-col gap-space-md shadow-2xl max-h-[85vh] overflow-y-auto border-t border-outline-variant/40 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle / Drag Bar */}
        <div className="w-12 h-1 bg-outline-variant rounded-full mx-auto mb-1"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px] symbol-filled">verified_user</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {biller.shortName || biller.name || 'Official Utility'} Statement
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {requester.city || 'Regional'} Zone • Verified by Kindly Protocol
              </p>
            </div>
          </div>
          <button
            onClick={() => setInspectedBill(null)}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Redacted Document Preview Render (Mono Ledger Look) */}
        <div className="rounded-2xl bg-surface-container-low p-space-md flex flex-col gap-2.5 font-mono border border-outline-variant/40">
          <div className="flex justify-between items-center pb-2 bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/30">
            <span className="text-xs text-on-surface-variant uppercase font-sans font-semibold">
              Billing Period
            </span>
            <span className="text-xs font-semibold text-on-surface font-sans">
              {biller.billPeriod || 'Current Billing Cycle'}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs py-1">
            <span className="text-on-surface-variant font-sans">Billed Consumer:</span>
            <span className="font-semibold text-on-surface tracking-wide">
              {(requester.name || 'Consumer').split(' ')[0]} M••••••
            </span>
          </div>

          <div className="flex justify-between items-center text-xs py-1">
            <span className="text-on-surface-variant font-sans">CA / Consumer Ref:</span>
            <span className="font-semibold text-on-surface tracking-wider">
              {biller.fullMaskedAccount || '•••• ' + (inspectBill.id ? inspectBill.id.slice(-4) : '4921')}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs py-1">
            <span className="text-on-surface-variant font-sans">Tariff / Service Class:</span>
            <span className="font-semibold text-on-surface">
              {biller.tariffClass || 'Standard Consumer LT'}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs py-1">
            <span className="text-on-surface-variant font-sans">Units / Scope:</span>
            <span className="font-semibold text-on-surface">
              {biller.unitsConsumed || 'Domestic Service'}
            </span>
          </div>

          {hasPooling && (
            <div className="flex justify-between items-center text-xs py-1 text-surface-tint">
              <span className="font-sans">Solidarity Pledged:</span>
              <span className="font-semibold">₹{inspectBill.amountFunded?.toLocaleString()}.00 ({inspectBill.poolingPercentage}%)</span>
            </div>
          )}

          <div className="h-px bg-surface-variant my-1"></div>

          <div className="flex justify-between items-center text-sm font-bold text-primary font-sans pt-1">
            <span>{hasPooling ? 'Remaining Balance to Settle:' : 'Net Payable (Verified):'}</span>
            <span className="text-base font-bold">₹{payableAmount.toLocaleString()}.00</span>
          </div>
        </div>

        {/* BBPS & Data Masking Security Guarantee */}
        <div className="p-3.5 rounded-xl bg-surface-container flex items-start gap-2.5 border border-outline-variant/30">
          <span className="material-symbols-outlined text-[18px] text-surface-tint mt-0.5 symbol-filled">
            lock
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
            Consumer credentials and personally identifiable data are cryptographically masked. Funds route directly via {biller.railType || 'BBPS (Bharat BillPay)'} institutional API with zero personal cash transfers.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClear}
          className="w-full h-[52px] rounded-2xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 cta-glow active:scale-95 transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px] symbol-filled">volunteer_activism</span>
          <span>Clear This {hasPooling ? `Balance (₹${payableAmount.toLocaleString()})` : `₹${payableAmount.toLocaleString()} Bill`}</span>
        </button>
      </div>
    </div>
  );
}
