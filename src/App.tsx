import React from 'react';
import { AppProvider, useApp } from './context/AppContext.js';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { ToastContainer } from './components/ui/ToastContainer.js';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer.js';
import { ReceiptUploadModal } from './components/payment/ReceiptUploadModal.js';

// Pages
import { HomePage } from './pages/HomePage.js';
import { ExploreCoursesPage } from './pages/ExploreCoursesPage.js';
import { CourseDetailPage } from './pages/CourseDetailPage.js';
import { CoursePlayerPage } from './pages/CoursePlayerPage.js';
import { CategoryLandingPage } from './pages/CategoryLandingPage.js';
import { PromptLibraryPage } from './pages/PromptLibraryPage.js';
import { AIToolsDirectoryPage } from './pages/AIToolsDirectoryPage.js';
import { StudentDashboardPage } from './pages/StudentDashboardPage.js';
import { AdminDashboardPage } from './pages/AdminDashboardPage.js';
import { CommunityPage } from './pages/CommunityPage.js';
import { PricingPage } from './pages/PricingPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { AuthPage } from './pages/AuthPage.js';

const MainRouter: React.FC = () => {
  const { activePage } = useApp();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'courses':
        return <ExploreCoursesPage />;
      case 'course-detail':
        return <CourseDetailPage />;
      case 'course-player':
        return <CoursePlayerPage />;
      case 'category-app':
        return <CategoryLandingPage categoryKey="app" />;
      case 'category-game':
        return <CategoryLandingPage categoryKey="game" />;
      case 'category-web':
        return <CategoryLandingPage categoryKey="web" />;
      case 'category-prompt':
        return <CategoryLandingPage categoryKey="prompt" />;
      case 'prompt-library':
        return <PromptLibraryPage />;
      case 'tools-directory':
        return <AIToolsDirectoryPage />;
      case 'dashboard':
        return <StudentDashboardPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'community':
        return <CommunityPage />;
      case 'pricing':
        return <PricingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05050a] text-slate-100 bg-grid-pattern selection:bg-purple-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <ToastContainer />
      <AIAssistantDrawer />
      <ReceiptUploadModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
