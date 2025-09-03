<<<<<<< HEAD

import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { CallSession, User } from '../types';
import { fetchZegoToken } from '../utils/zego.ts';
=======
import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { CallSession, User } from '../types';
import { fetchZegoToken } from '../utils/zego.ts';
import { LISTENER_IMAGES } from '../constants';
>>>>>>> repo2/main

declare global {
  interface Window {
    ZegoUIKitPrebuilt: any;
  }
}

interface CallUIProps {
  session: CallSession;
  user: User;
  onLeave: (success: boolean, consumedSeconds: number) => void;
}

// --- SVG Icons ---
const MicOnIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
        <path d="M6 10.5a.75.75 0 01.75.75v.5a5.25 5.25 0 0010.5 0v-.5a.75.75 0 011.5 0v.5a6.75 6.75 0 01-13.5 0v-.5a.75.75 0 01.75-.75z" />
    </svg>
);
<<<<<<< HEAD

=======
>>>>>>> repo2/main
const MicOffIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 7.5a3.75 3.75 0 10-7.5 0v4.125c0 .359.043.71.124 1.052l-2.003-2.003a.75.75 0 00-1.06 1.06l10.5 10.5a.75.75 0 001.06-1.06L8.18 10.251A3.743 3.743 0 008.25 10V7.5z" />
      <path d="M6 10.5a.75.75 0 01.75.75v.5a5.25 5.25 0 004.426 5.176l-2.133-2.133a.75.75 0 00-1.061 1.06l3.36 3.359a.75.75 0 001.06 0l2.122-2.122a.75.75 0 00-1.06-1.061l-1.09.091a5.25 5.25 0 004.28-4.437v-.5a.75.75 0 011.5 0v.5a6.75 6.75 0 01-12.016-3.868l.016.002z" />
    </svg>
);
<<<<<<< HEAD

=======
>>>>>>> repo2/main
const EndCallIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.298-.083.465a7.48 7.48 0 003.429 3.429c.167.081.364.052.465-.083l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C6.542 22.5 1.5 17.458 1.5 9.75V4.5z" clipRule="evenodd" />
    </svg>
);
<<<<<<< HEAD

=======
>>>>>>> repo2/main
const SpeakerOnIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);
<<<<<<< HEAD

=======
>>>>>>> repo2/main
const SpeakerOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25-2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

type ConnectionStatus = 'connecting' | 'waiting' | 'connected' | 'error' | 'ended';

const CallUI: React.FC<CallUIProps> = ({ session, user, onLeave }) => {
  const zpInstanceRef = useRef<any>(null);
  const sessionStartTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
<<<<<<< HEAD
=======
  const hasLeftRef = useRef(false);
>>>>>>> repo2/main

  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(session.sessionDurationSeconds);
<<<<<<< HEAD
  
  const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

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
    handleLeave(true);
  }, [handleLeave]);

  // Timer effect
=======
  const [imageError, setImageError] = useState(false);
  
  const onLeaveRef = useRef(onLeave);
  useEffect(() => {
    onLeaveRef.current = onLeave;
  }, [onLeave]);

  const handleLeave = useCallback((isSuccess: boolean) => {
    if (hasLeftRef.current) return;
    hasLeftRef.current = true;

    setStatus('ended');
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
    }
    
    const startTime = sessionStartTimeRef.current;
    const consumedSeconds = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    onLeaveRef.current(isSuccess, consumedSeconds);
  }, []);

  const endCall = useCallback(() => {
    if (zpInstanceRef.current) {
      zpInstanceRef.current.destroy();
    } else {
      handleLeave(true);
    }
  }, [handleLeave]);

