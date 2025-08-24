import React from 'react';
import type { Listener, PurchasedPlan } from '../types';
import { LISTENERS_DATA } from '../constants';
import ListenerCard from './ListenerCard';

interface ListenerSelectionProps {
    plan: PurchasedPlan;
    onSelectListener: (listener: Listener) => void;
    onBack: () => void;
}

// --- Icons ---
const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
  </svg>
);


const ListenerSelection: React.FC<ListenerSelectionProps> = ({ plan, onSelectListener, onBack }) => {
    
    return (
        <div className="fixed inset-0 bg-slate-100 dark:bg-slate-900 flex flex-col h-full animate-fade-in">
            {/* Header */}
            <header className="bg-white dark:bg-slate-800 shadow-sm z-10 flex items-center p-4 gap-4 sticky top-0">
                <button onClick={onBack} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="वापस जाएं">
                    <BackIcon className="w-6 h-6" />
                </button>
                <div className="flex-grow text-center">
                    <h1 className="font-bold text-xl text-slate-800 dark:text-slate-200">एक श्रोता चुनें</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        आपके <span className="font-semibold">{plan.plan.duration}</span> के <span className="font-semibold">{plan.type === 'call' ? 'कॉल' : 'चैट'}</span> प्लान के लिए
                    </p>
                </div>
                <div className="w-10"></div>
            </header>

            {/* Listener Grid */}
            <main className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8">
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {LISTENERS_DATA.map(listener => (
                        <ListenerCard 
                            key={listener.id}
                            listener={listener} 
                            onConnectClick={() => onSelectListener(listener)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ListenerSelection;
