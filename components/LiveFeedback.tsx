
import React, { useState, useEffect } from 'react';

// Data for simulation
const feedbackNames = [
  'प्रिया', 'राहुल', 'अंजलि', 'विक्रम', 'पूजा', 'रोहन', 'स्नेहा', 'अमित', 'नेहा', 'आदित्य', 
  'कविता', 'मोहित', 'सोनिया', 'विशाल', 'दिव्या', 'करण', 'आरती', 'संदीप', 'मीना', 'पंकज', 
  'रश्मि', 'गौरव', 'सीमा', 'दीपक', 'सपना', 'सचिन', 'मनीषा', 'वरुण', 'निशा', 'अजय'
];

const positiveMessages = [
  "यहाँ बात करके बहुत शांति मिली।",
  "लगता है जैसे मन का बोझ उतर गया। धन्यवाद!",
  "सुनने वाले बहुत समझदार और धैर्यवान हैं।",
  "मैं अब बहुत बेहतर महसूस कर रहा हूँ।",
  "यह एक अद्भुत और सुरक्षित प्लेटफॉर्म है।",
  "SakoonApp ने वाकई में सकून दिया।",
  "अकेलेपन में एक सच्चा साथी मिला।",
  "मेरी सारी चिंताएं कुछ ही मिनटों में कम हो गईं।",
  "बहुत ही सकारात्मक और मददगार अनुभव रहा।",
  "मैं इसकी सिफारिश अपने दोस्तों को जरूर करूंगा/करूंगी।",
  "गुमनाम रहना बहुत बड़ी सुविधा है।",
  "तुरंत किसी से बात कर पाना बहुत अच्छा लगा।",
  "एकदम प्रोफेशनल और सहायक लोग।",
  "मेरा दिन बन गया, धन्यवाद SakoonApp!",
  "तनाव से बाहर निकलने में बहुत मदद मिली।"
];

const obscureName = (name: string): string => {
  if (name.length <= 2) {
    return `${name.charAt(0)}***`;
  }
  return `${name.charAt(0)}***${name.charAt(name.length - 1)}`;
};

interface CurrentFeedback {
    name: string;
    quote: string;
}

const LiveFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<CurrentFeedback | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showRandomFeedback = () => {
      setIsVisible(false); // Start fade-out

      // After fade-out, change content and fade back in
      setTimeout(() => {
        const randomName = feedbackNames[Math.floor(Math.random() * feedbackNames.length)];
        const randomQuote = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
        setFeedback({
          name: obscureName(randomName),
          quote: randomQuote
        });
        setIsVisible(true); // Start fade-in
      }, 500); // This should match the transition duration
    };

    // Show initial feedback
    showRandomFeedback();

    const intervalId = setInterval(showRandomFeedback, 8000); // Cycle every 8 seconds for smoother experience

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-cyan-50 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30">
        <div className="container mx-auto px-6">
            <div className="h-24 flex items-center justify-center">
                {feedback && (
                <div 
                    className={`w-full max-w-xl bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 mx-auto transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                    <p className="text-center text-slate-700 dark:text-slate-300 text-md italic">"{feedback.quote}"</p>
                    <p className="text-right text-cyan-700 dark:text-cyan-400 font-semibold mt-2">- {feedback.name}</p>
                </div>
                )}
            </div>
        </div>
    </section>
  );
};

export default React.memo(LiveFeedback);