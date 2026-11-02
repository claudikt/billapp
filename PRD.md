# Product Requirements Document (PRD)

## Project: Kindly — Direct-to-Biller Micro-Philanthropy App
**Version:** 1.0.0  
**Status:** In Development  
**Design System:** Warm Dignity (`Newsreader` + `Plus Jakarta Sans`)  
**Target Platform:** Mobile-First Web Application (React + Vite + Tailwind CSS)

---

## 1. Executive Summary & Vision

**Kindly** is a mobile-first mutual aid and micro-philanthropy platform designed to foster human solidarity without pity. Unlike traditional crowdfunding platforms where funds are disbursed directly to individuals—raising concerns regarding fraud, leakage, and recipient vulnerability—**Kindly enforces a strict Direct-to-Biller Settlement model**.

Benefactors swipe through verified, redacted utility, medical, grocery, and education bills, paying service providers (e.g., electricity boards, pharmacies, schools) directly via trusted rails (e.g., Bharat BillPay / BBPS, institutional portals). Money never touches the requester’s personal bank account, preserving recipient dignity, eliminating intermediary leakage, and ensuring 100% transparent impact.

---

## 2. Core Pillars & Principles

1. **Direct-to-Biller Payment Only ("Zero Cash Transfers"):**
   All contributions route directly to certified billers (e.g., MSEDCL, municipal boards, registered institutions). No personal wallet transfers.
2. **Privacy by Default:**
   Benefactors see only the requester's first name, age band, city, redacted account number (`•••• 4921`), and human story prompts. Surnames, phone numbers, exact addresses, and full account identifiers are strictly masked.
3. **Dignity over Charity:**
   No sensationalist or pity-inducing imagery. Narrative cards use an editorial, human-centered format (inspired by modern literary layouts and connection apps like Hinge) that honors resilience.
4. **Verified Before Visible:**
   Bills undergo automated OCR data extraction, merchant registry validation, privacy scrubbing, and human verification before reaching the live swipe deck.
5. **Solidarity Pooling & Micro-Gifts:**
   Supports both full bill clearances and partial community pledges (e.g., ₹4,200 of ₹6,800 raised, 62% pledged) so small gifts combine for giant relief.
6. **Auditable Transparent Ledger:**
   Every rupee is accounted for: ₹0 platform cut ("100% Donor Funded"), ₹0 gateway fee ("Covered by Kindly"), instant 80G tax receipt generation.

---

## 3. User Roles & Personas

### 3.1 The Benefactor ("Ally")
- **Profile:** Conscious citizen looking for transparent, immediate, leak-free charitable impact.
- **Goals:**
  - Browse verified direct community needs with fluid, tactile swipe gestures.
  - Inspect redacted bills and authentic personal stories.
  - Clear bills via instant UPI, Net Banking, or Cards with 0 hidden fees.
  - Leave an anonymous blessing/affirmation note.
  - Track lifetime impact and download 80G tax receipts.

### 3.2 The Requester ("Member")
- **Profile:** Hardworking individual or caregiver experiencing temporary hardship (e.g., medical emergency, seasonal delay in payments).
- **Goals:**
  - Upload an overdue bill with automated privacy scrubbing.
  - Share their authentic situation through dignified story prompts.
  - Track real-time verification and funding status in their ledger.
  - Send an anonymous thank-you note once a bill is cleared.

### 3.3 The Reviewer / Admin (Simulated System)
- **Goals:**
  - Verify bill authenticity against provider registries.
  - Ensure sensitive personal data is cryptographically redacted.
  - Manage live deck placement and SLA compliance (~45 mins review estimate).

---

## 4. Detailed Feature Specifications

### 4.1 Discover Bills (Tactile Swipe Deck)
- **Visual Deck Stack:**
  - Layered card silhouettes beneath the active card creating tactile paper depth (scales 0.97 and 0.93).
  - Smooth touch/mouse drag physics with real-time rotational tilt and stamp feedback:
    - **Right Drag:** Emerald "CLEAR BILL" stamp with heart icon.
    - **Left Drag:** Muted Sage "PASS FOR NOW" stamp.
  - Button alternatives for accessibility: "Next" (Skip), "Inspect Bill" (Tonal Icon), "Clear ₹X" (Primary Coral/Rust CTA).
