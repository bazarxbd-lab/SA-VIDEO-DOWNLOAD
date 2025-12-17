import React from 'react';
import { VideoProcessor } from './components/VideoProcessor';
import { InfoSection } from './components/InfoSection';
import { FAQSection } from './components/FAQSection';
import { MobileWarning } from './components/MobileWarning';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-slate-900 pt-20 pb-24 px-4 relative overflow-hidden">
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-slate-800 text-blue-400 rounded-full text-sm font-medium mb-6 border border-slate-700">
            v2.0 Now Available with AI Insights
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            The Fastest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">YouTube Downloader</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Convert and download YouTube videos in MP4, MP3, and more. High quality, unlimited, and free forever.
          </p>
        </div>
      </div>

      {/* Main Interactive Card */}
      <VideoProcessor />

      {/* Mobile-specific Warning */}
      <MobileWarning />

      {/* Content Sections */}
      <InfoSection />
      
      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <span className="text-xl font-bold text-white">TubeSaver Pro</span>
                    <p className="text-sm mt-2">© 2024 All rights reserved.</p>
                </div>
                <div className="flex gap-6 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
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
