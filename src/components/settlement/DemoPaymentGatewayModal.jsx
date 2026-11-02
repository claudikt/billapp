import React, { useState, useEffect, useRef } from 'react';

export default function DemoPaymentGatewayModal({
  isOpen,
  onClose,
  bill,
  payableAmount,
  initialMethod = 'upi',
  blessingNote,
  onPaymentSuccess
}) {
  const [activeTab, setActiveTab] = useState(initialMethod);
  const [stage, setStage] = useState('select'); // 'select' | 'processing' | 'otp' | 'success'
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(28);
  const [qrTimer, setQrTimer] = useState(299);
  const [vpaId, setVpaId] = useState('pranav@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [selectedBank, setSelectedBank] = useState('hdfc');
  const [cardData, setCardData] = useState({
    number: '4532 8821 9012 4921',
    expiry: '08/29',
    cvv: '821',
    name: 'Pranav Sharma'
  });

  const otpInputRefs = useRef([]);

  // Sync initial payment method
  useEffect(() => {
    if (initialMethod) setActiveTab(initialMethod);
  }, [initialMethod]);

  // Reset stage when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('select');
      setOtpValues(['', '', '', '', '', '']);
      setOtpTimer(28);
      setQrTimer(299);
    }
  }, [isOpen]);

  // QR countdown timer
  useEffect(() => {
    if (!isOpen || stage !== 'select') return;
    const interval = setInterval(() => {
      setQrTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, stage]);

  // OTP countdown timer
  useEffect(() => {
    if (stage !== 'otp') return;
    const interval = setInterval(() => {
      setOtpTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  if (!isOpen || !bill) return null;

  const orderId = `ORD_KY_${bill.refNumber || '9821'}_${Math.floor(1000 + Math.random() * 9000)}`;
  const displayAmount = (payableAmount || bill.amount).toLocaleString('en-IN');

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartPayment = (chosenMethod) => {
    setStage('processing');

    setTimeout(() => {
      if (chosenMethod === 'cards' || chosenMethod === 'netbanking') {
        setStage('otp');
      } else {
        // UPI instant authorization
        setStage('processing_upi');
        setTimeout(() => {
          setStage('success');
          setTimeout(() => {
            onPaymentSuccess(chosenMethod);
          }, 1400);
        }, 2200);
      }
    }, 900);
  };

  const handleSimulateUpiApproval = () => {
    setStage('success');
    setTimeout(() => {
      onPaymentSuccess('upi');
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleFillDemoOtp = () => {
    const demo = ['4', '8', '2', '9', '1', '0'];
    setOtpValues(demo);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setStage('processing_bank');
    setTimeout(() => {
      setStage('success');
      setTimeout(() => {
        onPaymentSuccess(activeTab);
      }, 1200);
    }, 1800);
  };

  const handleFillDemoCard = (type) => {
    if (type === 'rupay') {
      setCardData({
        number: '6071 8823 4910 8821',
        expiry: '11/28',
        cvv: '719',
        name: 'Pranav Sharma'
      });
    } else {
      setCardData({
        number: '4532 8821 9012 4921',
        expiry: '08/29',
        cvv: '821',
        name: 'Pranav Sharma'
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-t-[28px] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh] sm:max-h-[680px] h-full sm:h-auto border border-outline-variant/40 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gateway Header Banner (styled like Razorpay / Cashfree) */}
        <div className="bg-[#0f1f18] text-white p-4 sm:p-5 flex items-center justify-between border-b border-primary-container relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-bold shadow-md">
              <span className="material-symbols-outlined text-[24px] symbol-filled">
                volunteer_activism
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-surface-bright">Kindly Gateway</span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-[1px] rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Test Mode
                </span>
              </div>
              <p className="text-[11px] text-gray-300 truncate max-w-[210px] sm:max-w-xs">
                Direct to: <strong className="text-white">{bill.biller.shortName || bill.biller.name}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[11px] text-gray-300 uppercase tracking-wider font-medium">Payable Total</span>
            <span className="text-xl font-bold font-mono text-emerald-300 tracking-tight">₹{displayAmount}</span>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 rounded-full transition-colors"
              title="Close Gateway"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Security / BBPS Trust Microbar */}
        <div className="bg-surface-container-low px-4 py-1.5 flex items-center justify-between text-[11px] text-on-surface-variant border-b border-outline-variant/30">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-surface-tint symbol-filled">verified</span>
            <span className="font-mono text-[10px] font-semibold">{orderId}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-surface-tint font-bold">
              <span className="material-symbols-outlined text-[13px]">lock</span>
              256-Bit SSL
            </span>
            <span>•</span>
            <span className="font-semibold text-primary">BBPS Certified</span>
          </div>
        </div>

        {/* ===================== STAGE 1: METHOD SELECTION ===================== */}
        {stage === 'select' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Top Navigation Tabs */}
            <div className="grid grid-cols-3 bg-surface-container border-b border-outline-variant/30 p-1 gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'upi'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cards')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'cards'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">credit_card</span>
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'netbanking'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
                <span>NetBanking</span>
              </button>
            </div>

            {/* Tab Body Corridor */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
              {/* ------------ TAB 1: UPI / QR ------------ */}
              {activeTab === 'upi' && (
                <div className="flex flex-col gap-4">
                  {/* Dynamic QR Code Box */}
                  <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/40 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="relative p-2 bg-white rounded-xl shadow-sm border border-outline-variant/40 shrink-0">
                      {/* Realistic SVG UPI QR Matrix Representation */}
                      <svg className="w-32 h-32" viewBox="0 0 120 120" fill="none">
                        {/* Corner Targets */}
                        <rect x="10" y="10" width="28" height="28" rx="4" stroke="#16382c" strokeWidth="6" />
                        <rect x="18" y="18" width="12" height="12" fill="#16382c" />
                        <rect x="82" y="10" width="28" height="28" rx="4" stroke="#16382c" strokeWidth="6" />
                        <rect x="90" y="18" width="12" height="12" fill="#16382c" />
                        <rect x="10" y="82" width="28" height="28" rx="4" stroke="#16382c" strokeWidth="6" />
                        <rect x="18" y="90" width="12" height="12" fill="#16382c" />
                        {/* Data dots matrix */}
                        <circle cx="48" cy="20" r="3" fill="#16382c" />
                        <circle cx="58" cy="20" r="3" fill="#16382c" />
                        <circle cx="68" cy="20" r="3" fill="#16382c" />
                        <circle cx="48" cy="30" r="3" fill="#16382c" />
                        <circle cx="68" cy="30" r="3" fill="#16382c" />
                        <circle cx="20" cy="50" r="3" fill="#16382c" />
                        <circle cx="30" cy="50" r="3" fill="#16382c" />
                        <circle cx="50" cy="50" r="4" fill="#a13e28" />
                        <circle cx="60" cy="50" r="4" fill="#a13e28" />
                        <circle cx="70" cy="50" r="3" fill="#16382c" />
                        <circle cx="90" cy="50" r="3" fill="#16382c" />
                        <circle cx="100" cy="50" r="3" fill="#16382c" />
                        <circle cx="50" cy="60" r="4" fill="#a13e28" />
                        <circle cx="60" cy="60" r="4" fill="#a13e28" />
                        <circle cx="80" cy="60" r="3" fill="#16382c" />
                        <circle cx="20" cy="70" r="3" fill="#16382c" />
                        <circle cx="48" cy="70" r="3" fill="#16382c" />
                        <circle cx="68" cy="70" r="3" fill="#16382c" />
                        <circle cx="90" cy="70" r="3" fill="#16382c" />
                        <circle cx="48" cy="90" r="3" fill="#16382c" />
                        <circle cx="58" cy="90" r="3" fill="#16382c" />
                        <circle cx="78" cy="90" r="3" fill="#16382c" />
                        <circle cx="88" cy="90" r="3" fill="#16382c" />
                        <circle cx="100" cy="90" r="3" fill="#16382c" />
                        <circle cx="48" cy="100" r="3" fill="#16382c" />
                        <circle cx="68" cy="100" r="3" fill="#16382c" />
                        <circle cx="88" cy="100" r="3" fill="#16382c" />
                        {/* Center UPI Badge */}
                        <circle cx="60" cy="60" r="14" fill="#ffffff" stroke="#0f766e" strokeWidth="2" />
                        <text x="60" y="64" textAnchor="middle" fill="#0f766e" fontSize="9" fontWeight="bold" fontFamily="sans-serif">UPI</text>
                      </svg>
                      <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                        <span className="bg-primary text-[9px] text-white font-bold px-2 py-0.5 rounded-full shadow">
                          NPCI / BBPS
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-xs font-bold text-primary">
                        <span className="material-symbols-outlined text-[16px]">timer</span>
                        <span>QR Expires in {formatSeconds(qrTimer)}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Scan with <strong className="text-on-surface">GPay, PhonePe, Paytm, or CRED</strong>
                      </p>
                      <p className="text-[11px] text-surface-tint font-medium mt-0.5">
                        ✓ Directly credits {bill.biller.shortName} via BBPS
                      </p>
                      <button
                        type="button"
                        onClick={handleSimulateUpiApproval}
                        className="mt-2 py-1.5 px-3 rounded-lg bg-surface-container-highest hover:bg-surface-variant text-primary text-xs font-bold transition-all border border-outline-variant/40 flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[14px]">smartphone</span>
                        <span>Simulate QR Scan in App</span>
                      </button>
                    </div>
                  </div>

                  {/* Instant UPI Apps */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Or Select UPI App
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'gpay', name: 'Google Pay', iconBg: 'bg-white', iconText: 'GPay', iconColor: 'text-blue-600' },
                        { id: 'phonepe', name: 'PhonePe', iconBg: 'bg-purple-700', iconText: 'पे', iconColor: 'text-white' },
                        { id: 'paytm', name: 'Paytm UPI', iconBg: 'bg-sky-500', iconText: 'Paytm', iconColor: 'text-white' },
                        { id: 'cred', name: 'CRED UPI', iconBg: 'bg-black', iconText: 'CRED', iconColor: 'text-white' }
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUpiApp(app.id)}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                            selectedUpiApp === app.id
                              ? 'bg-primary-container text-white border-primary shadow-sm font-bold'
                              : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-md ${app.iconBg} ${app.iconColor} flex items-center justify-center text-[10px] font-black shrink-0 shadow-xs`}>
                            {app.iconText}
                          </div>
                          <span className="text-xs truncate">{app.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom UPI ID */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-primary" htmlFor="vpa-input">
                      Enter UPI ID / VPA
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          id="vpa-input"
                          type="text"
                          value={vpaId}
                          onChange={(e) => setVpaId(e.target.value)}
                          placeholder="e.g. yourname@okhdfcbank"
                          className="w-full p-2.5 text-xs font-mono rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                        <span className="absolute right-3 top-2.5 text-[11px] text-surface-tint font-bold">
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------ TAB 2: CARDS ------------ */}
              {activeTab === 'cards' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">Enter Card Details</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleFillDemoCard('rupay')}
                        className="text-[10px] bg-surface-container px-2 py-0.5 rounded text-primary font-bold hover:bg-surface-variant transition-colors"
                      >
                        Demo RuPay
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFillDemoCard('visa')}
                        className="text-[10px] bg-surface-container px-2 py-0.5 rounded text-primary font-bold hover:bg-surface-variant transition-colors"
                      >
                        Demo Visa
                      </button>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-on-surface-variant" htmlFor="card-number">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        id="card-number"
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        maxLength={19}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full p-2.5 pr-16 text-xs font-mono font-bold rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                      <div className="absolute right-2.5 top-2.5 flex items-center gap-1">
                        <span className="bg-primary text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                          RuPay
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-on-surface-variant" htmlFor="card-expiry">
                        Valid Thru (MM/YY)
                      </label>
                      <input
                        id="card-expiry"
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full p-2.5 text-xs font-mono font-bold rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-on-surface-variant flex items-center justify-between" htmlFor="card-cvv">
                        <span>CVV</span>
                        <span className="text-[10px] text-outline font-normal">3 digits</span>
                      </label>
                      <input
                        id="card-cvv"
                        type="password"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        maxLength={3}
                        placeholder="•••"
                        className="w-full p-2.5 text-xs font-mono font-bold rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-on-surface-variant" htmlFor="card-name">
                      Cardholder Name
                    </label>
                    <input
                      id="card-name"
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      placeholder="Name on card"
                      className="w-full p-2.5 text-xs font-semibold rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-primary-fixed/30 border border-primary-fixed/40 flex items-center gap-2 text-xs text-primary">
                    <span className="material-symbols-outlined text-[16px] text-surface-tint symbol-filled">shield</span>
                    <span>Zero convenience fee • RBI tokenization compliant</span>
                  </div>
                </div>
              )}

              {/* ------------ TAB 3: NET BANKING ------------ */}
              {activeTab === 'netbanking' && (
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Popular Indian Banks
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'hdfc', name: 'HDFC Bank', color: 'bg-blue-800' },
                      { id: 'sbi', name: 'State Bank of India', color: 'bg-sky-600' },
                      { id: 'icici', name: 'ICICI Bank', color: 'bg-amber-700' },
                      { id: 'axis', name: 'Axis Bank', color: 'bg-rose-900' },
                      { id: 'kotak', name: 'Kotak Bank', color: 'bg-red-600' },
                      { id: 'pnb', name: 'Punjab National Bank', color: 'bg-yellow-700' }
                    ].map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all ${
                          selectedBank === bank.id
                            ? 'bg-primary-container text-white border-primary shadow-sm font-bold'
                            : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${bank.color} shrink-0`} />
                        <span className="text-xs truncate">{bank.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* All Other Banks Dropdown */}
                  <div className="flex flex-col gap-1 pt-1">
                    <label className="text-[11px] font-semibold text-on-surface-variant" htmlFor="all-banks-select">
                      Or Select from All Other Banks
                    </label>
                    <select
                      id="all-banks-select"
                      className="w-full p-2.5 text-xs font-semibold rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:bg-white focus:outline-none"
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <option value="bob">Bank of Baroda</option>
                      <option value="canara">Canara Bank</option>
                      <option value="idbi">IDBI Bank</option>
                      <option value="union">Union Bank of India</option>
                      <option value="indusind">IndusInd Bank</option>
                      <option value="yes">Yes Bank</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action CTA */}
            <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl bg-surface-container text-on-surface-variant text-xs font-bold hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleStartPayment(activeTab)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-secondary to-secondary-container hover:opacity-95 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Pay ₹{displayAmount} via {activeTab === 'upi' ? 'UPI' : activeTab === 'cards' ? 'Card' : 'NetBanking'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================== STAGE 2A: UPI PROCESSING ===================== */}
        {stage === 'processing_upi' && (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-4 my-auto">
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary-fixed/40 animate-ping absolute"></div>
              <div className="w-16 h-16 rounded-full bg-primary text-primary-fixed flex items-center justify-center shadow-lg relative z-10">
                <span className="material-symbols-outlined text-3xl animate-bounce">
                  smartphone
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 max-w-xs">
              <h3 className="font-headline-sm text-lg font-bold text-primary">
                Awaiting UPI Approval
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                We sent a direct payment request of <strong className="text-primary font-bold">₹{displayAmount}</strong> to your UPI application.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-xs text-on-surface font-mono">
              <span className="material-symbols-outlined text-sm text-surface-tint animate-spin">
                autorenew
              </span>
              <span>Approval SLA: ~15 seconds</span>
            </div>

            <button
              type="button"
              onClick={handleSimulateUpiApproval}
              className="mt-2 py-2 px-4 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm transition-all"
            >
              Simulate Instant UPI Approval
            </button>
          </div>
        )}

        {/* ===================== STAGE 2B: 3D SECURE OTP ===================== */}
        {stage === 'otp' && (
          <div className="p-5 sm:p-6 flex flex-col gap-4 my-auto">
            {/* Bank Header Stamp */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-800 text-white flex items-center justify-center font-bold text-xs">
                  HDFC
                </div>
                <div>
                  <h4 className="font-bold text-xs text-primary uppercase tracking-wide">
                    HDFC Bank • Verified by 3D-Secure 2.0
                  </h4>
                  <span className="text-[10px] text-on-surface-variant">Merchant: Kindly Foundation Biller Settle</span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold text-primary">₹{displayAmount}</span>
            </div>

            <div className="flex flex-col gap-1 text-center">
              <p className="text-xs text-on-surface">
                Enter the 6-digit One-Time Password (OTP) sent to your registered mobile number ending in <strong className="font-mono">•••• 8821</strong>
              </p>
            </div>

            {/* OTP 6-box input */}
            <form onSubmit={handleOtpSubmit} className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                {otpValues.map((val, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-10 h-12 text-center font-mono font-bold text-lg rounded-xl bg-surface-container-low border border-outline-variant/50 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                ))}
              </div>

              {/* Demo Helper Pill */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillDemoOtp}
                  className="px-3 py-1 rounded-full bg-primary-fixed/50 hover:bg-primary-fixed text-primary text-[11px] font-bold transition-colors border border-primary-fixed"
                >
                  ⚡ One-Click Fill Demo OTP (482910)
                </button>
              </div>

              <div className="flex items-center justify-between w-full text-xs text-on-surface-variant px-2">
                <span>Resend OTP in <strong className="font-mono">{otpTimer}s</strong></span>
                <span className="text-surface-tint font-bold">100% Direct Rail</span>
              </div>

              <div className="flex items-center gap-2 w-full pt-2">
                <button
                  type="button"
                  onClick={() => setStage('select')}
                  className="py-3 px-4 rounded-xl bg-surface-container text-on-surface-variant text-xs font-bold hover:bg-surface-container-high transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={otpValues.some(v => !v)}
                  className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  Verify & Clear Bill
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================== STAGE 3: BANK PROCESSING ===================== */}
        {stage === 'processing_bank' && (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-4 my-auto">
            <div className="w-14 h-14 rounded-full border-4 border-surface-tint border-t-transparent animate-spin"></div>
            <div className="flex flex-col gap-1">
              <h3 className="font-headline-sm text-lg font-bold text-primary">
                Connecting to Institutional Clearing Rail
              </h3>
              <p className="text-xs text-on-surface-variant">
                Authenticating with {bill.biller.shortName || bill.biller.name} via BBPS Gateway...
              </p>
            </div>
            <span className="text-[11px] font-mono text-outline">Reference: BBPS_TXN_{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
        )}

        {/* ===================== STAGE 4: SUCCESS ===================== */}
        {stage === 'success' && (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-3 my-auto animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
              <span className="material-symbols-outlined text-3xl font-bold">check</span>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-primary">
              Payment Successful!
            </h3>
            <p className="text-xs text-on-surface-variant max-w-xs">
              ₹{displayAmount} directly credited to <strong className="text-primary font-bold">{bill.biller.name}</strong>. Zero cash transfers.
            </p>
            <span className="text-[11px] font-mono text-surface-tint font-bold bg-primary-fixed/40 px-3 py-1 rounded-full">
              Disbursement Confirmed ✓
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
