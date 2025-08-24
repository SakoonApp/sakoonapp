
import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { ChatSession, User, ChatMessage } from '../types';
import { fetchZegoToken } from '../utils/zego.ts';

declare global {
  interface Window {
    ZegoUIKitPrebuilt: any;
  }
}

interface ChatUIProps {
  session: ChatSession;
  user: User;
  onLeave: (success: boolean, consumedSeconds: number) => void;
}

// --- SVG Icons ---
const SendIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const MicrophoneIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
        <path d="M6 10.5a.75.75 0 01.75.75v.5a5.25 5.25 0 0010.5 0v-.5a.75.75 0 011.5 0v.5a6.75 6.75 0 01-13.5 0v-.5a.75.75 0 01.75-.75z" />
    </svg>
);

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


type ConnectionStatus = 'connecting' | 'waiting' | 'connected' | 'error' | 'ended';

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

  const addSystemMessage = useCallback((text: string) => {
      setMessages(prev => [...prev, {
          id: `system-${Date.now()}`,
          text,
          sender: { uid: 'system', name: 'System'},
          timestamp: Date.now()
      }]);
  }, []);

  const handleLeave = useCallback((isSuccess: boolean) => {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  // Zego setup effect
  useEffect(() => {
    let zp: any;
    const initZego = async () => {
      setStatus('connecting');
      try {
        const kitToken = await fetchZegoToken(session.associatedPlanId);
        zp = window.ZegoUIKitPrebuilt.create(kitToken);
        zpInstanceRef.current = zp;

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
          onInRoomMessageReceived: (messageList: any[]) => {
              const newMessages: ChatMessage[] = messageList.map(msg => ({
                  id: msg.messageID,
                  text: msg.message,
                  sender: { uid: msg.fromUser.userID, name: msg.fromUser.userName },
                  timestamp: msg.sendTime,
              }));
              setMessages(prev => [...prev, ...newMessages]);
          },
          onUserJoin: (users: any[]) => {
             if (users.some(u => u.userID === String(session.listener.id))) {
                  setStatus('connected');
                  if (!sessionStartTimeRef.current) {
                      sessionStartTimeRef.current = Date.now();
                      addSystemMessage(`${session.listener.name} ने चैट ज्वाइन कर लिया है।`);
                  }
             }
          },
          onUserLeave: (users: any[]) => {
              if (users.some(u => u.userID === String(session.listener.id))) {
                  addSystemMessage(`${session.listener.name} ने चैट छोड़ दिया है।`);
                  setTimeout(() => handleLeave(true), 2000);
              }
          }
        });

        const remoteUsers = zp.getRemoteUsers();
        if (remoteUsers.length > 0 && remoteUsers.some((u: any) => u.userID === String(session.listener.id))) {
             setStatus('connected');
             sessionStartTimeRef.current = Date.now();
             addSystemMessage(`${session.listener.name} पहले से ही चैट में हैं।`);
        } else {
            setStatus('waiting');
            addSystemMessage(`आपने ${session.listener.name} के साथ चैट शुरू की है। उनके जुड़ने की प्रतीक्षा है...`);
        }

      } catch (error) {
        console.error("Zego initialization failed", error);
        setStatus('error');
        addSystemMessage('कनेक्शन में एक त्रुटि हुई। कृपया पुन: प्रयास करें।');
        setTimeout(() => handleLeave(false), 3000);
      }
    };
    initZego();

    return () => {
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
    }
  };
  
  const listener = session.listener;

  const getStatusText = () => {
      switch (status) {
          case 'connecting': return 'कनेक्ट हो रहा है...';
          case 'waiting': return 'Listener की प्रतीक्षा है...';
          case 'connected': return 'ऑनलाइन';
          case 'error': return 'कनेक्शन में त्रुटि';
          case 'ended': return 'चैट समाप्त';
          default: return 'स्थिति अज्ञात';
      }
  };
  
  const getStatusColor = () => {
       switch (status) {
          case 'connected': return 'text-green-600';
          case 'error':
          case 'ended':
             return 'text-red-600';
          default: return 'text-slate-500';
      }
  };

  return (
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
        </button>
      </header>

      {/* Messages Area */}
      <main className="flex-grow overflow-y-auto p-4 bg-transparent">
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
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </main>

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
    </div>
  );
};

export default React.memo(ChatUI);
