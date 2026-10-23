import React, { useState } from 'react';
import { TOURIST_ATTRACTIONS } from '../data/resortData';
import { BookOpen, Compass, ArrowRight, MapPin } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const articles = [
    {
      id: 'story-1',
      tag: 'Culinary Heritage',
      title: 'The Alchemy of Champaran Ahuna: Earthen Clay Magic',
      readTime: '4 min read',
      excerpt: 'How our master khansamas seal unglazed earthen handis with soft flour dough, coaxing tender flavors over glowing charcoal embers.',
      content: 'At The Haweli Resort, the preparation of Ahuna mutton and handi paneer is treated as a sacred culinary tradition. Originating in Champaran, northern Bihar, this ancient technique uses no added water — the meat tenderizes in its own savory juices, infused with raw garlic cloves, whole red chillies, and stone-pressed mustard oil. We source all spices locally from regional farmers to guarantee undeniable terroir.'
    },
    {
      id: 'story-2',
      tag: 'Regional Excursions',
      title: 'Deo Sun Temple & Bodh Gaya: Spiritual Wonders of South Bihar',
      readTime: '6 min read',
      excerpt: 'Standing just 18 km from our gates, the 8th-century Sun Temple at Deo faces west — an architectural rarity among historic Indian sanctuaries.',
      content: 'Aurangabad is often described as the cultural jewel of southern Bihar. The Deo Sun Temple features monumental stone carvings attributed to King Bhairavendra, renowned for ancient Chhath festivities. Further south along the Kaimur hills, the formidable Rohtasgarh Fort crowns a 1,500-foot precipice, while the Mahabodhi Temple in Bodh Gaya is easily accessible via direct highway excursion. Our resort front desk arranges private air-conditioned excursions with licensed heritage guides.'
    },
    {
      id: 'story-3',
      tag: 'Estate Philosophy',
      title: 'Founded 10 April 2020: An Enchanting Sanctuary on GT Road',
      readTime: '3 min read',
      excerpt: 'Balancing the energetic pulse of the Grand Trunk corridor with profound inner serenity through inward courtyards, lush lawns, and swimming pools.',
      content: 'Founded on 10 April 2020, The Haweli Resort was conceived with one unwavering mission: to create an enchanting sanctuary where guests escape the ordinary and experience the pinnacle of traditional Bihari hospitality paired with contemporary luxuries. Under the guidance of Chairman Swarnjeet Kumar Singh and Vice Chairman Manjit Kumar Singh, the resort continues to set new standards in regional hospitality.'
    }
  ];

  return (
    <div className="w-full py-8 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
          The Haweli Gazette &amp; Tourism Circuit
        </span>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal mt-2 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Regional Wonders &amp; Stories
        </h1>
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base mt-2 sm:mt-3 leading-relaxed">
          The Haweli Resort is the ideal basecamp to explore southern Bihar&apos;s ancient temples,
          medieval forts, and Buddhist pilgrimage corridors.
        </p>
      </div>

      {/* Tourist Circuit Cards */}
      <div className="mb-12 sm:mb-20">
        <h2
          className="text-2xl sm:text-3xl text-[var(--text-primary)] font-normal mb-6 sm:mb-8 text-center"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Nearby Sacred Sanctuaries &amp; Forts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TOURIST_ATTRACTIONS.map((att, idx) => (
            <div
              key={idx}
              className="royal-card overflow-hidden flex flex-col justify-between group shadow-md"
            >
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={att.imageUrl}
                  alt={att.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full">
                    {att.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 text-[11px] sm:text-xs font-mono font-bold text-amber-300 bg-black/70 px-2 py-0.5 rounded-md">
                  {att.distance} from Resort
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-lg sm:text-xl text-[var(--text-primary)] font-normal group-hover:text-[#C8A96B] transition-colors"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {att.name}
                  </h3>
                  <p className="text-xs text-[var(--text-body)] mt-1.5 sm:mt-2 leading-relaxed">
                    {att.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[#5A6678] flex justify-between items-center">
                  <span>Concierge Tour Available</span>
                  <span className="text-[#102648] font-bold">AC Sedan Booking</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stories / Gazette */}
      <div>
        <h2
          className="text-2xl sm:text-3xl text-[var(--text-primary)] font-normal mb-6 sm:mb-8 text-center"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Essays on Bihari Heritage &amp; Craft
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {articles.map((art) => (
            <article
              key={art.id}
              className="royal-card p-4.5 sm:p-6 flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#4B658E] mb-2 sm:mb-3">
                  <span className="text-[#C8A96B] font-bold">{art.tag}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3
                  className="text-xl sm:text-2xl text-[var(--text-primary)] font-normal leading-snug"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {art.title}
                </h3>

                <p className="text-xs text-[var(--text-body)] mt-2 sm:mt-3 leading-relaxed">
                  {art.excerpt}
                </p>

                {activeStory === art.id && (
                  <p className="text-xs text-[var(--text-body)] mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[var(--border-subtle)] leading-relaxed bg-[#E8E1D8]/70 p-3.5 rounded-xl font-sans border border-[#CDD4DC]">
                    {art.content}
                  </p>
                )}
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setActiveStory(activeStory === art.id ? null : art.id)}
                  className="min-h-[40px] text-xs text-[#102648] hover:text-[#C8A96B] font-semibold flex items-center gap-1.5 font-mono cursor-pointer transition-colors active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>{activeStory === art.id ? 'Close Story' : 'Read Full Essay'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
