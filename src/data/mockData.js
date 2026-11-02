// Kindly Mock Data & Initial Seed Datasets

export const INITIAL_BILLS = [
  {
    id: "bill-msedcl-4921",
    refNumber: "MSED-8821",
    requester: {
      name: "Priya S.",
      age: 28,
      city: "Pune",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
      fallbackInitials: "PS",
      isVerified: true,
      verificationLabel: "ID & Utility Verified ✓"
    },
    category: "Electricity Utility",
    categoryIcon: "bolt",
    urgencyText: "Due in 3 days",
    urgencyDays: 3,
    amount: 4200,
    amountFunded: 0,
    biller: {
      name: "Maharashtra State Electricity Distribution Co. (MSEDCL)",
      shortName: "MSEB Pune Distribution",
      isOfficial: true,
      accountMasked: "•••• 4921",
      fullMaskedAccount: "9801••••4921",
      billerCode: "2940219",
      railType: "BBPS (Bharat BillPay)",
      unitsConsumed: "312 kWh",
      tariffClass: "Residential LT-I",
      billPeriod: "Oct 01 - Oct 31, 2026"
    },
    story: {
      prompt1Title: "This bill is hard because…",
      prompt1Text: "“My mother was hospitalized last month with dengue, which consumed our emergency buffer. Keeping the power on means she can use her nebulizer safely.”",
      prompt2Title: "What this kindness would mean…",
      prompt2Text: "A breath of relief before my next freelance design paycheck clears on the 10th. It ensures no interruption to her ongoing recovery at home."
    },
    guaranteeText: "100% of ₹4,200 pays MSEB directly via verified utility gateway. No platform cut."
  },
  {
    id: "bill-tuition-6800",
    refNumber: "TX-6802",
    requester: {
      name: "Rajesh K.",
      age: 34,
      city: "Nagpur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
      fallbackInitials: "RK",
      isVerified: true,
      verificationLabel: "Institutional Enrollment Verified ✓"
    },
    category: "Higher Education",
    categoryIcon: "school",
    urgencyText: "Due in 5 days",
    urgencyDays: 5,
    amount: 6800,
    amountFunded: 4200,
    poolingPercentage: 62,
    biller: {
      name: "St. Xavier's Institute of Technology & Science",
      shortName: "St. Xavier's Accounts Portal",
      isOfficial: true,
      accountMasked: "•••• 6800",
      fullMaskedAccount: "TX2026••••6800",
      billerCode: "EDU-89102",
      railType: "University Merchant Direct API",
      unitsConsumed: "Semester 2 Tuition",
      tariffClass: "Undergraduate Degree",
      billPeriod: "Academic Term 2026-27"
    },
    story: {
      prompt1Title: "This bill is hard because…",
      prompt1Text: "“Our small tailoring workshop experienced flood damage after the monsoon rains. The semester deadline is approaching and Aarohi needs clearance to take her midterms.”",
      prompt2Title: "What this kindness would mean…",
      prompt2Text: "Keeps my daughter in class and protects her academic scholarship without our family turning to informal high-interest moneylenders."
    },
    guaranteeText: "100% of ₹6,800 is wired straight to St. Xavier's Accounts Portal. Zero intermediary leakage."
  },
  {
    id: "bill-medplus-1850",
    refNumber: "MED-1850",
    requester: {
      name: "Sunita D.",
      age: 42,
      city: "Thane",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
      fallbackInitials: "SD",
      isVerified: true,
      verificationLabel: "Pharmacy Prescription Verified ✓"
    },
    category: "Healthcare & Meds",
    categoryIcon: "prescriptions",
    urgencyText: "Due in 2 days",
    urgencyDays: 2,
    amount: 1850,
    amountFunded: 0,
    biller: {
      name: "MedPlus Healthcare & Pharmacy Network",
      shortName: "MedPlus Pharmacy Registry",
      isOfficial: true,
      accountMasked: "•••• 1850",
      fullMaskedAccount: "RX-THN••••1850",
      billerCode: "MED-77192",
      railType: "BBPS Healthcare Rail",
      unitsConsumed: "Monthly Insulin & BP Pack",
      tariffClass: "Essential Chronic Care",
      billPeriod: "Refill Cycle Nov 2026"
    },
    story: {
      prompt1Title: "This bill is hard because…",
      prompt1Text: "“My father requires daily insulin injections and blood pressure medication. Unexpected household repairs coincided with this refill date.”",
      prompt2Title: "What this kindness would mean…",
      prompt2Text: "Immediate peace of mind knowing my father will not have to skip or stretch his doses while waiting for next month's salary.”"
    },
    guaranteeText: "100% of ₹1,850 settles the pharmacy account directly. Zero cash transfers."
  },
  {
    id: "bill-freshbasket-3500",
    refNumber: "GROC-3500",
    requester: {
      name: "Amit V.",
      age: 31,
      city: "Pune",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
      fallbackInitials: "AV",
      isVerified: true,
      verificationLabel: "Merchant Invoice Verified ✓"
    },
    category: "Provisions & Groceries",
    categoryIcon: "shopping_cart",
    urgencyText: "Due in 4 days",
    urgencyDays: 4,
    amount: 3500,
    amountFunded: 0,
    biller: {
      name: "FreshBasket Essential Provisions Ltd.",
      shortName: "FreshBasket Merchant Direct",
      isOfficial: true,
      accountMasked: "•••• 3500",
      fullMaskedAccount: "FB-PN••••3500",
      billerCode: "RET-33101",
      railType: "Merchant Food Security Rail",
      unitsConsumed: "Monthly Family Staples & Pulses",
      tariffClass: "Essential Commodities",
      billPeriod: "Invoice #FB-88219"
    },
    story: {
      prompt1Title: "This bill is hard because…",
      prompt1Text: "“The logistics depot where I work as a delivery associate shut down for 10 days of warehouse maintenance, leaving two weeks unpaid.”",
      prompt2Title: "What this kindness would mean…",
      prompt2Text: "Our family table remains fully nourished with essential pulses and grains without touching high-interest short-term credit.”"
    },
    guaranteeText: "100% goes directly to FreshBasket Provisions. Direct commodity settlement."
  },
  {
    id: "bill-water-2100",
    refNumber: "WAT-2100",
    requester: {
      name: "Meera T.",
      age: 26,
      city: "Nashik",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
      fallbackInitials: "MT",
      isVerified: true,
      verificationLabel: "Municipal Board Verified ✓"
    },
    category: "Water Utility",
    categoryIcon: "water_drop",
    urgencyText: "Due in 6 days",
    urgencyDays: 6,
    amount: 2100,
    amountFunded: 0,
    biller: {
      name: "Nashik Municipal Corporation Water Supply",
      shortName: "NMC Water Board",
      isOfficial: true,
      accountMasked: "•••• 2100",
      fullMaskedAccount: "NMC-WT••••2100",
      billerCode: "MUN-55201",
      railType: "BBPS Municipal Board",
      unitsConsumed: "24 kL Quarterly",
      tariffClass: "Domestic Metered",
      billPeriod: "Q3 2026 Water Supply"
    },
    story: {
      prompt1Title: "This bill is hard because…",
      prompt1Text: "“An unexpected plumbing leak required emergency contractor repairs that drained our emergency fund just as the quarterly municipal water bill arrived.”",
      prompt2Title: "What this kindness would mean…",
      prompt2Text: "Restores clean running tap water for our joint family household without recurring penalty fees.”"
    },
    guaranteeText: "100% of ₹2,100 pays Nashik Municipal Corporation directly. No platform cut."
  }
];

