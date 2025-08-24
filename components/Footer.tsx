import React from 'react';

type ActiveView = 'home' | 'plans' | 'profile';

interface BottomNavBarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

// --- Icon Components ---
const HomeIcon: React.FC<{ active: boolean }> = ({ active }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const ChatIcon: React.FC<{ active: boolean }> = ({ active }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);
const PlansIcon: React.FC<{ active: boolean }> = ({ active }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);
const ProfileIcon: React.FC<{ active: boolean }> = ({ active }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
// --- End Icon Components ---


const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => {
    const activeClasses = 'text-cyan-600 dark:text-cyan-400';
    const inactiveClasses = 'text-slate-500 dark:text-slate-400';
    return (
        <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center pt-2 pb-1 transition-colors ${isActive ? activeClasses : inactiveClasses}`}>
            {icon}
            <span className={`text-xs font-bold ${isActive ? 'opacity-100' : 'opacity-90'}`}>{label}</span>
        </button>
    );
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'home', label: 'होम', icon: HomeIcon },
    { id: 'plans', label: 'प्लान्स', icon: PlansIcon },
    { id: 'profile', label: 'प्रोफ़ाइल', icon: ProfileIcon },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 z-40 flex justify-around">
      {navItems.map(item => (
        <NavItem
          key={item.id}
          label={item.label}
          isActive={activeView === item.id}
          onClick={() => setActiveView(item.id as ActiveView)}
          icon={<item.icon active={activeView === item.id} />}
        />
      ))}
    </footer>
  );
};

export default React.memo(BottomNavBar);