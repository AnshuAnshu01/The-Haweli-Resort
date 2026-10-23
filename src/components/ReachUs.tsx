import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, ExternalLink, Navigation } from 'lucide-react';
import { RESORT_METADATA } from '../data/resortData';

export const ReachUs: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Room Booking');
  const [formMessage, setFormMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
  };

  return (
    <footer id="reach-us" className="relative z-10 w-full border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={RESORT_METADATA.logoUrl}
              alt="The Haweli Resort Logo"
              className="w-12 h-14 object-contain"
            />
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono block">
                Official Property Directory
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Founded 10 April 2020 · Aurangabad, Bihar
              </span>
            </div>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-foreground font-normal mt-2 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Reach The Haweli Resort
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
            Conveniently situated along the Grand Trunk Road (NH-19) corridor at Plot 303, Jasoiya More,
            Aurangabad, Bihar. Our front desk concierge is on duty 24 hours a day to assist your family and guests.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Location & Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="liquid-glass-card rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Property Postal Address</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Plot No. 303, Narbdeshwar Nagar, Rambilash Nagar,<br />
                    Bharthauli Road, Near Lord Buddha Public School,<br />
                    Jasoiya More, Aurangabad, Bihar 824101, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=The+Haweli+Resort+Plot+303+Narbdeshwar+Nagar+Jasoiya+More+Aurangabad+Bihar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 mt-3 hover:underline font-mono"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="liquid-glass-card rounded-2xl p-6 space-y-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-muted-foreground block text-[11px]">Primary Resort &amp; Booking Line:</span>
                  <a href={`tel:${RESORT_METADATA.phone}`} className="text-foreground hover:text-amber-300 transition-colors font-bold">
                    {RESORT_METADATA.phone}
                  </a>
                  <span className="text-muted-foreground text-[10px] block mt-0.5">
                    Restaurant Direct: <a href={`tel:${RESORT_METADATA.altPhone}`} className="text-foreground hover:underline">{RESORT_METADATA.altPhone}</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-muted-foreground block text-[11px]">Official Email Desk:</span>
                  <a href={`mailto:${RESORT_METADATA.email}`} className="text-foreground hover:text-amber-300 transition-colors">
                    {RESORT_METADATA.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-muted-foreground block text-[11px]">Operations &amp; Check-in:</span>
                  <span className="text-foreground">Check-in 12:00 PM · Check-out 12:00 PM (24/7 Desk)</span>
                </div>
              </div>
            </div>

            {/* Travel Distances */}
            <div className="liquid-glass rounded-2xl p-6 border border-white/10 text-xs">
              <h4 className="font-mono text-amber-400 uppercase tracking-wider text-[11px] mb-3">
                Transit Distances &amp; Free Pickup
              </h4>
              <ul className="space-y-2 text-muted-foreground font-mono text-[11px]">
                <li className="flex justify-between">
                  <span>Anugrah Narayan Rd (Station):</span>
                  <span className="text-foreground font-medium">14 km (Free Pickup Available)</span>
                </li>
                <li className="flex justify-between">
                  <span>Gaya International Airport (GAY):</span>
                  <span className="text-foreground font-medium">78 km (~90 mins)</span>
                </li>
                <li className="flex justify-between">
                  <span>Patna Airport (PAT):</span>
                  <span className="text-foreground font-medium">140 km (~3 hrs)</span>
                </li>
                <li className="flex justify-between">
                  <span>Grand Trunk Road (NH-19):</span>
                  <span className="text-emerald-400 font-medium">Immediate Connection</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Contact / Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="liquid-glass rounded-2xl p-8 border border-white/10 shadow-2xl">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                Direct Inquiry &amp; Concierge Desk
              </span>
              <h3
                className="text-2xl sm:text-3xl text-foreground font-normal mt-1 mb-6"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Send a Message to The Haweli Desk
              </h3>

              {!messageSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Vardhan"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 81028 91308"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="guest@example.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                        Inquiry Topic
                      </label>
                      <select
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                      >
                        <option value="Room Booking" className="bg-slate-900">Room &amp; Suite Reservation</option>
                        <option value="Haweli Restaurant" className="bg-slate-900">Haweli Restaurant &amp; Dining Table</option>
                        <option value="Marriage Lawn" className="bg-slate-900">Marriage Lawn / Sheesh Mahal Wedding</option>
                        <option value="Corporate Event" className="bg-slate-900">Corporate Meeting / Conference</option>
                        <option value="Airport Transfer" className="bg-slate-900">Airport Transfer &amp; Station Pickup</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Your Message or Request Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please share planned travel dates, banquet guest size, or dining table requirements..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Guaranteed callback within 2 hours
                    </span>
                    <button
                      type="submit"
                      className="liquid-glass rounded-full px-8 py-3 text-xs text-foreground font-medium hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                      <span>Transmit Inquiry</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4
                    className="text-2xl text-foreground font-normal"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Inquiry Received by Front Desk
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                    Thank you, <strong className="text-foreground">{formName}</strong>. Our guest relations manager will call you at <span className="text-amber-400">{formPhone}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setMessageSent(false);
                      setFormMessage('');
                    }}
                    className="mt-6 text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quiet Footer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src={RESORT_METADATA.logoUrl} alt="Logo" className="w-6 h-8 object-contain" />
            <span
              className="text-lg text-foreground tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              The Haweli Resort
            </span>
            <span>·</span>
            <span className="text-amber-400/80 font-serif italic text-xs">&ldquo;Your happiness is our pleasure&rdquo;</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono">
            <a href="#studio" className="hover:text-foreground transition-colors">Suites</a>
            <a href="#dining" className="hover:text-foreground transition-colors">Restaurant</a>
            <a href="#banquets" className="hover:text-foreground transition-colors">Banquets</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#journal" className="hover:text-foreground transition-colors">Journal</a>
            <a
              href={RESORT_METADATA.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>thehaweliresorts.in</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="text-[11px] font-mono text-muted-foreground/60">
            © 2020–2026 The Haweli Resort &amp; Restaurant. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
