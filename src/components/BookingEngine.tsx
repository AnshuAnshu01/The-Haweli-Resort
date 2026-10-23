import React, { useState } from 'react';
import { ROOMS_DATA, Room } from '../data/resortData';
import { Calendar, Users, Check, Sparkles, X, ArrowRight, ShieldCheck, Printer } from 'lucide-react';

interface BookingEngineProps {
  onNavigateToDining: () => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({ onNavigateToDining }) => {
  // Search parameters
  const [checkInDate, setCheckInDate] = useState('2026-10-25');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-27');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'suite' | 'deluxe' | 'executive' | 'family'>('all');

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

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  // Filter rooms
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
    setBookingConfirmed(true);
  };

  // Pricing calculations
  const baseRoomTotal = selectedRoom ? selectedRoom.pricePerNight * nights : 0;
  const addonTotal = (includeAirportTransfer ? 2400 : 0) + (includeDinnerPackage ? 1800 * adults : 0);
  const taxes = Math.round((baseRoomTotal + addonTotal) * 0.12);
  const grandTotal = baseRoomTotal + addonTotal + taxes;

  return (
    <section id="studio" className="relative z-10 py-24 px-6 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-amber-400/90 font-mono">
          The Haweli Resort Direct Reservation Studio
        </span>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-foreground font-normal mt-3 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Royal Sanctuaries of Calm &amp; Rest
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
          Crafted with architectural grandeur at Plot 303, Jasoiya More, Aurangabad, Bihar. Each suite blends
          timeless regal warmth, soundproof acoustic serenity, complimentary breakfast buffet, and swimming pool access.
        </p>
      </div>

      {/* Booking Search Strip */}
      <div className="liquid-glass rounded-2xl p-4 sm:p-6 mb-16 border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Check-in */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-foreground/70" /> Check-in Date
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-foreground/70" /> Check-out Date
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5 font-mono">
              <Users className="w-3.5 h-3.5 text-foreground/70" /> Guests & Occupancy
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-foreground text-sm focus:outline-none focus:border-white/30"
              >
                <option value={1} className="bg-slate-900">1 Adult</option>
                <option value={2} className="bg-slate-900">2 Adults</option>
                <option value={3} className="bg-slate-900">3 Adults</option>
                <option value={4} className="bg-slate-900">4 Adults</option>
              </select>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-foreground text-sm focus:outline-none focus:border-white/30"
              >
                <option value={0} className="bg-slate-900">0 Kids</option>
                <option value={1} className="bg-slate-900">1 Kid</option>
                <option value={2} className="bg-slate-900">2 Kids</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-mono">
              Suite Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-white/30"
            >
              <option value="all" className="bg-slate-900">All Accommodations</option>
              <option value="suite" className="bg-slate-900">Royal Suites</option>
              <option value="executive" className="bg-slate-900">Executive Rooms</option>
              <option value="deluxe" className="bg-slate-900">Deluxe Garden</option>
              <option value="family" className="bg-slate-900">Family Residences</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium font-mono">{nights} Night{nights > 1 ? 's' : ''} Stay</span>
            <span>·</span>
            <span>{adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child` : ''}</span>
            <span>·</span>
            <span className="text-emerald-400">Best Direct Booking Rate Guaranteed</span>
          </div>
          <span className="text-[11px] font-mono">100% Verified Availability · Immediate Confirmation</span>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="liquid-glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-white/30 group"
          >
            {/* Visual Hero Header */}
            <div className={`relative h-64 p-6 flex flex-col justify-between bg-gradient-to-br ${room.gradientTheme}`}>
              {/* Subtle architectural backdrop */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent" />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                  {room.category.toUpperCase()} COLLECTION
                </span>
                {room.badge && (
                  <span className="text-xs font-medium text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                    {room.badge}
                  </span>
                )}
              </div>

              {/* Title & Specs */}
              <div className="relative z-10">
                <h3
                  className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {room.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{room.subtitle}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/80 mt-3 font-mono">
                  <span>{room.sizeSqFt} sq. ft.</span>
                  <span>·</span>
                  <span>Up to {room.maxGuests} Guests</span>
                  <span>·</span>
                  <span>{room.bedType}</span>
                </div>
              </div>
            </div>

            {/* Room Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {room.description}
                </p>

                {/* Highlights */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {room.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-foreground/90">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-foreground font-mono">
                      ₹{room.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-muted-foreground line-through font-mono">
                      ₹{room.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-muted-foreground">/ night</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground/80 block mt-0.5">
                    + 12% GST · Free Cancellation 50+ days prior · Pay on arrival
                  </span>
                </div>

                <button
                  onClick={() => handleOpenBookingModal(room)}
                  className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-all cursor-pointer flex items-center gap-2 font-medium"
                >
                  <span>Reserve Suite</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reservation Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#091b26] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmed ? (
              <form onSubmit={handleCompleteReservation}>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
                    Direct Reservation Studio
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl text-foreground font-normal mt-1"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Confirm Your Stay at {selectedRoom.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {checkInDate} to {checkOutDate} · {nights} Night{nights > 1 ? 's' : ''} · {adults} Guest{adults > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Add-ons */}
                <div className="space-y-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                    Tailored Hospitality Enhancements
                  </h4>
                  
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeAirportTransfer}
                      onChange={(e) => setIncludeAirportTransfer(e.target.checked)}
                      className="mt-1 accent-amber-500 rounded"
                    />
                    <div className="text-xs">
                      <span className="text-foreground font-medium block">
                        Airport / Railway Chauffeur Transfer (+₹2,400)
                      </span>
                      <span className="text-muted-foreground">
                        Private executive sedan transfer from Gaya International Airport (78 km) or Anugrah Narayan Road station.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer select-none pt-2 border-t border-white/5">
                    <input
                      type="checkbox"
                      checked={includeDinnerPackage}
                      onChange={(e) => setIncludeDinnerPackage(e.target.checked)}
                      className="mt-1 accent-amber-500 rounded"
                    />
                    <div className="text-xs">
                      <span className="text-foreground font-medium block">
                        Royal Haweli Candlelight Dinner (+₹1,800 / guest)
                      </span>
                      <span className="text-muted-foreground">
                        Four-course gourmet dinner including Champaran Handi Ahuna or Awadhi curries at our private garden cabana.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kumar Arvind"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-foreground text-sm focus:outline-none focus:border-amber-400/50"
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
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-foreground text-sm focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="patron@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-foreground text-sm focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Dietary preferences, late check-in time, or occasion celebration..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-foreground text-sm focus:outline-none focus:border-amber-400/50"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Base Room Rate ({nights} Night{nights > 1 ? 's' : ''} × ₹{selectedRoom.pricePerNight.toLocaleString('en-IN')})</span>
                    <span>₹{baseRoomTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {addonTotal > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Selected Hospitality Add-ons</span>
                      <span>₹{addonTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Applicable GST (12%)</span>
                    <span>₹{taxes.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-semibold text-foreground">
                    <span>Total Payable at Check-in</span>
                    <span className="text-amber-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRoom(null)}
                    className="px-5 py-2.5 rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground hover:scale-[1.02] transition-transform cursor-pointer font-medium flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Confirm & Reserve Room</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Booking Confirmed State */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Check className="w-8 h-8" />
                </div>

                <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
                  Reservation Successfully Confirmed
                </span>
                <h3
                  className="text-3xl text-foreground font-normal mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  We Look Forward to Welcoming You
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  A confirmation voucher and itinerary has been registered for <strong className="text-foreground">{guestName}</strong>.
                </p>

                {/* Voucher Card */}
                <div className="my-6 p-6 rounded-2xl bg-white/5 border border-white/10 text-left max-w-lg mx-auto text-xs space-y-3 font-mono">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-muted-foreground">Booking Reference:</span>
                    <span className="text-amber-400 font-bold text-sm">{confirmedBookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property:</span>
                    <span className="text-foreground">The Haweli Resort, Jasoiya More</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accommodation:</span>
                    <span className="text-foreground">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dates:</span>
                    <span className="text-foreground">{checkInDate} to {checkOutDate} ({nights} Nights)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="text-emerald-400 font-bold">₹{grandTotal.toLocaleString('en-IN')} (Pay on arrival)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="liquid-glass rounded-full px-6 py-2.5 text-xs text-foreground hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Voucher</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRoom(null);
                      onNavigateToDining();
                    }}
                    className="bg-white/10 hover:bg-white/20 rounded-full px-6 py-2.5 text-xs text-foreground transition-colors cursor-pointer"
                  >
                    Reserve Dining Table
                  </button>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="text-xs text-muted-foreground hover:text-foreground px-4 py-2 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
