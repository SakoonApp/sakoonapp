import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onWalletClick: () => void;
}

// --- Icons ---
const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const WalletIconWithRupee: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <defs>
            <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
        </defs>
        <path fill="url(#walletGradient)" d="M21,18V6A3,3 0 0,0 18,3H6A3,3 0 0,0 3,6V18A3,3 0 0,0 6,21H18A3,3 0 0,0 21,18M12,10H20V14H12V10Z" />
        <text x="16" y="12.5" fontFamily="Arial, sans-serif" fontSize="5" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">₹</text>
    </svg>
);
// --- End Icons ---


const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, isDarkMode, toggleDarkMode, onWalletClick }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 grid grid-cols-3 items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-1 md:space-x-2 justify-start">
            {currentUser && (
                <>
                    <button
                        onClick={onLogout}
                        className="text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-2 transition-colors"
                        aria-label="लॉगआउट"
                    >
                        <LogoutIcon className="w-6 h-6"/>
                    </button>
                    <button
                        onClick={toggleDarkMode}
                        className="text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-2 transition-colors"
                        aria-label={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
                    >
                        {isDarkMode ? <SunIcon className="w-6 h-6"/> : <MoonIcon className="w-6 h-6"/>}
                    </button>
                </>
            )}
        </div>

        {/* Center Section */}
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-700 dark:text-cyan-400 text-center whitespace-nowrap">
          SakoonApp
        </h1>
        
        {/* Right Section */}
        <div className="flex justify-end">
            {currentUser && (
              <button
                  onClick={onWalletClick}
                  className="p-1 transition-transform transform hover:scale-110"
                  aria-label="वॉलेट देखें"
              >
                  <WalletIconWithRupee className="w-8 h-8"/>
              </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);