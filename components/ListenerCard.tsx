import React from 'react';
import type { Listener } from '../types';

interface ListenerCardProps {
  listener: Listener;
  onConnectClick?: () => void;
  variant?: 'default' | 'compact';
}

const VerifiedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12c0 1.357-.6 2.573-1.549 3.397a4.49 4.49 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6 2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const CallIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.298-.083.465a7.48 7.48 0 003.429 3.429c.167.081.364.052.465-.083l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C6.542 22.5 1.5 17.458 1.5 9.75V4.5z" clipRule="evenodd" />
    </svg>
);


const ListenerCard: React.FC<ListenerCardProps> = ({ listener, onConnectClick, variant = 'default' }) => {

    if (variant === 'compact') {
        return (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-3 flex items-center space-x-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div className="relative flex-shrink-0">
                <img 
                    src={listener.image} 
                    alt={listener.name} 
                    className="w-16 h-16 rounded-full object-cover" 
                />
                <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 border-2 border-white dark:border-slate-800 ring-1 ring-green-500"></span>
            </div>
            <div className="flex-grow text-left">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg">{listener.name}</h3>
                <VerifiedIcon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-3 mt-1">
                <span>{listener.rating}★ ({listener.reviewsCount})</span>
                <span>•</span>
                <span>{listener.experienceHours} hrs</span>
              </div>
            </div>
            {onConnectClick && (
              <button
                onClick={onConnectClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold w-14 h-14 rounded-full transition-colors shrink-0 shadow-lg flex items-center justify-center transform hover:scale-105"
                aria-label={`Call ${listener.name}`}
              >
                <CallIcon className="w-7 h-7"/>
              </button>
            )}
          </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-3 md:p-4 text-center border border-slate-100 dark:border-slate-700 transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/20 group">
            <div className="relative inline-block mb-3">
                <img 
                    src={listener.image} 
                    alt={listener.name} 
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto border-4 border-slate-100 dark:border-slate-700 object-cover" 
                />
                <span className="absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-400 border-2 border-white dark:border-slate-800 ring-1 ring-green-500"></span>
                <div className="absolute top-0 -right-1 bg-white dark:bg-slate-800 rounded-full p-0.5">
                    <VerifiedIcon className="w-6 h-6 text-blue-500" />
                </div>
            </div>

            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg md:text-xl truncate">{listener.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-3">{`(${listener.gender}, ${listener.age} yrs)`}</p>

            <div className="flex justify-around items-center text-xs md:text-sm text-center mb-4 text-slate-600 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{listener.rating}★</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-[10px] md:text-xs">({listener.reviewsCount})</span>
                </div>
                <div className="border-l h-6 border-slate-200 dark:border-slate-600"></div>
                <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{listener.experienceHours}</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-[10px] md:text-xs">घंटे अनुभव</span>
                </div>
            </div>
            
            <button
                onClick={onConnectClick}
                className="w-16 h-16 mx-auto bg-green-500 group-hover:bg-green-600 text-white font-bold rounded-full transition-colors flex items-center justify-center shadow-lg transform hover:scale-110"
                aria-label={`Call ${listener.name}`}
            >
                <CallIcon className="w-8 h-8" />
            </button>
        </div>
    );
};

export default React.memo(ListenerCard);