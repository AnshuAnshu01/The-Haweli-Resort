import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Users,
  Star,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Award,
  MessageSquare,
  Check,
  X,
} from 'lucide-react';
import { RESORT_METADATA, GOOGLE_REVIEWS, ROOMS_DATA, RESORT_FACILITIES } from '../data/resortData';
import { createQuickBookingWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  onOpenBookingModal: (room: any) => void;
  onOpenSplash: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onOpenBookingModal,
  onOpenSplash,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {
        // Safe catch for browser autoplay policies
      });
    }
  }, []);

  // Quick search state
  const [quickCheckIn, setQuickCheckIn] = useState('2026-10-25');
  const [quickCheckOut, setQuickCheckOut] = useState('2026-10-27');
  const [quickGuests, setQuickGuests] = useState(2);
  const [quickRoomPreference, setQuickRoomPreference] = useState('Royal Maharaja Suite');

  // Quick Booking Modal State
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [quickGuestName, setQuickGuestName] = useState('');
  const [quickGuestPhone, setQuickGuestPhone] = useState('');
  const [quickNote, setQuickNote] = useState('');
  const [quickBookingSent, setQuickBookingSent] = useState(false);
  const [quickWhatsAppText, setQuickWhatsAppText] = useState('');

  const handleQuickBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = createQuickBookingWhatsAppMessage({
      guestName: quickGuestName,
      guestPhone: quickGuestPhone,
      checkIn: quickCheckIn,
      checkOut: quickCheckOut,
      guests: quickGuests,
      roomPreference: quickRoomPreference,
      note: quickNote,
    });
    setQuickWhatsAppText(msg);
    setQuickBookingSent(true);
    openWhatsApp(msg);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Cinematic Fullscreen Hero Section */}
      <div className="relative min-h-[88svh] sm:min-h-[85vh] w-full flex flex-col justify-center bg-[#0A182D]">
        {/* Fullscreen Video Background - Continuous Silent Loop */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/assets/bg-video.mp4" type="video/mp4" />
          <source src="/assets/bg video.mp4" type="video/mp4" />
          <source src="/bg-video.mp4" type="video/mp4" />
          <source src="/bg video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Scrim for perfect contrast across light/dark views */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/70 z-0 pointer-events-none" />

        {/* Centered Hero Content */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-10 pb-12 sm:py-20 max-w-5xl mx-auto w-full">
          {/* Logo Badge (clean transparent, NO brown background) */}
          <div
            onClick={onOpenSplash}
            className="relative mb-3 group cursor-pointer animate-fade-rise"
            title="Click to view luxury seal"
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-400/25 via-sky-300/20 to-amber-400/25 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-opacity" />
            <img
              src={RESORT_METADATA.logoUrl}
              alt="The Haweli Resort Logo"
              className="relative w-20 h-24 sm:w-24 sm:h-28 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div
            className="mb-2 text-xs font-mono tracking-widest uppercase animate-fade-rise"
            style={{ color: '#DFCA9B', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
          >
            <span>The Haweli Resort &amp; Restaurant · India, 2020</span>
          </div>

          {/* Main Hero Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.08] sm:leading-tight tracking-normal max-w-5xl mx-auto animate-fade-rise w-full px-1"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#FFFFFF',
              textShadow: '0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)'
            }}
          >
            <span
              className="inline-block"
              style={{
                color: '#FFFFFF',
                textShadow: '0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)'
              }}
            >
              Where Royal Heritage
            </span>
            <br />
            <span
              className="inline-block italic mt-1"
              style={{
                color: '#DFCA9B',
                textShadow: '0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)'
              }}
            >
              Meets Timeless Grandeur
            </span>
          </h1>

          <p
            className="text-xs sm:text-base md:text-lg max-w-2xl mt-4 leading-relaxed font-sans animate-fade-rise-delay px-2"
            style={{
              color: '#F4F0EA',
              textShadow: '0 2px 10px rgba(0,0,0,0.95)'
            }}
          >
            An extraordinary royal sanctuary in Aurangabad, Bihar. Celebrating palatial suites,
            destination marriage lawns, and authentic royal gastronomy since 2020.
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7 sm:mt-8 animate-fade-rise-delay-2 w-full max-w-sm sm:max-w-none mx-auto">
            <button
              onClick={() => {
                setCurrentPage('suites');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto min-h-[46px] btn-royal-primary px-8 py-3.5 text-sm text-[#F4F0EA] cursor-pointer font-medium tracking-wide shadow-xl active:scale-95 flex items-center justify-center"
            >
              Begin Journey
            </button>
            <button
              onClick={() => {
                setCurrentPage('dining');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto min-h-[46px] btn-heritage px-7 py-3.5 text-sm text-[#F4F0EA] cursor-pointer font-medium tracking-wide shadow-xl active:scale-95 flex items-center justify-center"
            >
              Explore Restaurant
            </button>
          </div>
        </section>
      </div>

      {/* 2. Quick Reservation Bar Strip */}
      <section className="relative z-20 py-4 sm:py-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <form
          onSubmit={handleQuickSearch}
          className="royal-card p-4 sm:p-6 shadow-2xl border border-[var(--border-strong)] flex flex-col gap-3.5 sm:gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1.5 flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Check-in
              </label>
              <input
                type="date"
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1.5 flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Check-out
              </label>
              <input
                type="date"
                value={quickCheckOut}
                onChange={(e) => setQuickCheckOut(e.target.value)}
                className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1.5 flex items-center gap-1 font-semibold">
                <Users className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Guests
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(Number(e.target.value))}
                className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full pt-1">
            <button
              type="submit"
              className="w-full sm:flex-1 min-h-[46px] btn-royal-primary px-6 py-3 text-xs uppercase font-mono tracking-wider font-bold cursor-pointer active:scale-95 flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#C8A96B]" />
              <span>Book on WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('suites');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:flex-1 min-h-[46px] px-5 py-3 text-xs uppercase font-mono tracking-wider font-medium text-[#F4F0EA] bg-[#2B4266] hover:bg-[#385584] rounded-full border border-[#CDD4DC]/30 cursor-pointer flex items-center justify-center text-center transition-colors shadow-sm"
            >
              Browse Suites
            </button>
          </div>
        </form>
      </section>

      {/* 3. Experience Pillars */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
            An Epitome of Regional Luxury
          </span>
          <h2
            className="text-3xl sm:text-5xl text-[var(--text-primary)] font-normal mt-2 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Timeless Heritage, Modern Sanctuary
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-4 leading-relaxed">
            Founded 10 April 2020 at Jasoiya More, The Haweli Resort is a premier destination combining
            regal suites, destination marriage lawns, and celebrated Bihari &amp; Awadhi gastronomy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Card 1: Suites */}
          <div className="royal-card overflow-hidden group flex flex-col justify-between">
            <div className="relative h-52 sm:h-60 overflow-hidden">
              <img
                src={ROOMS_DATA[0].imageUrl}
                alt="Royal Suites"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />
              <span className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono px-3 py-1 rounded-full">
                Rooms &amp; Suites
              </span>
            </div>
            <div className="p-4.5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Royal Accommodations
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Deep soundproof acoustic serenity, carved teak furnishings, marble baths, and complimentary breakfast buffet.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('suites');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-5 min-h-[40px] flex items-center justify-between text-xs text-[var(--accent-gold)] font-mono hover:underline cursor-pointer"
              >
                <span>View Suites Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Dining */}
          <div className="royal-card overflow-hidden group flex flex-col justify-between">
            <div className="relative h-52 sm:h-60 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                alt="Haweli Restaurant"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />
              <span className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono px-3 py-1 rounded-full">
                Celebrated Dining
              </span>
            </div>
            <div className="p-4.5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Haweli Restaurant
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Home of authentic slow-simmered Champaran Handi Ahuna Mutton, Awadhi Biryanis, and pure vegetarian delicacies.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('dining');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-5 min-h-[40px] flex items-center justify-between text-xs text-[var(--accent-gold)] font-mono hover:underline cursor-pointer"
              >
                <span>Browse Restaurant Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Banquets & Lawns */}
          <div className="royal-card overflow-hidden group flex flex-col justify-between">
            <div className="relative h-52 sm:h-60 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                alt="Marriage Lawn"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />
              <span className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono px-3 py-1 rounded-full">
                Destination Banquets
              </span>
            </div>
            <div className="p-4.5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Weddings &amp; Celebrations
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  22,000 sq. ft. fairy-lit Starlight Marriage Lawn &amp; 6,500 sq. ft. Sheesh Mahal Banquet hosting up to 1,200 guests.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('banquets');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-5 min-h-[40px] flex items-center justify-between text-xs text-[var(--accent-gold)] font-mono hover:underline cursor-pointer"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Google Reviews */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-[var(--border-subtle)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl sm:text-2xl font-bold font-sans text-blue-500">G</span>
              <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
                Google Verified Reviews &amp; Ratings
              </span>
            </div>
            <h2
              className="text-2xl sm:text-4xl text-[var(--text-primary)] font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Praised by Patrons Across Bihar &amp; India
            </h2>
          </div>

          {/* Google 4.2 Rating Badge */}
          <div className="royal-card px-4 sm:px-5 py-3 border border-amber-400/30 flex items-center gap-3.5 sm:gap-4 shrink-0 self-start sm:self-auto">
            <div className="text-center">
              <span className="text-2xl font-bold font-mono text-[var(--accent-gold)] block leading-none">
                {RESORT_METADATA.rating}
              </span>
              <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs font-mono text-[var(--text-secondary)] border-l border-[var(--border-subtle)] pl-3.5 sm:pl-4">
              <span className="text-[var(--text-primary)] font-bold block">{RESORT_METADATA.reviewCount}+ Verified Reviews</span>
              <span>Google Maps &amp; Justdial</span>
            </div>
          </div>
        </div>

        {/* Reviews – horizontal scroll on mobile with peek, grid on md+ */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none">
          {GOOGLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="royal-card p-4.5 sm:p-5 flex flex-col justify-between shrink-0 w-[82vw] max-w-[310px] sm:w-auto snap-center shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="w-8 h-8 rounded-full object-cover border border-[var(--border-subtle)]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">{rev.authorName}</h4>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">{rev.timeAgo}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full font-mono">
                    {rev.source}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400 mb-2.5">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic line-clamp-4">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Stay
                </span>
                <span>{rev.likesCount} Helpful</span>
              </div>
            </div>
          ))}
        </div>

        {/* View on Google Maps Link */}
        <div className="mt-6 sm:mt-8 text-center">
          <a
            href={RESORT_METADATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] hover:underline p-2"
          >
            <span>Read all 167+ reviews on Google Maps</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* 5. Direct Booking Advantages */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="royal-card p-5 sm:p-8 border border-[var(--border-strong)] bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-card)] to-[var(--bg-secondary)]">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
              The Haweli Promise
            </span>
            <h3
              className="text-2xl sm:text-3xl text-[var(--text-primary)] font-normal mt-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Direct Guest Privileges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center font-mono text-xs">
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-center">
              <span className="text-[var(--text-primary)] font-bold text-sm sm:text-base block mb-1">Best Rate Guarantee</span>
              <span className="text-[var(--text-secondary)] text-xs leading-relaxed">Save 15% versus third-party travel agent portals.</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-center">
              <span className="text-[var(--text-primary)] font-bold text-sm sm:text-base block mb-1">Free Station Pickup</span>
              <span className="text-[var(--text-secondary)] text-xs leading-relaxed">Complimentary pickup from Anugrah Narayan Road (14 km).</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-center">
              <span className="text-[var(--text-primary)] font-bold text-sm sm:text-base block mb-1">Royal Breakfast Buffet</span>
              <span className="text-[var(--text-secondary)] text-xs leading-relaxed">Included daily at Haweli Coffee Shop for all direct guests.</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-center">
              <span className="text-[var(--text-primary)] font-bold text-sm sm:text-base block mb-1">Flexible Cancellation</span>
              <span className="text-[var(--text-secondary)] text-xs leading-relaxed">100% full refund 50+ days prior; free date shifts.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick WhatsApp Booking Modal */}
      {quickModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-rise"
        >
          <div className="relative w-full max-w-lg royal-card p-4.5 sm:p-8 border border-[var(--border-strong)] shadow-2xl max-h-[88dvh] overflow-y-auto rounded-2xl sm:rounded-3xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setQuickModalOpen(false);
                setQuickBookingSent(false);
              }}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!quickBookingSent ? (
              <form onSubmit={handleQuickBookingSubmit} className="space-y-4">
                <div className="pr-8">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
                    Instant WhatsApp Concierge
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl text-[var(--text-primary)] font-normal mt-1"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Reserve Your Stay
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Fill in your details below. Your reservation request will be dispatched directly to The Haweli WhatsApp desk (+91 8102891308).
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kumar Arvind"
                      value={quickGuestName}
                      onChange={(e) => setQuickGuestName(e.target.value)}
                      className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-[var(--text-primary)] font-sans focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 81028 91308"
                      value={quickGuestPhone}
                      onChange={(e) => setQuickGuestPhone(e.target.value)}
                      className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={quickCheckIn}
                        onChange={(e) => setQuickCheckIn(e.target.value)}
                        className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={quickCheckOut}
                        onChange={(e) => setQuickCheckOut(e.target.value)}
                        className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                        Guests
                      </label>
                      <select
                        value={quickGuests}
                        onChange={(e) => setQuickGuests(Number(e.target.value))}
                        className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4+ Guests</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                        Preferred Suite
                      </label>
                      <select
                        value={quickRoomPreference}
                        onChange={(e) => setQuickRoomPreference(e.target.value)}
                        className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                      >
                        <option value="Royal Maharaja Suite">Royal Maharaja Suite</option>
                        <option value="Regal Heritage Suite">Regal Heritage Suite</option>
                        <option value="Presidential Grand Suite">Presidential Grand Suite</option>
                        <option value="Deluxe Courtyard Room">Deluxe Courtyard Room</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                      Special Note / Dietary / Arrival Time (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Late check-in, anniversary celebration"
                      value={quickNote}
                      onChange={(e) => setQuickNote(e.target.value)}
                      className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={() => setQuickModalOpen(false)}
                    className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[46px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 py-3 text-xs uppercase font-mono tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Send to WhatsApp (+91 8102891308)</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <h4
                  className="text-2xl sm:text-3xl text-[var(--text-primary)] font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Booking Request Dispatched
                </h4>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                  Your details and requested dates ({quickCheckIn} to {quickCheckOut}) have been formatted and sent to The Haweli WhatsApp concierge.
                </p>

                <div className="bg-black/30 p-4 rounded-xl border border-[var(--border-subtle)] text-xs font-mono text-left space-y-1 text-[var(--text-secondary)]">
                  <div>Guest: <span className="text-[var(--text-primary)] font-bold">{quickGuestName}</span></div>
                  <div>Phone: <span className="text-[var(--text-primary)]">{quickGuestPhone}</span></div>
                  <div>Room: <span className="text-[var(--accent-gold)]">{quickRoomPreference}</span></div>
                  <div>Guests: <span className="text-[var(--text-primary)]">{quickGuests} Pax</span></div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => openWhatsApp(quickWhatsAppText)}
                    className="w-full sm:w-auto min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Re-open in WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickModalOpen(false);
                      setQuickBookingSent(false);
                    }}
                    className="w-full sm:w-auto min-h-[44px] liquid-glass rounded-full px-6 py-2.5 text-xs text-[var(--text-primary)] font-mono flex items-center justify-center"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
