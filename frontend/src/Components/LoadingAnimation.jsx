import { useState, useEffect } from "react";

const LoadingAnimation = () => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Set a timeout for the text to appear after all bars have animated
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 1500); // Adjust the time for the bars to finish before text animation starts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-0 animate-bar1"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[6.67%] animate-bar2"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[13.34%] animate-bar3"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[20.01%] animate-bar4"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[26.68%] animate-bar5"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[33.35%] animate-bar6"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[40.02%] animate-bar7"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[46.69%] animate-bar8"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[53.36%] animate-bar9"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[60.03%] animate-bar10"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[66.70%] animate-bar11"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[73.37%] animate-bar12"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[80.04%] animate-bar13"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[86.71%] animate-bar14"></div>
      <div className="bar bg-[#F3EBE5] w-[6.67%] h-full absolute bottom-0 left-[93.38%] animate-bar15"></div>

      {/* Text */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-6xl font-poppins font-bold text-black ${textVisible
            ? "opacity-100 transform scale-100"
            : "opacity-0 transform scale-110"
          } transition-all duration-1000`}>
        <span className="block opacity-0 animate-text1">Learn</span>
        <span className="block opacity-0 animate-text2">Lead</span>
        <span className="block opacity-0 animate-text3">Success</span>
      </div>
    </div>
  );
};

export  {LoadingAnimation};
