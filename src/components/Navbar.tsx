import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ShoppingBag,
  Sun,
  Moon,
  Phone,
  MessageCircle,
  Youtube,
  Instagram,
  Facebook,
  MapPin,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  LayoutGrid,
} from 'lucide-react';
import { RESORT_METADATA } from '../data/resortData';
import { HAWELI_DISPLAY_PHONE, HAWELI_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// Primary links — always visible on desktop
const PRIMARY_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'suites', label: 'Suites' },
  { id: 'dining', label: 'Restaurant' },
];

// Secondary links — hidden behind "More" dropdown on desktop
const MORE_LINKS = [
  { id: 'banquets', label: 'Weddings & Banquets' },
  { id: 'about', label: 'Heritage & Legacy' },
  { id: 'journal', label: 'Excursions' },
  { id: 'contact', label: 'Map & Contact' },
];

const ALL_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  onOpenCart,
  theme,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMoreOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [moreOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    setMoreOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Is any "More" item currently active?
  const moreIsActive = MORE_LINKS.some((l) => l.id === currentPage);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#102648]/95 backdrop-blur-md text-[#F4F0EA] border-b border-[#CDD4DC]/20 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── Brand ─────────────────────────────────────────────── */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none cursor-pointer text-left"
          aria-label="The Haweli Resort Home"
        >
          <img
            src={RESORT_METADATA.logoUrl}
            alt="The Haweli Resort"
            className="w-8 h-10 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span
              className="text-lg sm:text-xl font-normal tracking-tight text-[#F4F0EA] group-hover:text-[#C8A96B] transition-colors leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              The Haweli Resort
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#C8A96B] font-mono mt-0.5 font-medium">
              Aurangabad · Bihar
            </span>
          </div>
        </button>

        {/* ── Desktop nav ────────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">

          {/* Primary links */}
          {PRIMARY_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer py-2 px-3.5 rounded-lg ${currentPage === link.id
                  ? 'text-[#C8A96B] font-bold bg-white/5'
                  : 'text-[#E8E1D8]/80 hover:text-[#C8A96B] hover:bg-white/5'
                }`}
            >
              {link.label}
              {currentPage === link.id && (
                <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-[#C8A96B] rounded-full shadow-[0_0_8px_rgba(200,169,107,0.8)]" />
              )}
            </button>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={moreOpen}
              className={`flex items-center gap-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer py-2 px-3.5 rounded-lg ${moreIsActive
                  ? 'text-[#C8A96B] font-bold bg-white/5'
                  : 'text-[#E8E1D8]/80 hover:text-[#C8A96B] hover:bg-white/5'
                }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>More</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
              />
              {moreIsActive && (
                <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-[#C8A96B] rounded-full shadow-[0_0_8px_rgba(200,169,107,0.8)]" />
              )}
            </button>

            {/* Dropdown panel */}
            {moreOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-56 bg-[#0e2040]/98 backdrop-blur-xl border border-[#C8A96B]/25 rounded-2xl shadow-2xl overflow-hidden"
                style={{ animation: 'dropIn 0.18s cubic-bezier(0.16,1,0.3,1) both' }}
              >
                <div className="px-3 pt-3 pb-1">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#C8A96B]/70 font-semibold">
                    Explore
                  </span>
                </div>
                {MORE_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono tracking-wide transition-all cursor-pointer mx-0 ${currentPage === link.id
                        ? 'bg-[#C8A96B]/15 text-[#C8A96B] font-bold'
                        : 'text-[#E8E1D8]/85 hover:bg-[#2B4266]/60 hover:text-[#C8A96B]'
                      }`}
                  >
                    <span>{link.label}</span>
                    {currentPage === link.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] shadow-[0_0_6px_#C8A96B]" />
                    )}
                  </button>
                ))}
                <div className="h-2" />
              </div>
            )}
          </div>
        </nav>

        {/* ── Right actions ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-2.5">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[#CDD4DC]/30 hover:border-[#C8A96B] text-[#F4F0EA] hover:bg-[#2B4266] transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Palace View' : 'Switch to Dark Palace View'}
            aria-label="Toggle Light and Dark Palace View"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#C8A96B]" />
            ) : (
              <Moon className="w-4 h-4 text-[#DFCA9B]" />
            )}
          </button>

          {/* Cart badge */}
          {cartCount > 0 && (
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full border border-[#C8A96B]/60 hover:border-[#C8A96B] text-[#F4F0EA] hover:bg-[#2B4266] transition-colors cursor-pointer"
              aria-label="View Dining Order"
            >
              <ShoppingBag className="w-4 h-4 text-[#C8A96B]" />
              <span className="absolute -top-1 -right-1 bg-[#523122] text-[#F4F0EA] border border-[#C8A96B] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono shadow-sm">
                {cartCount}
              </span>
            </button>
          )}

          {/* Book Room CTA */}
          <button
            onClick={() => handleNavClick('suites')}
            className="hidden sm:inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 text-xs font-mono font-semibold tracking-wider uppercase text-[#F4F0EA] bg-[#523122] hover:bg-[#2B4266] border border-[#C8A96B] transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            Book Room
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-[#2B4266]/70 hover:bg-[#2B4266] border border-[#C8A96B]/60 text-[#C8A96B] transition-all focus:outline-none cursor-pointer shadow-sm active:scale-95 shrink-0"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#C8A96B]" />
            ) : (
              <Menu className="w-6 h-6 text-[#C8A96B]" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] z-50 bg-[#102648]/98 backdrop-blur-xl overflow-y-auto text-[#F4F0EA] border-t border-[#C8A96B]/30 flex flex-col justify-between p-4 sm:p-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))] space-y-5 animate-fade-rise">

          {/* All nav links */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#C8A96B] font-bold px-1 pb-1">
              Navigate
            </div>

            {ALL_LINKS.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full min-h-[46px] flex items-center justify-between px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all text-left cursor-pointer active:scale-[0.99] ${isActive
                      ? 'bg-[#2B4266] text-[#C8A96B] font-bold border-l-4 border-[#C8A96B] shadow-sm'
                      : 'bg-white/5 hover:bg-[#2B4266]/60 text-[#E8E1D8] hover:text-[#C8A96B] border-l-4 border-transparent'
                    }`}
                >
                  <span className="font-medium">{link.label}</span>
                  <div className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] shadow-[0_0_6px_#C8A96B]" />
                    )}
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-[#C8A96B]' : 'text-[#CDD4DC]/40'
                        }`}
                    />
                  </div>
                </button>
              );
            })}

            {/* Book Room CTA */}
            <div className="pt-1.5">
              <button
                onClick={() => handleNavClick('suites')}
                className="w-full min-h-[46px] rounded-xl bg-[#523122] hover:bg-[#2B4266] text-[#F4F0EA] border border-[#C8A96B] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 py-3 shadow-md transition-all active:scale-98"
              >
                Book Room Online
              </button>
            </div>
          </div>

          {/* Bottom: socials + location + contact */}
          <div className="pt-4 border-t border-[#C8A96B]/25 space-y-3 pb-2">
            <div>
              <div className="text-[9px] uppercase font-mono tracking-widest text-[#C8A96B] mb-1.5 font-semibold">
                Social Channels
              </div>
              <div className="grid grid-cols-3 gap-2">
                <a href={RESORT_METADATA.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 min-h-[42px] py-2 px-2 rounded-xl bg-[#0c1c36] hover:bg-[#2B4266] text-[#F4F0EA] border border-[#CDD4DC]/20 transition-all text-xs font-mono group"
                  aria-label="YouTube">
                  <Youtube className="w-4 h-4 text-[#FF0000] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-[11px] font-semibold group-hover:text-[#C8A96B]">YouTube</span>
                </a>
                <a href={RESORT_METADATA.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 min-h-[42px] py-2 px-2 rounded-xl bg-[#0c1c36] hover:bg-[#2B4266] text-[#F4F0EA] border border-[#CDD4DC]/20 transition-all text-xs font-mono group"
                  aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-[11px] font-semibold group-hover:text-[#C8A96B]">Instagram</span>
                </a>
                <a href={RESORT_METADATA.facebookUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 min-h-[42px] py-2 px-2 rounded-xl bg-[#0c1c36] hover:bg-[#2B4266] text-[#F4F0EA] border border-[#CDD4DC]/20 transition-all text-xs font-mono group"
                  aria-label="Facebook">
                  <Facebook className="w-4 h-4 text-[#1877F2] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-[11px] font-semibold group-hover:text-[#C8A96B]">Facebook</span>
                </a>
              </div>
            </div>

            <a href={RESORT_METADATA.googleMapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0c1c36] hover:bg-[#2B4266] border border-[#C8A96B]/30 transition-colors group">
              <div className="w-7 h-7 rounded-lg bg-[#C8A96B]/20 flex items-center justify-center shrink-0 text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#102648] transition-colors mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#C8A96B]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A96B] font-semibold">Resort Location</span>
                  <span className="text-[10px] text-[#CDD4DC] flex items-center gap-0.5 group-hover:text-[#C8A96B]">
                    <span>View Map</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
                <p className="text-[11px] text-[#E8E1D8] line-clamp-1 font-sans mt-0.5">
                  Jasoiya More, Narbdeshwar Nagar, Aurangabad, Bihar 824101
                </p>
              </div>
            </a>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#CDD4DC]">24/7 Desk:</span>
                <a href={`tel:${HAWELI_DISPLAY_PHONE.replace(/\s+/g, '')}`}
                  className="text-xs font-mono font-bold text-[#C8A96B] tracking-wide hover:underline">
                  {HAWELI_DISPLAY_PHONE}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a href={`tel:${HAWELI_DISPLAY_PHONE.replace(/\s+/g, '')}`}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2B4266] hover:bg-[#355280] text-[#F4F0EA] border border-[#C8A96B]/40 font-mono text-xs font-semibold shadow-sm transition-all active:scale-95">
                  <Phone className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>Call Desk</span>
                </a>
                <a href={`https://wa.me/${HAWELI_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello The Haweli Resort! I am inquiring about room booking and hospitality services.'
                )}`} target="_blank" rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-xs font-semibold shadow-sm transition-all active:scale-95">
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown animation keyframe */}
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
      `}</style>
    </header>
  );
};
