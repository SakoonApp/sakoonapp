<<<<<<< HEAD

import type { Plan, FaqItem, Testimonial, Listener } from './types';

export const RAZORPAY_KEY_ID = 'rzp_test_R98ELJdTbUKDPz';

export const CALL_PLANS: Plan[] = [
  { duration: '5 मिनट', price: 50 },
  { duration: '10 मिनट', price: 90 },
  { duration: '15 मिनट', price: 130 },
  { duration: '30 मिनट', price: 250 },
  { duration: '1 घंटा', price: 450 },
];

export const CHAT_PLANS: Plan[] = [
  { duration: '5 मिनट', price: 20 },
  { duration: '10 मिनट', price: 35 },
  { duration: '15 मिनट', price: 50 },
  { duration: '30 मिनट', price: 90 },
  { duration: '1 घंटा', price: 150 },
];

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'क्या मेरी पहचान गोपनीय रहेगी?',
    answer: 'हां, आपकी पहचान पूरी तरह सुरक्षित और गुप्त रखी जाएगी।',
    isPositive: true,
  },
  {
    question: 'क्या मैं कभी भी कॉल कर सकता/सकती हूं?',
    answer: 'हां, SakoonApp 24x7 सेवा देता है।',
    isPositive: true,
  },
  {
    question: 'मुझे "डायरेक्ट टाइम प्लान" कब चुनना चाहिए और इसका लाभ कैसे उठाएं?',
    answer: 'अगर आप बिना किसी रुकावट के लंबी बात करना चाहते हैं, तो यह प्लान आपके लिए सबसे अच्छा है।\n1. **प्लान खरीदें:** \'होम\' पेज से अपनी जरूरत के अनुसार (जैसे 30 मिनट) का प्लान चुनें।\n2. **वॉलेट में देखें:** खरीदने के तुरंत बाद, यह प्लान आपके \'वॉलेट\' में आ जाएगा।\n3. **बात शुरू करें:** वॉलेट से प्लान चुनें और किसी भी उपलब्ध Listener से तुरंत कॉल या चैट शुरू करें। आपका समय तभी कटेगा जब आप असल में बात कर रहे होंगे।',
    isPositive: true,
  },
  {
    question: 'टोकन का क्या फायदा है और इसे कैसे इस्तेमाल करें?',
    answer: 'टोकन आपको छोटी-छोटी और कई बार बात करने की आज़ादी देते हैं।\n1. **टोकन खरीदें:** \'होम\' पेज पर \'टोकन वॉलेट\' सेक्शन से अपनी पसंद का टोकन पैक खरीदें।\n2. **तुरंत कनेक्ट हों:** जब भी बात करने का मन हो, \'Calls\' टैब पर जाएं और किसी भी Listener को सीधे कनेक्ट करें।\n3. **उपयोग के अनुसार भुगतान करें:** आपके बैलेंस से कॉल के लिए 2 टोकन/मिनट और चैट के लिए 1 टोकन/मिनट कटेंगे। यह छोटे सेशन के लिए एकदम सही है।',
    isPositive: true,
  },
  {
    question: 'डायरेक्ट टाइम प्लान का बचा हुआ समय कब तक वैध रहता है?',
    answer: 'यदि किसी भी कारण से आपका कॉल या चैट प्लान का समय पूरा उपयोग न हुआ हो, तो वह खरीदने की तारीख से 30 दिन तक वैध रहता है।',
    isPositive: true,
  },
  {
    question: 'क्या ये थेरेपी है?',
    answer: 'नहीं, यह प्रोफेशनल थेरेपी नहीं है, यह सिर्फ सुनने और भावनात्मक सपोर्ट देने वाला ऐप है।',
    isPositive: false,
  },
  {
    question: 'क्या एक बार में कई बार सेवा ले सकता हूं?',
    answer: 'हां, आप जितनी बार चाहें प्लान खरीद सकते हैं।',
    isPositive: true,
  },
];

