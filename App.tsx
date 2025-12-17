import React, { useState } from 'react';
import MainDownloaderPage from './components/MainDownloaderPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import ContactPage from './components/ContactPage';

type Page = 'HOME' | 'PRIVACY' | 'TERMS' | 'CONTACT';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'PRIVACY':
        return <PrivacyPolicyPage onNavigateHome={() => navigateTo('HOME')} />;
      case 'TERMS':
        return <TermsOfServicePage onNavigateHome={() => navigateTo('HOME')} />;
      case 'CONTACT':
        return <ContactPage onNavigateHome={() => navigateTo('HOME')} />;
      case 'HOME':
      default:
        return <MainDownloaderPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Shared Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <button onClick={() => navigateTo('HOME')} className="text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-400 rounded-md">
                        S★A ° VIDEO DOWNLOAD
                    </button>
                    <p className="text-sm mt-2">© 2024 All rights reserved.</p>
                </div>
                <div className="flex gap-6 text-sm">
                    <button onClick={() => navigateTo('PRIVACY')} className="hover:text-white transition-colors">Privacy Policy</button>
                    <button onClick={() => navigateTo('TERMS')} className="hover:text-white transition-colors">Terms of Service</button>
                    <button onClick={() => navigateTo('CONTACT')} className="hover:text-white transition-colors">Contact</button>
                </div>
            </div>
            <div className="mt-8 text-xs text-slate-600 text-center max-w-2xl mx-auto">
                Disclaimer: This tool is intended for personal use only. Users are responsible for complying with YouTube's Terms of Service and copyright laws in their jurisdiction.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;