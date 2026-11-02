import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import DignityCard from './DignityCard';

export default function SwipeDeck() {
  const {
    bills,
    currentBillIndex,
    handlePassBill,
    handleSelectBillForSettlement,
    setInspectedBill,
    setIsFilterModalOpen,
    activeCategoryFilter,
    setActiveCategoryFilter,
    handleResetDemoBills
  } = useApp();

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const activeBill = bills.length > 0 ? (bills[currentBillIndex] || bills[0]) : null;

  // Pointer event handlers (smooth across mouse, touch, and pen)
  const handlePointerDown = (e) => {
    // Only drag if not clicking buttons, links, or inputs
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = (e.clientY - startPos.current.y) * 0.35; // gentle vertical resistance
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const threshold = 95;
    if (dragOffset.x > threshold && activeBill) {
      // Swiped right -> Clear Bill
      setDragOffset({ x: 0, y: 0 });
      handleSelectBillForSettlement(activeBill);
    } else if (dragOffset.x < -threshold) {
      // Swiped left -> Pass for now
      setDragOffset({ x: 0, y: 0 });
      handlePassBill();
    } else {
      // Return to resting position
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col w-full px-margin pb-space-lg select-none max-w-lg mx-auto">
      {/* Top Context Header & Filter Trigger */}
      <div className="flex items-center justify-between py-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex w-2.5 h-2.5 rounded-full bg-surface-tint animate-pulse"></span>
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
            {bills.length} Direct {bills.length === 1 ? 'Need' : 'Needs'} Today
          </span>
        </div>

        {/* Filter Pill Trigger */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors shadow-sm active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
          <span className="font-label-md text-label-md text-primary font-bold">
            {activeCategoryFilter === 'all' ? 'All Filters' : `Filter: ${activeCategoryFilter}`}
          </span>
        </button>
      </div>

      {/* Swipe Deck Stack Canvas */}
      <div
        className="relative w-full min-h-[640px] mt-space-xs flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Under-card Stack Layer 2 (Bottom silhouette) - Only when 3+ cards */}
        {bills.length > 2 && (
          <div className="absolute inset-x-4 top-5 bottom-0 rounded-[24px] bg-surface-container-highest shadow-sm pointer-events-none transform scale-[0.93] translate-y-3 opacity-60 transition-transform duration-300 border border-outline-variant/30" />
        )}

        {/* Under-card Stack Layer 1 (Mid silhouette) - Only when 2+ cards */}
        {bills.length > 1 && (
          <div className="absolute inset-x-2 top-2.5 bottom-0 rounded-[24px] bg-surface-container shadow-md pointer-events-none transform scale-[0.97] translate-y-1.5 opacity-90 transition-transform duration-300 border border-outline-variant/30" />
        )}

        {/* Active Dignity Card (Top of Deck) or Empty State */}
        {activeBill ? (
          <DignityCard
            bill={activeBill}
            dragOffset={dragOffset}
            isDragging={isDragging}
            onInspect={(b) => setInspectedBill(b)}
            onClear={(b) => handleSelectBillForSettlement(b)}
            onSkip={() => handlePassBill()}
          />
        ) : (
          <div className="w-full p-8 text-center bg-surface-container-lowest rounded-[24px] shadow-sm border border-outline-variant/30 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-surface-tint">
              <span className="material-symbols-outlined text-3xl symbol-filled">done_all</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              {activeCategoryFilter !== 'all' ? 'No Matching Bills Found' : 'All Direct Needs Reviewed'}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs leading-relaxed">
              {activeCategoryFilter !== 'all'
                ? `There are currently no verified bills under "${activeCategoryFilter}". Try clearing your filter.`
                : 'You have reviewed or cleared all verified community requests. Check back shortly as new bills are verified.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full max-w-xs">
              {activeCategoryFilter !== 'all' && (
                <button
                  onClick={() => setActiveCategoryFilter('all')}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-primary font-label-md text-label-md font-bold hover:bg-surface-container-high transition-colors"
                  type="button"
                >
                  Clear Category Filter
                </button>
              )}
              <button
                onClick={handleResetDemoBills}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>Reset Demo Deck</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Micro Narrative Context Footer */}
      <div className="flex items-center justify-center gap-2 mt-space-md text-on-surface-variant">
        <span className="material-symbols-outlined text-[16px]">touch_app</span>
        <span className="font-body-sm text-body-sm">
          Swipe right to clear direct bill • Swipe left to pass
        </span>
      </div>
    </div>
  );
}
