import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function GratitudeDrawer() {
  const {
    isGratitudeModalOpen,
    setIsGratitudeModalOpen,
    selectedGratitudeItem,
    handleSubmitGratitudeNote
  } = useApp();

  const [noteText, setNoteText] = useState('');
  const [includeAffirmation, setIncludeAffirmation] = useState(true);

  if (!isGratitudeModalOpen) return null;

  const item = selectedGratitudeItem;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalNote = includeAffirmation
      ? `${noteText.trim()} ✨ [Warm family affirmation enclosed]`
      : noteText.trim();
    handleSubmitGratitudeNote(finalNote, item?.id);
    setNoteText('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200"
      onClick={() => setIsGratitudeModalOpen(false)}
    >
      <div
        className="w-full max-w-lg mx-auto bg-surface-container-lowest rounded-t-[28px] p-margin flex flex-col gap-space-md max-h-[85vh] overflow-y-auto shadow-2xl border-t border-outline-variant/40 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-outline-variant rounded-full mx-auto"></div>

        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-surface-tint uppercase font-bold tracking-wider">
              Solidarity Bridge
            </span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              A Note of Dignified Thanks
            </h3>
          </div>
          <button
            onClick={() => setIsGratitudeModalOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Your note will be delivered to the anonymous benefactor who cleared your{' '}
          <strong className="text-on-surface font-semibold">
            {item && item.amount ? `₹${item.amount.toLocaleString()} ${item.title || 'bill'}` : 'bill'}
          </strong>
          . Personal contact info is automatically protected.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-primary font-bold" htmlFor="gratitude-note-input">
              Your Message
            </label>
            <textarea
              id="gratitude-note-input"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              required
              rows={4}
              placeholder="e.g. Thank you for walking alongside our family this week. This support brought quiet peace to our dinner table..."
              className="w-full p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline resize-none"
            />
          </div>

          <label className="flex items-center gap-2 bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-surface-tint symbol-filled">
              sentiment_satisfied
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant flex-1">
              Include anonymous family affirmation stamp
            </span>
            <input
              type="checkbox"
              checked={includeAffirmation}
              onChange={(e) => setIncludeAffirmation(e.target.checked)}
              className="w-4 h-4 accent-primary rounded cursor-pointer"
            />
          </label>

          <button
            type="submit"
            className="w-full h-[52px] rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary-container transition-all flex items-center justify-center gap-2 cta-glow active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>Send Gratitude</span>
          </button>
        </form>
      </div>
    </div>
  );
}