>>>>>>> repo2/main
  useEffect(() => {
    if (status === 'connected' && sessionStartTimeRef.current !== null) {
      const sessionExpiryTime = sessionStartTimeRef.current + session.sessionDurationSeconds * 1000;
      
      timerIntervalRef.current = window.setInterval(() => {
        const newRemaining = Math.round((sessionExpiryTime - Date.now()) / 1000);
        setRemainingSeconds(newRemaining);
        if (newRemaining <= 0) {
<<<<<<< HEAD
          endSessionDueToTime();
=======
          endCall();
>>>>>>> repo2/main
        }
      }, 1000);
    }
    
    return () => {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
      }
    };
<<<<<<< HEAD
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

            zp.joinRoom({
                container: document.createElement('div'), // Hidden container
=======
  }, [status, session.sessionDurationSeconds, endCall]);

  useEffect(() => {
    let isComponentMounted = true;

    const initZego = async () => {
        if (!isComponentMounted) return;
        setStatus('connecting');
        
        try {
            const kitToken = await fetchZegoToken(session.associatedPlanId);
            if (!isComponentMounted) return;

            const zp = window.ZegoUIKitPrebuilt.create(kitToken);
            zpInstanceRef.current = zp;

            // FIX: This ensures the underlying engine is exposed for speaker control.
            await zp.addPlugins({ ZegoUIKitPrebuilt: window.ZegoUIKitPrebuilt });

            zp.joinRoom({
                container: document.createElement('div'),
>>>>>>> repo2/main
                scenario: { mode: window.ZegoUIKitPrebuilt.VoiceCall },
                showPreJoinView: false,
                showScreenSharingButton: false,
                showChatRoom: false,
                showMyCameraToggleButton: false,
                showAudioVideoSettingsButton: false,
                showPinButton: false,
                showOtherUserCameraToggleButton: false,
                showOtherUserPinButton: false,
                showLayoutButton: false,
                showNonVideoUser: false,
                showRoomDetailsButton: false,
<<<<<<< HEAD
                showSpeakerButton: false, // We control it manually
=======
                // We control speaker button manually now
                showSpeakerButton: false, 
>>>>>>> repo2/main
                showLeaveRoomConfirmDialog: false,
                
                onLeaveRoom: () => handleLeave(true),
                onUserJoin: (users: any[]) => {
<<<<<<< HEAD
                    if (users.some(u => u.userID === String(session.listener.id))) {
=======
                    if (isComponentMounted && users.some(u => u.userID === String(session.listener.id))) {
>>>>>>> repo2/main
                        setStatus('connected');
                        if (!sessionStartTimeRef.current) {
                            sessionStartTimeRef.current = Date.now();
                        }
                    }
                },
                onUserLeave: (users: any[]) => {
                    if (users.some(u => u.userID === String(session.listener.id))) {
                        handleLeave(true);
                    }
                },
            });
            
<<<<<<< HEAD
            const remoteUsers = zp.getRemoteUsers();
            if (remoteUsers.length > 0 && remoteUsers.some((u: any) => u.userID === String(session.listener.id))) {
                setStatus('connected');
                sessionStartTimeRef.current = Date.now();
            } else {
                setStatus('waiting');
            }
        } catch (error) {
            console.error("Zego initialization failed", error);
            setStatus('error');
            setTimeout(() => onLeave(false, 0), 2000); // Inform App about connection failure after a short delay
=======
            if (isComponentMounted) {
                const remoteUsers = zp.getRemoteUsers();
                if (remoteUsers.length > 0 && remoteUsers.some((u: any) => u.userID === String(session.listener.id))) {
                    setStatus('connected');
                    sessionStartTimeRef.current = Date.now();
                } else {
                    setStatus('waiting');
                }
            }
        } catch (error) {
            console.error("Zego initialization failed", error);
            if (isComponentMounted) {
                setStatus('error');
            }
>>>>>>> repo2/main
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
  }, [session.associatedPlanId, onLeave, session.listener.id, handleLeave]);
=======
      isComponentMounted = false;
      if (zpInstanceRef.current) {
        zpInstanceRef.current.destroy();
        zpInstanceRef.current = null;
      }
    };
  }, [session.associatedPlanId, session.listener.id, handleLeave]);
>>>>>>> repo2/main

  const toggleMute = () => {
    if (!zpInstanceRef.current) return;
    const newMutedState = !isMuted;
    zpInstanceRef.current.muteMicrophone(newMutedState);
    setIsMuted(newMutedState);
  };
  
  const toggleSpeaker = () => {
<<<<<<< HEAD
    setIsSpeakerOn(prevState => !prevState);
  };
  
  const listener = session.listener;
  
  const getStatusText = () => {
      switch(status) {
          case 'connecting': return 'कनेक्ट हो रहा है...';
          case 'waiting': return 'Listener की प्रतीक्षा है...';
          case 'connected': return 'कनेक्टेड';
          case 'error': return 'कनेक्शन में त्रुटि';
          case 'ended': return 'कॉल समाप्त';
          default: return 'स्थिति अज्ञात';
      }
  };

  return (
    <div 
        className="fixed inset-0 bg-slate-900 text-white flex flex-col items-center justify-between p-8"
        style={{backgroundImage: `url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)`, backgroundSize: 'cover', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(2, 6, 23, 0.8)'}}
    >
        {/* Top Section: Listener Info */}
        <div className="text-center pt-12">
            <img 
                src={listener.image} 
                alt={listener.name}
                className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white/20 mb-4 mx-auto"
                loading="lazy" decoding="async"
            />
            <h1 className="text-4xl font-bold">{listener.name}</h1>
            <p className="text-xl text-slate-300 mt-2">
                {getStatusText()}
            </p>
        </div>

        {/* Middle Section: Timer */}
        <div className="text-6xl font-mono font-bold text-white tracking-widest bg-black/30 px-6 py-2 rounded-lg">
            {formatTime(remainingSeconds)}
        </div>

        {/* Bottom Section: Controls */}
        <div className="w-full max-w-sm flex justify-around items-center bg-black/50 backdrop-blur-sm p-4 rounded-full">
            <button 
                onClick={toggleMute}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-white text-slate-800' : 'bg-white/20 text-white'}`}
                aria-label={isMuted ? "अनम्यूट करें" : "म्यूट करें"}
            >
                {isMuted ? <MicOffIcon className="w-8 h-8"/> : <MicOnIcon className="w-8 h-8"/>}
            </button>
            <button 
                onClick={() => handleLeave(true)}
                disabled={status === 'ended'}
                className="w-20 h-20 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 disabled:bg-red-800 disabled:scale-100"
                aria-label="कॉल समाप्त करें"
            >
                <EndCallIcon className="w-10 h-10" />
            </button>
             <button 
                onClick={toggleSpeaker}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isSpeakerOn ? 'bg-white text-slate-800' : 'bg-white/20 text-white'}`}
                aria-label={isSpeakerOn ? "स्पीकर बंद करें" : "स्पीकर चालू करें"}
            >
                {isSpeakerOn ? <SpeakerOnIcon className="w-8 h-8"/> : <SpeakerOffIcon className="w-8 h-8"/>}
            </button>
=======
    if (!zpInstanceRef.current || !zpInstanceRef.current.zego) return;
    const newSpeakerState = !isSpeakerOn;
    try {
        // FIX: This is the correct way to toggle the speaker using the underlying engine.
        zpInstanceRef.current.zego.useSpeaker(newSpeakerState);
        setIsSpeakerOn(newSpeakerState);
    } catch(e) {
        console.warn("Speaker toggle failed.", e);
    }
  };
  
  const listener = session.listener;
  const listenerImage = LISTENER_IMAGES[listener.id % LISTENER_IMAGES.length];
  
  const getStatusText = () => {
      switch(status) {
          case 'connecting': return 'Connecting...';
          case 'waiting': return 'Waiting for Listener...';
          case 'connected': return 'Connected';
          case 'error': return 'Connection Failed';
          case 'ended': return 'Call Ended';
          default: return 'Unknown Status';
      }
  };

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const isTimerAlert = status === 'connected' && remainingSeconds <= 30;

  if (status === 'error') {
    return (
        <div className="fixed inset-0 bg-slate-900 text-white flex flex-col items-center justify-center p-8 z-50 animate-fade-in">
             <div className="text-center">
                <h1 className="text-3xl font-bold text-red-400">Connection Failed</h1>
                <p className="text-slate-400 mt-2">Could not connect to the call. Please check your internet connection and try again.</p>
                <button 
                    onClick={() => handleLeave(false)}
                    className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    )
  }

  return (
    <div 
        className="fixed inset-0 bg-slate-900 text-white flex flex-col items-center justify-between p-8 z-50 transition-all duration-500 animate-fade-in"
        style={{
            backgroundImage: `url(${imageError ? 'https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg' : listenerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center flex-grow">
            <div className="relative mb-6">
                {(status === 'connecting' || status === 'waiting') && (
                    <div className="absolute -inset-2 rounded-full border-4 border-cyan-500/50 animate-pulse"></div>
                )}
                <div className="relative w-40 h-40">
                    <img 
                        src={listenerImage} 
                        alt={listener.name}
                        className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-white/20"
                        loading="lazy" decoding="async"
                        onError={() => setImageError(true)}
                    />
                </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight">{listener.name}</h1>
            <p className="text-lg text-slate-400 mt-1 bg-black/20 px-3 py-1 rounded-full">
                {session.isTokenSession ? 'MT Session' : `${session.plan.duration} Plan`}
            </p>
            <p className={`text-xl text-slate-300 mt-4 transition-all duration-300 font-mono p-2 rounded-lg ${isTimerAlert ? 'bg-red-500/80 animate-pulse' : ''}`}>
                {status === 'connected' ? formatTime(remainingSeconds) : getStatusText()}
            </p>
        </div>

        {/* Bottom Section: Controls */}
        <div className="relative z-10 w-full max-w-sm flex justify-around items-center mb-4">
            <div className="flex flex-col items-center group">
                <button 
                    onClick={toggleSpeaker}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${isSpeakerOn ? 'bg-cyan-500' : 'bg-slate-800/60 group-hover:bg-slate-800/90'}`}
                    aria-label={isSpeakerOn ? "Turn Speaker Off" : "Turn Speaker On"}
                >
                    {isSpeakerOn ? <SpeakerOnIcon className="w-8 h-8"/> : <SpeakerOffIcon className="w-8 h-8"/>}
                </button>
                <span className="mt-2 text-sm text-slate-300">Speaker</span>
            </div>
            
             <button 
                onClick={endCall}
                disabled={status === 'ended'}
                className="w-20 h-20 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-105 disabled:bg-red-800 disabled:scale-100"
                aria-label="End Call"
            >
                <EndCallIcon className="w-10 h-10" />
            </button>
            
            <div className="flex flex-col items-center group">
                 <button 
                    onClick={toggleMute}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${isMuted ? 'bg-yellow-500' : 'bg-slate-800/60 group-hover:bg-slate-800/90'}`}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <MicOffIcon className="w-8 h-8"/> : <MicOnIcon className="w-8 h-8"/>}
                </button>
                <span className="mt-2 text-sm text-slate-300">Mute</span>
            </div>
>>>>>>> repo2/main
        </div>
    </div>
  );
};

<<<<<<< HEAD
export default React.memo(CallUI);
=======
export default React.memo(CallUI);
>>>>>>> repo2/main
