
<<<<<<< HEAD
import React from 'react';
import FAQ from './FAQ';
import Contact from './Contact';
import Testimonials from './Testimonials';

interface ProfileViewProps {
=======

import React from 'react';
import type { User } from '../types';
import FAQ from './FAQ';
import Contact from './Contact';
import Testimonials from './Testimonials';
import ApplyAsListener from './ApplyAsListener';

interface ProfileViewProps {
  currentUser: User;
>>>>>>> repo2/main
  onShowTerms: () => void;
  onShowPrivacyPolicy: () => void;
  onShowCancellationPolicy: () => void;
  deferredPrompt: any; // The event from beforeinstallprompt
  onInstallClick: () => void;
<<<<<<< HEAD
=======
  onLogout: () => void;
>>>>>>> repo2/main
}

// --- Icons ---
const InstallIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
<<<<<<< HEAD
        <path d="M12 1.5a.75.75 0 01.75.75V12h-1.5V2.25A.75.75 0 0112 1.5zM11.25 12v6.44l-2.22-2.22a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 10-1.06-1.06L12.75 18.44V12h-1.5z" />
        <path d="M3.75 15a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
    </svg>
);


const ProfileView: React.FC<ProfileViewProps> = ({ onShowTerms, onShowPrivacyPolicy, onShowCancellationPolicy, deferredPrompt, onInstallClick }) => {
  return (
    <div className="container mx-auto px-4 py-6">
        {/* PWA Install Button */}
        {deferredPrompt && (
            <div className="mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between text-white">
                <div className="flex items-center gap-4 mb-4 md:mb-0 text-center md:text-left">
                    <img src="https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=192&h=192&fit=crop" alt="SakoonApp Icon" className="w-16 h-16 rounded-xl border-2 border-white/50 flex-shrink-0" loading="lazy" decoding="async"/>
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
        
        {/* About Section */}
        <section id="about" className="pb-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">हमारे बारे में</h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
                    SakoonApp एक मानसिक शांति और भावनात्मक सपोर्ट ऐप है, जहाँ आप Listeners से बात कर सकते हैं, गुमनाम रूप से। हमारा लक्ष्य अकेलेपन को कम करना और लोगों को एक सुरक्षित स्थान प्रदान करना है जहाँ वे बिना किसी झिझक के अपनी भावनाओं को साझा कर सकें।
                </p>
            </div>
        </section>

        {/* Other Sections */}
        <div className="space-y-8">
            <Testimonials />
            <FAQ />
            <Contact />
        </div>

        {/* Footer Links */}
        <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-8 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-3 mb-6">
              <button onClick={onShowTerms} className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                  नियम व शर्तें
              </button>
               <button onClick={onShowPrivacyPolicy} className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                  गोपनीयता नीति
              </button>
               <button onClick={onShowCancellationPolicy} className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                  रद्दीकरण/धनवापसी नीति
              </button>
            </div>
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
=======
        <path d="M12 1.5a.75.75 0 01.75.75V12h-1.5V2.25A.75.75 0 0112 1.5z" />
        <path fillRule="evenodd" d="M3.75 13.5a.75.75 0 00-1.5 0v4.5a3 3 0 003 3h10.5a3 3 0 003-3v-4.5a.75.75 0 00-1.5 0v4.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-4.5zm5.03-3.03a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l2.25-2.25a.75.75 0 10-1.06-1.06L12 12.69 8.78 9.47z" clipRule="evenodd" />
    </svg>
);

const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);
// --- End Icons ---


const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  onShowTerms,
  onShowPrivacyPolicy,
  onShowCancellationPolicy,
  deferredPrompt,
  onInstallClick,
  onLogout
}) => {

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-6">

        {/* Highlighted Apply as Listener Section */}
        <section id="apply" className="mt-4 py-6 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950/50 dark:to-blue-950/50 rounded-xl shadow-lg border-2 border-cyan-200 dark:border-cyan-600">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
                Listener बनें – दूसरों की मदद करें और घर बैठे कमाएँ!
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-2">
                क्या आप दूसरों की सुनना पसंद करते हैं? हमारे समुदाय में शामिल हों और एक सकारात्मक बदलाव लाएँ।
              </p>
              <p className="mt-4 text-xl font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-500/10 inline-block px-4 py-2 rounded-full border border-green-200 dark:border-green-500/30">
                💰 10,000–15,000 रु. महीना घर बैठे कमाएँ।
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <ApplyAsListener />
            </div>
          </div>
        </section>

        {/* About Section with Logout button */}
        <section id="about" className="mt-8 py-6 bg-white dark:bg-slate-900 rounded-xl shadow-md">
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 text-center sm:text-left">
                हमारे बारे में
              </h2>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 font-bold py-2 px-4 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors"
              >
                <LogoutIcon className="w-5 h-5" />
                <span>लॉगआउट</span>
              </button>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-center leading-relaxed">
              SakoonApp एक सुरक्षित और गोपनीय स्थान है जहाँ आप अपनी भावनाओं को साझा कर सकते हैं। हमारा लक्ष्य मानसिक स्वास्थ्य और भावनात्मक समर्थन को सभी के लिए सुलभ बनाना है।
            </p>
          </div>
          <Testimonials />
        </section>

        {/* Install App Section */}
        {deferredPrompt && (
          <section id="install-app" className="mt-8 py-6 bg-white dark:bg-slate-900 rounded-xl shadow-md">
            <div className="container mx-auto px-6 text-center">
              <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-100 mb-4">एक क्लिक में इंस्टॉल करें</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                SakoonApp को अपनी होम स्क्रीन पर जोड़ें ताकि आप इसे आसानी से और तेज़ी से इस्तेमाल कर सकें।
              </p>
              <button 
                onClick={onInstallClick} 
                className="flex w-full max-w-xs mx-auto justify-center items-center gap-3 bg-cyan-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-cyan-700 transition-colors shadow-lg transform hover:scale-105"
              >
                <InstallIcon className="w-6 h-6"/>
                <span>ऐप इंस्टॉल करें</span>
              </button>
            </div>
          </section>
        )}
        
        <FAQ />
        
        <Contact />
        
        <div className="mt-6 text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-100 mb-4">App & Policies</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-4">
            <button onClick={onShowTerms} className="text-cyan-600 dark:text-cyan-300 font-semibold hover:underline">Terms & Conditions</button>
            <button onClick={onShowPrivacyPolicy} className="text-cyan-600 dark:text-cyan-300 font-semibold hover:underline">Privacy Policy</button>
            <button onClick={onShowCancellationPolicy} className="text-cyan-600 dark:text-cyan-300 font-semibold hover:underline">Cancellation/Refund Policy</button>
          </div>
           <footer className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                © 2025 SakoonApp. All Rights Reserved.
              </p>
            </footer>
        </div>

      </div>
>>>>>>> repo2/main
    </div>
  );
};

export default React.memo(ProfileView);