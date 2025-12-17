import React, { useState, useEffect } from 'react';
import { AlertCircle } from './Icons';

export const MobileWarning: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the warning has been dismissed before
    const hasDismissed = localStorage.getItem('hasDismissedMobileWarning');
    
    // Check window size on mount
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !hasDismissed) {
        setIsVisible(true);
      }
    };

    checkScreenSize();
    
    // Optional: Listen for resize events if needed, though initial check is often enough
    // window.addEventListener('resize', checkScreenSize);
    
    // return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Remember the user's choice
    localStorage.setItem('hasDismissedMobileWarning', 'true');
  };

  if (!isVisible || !isMobile) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg shadow-md">
            <div className="flex">
                <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                <p className="text-sm text-amber-800">
                    <strong className="font-semibold">Mobile User Tip:</strong> For the best experience and direct file downloads, using a desktop browser is recommended. Mobile browsers may have limitations saving files.
                </p>
                <div className="mt-2 text-sm">
                    <button 
                        onClick={handleDismiss}
                        className="font-medium text-amber-700 hover:text-amber-600 underline"
                    >
                    Got it, thanks!
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};
