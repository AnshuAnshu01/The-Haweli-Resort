import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, ExternalLink, Navigation, Compass } from 'lucide-react';
import { RESORT_METADATA } from '../data/resortData';
import { createContactInquiryWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Room Booking');
  const [formMessage, setFormMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = createContactInquiryWhatsAppMessage({
      name: formName,
      phone: formPhone,
      email: formEmail,
      subject: formSubject,
      message: formMessage,
    });
    openWhatsApp(msg);
    setMessageSent(true);
  };

  return (
    <div className="w-full py-8 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
          Location &amp; Concierge Desk
        </span>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal mt-2 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Reach The Haweli Resort
        </h1>
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base mt-2 sm:mt-3 leading-relaxed">
          Strategically located along the Grand Trunk Road (NH-19) corridor at Plot No. 303, Jasoiya More,
          Aurangabad, Bihar. Accessible 24 hours a day for room stays, dining, and wedding inquiries.
        </p>
      </div>

      {/* Interactive Google Map Section as requested */}
      <div className="royal-card overflow-hidden mb-12 sm:mb-16 border border-[var(--border-strong)] shadow-2xl">
        <div className="p-3 sm:p-4 bg-[var(--bg-secondary)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[var(--border-subtle)] text-xs font-mono">
          <div className="flex items-center gap-2 text-[var(--text-primary)]">
            <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
            <span className="text-[11px] sm:text-xs leading-tight">Plot 303, Narbdeshwar Nagar, Jasoiya More, Aurangabad, Bihar 824101</span>
          </div>
          <a
            href={RESORT_METADATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-gold)] hover:underline flex items-center gap-1 font-bold text-xs"
          >
            <span>Open in Google Maps Application</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="h-64 sm:h-96 w-full relative">
          <iframe
            title="The Haweli Resort Interactive Google Map"
            src={RESORT_METADATA.googleMapsEmbed}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Grid: Contact Cards & Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          <div className="royal-card p-4.5 sm:p-6">
            <h3 className="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-bold mb-3 sm:mb-4">
              Direct Contact Lines
            </h3>

            <div className="space-y-3.5 sm:space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Primary Resort &amp; Booking Line:</span>
                  <a href={`tel:${RESORT_METADATA.phone}`} className="text-[var(--text-primary)] text-sm font-bold hover:underline">
                    {RESORT_METADATA.phone}
                  </a>
                  <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                    Restaurant Direct: <a href={`tel:${RESORT_METADATA.altPhone}`} className="hover:underline text-[var(--text-primary)]">{RESORT_METADATA.altPhone}</a>
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[var(--border-subtle)]">
                <Mail className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Official Email:</span>
                  <a href={`mailto:${RESORT_METADATA.email}`} className="text-[var(--text-primary)] hover:underline break-all">
                    {RESORT_METADATA.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[var(--border-subtle)]">
                <Clock className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Front Desk &amp; Hours:</span>
                  <span className="text-[var(--text-primary)]">24/7 Front Desk · Restaurant: 11:00 AM – 11:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transit Distances */}
          <div className="royal-card p-4.5 sm:p-6">
            <h3 className="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-bold mb-3">
              Transit Distances &amp; Free Pickup
            </h3>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
              <li className="flex justify-between pb-1.5 border-b border-[var(--border-subtle)]">
                <span>Anugrah Narayan Rd (Railway):</span>
                <span className="text-[var(--text-primary)] font-bold">14 km (Free Station Pickup)</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-[var(--border-subtle)]">
                <span>Gaya Airport (GAY):</span>
                <span className="text-[var(--text-primary)] font-bold">78 km (~90 mins)</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-[var(--border-subtle)]">
                <span>Patna Airport (PAT):</span>
                <span className="text-[var(--text-primary)] font-bold">140 km (~3 hrs)</span>
              </li>
              <li className="flex justify-between">
                <span>Grand Trunk Road (NH-19):</span>
                <span className="text-emerald-400 font-bold">Immediate Highway Access</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="royal-card p-4.5 sm:p-8 border border-[var(--border-strong)]">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
              Inquiry Dispatch
            </span>
            <h3
              className="text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] font-normal mt-1 mb-4 sm:mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Send an Instant Message to Concierge
            </h3>

            {!messageSent ? (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Anand Vardhan"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 sm:px-4 py-2.5 h-11 sm:h-10 text-sm sm:text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 81028 91308"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 sm:px-4 py-2.5 h-11 sm:h-10 text-sm sm:text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="guest@example.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 sm:px-4 py-2.5 h-11 sm:h-10 text-sm sm:text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Inquiry Topic</label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 sm:px-4 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    >
                      <option value="Room Booking">Room &amp; Suite Reservation</option>
                      <option value="Haweli Restaurant">Haweli Restaurant &amp; Table</option>
                      <option value="Marriage Lawn">Marriage Lawn &amp; Sheesh Mahal</option>
                      <option value="Corporate Event">Corporate Conference</option>
                      <option value="Airport Transfer">Station / Airport Pickup</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please specify travel dates, banquet guest numbers, or table booking requests..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-[var(--text-muted)] font-mono text-center sm:text-left">Guaranteed response within 2 hours</span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto btn-royal-primary px-8 py-3 min-h-[46px] text-xs uppercase font-mono tracking-wider font-bold cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Message Sent to Concierge WhatsApp
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  Thank you, <strong className="text-[var(--text-primary)]">{formName}</strong>. Your inquiry has been routed to our direct WhatsApp line (+91 8102891308).
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-6">
                  <a
                    href={`https://wa.me/918102891308?text=${encodeURIComponent(createContactInquiryWhatsAppMessage({
                      name: formName,
                      phone: formPhone,
                      email: formEmail,
                      subject: formSubject,
                      message: formMessage,
                    }))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-transform active:scale-95"
                  >
                    <span>Open in WhatsApp (+91 8102891308)</span>
                  </a>
                  <button
                    onClick={() => {
                      setMessageSent(false);
                      setFormMessage('');
                    }}
                    className="text-xs text-[var(--accent-gold)] underline cursor-pointer py-2 text-center"
                  >
                    Send another inquiry
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