- **Dignity Card Anatomy:**
  - Category tag (Electricity, Healthcare, Tuition, Groceries) + Urgency chip (e.g., "Due in 3 days").
  - Direct Bill Amount callout (Newsreader bold, tabular ₹ figures).
  - Requester Dignity Profile: Warm avatar, first name, age, city, and "ID & Utility Verified ✓" badge.
  - Redacted Official Utility Biller card with account mask (`•••• 4921`) and "Inspect" button.
  - Editorial Story Prompts:
    - *Prompt 1 (Italic Newsreader):* "This bill is hard because…"
    - *Prompt 2 (Humanist Sans):* "What this kindness would mean…"
  - Direct Disbursement Assurance Banner: "100% of ₹X pays [Biller] directly. No platform cut."
- **Interactive Redacted Bill Modal (Inspect Sheet):**
  - Displays bill period, masked consumer name, masked CA number, tariff class, units/items, and verified total.
  - Security footer explaining BBPS API cryptographic masking.
- **Filters Dialog:**
  - Filter by Category (Electricity, Medical, Education, Provisions), Urgency (Due soonest), and Amount range.

### 4.2 Bill Details & Settlement Ledger
- **Header:** Back navigation, "Bill Details & Settlement", Verified Reference ID (`#MSED-8821`).
- **Beneficiary Summary:** Compact avatar, verified check, category, location, and due timeline.
- **Institutional Direct Payment Assurance:** Deep forest callout naming the utility/provider and reaffirming zero cash transfers.
- **Transparent Micro-Ledger Breakdown:**
  - Bill Amount (₹4,200.00)
  - Platform Fee: ₹0.00 (*100% Donor Funded*)
  - Payment Gateway Fee: ₹0.00 (*Covered by Kindly*)
  - Total You Pay: ₹4,200.00 (*No hidden deductions*)
- **Warm Blessing / Affirmation Field:**
  - Optional anonymous message (max 160 characters) delivered to requester upon settlement.
- **Payment Method Selection:**
  - Interactive radio selection: UPI Instant Transfer (GPay, PhonePe, Paytm, Any UPI), Net Banking, RuPay/Debit/Credit Cards.
- **Settlement Execution:**
  - Gradient CTA button: *"Confirm & Clear Bill (₹4,200)"* with ambient coral glow.
  - Loading state with spinner (*"Securing Direct Settlement..."*), followed by seamless transition to Celebration.

### 4.3 Kindness Delivered (Celebration Screen)
- **Visual Celebration:**
  - Floating confetti elements (coral, mint, plum, amber) and radiating badge.
  - Micro-philanthropy matched badge + *"Kindness Delivered"* headline.
  - Summary sentence: *"You just cleared Priya’s electricity bill of ₹4,200."*
- **Official Settlement Receipt Card:**
  - Reference ID (`KND-2026-88412`) with one-click copy to clipboard + animated toast feedback.
  - Direct Disbursement Scheduled confirmation (queued to biller rail, ~15 mins sync).
  - Verified Recipient summary.
  - Zero Intermediary Leakage note with billing code.
- **Community Quote Panel:**
  - Inspiring community quote with lotus icon: *“You took a heavy weight off a daughter’s shoulders today.”*
- **Action CTAs:**
  - Primary: *"Keep Swiping & Helping"* (returns to Discover deck).
  - Secondary: *"Download 80G Tax Receipt"* (opens/downloads formal PDF receipt preview).
  - Tertiary: *"Share the Kindly ripple"* (Web Share API / copy clean link without personal details).

### 4.4 Requester Activity Dashboard
- **Header & Member Status:**
  - "Verified Member" + "Safe Space Active" status indicator.
  - Personalized greeting (*"Hello, Rajesh"*).
  - Dignity First subtitle.
