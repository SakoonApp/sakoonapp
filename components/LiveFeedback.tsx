<<<<<<< HEAD

import React from 'react';

const ChatsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c.243.27.48.552.706.838.225.286.44.58.644.882A23.955 23.955 0 0112 18.75c3.032 0 5.922-.746 8.4-2.016.204-.302.419-.6.644-.882.226-.286.463-.568.706-.838m-17.412 0A23.952 23.952 0 0012 5.25c3.032 0 5.922.746 8.4 2.016.204.302.419-.6.644.882.226-.286.463-.568.706-.838m-17.412 0v.013c0 .243.018.486.052.727m17.308 0v.013c0 .243-.018.486-.052.727m-17.204 0h.008v.004h-.008v-.004zm17.204 0h.008v.004h-.008v-.004z" />
    </svg>
);

const ChatsView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[calc(100vh-8rem)]">
        <ChatsIcon className="w-24 h-24 text-slate-300 dark:text-slate-600 mb-6 animate-pulse" />
        <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-3">चैट्स जल्द आ रहे हैं!</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md">
            हम आपको एक सहज चैट अनुभव देने के लिए कड़ी मेहनत कर रहे हैं। Listeners के साथ आपकी बातचीत का इतिहास यहाँ दिखाई देगा।
        </p>
    </div>
  );
};

export default React.memo(ChatsView);
=======
import React from 'react';
import ListenerCard from './ListenerCard';
import { db } from '../utils/firebase';
import firebase from 'firebase/compat/app';
import type { Listener, User } from '../types';
import ViewLoader from './ViewLoader';
import { useListeners } from '../hooks/useListeners';

interface ChatsViewProps {
  onStartSession: (type: 'chat', listener: Listener) => void;
  currentUser: User;
}

const ChatsView: React.FC<ChatsViewProps> = ({ onStartSession, currentUser }) => {
    const favorites = currentUser.favoriteListeners || [];
    const { listeners, loading, loadingMore, hasMore, loadMoreListeners } = useListeners(favorites);

    const handleToggleFavorite = async (listenerId: number) => {
        if (!currentUser) return;
        const userRef = db.collection('users').doc(currentUser.uid);
        const isFavorite = favorites.includes(listenerId);

        try {
          if (isFavorite) {
            await userRef.update({
              favoriteListeners: firebase.firestore.FieldValue.arrayRemove(listenerId)
            });
          } else {
            await userRef.update({
              favoriteListeners: firebase.firestore.FieldValue.arrayUnion(listenerId)
            });
          }
           // The useListeners hook will automatically refetch when the favorites prop changes.
        } catch (error) {
          console.error("Failed to update favorites:", error);
          alert("Error updating favorites. Please try again.");
        }
    };


    if (loading) {
        return <ViewLoader />;
    }

    if (listeners.length === 0 && !loading) {
        return (
            <div className="text-center py-20 px-4">
                <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">अभी कोई Listener उपलब्ध नहीं है।</p>
                <p className="text-slate-500 dark:text-slate-500 mt-2">जब कोई Listener ऑनलाइन आएगा, तो वह यहाँ दिखाई देगा।</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-2 sm:px-4 py-4">
            <div className="space-y-2 max-w-2xl mx-auto">
                {listeners.map((listener) => (
                    <ListenerCard 
                        key={listener.id}
                        listener={listener}
                        variant="compact"
                        onChatClick={() => onStartSession('chat', listener)}
                        isFavorite={favorites.includes(listener.id)}
                        onToggleFavorite={() => handleToggleFavorite(listener.id)}
                    />
                ))}
            </div>
             {hasMore && (
                <div className="text-center mt-6">
                    <button
                        onClick={loadMoreListeners}
                        disabled={loadingMore}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-400"
                    >
                        {loadingMore ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default React.memo(ChatsView);
>>>>>>> repo2/main
