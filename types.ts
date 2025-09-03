<<<<<<< HEAD
export interface NavLink {
  label: string;
  href: string;
=======
export type ActiveView = 'home' | 'calls' | 'chats' | 'profile';

export interface ActivePlan {
  id: string;
  type: 'call' | 'chat';
  name: string;
  minutes?: number;
  messages?: number;
  price: number;
  purchaseTimestamp: number;
  expiryTimestamp: number;
}

export interface User {
  uid: string;
  name: string;
  email: string | null;
  mobile?: string;
  role?: 'admin' | 'listener';
  listenerId?: string;
  favoriteListeners?: number[];
  tokens?: number; // Replaces tokenBalance
  activePlans?: ActivePlan[]; // Replaces purchasedPlans subcollection
  freeMessagesRemaining?: number;
}

export interface Listener {
  id: number;
  name: string;
  image: string;
  online: boolean;
  rating: number;
  reviewsCount: number;
  gender: 'Male' | 'Female';
  age: number;
>>>>>>> repo2/main
}

export interface Plan {
  duration: string;
  price: number;
<<<<<<< HEAD
}

export interface FaqItem {
  question: string;
  answer: string;
  isPositive: boolean;
}

export interface Testimonial {
  name: string;
  quote: string;
  image: string;
}

export interface User {
  uid: string;
  name: string | null;
  email: string | null;
  role: 'user' | 'listener';
  mobile?: string;
  tokenBalance?: number;
}

export interface Listener {
  id: number;
  name:string;
  gender: 'F' | 'M';
  age: number;
  image: string;
  rating: number;
  reviewsCount: string;
}

export interface PurchasedPlan {
  id: string; // Firestore document ID
=======
  tierName?: string;
  // For the new DT plan structure
  type?: 'call' | 'chat';
  name?: string;
  minutes?: number;
  messages?: number;
}


export interface PurchasedPlan {
  id: string;
>>>>>>> repo2/main
  type: 'call' | 'chat';
  plan: Plan;
  purchaseTimestamp: number;
  expiryTimestamp: number;
<<<<<<< HEAD
  remainingSeconds: number; // Tracks remaining time in seconds
  totalSeconds: number; // Original total seconds for progress bar calculation
  listenerId: number | null; // Locks the plan to a listener if time remains
  planId?: 'daily_deal';
  validFromTimestamp?: number;
  isFreeTrial?: boolean;
  isTokenSession?: boolean;
}

export interface Session {
  type: 'call' | 'chat';
  listener: Listener;
  sessionDurationSeconds: number; // Renamed for clarity
  associatedPlanId: string;
}

export type CallSession = Session;
export type ChatSession = Session;

export interface ChatMessage {
    id: string;
    text: string;
    sender: {
        uid: string;
        name: string | null;
    };
    timestamp: number;
=======
  remainingSeconds?: number;
  totalSeconds?: number;
  remainingMessages?: number;
  totalMessages?: number;
  isTokenSession?: boolean;
  isFreeTrial?: boolean;
}

export interface ChatMessageSender {
    uid: string;
    name: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatMessageSender;
  timestamp: number;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}

export interface BaseSession {
    listener: Listener;
    plan: Plan; // This can be a simplified object now
    sessionDurationSeconds: number; // Max duration, not tied to a specific plan
    associatedPlanId: string;
    isTokenSession: boolean;
}

export interface CallSession extends BaseSession {
    type: 'call';
}

export interface ChatSession extends BaseSession {
    type: 'chat';
    isFreeTrial?: boolean;
}

export interface FaqItem {
    question: string;
    answer: string;
    isPositive: boolean;
>>>>>>> repo2/main
}