- **Primary Action Banner:**
  - Large forest card: *"Upload a New Bill"* with prompt for medical, grocery, utility, or education support.
- **Active Requests Stream:**
  1. *Funded & Paid ✓ Card:* Groceries & Provisions (₹3,500), cleared by anonymous benefactor, verified receipt #KY-8821, and *"Send a thank-you note"* action.
  2. *Live on Deck Card:* Tuition Fee Semester 2 (₹6,800), solidarity pooling progress bar (₹4,200 raised of ₹6,800, 62% pledged, St. Xavier's Accounts Portal disbursement).
  3. *Under AI & Human Review Card:* Pharmacy Prescription (₹1,850), live verification badge, MedPlus Pharmacy Registry check, estimated ~45 mins approval.
- **Dignity & Privacy Guarantee Panel:**
  - Callout reinforcing zero personal contact data shared, "Zero Data Sold", and "Zero Pity Dynamic".
- **Quick Access Hub:**
  - *Thank-You Notes* tile (2 Delivered, view past notes).
  - *Need Help / Ally Support* tile (Live community helper chat/modal).

### 4.5 New Bill Upload Wizard (Requester Flow)
- Interactive multi-step modal:
  - Step 1: Select category (Electricity, Healthcare, Tuition, Groceries, Water) and biller name.
  - Step 2: Upload bill file/image with simulated OCR scanning & automatic address/phone redaction.
  - Step 3: Enter bill amount, due date, and consumer account number.
  - Step 4: Write dignified story prompts (*"This bill is hard because..."* and *"What this kindness would mean..."*).
  - Step 5: Review & submit to review queue.

### 4.6 Gratitude & Thank-You System
- Dedicated bottom drawer allowing requesters to write an authentic thank-you note.
- Checkbox for *"Include anonymous family affirmation stamp"*.
- Dispatches note to benefactor with instant toast notification.

### 4.7 Impact & Profile Tab
- **Lifetime Impact Stats:** Total direct relief given (in ₹), total bills cleared, families supported.
- **Receipts Vault:** Archive of downloadable 80G tax receipts.
- **Active Role Switcher:** Toggle easily between **Benefactor View** and **Requester View** for comprehensive pairing & presentation.

---

## 5. Design System Specifications ("Warm Dignity")

| Token | Value | Applied To |
|---|---|---|
| **Primary (Deep Forest)** | `#16382C` | Headers, brand anchors, secondary buttons, dark cards |
| **Secondary (Warm Coral / Rust)** | `#A13E28` / `#E06D53` | Primary action buttons, progress bars, warm accents |
| **Tertiary (Deep Plum)** | `#381E2F` | Narrative tags, quote accents |
| **Canvas Background** | `#FAF8F5` | Main application background |
| **Surface Lowest (Card)** | `#FFFFFF` | Elevated cards, modal sheets |
| **Surface Inset Well** | `#F4EFEB` / `#EFEEEB` | Recessed ledger breakdowns, progress tracks |
| **Verified Teal** | `#0F766E` | Trust badges, verification seals |
| **Border Sage** | `#D8E2DC` | Subtle dividers, card hairlines |
| **Headline Font** | `Newsreader` (Serif) | Headlines, story quotes, amounts |
| **Body/Label Font** | `Plus Jakarta Sans` | Body copy, forms, buttons, chips, metadata |

---

## 6. Resolved Inconsistencies from Stitch Designs

1. **Currency Standardization:** Replaced the out-of-place `$240 Cleared` header pill with `₹4,200 Cleared` across all screens to ensure total currency uniformity in Indian Rupees (₹).
2. **Requester Name Consistency:** Standardized display format to first name and last initial (e.g. `Priya S., 28 • Pune`).
3. **Dynamic Reference IDs:** Generated server-compliant IDs (e.g. `KND-2026-88412`) rather than hardcoded past dates.
4. **Role Navigation:** Implemented dual-role support with intuitive role-switching and tailored tab behavior.
5. **Legitimate 80G Tax Receipt Implementation:** Provided complete itemized receipts citing Section 80G compliance, trust registration number, and clear biller reconciliation.
