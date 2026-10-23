export interface Room {
  id: string;
  name: string;
  subtitle: string;
  category: 'suite' | 'deluxe' | 'executive' | 'family';
  pricePerNight: number;
  originalPrice: number;
  sizeSqFt: number;
  maxGuests: number;
  bedType: string;
  view: string;
  imageUrl: string;
  description: string;
  highlights: string[];
  gradientTheme: string;
  badge?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'starters' | 'tandoor' | 'mains' | 'biryani' | 'beverages' | 'desserts';
  price: number;
  isVeg: boolean;
  isChefSpecial?: boolean;
  spiceLevel: 1 | 2 | 3;
  imageUrl: string;
  description: string;
  portion: string;
  tags: string[];
}

export interface GoogleReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  timeAgo: string;
  text: string;
  source: 'Google Maps' | 'Justdial' | 'Facebook';
  verified: boolean;
  likesCount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  source: 'Google' | 'Facebook' | 'Justdial' | 'Direct Guest';
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface LeadershipMember {
  name: string;
  role: string;
  imageUrl: string;
  experience: string;
}

export interface TouristAttraction {
  name: string;
  distance: string;
  category: string;
  imageUrl: string;
  description: string;
}

export const RESORT_METADATA = {
  name: "The Haweli Resort",
  legalName: "The Haweli Resort & Restaurant",
  tagline: "Your happiness is our pleasure",
  motto: "Luxuries For You",
  establishedDate: "10 April 2020",
  establishedYear: 2020,
  logoUrl: "/assets/aistudio/logo_transparent.png",
  phone: "+91 8102891308",
  altPhone: "+91 9006782821",
  whatsappNumber: "+91 8102891308",
  email: "thehaweliresorts@gmail.com",
  officialWebsite: "https://www.thehaweliresorts.in/",
  facebookUrl: "https://www.facebook.com/100089740113433/posts/kumar-arvind-had-an-exceptional-experience-at-the-haweli-resort-restaurant-in-au/1103227629345231/",
  instagramUrl: "https://www.instagram.com/thehaweliresorts/?hl=en",
  youtubeUrl: "https://www.youtube.com/results?search_query=The+Haweli+Resort+Aurangabad+Bihar",
  justdialUrl: "https://www.justdial.com/Aurangabad-Bihar/Haweli-Restaurant-The-Haweli-Resort-Narbdeshwar-Nagar-Jasoiya-More-Rambilash-Nagar-Bharthauli-Katharua/9999P6186-6186-231212205330-P1K1_BZDET",
  googleMapsUrl: "https://maps.google.com/?q=The+Haweli+Resort+Jasoiya+More+Aurangabad+Bihar",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14457.77977464871!2d84.3547!3d24.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398cfdc49899f8d1%3A0x673d39589252c4e2!2sJasoiya%20More%2C%20Aurangabad%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  address: "Plot No. 303, Narbdeshwar Nagar, Rambilash Nagar, Bharthauli Road, near Lord Buddha Public School, Jasoiya More, Aurangabad, Bihar 824101",
  rating: 4.2,
  reviewCount: 167
};

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: "Swarnjeet Kumar Singh",
    role: "Chairman",
    imageUrl: "/assets/resort/SwarnjeetSingh-tGgyiEQq.jpg",
    experience: "Founding visionary driving hospitality excellence and cultural pride in southern Bihar."
  },
  {
    name: "Manjit Kumar Singh",
    role: "Vice Chairman",
    imageUrl: "/assets/resort/ManjeetSingh-vRju4yD2.jpg",
    experience: "Overseeing infrastructure, marriage lawn developments, and VIP banquet logistics."
  },
  {
    name: "Vikash Singh",
    role: "General Manager",
    imageUrl: "/assets/resort/VikashSingh-wek4jATT.jpg",
    experience: "Directing daily resort operations, luxury guest satisfaction, and culinary innovation."
  },
  {
    name: "Vinit Singh",
    role: "Manager",
    imageUrl: "/assets/resort/BinitSingh-Nw7mdOst.jpg",
    experience: "Managing front office relations, room reservations, and corporate event coordination."
  },
  {
    name: "Sunil Singh",
    role: "Housekeeping Manager",
    imageUrl: "/assets/resort/SunilSingh-H-FeW99N.jpg",
    experience: "Enforcing five-star hygiene, 24/7 turndown care, and pristine garden aesthetics."
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    authorName: 'Kumar Arvind',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    timeAgo: '2 weeks ago',
    source: 'Facebook',
    verified: true,
    likesCount: 24,
    text: 'Kumar Arvind had an exceptional experience at The Haweli Resort restaurant in Aurangabad. The handi delicacies, tranquil garden ambiance, and courteous staff made our family gathering truly memorable. Hands down the finest hospitality along the GT Road stretch.'
  },
  {
    id: 'rev-2',
    authorName: 'Dr. Rajiv Ranjan Singh',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    timeAgo: '1 month ago',
    source: 'Google Maps',
    verified: true,
    likesCount: 38,
    text: 'We booked the Haweli Marriage Lawn and Sheesh Mahal Banquet for our daughter’s wedding reception. Over 900 guests attended; the food catering was praised by everyone, and the suites provided a royal retreat for all out-of-town guests.'
  },
  {
    id: 'rev-3',
    authorName: 'Priyanka & Saurabh Tiwari',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    timeAgo: '2 months ago',
    source: 'Justdial',
    verified: true,
    likesCount: 19,
    text: 'The silence and calm inside the resort is unbelievable given its easy connectivity to Jasoiya More. The room interior design, plush king bed, and morning tea on the lawn felt like a palace retreat. 5-star service in Bihar!'
  },
  {
    id: 'rev-4',
    authorName: 'Anil Kumar Agrawal',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    rating: 4,
    timeAgo: '3 months ago',
    source: 'Google Maps',
    verified: true,
    likesCount: 12,
    text: 'Convenient location right on the Grand Trunk road corridor. Ample safe valet parking, sparkling clean swimming pool, and delicious Champaran Ahuna Handi mutton at the restaurant. Will definitely stay here again on my next trip.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'review-1',
    name: 'Kumar Arvind',
    role: 'Patron & Regional Explorer',
    source: 'Facebook',
    rating: 5,
    comment: 'Kumar Arvind had an exceptional experience at The Haweli Resort restaurant in Aurangabad. The handi delicacies, tranquil garden ambiance, and courteous staff made our family gathering truly memorable. Hands down the finest hospitality along the GT Road stretch.',
    date: 'Verified Patron',
    verified: true
  },
  {
    id: 'review-2',
    name: 'Dr. Rajiv Ranjan Singh',
    role: 'Wedding Host',
    source: 'Google',
    rating: 5,
    comment: 'We booked the Haweli Marriage Lawn and Sheesh Mahal Banquet for our daughter\'s wedding reception. Over 900 guests attended; the food catering was praised by everyone, and the suites provided a royal retreat for all out-of-town guests.',
    date: 'February 2026',
    verified: true
  },
  {
    id: 'review-3',
    name: 'Priyanka & Saurabh Tiwari',
    role: 'Weekend Staycationers',
    source: 'Justdial',
    rating: 5,
    comment: 'The silence and calm inside the resort is unbelievable given its easy connectivity to Jasoiya More. The room interior design, plush king bed, and morning tea on the lawn felt like a palace retreat. 5-star service in Bihar!',
    date: 'March 2026',
    verified: true
  }
];

