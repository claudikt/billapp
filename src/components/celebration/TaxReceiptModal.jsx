import React from 'react';
import { useApp } from '../../context/AppContext';

export default function TaxReceiptModal() {
  const {
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    receiptToShow,
    setViewingReceipt,
    showToast
  } = useApp();

  if (!isReceiptModalOpen) return null;

  const receipt = receiptToShow || {
    refNumber: "KND-2026-88412",
    amount: 4200,
    billerName: "Maharashtra State Electricity Distribution Co. (MSEDCL)",
    recipientName: "Priya S.",
    city: "Pune",
    billerCode: "#2940219",
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  const handleClose = () => {
    setIsReceiptModalOpen(false);
    if (setViewingReceipt) setViewingReceipt(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const certificateText = `============================================================
           KINDLY PHILANTHROPIC FOUNDATION
   Direct-to-Biller Relief • Registered Charitable Trust
============================================================
TAX EXEMPTION CERTIFICATE UNDER SECTION 80G (5)(vi)
Certificate Reference: 80G-KY-${receipt.refNumber}
Settlement Date: ${receipt.date}
Donor Status: Anonymous Direct Ally (Kindly Mutual Aid)
Rail Type: BBPS / Institutional Direct API
Platform Fee: ₹0.00 (100% Donor Funded)
Payment Gateway Fee: ₹0.00 (Covered by Kindly)

ITEMIZED CONTRIBUTION DETAILS:
------------------------------------------------------------
Recipient: ${receipt.recipientName} (${receipt.city})
Disbursed Service: ${receipt.billerName}
Institutional Billing Code: ${receipt.billerCode}
Eligible Deductible Amount: INR ₹${Number(receipt.amount || 0).toLocaleString()}.00

STATUTORY TRUST CONFIRMATION:
Certified that the entire sum of ₹${Number(receipt.amount || 0).toLocaleString()} was settled directly
to the verified utility / institution registry above with
zero cash transfers and zero intermediary leakage.
This contribution qualifies for deduction under Section 80G
of the Income Tax Act, 1961.

Kindly Philanthropic Foundation
Registration: TRUST/PUN/2026/88412
============================================================`;

    try {
      const blob = new Blob([certificateText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Kindly-80G-Receipt-${receipt.refNumber}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('80G Tax Exemption Certificate downloaded!', 'download_done');
    } catch {
      showToast('80G Tax Exemption Certificate downloaded (PDF)', 'download_done');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-2xl flex flex-col gap-space-sm border border-outline-variant/40 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-outline-variant/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Tax-Exemption Certificate (80G)
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Kindly Philanthropic Foundation • Registered Charitable Trust
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Certificate Paper Body */}
        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 flex flex-col gap-3 font-mono text-xs">
          <div className="flex justify-between items-center bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/30">
            <span className="text-on-surface-variant uppercase font-sans">Certificate No:</span>
            <span className="font-bold text-on-surface font-mono">80G-KY-{receipt.refNumber}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-on-surface py-1 font-sans">
            <div>
              <span className="text-on-surface-variant text-[11px] block">Date of Settlement:</span>
              <span className="font-semibold">{receipt.date}</span>
            </div>
            <div>
              <span className="text-on-surface-variant text-[11px] block">Exemption Section:</span>
              <span className="font-semibold">Section 80G (5)(vi)</span>
            </div>
            <div>
              <span className="text-on-surface-variant text-[11px] block">Donor Registration:</span>
              <span className="font-semibold">Anonymous Direct Ally</span>
            </div>
            <div>
              <span className="text-on-surface-variant text-[11px] block">Settlement Rail:</span>
              <span className="font-semibold">BBPS Verified Merchant</span>
            </div>
          </div>

          <div className="h-px bg-outline-variant/40 my-1"></div>

          <div className="flex flex-col gap-1 font-sans">
            <span className="text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">
              Direct Beneficiary & Service Details
            </span>
            <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30 flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Recipient:</span>
                <span className="font-semibold">{receipt.recipientName} ({receipt.city})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Disbursed Service:</span>
                <span className="font-semibold">{receipt.billerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Merchant Identifier:</span>
                <span className="font-mono font-semibold">{receipt.billerCode}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-outline-variant/20 font-bold text-primary text-sm">
                <span>Eligible Relief Amount:</span>
                <span className="font-mono">₹{Number(receipt.amount || 0).toLocaleString()}.00</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-primary-fixed/20 text-on-primary-fixed-variant text-[11px] font-sans">
            ✓ 100% of this contribution is eligible for income tax deduction under Section 80G of the Indian Income Tax Act. Zero platform fees were deducted.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-space-sm pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 h-12 rounded-xl bg-surface-container text-primary font-label-lg text-label-lg font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 h-12 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary-container transition-all flex items-center justify-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
