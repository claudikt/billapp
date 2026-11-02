import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function FilterModal() {
  const {
    isFilterModalOpen,
    setIsFilterModalOpen,
    activeCategoryFilter,
    setActiveCategoryFilter,
    showToast
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState(activeCategoryFilter);

  useEffect(() => {
    if (isFilterModalOpen) {
      setSelectedFilter(activeCategoryFilter);
    }
  }, [activeCategoryFilter, isFilterModalOpen]);

  if (!isFilterModalOpen) return null;

  const categories = [
    { id: 'all', label: 'All Direct Needs', icon: 'all_inclusive' },
    { id: 'utility', label: 'Electricity & Utilities', icon: 'bolt' },
    { id: 'healthcare', label: 'Healthcare & Meds', icon: 'prescriptions' },
    { id: 'education', label: 'Higher Education Tuition', icon: 'school' },
    { id: 'groceries', label: 'Provisions & Groceries', icon: 'shopping_cart' },
    { id: 'water', label: 'Water & Municipal', icon: 'water_drop' }
  ];

  const handleApply = () => {
    setActiveCategoryFilter(selectedFilter);
    setIsFilterModalOpen(false);
    showToast(
      selectedFilter === 'all'
        ? 'Showing all direct needs'
        : `Filtered by ${categories.find(c => c.id === selectedFilter)?.label}`
    );
  };

  const handleReset = () => {
    setSelectedFilter('all');
    setActiveCategoryFilter('all');
    setIsFilterModalOpen(false);
    showToast('Filters reset to all');
  };

  return (
    <div
      className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setIsFilterModalOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-t-[28px] sm:rounded-2xl p-space-lg flex flex-col gap-space-md shadow-2xl border border-outline-variant/40 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-outline-variant rounded-full mx-auto sm:hidden"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Filter Direct Needs
            </h3>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Categories Pills List */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
            Select Category
          </span>
          <div className="grid grid-cols-1 gap-2">
            {categories.map((cat) => {
              const isSelected = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  type="button"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    isSelected
                      ? 'bg-primary-container text-on-primary-container border-primary shadow-sm font-bold'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isSelected ? 'text-primary-fixed' : 'text-primary'
                      }`}
                    >
                      {cat.icon}
                    </span>
                    <span className="font-body-md text-body-md">{cat.label}</span>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[20px] text-primary-fixed symbol-filled">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-space-sm pt-2">
          <button
            onClick={handleReset}
            className="flex-1 h-12 rounded-xl bg-surface-container text-on-surface-variant font-label-lg text-label-lg font-semibold hover:bg-surface-container-high transition-colors"
            type="button"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container transition-all"
            type="button"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
