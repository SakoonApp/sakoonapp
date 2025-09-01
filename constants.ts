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


// FIX: Added missing constants required by multiple components.

export const RAZORPAY_KEY_ID = "rzp_test_gV1tLH2ZnCWti9"; // Replace with your actual Razorpay Test Key ID

export const CALL_PLANS: Plan[] = [
    { duration: '5 मिनट', price: 50, tierName: 'Bronze Pack' },
    { duration: '10 मिनट', price: 100, tierName: 'Silver Pack' },
    { duration: '15 मिनट', price: 145, tierName: 'Gold Pack' },
    { duration: '30 मिनट', price: 270, tierName: 'Platinum Pack' },
    { duration: '45 मिनट', price: 410, tierName: 'Diamond Pack' },
    { duration: '60 मिनट', price: 540, tierName: 'Elite Pack' },
];

export const CHAT_PLANS: Plan[] = [
    { duration: '5 मिनट', price: 20 },
    { duration: '10 मिनट', price: 36 },
    { duration: '15 मिनट', price: 50 },
    { duration: '30 मिनट', price: 90 },
    { duration: '45 मिनट', price: 135 },
    { duration: '60 मिनट', price: 170 },
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
        answer: 'आप "होम" टैब पर जाकर कॉलिंग/चैट प्लान या टोकन पैक खरीद सकते हैं। भुगतान सुरक्षित रूप से Razorpay के माध्यम से किया जाता है।',
        isPositive: true,
    },
    {
        question: 'टोकन और DT प्लान का उपयोग कैसे करें?',
        answer: `यह बहुत आसान है! यहाँ बताया गया है कि दोनों कैसे काम करते हैं:
1. **DT (डायरेक्ट टाइम) प्लान:** ये **लंबी, बिना रुकावट की बातचीत** के लिए सबसे अच्छे हैं।
   - **कैसे खरीदें:** होम पेज से अपनी पसंद का DT प्लान (जैसे 30 मिनट) खरीदें।
   - **कैसे उपयोग करें:** किसी भी Listener से बात करने के लिए, अपना खरीदा हुआ प्लान चुनें। आपका समय तभी कटेगा जब आप बात कर रहे होंगे।
2. **टोकन:** ये **छोटी-छोटी या कई बार बात करने** के लिए बहुत सुविधाजनक हैं।
   - **कैसे खरीदें:** होम पेज से टोकन पैक खरीदें।
   - **कैसे उपयोग करें:** किसी भी Listener से सीधे कॉल या चैट करें। आपके टोकन अपने आप कट जाएंगे (कॉल के लिए **2 टोकन/मिनट** और चैट के लिए **1 टोकन में 2 मैसेज**)।`,
        isPositive: true,
    },
    {
        question: 'रिचार्ज या रिफंड में समस्या होने पर क्या करें?',
        answer: 'अगर आपका भुगतान हो गया है लेकिन प्लान या टोकन नहीं मिले हैं, तो चिंता न करें। आमतौर पर, पैसा 5-7 व्यावसायिक दिनों में अपने आप वापस आ जाता है। अगर ऐसा नहीं होता है, तो कृपया हमें अपनी भुगतान रसीद (transaction receipt) के साथ **appsakoon@gmail.com** पर ईमेल करें। हम आपकी तुरंत मदद करेंगे।',
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
];