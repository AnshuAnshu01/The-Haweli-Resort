import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/resortData';
import { Utensils, Flame, Leaf, Plus, Minus, Check, Clock, Calendar, Users, X, ShoppingBag } from 'lucide-react';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface RestaurantMenuProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export const RestaurantMenu: React.FC<RestaurantMenuProps> = ({
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

  // Table reservation form state
  const [resDate, setResDate] = useState('2026-10-25');
  const [resTime, setResTime] = useState('08:00 PM');
  const [resGuests, setResGuests] = useState(4);
  const [resSeating, setResSeating] = useState('Royal Main Dining Hall');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');

  // Cart operations
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

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet =
      dietaryFilter === 'all' ||
      (dietaryFilter === 'veg' && item.isVeg) ||
      (dietaryFilter === 'nonveg' && !item.isVeg) ||
      (dietaryFilter === 'special' && item.isChefSpecial);
    return matchesCategory && matchesDiet;
  });

  // Table reservation submit
  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `HWL-TBL-${Math.floor(1000 + Math.random() * 9000)}`;
    setTableReferenceId(id);
    setTableConfirmed(true);
  };

  // Cart totals
  const subtotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const restaurantTax = Math.round(subtotal * 0.05); // 5% GST on dining
  const totalCart = subtotal + restaurantTax;

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderRoomNumber, setOrderRoomNumber] = useState('');

  const handlePlaceDiningOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  return (
    <section id="dining" className="relative z-10 py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
            Celebrated Fine Dining at Jasoiya More
          </span>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl text-foreground font-normal mt-2 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The Haweli Restaurant
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-2 sm:mt-3 max-w-xl leading-relaxed">
            From our signature slow-simmered Champaran Handi Ahuna to Awadhi Dum Biryanis and
            flame-charred tandoori kebabs, experience the culinary heritage of Bihar and North India.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => {
              setTableConfirmed(false);
              setTableModalOpen(true);
            }}
            className="liquid-glass rounded-full px-5 sm:px-6 py-2.5 min-h-[44px] text-xs text-foreground hover:scale-[1.03] transition-all cursor-pointer flex items-center justify-center gap-2 flex-1 sm:flex-initial"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Reserve a Table</span>
          </button>

          {cart.length > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full px-4 sm:px-5 py-2.5 min-h-[44px] text-xs hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-2 font-mono flex-1 sm:flex-initial"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{cart.length} Dish{cart.length > 1 ? 'es' : ''} (₹{subtotal})</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Dietary Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-white/10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1">
          {[
            { id: 'all', label: 'All Delicacies' },
            { id: 'starters', label: 'Starters & Kebabs' },
            { id: 'tandoor', label: 'Clay Oven Tandoor' },
            { id: 'mains', label: 'Handi & Royal Curries' },
            { id: 'biryani', label: 'Dum Biryani & Breads' },
            { id: 'beverages', label: 'Artisanal Mocktails' },
            { id: 'desserts', label: 'Heritage Desserts' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 min-h-[40px] text-xs rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-white text-slate-950 font-medium shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              dietaryFilter === 'all' ? 'bg-white/20 text-foreground font-medium' : 'text-muted-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setDietaryFilter('veg')}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              dietaryFilter === 'veg' ? 'bg-emerald-950/80 text-emerald-300 font-medium border border-emerald-500/30' : 'text-muted-foreground hover:text-emerald-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            <span>Pure Veg</span>
          </button>
          <button
            onClick={() => setDietaryFilter('nonveg')}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              dietaryFilter === 'nonveg' ? 'bg-rose-950/80 text-rose-300 font-medium border border-rose-500/30' : 'text-muted-foreground hover:text-rose-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />
            <span>Non-Veg</span>
          </button>
          <button
            onClick={() => setDietaryFilter('special')}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              dietaryFilter === 'special' ? 'bg-amber-950/80 text-amber-300 font-medium border border-amber-500/30' : 'text-muted-foreground hover:text-amber-400'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Chef&apos;s Pick</span>
          </button>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredItems.map((item) => {
          const qty = getItemQuantityInCart(item.id);
          return (
            <div
              key={item.id}
              className="liquid-glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/25 group"
            >
              <div>
                {/* Dietary badge & special */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {/* Official Veg / Non-Veg Indicator Symbol */}
                    <div
                      className={`w-4 h-4 border flex items-center justify-center p-0.5 rounded-xs ${
                        item.isVeg ? 'border-emerald-500' : 'border-rose-500'
                      }`}
                      title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                    </div>
                    {item.hindiName && (
                      <span className="text-xs text-muted-foreground/60 font-serif">
                        {item.hindiName}
                      </span>
                    )}
                  </div>

                  {item.isChefSpecial && (
                    <span className="text-[11px] font-medium text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      Haweli Special
                    </span>
                  )}
                </div>

                {/* Dish Name */}
                <h3
                  className="text-xl sm:text-2xl text-foreground font-normal tracking-tight group-hover:text-amber-200 transition-colors"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {item.name}
                </h3>

                <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags & Portion */}
                <div className="flex items-center gap-2 mt-4 text-[11px] text-muted-foreground/80 font-mono">
                  <span>Portion: {item.portion}</span>
                  <span>·</span>
                  <span>
                    Spice:{' '}
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <span key={i} className="text-rose-400">🌶️</span>
                    ))}
                  </span>
                </div>
              </div>

              {/* Price & Add to Order */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground font-mono">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>

                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(item)}
                    className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground hover:scale-105 transition-transform cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add to Order</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-2 py-1 border border-white/10">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:text-rose-400 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-medium text-foreground px-1">{qty}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-1 hover:text-emerald-400 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Reservation Modal */}
      {tableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#091b26] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setTableModalOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Close table reservation"
            >
              <X className="w-5 h-5" />
            </button>

            {!tableConfirmed ? (
              <form onSubmit={handleTableSubmit}>
                <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
                  Table Reservation
                </span>
                <h3
                  className="text-2xl sm:text-3xl text-foreground font-normal mt-1"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Dine at The Haweli Restaurant
                </h3>
                <p className="text-xs text-muted-foreground mt-1 mb-6">
                  Reserve your table for an authentic culinary evening at Jasoiya More, Aurangabad.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                        Time Slot
                      </label>
                      <select
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                      >
                        <option value="12:30 PM" className="bg-slate-900">12:30 PM (Lunch)</option>
                        <option value="01:30 PM" className="bg-slate-900">01:30 PM (Lunch)</option>
                        <option value="07:30 PM" className="bg-slate-900">07:30 PM (Dinner)</option>
                        <option value="08:30 PM" className="bg-slate-900">08:30 PM (Dinner)</option>
                        <option value="09:30 PM" className="bg-slate-900">09:30 PM (Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                        Guests
                      </label>
                      <select
                        value={resGuests}
                        onChange={(e) => setResGuests(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((n) => (
                          <option key={n} value={n} className="bg-slate-900">
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                        Seating Zone
                      </label>
                      <select
                        value={resSeating}
                        onChange={(e) => setResSeating(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                      >
                        <option value="Royal Main Dining Hall" className="bg-slate-900">Royal Main Hall</option>
                        <option value="Starlight Garden Cabana" className="bg-slate-900">Starlight Garden Cabana</option>
                        <option value="Courtyard Veranda" className="bg-slate-900">Courtyard Veranda</option>
                        <option value="Private Family Alcove" className="bg-slate-900">Private Family Alcove</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kumar Arvind"
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-foreground text-sm focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-foreground text-sm focus:outline-none focus:border-amber-400/50"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setTableModalOpen(false)}
                    className="px-4 py-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="liquid-glass rounded-full px-6 py-2.5 text-xs text-foreground font-medium hover:scale-105 transition-transform cursor-pointer"
                  >
                    Confirm Table Reservation
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4
                  className="text-2xl text-foreground font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Table Confirmed for {resName}
                </h4>
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  Reservation Code: <span className="text-amber-400 font-bold">{tableReferenceId}</span>
                </p>
                <div className="my-4 p-4 rounded-xl bg-white/5 text-xs space-y-1 text-left text-muted-foreground font-mono">
                  <div>Date: <span className="text-foreground">{resDate} at {resTime}</span></div>
                  <div>Party: <span className="text-foreground">{resGuests} Guests</span></div>
                  <div>Zone: <span className="text-foreground">{resSeating}</span></div>
                  <div>Contact: <span className="text-foreground">{resPhone}</span></div>
                </div>
                <button
                  onClick={() => setTableModalOpen(false)}
                  className="liquid-glass rounded-full px-6 py-2 text-xs text-foreground cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#071720] border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <h3
                    className="text-xl text-foreground"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Your Dining Selection
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!orderPlaced ? (
                <>
                  {cart.length === 0 ? (
                    <div className="py-16 text-center text-muted-foreground text-xs">
                      <Utensils className="w-8 h-8 mx-auto mb-3 opacity-40" />
                      <p>Your dining tray is empty.</p>
                      <p className="mt-1">Select royal starters, handi curries, or breads from the menu.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5 max-h-[50vh] overflow-y-auto my-4 pr-2">
                      {cart.map((ci) => (
                        <div key={ci.item.id} className="py-3 flex justify-between items-center text-xs">
                          <div>
                            <span className="text-foreground font-medium block">{ci.item.name}</span>
                            <span className="text-muted-foreground text-[11px] font-mono">
                              ₹{ci.item.price} each · {ci.item.portion}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-2 py-0.5 border border-white/10">
                              <button
                                onClick={() => removeFromCart(ci.item.id)}
                                className="text-muted-foreground hover:text-rose-400 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-mono text-foreground">{ci.quantity}</span>
                              <button
                                onClick={() => addToCart(ci.item)}
                                className="text-muted-foreground hover:text-emerald-400 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-mono text-foreground font-semibold min-w-14 text-right">
                              ₹{(ci.item.price * ci.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {cart.length > 0 && (
                    <form onSubmit={handlePlaceDiningOrder} className="pt-2">
                      <div className="mb-4">
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                          Table No. / Suite Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Suite 204 or Table 7"
                          value={orderRoomNumber}
                          onChange={(e) => setOrderRoomNumber(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-amber-400/50"
                        />
                      </div>

                      {/* Bill Calculation */}
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono space-y-1 text-muted-foreground mb-4">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Restaurant GST (5%)</span>
                          <span>₹{restaurantTax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-semibold text-foreground">
                          <span>Total Amount</span>
                          <span className="text-amber-400">₹{totalCart.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full liquid-glass rounded-full py-3 text-xs text-foreground font-medium hover:scale-[1.02] transition-transform cursor-pointer"
                      >
                        Send Order to Haweli Kitchen
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4
                    className="text-2xl text-foreground font-normal"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Order Received by Kitchen
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2">
                    Delivering to <strong className="text-foreground">{orderRoomNumber}</strong> in approximately 25-30 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setCart([]);
                      setOrderPlaced(false);
                      setIsCartOpen(false);
                    }}
                    className="liquid-glass rounded-full px-6 py-2 text-xs text-foreground mt-6 cursor-pointer"
                  >
                    Close Tray
                  </button>
                </div>
              )}
            </div>

            <div className="text-[11px] text-muted-foreground/60 text-center font-mono">
              The Haweli Restaurant · Jasoiya More, Aurangabad, Bihar
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
