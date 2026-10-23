import React, { useState } from 'react';
import { X, KeyRound, User, ShieldCheck, CheckCircle2, Search, ArrowRight, Hotel } from 'lucide-react';
import { RESORT_METADATA } from '../data/resortData';

interface GuestLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuestLoginModal: React.FC<GuestLoginModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'guest' | 'staff'>('guest');
  const [bookingRef, setBookingRef] = useState('');
  const [phone, setPhone] = useState('');
  const [foundBooking, setFoundBooking] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  // Staff login state
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPass, setStaffPass] = useState('');
  const [staffLoggedIn, setStaffLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleGuestSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    // Simulate finding a booking or generating a mock active lookup
    if (bookingRef.trim().length > 0 || phone.trim().length > 0) {
      setFoundBooking({
        id: bookingRef.trim() || `HWL-${Math.floor(100000 + Math.random() * 900000)}`,
        guestName: 'Kumar Arvind',
        roomType: 'Heritage Royal Suite',
        checkIn: 'Today, 12:00 PM',
        checkOut: '25 Oct 2026, 12:00 PM',
        status: 'Confirmed & Guaranteed',
        wifiCode: 'HAWELI_GUEST_2026',
        roomNumber: 'Suite 204 (Courtyard View)'
      });
    } else {
      setFoundBooking(null);
    }
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#071720] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-white/10"
          aria-label="Close portal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Authentic Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-amber-500/20 rounded-full blur-md" />
            <img
              src={RESORT_METADATA.logoUrl}
              alt="The Haweli Resort Logo"
              className="relative w-16 h-20 object-contain drop-shadow-md"
            />
          </div>
          <h3
            className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The Haweli Portal
          </h3>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Direct Guest Reservation Lookup &amp; Management
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10 mt-4">
            <button
              onClick={() => {
                setMode('guest');
                setSearched(false);
              }}
              className={`px-4 py-1.5 text-xs rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                mode === 'guest'
                  ? 'bg-amber-400 text-slate-950 font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Guest Lookup</span>
            </button>
            <button
              onClick={() => {
                setMode('staff');
                setStaffLoggedIn(false);
              }}
              className={`px-4 py-1.5 text-xs rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                mode === 'staff'
                  ? 'bg-amber-400 text-slate-950 font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>

        {/* Guest Search Mode */}
        {mode === 'guest' && (
          <div>
            {!foundBooking ? (
              <form onSubmit={handleGuestSearch} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                    Booking Reference ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HWL-784210"
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50 uppercase font-mono"
                  />
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-white/5" />
                  <span className="flex-shrink mx-3 text-[10px] text-muted-foreground font-mono uppercase">
                    Or via registered phone
                  </span>
                  <div className="flex-grow border-t border-white/5" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 81028 91308"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full liquid-glass rounded-full py-3 text-xs text-foreground font-medium hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  <span>Retrieve My Reservation</span>
                </button>

                <p className="text-[11px] text-muted-foreground/60 text-center font-mono">
                  No account password needed. Reference ID sent upon booking.
                </p>
              </form>
            ) : (
              /* Found Guest Itinerary */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 text-xs font-mono space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      {foundBooking.status}
                    </span>
                    <span className="text-amber-400 font-bold">{foundBooking.id}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guest:</span>
                    <span className="text-foreground font-medium">{foundBooking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Allocated:</span>
                    <span className="text-foreground">{foundBooking.roomNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="text-foreground">{foundBooking.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stay Dates:</span>
                    <span className="text-foreground">{foundBooking.checkIn} - {foundBooking.checkOut}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-muted-foreground">Resort High-Speed Wi-Fi:</span>
                    <span className="text-amber-300 font-bold">{foundBooking.wifiCode}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setFoundBooking(null)}
                    className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5"
                  >
                    Search another
                  </button>
                  <button
                    onClick={onClose}
                    className="liquid-glass rounded-full px-5 py-2 text-xs text-foreground"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Staff Login Mode */}
        {mode === 'staff' && (
          <div>
            {!staffLoggedIn ? (
              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                    Staff Identity Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="thehaweliresorts@gmail.com"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                    Security Key / Passcode
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={staffPass}
                    onChange={(e) => setStaffPass(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full liquid-glass rounded-full py-3 text-xs text-foreground font-medium hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Authenticate Staff Session</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <Hotel className="w-6 h-6" />
                </div>
                <h4
                  className="text-2xl text-foreground font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Management Session Active
                </h4>
                <p className="text-xs text-muted-foreground">
                  Logged in as Administrator (Chairman / General Manager).
                </p>
                <div className="p-4 rounded-xl bg-white/5 text-xs text-left font-mono space-y-2">
                  <div className="flex justify-between">
                    <span>Occupancy Today:</span>
                    <span className="text-emerald-400">84% (18/22 Rooms)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upcoming Banquets:</span>
                    <span className="text-amber-400">3 Wedding Receptions</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Inquiries:</span>
                    <span className="text-sky-400">5 New Leads</span>
                  </div>
                </div>
                <button
                  onClick={() => setStaffLoggedIn(false)}
                  className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
                >
                  Log out session
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
