# Implementation Tasks & Roadmap

## Project: Kindly — Direct-to-Biller Micro-Philanthropy App
**Framework:** React 18 + Vite + Tailwind CSS  
**Tracking Status:** Completed & Verified  

---

### Phase 1: Environment & Foundation Setup
- [x] **1.1 Project Initialization:** Configured modern Vite + React project with zero-lag bundling.
- [x] **1.2 Tailwind Configuration:** Configured exact "Warm Dignity" tokens in `tailwind.config.js` (colors: Deep Forest `#16382c`, Rust/Coral `#a13e28`/`#e06d53`, Deep Plum `#381e2f`, Alabaster `#fbf9f6`, Inset well `#f4efeb`/`#efeeeb`, Verified Teal `#0f766e`, typography: Newsreader and Plus Jakarta Sans).
- [x] **1.3 Asset & Font Setup:** Imported Google Fonts (`Newsreader`, `Plus Jakarta Sans`) and `Material Symbols Outlined` in `index.html`.
- [x] **1.4 Base Styles & Viewport Setup:** Configured mobile-first shell styles, safe-area padding (`pb-safe`, `pt-safe`), scrollbar hiding, and gesture styles.

---

### Phase 2: Domain Models & Global App State
- [x] **2.1 Domain Data Model (`src/data/mockData.js`):**
  - Seeded 5 verified, diverse bill requests across electricity, higher education, healthcare/prescriptions, groceries, and municipal water.
  - Seeded biller entities with BBPS codes and institutional rails.
  - Seeded initial requester dashboard items (Funded & Paid, Live on Deck, Under AI Review).
  - Seeded receipts and impact statistics.
- [x] **2.2 Global App Context (`src/context/AppContext.jsx`):**
  - Active role management (`benefactor` vs `requester`).
  - Active screen router (`deck`, `settlement`, `celebration`, `dashboard`, `impact`, `profile`).
  - Active selected bill for settlement.
  - Cleared bills ledger and lifetime donation sum.
  - Global notification toast manager.
  - Dynamic bill submission and thank-you note dispatcher.

---

### Phase 3: Screen 1 — Discover Bills (Swipe Deck)
- [x] **3.1 Header Component:**
  - Kindly emblem logo, active screen title, dynamic cleared amount chip (`₹4,200 Cleared` standardizing currency to INR), and role toggle.
- [x] **3.2 Context Sub-header:**
  - Live pulse indicator (*"14 Direct Needs Today"*), interactive Filters trigger pill.
- [x] **3.3 Swipe Deck Engine (`src/components/deck/SwipeDeck.jsx`):**
  - Multi-layer paper stack silhouettes (scale 0.97 and 0.93) for tactile depth.
  - Touch and mouse drag physics with dynamic rotation angle.
  - Real-time visual feedback stamps:
    - Right drag: *"CLEAR BILL"* (Emerald container, heart icon).
    - Left drag: *"PASS FOR NOW"* (Sage container).
  - Drag threshold release commit (>100px) with spring-back animation if aborted.
- [x] **3.4 Dignity Card Anatomy (`src/components/deck/DignityCard.jsx`):**
  - Category pill + urgency indicator.
  - Direct Bill amount in bold serif figures.
  - Requester dignity profile (warm portrait, first name, age, city, ID & Utility Verified badge).
  - Redacted Official Utility row (`•••• 4921`) with "Inspect" button.
  - Editorial story prompts (Newsreader italic prompt 1, humanist sans prompt 2).
  - Direct disbursement assurance mint strip.
  - Tactile control buttons: "Next" (skip), "Inspect" (details), "Clear ₹X" (primary action).
- [x] **3.5 Redacted Document Inspect Modal (`src/components/deck/InspectBillModal.jsx`):**
  - Authenticated statement breakdown (bill period, masked consumer, CA number, tariff class, units, net payable).
  - Cryptographic BBPS masking notice.
  - Direct action button to clear bill from modal.
- [x] **3.6 Filters Modal (`src/components/deck/FilterModal.jsx`):**
  - Category filter pills (Utility, Medical, Tuition, Groceries, Water).
  - Reset and apply handlers.

---

### Phase 4: Screen 2 — Bill Settlement & Ledger
- [x] **4.1 Navigation & Meta Header:**
  - Back navigation, screen title, verified reference chip (`Ref #MSED-8821`).
- [x] **4.2 Beneficiary Context Summary:**
  - Avatar, verified name, city, and due urgency countdown.
- [x] **4.3 Institutional Assurance Banner:**
  - Formal callout naming verified utility provider with zero cash transfer confirmation.
- [x] **4.4 Transparent Micro-Ledger Breakdown:**
  - Bill Amount (tabular currency).
  - Platform Fee: ₹0.00 (*100% Donor Funded* tag).
  - Payment Gateway Fee: ₹0.00 (*Covered by Kindly* tag).
  - Total You Pay: Exact bill amount (*No hidden deductions*).
