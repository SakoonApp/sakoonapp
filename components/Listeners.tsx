<<<<<<< HEAD

import React, { useState } from 'react';
import PlanCard from './PlanCard';
import { CALL_PLANS, CHAT_PLANS, RAZORPAY_KEY_ID } from '../constants';
import type { User } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}
=======
import React, { useState } from 'react';
import PlanCard from './PlanCard';
import { CALL_PLANS, CHAT_PLANS } from '../constants';
import type { User, Plan as PlanType } from '../types';
import { paymentService } from '../services/paymentService';

>>>>>>> repo2/main

interface PlansViewProps {
  currentUser: User;
}

// --- Icons ---
<<<<<<< HEAD
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
    { tokens: 250, price: 1100 },
    { tokens: 500, price: 2100 },
  ];

  const handleTokenPurchase = (tokens: number, price: number) => {
    setLoadingTokens(tokens);
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
    <div className="max-w-5xl mx-auto mt-8 mb-8">
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
                      {loadingTokens === pack.tokens ? '...' : `₹${pack.price} Buy`}
                    </button>
                  </div>
                ))}
            </div>
            <div className="mt-6 text-center bg-indigo-50 dark:bg-indigo-900/70 p-3 rounded-lg">
                <div className="font-semibold text-indigo-800 dark:text-indigo-200 flex flex-col items-center gap-1 text-md">
                  <p>📞 कॉल = 2 टोकन/मिनट</p>
                  <p>💬 चैट = 1 टोकन/मिनट</p>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <section id="services" className="py-6 md:py-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3">हमारी सेवाएं</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">अपने लिए सही प्लान या टोकन पैक चुनें।</p>
        </div>
        
        {TokenWalletSection}
        
        <PlanCategory title="डायरेक्ट टाइम प्लान्स" containerClass="mt-8">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch justify-center mb-8 mt-8">
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
        <div className="mt-8 text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
           <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">सुरक्षित पेमेंट</h3>
           <div className="flex justify-center items-center flex-wrap gap-x-8 gap-y-4 mb-4 px-4 sm:px-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 object-contain" loading="lazy" decoding="async" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="BHIM UPI" className="h-6 object-contain" loading="lazy" decoding="async" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-6 object-contain" loading="lazy" decoding="async" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-6 object-contain" loading="lazy" decoding="async" />
           </div>
           <p className="text-md text-green-700 dark:text-green-400 font-semibold mb-2">सभी लेन-देन 100% सुरक्षित और गोपनीय हैं।</p>
           <p className="text-sm text-slate-500 dark:text-slate-400">यदि किसी कारण से आपका भुगतान असफल हो जाता है, तो रिफंड की राशि 24 घंटे के भीतर आपके मूल खाते में वापस जमा कर दी जाएगी।</p>
        </div>

      </div>
    </section>
  );
};

export default React.memo(PlansView);
=======
const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21,18V6A3,3,0,0,0,18,3H5A3,3,0,0,0,2,6V18A3,3,0,0,0,5,21H18A3,3,0,0,0,21,18ZM5,5H18a1,1,0,0,1,1,1V8H4V6A1,1,0,0,1,5,5ZM15,15a1,1,0,1,1,1-1A1,1,0,0,1,15,15Z" />
    </svg>
);

const TokenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="12" className="fill-indigo-600 dark:fill-indigo-500" />
        <path d="M10.5 8.5 v7 L14 15.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="8" cy="12" r="1.5" className="fill-white" />
    </svg>
);
// --- End Icons ---


