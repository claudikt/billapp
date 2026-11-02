import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function AllySupportModal() {
  const { isSupportModalOpen, setIsSupportModalOpen } = useApp();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ally',
      text: "Namaste! I'm Priya, a Kindly Community Ally. How can we support your household today with total privacy and dignity?",
      time: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    "How is my private data masked?",
    "When will my bill appear on deck?",
    "How does direct-to-biller work?"
  ];

  useEffect(() => {
    if (isSupportModalOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSupportModalOpen]);

  if (!isSupportModalOpen) return null;

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let reply = "We hear you with warmth. Your bill is under review with the utility registry and your story will appear on the deck with full dignity.";
      const lower = text.toLowerCase();
      if (lower.includes('privacy') || lower.includes('mask')) {
        reply = "Kindly uses 256-bit cryptographic scrubbing. Your surname, phone number, and street address are never visible to benefactors—only your first name, city, and redacted consumer ID (•••• 4921).";
      } else if (lower.includes('direct') || lower.includes('biller')) {
        reply = "When an ally clears your bill, funds route directly through the Bharat BillPay (BBPS) or institutional merchant API. No money enters personal accounts, ensuring 100% verified relief.";
      } else if (lower.includes('when') || lower.includes('appear') || lower.includes('review')) {
        reply = "Our automated OCR and community reviewers typically verify bills in ~45 minutes. You'll receive a live indicator right in your Requests tab.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ally',
          text: reply,
          time: "Just now"
        }
      ]);
    }, 800);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setIsSupportModalOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-t-[28px] sm:rounded-2xl p-space-md sm:p-space-lg flex flex-col gap-space-sm shadow-2xl border border-outline-variant/40 max-h-[85vh] sm:max-h-[600px] h-[550px] animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-outline-variant/30">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-surface-tint border-2 border-surface"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Community Ally Support
                </h3>
                <span className="px-1.5 py-[1px] rounded-full bg-surface-tint/15 text-surface-tint font-label-sm text-[10px] font-bold">
                  Online
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Confidential • Dignified • Direct Guidance
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
            >
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                  ? 'bg-primary text-on-primary rounded-br-none shadow-sm'
                  : 'bg-surface-container-low text-on-surface rounded-bl-none border border-outline-variant/40'
                  }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-on-surface-variant mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors text-[11px] font-semibold whitespace-nowrap shrink-0 border border-outline-variant/30"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-outline-variant/30">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your question or thought..."
            className="flex-1 p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            type="submit"
            className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
