import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DemoPaymentGatewayModal from './DemoPaymentGatewayModal';

export default function SettlementView() {
  const {
    activeSettlementBill,
    handleCompleteSettlement,
    setActiveScreen,
    setInspectedBill
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [blessingNote, setBlessingNote] = useState('');
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const bill = activeSettlementBill;

  if (!bill) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto">
        <p className="font-headline-sm text-headline-sm text-primary">No bill selected for settlement.</p>
        <button
          onClick={() => setActiveScreen('deck')}
          className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-xl font-label-md font-bold"
        >
          Return to Discover Deck
        </button>
      </div>
    );
  }

  // Calculate payable amount if solidarity pooling is active
  const hasPooling = bill.poolingPercentage && bill.poolingPercentage > 0;
  const payableAmount = hasPooling && bill.amountFunded
    ? Math.max(bill.amount - bill.amountFunded, 0)
    : bill.amount;

  const handleConfirmPayment = () => {
    setIsGatewayOpen(true);
  };

  const handleGatewaySuccess = (method) => {
    setIsGatewayOpen(false);
    handleCompleteSettlement(method || paymentMethod, blessingNote);
  };

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl max-w-lg mx-auto select-none">
      {/* Underlying Context & Backdrop Header */}
      <div className="relative w-full mb-space-md pt-space-xs">
        <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-surface-tint text-[18px] symbol-filled">
              verified_user
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-tint font-bold">
              Direct Institutional Settlement
            </span>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-mono font-semibold">
            Ref #{bill.refNumber}
          </span>
        </div>

        {/* Beneficiary Pill Card */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/40">
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
            <div className="min-w-0 flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-headline-sm text-headline-sm text-primary font-bold truncate">
                  {bill.requester.name}
                </span>
                <span className="material-symbols-outlined text-[16px] text-surface-tint symbol-filled">
                  check_circle
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {bill.category} • {bill.requester.city}, Maharashtra
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0 pl-2">
            <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">Due In</span>
            <span className="font-label-md text-label-md text-secondary font-bold">
              {bill.urgencyDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* The Settlement Ledger Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-md flex flex-col gap-space-md border border-outline-variant/30">
        {/* Institutional Direct Payment Assurance */}
        <div className="bg-primary-fixed/30 rounded-xl p-space-sm flex items-start justify-between gap-2.5 border border-primary-fixed/40">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5 text-on-primary">
              <span className="material-symbols-outlined text-[18px]">
                {bill.categoryIcon === 'bolt' ? 'electric_meter' : bill.categoryIcon}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-primary font-bold leading-tight">
                {bill.biller.name}
              </span>
              <p className="font-body-sm text-body-sm text-on-primary-fixed-variant leading-relaxed mt-0.5">
                Kindly pays directly to the verified service provider — zero cash transfers, 100% verified direct relief.
              </p>
            </div>
          </div>
          <button
            onClick={() => setInspectedBill(bill)}
            className="shrink-0 text-xs text-primary font-bold px-2 py-1 bg-surface-container rounded-lg hover:bg-surface-variant flex items-center gap-1 border border-outline-variant/30"
            type="button"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            <span>Inspect</span>
          </button>
        </div>

        {/* Transparent Financial Breakdown Ledger */}
        <div className="flex flex-col bg-surface-container-low rounded-xl p-space-md gap-space-sm border border-outline-variant/30 font-mono">
          <div className="flex items-center justify-between font-sans">
            <span className="font-body-md text-body-md text-on-surface-variant">Bill Amount</span>
            <span className="font-body-md text-body-md font-bold text-on-surface font-mono">
              ₹{bill.amount.toLocaleString()}.00
            </span>
          </div>

          {hasPooling && (
            <div className="flex items-center justify-between font-sans text-surface-tint">
              <div className="flex items-center gap-1.5">
                <span className="font-body-sm text-body-sm">Solidarity Pooled by Community</span>
                <span className="font-label-sm text-label-sm bg-primary-fixed px-1.5 py-0.5 rounded font-bold">
                  {bill.poolingPercentage}% Funded
                </span>
              </div>
              <span className="font-body-sm text-body-sm font-bold font-mono">
                -₹{bill.amountFunded?.toLocaleString()}.00
              </span>
            </div>
          )}

          <div className="flex items-center justify-between font-sans">
            <div className="flex items-center gap-1.5">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Platform Fee</span>
              <span className="font-label-sm text-label-sm text-surface-tint bg-primary-fixed px-1.5 py-0.5 rounded font-bold">
                100% Donor Funded
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-surface-tint font-bold font-mono">
              ₹0.00
            </span>
          </div>

          <div className="flex items-center justify-between font-sans">
            <div className="flex items-center gap-1.5">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Payment Gateway Fee</span>
              <span className="font-label-sm text-label-sm text-surface-tint bg-primary-fixed px-1.5 py-0.5 rounded font-bold">
                Covered by Kindly
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-surface-tint font-bold font-mono">
              ₹0.00
            </span>
          </div>

          <div className="h-px bg-surface-container-high my-1"></div>

          <div className="flex items-center justify-between pt-0.5 font-sans">
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-primary font-bold">Total You Pay</span>
              <span className="font-label-sm text-label-sm text-outline">
                {hasPooling ? 'Clearing remaining community balance' : 'No hidden deductions'}
              </span>
            </div>
            <span className="font-headline-md text-headline-md text-primary font-bold font-mono">
              ₹{payableAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Warm Note of Encouragement Field */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md text-primary font-bold flex items-center gap-1.5" htmlFor="warm-blessing-input">
              <span className="material-symbols-outlined text-[16px] text-secondary symbol-filled">
                favorite
              </span>
              Send an anonymous blessing or note
            </label>
            <span className="font-label-sm text-label-sm text-outline font-semibold">Optional</span>
          </div>
          <div className="relative w-full">
            <textarea
              id="warm-blessing-input"
              value={blessingNote}
              onChange={(e) => setBlessingNote(e.target.value)}
              maxLength={160}
              rows={2}
              placeholder="Wishing your family peaceful days ahead and speedy recovery..."
              className="w-full bg-surface-container-low rounded-xl p-3 text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest resize-none transition-all border border-outline-variant/30"
            />
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] text-surface-tint symbol-filled">
              lock
            </span>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              Shared privately with {bill.requester.name} upon settlement. Your identity stays anonymous.
            </span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="flex flex-col gap-2">
          <span className="font-label-md text-label-md text-primary font-bold">
            Select Direct Payment Method
          </span>

          {/* Option 1: UPI (Default selected) */}
          <div
            onClick={() => setPaymentMethod('upi')}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
              paymentMethod === 'upi'
                ? 'bg-surface-container-low border-primary shadow-sm'
                : 'bg-surface-container-low/60 border-outline-variant/30 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  UPI Instant Transfer
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Google Pay • PhonePe • Paytm • Any UPI ID
                </span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              paymentMethod === 'upi' ? 'bg-primary' : 'bg-surface-container-high'
            }`}>
              {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-on-primary"></div>}
            </div>
          </div>

          {/* Option 2: Net Banking */}
          <div
            onClick={() => setPaymentMethod('netbanking')}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
              paymentMethod === 'netbanking'
                ? 'bg-surface-container-low border-primary shadow-sm'
                : 'bg-surface-container-low/60 border-outline-variant/30 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  Net Banking
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  All major Indian banks (SBI, HDFC, ICICI, etc.)
                </span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              paymentMethod === 'netbanking' ? 'bg-primary' : 'bg-surface-container-high'
            }`}>
              {paymentMethod === 'netbanking' && <div className="w-2 h-2 rounded-full bg-on-primary"></div>}
            </div>
          </div>

          {/* Option 3: Cards */}
          <div
            onClick={() => setPaymentMethod('cards')}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
              paymentMethod === 'cards'
                ? 'bg-surface-container-low border-primary shadow-sm'
                : 'bg-surface-container-low/60 border-outline-variant/30 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">credit_card</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  RuPay, Debit & Credit Cards
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Zero processing surcharge
                </span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              paymentMethod === 'cards' ? 'bg-primary' : 'bg-surface-container-high'
            }`}>
              {paymentMethod === 'cards' && <div className="w-2 h-2 rounded-full bg-on-primary"></div>}
            </div>
          </div>
        </div>

        {/* Confirmation CTA Button */}
        <div className="pt-1 flex flex-col gap-space-sm">
          <button
            onClick={handleConfirmPayment}
            className="w-full h-[54px] rounded-2xl bg-gradient-to-r from-secondary to-secondary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(161,62,40,0.35)] active:scale-[0.98] transition-all hover:opacity-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] symbol-filled">lock</span>
            <span>Proceed to Secure Gateway (₹{payableAmount.toLocaleString()})</span>
          </button>

          {/* Trust Badges & Tax Receipts */}
          <div className="flex items-center justify-center gap-2 text-center text-on-surface-variant px-2 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-surface-tint symbol-filled">lock</span>
              <span className="font-body-sm text-[12px]">256-bit encryption</span>
            </div>
            <span className="text-outline">•</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-secondary">receipt_long</span>
              <span className="font-body-sm text-[12px]">Tax-deductible 80G receipt generated instantly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Micro-story grounding footnote */}
      <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex items-center gap-3 border border-outline-variant/30">
        <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
          <span className="material-symbols-outlined text-[18px]">handshake</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {bill.requester.name}’s account status will be refreshed directly with {bill.biller.shortName} within 15 minutes of payment confirmation.
        </p>
      </div>

      {/* Realistic Demo Payment Gateway Modal */}
      <DemoPaymentGatewayModal
        isOpen={isGatewayOpen}
        onClose={() => setIsGatewayOpen(false)}
        bill={bill}
        payableAmount={payableAmount}
        initialMethod={paymentMethod}
        blessingNote={blessingNote}
        onPaymentSuccess={handleGatewaySuccess}
      />
    </div>
  );
}
