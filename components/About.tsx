import React from 'react';
import type { User } from '../types';
import FAQ from './FAQ';
import Contact from './Contact';
import Testimonials from './Testimonials';

interface ProfileViewProps {
  currentUser: User;
  onLogout: () => void;
  onShowTerms: () => void;
  deferredPrompt: any; // The event from beforeinstallprompt
  onInstallClick: () => void;
}

// --- Icons ---
const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);
const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);
const InstallIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 1.5a.75.75 0 01.75.75V12h-1.5V2.25A.75.75 0 0112 1.5zM11.25 12v6.44l-2.22-2.22a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 10-1.06-1.06L12.75 18.44V12h-1.5z" />
        <path d="M3.75 15a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
    </svg>
);


const ProfileView: React.FC<ProfileViewProps> = ({ currentUser, onLogout, onShowTerms, deferredPrompt, onInstallClick }) => {
  return (
    <div className="container mx-auto px-4 py-6">
        {/* PWA Install Button */}
        {deferredPrompt && (
            <div className="mb-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between text-white">
                <div className="flex items-center gap-4 mb-4 md:mb-0 text-center md:text-left">
                    <img src="https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=192&h=192&fit=crop" alt="SakoonApp Icon" className="w-16 h-16 rounded-xl border-2 border-white/50 flex-shrink-0"/>
                    <div>
                        <h3 className="text-xl font-bold">SakoonApp इंस्टॉल करें</h3>
                        <p className="text-blue-100">बेहतर अनुभव के लिए ऐप इंस्टॉल करें।</p>
                    </div>
                </div>
                <button
                    onClick={onInstallClick}
                    className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition-transform transform hover:scale-105 shrink-0"
                >
                    <InstallIcon className="w-5 h-5"/>
                    <span>इंस्टॉल करें</span>
                </button>
            </div>
        )}

        {/* User Info Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8 flex items-center space-x-4">
            <UserCircleIcon className="w-16 h-16 text-cyan-500" />
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{currentUser.name || 'दोस्त'}</h2>
                <p className="text-slate-600 dark:text-slate-400">{currentUser.email || currentUser.mobile}</p>
            </div>
            <button
                onClick={onLogout}
                className="ml-auto bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center p-3"
                aria-label="लॉगआउट"
            >
                <LogoutIcon className="w-6 h-6"/>
            </button>
        </div>
        
        {/* About Section */}
        <section id="about" className="py-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">हमारे बारे में</h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
                    SakoonApp एक मानसिक शांति और भावनात्मक सपोर्ट ऐप है, जहाँ आप Listeners से बात कर सकते हैं, गुमनाम रूप से। हमारा लक्ष्य अकेलेपन को कम करना और लोगों को एक सुरक्षित स्थान प्रदान करना है जहाँ वे बिना किसी झिझक के अपनी भावनाओं को साझा कर सकें।
                </p>
            </div>
        </section>

        {/* Other Sections */}
        <div className="space-y-10">
            <Testimonials />
            <FAQ />
            <Contact />
        </div>

        {/* Footer Links */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8 text-center">
            <button onClick={onShowTerms} className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold mb-4">
                नियम व शर्तें देखें
            </button>
             <div className="flex justify-center md:justify-center space-x-6">
              <a href="https://www.instagram.com/sakoonapp?igsh=cGlyaWR6eHJxNjE2" target="_blank" rel="noopener noreferrer" aria-label="SakoonApp on Instagram" className="text-slate-500 hover:text-pink-500 transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.26 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1JgZyH34V7/" target="_blank" rel="noopener noreferrer" aria-label="SakoonApp on Facebook" className="text-slate-500 hover:text-blue-600 transition-colors">
                 <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z"/></svg>
              </a>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">&copy; {new Date().getFullYear()} SakoonApp. सर्वाधिकार सुरक्षित।</p>
        </div>
    </div>
  );
};

export default React.memo(ProfileView);