export const LISTENERS_DATA: Listener[] = [
  {
    id: 1,
    name: 'रिया',
    gender: 'F',
    age: 22,
    image: 'https://images.pexels.com/photos/1164985/pexels-photo-1164985.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
    rating: 4.9,
    reviewsCount: '1.1K+',
  },
  {
    id: 2,
    name: 'स्नेहा',
    gender: 'F',
    age: 19,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
    rating: 4.8,
    reviewsCount: '900+',
  },
  {
    id: 3,
    name: 'मीरा',
    gender: 'F',
    age: 21,
    image: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
    rating: 4.9,
    reviewsCount: '1.5K+',
  },
  {
    id: 4,
    name: 'कविता',
    gender: 'F',
    age: 24,
    image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
    rating: 4.9,
    reviewsCount: '2.2K+',
  },
  {
    id: 5,
    name: 'पूजा',
    gender: 'F',
    age: 23,
    image: 'https://images.pexels.com/photos/3875217/pexels-photo-3875217.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
    rating: 4.8,
    reviewsCount: '700+',
  },
  {
    id: 6,
    name: 'आराध्या',
    gender: 'F',
    age: 25,
    image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
    rating: 4.9,
    reviewsCount: '980+',
  },
];


export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: 'प्रिया',
    quote: 'जब लगा कि कोई नहीं है, तब SakoonApp ने सहारा दिया। यहाँ बात करके बहुत हल्का महसूस हुआ। मैं अब अकेला महसूस नहीं करती।',
    image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
  },
  {
    name: 'पूजा',
    quote: 'गुमनाम रहकर अपनी बात कह पाना मेरे लिए बहुत बड़ी राहत थी। सुनने वाले बहुत धैर्यवान और समझदार थे। धन्यवाद SakoonApp!',
    image: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
  },
  {
    name: 'सनी',
    quote: 'मैं अक्सर काम के तनाव के कारण अकेला महसूस करता था। इस ऐप के जरिए किसी से बात करके मुझे नई उम्मीद और हिम्मत मिली है।',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&auto=format&fit=crop',
  },
=======
import type { Plan, FaqItem } from './types';

// Centralized array of listener images to ensure consistency.
export const LISTENER_IMAGES = [
    'https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1607346256330-1689574ce33b?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531746020798-57551c1bb8ae?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599425483443-5e1e2a5c4314?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=256&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&auto=format&fit=crop'
];


// Other application constants
export const AVATAR_EMOJIS = ['👨', '👩', '🎭', '🎪', '🎨', '🎵'];
export const QUICK_REPLIES = [
    "Hello, how can I help you today?",
    "I understand. Please give me a moment to look into this.",
    "Thank you for sharing. I'm here for you.",
    "Is there anything else I can help you with?",
];

export const RAZORPAY_KEY_ID = "rzp_test_RCbZCp07AHjMLM"; // Replace with your actual Razorpay Test Key ID

// NEW: Updated Plan structure for the new paymentService
export const CALL_PLANS: Plan[] = [
    { type: "call", name: "Bronze Pack", duration: "5 मिनट", minutes: 5, price: 50, tierName: 'Bronze Pack' },
    { type: "call", name: "Silver Pack", duration: "10 मिनट", minutes: 10, price: 100, tierName: 'Silver Pack' },
    { type: "call", name: "Gold Pack", duration: "15 मिनट", minutes: 15, price: 145, tierName: 'Gold Pack' },
    { type: "call", name: "Platinum Pack", duration: "30 मिनट", minutes: 30, price: 270, tierName: 'Platinum Pack' },
    { type: "call", name: "Diamond Pack", duration: "45 मिनट", minutes: 45, price: 410, tierName: 'Diamond Pack' },
    { type: "call", name: "Elite Pack", duration: "60 मिनट", minutes: 60, price: 540, tierName: 'Elite Pack' },
];

export const CHAT_PLANS: Plan[] = [
    { type: "chat", name: "Bronze Chat", duration: "5 मिनट", messages: 8, price: 20 },
    { type: "chat", name: "Silver Chat", duration: "10 मिनट", messages: 15, price: 36 },
    { type: "chat", name: "Gold Chat", duration: "15 मिनट", messages: 21, price: 50 },
    { type: "chat", name: "Platinum Chat", duration: "30 मिनट", messages: 40, price: 90 },
    { type: "chat", name: "Diamond Chat", duration: "45 मिनट", messages: 60, price: 135 },
    { type: "chat", name: "Elite Chat", duration: "60 मिनट", messages: 75, price: 170 },
];