export const TOURIST_ATTRACTIONS: TouristAttraction[] = [
  {
    name: "Mahabodhi Temple, Bodh Gaya",
    distance: "78 km",
    category: "UNESCO World Heritage",
    imageUrl: "/assets/resort/bodhgaya-ZM1jU88m.jpg",
    description: "Venerated sacred temple marking Buddha's enlightenment under the sacred Bodhi Tree."
  },
  {
    name: "Deo Sun Temple & Deo Kund",
    distance: "18 km",
    category: "8th Century Architecture",
    imageUrl: "/assets/resort/deo-cIH1Qvbt.jpg",
    description: "Rare west-facing monolithic stone sun temple renowned for ancient Chhath festivities."
  },
  {
    name: "Maa Tarachandi Mandir",
    distance: "45 km",
    category: "Sacred Shaktipeeth",
    imageUrl: "/assets/resort/Taramaa-r3FhbMSE.jpg",
    description: "Perched on Sasaram hill slopes, a revered sacred shrine with panoramic valley views."
  },
  {
    name: "Maa Mundeshwari Mandir",
    distance: "82 km",
    category: "Ancient Temple",
    imageUrl: "/assets/resort/maamun-hTGnWgQ9.jpg",
    description: "Regarded as one of the oldest functioning Hindu temples in India atop Pavra Hill."
  },
  {
    name: "Maa Tutla Bhawani Mandir",
    distance: "52 km",
    category: "Valley & Waterfall",
    imageUrl: "/assets/resort/maatutla-Nt2VQRIJ.jpg",
    description: "Stunning gorge and hanging suspension bridge surrounded by forested waterfalls."
  },
  {
    name: "Rohtasgarh Fort",
    distance: "65 km",
    category: "Medieval Citadel",
    imageUrl: "https://images.unsplash.com/photo-1599818817737-0105ef039f3c?auto=format&fit=crop&w=800&q=80",
    description: "Colossal hill fort atop 1,500-foot precipice preserving stone battlements and palaces."
  }
];

