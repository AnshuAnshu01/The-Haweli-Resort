import React from 'react';
import { Phone } from 'lucide-react';
import { HAWELI_DISPLAY_PHONE } from '../utils/whatsapp';

export const FloatingContactButton: React.FC = () => {
  return (
    <aside
      aria-label="Direct Call The Haweli Resort"
      className="fixed z-40 select-none pointer-events-auto"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
        right: '1.25rem',
      }}
    >
      <a
        href={`tel:${HAWELI_DISPLAY_PHONE.replace(/\s+/g, '')}`}
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#102648] hover:bg-[#2B4266] border-2 border-[#C8A96B] text-[#C8A96B] hover:text-[#DFCA9B] shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:scale-110 active:scale-95 group cursor-pointer"
        title={`Call The Haweli Resort: ${HAWELI_DISPLAY_PHONE}`}
        aria-label={`Call The Haweli Resort: ${HAWELI_DISPLAY_PHONE}`}
      >
        {/* Subtle pulsating golden halo */}
        <span className="absolute inset-0 rounded-full bg-[#C8A96B]/25 animate-ping opacity-60 pointer-events-none" />

        {/* Calling Logo Icon */}
        <Phone className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#C8A96B] group-hover:scale-110 transition-transform duration-200" />
      </a>
    </aside>
  );
};
