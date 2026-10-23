import React, { useState } from 'react';
import { RESORT_FACILITIES } from '../data/resortData';
import { Users, Check, Send, Sparkles, Building, Trees, Waves } from 'lucide-react';
import { createEventInquiryWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export const BanquetsPage: React.FC = () => {
  const [eventType, setEventType] = useState('Royal Destination Wedding');
  const [estimatedGuests, setEstimatedGuests] = useState(400);
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = createEventInquiryWhatsAppMessage({
      hostName: contactName,
      phone: contactPhone,
      eventType,
      estimatedGuests,
      eventDate,
    });
    openWhatsApp(msg);
    setInquirySent(true);
  };

  return (
    <div className="w-full py-8 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
          Destination Celebrations &amp; Conventions
        </span>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal mt-2 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Weddings &amp; Royal Banquets
        </h1>
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base mt-2 sm:mt-3 leading-relaxed">
          From luminous starlit weddings on our 22,000 sq. ft. marriage lawn to grand corporate summits in the Sheesh Mahal Hall, The Haweli sets the stage for timeless memories.
        </p>
      </div>

      {/* Facilities Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {RESORT_FACILITIES.map((fac, idx) => (
          <div
            key={idx}
            className="royal-card overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative h-52 sm:h-64 overflow-hidden">
              <img
                src={fac.imageUrl}
                alt={fac.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-full uppercase">
                  {fac.area}
                </span>
              </div>
            </div>

            <div className="p-4.5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {fac.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 sm:mt-2 leading-relaxed">
                  {fac.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                  <Users className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  {fac.capacity}
                </span>
                <span className="text-emerald-400">Available for Booking</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quotation Form */}
      <div className="royal-card p-4.5 sm:p-8 lg:p-10 border border-[var(--border-strong)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
              Event Concierge
            </span>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-normal mt-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Plan Your Auspicious Event
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-2 sm:mt-3 leading-relaxed">
              Our dedicated banquet directors handle every detail: royal floral mandap styling,
              live catering by Haweli chefs, suite room blocks, and valet parking for 150+ cars.
            </p>

            <div className="mt-5 sm:mt-6 space-y-2 text-xs font-mono text-[var(--text-primary)]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Customized Pure-Veg or Awadhi Royal Menus</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>150+ Dedicated Parking Spaces with Valet</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Pillarless Acoustic Hall + Open Lawn Combo</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl p-4 sm:p-6">
            {!inquirySent ? (
              <form onSubmit={handleInquirySubmit} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Occasion Type</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                    >
                      <option value="Royal Destination Wedding">Destination Wedding</option>
                      <option value="Ring Ceremony / Sangeet">Ring Ceremony / Sangeet</option>
                      <option value="Wedding Reception">Wedding Reception</option>
                      <option value="Corporate Conference">Corporate Conference</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Estimated Guests</label>
                    <select
                      value={estimatedGuests}
                      onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                    >
                      <option value={150}>100 - 250 Guests</option>
                      <option value={400}>250 - 500 Guests</option>
                      <option value={800}>500 - 800 Guests</option>
                      <option value={1200}>800 - 1,200+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Date</label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Host Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Rajiv Singh"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 81028 91308"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-[var(--text-muted)] font-mono text-center sm:text-left">
                    Director callback within 2 business hours
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto btn-royal-primary px-7 py-3 min-h-[46px] text-xs uppercase font-mono tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Request Proposal</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Proposal Initiated &amp; Sent via WhatsApp
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Thank you, <strong className="text-[var(--text-primary)]">{contactName}</strong>. Details have been compiled for our senior banquet director (+91 8102891308).
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-4">
                  <a
                    href={`https://wa.me/918102891308?text=${encodeURIComponent(createEventInquiryWhatsAppMessage({
                      hostName: contactName,
                      phone: contactPhone,
                      eventType,
                      estimatedGuests,
                      eventDate,
                    }))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-transform active:scale-95"
                  >
                    <span>Open in WhatsApp (+91 8102891308)</span>
                  </a>
                  <button
                    onClick={() => setInquirySent(false)}
                    className="text-xs text-[var(--accent-gold)] underline cursor-pointer py-2 text-center"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