export const ROOMS_DATA: Room[] = [
  {
    id: 'maharaja-suite',
    name: 'The Maharaja Presidential Suite',
    subtitle: 'Regal Heritage Architecture with Private Veranda',
    category: 'suite',
    pricePerNight: 9500,
    originalPrice: 12000,
    sizeSqFt: 850,
    maxGuests: 4,
    bedType: 'Grand Carved King Bed',
    view: 'Manicured Lawn & Courtyard Fountain',
    imageUrl: '/assets/resort/r1-u6jwuu5N.jpg',
    description: 'Immerse in bespoke luxury with hand-carved teak furnishings, Italian marble en-suite with deep soaking tub, private sit-out overlooking the garden, and round-the-clock dedicated butler assistance.',
    highlights: ['Complimentary Royal Breakfast Buffet', 'Tea/Coffee Maker & Safe', 'Swimming Pool & Fitness Access', 'Free Railway Pickup & Drop', '24-Hour In-Room Dining', 'Curated Minibar'],
    gradientTheme: 'from-amber-950/60 via-slate-900 to-sky-950/40',
    badge: 'Most Luxurious'
  },
  {
    id: 'deluxe-ac-room',
    name: 'Executive Deluxe AC Room',
    subtitle: 'Modern Climate-Controlled Comfort with Garden Views',
    category: 'deluxe',
    pricePerNight: 3800,
    originalPrice: 4800,
    sizeSqFt: 420,
    maxGuests: 2,
    bedType: 'Plush California King Bed',
    view: 'Garden & Swimming Pool View',
    imageUrl: '/assets/resort/r2-4YuIk-MD.jpg',
    description: 'A serene haven featuring split AC climate control, electronic laptop safe, daily housekeeping & turndown service, high-speed Wi-Fi, and plush linen.',
    highlights: ['Complimentary Breakfast Buffet', 'Daily Housekeeping & Turndown', 'Electronic In-Room Safe', 'Tea/Coffee Maker in Room', 'Doctor On-Call 24/7'],
    gradientTheme: 'from-blue-950/50 via-slate-900 to-slate-950',
    badge: 'Popular Choice'
  },
  {
    id: 'heritage-suite',
    name: 'Heritage Royal Suite',
    subtitle: 'Classic Rajput-Mughal Arches with Modern Elegance',
    category: 'suite',
    pricePerNight: 6800,
    originalPrice: 8500,
    sizeSqFt: 620,
    maxGuests: 3,
    bedType: 'Four-Poster King Bed',
    view: 'Heritage Garden View',
    imageUrl: '/assets/resort/r3-oF694KNu.jpg',
    description: 'Designed for contemplative rest and sophisticated luxury. Features high architectural ceilings, ambient brass lantern lighting, artisan wall frescoes, and premium linen bedding.',
    highlights: ['Complimentary Breakfast Buffet', 'Rainfall Shower', 'Artisanal Tea & French Press', 'Smart 55" OLED TV', 'Soundproof Acoustic Paneling'],
    gradientTheme: 'from-slate-900 via-stone-900 to-amber-950/40',
    badge: 'Guest Favorite'
  },
  {
    id: 'family-presidential',
    name: 'Royal Family Residence Suite',
    subtitle: 'Dual Interconnected Chambers with Dining Alcove',
    category: 'family',
    pricePerNight: 8200,
    originalPrice: 10500,
    sizeSqFt: 780,
    maxGuests: 5,
    bedType: '1 King + 2 Twin Beds (Extra beds on request)',
    view: 'Panoramic Resort Lawn',
    imageUrl: '/assets/resort/r4-En8WQJah.jpg',
    description: 'Generously proportioned two-bedroom retreat ideal for families celebrating weddings or holidaying along the historic Grand Trunk Road corridor.',
    highlights: ['Two Separate Bathrooms', 'Children Play Area Access', 'Double Wardrobes', 'Free Station Pickup & Drop', 'Priority Dining Reservation'],
    gradientTheme: 'from-indigo-950/50 via-slate-900 to-stone-900',
    badge: 'Ideal for Families'
  },
  {
    id: 'deluxe-garden',
    name: 'Deluxe Garden Sanctuary',
    subtitle: 'Tranquil Greenery & Refreshing Morning Light',
    category: 'deluxe',
    pricePerNight: 3200,
    originalPrice: 4000,
    sizeSqFt: 380,
    maxGuests: 2,
    bedType: 'Queen Cloud-Comfort Bed',
    view: 'Lush Botanical Flora',
    imageUrl: '/assets/resort/hero1-_uZyXZxT.jpg',
    description: 'A restful haven nestled amidst the landscaped greenery of The Haweli. Wake up to natural birdsong and morning mist through floor-to-ceiling glass windows.',
    highlights: ['Botanical Garden View', 'Organic Herbal Toiletries', 'Complimentary Breakfast', 'Twin or King Configurable'],
    gradientTheme: 'from-emerald-950/40 via-slate-900 to-sky-950/40'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 'starter-1',
    name: 'Kakori Galouti Kebab',
    hindiName: 'काकोरी गलावटी कबाब',
    category: 'starters',
    price: 480,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 2,
    imageUrl: '/assets/resort/d1-SGDsFlql.jpg',
    description: 'Melt-in-mouth smoked lamb patties infused with 24 secret royal spices and rose water, served over delicate saffron paratha.',
    portion: '4 Pieces',
    tags: ['Awadhi Royal', 'Signature']
  },
  {
    id: 'starter-2',
    name: 'Murgh Malai Tikka Angara',
    hindiName: 'मुर्ग मलाई टिक्का',
    category: 'starters',
    price: 440,
    isVeg: false,
    isChefSpecial: false,
    spiceLevel: 1,
    imageUrl: '/assets/resort/d2-mFQHTIw7.jpg',
    description: 'Boneless chicken chunks marinated in rich clotted cream, crushed green cardamom, and toasted cashews, flame-seared in clay oven.',
    portion: '6 Pieces',
    tags: ['Mild & Creamy', 'Tandoor']
  },
  {
    id: 'starter-3',
    name: 'Dahi Ke Shahi Kebab',
    hindiName: 'दही के शाही कबाब',
    category: 'starters',
    price: 380,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    imageUrl: '/assets/resort/d3-Xj6Aj0AJ.jpg',
    description: 'Crisp golden patties of hung creamy curd, infused with chopped mint, coriander root, and mild green chili, served with mint chutney.',
    portion: '6 Pieces',
    tags: ['Pure Veg', 'Must Try']
  },
  {
    id: 'starter-4',
    name: 'Paneer Peshawari Tikka',
    hindiName: 'पनीर पेशावरी टिक्का',
    category: 'starters',
    price: 390,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 2,
    imageUrl: '/assets/resort/d4-N9sEP3LO.jpg',
    description: 'Charred farmhouse cottage cheese cubes marinated in mustard oil, yellow chili, carom seeds, and smoked cumin.',
    portion: '6 Cubes',
    tags: ['Pure Veg', 'Clay Oven']
  },

  // Mains
  {
    id: 'main-1',
    name: 'Champaran Handi Ahuna Gosht',
    hindiName: 'चंपारण हांडी अहुना गोश्त',
    category: 'mains',
    price: 590,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 3,
    imageUrl: '/assets/resort/d5-tGv_hcZH.jpg',
    description: 'Legendary Bihar earthen-pot delicacy. Tender mutton pieces sealed with flour dough and slow-simmered over low charcoal embers with whole garlic bulbs and cold-pressed mustard oil.',
    portion: 'Serves 2',
    tags: ['Authentic Bihar', 'Signature Handi']
  },
  {
    id: 'main-2',
    name: 'The Haweli Dal Makhani',
    hindiName: 'द हॉवेली दाल मखनी',
    category: 'mains',
    price: 360,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    description: 'Urad lentils slow-cooked for 18 hours overnight on gentle wood embers, finished with churned white butter, fresh dairy cream, and sun-dried fenugreek leaves.',
    portion: 'Serves 2-3',
    tags: ['Pure Veg', 'Heritage Recipe']
  },
  {
    id: 'main-3',
    name: 'Paneer Lababdar Darbari',
    hindiName: 'पनीर लबाबदार दरबारी',
    category: 'mains',
    price: 410,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    description: 'Cottage cheese cubes bathed in a velvety cashew-tomato reduction with grated paneer, fresh ginger juliennes, and ground mace.',
    portion: 'Serves 2',
    tags: ['Pure Veg', 'Rich Gravy']
  },

  // Biryani & Breads
  {
    id: 'biryani-1',
    name: 'Shahi Awadhi Dum Mutton Biryani',
    hindiName: 'शाही अवधी दम मटन बिरयानी',
    category: 'biryani',
    price: 540,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    description: 'Aged long-grain basmati rice cooked on dum in sealed handi with succulent mutton pieces, saffron drops, kewra water, and caramelized onions. Served with burani garlic raita.',
    portion: 'Serves 2',
    tags: ['Dum Pukht', 'Royal Choice']
  },
  {
    id: 'bread-1',
    name: 'Garlic & Herb Butter Naan',
    hindiName: 'गार्लिक बटर नान',
    category: 'biryani',
    price: 90,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 1,
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp leavened flatbread brushed with crushed roasted garlic, fresh cilantro, and salted butter.',
    portion: '1 Piece',
    tags: ['Popular']
  },

  // Beverages & Desserts
  {
    id: 'bev-1',
    name: 'Royal Kesar Badam Thandai',
    hindiName: 'शाही केसर बादाम ठंडाई',
    category: 'beverages',
    price: 190,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    description: 'Chilled full-cream milk blended with crushed almonds, Kashmiri saffron, melon seeds, poppy seeds, and rose essence.',
    portion: '300 ml',
    tags: ['Refreshing', 'Heritage']
  },
  {
    id: 'dessert-1',
    name: 'Garam Gulab Jamun with Malai Rabdi',
    hindiName: 'गुलाब जामुन मलाई रबड़ी के साथ',
    category: 'desserts',
    price: 220,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    description: 'Warm, soft khoya dumplings soaked in fragrant green cardamom and rose sugar syrup, topped with chilled slow-reduced malai rabdi.',
    portion: '2 Pieces + Rabdi',
    tags: ['All-Time Favorite']
  }
];