export const INITIAL_REQUESTER_ITEMS = [
  {
    id: "req-groceries-3500",
    title: "Groceries & Provisions",
    category: "Direct Settlement",
    categoryIcon: "shopping_cart",
    amount: 3500,
    status: "funded",
    statusLabel: "Funded & Paid ✓",
    billerName: "FreshBasket Provisions Ltd.",
    receiptNumber: "Payment Receipt #KY-8821",
    note: "Cleared by an anonymous benefactor yesterday. Direct payment disbursed to FreshBasket Provisions Ltd.",
    hasThankYouSent: true
  },
  {
    id: "req-tuition-6800",
    title: "Tuition Fee (Semester 2)",
    category: "Higher Education",
    categoryIcon: "school",
    amount: 6800,
    status: "live",
    statusLabel: "Live on Deck (3 benefactors viewed)",
    urgencyText: "Due in 5 days",
    amountRaised: 4200,
    progressPercentage: 62,
    disbursementTarget: "St. Xavier's Accounts Portal",
    hasThankYouSent: false
  },
  {
    id: "req-pharmacy-1850",
    title: "Pharmacy Prescription",
    category: "Healthcare & Meds",
    categoryIcon: "prescriptions",
    amount: 1850,
    status: "review",
    statusLabel: "Under AI & Human Review",
    submittedTime: "Submitted 2 hours ago",
    note: "Document authenticating with MedPlus Pharmacy Registry.",
    estimatedApproval: "Estimated approval: ~45 mins",
    hasThankYouSent: false
  }
];

export const INITIAL_IMPACT_FEED = [
  {
    id: "imp-1",
    beneficiaryName: "Priya S.",
    city: "Pune",
    billerName: "MSEDCL Electricity",
    amount: 4200,
    date: "Today, 11:42 AM",
    receiptId: "KND-2026-88412",
    blessing: "Wishing your mother speedy health and peaceful days ahead.",
    thankYouNote: "Thank you from the bottom of our hearts. The electricity is safe and my mother can use her nebulizer peacefully."
  }
];
