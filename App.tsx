
import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import CallsView from './components/Services';
import ChatsView from './components/LiveFeedback';
import ProfileView from './components/About';
import BottomNavBar from './components/Footer';
import Wallet from './components/MyPlans';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import CancellationRefundPolicy from './components/CancellationRefundPolicy';
import CallUI from './components/CallUI';
import ChatUI from './components/ChatUI';
import ListenerSelection from './components/ListenerSelection';
import AICompanionButton from './components/AICompanionButton';
import AICompanion from './components/AICompanion';
import LoginScreen from './components/LoginScreen';
import SplashScreen from './components/SplashScreen';

import { auth, db, serverTimestamp } from './utils/firebase';
import firebase from 'firebase/compat/app';


import type { User, PurchasedPlan, Session, Listener } from './types';
import { LISTENERS_DATA } from './constants';

export type ActiveView = 'home' | 'calls' | 'chats' | 'profile';

// Lazy load main views
const PlansView = lazy(() => import('./components/Listeners'));
// const CallsView = lazy(() => import('./components/Services')); We need CallsView for the connect button, let's keep it eager
// const ChatsView = lazy(() => import('./components/LiveFeedback'));
// const ProfileView = lazy(() => import('./components/About'));


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

const ViewLoader: React.FC = () => (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
        <div className="text-cyan-600 dark:text-cyan-400">
             <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
        </div>
    </div>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [purchasedPlans, setPurchasedPlans] = useState<PurchasedPlan[]>([]);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);
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

  const handleInstallClick = useCallback(async () => {
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
  }, [deferredPrompt]);


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
    let unsubscribeUser: () => void = () => {};

    const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser: firebase.User | null) => {
        unsubscribePlans();
        unsubscribeUser();

        if (firebaseUser) {
            const userRef = db.collection('users').doc(firebaseUser.uid);
            
            unsubscribeUser = userRef.onSnapshot(async (userDoc) => {
                if (!userDoc.exists) {
                    const newUser: Omit<User, 'uid'> = { name: firebaseUser.displayName, email: firebaseUser.email, mobile: firebaseUser.phoneNumber || undefined, role: 'user', tokenBalance: 0 };
                    await userRef.set({ ...newUser, createdAt: serverTimestamp() });

                    const freeTrialPlan: Omit<PurchasedPlan, 'id'> = { type: 'chat', plan: { duration: '2 मिनट', price: 0 }, purchaseTimestamp: Date.now(), expiryTimestamp: Date.now() + (30 * 24 * 60 * 60 * 1000), remainingSeconds: 120, totalSeconds: 120, listenerId: null, isFreeTrial: true, };
                    await db.collection('users').doc(firebaseUser.uid).collection('purchasedPlans').add(freeTrialPlan);
                    
                    if (!localStorage.getItem('sakoon_has_visited')) {
                         setShowGuide(true);
                    }
                }
                 setCurrentUser({ uid: firebaseUser.uid, ...userDoc.data() } as User);
            });


            const plansQuery = db.collection('users').doc(firebaseUser.uid).collection('purchasedPlans').orderBy('purchaseTimestamp', 'desc');
            unsubscribePlans = plansQuery.onSnapshot((snapshot) => {
                const plans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PurchasedPlan));
                setPurchasedPlans(plans);
            });
            setAuthLoading(false);

        } else {
            setCurrentUser(null);
            setPurchasedPlans([]);
            setAuthLoading(false);
        }
    });
    return () => { unsubscribeAuth(); unsubscribePlans(); unsubscribeUser(); };
  }, []);

  const handleGuideClose = useCallback(() => { localStorage.setItem('sakoon_has_visited', 'true'); setShowGuide(false); }, []);
  const handleLogout = useCallback(async () => { try { await auth.signOut(); } catch (error) { console.error("Error signing out: ", error); } }, []);
  const handleNavigateToServices = useCallback(() => { setShowAICompanion(false); setActiveView('home'); }, []);
  const handleShowTerms = useCallback(() => setShowTerms(true), []);
  const handleShowPrivacyPolicy = useCallback(() => setShowPrivacyPolicy(true), []);
  const handleShowCancellationPolicy = useCallback(() => setShowCancellationPolicy(true), []);
  
  const handleStartSession = useCallback((plan: PurchasedPlan, listener: Listener) => {
    setActiveSession({ type: plan.type, listener, sessionDurationSeconds: plan.remainingSeconds, associatedPlanId: plan.id });
    setSelectingListenerForPlan(null);
  }, []);
  
  const handleInitiateListenerSelection = useCallback((plan: PurchasedPlan) => {
    setShowWallet(false);
    if (plan.listenerId) {
      const lockedListener = LISTENERS_DATA.find(l => l.id === plan.listenerId);
      if (lockedListener) {
        handleStartSession(plan, lockedListener);
        return;
      }
    }
    setSelectingListenerForPlan(plan);
  }, [handleStartSession]);
  
  const handleInitiateTokenSession = useCallback(async (type: 'call' | 'chat') => {
    if (!currentUser) return;
    const tokensNeeded = type === 'call' ? 2 : 1;
    if ((currentUser.tokenBalance || 0) < tokensNeeded) {
        alert('आपके पास पर्याप्त टोकन नहीं हैं। कृपया होम पेज से टोकन खरीदें।');
        setActiveView('home');
        return;
    }

    const remainingSeconds = ((currentUser.tokenBalance || 0) / tokensNeeded) * 60;
    const tempPlanDoc = db.collection('users').doc(currentUser.uid).collection('purchasedPlans').doc();
    const tempPlan: Omit<PurchasedPlan, 'id'> = {
        type: type,
        isTokenSession: true,
        plan: { duration: `${currentUser.tokenBalance} Tokens`, price: 0 },
        purchaseTimestamp: Date.now(),
        expiryTimestamp: Date.now() + (60 * 60 * 1000), // 1 hour validity for session
        remainingSeconds: remainingSeconds,
        totalSeconds: remainingSeconds,
        listenerId: null,
    };

    await tempPlanDoc.set(tempPlan);
    setSelectingListenerForPlan({ id: tempPlanDoc.id, ...tempPlan });
  }, [currentUser]);


  const handleCancelListenerSelection = useCallback(() => setSelectingListenerForPlan(null), []);

  const handleConnectFromCalls = useCallback(() => {
    handleInitiateTokenSession('call');
  }, [handleInitiateTokenSession]);

  const handleEndSession = useCallback(async (success: boolean, consumedSeconds: number) => {
    if (activeSession && currentUser) {
        const planToUpdate = purchasedPlans.find(p => p.id === activeSession.associatedPlanId);
        if (!planToUpdate) {
            setActiveSession(null);
            return;
        }

        const planRef = db.collection('users').doc(currentUser.uid).collection('purchasedPlans').doc(planToUpdate.id);
        
        if (planToUpdate.isTokenSession) {
            const tokensPerMinute = activeSession.type === 'call' ? 2 : 1;
            const consumedTokens = Math.ceil(consumedSeconds / 60) * tokensPerMinute;
            const userRef = db.collection('users').doc(currentUser.uid);
            await userRef.update({ tokenBalance: firebase.firestore.FieldValue.increment(-consumedTokens) });
            await planRef.delete();
        } else {
             if (success) {
                const newRemainingSeconds = planToUpdate.remainingSeconds - Math.round(consumedSeconds);
                await planRef.update({ remainingSeconds: Math.max(0, newRemainingSeconds), listenerId: newRemainingSeconds > 0 ? activeSession.listener.id : planToUpdate.listenerId });
            }
        }
    }
    setActiveSession(null);
  }, [activeSession, currentUser, purchasedPlans]);
  
  if (authLoading) {
      return <SplashScreen />;
  }
  if (!currentUser) { return <LoginScreen />; }

  const renderActiveView = () => {
    switch(activeView) {
        case 'home': return <PlansView currentUser={currentUser} />;
        case 'calls': return <CallsView onConnectListener={handleConnectFromCalls} />;
        case 'chats': return <ChatsView />;
        case 'profile': return <ProfileView 
                                onShowTerms={handleShowTerms}
                                onShowPrivacyPolicy={handleShowPrivacyPolicy}
                                onShowCancellationPolicy={handleShowCancellationPolicy}
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
        {showWallet && <Wallet user={currentUser} plans={purchasedPlans} onInitiateListenerSelection={handleInitiateListenerSelection} onClose={() => setShowWallet(false)} />}
        {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
        {showPrivacyPolicy && <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />}
        {showCancellationPolicy && <CancellationRefundPolicy onClose={() => setShowCancellationPolicy(false)} />}

        <Header 
            currentUser={currentUser} 
            onLogout={handleLogout} 
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(prev => !prev)}
            onWalletClick={() => setShowWallet(true)}
        />
        
        <main key={activeView} className="view-enter">
            <Suspense fallback={<ViewLoader />}>
                {renderActiveView()}
            </Suspense>
        </main>
        
        {!showAICompanion && <AICompanionButton onClick={() => setShowAICompanion(true)} />}
        
        <BottomNavBar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default App;
