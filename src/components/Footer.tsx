import React from 'react';
import { ExternalLink, MapPin, Phone, Mail, Instagram, Facebook, Compass, Youtube } from 'lucide-react';
import { RESORT_METADATA } from '../data/resortData';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  onReplaySplash?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onReplaySplash }) => {
  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#102648] text-[#F4F0EA] border-t border-[#CDD4DC]/30 pt-10 sm:pt-16 pb-[calc(2.5rem+env(safe-area-inset-bottom))] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid: 1-col on mobile, 2-col on sm, 4-col on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#CDD4DC]/20">
          {/* Col 1: Brand – spans full width on mobile/tablet */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3.5">
              <img
                src={RESORT_METADATA.logoUrl}
                alt="The Haweli Resort Logo"
                className="w-11 h-14 object-contain filter drop-shadow-md"
              />
              <div>
                <h3
                  className="text-2xl text-[#F4F0EA] font-normal leading-none"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  The Haweli Resort
                </h3>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A96B] font-medium block mt-1">
                  &amp; Restaurant · Estd. 2020
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E8E1D8]/80 leading-relaxed font-sans max-w-md">
              A palatial sanctuary at Jasoiya More, Narbdeshwar Nagar, Aurangabad, Bihar. Celebrating traditional
              hospitality, destination marriage lawns, and authentic royal Awadhi &amp; Bihari dining.
            </p>

            <div className="inline-block px-3 py-1 rounded-full bg-[#523122] border border-[#C8A96B]/60 text-[10px] font-mono text-[#F4F0EA] tracking-wider uppercase">
              Tagline: &ldquo;{RESORT_METADATA.tagline}&rdquo;
            </div>

            {/* Social Channels with YouTube, Instagram, Facebook, Location */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESORT_METADATA.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#CDD4DC]/30 text-[#E8E1D8] hover:text-[#C8A96B] hover:border-[#C8A96B] hover:bg-[#2B4266] transition-all shadow-sm group flex items-center justify-center active:scale-95"
                title="Watch on YouTube"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={RESORT_METADATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#CDD4DC]/30 text-[#E8E1D8] hover:text-[#C8A96B] hover:border-[#C8A96B] hover:bg-[#2B4266] transition-all shadow-sm group flex items-center justify-center active:scale-95"
                title="Follow on Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={RESORT_METADATA.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#CDD4DC]/30 text-[#E8E1D8] hover:text-[#C8A96B] hover:border-[#C8A96B] hover:bg-[#2B4266] transition-all shadow-sm flex items-center justify-center active:scale-95"
                title="Follow on Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[#C8A96B]" />
              </a>
              <a
                href={RESORT_METADATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#CDD4DC]/30 text-[#E8E1D8] hover:text-[#C8A96B] hover:border-[#C8A96B] hover:bg-[#2B4266] transition-all shadow-sm flex items-center justify-center active:scale-95"
                title="View on Google Maps"
                aria-label="Google Maps"
              >
                <Compass className="w-4 h-4 text-[#C8A96B]" />
              </a>
              <a
                href={RESORT_METADATA.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#CDD4DC]/30 text-[#E8E1D8] hover:text-[#C8A96B] hover:border-[#C8A96B] hover:bg-[#2B4266] transition-all shadow-sm flex items-center justify-center active:scale-95"
                title="Official Website"
                aria-label="Official Website"
              >
                <ExternalLink className="w-4 h-4 text-[#C8A96B]" />
              </a>
            </div>
          </div>

          {/* Col 2: Destination Pages */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-[11px] uppercase tracking-widest text-[#C8A96B] font-bold">
              Resort Pages
            </h4>
            <ul className="space-y-2 text-[#E8E1D8]/85">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#C8A96B] transition-colors cursor-pointer py-1 block">
                  Estate Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('suites')} className="hover:text-[#C8A96B] transition-colors cursor-pointer py-1 block">
                  Suites &amp; Room Booking
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dining')} className="hover:text-[#C8A96B] transition-colors cursor-pointer py-1 block">
                  Haweli Restaurant Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('banquets')} className="hover:text-[#C8A96B] transition-colors cursor-pointer py-1 block">
                  Marriage Lawn &amp; Banquets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#C8A96B] transition-colors cursor-pointer py-1 block">
                  About &amp; Leadership
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('journal')} className="hover:text-[#C8A96B] transition-colors cursor-pointer py-1 block">
                  Regional Excursions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#C8A96B] transition-colors cursor-pointer py-1 block">
                  Map &amp; Concierge Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-[11px] uppercase tracking-widest text-[#C8A96B] font-bold">
              Reservations &amp; Desk
            </h4>
            <ul className="space-y-2.5 text-[#E8E1D8]/85">
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C8A96B] shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${RESORT_METADATA.phone}`} className="text-[#F4F0EA] hover:text-[#C8A96B] block font-semibold transition-colors py-0.5">
                    {RESORT_METADATA.phone}
                  </a>
                  <span className="text-[10px] text-[#CDD4DC]">Dining: {RESORT_METADATA.altPhone}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C8A96B] shrink-0 mt-0.5" />
                <a href={`mailto:${RESORT_METADATA.email}`} className="hover:text-[#C8A96B] break-all transition-colors py-0.5 block">
                  {RESORT_METADATA.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C8A96B] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Plot 303, Narbdeshwar Nagar, Jasoiya More, Aurangabad, Bihar 824101</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Map Preview */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-[11px] uppercase tracking-widest text-[#C8A96B] font-bold">
              Google Maps Location
            </h4>
            <div className="rounded-xl overflow-hidden border border-[#CDD4DC]/30 h-32 relative shadow-md">
              <iframe
                title="The Haweli Resort Location Map"
                src={RESORT_METADATA.googleMapsEmbed}
                className="w-full h-full border-0 filter contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={RESORT_METADATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#C8A96B] hover:text-[#DFCA9B] hover:underline flex items-center gap-1 font-medium transition-colors py-1 inline-flex"
            >
              <span>Get Highway Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Attribution centred + legal links */}
        <div className="pt-8 flex flex-col items-center justify-center text-center space-y-3">
          {/* Centred attribution — strictly as requested */}
          <div className="text-sm font-medium text-[#F4F0EA] tracking-wide font-sans">
            Designed and Developed by{' '}
            <a
              href="https://accustomlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8A96B] font-semibold hover:text-[#DFCA9B] transition-colors hover:underline"
            >
              ACCustomLabs
            </a>
          </div>

          {/* Legal & policy links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-mono text-[#CDD4DC]">
            <button
              onClick={() => handleNav('cookie-policy')}
              className="hover:text-[#C8A96B] transition-colors cursor-pointer hover:underline"
            >
              Cookie Policy
            </button>
            <span className="text-[#CDD4DC]/30">·</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-[#C8A96B] transition-colors cursor-pointer hover:underline"
            >
              Terms &amp; Conditions
            </button>
            {onReplaySplash && (
              <>
                <span className="text-[#CDD4DC]/30">·</span>
                <button
                  onClick={onReplaySplash}
                  className="text-[#C8A96B] hover:underline cursor-pointer"
                  title="View the Royal Loading Page"
                >
                  Replay Intro
                </button>
              </>
            )}
          </div>

          {/* Copyright */}
          <p className="text-[11px] font-mono text-[#CDD4DC]/60">
            © 2020–2026 The Haweli Resort &amp; Restaurant. All rights reserved. · Founded 10 April 2020
          </p>
        </div>
      </div>
    </footer>
  );
};
