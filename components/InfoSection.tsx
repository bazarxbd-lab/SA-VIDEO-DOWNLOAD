import React from 'react';
import { WifiOffIcon, DownloadIcon, ShareIcon, CheckIcon } from './Icons';

export const InfoSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Main Introduction */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Downloading YouTube Videos in MP4 Format</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Downloading YouTube videos in MP4 format offers multiple advantages, enhancing your viewing experience. Enjoy your favorite YouTube content offline at your convenience, accessible without an internet connection, perfect for on-the-go entertainment.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Feature 1 */}
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <WifiOffIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Offline Access</h3>
            <p className="text-slate-600">
               Enjoy content without an internet connection. Perfect for flights, commutes, or areas with poor reception.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <DownloadIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Cost-Effective Data</h3>
            <p className="text-slate-600">
                MP4 downloads are cost-effective. Regular streaming consumes significant data. Save on mobile data costs by downloading on WiFi and watching offline.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <ShareIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Easy Sharing</h3>
            <p className="text-slate-600">
                The MP4 format simplifies sharing. Easily transfer downloads to friends and family, allowing them to enjoy videos without internet access.
            </p>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Benefits of MP4 Downloads for YouTube Videos</h3>
                    <p className="opacity-90 leading-relaxed mb-6">
                        Beyond just data saving, MP4 is a universal standard. It works on virtually every device—from iPhones and Androids to smart TVs and gaming consoles—without needing extra plugins.
                    </p>
                    <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                        Try It Now
                    </button>
                </div>
                <div className="hidden md:block w-px h-32 bg-white/20"></div>
                <div className="flex-1">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0"><CheckIcon className="w-4 h-4 text-blue-900" /></div>
                            <span>Compatible with all media players</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0"><CheckIcon className="w-4 h-4 text-blue-900" /></div>
                            <span>High compression with high quality</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0"><CheckIcon className="w-4 h-4 text-blue-900" /></div>
                            <span>Supports metadata and subtitles</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};