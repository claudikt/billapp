# Engineering & Design System Rules

## Project: Kindly
**Author:** AI Development Agent  
**Context:** Mobile-First Micro-Philanthropy App  

---

## 1. Architectural & Engineering Rules

1. **Framework & Tooling:**
   - Use **React 18+** with **Vite** for fast, optimized, zero-lag builds.
   - Use **Tailwind CSS** strictly configured with the exact "Warm Dignity" tokens (`colors`, `fontFamily`, `spacing`, `borderRadius`, `boxShadow`).
   - Use modular functional components with React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`).

2. **Component Architecture:**
   - Keep components modular, clean, and single-purpose:
     - `src/components/common/`: Header, Navigation Bar, Badges, Modals, Toast notifications.
     - `src/components/deck/`: SwipeDeck, DignityCard, CardSilhouette, StampOverlay, InspectBillModal, FilterModal.
     - `src/components/settlement/`: SettlementLedger, PaymentMethodSelector, BlessingInput, GuaranteeBanner.
     - `src/components/celebration/`: CelebrationView, ConfettiCanvas, ReceiptModal, ShareRipple.
     - `src/components/dashboard/`: RequesterDashboard, RequestCard, SolidarityProgressBar, UploadBillWizard, ThankYouDrawer, AllySupportModal.
     - `src/data/`: Initial seed data for bills, requests, billers, and receipts.
     - `src/context/`: Global AppContext managing current role (`benefactor` vs `requester`), active screen, deck cards, cleared bills, user ledger, and toast notifications.

3. **Performance & Gesture Optimization:**
   - Touch and mouse swipe gestures must maintain 60 FPS fluidity.
   - Use CSS transform hardware acceleration (`will-change: transform`, `translate3d`).
   - Drag threshold must commit at ~30–35% of container width (~100px) with smooth spring-back physics if aborted.

4. **Zero External Breakages:**
   - Local fallback avatars and assets or reliable vector SVG icons so the app functions 100% offline without broken external image links.
   - Use Google Fonts (`Newsreader` and `Plus Jakarta Sans`) and standard Material Symbols Outlined icons.

---

## 2. Design System & Aesthetic Rules ("Warm Dignity")

1. **Color Token Fidelity:**
   - **Primary (`#16382C` Deep Forest):** Headers, brand marks, secondary buttons, dark accent cards.
   - **Secondary (`#A13E28` Rust / `#E06D53` Coral):** Primary action buttons (*"Clear Bill"*, *"Confirm Settlement"*), progress highlights, warm accents. Never use generic blue or purple.
   - **Tertiary (`#381E2F` Deep Plum):** Narrative tags, editorial quotes, urgent-need pill.
   - **Canvas (`#FAF8F5` Soft Warm Alabaster):** App background.
   - **Card Surface (`#FFFFFF` Pure White):** Elevated Dignity cards, modals, sheets.
   - **Inset Wells (`#F4EFEB` / `#EFEEEB`):** Recessed calculation wells, progress tracks, quote backings.
   - **Verified Teal (`#0F766E`):** Reserved *exclusively* for trust badges, verification checks, and security indicators.
   - **Text (`#1A201C` Deep Forest Charcoal):** AAA contrast body copy.
   - **Helper (`#5A6860`):** Subtext, hints, secondary labels.

2. **Typography Hierarchy:**
   - **Newsreader (Serif):** Always used for headlines, emotional story quotes, and prominent currency figures.
     - `headline-xl`: 40px/48px (mobile 32px/38px), 500 weight, -0.02em tracking.
     - `headline-lg`: 30px/36px (mobile 24px/30px), 500 weight.
     - `headline-md`: 22px/28px, 600 weight.
     - `headline-sm`: 18px/24px, 600 weight.
     - Quotes *must* be styled in italic Newsreader.
   - **Plus Jakarta Sans (Humanist Sans):** Used for all functional UI, button labels, form fields, and body text.
     - `body-lg`: 17px/26px, 400 weight.
     - `body-md`: 15px/22px, 400 weight.
     - `body-sm`: 13px/18px, 400 weight.
     - `label-lg`: 14px/20px, 600 weight.
     - `label-md`: 12px/16px, 600 weight.
     - `label-sm`: 11px/14px, 700 weight, uppercase, +0.04em tracking.

3. **Elevation & Radii:**
   - Cards and Sheets: `rounded-[24px]` (or `rounded-xl`).
   - Buttons, Inputs, Wells: `rounded-[16px]`.
   - Pills, Badges, Avatars: `rounded-full` (`9999px`).
   - Card Resting Shadow: `0 2px 8px -2px rgba(22,56,44,.04), 0 8px 24px -4px rgba(56,30,47,.05)` + 1px `#D8E2DC` border.
   - Primary CTA Glow: `0 8px 20px -4px rgba(220,109,83,.35)` (or `rgba(161,62,40,.35)`).

---

## 3. Financial & Privacy Invariants

1. **Direct-to-Biller Only:**
   - Under no circumstances will money ever be transferred to a requester's personal bank account or digital wallet.
   - Always display the verified biller identity (e.g., *MSEDCL Pune*, *St. Xavier's Accounts Portal*, *FreshBasket Provisions Ltd.*) with clear institutional assurance.

2. **Zero Intermediary Leakage:**
   - Platform fee is strictly ₹0.00 (*"100% Donor Funded"*).
   - Gateway fee is strictly ₹0.00 (*"Covered by Kindly"*).
   - Total paid by benefactor equals the exact bill amount.

3. **Privacy by Default:**
   - Benefactors never see full surnames, phone numbers, email addresses, or physical home addresses.
   - Account numbers must be masked showing only the last 4 digits (e.g. `•••• 4921`).
   - Names formatted consistently as first name and last initial (e.g., `Priya S., 28 • Pune`).

4. **Tone & Microcopy Guardrails:**
   - NEVER use dehumanizing or sensationalist tropes like "Save her!", "Desperate beggar", or "Pity case".
   - Use dignified, respectful language: *"Direct Needs"*, *"Clear ₹4,200"*, *"Solidarity Pooling"*, *"Pass for now"*, *"Kindness Delivered"*, *"Your Dignity First"*.

---

## 4. Accessibility & Responsiveness

1. **Touch Targets:** Minimum 44×44px for all tappable controls.
2. **Accessible Alternatives:** Every gesture action (swipe right, swipe left) must have an explicit button alternative on the screen.
3. **Reduced Motion:** Gracefully degrade or simplify confetti animations and rotations when `prefers-reduced-motion` is active.
4. **Mobile First:** Designed to fit within standard mobile device viewports (390px–430px wide) while adapting gracefully to tablet and desktop container widths.
