import React, { createContext, useContext, useState, useMemo, useCallback, useRef } from 'react';
import { INITIAL_BILLS, INITIAL_REQUESTER_ITEMS, INITIAL_IMPACT_FEED } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Active primary role: 'benefactor' | 'requester'
  const [role, setRole] = useState('benefactor');

  // Active bottom navigation tab: 'discover' | 'requests' | 'impact' | 'profile'
  const [activeTab, setActiveTab] = useState('discover');

  // Sub-screen routing for the active flow
  // 'deck' | 'settlement' | 'celebration' | 'dashboard' | 'impact' | 'profile'
  const [activeScreen, setActiveScreen] = useState('deck');

  // Bills in the swipe deck
  const [bills, setBills] = useState(INITIAL_BILLS);
  const [currentBillIndex, setCurrentBillIndex] = useState(0);

  // Active bill being cleared / settled
  const [activeSettlementBill, setActiveSettlementBill] = useState(INITIAL_BILLS[0]);

  // Cleared bills history & lifetime impact
  const [totalClearedAmount, setTotalClearedAmount] = useState(4200);
  const [clearedTransactions, setClearedTransactions] = useState(INITIAL_IMPACT_FEED);
  const [lastReceipt, setLastReceipt] = useState({
    refNumber: "KND-2026-88412",
    amount: 4200,
    billerName: "Maharashtra State Electricity Distribution Co. (MSEDCL)",
    recipientName: "Priya S.",
    city: "Pune",
    billerCode: "#2940219",
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    note: "Wishing your mother speedy health and peaceful days ahead."
  });

  // Selected receipt being viewed in modal (falls back to lastReceipt)
  const [viewingReceipt, setViewingReceipt] = useState(null);

  // Requester dashboard items
  const [requesterItems, setRequesterItems] = useState(INITIAL_REQUESTER_ITEMS);

  // Modals & Drawers state
  const [inspectBill, setInspectedBill] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isUploadWizardOpen, setIsUploadWizardOpen] = useState(false);
  const [isGratitudeModalOpen, setIsGratitudeModalOpen] = useState(false);
  const [selectedGratitudeItem, setSelectedGratitudeItem] = useState(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Active Category Filter for deck
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Global Toast Notification with timeout ref
  const [toast, setToast] = useState({ visible: false, message: '', icon: 'check_circle' });
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message, icon = 'check_circle') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ visible: true, message, icon });
    toastTimerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2800);
  }, []);

  // Filtered bills based on activeCategoryFilter
  const filteredBills = useMemo(() => {
    if (activeCategoryFilter === 'all') return bills;
    if (activeCategoryFilter === 'utility' || activeCategoryFilter === 'electricity') {
      return bills.filter(b => b.category.toLowerCase().includes('electric'));
    }
    if (activeCategoryFilter === 'healthcare') {
      return bills.filter(b => b.category.toLowerCase().includes('health') || b.category.toLowerCase().includes('med') || b.category.toLowerCase().includes('prescriptions'));
    }
    if (activeCategoryFilter === 'education') {
      return bills.filter(b => b.category.toLowerCase().includes('education') || b.category.toLowerCase().includes('tuition'));
    }
    if (activeCategoryFilter === 'groceries') {
      return bills.filter(b => b.category.toLowerCase().includes('grocer') || b.category.toLowerCase().includes('provision'));
    }
    if (activeCategoryFilter === 'water') {
      return bills.filter(b => b.category.toLowerCase().includes('water') || b.category.toLowerCase().includes('municipal'));
    }
    return bills.filter(b => b.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()));
  }, [bills, activeCategoryFilter]);

  // Set category filter and safely reset index
  const handleSetCategoryFilter = useCallback((filter) => {
    setActiveCategoryFilter(filter);
    setCurrentBillIndex(0);
  }, []);

  // Handlers for Swipe Deck
  const handlePassBill = useCallback(() => {
    if (filteredBills.length === 0) return;
    showToast("Passed for now", "schedule");
    setCurrentBillIndex(prev => (prev + 1) % filteredBills.length);
  }, [filteredBills.length, showToast]);

  const handleSelectBillForSettlement = useCallback((bill) => {
    setActiveSettlementBill(bill);
    setActiveScreen('settlement');
  }, []);

  // Complete settlement flow
  const handleCompleteSettlement = useCallback((paymentMethod, note) => {
    if (!activeSettlementBill) return;

    // Calculate actual amount paid (accounting for solidarity pooling if partial)
    const payableAmount = (activeSettlementBill.amountFunded && activeSettlementBill.amountFunded > 0)
      ? (activeSettlementBill.amount - activeSettlementBill.amountFunded)
      : activeSettlementBill.amount;

    const newRef = `KND-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReceipt = {
      refNumber: newRef,
      amount: payableAmount,
      billerName: activeSettlementBill.biller.name,
      recipientName: activeSettlementBill.requester.name,
      city: activeSettlementBill.requester.city,
      billerCode: `#${activeSettlementBill.biller.billerCode}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      note: note || "May this kindness bring ease and light to your home."
    };

    setLastReceipt(newReceipt);
    setViewingReceipt(newReceipt);
    setTotalClearedAmount(prev => prev + payableAmount);

    // Add to cleared transactions
    setClearedTransactions(prev => [
      {
        id: `imp-${Date.now()}`,
        beneficiaryName: activeSettlementBill.requester.name,
        city: activeSettlementBill.requester.city,
        billerName: activeSettlementBill.biller.shortName,
        amount: payableAmount,
        date: "Just now",
        receiptId: newRef,
        blessing: note || "Direct settlement completed with solidarity."
      },
      ...prev
    ]);

    // Update requester items (update existing match or prepend funded item)
    setRequesterItems(prev => {
      const matchIndex = prev.findIndex(item =>
        item.title.toLowerCase().includes(activeSettlementBill.category.toLowerCase().split(' ')[0]) ||
        (item.id === 'req-tuition-6800' && activeSettlementBill.id === 'bill-tuition-6800')
      );

      if (matchIndex >= 0) {
        return prev.map((item, idx) =>
          idx === matchIndex
            ? {
                ...item,
                status: 'funded',
                statusLabel: 'Funded & Paid ✓',
                receiptNumber: `Payment Receipt #${newRef}`,
                note: `Cleared by an anonymous benefactor just now. Disbursed directly to ${activeSettlementBill.biller.name}.`,
                hasThankYouSent: false
              }
            : item
        );
      }

      return [
        {
          id: `req-${Date.now()}`,
          title: `${activeSettlementBill.category} Settlement`,
          category: "Direct Settlement",
          categoryIcon: activeSettlementBill.categoryIcon,
          amount: payableAmount,
          status: "funded",
          statusLabel: "Funded & Paid ✓",
          billerName: activeSettlementBill.biller.name,
          receiptNumber: `Payment Receipt #${newRef}`,
          note: `Cleared by an anonymous benefactor just now. Disbursed directly to ${activeSettlementBill.biller.name}.`,
          hasThankYouSent: false
        },
        ...prev
      ];
    });

    // Remove the cleared bill from the active deck
    setBills(prev => prev.filter(b => b.id !== activeSettlementBill.id));
    setCurrentBillIndex(0);
    setActiveScreen('celebration');
  }, [activeSettlementBill]);

  // Reset demo bills if deck is depleted
  const handleResetDemoBills = useCallback(() => {
    setBills(INITIAL_BILLS);
    setCurrentBillIndex(0);
    setActiveCategoryFilter('all');
    showToast("Deck restored with verified bills", "refresh");
  }, [showToast]);

  // Requester: Submit a new bill request
  const handleAddNewBill = useCallback((newBillData) => {
    const newItem = {
      id: `req-${Date.now()}`,
      title: newBillData.title || `${newBillData.category} Bill`,
      category: newBillData.category,
      categoryIcon: newBillData.categoryIcon || 'receipt_long',
      amount: Number(newBillData.amount) || 2500,
      status: "review",
      statusLabel: "Under AI & Human Review",
      submittedTime: "Submitted just now",
      note: `Document authenticating with ${newBillData.billerName || 'Verified Biller Registry'}.`,
      estimatedApproval: "Estimated approval: ~45 mins",
      hasThankYouSent: false
    };

    setRequesterItems(prev => [newItem, ...prev]);
    showToast("Bill uploaded! Under AI & Human verification", "verified");
  }, [showToast]);

  // Requester: Submit gratitude thank-you note
  const handleSubmitGratitudeNote = useCallback((noteText, itemId) => {
    setRequesterItems(prev =>
      prev.map(item => item.id === itemId ? { ...item, hasThankYouSent: true } : item)
    );

    // Also attach to latest cleared transaction in impact feed
    setClearedTransactions(prev =>
      prev.map((tx, idx) => {
        if (idx === 0 || !tx.thankYouNote) {
          return { ...tx, thankYouNote: noteText };
        }
        return tx;
      })
    );

    showToast("Your warm gratitude note was safely sent!", "mark_email_read");
    setIsGratitudeModalOpen(false);
  }, [showToast]);

  // Switch role helper
  const handleSwitchRole = useCallback((newRole) => {
    setRole(newRole);
    if (newRole === 'requester') {
      setActiveTab('requests');
      setActiveScreen('dashboard');
    } else {
      setActiveTab('discover');
      setActiveScreen('deck');
    }
    showToast(`Switched to ${newRole === 'requester' ? 'Requester' : 'Benefactor'} mode`, 'swap_horiz');
  }, [showToast]);

  const value = {
    role,
    setRole: handleSwitchRole,
    activeTab,
    setActiveTab,
    activeScreen,
    setActiveScreen,
    bills: filteredBills,
    allBills: bills,
    currentBillIndex,
    setCurrentBillIndex,
    activeSettlementBill,
    setActiveSettlementBill,
    totalClearedAmount,
    clearedTransactions,
    lastReceipt,
    viewingReceipt,
    setViewingReceipt,
    receiptToShow: viewingReceipt || lastReceipt,
    requesterItems,
    inspectBill,
    setInspectedBill,
    isFilterModalOpen,
    setIsFilterModalOpen,
    isUploadWizardOpen,
    setIsUploadWizardOpen,
    isGratitudeModalOpen,
    setIsGratitudeModalOpen,
    selectedGratitudeItem,
    setSelectedGratitudeItem,
    isSupportModalOpen,
    setIsSupportModalOpen,
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    activeCategoryFilter,
    setActiveCategoryFilter: handleSetCategoryFilter,
    toast,
    showToast,
    handlePassBill,
    handleSelectBillForSettlement,
    handleCompleteSettlement,
    handleResetDemoBills,
    handleAddNewBill,
    handleSubmitGratitudeNote
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