const PlansView: React.FC<PlansViewProps> = ({ currentUser }) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);


  const tokenOptions = [
    { tokens: 10, price: 50 },
    { tokens: 20, price: 95 },
    { tokens: 50, price: 230 },
    { tokens: 100, price: 450 },
    { tokens: 250, price: 1125 },
    { tokens: 500, price: 2250 },
  ];

  const handleTokenPurchase = async (tokens: number, price: number) => {
    const planKey = `mt_${tokens}`;
    setLoadingPlan(planKey);
    setFeedback(null);
    try {
      const result: any = await paymentService.buyTokens(tokens, price);
      if (result?.success) {
        setFeedback({ type: 'success', message: `Payment Successful! ${result.description} added.` });
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (error: any) {
        if (error.code !== 'user-closed-modal') {
             setFeedback({ type: 'error', message: 'Payment failed. Please try again.' });
             setTimeout(() => setFeedback(null), 4000);
        }
    } finally {
        setLoadingPlan(null);
    }
  };
  
  const handleDTPlanPurchase = async (planData: PlanType, type: 'call' | 'chat') => {
      const planKey = `${type}_${planData.name}`;
      setLoadingPlan(planKey);
      setFeedback(null);
      try {
        const result: any = await paymentService.buyDTPlan(planData);
         if (result?.success) {
            setFeedback({ type: 'success', message: `Payment Successful! ${result.description} activated.` });
            setTimeout(() => setFeedback(null), 4000);
        }
    } catch (error: any) {
        if (error.code !== 'user-closed-modal') {
             setFeedback({ type: 'error', message: 'Payment failed. Please try again.' });
             setTimeout(() => setFeedback(null), 4000);
        }
    } finally {
        setLoadingPlan(null);
    }
  };

  const planPairs = CALL_PLANS.map((callPlan, index) => ({
    callPlan,
    chatPlan: CHAT_PLANS[index],
    tierName: callPlan.tierName || '',
    isPopular: callPlan.tierName === 'Gold Pack' || callPlan.tierName === 'Platinum Pack'
  }));

  return (
    <div className="container mx-auto px-4 py-6">
      
      {feedback && (
        <div className={`p-4 mb-4 rounded-lg text-center font-semibold animate-fade-in-down ${feedback.type === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'}`}>
            {feedback.message}
        </div>
      )}

      {/* Token Purchase Section */}
      <section className="mb-8">
        <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3">
                <WalletIcon className="w-8 h-8 text-indigo-500"/>
                <span>MT Plans</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Money Token खरीदें और अपनी सुविधानुसार कॉल या चैट के लिए उपयोग करें।</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {tokenOptions.map(option => (
                <div key={option.tokens} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-between transition-all hover:shadow-lg hover:scale-105">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <TokenIcon className="w-6 h-6"/>
                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{option.tokens}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">MT</p>
                    </div>
                    <button 
                        onClick={() => handleTokenPurchase(option.tokens, option.price)}
                        disabled={loadingPlan !== null}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        {loadingPlan === `mt_${option.tokens}` ? 'प्रोसेसिंग...' : `₹${option.price} Buy`}
                    </button>
                </div>
            ))}
        </div>

        <div className="text-center mt-6 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg max-w-md mx-auto border border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-slate-700 dark:text-slate-200">📞 कॉल = 2 MT/मिनट</p>
            <p className="font-semibold text-slate-700 dark:text-slate-200 mt-1">💬 चैट = 1 MT/2 मैसेज</p>
        </div>
      </section>

      <div className="text-center my-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">DT Plans</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">सभी प्लान 30 दिन के मान्य होंगे</p>
      </div>

      {/* Plan Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {planPairs.map((pair) => (
          <PlanCard 
            key={pair.tierName}
            tierName={pair.tierName}
            callPlan={pair.callPlan}
            chatPlan={pair.chatPlan}
            isPopular={pair.isPopular}
            onPurchase={handleDTPlanPurchase}
            loadingPlan={loadingPlan}
          />
        ))}
      </div>

      {/* Secure Payments Section */}
      <section className="mt-16 text-center bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">सुरक्षित पेमेंट</h3>
        <div className="flex flex-col items-center gap-y-3 my-4">
          <div className="flex justify-center items-center gap-x-6 sm:gap-x-8">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_(standalone).svg" alt="Paytm" className="h-6 object-contain" />
          </div>
          <div className="flex justify-center items-center gap-x-6 sm:gap-x-8">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-6 object-contain" />
          </div>
        </div>
        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
          सभी लेन-देन 100% सुरक्षित और गोपनीय हैं।
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          यदि किसी कारण से आपका भुगतान असफल हो जाता है, तो रिफंड की राशि 5-7 व्यावसायिक दिनों के भीतर आपके मूल खाते में वापस जमा कर दी जाएगी।
        </p>
      </section>
    </div>
  );
};

export default PlansView;
>>>>>>> repo2/main
