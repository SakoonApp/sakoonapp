import React from 'react';

const Hero: React.FC = () => {

  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'wallet') {
      window.dispatchEvent(new CustomEvent('open-wallet'));
    } else {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback for cross-page navigation if plans are on another view
        // This part needs a more robust solution like a router or context if pages get complex
        const planButton = document.querySelector('button[aria-label="प्लान्स"]');
        if(planButton instanceof HTMLElement) planButton.click();
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative container mx-auto px-6 py-32 md:py-40 flex flex-col items-center justify-center text-center z-10 min-h-[50vh]">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
          SakoonApp
        </h2>
        <p className="text-xl md:text-2xl font-medium mb-4 text-cyan-200" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
          अकेलापन अब बीतेगा, सकून से जी पाएगा
        </p>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
          SakoonApp के ज़रिए जुड़िए उन लोगों से जो सुनते हैं... समझते हैं
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, 'services')}
            className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 shadow-xl hover:shadow-cyan-500/30"
          >
            सेवाएं देखें
          </a>
           <button
            onClick={(e) => handleScrollTo(e, 'wallet')}
            className="bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white/30 transition-transform transform hover:scale-105 shadow-xl"
          >
            मेरा वॉलेट
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);