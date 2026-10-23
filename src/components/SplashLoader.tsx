import React, { useEffect, useState } from 'react';
import { RESORT_METADATA } from '../data/resortData';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 400);
    }, 1400);

    return () => clearTimeout(timer);
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
      {/* Subtle ambient warm glow behind logo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,169,107,0.12),transparent_65%)] pointer-events-none" />

      {/* Minimal Container: Big Logo and Loading... */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 px-6 text-center">
        {/* Big Logo */}
        <div className="relative flex items-center justify-center animate-fade-rise">
          <img
            src={RESORT_METADATA.logoUrl}
            alt="The Haweli Resort"
            className="w-36 h-44 sm:w-48 sm:h-60 md:w-56 md:h-72 object-contain filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out hover:scale-105"
          />
        </div>

        {/* Loading... text */}
        <p className="text-sm sm:text-base font-mono tracking-[0.25em] uppercase text-[#DFCA9B] animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};
