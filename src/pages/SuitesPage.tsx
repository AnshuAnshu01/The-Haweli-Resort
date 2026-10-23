import React, { useState } from 'react';
import { Calendar, Users, Check, ArrowRight, ShieldCheck, Printer, X, MessageSquare, ExternalLink } from 'lucide-react';
import { ROOMS_DATA, Room, RESORT_METADATA } from '../data/resortData';
import { createBookingWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

interface SuitesPageProps {
  onNavigateToDining: () => void;
}

export const SuitesPage: React.FC<SuitesPageProps> = ({ onNavigateToDining }) => {
  const [checkInDate, setCheckInDate] = useState('2026-10-25');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-27');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'suite' | 'deluxe' | 'family'>('all');

  // Booking Modal State
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [includeAirportTransfer, setIncludeAirportTransfer] = useState(false);
  const [includeDinnerPackage, setIncludeDinnerPackage] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [whatsAppText, setWhatsAppText] = useState('');

  const calculateNights = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  const filteredRooms = ROOMS_DATA.filter(
    (room) => selectedCategory === 'all' || room.category === selectedCategory
  );

  const handleOpenBookingModal = (room: Room) => {
    setSelectedRoom(room);
    setBookingConfirmed(false);
  };

  const handleCompleteReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `HWL-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingId(generatedId);

    const baseTotal = selectedRoom ? selectedRoom.pricePerNight * nights : 0;
    const addons = (includeAirportTransfer ? 2400 : 0) + (includeDinnerPackage ? 1800 * adults : 0);
    const tax = Math.round((baseTotal + addons) * 0.12);
    const grand = baseTotal + addons + tax;

    // Generate WhatsApp message
    const msg = createBookingWhatsAppMessage({
      bookingId: generatedId,
      roomName: selectedRoom ? selectedRoom.name : 'Deluxe Suite',
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      guests: adults + children,
      guestName,
      guestPhone,
      guestEmail,
      specialRequests,
      airportTransfer: includeAirportTransfer,
      dinnerPackage: includeDinnerPackage,
      totalAmount: grand,
    });

    setWhatsAppText(msg);
    setBookingConfirmed(true);

    // Automatically send to WhatsApp number (+91 8102891308) as requested
    openWhatsApp(msg);
  };

  const baseRoomTotal = selectedRoom ? selectedRoom.pricePerNight * nights : 0;
  const addonTotal = (includeAirportTransfer ? 2400 : 0) + (includeDinnerPackage ? 1800 * adults : 0);
  const taxes = Math.round((baseRoomTotal + addonTotal) * 0.12);
  const grandTotal = baseRoomTotal + addonTotal + taxes;

  return (
    <div className="w-full py-10 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
          Official Accommodations Catalogue
        </span>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal mt-2 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Royal Suites &amp; Sanctuaries
        </h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-3 leading-relaxed">
          Soundproof acoustic engineering meets Rajput-Mughal arches at Jasoiya More, Aurangabad.
          Every reservation includes complimentary breakfast buffet, swimming pool access, and station pickup.
        </p>
      </div>

      {/* Filter and Date Strip */}
      <div className="royal-card p-4 sm:p-6 mb-8 sm:mb-12 shadow-xl border border-[var(--border-subtle)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-mono flex items-center gap-1 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Check-in Date
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-mono flex items-center gap-1 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Check-out Date
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-mono flex items-center gap-1 font-semibold">
              <Users className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Guests
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            >
              <option value={1}>1 Adult</option>
              <option value={2}>2 Adults</option>
              <option value={3}>3 Adults</option>
              <option value={4}>4 Adults</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-mono font-semibold">
              Suite Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm sm:text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            >
              <option value="all">All Accommodations</option>
              <option value="suite">Royal Suites</option>
              <option value="deluxe">Executive AC / Deluxe</option>
              <option value="family">Family Residences</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:flex-wrap sm:justify-between items-start sm:items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <span className="text-[var(--accent-gold)] font-bold">{nights} Night{nights > 1 ? 's' : ''} Stay · Instant WhatsApp Dispatch</span>
          <span>Pay on arrival at reception · 100% Free Cancellation 50+ days prior</span>
        </div>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="royal-card overflow-hidden flex flex-col justify-between group shadow-md"
          >
            {/* Real Photography Header */}
            <div className="relative h-56 sm:h-72 overflow-hidden">
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-black/20 to-transparent" />

              <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-start">
                <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono px-3 py-1 rounded-full uppercase">
                  {room.category}
                </span>
                {room.badge && (
                  <span className="bg-[var(--accent-gold)] text-slate-950 font-bold text-[11px] font-mono px-3 py-1 rounded-full shadow-md">
                    {room.badge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-3.5 left-3.5 right-3.5">
                <h3
                  className="text-xl sm:text-3xl text-white font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {room.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-white/90 font-mono mt-1">
                  <span>{room.sizeSqFt} sq. ft.</span>
                  <span>·</span>
                  <span>Up to {room.maxGuests} Guests</span>
                  <span>·</span>
                  <span>{room.bedType}</span>
                </div>
              </div>
            </div>

            {/* Room Details & Highlights */}
            <div className="p-4.5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[var(--text-body)] leading-relaxed">
                  {room.description}
                </p>

                <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {room.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                      <Check className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="text-xl sm:text-2xl font-bold text-[#102648] dark:text-[#F4F0EA]">
                      ₹{room.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#5A6678] line-through">
                      ₹{room.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#4B658E]">/ night</span>
                  </div>
                  <span className="text-[11px] text-[#5A6678] block mt-0.5 font-mono">
                    + 12% GST · Pay on arrival
                  </span>
                </div>

                <button
                  onClick={() => handleOpenBookingModal(room)}
                  className="w-full sm:w-auto min-h-[46px] justify-center btn-royal-primary px-6 py-2.5 text-xs uppercase font-mono tracking-wider font-bold cursor-pointer flex items-center gap-2 active:scale-95 shadow-md"
                >
                  <span>Reserve Suite</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A96B]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal with WhatsApp Auto-Dispatch */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] rounded-2xl sm:rounded-3xl p-4.5 sm:p-8 shadow-2xl my-auto max-h-[88dvh] overflow-y-auto">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmed ? (
              <form onSubmit={handleCompleteReservation}>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono">
                    Direct Reservation Desk · WhatsApp Linked
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl text-[var(--text-primary)] font-normal mt-1"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Confirm Your Stay at {selectedRoom.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono">
                    {checkInDate} to {checkOutDate} · {nights} Night{nights > 1 ? 's' : ''} · {adults} Guest{adults > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Addons */}
                <div className="space-y-3 mb-6 p-4 rounded-xl bg-white/5 border border-[var(--border-subtle)] text-xs">
                  <span className="uppercase tracking-wider text-[var(--accent-gold)] font-mono block">
                    Bespoke Concierge Enhancements
                  </span>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeAirportTransfer}
                      onChange={(e) => setIncludeAirportTransfer(e.target.checked)}
                      className="mt-1 accent-amber-500 rounded"
                    />
                    <div>
                      <span className="text-[var(--text-primary)] font-medium block">
                        Airport / Station Chauffeur Transfer (+₹2,400)
                      </span>
                      <span className="text-[var(--text-secondary)]">
                        Executive sedan transfer from Gaya Airport (78 km) or Anugrah Narayan Road station.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer select-none pt-2 border-t border-[var(--border-subtle)]">
                    <input
                      type="checkbox"
                      checked={includeDinnerPackage}
                      onChange={(e) => setIncludeDinnerPackage(e.target.checked)}
                      className="mt-1 accent-amber-500 rounded"
                    />
                    <div>
                      <span className="text-[var(--text-primary)] font-medium block">
                        Royal Haweli Candlelight Dinner (+₹1,800 / guest)
                      </span>
                      <span className="text-[var(--text-secondary)]">
                        Four-course gourmet dinner including Champaran Handi Ahuna or Awadhi curries at our lawn cabana.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                      Guest Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kumar Arvind"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-2 text-[var(--text-primary)] text-sm sm:text-xs focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 81028 91308"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-2 text-[var(--text-primary)] text-sm sm:text-xs font-mono focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="guest@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full h-11 sm:h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-2 text-[var(--text-primary)] text-sm sm:text-xs focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Late check-in, ground floor preference, dietary preferences..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-2 text-[var(--text-primary)] text-sm sm:text-xs focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="p-4 rounded-xl bg-black/30 border border-[var(--border-subtle)] mb-6 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Base Room Rate ({nights} Nights × ₹{selectedRoom.pricePerNight})</span>
                    <span>₹{baseRoomTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {addonTotal > 0 && (
                    <div className="flex justify-between text-[var(--text-secondary)]">
                      <span>Addon Services</span>
                      <span>₹{addonTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>GST (12%)</span>
                    <span>₹{taxes.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-between text-sm font-bold text-[var(--text-primary)]">
                    <span>Total Due at Check-in</span>
                    <span className="text-[var(--accent-gold)]">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedRoom(null)}
                    className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer text-center border border-[var(--border-subtle)] rounded-full flex items-center justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[46px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 py-3 text-xs uppercase font-mono tracking-wider font-bold cursor-pointer flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Book &amp; Send to WhatsApp</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Confirmed Voucher with Direct WhatsApp Button */
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
                  Reservation Dispatched to Resort WhatsApp (+91 8102891308)
                </span>
                <h3
                  className="text-3xl text-[var(--text-primary)] font-normal mt-1"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Welcome to The Haweli Estate
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  Booking details for <strong className="text-[var(--text-primary)]">{guestName}</strong> have been sent to The Haweli Resort reservations team.
                </p>

                <div className="my-6 p-5 rounded-2xl bg-white/5 border border-[var(--border-subtle)] text-left text-xs font-mono space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between pb-2 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Booking Reference:</span>
                    <span className="text-[var(--accent-gold)] font-bold">{confirmedBookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Suite:</span>
                    <span className="text-[var(--text-primary)]">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Dates:</span>
                    <span className="text-[var(--text-primary)]">{checkInDate} to {checkOutDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Total Amount:</span>
                    <span className="text-emerald-400 font-bold">₹{grandTotal.toLocaleString('en-IN')} (Pay on Arrival)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => openWhatsApp(whatsAppText)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 py-2.5 text-xs uppercase font-mono font-bold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="liquid-glass rounded-full px-5 py-2.5 text-xs text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Slip</span>
                  </button>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] px-4 py-2 cursor-pointer font-mono"
                  >
                    Close
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
