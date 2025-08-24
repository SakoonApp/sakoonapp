export interface NavLink {
  label: string;
  href: string;
}

export interface Plan {
  duration: string;
  price: number;
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
}

export interface Listener {
  id: number;
  name:string;
  gender: 'F' | 'M';
  age: number;
  image: string;
  rating: number;
  reviewsCount: string;
  experienceHours: string;
}

export interface PurchasedPlan {
  id: string; // Firestore document ID
  type: 'call' | 'chat';
  plan: Plan;
  purchaseTimestamp: number;
  expiryTimestamp: number;
  remainingSeconds: number; // Tracks remaining time in seconds
  totalSeconds: number; // Original total seconds for progress bar calculation
  listenerId: number | null; // Locks the plan to a listener if time remains
  planId?: 'daily_deal';
  validFromTimestamp?: number;
  isFreeTrial?: boolean;
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
}
