import React from 'react';

const ChatsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c.243.27.48.552.706.838.225.286.44.58.644.882A23.955 23.955 0 0112 18.75c3.032 0 5.922-.746 8.4-2.016.204-.302.419-.6.644-.882.226-.286.463-.568.706-.838m-17.412 0A23.952 23.952 0 0012 5.25c3.032 0 5.922.746 8.4 2.016.204.302.419.6.644.882.226.286.463-.568.706-.838m-17.412 0v.013c0 .243.018.486.052.727m17.308 0v.013c0 .243-.018.486-.052.727m-17.204 0h.008v.004h-.008v-.004zm17.204 0h.008v.004h-.008v-.004z" />
    </svg>
);

const ChatsView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[calc(100vh-8rem)]">
        <ChatsIcon className="w-24 h-24 text-slate-300 dark:text-slate-600 mb-6" />
        <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-3">Chats are Coming Soon!</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md">
            We are working hard to bring you a seamless chat experience. Your conversation history with listeners will appear here.
        </p>
    </div>
  );
};

export default React.memo(ChatsView);