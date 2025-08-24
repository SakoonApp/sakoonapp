import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import PlansView from './components/Listeners';
import CallsView from './components/Services';
import ChatsView from './components/LiveFeedback';
import ProfileView from './components/About';
import BottomNavBar from './components/Footer';
import Wallet from './components/MyPlans';
import TermsAndConditions from './components/TermsAndConditions';
import CallUI from './components/CallUI';
import ChatUI from './components/ChatUI';
import ListenerSelection from './components/ListenerSelection';
import AICompanionButton from './components/AICompanionButton';
import AICompanion from './components/AICompanion';
import LoginScreen from './components/LoginScreen';

import { auth, db, serverTimestamp } from './utils/firebase';
import type { User as FirebaseUser } from 'firebase/auth';


import type { User, PurchasedPlan, Session, Listener } from './types';
import { LISTENERS_DATA } from './constants';

export type ActiveView = 'home' | 'calls' | 'chats' | 'profile';

// --- Welcome Guide Component ---
const WelcomeGuide: React.FC<{onClose: () => void}> = ({onClose}) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 text-center" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-3">SakoonApp में आपका स्वागत है!</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">यह ऐप आपके अकेलेपन को दूर करने और मानसिक शांति पाने में मदद करने के लिए बनाया गया है।</p>
            <div className="space-y-4 text-left">
                <p>💡 <span className="font-semibold">Home:</span> अपने जरूरत के अनुसार कॉलिंग या चैटिंग प्लान खरीदें।</p>
                <p>💡 <span className="font-semibold">Calls:</span> उपलब्ध Listeners को देखें और उनसे जुड़ें।</p>
                <p>💡 <span className="font-semibold">Wallet:</span> खरीदे गए प्लान्स यहाँ दिखेंगे। यहीं से आप Listener से जुड़ सकते हैं।</p>
            </div>
            <button
                onClick={onClose}
                className="mt-8 w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-colors"
            >
                समझ गया, आगे बढ़ें
            </button>
        </div>
    </div>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [purchasedPlans, setPurchasedPlans] = useState<PurchasedPlan[]>([]);
  const [showTerms, setShowTerms] = useState(false);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [selectingListenerForPlan, setSelectingListenerForPlan] = useState<PurchasedPlan | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [showAICompanion, setShowAICompanion] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  // New state for tabbed navigation
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [showWallet, setShowWallet] = useState(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
      if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
          } else {
              console.log('User dismissed the A2HS prompt');
          }
          setDeferredPrompt(null);
      }
  };


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  // Event listener for opening wallet from other components
  useEffect(() => {
    const openWalletHandler = () => setShowWallet(true);
    window.addEventListener('open-wallet', openWalletHandler);
    return () => window.removeEventListener('open-wallet', openWalletHandler);
  }, []);

  // Auth state and Firestore listener
  useEffect(() => {
    let unsubscribePlans: () => void = () => {};
    const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser: FirebaseUser | null) => {
        unsubscribePlans();
        if (firebaseUser) {
            const processUser = async (user: FirebaseUser) => {
                const userRef = db.collection('users').doc(user.uid);
                const userDoc = await userRef.get();

                const userData: User = { uid: user.uid, name: user.displayName, email: user.email, mobile: user.phoneNumber || undefined, role: 'user' };

                if (!userDoc.exists) {
                    await userRef.set({ name: user.displayName, email: user.email, mobile: user.phoneNumber, createdAt: serverTimestamp() });
                    const freeTrialPlan: Omit<PurchasedPlan, 'id'> = { type: 'chat', plan: { duration: '2 मिनट', price: 0 }, purchaseTimestamp: Date.now(), expiryTimestamp: Date.now() + (30 * 24 * 60 * 60 * 1000), remainingSeconds: 120, totalSeconds: 120, listenerId: null, isFreeTrial: true, };
                    await db.collection('users').doc(user.uid).collection('purchasedPlans').add(freeTrialPlan);
                    if (!localStorage.getItem('sakoon_has_visited')) {
                         setShowGuide(true);
                    }
                }
                setCurrentUser(userData);

                const plansQuery = db.collection('users').doc(user.uid).collection('purchasedPlans').orderBy('purchaseTimestamp', 'desc');
                unsubscribePlans = plansQuery.onSnapshot((snapshot) => {
                    const plans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PurchasedPlan));
                    setPurchasedPlans(plans);
                });
                setAuthLoading(false);
            };
            processUser(firebaseUser).catch(console.error);
        } else {
            setCurrentUser(null);
            setPurchasedPlans([]);
            setAuthLoading(false);
        }
    });
    return () => { unsubscribeAuth(); unsubscribePlans(); };
  }, []);

  const handleGuideClose = () => { localStorage.setItem('sakoon_has_visited', 'true'); setShowGuide(false); };
  const handleLogout = async () => { try { await auth.signOut(); } catch (error) { console.error("Error signing out: ", error); } };
  const handleNavigateToServices = () => { setShowAICompanion(false); setActiveView('home'); };
  
  const handleInitiateListenerSelection = (plan: PurchasedPlan) => {
    setShowWallet(false);
    if (plan.listenerId) {
      const lockedListener = LISTENERS_DATA.find(l => l.id === plan.listenerId);
      if (lockedListener) {
        handleStartSession(plan, lockedListener);
        return;
      }
    }
    setSelectingListenerForPlan(plan);
  };

  const handleCancelListenerSelection = () => setSelectingListenerForPlan(null);

  const handleStartSession = (plan: PurchasedPlan, listener: Listener) => {
    setActiveSession({ type: plan.type, listener, sessionDurationSeconds: plan.remainingSeconds, associatedPlanId: plan.id });
    setSelectingListenerForPlan(null);
  };
  
  const handleConnectFromCalls = () => {
    setShowWallet(true);
  };

  const handleEndSession = async (success: boolean, consumedSeconds: number) => {
    if (activeSession && currentUser) {
      if (success) {
          const planToUpdate = purchasedPlans.find(p => p.id === activeSession.associatedPlanId);
          if (planToUpdate) {
              const newRemainingSeconds = planToUpdate.remainingSeconds - Math.round(consumedSeconds);
              const planRef = db.collection('users').doc(currentUser.uid).collection('purchasedPlans').doc(planToUpdate.id);
              await planRef.update({ remainingSeconds: Math.max(0, newRemainingSeconds), listenerId: newRemainingSeconds > 0 ? activeSession.listener.id : planToUpdate.listenerId });
          }
      }
    }
    setActiveSession(null);
  };
  
  if (authLoading) {
      return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white text-xl">लोड हो रहा है...</div></div>;
  }
  if (!currentUser) { return <LoginScreen />; }

  const renderActiveView = () => {
    switch(activeView) {
        case 'home': return <PlansView currentUser={currentUser} />;
        case 'calls': return <CallsView onConnectListener={handleConnectFromCalls} />;
        case 'chats': return <ChatsView />;
        case 'profile': return <ProfileView 
                                currentUser={currentUser} 
                                onLogout={handleLogout} 
                                onShowTerms={() => setShowTerms(true)}
                                deferredPrompt={deferredPrompt}
                                onInstallClick={handleInstallClick}
                              />;
        default: return <PlansView currentUser={currentUser} />;
    }
  };

  if (activeSession) {
    return activeSession.type === 'call' 
      ? <CallUI session={activeSession} user={currentUser} onLeave={handleEndSession} /> 
      : <ChatUI session={activeSession} user={currentUser} onLeave={handleEndSession} />;
  }

  if (selectingListenerForPlan) {
    return <ListenerSelection plan={selectingListenerForPlan} onSelectListener={(listener) => handleStartSession(selectingListenerForPlan, listener)} onBack={handleCancelListenerSelection} />;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20">
        {showGuide && <WelcomeGuide onClose={handleGuideClose} />}
        {showAICompanion && <AICompanion user={currentUser} onClose={() => setShowAICompanion(false)} onNavigateToServices={handleNavigateToServices} />}
        {showWallet && <Wallet plans={purchasedPlans} onInitiateListenerSelection={handleInitiateListenerSelection} onClose={() => setShowWallet(false)} />}
        {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}

        <Header 
            currentUser={currentUser} 
            onLogout={handleLogout} 
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(prev => !prev)}
            onWalletClick={() => setShowWallet(true)}
        />
        
        <main key={activeView} className="view-enter">
            {renderActiveView()}
        </main>
        
        {!showAICompanion && <AICompanionButton onClick={() => setShowAICompanion(true)} />}
        
        <BottomNavBar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default App;