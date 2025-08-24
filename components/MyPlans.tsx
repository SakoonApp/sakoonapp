import React from 'react';
import type { PurchasedPlan, User } from '../types';
import { LISTENERS_DATA } from '../constants';

interface WalletProps {
  plans: PurchasedPlan[];
  user: User;
  onInitiateListenerSelection: (plan: PurchasedPlan) => void;
  onClose: () => void;
}

const formatValidity = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};
const formatActivationTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('hi-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
};
const formatSecondsToLong = (totalSeconds: number): string => {
    if (totalSeconds <= 0) return "0 सेकंड";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    let result = '';
    if (hours > 0) result += `${hours} घंटा `;
    if (minutes > 0) result += `${minutes} मिनट `;
    if (seconds > 0 && hours === 0 && minutes === 0) result += `${seconds} सेकंड`;
    return result.trim();
};

// --- Icons ---
const CallIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg> );
const ChatIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg> );
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const TokenIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" /></svg>);
// --- End Icons ---

const Wallet: React.FC<WalletProps> = ({ plans, user, onInitiateListenerSelection, onClose }) => {
  const availablePlans = plans.filter(p => p.remainingSeconds > 0 && p.expiryTimestamp > Date.now() && !p.isTokenSession);

  const TokenBalanceCard = () => (
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl shadow-lg mb-6 flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">टोकन बैलेंस</p>
          <p className="text-sm opacity-90">कॉल या चैट के लिए उपयोग करें</p>
        </div>
        <div className="text-right">
            <p className="text-4xl font-extrabold flex items-center gap-2">
              <TokenIcon className="w-8 h-8"/>
              {user.tokenBalance || 0}
            </p>
        </div>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-900 z-50 animate-fade-in flex flex-col">
        <header className="bg-white dark:bg-slate-800 shadow-sm z-10 flex items-center p-4 gap-4 sticky top-0">
            <h1 className="font-bold text-xl text-slate-800 dark:text-slate-200">मेरा वॉलेट</h1>
            <button onClick={onClose} className="ml-auto text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="वॉलेट बंद करें">
                <CloseIcon className="w-6 h-6" />
            </button>
        </header>

        <main className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8">
            <TokenBalanceCard />
            {availablePlans.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">कोई सक्रिय प्लान नहीं</h2>
                    <div className="max-w-xl mx-auto text-slate-500 dark:text-slate-400">
                        <p>आपके पास अभी कोई सक्रिय टाइम-बेस्ड प्लान नहीं है।</p>
                        <p className="mt-2">'होम' टैब से एक प्लान या टोकन खरीदें।</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {availablePlans.map((p) => {
                        const lockedListener = p.listenerId ? LISTENERS_DATA.find(l => l.id === p.listenerId) : null;
                        const isDailyDeal = p.planId === 'daily_deal';
                        const isFreeTrial = !!p.isFreeTrial;
                        const isLockedForActivation = isDailyDeal && p.validFromTimestamp && Date.now() < p.validFromTimestamp;
                        const progress = (p.remainingSeconds / p.totalSeconds) * 100;
                        const cardBg = isFreeTrial ? 'bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 border-purple-300 dark:border-purple-700' : isDailyDeal ? 'bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 border-amber-300 dark:border-amber-700' : 'bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/50 dark:to-cyan-900/50 border-teal-200 dark:border-teal-700';
                        const progressBarBg = isFreeTrial ? 'bg-purple-500' : isDailyDeal ? 'bg-amber-500' : 'bg-teal-500';

                        return (
                            <div key={p.id} className={`relative ${cardBg} p-4 rounded-xl shadow-lg border flex flex-col justify-between`}>
                                {isFreeTrial && ( <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full z-10">मुफ़्त ट्रायल</div> )}
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`flex-1 items-center gap-2 font-bold text-md ${p.type === 'call' ? (isDailyDeal ? 'text-orange-800 dark:text-orange-300' : 'text-cyan-800 dark:text-cyan-300') : (isFreeTrial ? 'text-indigo-800 dark:text-indigo-300' : 'text-teal-800 dark:text-teal-300')}`}>
                                            <div className="flex items-start gap-2">
                                                {p.type === 'call' ? <CallIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/> : <ChatIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/>}
                                                <span>{isFreeTrial ? `मुफ़्त चैट ट्रायल - ${p.plan.duration}` : `${isDailyDeal ? `स्पेशल ${p.type === 'call' ? 'कॉल' : 'चैट'}` : (p.type === 'call' ? 'कॉलिंग प्लान' : 'चैट प्लान')} - ${p.plan.duration}`}</span>
                                            </div>
                                        </span>
                                        <div className="text-right flex-shrink-0 ml-2">
                                            <p className="font-bold text-slate-800 dark:text-slate-100 text-xl leading-tight">{formatSecondsToLong(p.remainingSeconds)}</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 -mt-1">शेष समय</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 my-3">
                                        <div className={`rounded-full h-2 ${progressBarBg}`} style={{width: `${progress}%`}}></div>
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-4 space-y-1">
                                        <p>
                                            {isDailyDeal && p.validFromTimestamp && <>रात {formatActivationTime(p.validFromTimestamp)} से सक्रिय। </>}
                                            समाप्ति: <span className="font-semibold">{formatValidity(p.expiryTimestamp)}</span>
                                        </p>
                                        {lockedListener && ( <p className="font-semibold text-teal-800 dark:text-teal-300">यह प्लान <span className="font-bold">{lockedListener.name}</span> के साथ लॉक्ड है।</p> )}
                                    </div>
                                </div>
                                <button onClick={() => onInitiateListenerSelection(p)} disabled={isLockedForActivation} className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed disabled:opacity-70 ${!isLockedForActivation ? 'animate-call-ring' : ''}`}>
                                    {isLockedForActivation ? `रात ${formatActivationTime(p.validFromTimestamp!)} पर उपलब्ध होगा` : lockedListener ? `${lockedListener.name} के साथ जारी रखें` : 'अभी कनेक्ट करें'}
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </main>
    </div>
  );
};

export default React.memo(Wallet);