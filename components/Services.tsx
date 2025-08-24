import React from 'react';
import { LISTENERS_DATA } from '../constants';
import ListenerCard from './ListenerCard';
import type { Listener } from '../types';

interface CallsViewProps {
  onConnectListener: () => void;
}

const CallsView: React.FC<CallsViewProps> = ({ onConnectListener }) => {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <div className="space-y-2 max-w-2xl mx-auto">
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