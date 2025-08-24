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
const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v-3.375c0-.621-.504-1.125-1.125-1.125H4.125C3.504 7.5 3 8.004 3 8.625V12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v.01" />
    </svg>
);
// --- End Icons ---


const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, isDarkMode, toggleDarkMode, onWalletClick }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Section */}
        <h1 className="text-3xl font-bold text-cyan-700 dark:text-cyan-400">SakoonApp</h1>

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {currentUser && (
            <>
              <button
                  onClick={toggleDarkMode}
                  className="text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-2 transition-colors"
                  aria-label={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
              >
                  {isDarkMode ? <SunIcon className="w-6 h-6"/> : <MoonIcon className="w-6 h-6"/>}
              </button>
              <button
                  onClick={onWalletClick}
                  className="text-slate-600 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-2 transition-colors"
                  aria-label="वॉलेट देखें"
              >
                  <WalletIcon className="w-6 h-6"/>
              </button>
              <button
                onClick={onLogout}
                className="bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center w-10 h-10"
                aria-label="लॉगआउट"
              >
                <LogoutIcon className="w-5 h-5"/>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);