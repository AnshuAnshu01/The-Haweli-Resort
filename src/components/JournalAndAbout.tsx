import React, { useState } from 'react';
import { TESTIMONIALS, LEADERSHIP_TEAM, TOURIST_ATTRACTIONS, RESORT_METADATA } from '../data/resortData';
import { Star, MapPin, Compass, BookOpen, Quote, Users, ShieldCheck, Heart } from 'lucide-react';

export const JournalAndAbout: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  const articles = [
    {
      id: 'art-1',
      tag: 'Culinary Heritage',
      title: 'The Alchemy of Champaran Ahuna: Earthen Clay Magic',
      readTime: '4 min read',
      excerpt: 'How our master khansamas seal unglazed earthen handis with soft flour dough, coaxing tender flavors over glowing charcoal embers.',
      content: 'At The Haweli Resort, the preparation of Ahuna mutton and handi paneer is treated as a sacred culinary tradition. Originating in Champaran, northern Bihar, this ancient technique uses no added water — the meat tenderizes in its own savory juices, infused with raw garlic cloves, whole red chillies, and stone-pressed mustard oil. We source all spices locally from regional farmers to guarantee undeniable terroir.'
    },
    {
      id: 'art-2',
      tag: 'Regional Excursions',
      title: 'Deo Sun Temple & Bodh Gaya: Spiritual Wonders of South Bihar',
      readTime: '6 min read',
      excerpt: 'Standing just 18 km from our gates, the 8th-century Sun Temple at Deo faces west — an architectural rarity among historic Indian sanctuaries.',
      content: 'Aurangabad is often described as the cultural jewel of southern Bihar. The Deo Sun Temple features monumental stone carvings attributed to King Bhairavendra, renowned for Chhath Puja ceremonies. Further south along the Kaimur hills, the formidable Rohtasgarh Fort crowns a 1,500-foot precipice, while the Mahabodhi Temple in Bodh Gaya is easily accessible via direct highway excursion. Our resort front desk arranges private air-conditioned excursions with licensed heritage guides.'
    },
    {
      id: 'art-3',
      tag: 'Estate Philosophy',
      title: 'Founded 10 April 2020: An Enchanting Sanctuary on GT Road',
      readTime: '3 min read',
      excerpt: 'Balancing the energetic pulse of the Grand Trunk corridor with profound inner serenity through inward courtyards, lush lawns, and swimming pools.',
      content: 'Founded on 10 April 2020, The Haweli Resort was conceived with one unwavering mission: to create an enchanting sanctuary where guests escape the ordinary and experience the pinnacle of traditional Bihari hospitality paired with contemporary luxuries. Under the guidance of Chairman Swarnjeet Kumar Singh and Vice Chairman Manjit Kumar Singh, the resort continues to set new standards in regional hospitality.'
    }
  ];

  return (
    <div className="relative z-10 w-full border-t border-white/5">
      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            {/* Logo Emblem Badge */}
            <div className="inline-flex items-center gap-3 mb-6 p-2 pr-4 rounded-2xl bg-white/5 border border-amber-400/30">
              <img
                src={RESORT_METADATA.logoUrl}
                alt="Logo"
                className="w-10 h-12 object-contain"
              />
              <div className="text-left font-mono">
                <span className="text-foreground text-xs block font-bold">The Haweli Resort</span>
                <span className="text-[10px] text-amber-400">ESTD. 10 APRIL 2020</span>
              </div>
            </div>

            <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono block">
              The Heritage Philosophy
            </span>
            <h2
              className="text-4xl sm:text-5xl text-foreground font-normal mt-2 leading-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              &ldquo;Your happiness is our pleasure.&rdquo;
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-6 leading-relaxed">
              Started on 10 April 2020 at Plot No. 303, Narbdeshwar Nagar, Jasoiya More, Aurangabad,
              The Haweli Resort was founded to provide travelers, wedding families, and food connoisseurs
              with an opulent sanctuary in southern Bihar.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
              With swimming pool and fitness facilities, 22,000 sq. ft. of verdant lawns, 24-hour in-room dining,
              and dedicated concierge pickup from railway and airport hubs, our estate combines regal warmth with seamless modern comfort.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono text-center">
              <div>
                <span className="text-2xl sm:text-3xl font-normal text-foreground block" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  2020
                </span>
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Inception Year</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-normal text-foreground block" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  1,200+
                </span>
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Banqueting Capacity</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-normal text-foreground block" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  4.2 ★
                </span>
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">167+ Reviews</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {/* Leadership Overview */}
            <div className="liquid-glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Official Leadership
              </span>
              <h3
                className="text-2xl sm:text-3xl text-foreground font-normal mt-1 mb-6"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Executive Resort Governance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {LEADERSHIP_TEAM.map((member, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-amber-400 block font-bold">{member.name}</span>
                    <span className="text-foreground/90 font-medium">{member.role}</span>
                    <p className="text-[11px] text-muted-foreground mt-1 font-sans">{member.experience}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Social Responsibility / Community */}
            <div className="liquid-glass rounded-2xl p-6 border border-white/10 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="text-foreground font-semibold text-sm">Community &amp; Environmental Commitment</h4>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  In line with our founding CSR framework, The Haweli Resort actively supports local employment,
                  vocational hospitality skill training for youth in Aurangabad district, organic compost lawn care, and regional farmer partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
              Regional Tourism &amp; Pilgrimage Circuit
            </span>
            <h2
              className="text-3xl sm:text-4xl text-foreground font-normal mt-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Nearby Heritage &amp; Sacred Sanctuaries
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xl">
              The Haweli Resort is the ideal basecamp to explore southern Bihar&apos;s ancient temples, waterfalls, and Buddhist monuments.
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground/80">
            Complimentary Concierge Travel Desk Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOURIST_ATTRACTIONS.map((att, idx) => (
            <div
              key={idx}
              className="liquid-glass-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                  <span className="text-amber-400">{att.category}</span>
                  <span className="text-foreground/80 font-bold">{att.distance}</span>
                </div>
                <h4
                  className="text-xl text-foreground font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {att.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {att.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-muted-foreground flex justify-between">
                <span>Direct Highway Access</span>
                <span className="text-emerald-400">Cab Service Available</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guest Proof & Reviews */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
            Verified Guest Voices
          </span>
          <h2
            className="text-3xl sm:text-4xl text-foreground font-normal mt-2"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Words from Discerning Travelers &amp; Patrons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="liquid-glass-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground/70">
                    via {test.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                  &ldquo;{test.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-foreground font-medium block">{test.name}</span>
                  <span className="text-muted-foreground text-[11px]">{test.role}</span>
                </div>
                <span className="text-amber-400/80 text-[11px] font-mono">{test.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Section */}
      <section id="journal" className="py-24 px-6 max-w-7xl mx-auto w-full border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
              The Haweli Gazette &amp; Journal
            </span>
            <h2
              className="text-4xl sm:text-5xl text-foreground font-normal mt-2 tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Stories of Heritage &amp; Taste
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-lg">
              Curated essays on Bihari culinary craft, architecture, and regional wonders of Aurangabad.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="liquid-glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/30"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                  <span className="text-amber-400">{art.tag}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3
                  className="text-2xl text-foreground font-normal leading-snug"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {art.title}
                </h3>

                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  {art.excerpt}
                </p>

                {activeArticle === art.id && (
                  <p className="text-xs text-foreground/90 mt-4 pt-4 border-t border-white/10 leading-relaxed bg-white/5 p-3 rounded-xl">
                    {art.content}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => setActiveArticle(activeArticle === art.id ? null : art.id)}
                  className="text-xs text-foreground hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5 font-mono"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{activeArticle === art.id ? 'Close Story' : 'Read Article'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