- [x] **4.5 Anonymous Blessing / Encouragement Note:**
  - 160-character limited textarea with privacy assurance footnote.
- [x] **4.6 Payment Method Selector:**
  - UPI Instant Transfer (GPay, PhonePe, Paytm, Any UPI ID) with primary radio indicator.
  - Net Banking (Major Indian banks).
  - RuPay, Debit & Credit Cards.
- [x] **4.7 Settlement Dispatch Animation & State Transition:**
  - Gradient coral button (*"Confirm & Clear Bill"*).
  - Spinner simulation (*"Securing Direct Settlement..."*).
  - Transition to Celebration screen with transaction reference.

---

### Phase 5: Screen 3 — Kindness Delivered (Celebration)
- [x] **5.1 Confetti & Celebration Stage:**
  - Floating confetti burst (via canvas-confetti & SVG elements) and badge pulse.
  - Micro-Philanthropy Matched pill + *"Kindness Delivered"* serif headline.
  - Personalized impact confirmation summary.
- [x] **5.2 Official Settlement Receipt Card:**
  - Generated reference ID (e.g. `KND-2026-88412`) with working clipboard copy button + toast notification.
  - Direct Disbursement Scheduled line with 15-minute sync SLA.
  - Verified recipient summary.
  - Zero Intermediary Leakage confirmation with utility billing code.
- [x] **5.3 Community Gratitude Panel:**
  - Editorial quote with lotus icon (*"You took a heavy weight off a family’s shoulders today."*).
- [x] **5.4 Interactive Actions:**
  - *"Keep Swiping & Helping"* -> returns to Discover Deck.
  - *"Download 80G Tax Receipt"* -> generates and displays an authentic, itemized 80G tax exemption certificate with download option.
  - *"Share the Kindly ripple"* -> Web Share API / clipboard link copy with custom toast.

---

### Phase 6: Screen 4 — Requester Activity Dashboard
- [x] **6.1 Greeting & Safe Space Banner:**
  - *"Hello, Rajesh"*, Verified Member tag, Safe Space Active pulse, Dignity First subtitle.
- [x] **6.2 Upload Primary CTA Banner:**
  - Dark forest card prompting new bill upload.
- [x] **6.3 Active Requests Stream:**
  - **Funded & Paid ✓ Card:** Groceries & Provisions (₹3,500), anonymous benefactor clearance, receipt link, and *"Send a thank-you note"* trigger.
  - **Live on Deck Card:** Tuition Fee Semester 2 (₹6,800), solidarity pooling progress bar (₹4,200 of ₹6,800 raised, 62% pledged, live view count).
  - **Under AI & Human Review Card:** Pharmacy Prescription (₹1,850), live registry verification indicator, ~45 mins SLA.
- [x] **6.4 Privacy Guard Guarantee Panel:**
  - Reassurance on zero personal contact data shared, *"Zero Data Sold"*, *"Zero Pity Dynamic"*.
- [x] **6.5 Quick Access Hub:**
  - *Thank-You Notes* tile (2 Delivered, view past notes).
  - *Need Help?* tile (Live community ally support).

---

### Phase 7: Interactive Requester Drawers & Modals
- [x] **7.1 New Bill Upload Wizard Drawer:**
  - Category selector (Electricity, Medical, Tuition, Food, Water).
  - Biller name and consumer account number.
  - Bill amount and due date.
  - Drag-and-drop / simulated file picker with OCR address scrubbing preview.
  - Dignity story prompts ("This bill is hard because...", "What this kindness would mean...").
  - Submission handler adding new bill to the active ledger with review status.
- [x] **7.2 Gratitude Note Composer Drawer:**
  - Interactive textarea for personal thank-you message.
  - Anonymous family affirmation stamp toggle.
  - Submit handler with instant animated toast feedback.
- [x] **7.3 Community Ally Support Modal:**
  - Live chat simulation with community care ally.

---

### Phase 8: Impact Feed & Seamless Role Switching
- [x] **8.1 Bottom Navigation Bar:**
  - 4 tabs: **Discover**, **Requests**, **Impact**, **Profile**.
  - Active tab styling with forest green tint and bold labels.
- [x] **8.2 Impact & Giving Feed:**
  - Total amount cleared, total bills cleared, community ripples created.
  - Feed of delivered blessings and received thank-you notes.
  - Tax receipts archive with one-click viewing.
- [x] **8.3 Role Switcher:**
  - Header and profile toggle allowing instant switching between **Benefactor View** and **Requester View** for testing both perspectives.

---

### Phase 9: Verification, Polish & Quality Review
- [x] **9.1 Responsiveness & Cross-Device Polish:** Verified on mobile, tablet, and desktop viewports.
- [x] **9.2 Interaction & Feedback:** Verified all buttons, gestures, and modals have tactile feedback and smooth animations.
- [x] **9.3 Production Build:** Ran `npm run build` with zero errors.
