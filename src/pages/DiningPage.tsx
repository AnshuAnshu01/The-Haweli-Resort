import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem, RESORT_METADATA } from '../data/resortData';
import { Flame, Plus, Minus, Calendar, ShoppingBag, Check, X, Users, MessageSquare, ExternalLink } from 'lucide-react';
import {
  createDiningOrderWhatsAppMessage,
  createTableReservationWhatsAppMessage,
  openWhatsApp,
} from '../utils/whatsapp';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface DiningPageProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export const DiningPage: React.FC<DiningPageProps> = ({
  cart,
  setCart,
  isCartOpen,
  setIsCartOpen,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'nonveg' | 'special'>('all');
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [tableConfirmed, setTableConfirmed] = useState(false);
  const [tableReferenceId, setTableReferenceId] = useState('');
  const [tableWhatsAppText, setTableWhatsAppText] = useState('');

  // Table reservation
  const [resDate, setResDate] = useState('2026-10-25');
  const [resTime, setResTime] = useState('08:00 PM');
  const [resGuests, setResGuests] = useState(4);
  const [resSeating, setResSeating] = useState('Royal Main Hall');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');

  // Order state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderGuestName, setOrderGuestName] = useState('');
  const [orderGuestPhone, setOrderGuestPhone] = useState('');
  const [orderRoomNumber, setOrderRoomNumber] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderWhatsAppText, setOrderWhatsAppText] = useState('');

  // Cart helpers
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((ci) =>
          ci.item.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci
        );
      }
      return prev.filter((ci) => ci.item.id !== itemId);
    });
  };

  const getItemQuantityInCart = (itemId: string) => {
    const found = cart.find((ci) => ci.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet =
      dietaryFilter === 'all' ||
      (dietaryFilter === 'veg' && item.isVeg) ||
      (dietaryFilter === 'nonveg' && !item.isVeg) ||
      (dietaryFilter === 'special' && item.isChefSpecial);
    return matchesCategory && matchesDiet;
  });

  // Table reservation submit with WhatsApp auto-dispatch
  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `HWL-TBL-${Math.floor(1000 + Math.random() * 9000)}`;
    setTableReferenceId(id);

    const msg = createTableReservationWhatsAppMessage({
      referenceId: id,
      guestName: resName,
      phone: resPhone,
      date: resDate,
      time: resTime,
      guests: resGuests,
      seatingZone: resSeating,
    });

    setTableWhatsAppText(msg);
    setTableConfirmed(true);

    // Send to WhatsApp number (+91 8102891308)
    openWhatsApp(msg);
  };

  const subtotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const restaurantTax = Math.round(subtotal * 0.05);
  const totalCart = subtotal + restaurantTax;

  // Order submission with WhatsApp auto-dispatch
  const handlePlaceDiningOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const itemsForWhatsApp = cart.map((ci) => ({
      name: ci.item.name,
      quantity: ci.quantity,
      price: ci.item.price,
    }));

    const msg = createDiningOrderWhatsAppMessage({
      guestName: orderGuestName || 'Valued Guest',
      guestPhone: orderGuestPhone || '+91 8102891308',
      tableOrRoom: orderRoomNumber,
      items: itemsForWhatsApp,
      subtotal,
      tax: restaurantTax,
      total: totalCart,
      note: orderNote,
    });

    setOrderWhatsAppText(msg);
    setOrderPlaced(true);

    // Send to WhatsApp number (+91 8102891308)
    openWhatsApp(msg);
  };

  return (
    <div className="w-full py-8 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-4 sm:gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
            Gourmet Heritage Gastronomy
          </span>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal mt-2 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The Haweli Restaurant
          </h1>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base mt-2 sm:mt-3 max-w-2xl leading-relaxed">
            Celebrated culinary destination in Aurangabad, Bihar. Famed for our 18-hour slow-cooked
            Champaran Handi Ahuna Gosht, Awadhi Dum Biryanis, and flame-seared tandoori specialties.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => {
              setTableConfirmed(false);
              setTableModalOpen(true);
            }}
            className="btn-royal-primary px-5 sm:px-6 min-h-[44px] text-xs uppercase font-mono tracking-wider font-bold cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md flex-1 sm:flex-initial"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Reserve Table</span>
          </button>

          {cart.length > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#523122] border border-[#C8A96B] text-[#F4F0EA] rounded-full px-4 sm:px-5 min-h-[44px] text-xs hover:bg-[#6e432f] transition-all flex items-center justify-center gap-2 font-mono shadow-md flex-1 sm:flex-initial"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>{cart.length} Dish{cart.length > 1 ? 'es' : ''} (₹{subtotal})</span>
            </button>
          )}
        </div>
      </div>

      {/* Categories & Dietary Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1">
          {[
            { id: 'all', label: 'All Delicacies' },
            { id: 'starters', label: 'Starters & Kebabs' },
            { id: 'tandoor', label: 'Clay Oven Tandoor' },
            { id: 'mains', label: 'Handi & Royal Curries' },
            { id: 'biryani', label: 'Biryani & Breads' },
            { id: 'beverages', label: 'Artisanal Mocktails' },
            { id: 'desserts', label: 'Heritage Desserts' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 min-h-[40px] text-xs rounded-full transition-all cursor-pointer font-mono whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#102648] text-[#F4F0EA] border border-[#C8A96B] font-bold shadow-md'
                  : 'text-[#4B658E] hover:text-[#102648] hover:bg-[#E8E1D8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white/5 rounded-xl border border-[var(--border-subtle)] shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs rounded-lg transition-colors cursor-pointer font-mono whitespace-nowrap ${
              dietaryFilter === 'all' ? 'bg-white/20 text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setDietaryFilter('veg')}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs rounded-lg transition-colors cursor-pointer font-mono flex items-center gap-1 whitespace-nowrap ${
              dietaryFilter === 'veg' ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/30' : 'text-[var(--text-muted)] hover:text-emerald-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Pure Veg</span>
          </button>
          <button
            onClick={() => setDietaryFilter('nonveg')}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs rounded-lg transition-colors cursor-pointer font-mono flex items-center gap-1 whitespace-nowrap ${
              dietaryFilter === 'nonveg' ? 'bg-rose-950/80 text-rose-300 font-bold border border-rose-500/30' : 'text-[var(--text-muted)] hover:text-rose-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span>Non-Veg</span>
          </button>
          <button
            onClick={() => setDietaryFilter('special')}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs rounded-lg transition-colors cursor-pointer font-mono flex items-center gap-1 whitespace-nowrap ${
              dietaryFilter === 'special' ? 'bg-amber-950/80 text-amber-300 font-bold border border-amber-500/30' : 'text-[var(--text-muted)] hover:text-amber-400'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Chef Special</span>
          </button>
        </div>
      </div>

      {/* Prominent Cuisine Image Cards as requested */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredItems.map((item) => {
          const qty = getItemQuantityInCart(item.id);
          return (
            <div
              key={item.id}
              className="royal-card overflow-hidden flex flex-col justify-between group shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Large, Appetizing Cuisine Photo */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-black/10 to-transparent" />
                
                {/* Dietary Symbol Badge */}
                <div className="absolute top-3 left-3">
                  <div
                    className={`w-5 h-5 bg-black/75 backdrop-blur-md border flex items-center justify-center p-0.5 rounded-sm ${
                      item.isVeg ? 'border-emerald-500' : 'border-rose-500'
                    }`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  </div>
                </div>

                {/* Chef Special Badge */}
                {item.isChefSpecial && (
                  <span className="absolute top-3 right-3 text-[10px] font-mono font-bold text-amber-300 bg-black/80 backdrop-blur-md border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" /> Haweli Special
                  </span>
                )}

                {/* Price pill right on image */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 font-mono text-xs font-bold text-amber-300">
                  ₹{item.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Text & Ordering */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-lg sm:text-xl text-[var(--text-primary)] font-normal group-hover:text-[var(--accent-gold)] transition-colors"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {item.name}
                  </h3>

                  {item.hindiName && (
                    <span className="text-xs text-[var(--accent-gold)] font-serif block mt-0.5">
                      {item.hindiName}
                    </span>
                  )}

                  <p className="text-xs text-[var(--text-body)] mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-[11px] font-mono text-[#4B658E]">
                    <span>Portion: {item.portion}</span>
                    <span>·</span>
                    <span>Spice: {item.spiceLevel === 1 ? 'Mild' : item.spiceLevel === 2 ? 'Medium' : 'Hot'}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-4 sm:mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5A6678]">
                    In-Room / Dine-in
                  </span>

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="btn-royal-primary px-4 py-2 min-h-[38px] text-xs uppercase font-mono tracking-wider font-bold cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#C8A96B]" />
                      <span>Add Dish</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 sm:gap-2 bg-[#102648] text-[#F4F0EA] rounded-full px-2 py-1 border border-[#C8A96B] font-mono text-xs shadow-sm">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-[#CDD4DC] hover:text-rose-400 active:scale-95 cursor-pointer font-bold text-sm"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-bold text-[#F4F0EA] px-1">{qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 flex items-center justify-center text-[#CDD4DC] hover:text-emerald-400 active:scale-95 cursor-pointer font-bold text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Reservation Modal with WhatsApp dispatch */}
      {tableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[var(--bg-secondary)] border border-[var(--border-strong)] rounded-2xl sm:rounded-3xl p-4.5 sm:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto">
            <button
              onClick={() => setTableModalOpen(false)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!tableConfirmed ? (
              <form onSubmit={handleTableSubmit} className="space-y-3.5 sm:space-y-4">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
                    Haweli Restaurant · WhatsApp Direct
                  </span>
                  <h3
                    className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal mt-0.5"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Table Reservation
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Date</label>
                    <input
                      type="date"
                      required
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Time</label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                    >
                      <option value="01:00 PM">01:00 PM (Lunch)</option>
                      <option value="08:00 PM">08:00 PM (Dinner)</option>
                      <option value="09:00 PM">09:00 PM (Dinner)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Guests</label>
                    <select
                      value={resGuests}
                      onChange={(e) => setResGuests(Number(e.target.value))}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                    >
                      {[1, 2, 4, 6, 8, 12].map((n) => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Seating</label>
                    <select
                      value={resSeating}
                      onChange={(e) => setResSeating(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs font-mono text-[var(--text-primary)]"
                    >
                      <option value="Royal Main Hall">Royal Main Hall</option>
                      <option value="Garden Lawn Cabana">Garden Lawn Cabana</option>
                      <option value="Courtyard Veranda">Courtyard Veranda</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Kumar Arvind"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 81028 91308"
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-sm sm:text-xs text-[var(--text-primary)] font-mono"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setTableModalOpen(false)}
                    className="px-4 py-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer order-2 sm:order-1 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 py-2.5 min-h-[46px] text-xs uppercase font-mono tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md order-1 sm:order-2 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send to WhatsApp</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Reservation Dispatched to WhatsApp
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono">
                  Code: <span className="text-[var(--accent-gold)] font-bold">{tableReferenceId}</span>
                </p>
                <div className="my-4 p-4 rounded-xl bg-white/5 text-xs font-mono space-y-1 text-left text-[var(--text-secondary)]">
                  <div>Date: <span className="text-[var(--text-primary)]">{resDate} at {resTime}</span></div>
                  <div>Party: <span className="text-[var(--text-primary)]">{resGuests} Guests</span></div>
                  <div>Zone: <span className="text-[var(--text-primary)]">{resSeating}</span></div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-2.5">
                  <button
                    onClick={() => openWhatsApp(tableWhatsAppText)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-5 py-2.5 min-h-[44px] text-xs font-mono font-bold flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setTableModalOpen(false)}
                    className="liquid-glass rounded-full px-5 py-2.5 min-h-[44px] text-xs text-[var(--text-primary)] font-mono flex items-center justify-center"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer with WhatsApp Order Dispatch */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
          <div className="w-full sm:max-w-md bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] h-full p-4 sm:p-6 flex flex-col justify-between shadow-2xl pb-[calc(1.5rem+env(safe-area-inset-bottom))] overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[var(--accent-gold)]" />
                  <h3 className="text-xl text-[var(--text-primary)]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Dining Tray ({cart.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!orderPlaced ? (
                <>
                  <div className="divide-y divide-[var(--border-subtle)] max-h-[38vh] sm:max-h-[45vh] overflow-y-auto my-3 sm:my-4 pr-1">
                    {cart.map((ci) => (
                      <div key={ci.item.id} className="py-3 flex justify-between items-center text-xs">
                        <div className="pr-2">
                          <span className="text-[var(--text-primary)] font-medium block leading-snug">{ci.item.name}</span>
                          <span className="text-[var(--text-muted)] font-mono text-[11px]">₹{ci.item.price} each</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono shrink-0">
                          <button
                            onClick={() => removeFromCart(ci.item.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-[var(--text-muted)] hover:text-rose-400 active:scale-95 text-sm font-bold"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-[var(--text-primary)] font-bold px-1">{ci.quantity}</span>
                          <button
                            onClick={() => addToCart(ci.item)}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-[var(--text-muted)] hover:text-emerald-400 active:scale-95 text-sm font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          <span className="font-bold text-[var(--accent-gold)] min-w-12 text-right ml-1">
                            ₹{(ci.item.price * ci.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {cart.length > 0 && (
                    <form onSubmit={handlePlaceDiningOrder} className="pt-2 space-y-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kumar Arvind"
                          value={orderGuestName}
                          onChange={(e) => setOrderGuestName(e.target.value)}
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-[var(--text-primary)] text-sm sm:text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-2">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                            WhatsApp Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 81028 91308"
                            value={orderGuestPhone}
                            onChange={(e) => setOrderGuestPhone(e.target.value)}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-[var(--text-primary)] text-sm sm:text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                            Table / Suite No. *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Table 4 or Suite 204"
                            value={orderRoomNumber}
                            onChange={(e) => setOrderRoomNumber(e.target.value)}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-[var(--text-primary)] text-sm sm:text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
                          Cooking Note (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mild spice, extra butter naan"
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 h-11 sm:h-10 text-[var(--text-primary)] text-sm sm:text-xs font-mono"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-black/30 border border-[var(--border-subtle)] text-xs font-mono space-y-1 mb-4">
                        <div className="flex justify-between text-[var(--text-secondary)]">
                          <span>Subtotal</span>
                          <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-[var(--text-secondary)]">
                          <span>GST (5%)</span>
                          <span>₹{restaurantTax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="pt-1 border-t border-[var(--border-subtle)] flex justify-between font-bold text-[var(--text-primary)]">
                          <span>Total Amount</span>
                          <span className="text-[var(--accent-gold)]">₹{totalCart.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-full min-h-[48px] py-3 text-xs uppercase font-mono tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Order to WhatsApp (+91 8102891308)</span>
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div className="py-8 sm:py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl sm:text-2xl text-[var(--text-primary)]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Order Sent to Kitchen via WhatsApp
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-2">
                    Delivering to <strong className="text-[var(--text-primary)]">{orderRoomNumber}</strong> in 25-30 minutes.
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5">
                    <button
                      onClick={() => openWhatsApp(orderWhatsAppText)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 py-2.5 min-h-[44px] text-xs font-mono font-bold flex items-center justify-center gap-2 active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Re-open in WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        setCart([]);
                        setOrderPlaced(false);
                        setIsCartOpen(false);
                      }}
                      className="liquid-glass rounded-full px-6 py-2.5 min-h-[44px] text-xs text-[var(--text-primary)] font-mono flex items-center justify-center"
                    >
                      Close Tray
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="text-[11px] text-[var(--text-muted)] text-center font-mono mt-4">
              The Haweli Restaurant · WhatsApp: +91 8102891308
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