export const FAQ_DATA: FaqItem[] = [
    {
        question: 'SakoonApp क्या है?',
        answer: 'SakoonApp एक ऐसा प्लेटफॉर्म है जहां आप अपनी भावनाओं को साझा करने और भावनात्मक समर्थन पाने के लिए प्रशिक्षित Listeners से जुड़ सकते हैं।',
        isPositive: true,
    },
    {
        question: 'क्या मेरी बातचीत गोपनीय रहती है?',
        answer: 'हाँ, आपकी सभी बातचीत पूरी तरह से गोपनीय और सुरक्षित हैं। हम आपकी गोपनीयता को गंभीरता से लेते हैं।',
        isPositive: true,
    },
    {
        question: 'क्या Listeners पेशेवर चिकित्सक हैं?',
        answer: 'नहीं, हमारे Listeners पेशेवर चिकित्सक या काउंसलर नहीं हैं। वे सहानुभूतिपूर्ण व्यक्ति हैं जिन्हें सक्रिय रूप से सुनने के लिए प्रशिक्षित किया गया है। वे चिकित्सा सलाह नहीं देते हैं।',
        isPositive: false,
    },
    {
        question: 'मैं एक प्लान कैसे खरीदूं?',
        answer: 'आप "होम" टैब पर जाकर कॉलिंग/चैट प्लान या MT प्लान खरीद सकते हैं। भुगतान सुरक्षित रूप से Razorpay के माध्यम से किया जाता है।',
        isPositive: true,
    },
    {
        question: 'MT और DT प्लान का उपयोग कैसे करें?',
        answer: `ऐप स्वचालित रूप से आपके लिए सबसे अच्छा विकल्प चुनता है! यहाँ नया नियम है:
1. **DT (डायरेक्ट टाइम) प्लान को प्राथमिकता:** अगर आपके पास कोई खरीदा हुआ DT प्लान (जैसे 30 मिनट का कॉल प्लान) है, तो ऐप **हमेशा पहले उसी का उपयोग करेगा**।
2. **MT का उपयोग:** MT का उपयोग **केवल तभी** किया जाएगा जब आपके पास कोई सक्रिय DT प्लान नहीं होगा।
   - **लागत:** कॉल के लिए **2 MT/मिनट** और चैट के लिए **1 MT में 2 मैसेज**।
इस सिस्टम से यह सुनिश्चित होता है कि आप हमेशा पहले अपने सबसे किफायती प्लान का उपयोग करें।`,
        isPositive: true,
    },
    {
        question: 'रिचार्ज या रिफंड में समस्या होने पर क्या करें?',
        answer: 'अगर आपका भुगतान हो गया है लेकिन प्लान या MT नहीं मिले हैं, तो चिंता न करें। आमतौर पर, पैसा 5-7 व्यावसायिक दिनों में अपने आप वापस आ जाता है। अगर ऐसा नहीं होता है, तो कृपया हमें अपनी भुगतान रसीद (transaction receipt) के साथ **appsakoon@gmail.com** पर ईमेल करें। हम आपकी तुरंत मदद करेंगे।',
        isPositive: true,
    },
];

export const TESTIMONIALS_DATA = [
    {
        name: 'प्रिया S.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quote: 'जब मैं अकेला महसूस कर रही थी, तब SakoonApp ने मुझे एक दोस्त दिया जिससे मैं बात कर सकती थी। इसने वास्तव में मेरी मदद की।',
    },
    {
        name: 'अमित K.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quote: 'बिना किसी जजमेंट के किसी से बात करना बहुत ताज़गी भरा था। Listener बहुत समझदार और सहायक थे।',
    },
    {
        name: 'सुनीता M.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=128&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quote: 'यह ऐप उन लोगों के लिए एक बेहतरीन पहल है जो सिर्फ अपने मन की बात कहना चाहते हैं। मैं इसकी बहुत सराहना करती हूँ।',
    },
>>>>>>> repo2/main
];
