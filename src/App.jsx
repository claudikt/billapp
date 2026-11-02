import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';
import Toast from './components/common/Toast';
import SwipeDeck from './components/deck/SwipeDeck';
import SettlementView from './components/settlement/SettlementView';
import CelebrationView from './components/celebration/CelebrationView';
import RequesterDashboard from './components/dashboard/RequesterDashboard';
import ImpactView from './components/impact/ImpactView';
import ProfileView from './components/profile/ProfileView';

// Global Modals & Drawers
import InspectBillModal from './components/deck/InspectBillModal';
import FilterModal from './components/deck/FilterModal';
import TaxReceiptModal from './components/celebration/TaxReceiptModal';
import UploadBillWizard from './components/dashboard/UploadBillWizard';
import GratitudeDrawer from './components/dashboard/GratitudeDrawer';
import AllySupportModal from './components/dashboard/AllySupportModal';

export default function App() {
  const { activeTab, activeScreen } = useApp();

  const renderContent = () => {
    // If user is in discover tab, follow screen hierarchy
    if (activeTab === 'discover') {
      if (activeScreen === 'settlement') {
        return <SettlementView />;
      }
      if (activeScreen === 'celebration') {
        return <CelebrationView />;
      }
      return <SwipeDeck />;
    }

    if (activeTab === 'requests') {
      return <RequesterDashboard />;
    }

    if (activeTab === 'impact') {
      return <ImpactView />;
    }

    if (activeTab === 'profile') {
      return <ProfileView />;
    }

    return <SwipeDeck />;
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col antialiased selection:bg-primary-fixed-dim">
      <Header />

      {/* Main Corridor with Safe Top/Bottom paddings */}
      <main className="flex-1 flex flex-col relative w-full main-pt-safe main-pb-safe bg-surface">
        {renderContent()}
      </main>

      <BottomNav />
      <Toast />

      {/* Globally mounted interactive modals & drawers */}
      <InspectBillModal />
      <FilterModal />
      <TaxReceiptModal />
      <UploadBillWizard />
      <GratitudeDrawer />
      <AllySupportModal />
    </div>
  );
}
