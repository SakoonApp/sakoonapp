
import React, { useState } from 'react';
import PlanCard from './PlanCard';
import { CALL_PLANS, CHAT_PLANS } from '../constants';
import type { User } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PlansViewProps {
  currentUser: User;
}

// --- Icons ---
const WalletIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 9a3 3 0 013-3h15a3 3 0 013 3v.75a.75.75 0 01-1.5 0V9a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 003 9v.75a.75.75 0 01-1.5 0V9z" /><path d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z" /></svg>);
const TokenIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" /></svg>);

// --- Helper Components ---
const PlanCategory: React.FC<{ title: string; children: React.ReactNode; gridClass?: string; containerClass?: string }> = ({ title, children, gridClass = 'md:grid-cols-2 lg:grid-cols-3', containerClass = '' }) => (
    <div className={`mb-8 ${containerClass}`}>
        <h3 className="text-3xl font-bold text-center text-slate-700 dark:text-slate-300 mb-6 border-b-2 border-cyan-200 dark:border-cyan-800 pb-3 max-w-md mx-auto">{title}</h3>
        <div className={`grid grid-cols-1 ${gridClass} gap-6 max-w-6xl mx-auto items-center justify-center`}>
            {children}
        </div>
    </div>
);

const PlansView: React.FC<PlansViewProps> = ({ currentUser }) => {
  const [loadingTokens, setLoadingTokens] = useState<number | null>(null);

  const allPlans = {
    p5: { duration: '5 मिनट', call: CALL_PLANS[0], chat: CHAT_PLANS[0] },
    p10: { duration: '10 मिनट', call: CALL_PLANS[1], chat: CHAT_PLANS[1] },
    p15: { duration: '15 मिनट', call: CALL_PLANS[2], chat: CHAT_PLANS[2] },
    p30: { duration: '30 मिनट', call: CALL_PLANS[3], chat: CHAT_PLANS[3] },
    p60: { duration: '1 घंटा', call: CALL_PLANS[4], chat: CHAT_PLANS[4] },
  };

  const tokenPacks = [
    { tokens: 10, price: 50 },
    { tokens: 20, price: 100 },
    { tokens: 50, price: 240 },
    { tokens: 100, price: 470 },
    { tokens: 250, price: 1150 },
    { tokens: 500, price: 2200 },
  ];

  const handleTokenPurchase = (tokens: number, price: number) => {
    setLoadingTokens(tokens);
    const RAZORPAY_KEY_ID = 'rzp_test_R98ELJdTbUKDPz';
    const options = {
        key: RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: "INR",
        name: "SakoonApp - टोकन खरीदें",
        description: `${tokens} टोकन रिचार्ज`,
        image: "https://cdn-icons-png.flaticon.com/512/2966/2966472.png",
        handler: (response: any) => {
            console.log("Token Payment successful:", response);
            alert(`आपका ${tokens} टोकन का रिचार्ज सफल रहा! आपका नया बैलेंस जल्द ही अपडेट हो जाएगा।`);
            setLoadingTokens(null);
        },
        prefill: {
            name: currentUser.name || "Sakoon User",
            email: currentUser.email || undefined,
            contact: currentUser.mobile || undefined
        },
        notes: {
            userId: currentUser.uid,
            purchaseType: 'tokens',
            tokensToBuy: tokens,
        },
        theme: {
            color: "#6366F1" // Indigo-500
        },
        modal: {
            ondismiss: () => { setLoadingTokens(null); }
        }
    };
    
    try {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
            console.error("Payment failed:", response);
            alert(`Oops! Payment Failed\nReason: ${response.error.description}\nPlease try again.`);
            setLoadingTokens(null);
        });
        rzp.open();
    } catch(error) {
        console.error("Razorpay error:", error);
        alert("भुगतान शुरू करने में एक त्रुटि हुई। कृपया पुनः प्रयास करें।");
        setLoadingTokens(null);
    }
  };

  const TokenWalletSection = (
    <div className="max-w-5xl mx-auto mt-12 mb-8">
        <div className="bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/50 dark:via-purple-900/50 dark:to-pink-900/50 rounded-2xl shadow-xl border-2 border-indigo-300 dark:border-indigo-700 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div>
                <h3 className="text-3xl font-bold text-indigo-800 dark:text-indigo-200 flex items-center gap-3 justify-center md:justify-start">
                  <WalletIcon className="w-8 h-8"/>
                  टोकन वॉलेट
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">टोकन खरीदें और अपनी सुविधानुसार कॉल या चैट के लिए उपयोग करें।</p>
              </div>
              <div className="bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg mt-4 md:mt-0">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">आपका बैलेंस</p>
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 justify-center">
                    <TokenIcon className="w-7 h-7" />
                    {currentUser.tokenBalance || 0}
                  </p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {tokenPacks.map(pack => (
                  <div key={pack.tokens} className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-lg text-center flex flex-col justify-between">
                    <div>
                      <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1.5">
                        <TokenIcon className="w-5 h-5"/>
                        {pack.tokens}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">टोकन</p>
                    </div>
                    <button 
                      onClick={() => handleTokenPurchase(pack.tokens, pack.price)}
                      disabled={loadingTokens !== null}
                      className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm py-2 rounded-md transition-colors shadow disabled:bg-slate-400"
                    >
                      {loadingTokens === pack.tokens ? '...' : `₹${pack.price}`}
                    </button>
                  </div>
                ))}
            </div>
            <div className="mt-6 text-center bg-indigo-50 dark:bg-indigo-900/70 p-3 rounded-lg">
                <p className="font-semibold text-indigo-800 dark:text-indigo-200">
                  उपयोग दर: 📞 कॉल = 2 टोकन/मिनट | 💬 चैट = 1 टोकन/मिनट
                </p>
            </div>
        </div>
    </div>
  );

  return (
    <section id="services" className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3">हमारी सेवाएं</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">अपने लिए सही प्लान या टोकन पैक चुनें।</p>
        </div>
        
        {TokenWalletSection}
        
        <PlanCategory title="डायरेक्ट टाइम प्लान्स" containerClass="mt-16">
             <div className="max-w-sm mx-auto w-full">
                <PlanCard
                    duration={allPlans.p30.duration}
                    callPlan={allPlans.p30.call}
                    chatPlan={allPlans.p30.chat}
                    isPopular={true}
                    currentUser={currentUser}
                />
            </div>
        </PlanCategory>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch justify-center mb-8 mt-12">
            <PlanCard
                duration={allPlans.p5.duration}
                callPlan={allPlans.p5.call}
                chatPlan={allPlans.p5.chat}
                currentUser={currentUser}
            />
            <PlanCard
                duration={allPlans.p10.duration}
                callPlan={allPlans.p10.call}
                chatPlan={allPlans.p10.chat}
                currentUser={currentUser}
            />
            <PlanCard
                duration={allPlans.p15.duration}
                callPlan={allPlans.p15.call}
                chatPlan={allPlans.p15.chat}
                currentUser={currentUser}
            />
            <PlanCard
                duration={allPlans.p60.duration}
                callPlan={allPlans.p60.call}
                chatPlan={allPlans.p60.chat}
                currentUser={currentUser}
            />
        </div>

        {/* Payment Gateway Info */}
        <div className="mt-16 text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
           <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">सुरक्षित पेमेंट</h3>
           <div className="flex justify-center items-center space-x-6 mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/BHIM-Logo.png" alt="BHIM UPI" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="Paytm" className="h-7 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-8 object-contain" />
           </div>
           <p className="text-md text-green-700 dark:text-green-400 font-semibold mb-2">सभी लेन-देन 100% सुरक्षित और गोपनीय हैं।</p>
           <p className="text-sm text-slate-500 dark:text-slate-400">यदि किसी कारण से आपका भुगतान असफल हो जाता है, तो रिफंड की राशि 24 घंटे के भीतर आपके मूल खाते में वापस जमा कर दी जाएगी।</p>
        </div>

      </div>
    </section>
  );
};

export default React.memo(PlansView);
