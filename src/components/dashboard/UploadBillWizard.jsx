import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export default function UploadBillWizard() {
  const { isUploadWizardOpen, setIsUploadWizardOpen, handleAddNewBill } = useApp();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: 'Electricity Utility',
    categoryIcon: 'bolt',
    billerName: 'Maharashtra State Electricity Board (MSEB)',
    accountNumber: '98014921',
    amount: '4200',
    dueDate: '2026-11-05',
    prompt1: 'Hospitalization expenses last month depleted our emergency reserve.',
    prompt2: 'Keeps our household powered safely so family members can continue recovery.',
    fileName: 'mseb_bill_statement.pdf',
    fileSize: '1.2 MB',
    scannedScrubbed: true
  });

  if (!isUploadWizardOpen) return null;

  const categories = [
    { label: 'Electricity Utility', icon: 'bolt', defaultBiller: 'MSEDCL Pune' },
    { label: 'Healthcare & Pharmacy', icon: 'prescriptions', defaultBiller: 'MedPlus Pharmacy' },
    { label: 'Higher Education', icon: 'school', defaultBiller: "St. Xavier's Education Fund" },
    { label: 'Provisions & Groceries', icon: 'shopping_cart', defaultBiller: 'FreshBasket Provisions' },
    { label: 'Water Utility', icon: 'water_drop', defaultBiller: 'Nashik Municipal Water' }
  ];

  const handleCategorySelect = (cat) => {
    setFormData(prev => ({
      ...prev,
      category: cat.label,
      categoryIcon: cat.icon,
      billerName: cat.defaultBiller
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setFormData(prev => ({
        ...prev,
        fileName: file.name,
        fileSize: sizeStr
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNewBill({
      title: `${formData.category} Statement`,
      category: formData.category,
      categoryIcon: formData.categoryIcon,
      amount: formData.amount,
      billerName: formData.billerName,
      accountNumber: formData.accountNumber,
      dueDate: formData.dueDate,
      prompt1: formData.prompt1,
      prompt2: formData.prompt2
    });
    setIsUploadWizardOpen(false);
    setStep(1);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200"
      onClick={() => setIsUploadWizardOpen(false)}
    >
      <div
        className="w-full max-w-lg mx-auto bg-surface-container-lowest rounded-t-[28px] p-margin flex flex-col gap-space-md max-h-[88vh] overflow-y-auto shadow-2xl border-t border-outline-variant/40 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-outline-variant rounded-full mx-auto"></div>

        {/* Wizard Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-surface-tint uppercase font-bold tracking-wider">
              Step {step} of 2 • Dignified Verification
            </span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              {step === 1 ? 'Select Category & Scan Bill' : 'Your Story & Account Details'}
            </h3>
          </div>
          <button
            onClick={() => setIsUploadWizardOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {step === 1 ? (
          <div className="flex flex-col gap-space-md">
            {/* Category Grid */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-primary font-bold">
                Select Need Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const isSelected = formData.category === cat.label;
                  return (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => handleCategorySelect(cat)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-primary-container text-on-primary-container border-primary font-bold shadow-sm'
                          : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {cat.icon}
                      </span>
                      <span className="font-label-sm text-[12px] truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Document Scan / Upload Card with real file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl bg-surface-container-low p-space-md flex flex-col items-center justify-center gap-2 border border-dashed border-outline-variant text-center cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">document_scanner</span>
              </div>
              <span className="font-label-lg text-label-lg font-bold text-primary">
                {formData.fileName}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {formData.fileSize} • Tap to change document
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed/40 text-primary font-label-sm text-xs font-bold mt-1">
                <span className="material-symbols-outlined text-[14px] text-surface-tint symbol-filled">
                  verified
                </span>
                <span>Automated OCR: Home address & phone scrubbed</span>
              </div>
            </div>

            {/* Reassurance Checks */}
            <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-surface-tint symbol-filled">check_circle</span>
                <span>Direct merchant settlement guaranteed (no personal transfers)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-surface-tint symbol-filled">check_circle</span>
                <span>Consumer account validated against official registry</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full h-[52px] rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Story Details</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
            {/* Biller & Amount Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-bold">
                  Biller / Institution
                </label>
                <input
                  type="text"
                  value={formData.billerName}
                  onChange={(e) => setFormData({ ...formData, billerName: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-bold">
                  Amount Due (₹)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-sm font-mono font-bold focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Account Number & Due Date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-bold">
                  Consumer Account No.
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  required
                  placeholder="e.g. 98014921"
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-sm font-mono focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <span className="text-[10px] text-surface-tint font-semibold">Masked as •••• {formData.accountNumber ? formData.accountNumber.slice(-4) : '****'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-bold">
                  Payment Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Story Prompt 1 */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">format_quote</span>
                This bill is hard because…
              </label>
              <textarea
                value={formData.prompt1}
                onChange={(e) => setFormData({ ...formData, prompt1: e.target.value })}
                required
                rows={2}
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              />
            </div>

            {/* Story Prompt 2 */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary-container">favorite_border</span>
                What this kindness would mean…
              </label>
              <textarea
                value={formData.prompt2}
                onChange={(e) => setFormData({ ...formData, prompt2: e.target.value })}
                required
                rows={2}
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-[52px] px-4 rounded-xl bg-surface-container text-on-surface-variant font-label-lg font-bold hover:bg-surface-container-high transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 h-[52px] rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary-container transition-all flex items-center justify-center gap-2 cta-glow active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">upload_file</span>
                <span>Submit Bill to Verification Ledger</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
