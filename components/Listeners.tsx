
import React, { useState, useEffect } from 'react';
import PlanCard from './PlanCard';
import { CALL_PLANS, CHAT_PLANS } from '../constants';
import type { Plan, User } from '../types';
import { db } from '../utils/firebase';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PlansViewProps {
  currentUser: User;
}

// --- Icons ---
const PhoneIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>);
const ChatIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>);
const LightningBoltIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" /></svg>);


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
  const [now, setNow] = useState(new Date());
  const [loadingType, setLoadingType] = useState<'call' | 'chat' | null>(null);
  const [dealsSold, setDealsSold] = useState(0);
  const [dealsLoading, setDealsLoading] = useState(true);

  // Effect to listen for daily deal count
  useEffect(() => {
    // Use IST for date string to avoid timezone issues on the client
    const todayStr = new Date(Date.now() + (5.5 * 60 * 60 * 1000))
      .toISOString().split("T")[0]; // YYYY-MM-DD format
      
    const dealRef = db.collection('dailyDeals').doc(todayStr);
    
    const unsubscribe = dealRef.onSnapshot(doc => {
        setDealsSold(doc.exists ? (doc.data()?.count || 0) : 0);
        setDealsLoading(false);
    }, (error) => {
        console.error("Error fetching daily deals count:", error);
        setDealsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
      const timer = setInterval(() => setNow(new Date()), 60000); // Update every minute
      return () => clearInterval(timer);
  }, []);

  const hours = now.getHours();
  const isDealTime = hours < 11; // Deal is available before 11 AM

  const allPlans = {
    p5: { duration: '5 मिनट', call: CALL_PLANS[0], chat: CHAT_PLANS[0] },
    p10: { duration: '10 मिनट', call: CALL_PLANS[1], chat: CHAT_PLANS[1] },
    p15: { duration: '15 मिनट', call: CALL_PLANS[2], chat: CHAT_PLANS[2] },
    p30: { duration: '30 मिनट', call: CALL_PLANS[3], chat: CHAT_PLANS[3] },
    p60: { duration: '1 घंटा', call: CALL_PLANS[4], chat: CHAT_PLANS[4] },
  };

  const handleDailyDealPurchase = (type: 'call' | 'chat') => {
      setLoadingType(type);
      const plan: Plan = {
          duration: '55 मिनट',
          price: type === 'call' ? 399 : 199,
      };

      const RAZORPAY_KEY_ID = 'rzp_test_gV1tLH2ZnCWti9';
      const options = {
          key: RAZORPAY_KEY_ID,
          amount: plan.price * 100,
          currency: "INR",
          name: "SakoonApp - आज का स्पेशल",
          description: `एक ${type === 'chat' ? 'चैट' : 'कॉल'} प्लान खरीदें - ${plan.duration}`,
          image: "https://cdn-icons-png.flaticon.com/512/2966/2966472.png",
          handler: (response: any) => {
              console.log("Payment successful:", response);
              alert(`आपका 'आज का स्पेशल' ${type === 'call' ? 'कॉल' : 'चैट'} प्लान सफलतापूर्वक खरीद लिया गया है! यह जल्द ही 'मेरे प्लान्स' में दिखेगा।`);
              setLoadingType(null);
          },
          prefill: {
              name: currentUser.name,
              contact: currentUser.mobile
          },
          notes: {
              userId: currentUser.uid,
              planDuration: plan.duration,
              planPrice: plan.price,
              planType: type,
              planId: 'daily_deal'
          },
          theme: {
              color: "#F97316" // Orange-500
          },
          modal: {
              ondismiss: () => {
                  setLoadingType(null);
              }
          }
      };
      
      try {
          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', (response: any) => {
              console.error("Payment failed:", response);
              alert(`भुगतान विफल हो गया।\nत्रुटि: ${response.error.description}\nकृपया पुनः प्रयास करें।`);
              setLoadingType(null);
          });
          rzp.open();
      } catch(error) {
          console.error("Razorpay error:", error);
          alert("भुगतान प्रोसेस करने में एक त्रुटि हुई। कृपया बाद में प्रयास करें।");
          setLoadingType(null);
      }
  };

  const DailyDealCard = (
    <div className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="relative bg-gradient-to-tr from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-900/50 dark:via-amber-900/50 dark:to-yellow-900/50 rounded-2xl shadow-xl border-2 border-amber-400 dark:border-amber-700 p-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-md font-bold px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                <LightningBoltIcon className="w-5 h-5"/>
                आज का स्पेशल
            </div>
            <div className="text-center mt-6">
                <p className="text-slate-700 dark:text-slate-300 text-md max-w-2xl mx-auto">यह ऑफर रोज़ सुबह 11:00 बजे तक उपलब्ध है और प्रति दिन केवल 3 यूज़र्स के लिए है। खरीदा गया प्लान उसी दिन रात 11:00 बजे सक्रिय होगा।</p>
                {isDealTime && !dealsLoading && (
                    <p className="mt-2 text-md font-bold text-green-700 dark:text-green-400">
                      {dealsSold < 3 ? `आज के लिए सिर्फ़ ${3 - dealsSold} डील बची हैं!` : 'आज की सभी डील बिक चुकी हैं!'}
                    </p>
                )}
            </div>
            
            <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div className={`flex flex-col items-center p-4 rounded-lg transition-all ${isDealTime && dealsSold < 3 ? 'bg-orange-50 dark:bg-orange-900/60' : 'bg-slate-200 dark:bg-slate-800'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <PhoneIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-300">कॉलिंग प्लान</h4>
                    </div>
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-1">55 मिनट</p>
                    <p className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">₹399</p>
                    <button
                      onClick={() => handleDailyDealPurchase('call')}
                      disabled={!isDealTime || loadingType !== null || dealsSold >= 3 || dealsLoading}
                      className="w-full mt-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg transition-colors shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {loadingType === 'call' ? 'प्रोसेसिंग...' : 'अभी खरीदें'}
                    </button>
                </div>
                <div className={`flex flex-col items-center p-4 rounded-lg transition-all ${isDealTime && dealsSold < 3 ? 'bg-yellow-50 dark:bg-yellow-900/60' : 'bg-slate-200 dark:bg-slate-800'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <ChatIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-300">चैट प्लान</h4>
                    </div>
                     <p className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-1">55 मिनट</p>
                    <p className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">₹199</p>
                    <button
                      onClick={() => handleDailyDealPurchase('chat')}
                      disabled={!isDealTime || loadingType !== null || dealsSold >= 3 || dealsLoading}
                      className="w-full mt-auto bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-lg transition-colors shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {loadingType === 'chat' ? 'प्रोसेसिंग...' : 'अभी खरीदें'}
                    </button>
                </div>
            </div>

             {(!isDealTime || dealsSold >= 3) && (
                <p className="text-center text-red-600 font-semibold mt-6 bg-red-100 dark:bg-red-900/50 dark:text-red-300 p-2 rounded-md">यह ऑफर आज के लिए समाप्त हो गया है। कल फिर से प्रयास करें।</p>
            )}
        </div>
    </div>
  );

  return (
    <section id="services" className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3">हमारी सेवाएं</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">अपने लिए सही प्लान चुनें। आपके खरीदे हुए प्लान्स आपके वॉलेट में दिखाई देंगे।</p>
        </div>
        
        <PlanCategory title="Most Popular" containerClass="mb-8">
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
        
        {DailyDealCard}

        <PlanCategory title="Starter Packs" gridClass="md:grid-cols-1" containerClass="mb-8">
            <div className="max-w-sm mx-auto w-full">
                <PlanCard
                    duration={allPlans.p5.duration}
                    callPlan={allPlans.p5.call}
                    chatPlan={allPlans.p5.chat}
                    currentUser={currentUser}
                />
            </div>
        </PlanCategory>
        
        <PlanCategory title="Value Packs" gridClass="md:grid-cols-2 lg:grid-cols-2" containerClass="mb-8">
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
        </PlanCategory>
        
        <PlanCategory title="Premium" gridClass="md:grid-cols-1" containerClass="mb-8">
            <div className="max-w-sm mx-auto w-full">
                <PlanCard
                    duration={allPlans.p60.duration}
                    callPlan={allPlans.p60.call}
                    chatPlan={allPlans.p60.chat}
                    currentUser={currentUser}
                />
            </div>
        </PlanCategory>

        {/* Payment Gateway Info */}
        <div className="mt-16 text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
           <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">सुरक्षित पेमेंट</h3>
           <div className="flex justify-center items-center space-x-8 mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhVsdJq4qB2BFf2u0YFpG_iyGkKxrydK_s3w&s" alt="Razorpay" className="h-10" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR23iWkY41gYyBYDIqCRf5w5H7qsd8j4lI_GQ&s" alt="Paytm" className="h-12" />
           </div>
           <p className="text-md text-green-700 dark:text-green-400 font-semibold mb-2">सभी लेन-देन 100% सुरक्षित और गोपनीय हैं।</p>
           <p className="text-sm text-slate-500 dark:text-slate-400">यदि किसी कारण से आपका भुगतान असफल हो जाता है, तो रिफंड की राशि 24 घंटे के भीतर आपके मूल खाते में वापस जमा कर दी जाएगी।</p>
        </div>

      </div>
    </section>
  );
};

export default React.memo(PlansView);
