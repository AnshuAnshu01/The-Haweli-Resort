import React, { useEffect, useState } from 'react';
import { RESORT_METADATA } from '../data/resortData';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 450);
          }, 200);
          return 100;
        }
        // Smooth progression
        const increment = prev < 50 ? 5 : prev < 85 ? 4 : 3;
        return Math.min(100, prev + increment);
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-label="Loading The Haweli Resort"
      onClick={() => {
        setFadeOut(true);
        setTimeout(onComplete, 300);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#102648] transition-opacity duration-500 cursor-pointer select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,169,107,0.12),transparent_60%)] pointer-events-none" />

      {/* Minimal Stage: Only Logo & Loading Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-7">
        {/* Transparent Brand Crest Logo */}
        <div className="relative flex items-center justify-center">
          <img
            src={RESORT_METADATA.logoUrl}
            alt="The Haweli Resort"
            className="w-24 h-32 sm:w-28 sm:h-36 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out transform"
          />
        </div>

        {/* Minimal Golden Loading Bar */}
        <div className="w-36 sm:w-44 h-1 bg-[#1a3660] rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#A58444] via-[#DFCA9B] to-[#C8A96B] rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(200,169,107,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