export const RESORT_FACILITIES = [
  {
    title: 'The Grand Sheesh Mahal Banquet',
    capacity: 'Up to 800 Guests',
    area: '6,500 sq. ft. Pillarless',
    imageUrl: '/assets/resort/hall12-MYRm5eng.jpg',
    description: 'Opulent indoor banquet hall with acoustic ceilings, crystal chandeliers, and customizable LED mood staging for grand receptions, ring ceremonies, and conventions.',
    icon: 'Building'
  },
  {
    title: 'The Haweli Starlight Marriage Lawn',
    capacity: '1,200+ Guests',
    area: '22,000 sq. ft. Manicured Turf',
    imageUrl: '/assets/resort/LawnArea-yEGmqAHa.jpg',
    description: 'Lush open-air lawns with royal mandap pavilions, fairy light canopy, illuminated fountains, and children play area.',
    icon: 'Trees'
  },
  {
    title: 'The Haweli Gourmet Restaurant',
    capacity: '140 Seater Fine Dining',
    area: 'Indoor + Veranda Seating',
    imageUrl: '/assets/resort/d1-SGDsFlql.jpg',
    description: 'Celebrated dining destination in Aurangabad offering authentic Champaran Handi Ahuna, Awadhi Biryanis, Tandoori Platters, and pure veg options.',
    icon: 'Utensils'
  },
  {
    title: 'Children Play Area & Gardens',
    capacity: 'Family Leisure Zone',
    area: 'Safe Outdoor Playground',
    imageUrl: '/assets/resort/childrenPlay-0CzBU5c8.jpg',
    description: 'Dedicated children amusement swings, landscaped lawns, and tranquil sit-outs for visiting families.',
    icon: 'Trees'
  }
];
