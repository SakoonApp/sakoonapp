import React from 'react';
import Hero from './Hero';
import LiveFeedback from './LiveFeedback';
import LiveActivity from './LiveActivity';
import { LISTENERS_DATA } from '../constants';
import ListenerCard from './ListenerCard';

// Icons for navigation
const ChevronLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const ListenersSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const timeoutRef = React.useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === LISTENERS_DATA.length - 1 ? 0 : prevIndex + 1
        ),
      20000 // 20 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);
  
  const numListeners = LISTENERS_DATA.length;

  const goToPrevious = () => setCurrentIndex(currentIndex === 0 ? numListeners - 1 : currentIndex - 1);
  const goToNext = () => setCurrentIndex(currentIndex === numListeners - 1 ? 0 : currentIndex + 1);
  
  const handleScrollToPlans = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const planButton = document.querySelector('footer button:nth-child(3)');
    if (planButton instanceof HTMLElement) {
      planButton.click();
    }
  };

  return (
    <section id="listeners" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/30 dark:to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-3">
                आप किससे बात करना चाहते हैं?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">किसी ऐसे व्यक्ति से जुड़ें जो आपको समझे। आज ही बात करें।</p>
        </div>
        
        <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform ease-in-out duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {LISTENERS_DATA.map(listener => (
                <div key={listener.id} className="w-full flex-shrink-0 px-2 cursor-pointer" onClick={handleScrollToPlans}>
                  <div className="outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-offset-4 rounded-2xl block">
                    <ListenerCard listener={listener} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 p-2 bg-white/70 hover:bg-white dark:bg-slate-800/70 dark:hover:bg-slate-700 rounded-full shadow-lg transition-all focus:outline-none z-10" aria-label="Previous Listener">
            <ChevronLeftIcon />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 p-2 bg-white/70 hover:bg-white dark:bg-slate-800/70 dark:hover:bg-slate-700 rounded-full shadow-lg transition-all focus:outline-none z-10" aria-label="Next Listener">
            <ChevronRightIcon />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {LISTENERS_DATA.map((_, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-cyan-600 dark:bg-cyan-400' : 'bg-slate-300 dark:bg-slate-600'}`} aria-label={`Go to listener ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const HomeView: React.FC = () => {
    return (
        <>
            <Hero />
            <LiveFeedback />
            <LiveActivity />
            <ListenersSection />
        </>
    );
};

export default React.memo(HomeView);