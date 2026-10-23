import React, { useState } from 'react';
import { RESORT_FACILITIES } from '../data/resortData';
import { Sparkles, Users, Calendar, Check, Send } from 'lucide-react';

export const VenuesAndWeddings: React.FC = () => {
  const [eventType, setEventType] = useState('Royal Destination Wedding');
  const [estimatedGuests, setEstimatedGuests] = useState(400);
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <section id="banquets" className="relative z-10 py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/5">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-400/80 font-mono">
          Grand Celebrations &amp; Ceremonies
        </span>
        <h2
          className="text-3xl sm:text-5xl md:text-6xl text-foreground font-normal mt-2 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Destination Weddings & Royal Banquets
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-2 sm:mt-4 leading-relaxed">
          From luminous starlit weddings on our 22,000 sq. ft. manicured marriage lawn to prestigious
          corporate conferences in the Sheesh Mahal Hall, The Haweli sets the stage for timeless memories.
        </p>
      </div>

      {/* Facilities Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {RESORT_FACILITIES.map((fac, idx) => (
          <div
            key={idx}
            className="liquid-glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/30"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 block mb-2">
                {fac.area}
              </span>
              <h3
                className="text-2xl text-foreground font-normal"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {fac.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                {fac.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-foreground/80">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                {fac.capacity}
              </span>
              <span className="text-emerald-400">Available</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Banquet & Wedding Inquiry Box */}
      <div className="liquid-glass rounded-2xl p-8 sm:p-10 border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              Event Planning Concierge
            </span>
            <h3
              className="text-3xl sm:text-4xl text-foreground font-normal mt-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Plan Your Auspicious Event
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
              Our dedicated event directors oversee every detail — customized royal mandap decorations,
              live multi-cuisine catering by Haweli chefs, guest accommodation blocks, and valet management.
            </p>

            <div className="mt-6 space-y-2 text-xs text-foreground/90 font-mono">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Customized Pure-Veg or Royal Awadhi Catering Menus</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>150+ Dedicated Parking Spaces with Valet Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pillarless Acoustic Hall + Open Starlight Lawn Combo</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6">
            {!inquirySent ? (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Occasion Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                    >
                      <option value="Royal Destination Wedding" className="bg-slate-900">Destination Wedding</option>
                      <option value="Ring Ceremony / Sangeet" className="bg-slate-900">Ring Ceremony / Sangeet</option>
                      <option value="Wedding Reception" className="bg-slate-900">Wedding Reception</option>
                      <option value="Corporate Conference" className="bg-slate-900">Corporate Conference</option>
                      <option value="Anniversary / Gala" className="bg-slate-900">Anniversary / Gala Dinner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Estimated Guests
                    </label>
                    <select
                      value={estimatedGuests}
                      onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                    >
                      <option value={100} className="bg-slate-900">100 - 250 Guests</option>
                      <option value={400} className="bg-slate-900">250 - 500 Guests</option>
                      <option value={800} className="bg-slate-900">500 - 800 Guests</option>
                      <option value={1200} className="bg-slate-900">800 - 1,200+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Proposed Date
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Host Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajiv Singh"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-muted-foreground font-mono">
                    Direct callback within 2 business hours
                  </span>
                  <button
                    type="submit"
                    className="liquid-glass rounded-full px-6 py-2.5 text-xs text-foreground font-medium hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Request Event Proposal</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4
                  className="text-2xl text-foreground font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Banquet Proposal Initiated
                </h4>
                <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                  Thank you, <strong className="text-foreground">{contactName}</strong>. Our senior banquet director will contact you at <span className="text-amber-400">{contactPhone}</span> with availability for {eventDate}.
                </p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="mt-4 text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
