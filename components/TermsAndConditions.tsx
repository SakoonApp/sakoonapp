
import React from 'react';

interface TermsAndConditionsProps {
  onClose: () => void;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
<<<<<<< HEAD
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
            📘 उपयोग की शर्तें
=======
        className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            📘 Terms & Conditions
>>>>>>> repo2/main
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label="Close"
          >
            <CloseIcon className="w-8 h-8" />
          </button>
        </div>

<<<<<<< HEAD
        <div className="p-6 md:p-8 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="font-semibold">प्रभावी तिथि: 1 अगस्त 2025</p>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">1. प्लेटफ़ॉर्म का उद्देश्य और होस्ट की भूमिका</h3>
              <p>SakoonApp उपयोगकर्ताओं और होस्ट्स के बीच सुरक्षित व सकारात्मक संवाद का माध्यम है। होस्ट्स को उपयोगकर्ताओं से सम्मानपूर्वक, संवेदनशीलता के साथ व्यवहार करना होगा।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">2. होस्ट के लिए आचरण की शर्तें:</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>पेशेवरता बनाए रखें:</strong> उचित भाषा और शिष्ट व्यवहार आवश्यक है।</li>
                  <li><strong>सकारात्मक व प्रासंगिक सामग्री:</strong> समुदाय के मानदंडों के अनुसार सामग्री साझा करें।</li>
                  <li><strong>प्राइवेसी का सम्मान करें:</strong> व्यक्तिगत जानकारी साझा न करें या पूछें।</li>
=======
        <div className="p-6 md:p-8 space-y-4 text-slate-700 dark:text-slate-200 leading-relaxed">
            <p className="font-semibold">प्रभावी तिथि: 1 अगस्त 2025</p>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">1. हमारी सेवाएं (Our Services)</h3>
              <p>SakoonApp आपको भावनात्मक समर्थन और अपनी बात साझा करने के लिए प्रशिक्षित 'Listeners' से जुड़ने का एक मंच प्रदान करता है। कृपया ध्यान दें कि हमारे Listeners पेशेवर चिकित्सक, मनोवैज्ञानिक या चिकित्सा पेशेवर नहीं हैं। वे चिकित्सा सलाह, निदान या उपचार प्रदान नहीं करते हैं।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">2. उपयोगकर्ता की जिम्मेदारियां (User Responsibilities)</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>आप सभी Listeners और अन्य उपयोगकर्ताओं के साथ सम्मान और शिष्टाचार से पेश आने के लिए सहमत हैं।</li>
                  <li>आप किसी भी प्रकार की अनुचित, अपमानजनक, या आपत्तिजनक भाषा या व्यवहार में शामिल नहीं होंगे।</li>
                  <li>आप अपनी खाता जानकारी की सुरक्षा के लिए जिम्मेदार हैं।</li>
>>>>>>> repo2/main
              </ul>
            </div>

