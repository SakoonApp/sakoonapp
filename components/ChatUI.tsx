<<<<<<< HEAD

import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { ChatSession, User, ChatMessage } from '../types';
import { fetchZegoToken } from '../utils/zego.ts';
=======
import React, { useEffect, useRef, useState, useCallback, Fragment } from 'react';
import type { ChatSession, User, ChatMessage } from '../types';
import { fetchZegoToken } from '../utils/zego.ts';
import { functions } from '../utils/firebase.ts';
>>>>>>> repo2/main

declare global {
  interface Window {
    ZegoUIKitPrebuilt: any;
  }
}

interface ChatUIProps {
  session: ChatSession;
  user: User;
<<<<<<< HEAD
  onLeave: (success: boolean, consumedSeconds: number) => void;
}

// --- SVG Icons ---
=======
  onLeave: (success: boolean, consumedMessages: number) => void;
}

// --- SVG Icons ---
const VerifiedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
);
>>>>>>> repo2/main
const SendIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);
<<<<<<< HEAD

=======
>>>>>>> repo2/main
const MicrophoneIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
        <path d="M6 10.5a.75.75 0 01.75.75v.5a5.25 5.25 0 0010.5 0v-.5a.75.75 0 011.5 0v.5a6.75 6.75 0 01-13.5 0v-.5a.75.75 0 01.75-.75z" />
    </svg>
);
<<<<<<< HEAD

const EmojiIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M11.99 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 11.99 2.25zM8.25 11.25a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H8.25zm.75 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm5.25-3.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5h-.008z" clipRule="evenodd" />
    </svg>
);

const AttachmentIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3.375 3.375 0 0119.5 7.372l-8.55 8.55a.75.75 0 01-1.06-1.06l8.55-8.55a1.875 1.875 0 00-2.652-2.652L3.81 12.81a6 6 0 008.486 8.486l7.693-7.693a.75.75 0 011.06 1.06z" />
    </svg>
);
=======
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" /></svg>;
const SentIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>;
const DeliveredIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.953 4.136a.75.75 0 01.143 1.052l-5 6.5a.75.75 0 01-1.127.075l-2.5-2.5a.75.75 0 111.06-1.06l1.894 1.893 4.48-5.824a.75.75 0 011.052-.143z" clipRule="evenodd" /><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>;
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>;
>>>>>>> repo2/main


type ConnectionStatus = 'connecting' | 'waiting' | 'connected' | 'error' | 'ended';

<<<<<<< HEAD
const ChatUI: React.FC<ChatUIProps> = ({ session, user, onLeave }) => {
  const zpInstanceRef = useRef<any>(null);
  const sessionStartTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(session.sessionDurationSeconds);
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
=======
const MessageStatus: React.FC<{ status?: ChatMessage['status'] }> = ({ status }) => {
    switch (status) {
        case 'sending': return <ClockIcon className="w-4 h-4 text-slate-400" />;
        case 'sent': return <SentIcon className="w-4 h-4" />;
        case 'delivered': return <DeliveredIcon className="w-4 h-4" />;
        case 'read': return <DeliveredIcon className="w-4 h-4 text-blue-500" />;
        case 'failed': return <ErrorIcon className="w-4 h-4 text-red-500" />;
        default: return null;
    }
};

const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

const formatDateSeparator = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (isSameDay(date, today)) return 'Today';
    if (isSameDay(date, yesterday)) return 'Yesterday';
    return date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
};

const ChatUI: React.FC<ChatUIProps> = ({ session, user, onLeave }) => {
  const zpInstanceRef = useRef<any>(null);
  const hasLeftRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const associatedPlanIdRef = useRef(session.associatedPlanId);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [isListenerTyping, setIsListenerTyping] = useState(false);
  const [imageError, setImageError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sentMessagesCount, setSentMessagesCount] = useState(0);
>>>>>>> repo2/main

  const addSystemMessage = useCallback((text: string) => {
      setMessages(prev => [...prev, {
          id: `system-${Date.now()}`,
          text,
          sender: { uid: 'system', name: 'System'},
          timestamp: Date.now()
      }]);
  }, []);

  const handleLeave = useCallback((isSuccess: boolean) => {
<<<<<<< HEAD
    if (status === 'ended') return;
    setStatus('ended');
    const startTime = sessionStartTimeRef.current;
    if (startTime) {
      const consumedSeconds = (Date.now() - startTime) / 1000;
      onLeave(isSuccess, consumedSeconds);
    } else {
      onLeave(false, 0);
    }
  }, [onLeave, status]);


  const endSessionDueToTime = useCallback(() => {
    addSystemMessage('समय समाप्त हो गया है। यह चैट अब समाप्त हो जाएगी।');
    setTimeout(() => handleLeave(true), 2000); // Wait 2s for user to read
  }, [addSystemMessage, handleLeave]);
=======
    if (hasLeftRef.current) return;
    hasLeftRef.current = true;
    setStatus('ended');
    onLeave(isSuccess, sentMessagesCount);
  }, [onLeave, sentMessagesCount]);
