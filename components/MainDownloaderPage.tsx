import React from 'react';
import { VideoProcessor } from './VideoProcessor';
import { InfoSection } from './InfoSection';
import { FAQSection } from './FAQSection';
import { MobileWarning } from './MobileWarning';

const MainDownloaderPage: React.FC = () => {
  return (
    <>
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
            S★A ° <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">VIDEO DOWNLOAD</span>
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
    </>
  );
};

export default MainDownloaderPage;