            <div>
<<<<<<< HEAD
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">3. निषिद्ध गतिविधियाँ:</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>धमकी, गाली-गलौज, अश्लीलता या किसी प्रकार का उत्पीड़न</li>
                  <li>जाति, धर्म, लिंग, भाषा आदि के आधार पर भेदभाव</li>
                  <li>ऑफ-प्लेटफ़ॉर्म संपर्क को बढ़ावा देना</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">4. रिपोर्टिंग और सुरक्षा:</h3>
              <p>ऐप में रिपोर्ट फीचर के माध्यम से अनुचित व्यवहार की रिपोर्ट करें। बाल सुरक्षा के लिए हम CSAM (बाल यौन शोषण सामग्री) के विरुद्ध सख्त कदम उठाते हैं।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">5. डेटा सुरक्षा:</h3>
              <p>किसी भी यूज़र की व्यक्तिगत जानकारी रिकॉर्ड या साझा करना प्रतिबंधित है।</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">6. भुगतान और उपहार:</h3>
              <p>यूज़र द्वारा भेजे गए वर्चुअल गिफ्ट सिर्फ आभार के प्रतीक हैं, पैसे की अपेक्षा नहीं की जा सकती।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">7. दायित्व की सीमा:</h3>
              <p>कंपनी सिर्फ एक मंच प्रदान करती है; होस्ट और यूज़र के बीच की बातचीत पर जिम्मेदारी नहीं लेती।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">8. खाता निलंबन/समाप्ति:</h3>
              <p>नियमों का उल्लंघन करने पर खाता अस्थायी या स्थायी रूप से निलंबित किया जा सकता है।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">9. नियमों में परिवर्तन:</h3>
              <p>समय-समय पर अपडेट किए जा सकते हैं। जारी उपयोग का अर्थ होगा सहमति।</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">10. सहमति की पुष्टि:</h3>
              <p>"मैं सहमत हूँ" बटन पर क्लिक करके आप इन शर्तों को स्वीकार करते हैं और मानते हैं कि आपने इन्हें पढ़ा और समझा है।</p>
            </div>
        </div>
        
        <div className="sticky bottom-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 text-right border-t border-slate-200 dark:border-slate-700">
=======
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">3. प्लान और टोकन खरीदना (Purchasing Plans & Tokens)</h3>
              <p>आप ऐप के माध्यम से कॉलिंग मिनट, चैट संदेशों (DT Plans के रूप में) या टोकन खरीद सकते हैं। सभी खरीदारियां अंतिम हैं और आमतौर पर गैर-वापसी योग्य होती हैं। खरीदे गए DT प्लान की वैधता खरीदने की तारीख से 30 दिनों तक होती है, जिसके बाद अप्रयुक्त लाभ समाप्त हो जाएगा।</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">4. गोपनीयता (Privacy)</h3>
              <p>आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। आपकी कॉल या चैट पूरी तरह से आपके और Listener के बीच गोपनीय रहती है। SakoonApp आपकी बातचीत को रिकॉर्ड या संग्रहीत नहीं करता है। हम आपकी जानकारी कैसे एकत्र और उपयोग करते हैं, इस बारे में अधिक जानकारी के लिए कृपया हमारी गोपनीयता नीति पढ़ें।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">5. निषिद्ध गतिविधियाँ (Prohibited Activities)</h3>
              <p>आप इस प्लेटफ़ॉर्म का उपयोग किसी भी अवैध, धमकी भरे, उत्पीड़न करने वाले या हानिकारक उद्देश्य के लिए नहीं करेंगे। नियमों का उल्लंघन करने पर आपका खाता बिना किसी पूर्व सूचना के अस्थायी या स्थायी रूप से निलंबित किया जा सकता है।</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">6. धनवापसी नीति (Refund Policy)</h3>
              <p>आम तौर पर, सभी खरीदारियां गैर-वापसी योग्य होती हैं। भुगतान विफलता या तकनीकी समस्याओं जैसे असाधारण मामलों के लिए, कृपया हमारी रद्दीकरण/धनवापसी नीति देखें या सहायता के लिए हमसे संपर्क करें।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">7. शर्तों में बदलाव (Changes to Terms)</h3>
              <p>SakoonApp किसी भी समय इन नियमों और शर्तों को संशोधित करने का अधिकार सुरक्षित रखता है। हम आपको महत्वपूर्ण परिवर्तनों के बारे में सूचित करेंगे। ऐप का उपयोग जारी रखने का मतलब है कि आप संशोधित शर्तों से सहमत हैं।</p>
            </div>
        </div>
        
        <div className="sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 text-right border-t border-slate-200 dark:border-slate-800">
>>>>>>> repo2/main
             <button
                onClick={onClose}
                className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 transition-colors"
             >
                बंद करें
             </button>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default TermsAndConditions;
=======
export default TermsAndConditions;
>>>>>>> repo2/main
