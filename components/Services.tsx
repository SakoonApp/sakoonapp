import React from 'react';
import { LISTENERS_DATA } from '../constants';
import ListenerCard from './ListenerCard';
import type { Listener } from '../types';

interface CallsViewProps {
  onConnectListener: () => void;
}

const CallsView: React.FC<CallsViewProps> = ({ onConnectListener }) => {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Connect with a Listener</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">Choose someone you'd like to talk to.</p>
      </div>
      <div className="space-y-3 max-w-2xl mx-auto">
        {LISTENERS_DATA.map((listener: Listener) => (
          <ListenerCard
            key={listener.id}
            listener={listener}
            variant="compact"
            onConnectClick={onConnectListener}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CallsView);