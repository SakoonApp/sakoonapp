
import type { Plan, FaqItem, Testimonial, Listener } from './types';

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
    answer: 'अगर आप बिना किसी रुकावट के लंबी बात करना चाहते हैं, तो यह प्लान आपके लिए सबसे अच्छा है। 1. प्लान खरीदें: \'होम\' पेज से अपनी जरूरत के अनुसार (जैसे 30 मिनट) का प्लान चुनें। 2. वॉलेट में देखें: खरीदने के तुरंत बाद, यह प्लान आपके \'वॉलेट\' में आ जाएगा। 3. बात शुरू करें: वॉलेट से प्लान चुनें और किसी भी उपलब्ध Listener से तुरंत कॉल या चैट शुरू करें। आपका समय तभी कटेगा जब आप असल में बात कर रहे होंगे।',
    isPositive: true,
  },
  {
    question: 'टोकन का क्या फायदा है और इसे कैसे इस्तेमाल करें?',
    answer: 'टोकन आपको छोटी-छोटी और कई बार बात करने की आज़ादी देते हैं। 1. टोकन खरीदें: \'होम\' पेज पर \'टोकन वॉलेट\' सेक्शन से अपनी पसंद का टोकन पैक खरीदें। 2. तुरंत कनेक्ट हों: जब भी बात करने का मन हो, \'Calls\' टैब पर जाएं और किसी भी Listener को सीधे कनेक्ट करें। 3. उपयोग के अनुसार भुगतान करें: आपके बैलेंस से कॉल के लिए 2 टोकन/मिनट और चैट के लिए 1 टोकन/मिनट कटेंगे। यह छोटे सेशन के लिए एकदम सही है।',
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
    image: 'https://unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&auto=format&fit=crop',
  },
];
