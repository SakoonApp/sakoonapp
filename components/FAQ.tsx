import React from 'react';

const ChatBubbleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ChatsView: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-16 text-center flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <ChatBubbleIcon />
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mt-4">चैट्स जल्द ही आ रहे हैं</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">आपकी पिछली बातचीत और सक्रिय चैट सत्रों की सूची यहां दिखाई देगी।</p>
        </div>
    );
};

export default React.memo(ChatsView);