>>>>>>> repo2/main

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
<<<<<<< HEAD

  useEffect(scrollToBottom, [messages]);
  
  // Timer effect
  useEffect(() => {
    if (status === 'connected' && sessionStartTimeRef.current !== null) {
      const sessionExpiryTime = sessionStartTimeRef.current + session.sessionDurationSeconds * 1000;
      
      timerIntervalRef.current = window.setInterval(() => {
        const newRemaining = Math.round((sessionExpiryTime - Date.now()) / 1000);
        setRemainingSeconds(newRemaining);

        if (newRemaining <= 0) {
          endSessionDueToTime();
        }
      }, 1000);
    }
    
    return () => {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
      }
    };
  }, [status, session.sessionDurationSeconds, endSessionDueToTime]);

=======
   
    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [inputValue]);
  
>>>>>>> repo2/main
  // Zego setup effect
  useEffect(() => {
    let zp: any;
    const initZego = async () => {
      setStatus('connecting');
      try {
        const kitToken = await fetchZegoToken(session.associatedPlanId);
        zp = window.ZegoUIKitPrebuilt.create(kitToken);
        zpInstanceRef.current = zp;

<<<<<<< HEAD
        await zp.joinRoom({
          container: document.createElement('div'), // Hidden container
          scenario: { mode: window.ZegoUIKitPrebuilt.OneONoneCall },
          showMyCameraToggleButton: false,
          showAudioVideoSettingsButton: false,
          showScreenSharingButton: false,
          showMicrophoneToggleButton: false,
          showPreJoinView: false,
          turnOnCameraWhenJoining: false,
          turnOnMicrophoneWhenJoining: false,
          showCallTimer: false,
          showLeaveRoomConfirmDialog: false, // Prevent double confirmation
=======
        if (session.isFreeTrial) {
            addSystemMessage(`This is a Free Trial session. You can send short messages (up to 75 characters) to the Listener.`);
        }

        zp.on('IMRecvCustomCommand', ({ fromUser, command }: { fromUser: { userID: string }, command: string }) => {
            if (fromUser.userID === String(session.listener.id)) {
                const cmdData = JSON.parse(command);
                if (cmdData.type === 'typing_status') {
                    setIsListenerTyping(cmdData.isTyping);
                    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                    if (cmdData.isTyping) {
                        typingTimeoutRef.current = window.setTimeout(() => setIsListenerTyping(false), 3000); // Hide after 3s
                    }
                }
            }
        });

        await zp.joinRoom({
          container: document.createElement('div'),
          showMyCameraToggleButton: false, showAudioVideoSettingsButton: false, showScreenSharingButton: false, showMicrophoneToggleButton: false,
          showPreJoinView: false, turnOnCameraWhenJoining: false, turnOnMicrophoneWhenJoining: false, showCallTimer: false, showLeaveRoomConfirmDialog: false,
>>>>>>> repo2/main
          onInRoomMessageReceived: (messageList: any[]) => {
              const newMessages: ChatMessage[] = messageList.map(msg => ({
                  id: msg.messageID,
                  text: msg.message,
                  sender: { uid: msg.fromUser.userID, name: msg.fromUser.userName },
                  timestamp: msg.sendTime,
<<<<<<< HEAD
=======
                  status: 'read'
>>>>>>> repo2/main
              }));
              setMessages(prev => [...prev, ...newMessages]);
          },
          onUserJoin: (users: any[]) => {
             if (users.some(u => u.userID === String(session.listener.id))) {
                  setStatus('connected');
<<<<<<< HEAD
                  if (!sessionStartTimeRef.current) {
                      sessionStartTimeRef.current = Date.now();
                      addSystemMessage(`${session.listener.name} ने चैट ज्वाइन कर लिया है।`);
                  }
=======
                  addSystemMessage(`${session.listener.name} has joined the chat.`);
>>>>>>> repo2/main
             }
          },
          onUserLeave: (users: any[]) => {
              if (users.some(u => u.userID === String(session.listener.id))) {
<<<<<<< HEAD
                  addSystemMessage(`${session.listener.name} ने चैट छोड़ दिया है।`);
=======
                  addSystemMessage(`${session.listener.name} has left the chat.`);
>>>>>>> repo2/main
                  setTimeout(() => handleLeave(true), 2000);
              }
          }
        });

        const remoteUsers = zp.getRemoteUsers();
<<<<<<< HEAD
        if (remoteUsers.length > 0 && remoteUsers.some((u: any) => u.userID === String(session.listener.id))) {
             setStatus('connected');
             sessionStartTimeRef.current = Date.now();
             addSystemMessage(`${session.listener.name} पहले से ही चैट में हैं।`);
        } else {
            setStatus('waiting');
            addSystemMessage(`आपने ${session.listener.name} के साथ चैट शुरू की है। उनके जुड़ने की प्रतीक्षा है...`);
=======
        if (remoteUsers.some((u: any) => u.userID === String(session.listener.id))) {
             setStatus('connected');
             addSystemMessage(`${session.listener.name} is already in the chat.`);
        } else {
            setStatus('waiting');
            addSystemMessage(`Chat started with ${session.listener.name}. Waiting for them to join...`);
>>>>>>> repo2/main
        }

      } catch (error) {
        console.error("Zego initialization failed", error);
        setStatus('error');
<<<<<<< HEAD
        addSystemMessage('कनेक्शन में एक त्रुटि हुई। कृपया पुन: प्रयास करें।');
=======
        addSystemMessage('A connection error occurred. Please try again.');
>>>>>>> repo2/main
        setTimeout(() => handleLeave(false), 3000);
      }
    };
    initZego();

    return () => {
<<<<<<< HEAD
      if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
      if (zpInstanceRef.current) {
        zpInstanceRef.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.associatedPlanId, user.uid, user.name, session.listener.id, session.listener.name]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && zpInstanceRef.current && status === 'connected') {
      try {
        await zpInstanceRef.current.sendRoomMessage(inputValue.trim());
        
        // Add message to local state immediately for better UX
        const localMessage: ChatMessage = {
            id: `local-${Date.now()}`,
            text: inputValue.trim(),
            sender: { uid: user.uid, name: user.name },
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, localMessage]);
        setInputValue('');

      } catch (error) {
        console.error('Failed to send message:', error);
        addSystemMessage('संदेश भेजने में विफल।');
      }
=======
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (zpInstanceRef.current) { zpInstanceRef.current.destroy(); }
    };
  }, [session.associatedPlanId, session.listener.id, session.listener.name, addSystemMessage, handleLeave, session.isFreeTrial]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !zpInstanceRef.current || status !== 'connected') return;

    const localMessageId = `local-${Date.now()}`;
    const textToSend = inputValue.trim();
    setInputValue('');

    const localMessage: ChatMessage = {
        id: localMessageId,
        text: textToSend,
        sender: { uid: user.uid, name: user.name },
        timestamp: Date.now(),
        status: 'sending'
    };
    setMessages(prev => [...prev, localMessage]);
    
    if (session.isFreeTrial) {
        if (textToSend.length > 75) {
            addSystemMessage("Free trial messages must be 75 characters or less.");
            setMessages(prev => prev.filter(m => m.id !== localMessageId));
            setInputValue(textToSend);
            return;
        }

        try {
            const useFreeMessage = functions.httpsCallable("useFreeMessage");
            await useFreeMessage();
            await zpInstanceRef.current.sendRoomMessage(textToSend);
            setMessages(prev => prev.map(m => m.id === localMessageId ? { ...m, status: 'sent' } : m));
            setSentMessagesCount(prev => prev + 1);
            setTimeout(() => setMessages(prev => prev.map(m => m.id === localMessageId ? { ...m, status: 'delivered' } : m)), 1000);
            setTimeout(() => setMessages(prev => prev.map(m => m.id === localMessageId ? { ...m, status: 'read' } : m)), 2500);
        } catch (error: any) {
            console.error('Failed to use free message:', error);
            setMessages(prev => prev.map(m => m.id === localMessageId ? { ...m, status: 'failed' } : m));
            addSystemMessage(error.message || 'Failed to send free message.');
            if (error.code === 'functions/failed-precondition') {
                addSystemMessage('You have used all your free messages. Please purchase a plan to continue chatting.');
                setTimeout(() => handleLeave(true), 3000);
            }
        }
        return;
    }

    try {
        const deductUsage = functions.httpsCallable("deductUsage");
        const result: any = await deductUsage({ type: 'chat', messages: 1, associatedPlanId: associatedPlanIdRef.current });
        
        if (result.data.planId && result.data.planId.startsWith('mt_session')) {
            associatedPlanIdRef.current = result.data.planId;
        }

        await zpInstanceRef.current.sendRoomMessage(textToSend);
        
        setMessages(prev => prev.map(m => m.id === localMessageId ? {...m, status: 'sent'} : m));
        setSentMessagesCount(prev => prev + 1);
        
        setTimeout(() => setMessages(prev => prev.map(m => m.id === localMessageId ? {...m, status: 'delivered'} : m)), 1000);
        setTimeout(() => setMessages(prev => prev.map(m => m.id === localMessageId ? {...m, status: 'read'} : m)), 2500);

    } catch (error: any) {
        console.error('Failed to send message or deduct balance:', error);
        setMessages(prev => prev.map(m => m.id === localMessageId ? {...m, status: 'failed'} : m));
        addSystemMessage(error.message || 'Failed to send message. Please check your balance.');
        if(error.code === 'functions/failed-precondition') {
             setTimeout(() => handleLeave(true), 3000);
        }
>>>>>>> repo2/main
    }
  };
  
  const listener = session.listener;

  const getStatusText = () => {
<<<<<<< HEAD
      switch (status) {
          case 'connecting': return 'कनेक्ट हो रहा है...';
          case 'waiting': return 'Listener की प्रतीक्षा है...';
          case 'connected': return 'ऑनलाइन';
          case 'error': return 'कनेक्शन में त्रुटि';
          case 'ended': return 'चैट समाप्त';
          default: return 'स्थिति अज्ञात';
=======
      if (isListenerTyping) return 'Listener is typing...';
      switch (status) {
          case 'connecting': return 'Connecting...';
          case 'waiting': return listener.online ? 'Waiting...' : 'Offline';
          case 'connected': return 'Online';
          case 'error': return 'Connection Error';
          case 'ended': return 'Chat Ended';
          default: return listener.online ? 'Online' : 'Offline';
>>>>>>> repo2/main
      }
  };
  
  const getStatusColor = () => {
<<<<<<< HEAD
       switch (status) {
          case 'connected': return 'text-green-600';
          case 'error':
          case 'ended':
             return 'text-red-600';
          default: return 'text-slate-500';
=======
       if (isListenerTyping) return 'text-yellow-600 dark:text-yellow-400';
       switch (status) {
          case 'connected': return 'text-green-600 dark:text-green-400';
          case 'error': case 'ended': return 'text-red-600 dark:text-red-400';
          default: return 'text-slate-500 dark:text-slate-400';
>>>>>>> repo2/main
      }
  };

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 bg-stone-100 dark:bg-slate-800 flex flex-col h-full" style={{backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`}}>
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-md z-10 flex items-center p-3 gap-3">
        <img src={listener.image} alt={listener.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" decoding="async"/>
        <div className="flex-grow">
          <h1 className="font-bold text-slate-800 dark:text-slate-200">{listener.name}</h1>
          <p className={`text-xs font-semibold ${getStatusColor()}`}>{getStatusText()}</p>
        </div>
        <div className="text-right">
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                {formatTime(remainingSeconds)}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">शेष समय</p>
        </div>
        <button 
          onClick={() => handleLeave(true)} 
          className="text-sm bg-red-100 text-red-700 font-semibold px-3 py-1.5 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900"
          aria-label="चैट समाप्त करें"
          disabled={status === 'ended'}
        >
            चैट समाप्त करें
=======
    <div className="fixed inset-0 bg-stone-100 dark:bg-slate-900 flex flex-col h-full" style={{backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`}}>
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-md z-10 flex items-center p-3 gap-3">
        <img 
            src={listener.image} 
            alt={listener.name} 
            className="w-10 h-10 rounded-full object-cover" 
            onError={() => setImageError(true)}
        />
        <div className="flex-grow">
            <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-slate-800 dark:text-slate-100">{listener.name}</h1>
                <VerifiedIcon className="w-5 h-5 text-blue-500" />
            </div>
          <p className={`text-xs font-semibold ${getStatusColor()}`}>{getStatusText()}</p>
        </div>
        <button 
          onClick={() => handleLeave(true)} 
          className="text-sm bg-red-100 text-red-700 font-semibold px-3 py-1.5 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900"
          aria-label="End Chat"
          disabled={status === 'ended'}
        >
            End Chat
>>>>>>> repo2/main
        </button>
      </header>

      {/* Messages Area */}
      <main className="flex-grow overflow-y-auto p-4 bg-transparent">
<<<<<<< HEAD
        <div className="flex flex-col gap-3">
          {messages.map((msg) => {
            const isSent = msg.sender.uid === user.uid;
            if(msg.sender.uid === 'system') {
                return (
                    <div key={msg.id} className="text-center my-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{msg.text}</span>
                    </div>
                )
            }
            return (
              <div key={msg.id} className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md p-3 rounded-xl ${isSent ? 'bg-[#dcf8c6] dark:bg-emerald-900 text-slate-800 dark:text-slate-200 rounded-tr-none' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-1 ${isSent ? 'text-green-950/70 dark:text-slate-400' : 'text-slate-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
=======
        <div className="flex flex-col gap-1">
          {messages.map((msg, index) => {
            const isSent = msg.sender.uid === user.uid;
            const prevMsg = messages[index - 1];
            const showDateSeparator = !prevMsg || !isSameDay(new Date(msg.timestamp), new Date(prevMsg.timestamp));
            
            return (
              <Fragment key={msg.id}>
                {showDateSeparator && (
                  <div className="text-center my-3">
                    <span className="bg-slate-200/80 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full dark:bg-slate-800/80 dark:text-slate-300 backdrop-blur-sm">
                      {formatDateSeparator(new Date(msg.timestamp))}
                    </span>
                  </div>
                )}
                {msg.sender.uid === 'system' ? (
                    <div className="text-center my-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{msg.text}</span>
                    </div>
                ) : (
                  <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-md p-2.5 rounded-xl flex flex-col ${isSent ? 'bg-[#dcf8c6] dark:bg-cyan-900 text-slate-800 dark:text-slate-100 rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm'}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      <div className="flex items-center self-end gap-1.5 mt-1 text-slate-500 dark:text-slate-400">
                          <span className="text-xs">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isSent && <MessageStatus status={msg.status} />}
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
>>>>>>> repo2/main
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </main>

<<<<<<< HEAD
      {/* Input Footer */}
      <footer className="bg-transparent p-2">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
            <div className="flex-grow bg-white dark:bg-slate-800 rounded-full flex items-center px-2 py-1 shadow-sm">
                <button type="button" className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                    <EmojiIcon className="w-6 h-6" />
                </button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={status === 'connected' ? "संदेश लिखें..." : "कनेक्ट होने की प्रतीक्षा करें..."}
                    className="flex-grow bg-transparent p-2 focus:outline-none text-slate-900 dark:text-white"
                    disabled={status !== 'connected'}
                />
                <button type="button" className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                    <AttachmentIcon className="w-6 h-6" />
                </button>
            </div>
          
            <button
                type={inputValue.trim() ? "submit" : "button"}
                className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-md disabled:bg-slate-500 disabled:cursor-not-allowed disabled:scale-100 shrink-0"
                disabled={status !== 'connected' || !inputValue.trim()}
                aria-label={inputValue.trim() ? "संदेश भेजें" : "ध्वनि संदेश"}
            >
                <div className="relative w-6 h-6">
                    <MicrophoneIcon className={`absolute inset-0 w-full h-full transition-all duration-300 ${inputValue.trim() ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
                    <SendIcon className={`absolute inset-0 w-full h-full transition-all duration-300 ${inputValue.trim() ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                </div>
            </button>
        </form>
      </footer>
=======
       <footer className="bg-transparent p-2 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <div className="flex-grow bg-white dark:bg-slate-900 rounded-2xl flex items-end px-3 py-1 shadow-sm min-w-0">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={status === 'connected' ? "Type a message..." : "Waiting to connect..."}
                            className="flex-grow bg-transparent p-2 focus:outline-none text-slate-900 dark:text-white resize-none max-h-28 overflow-y-auto"
                            disabled={status !== 'connected'}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                        />
                    </div>

                    <button
                        type={inputValue.trim() ? "submit" : "button"}
                        className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-md disabled:bg-slate-500 disabled:cursor-not-allowed disabled:scale-100 shrink-0"
                        disabled={status !== 'connected' || !inputValue.trim()}
                        aria-label={inputValue.trim() ? "Send Message" : "Voice Message"}
                    >
                        <div className="relative w-6 h-6">
                            <MicrophoneIcon className={`absolute inset-0 w-full h-full transition-all duration-300 ${inputValue.trim() ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
                            <SendIcon className={`absolute inset-0 w-full h-full transition-all duration-300 ${inputValue.trim() ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                        </div>
                    </button>
                </form>
            </footer>
>>>>>>> repo2/main
    </div>
  );
};

<<<<<<< HEAD
export default React.memo(ChatUI);
=======
export default React.memo(ChatUI);
>>>>>>> repo2/main
