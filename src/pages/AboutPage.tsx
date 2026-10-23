import React from 'react';
import { RESORT_METADATA, LEADERSHIP_TEAM } from '../data/resortData';
import { Heart, ShieldCheck, Award, Users, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full py-8 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
          Heritage &amp; History
        </span>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal mt-2 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          About The Haweli Resort
        </h1>
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base mt-2 sm:mt-3 leading-relaxed">
          Inaugurated on 10 April 2020, The Haweli Resort was conceived to redefine hospitality
          along the Grand Trunk corridor with palatial grace and authentic Bihari warmth.
        </p>
      </div>

      {/* Main Story Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center mb-10 sm:mb-20">
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-2xl bg-[#523122] text-[#F4F0EA] border border-[#C8A96B]/50 shadow-md">
            <img
              src={RESORT_METADATA.logoUrl}
              alt="Logo"
              className="w-8 h-10 sm:w-10 sm:h-12 object-contain"
            />
            <div className="font-mono text-left">
              <span className="text-xs font-bold text-[#F4F0EA] block">The Haweli Resort</span>
              <span className="text-[9px] sm:text-[10px] text-[#C8A96B] font-medium tracking-wider">ESTD. 10 APRIL 2020 · INDIA</span>
            </div>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            &ldquo;Your happiness is our pleasure.&rdquo;
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
            The Haweli Resort started operations on 10 April 2020 at Narbdeshwar Nagar, Jasoiya More,
            Aurangabad, Bihar. Our founding vision was to create an enchanting sanctuary where travelers
            and families escape the mundane, savor traditional cuisine, and celebrate life&apos;s grandest milestones.
          </p>

          <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
            From our 22,000 sq. ft. manicured marriage lawns to the crystal chandeliers of the Sheesh Mahal hall
            and the simmering earthen pots of Champaran Ahuna Handi, every element honors the cultural pride of Bihar.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-[var(--border-subtle)] font-mono text-center">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] block">2020</span>
              <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Inception</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] block">1,200+</span>
              <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Banqueting</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] block">4.2 ★</span>
              <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-wider">167+ Reviews</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="royal-card overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
              alt="The Haweli Resort Architecture"
              className="w-full h-64 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <span className="text-[10px] sm:text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider block">
                Plot No. 303, Jasoiya More
              </span>
              <h3 className="text-lg sm:text-xl text-white font-serif">
                Acoustic Serenity &amp; Heritage Courtyards
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Governance Section */}
      <div className="mb-12 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
            Executive Leadership
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-normal mt-1"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Guided by Vision &amp; Integrity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {LEADERSHIP_TEAM.map((leader, i) => (
            <div key={i} className="royal-card p-4.5 sm:p-6 flex flex-col justify-between group hover:border-[var(--accent-gold)] transition-colors">
              <div>
                <div className="flex items-center gap-3.5 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[var(--accent-gold)]/40 shrink-0 bg-[var(--bg-secondary)] shadow-md">
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback in case of image load failure
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[var(--accent-gold)] block">
                      {leader.role}
                    </span>
                    <h3
                      className="text-lg sm:text-xl text-[var(--text-primary)] font-normal leading-snug"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {leader.name}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 sm:mt-2 leading-relaxed">
                  {leader.experience}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>The Haweli Resort</span>
                <span className="text-emerald-400">Leadership Team</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSR & Community Section */}
      <div className="royal-card p-5 sm:p-8 lg:p-10 border border-[var(--border-strong)] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)]">
        <div className="flex flex-col sm:flex-row items-start gap-3.5 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] font-mono block">
              Social Responsibility
            </span>
            <h3
              className="text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] font-normal mt-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Committed to Bihar&apos;s Sustainable Growth
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 sm:mt-3 leading-relaxed">
              Under our statutory CSR charter, The Haweli Resort allocates funds and resources to youth vocational hospitality training,
              environmental sustainability, clean water access, and local agricultural procurement across Aurangabad district.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
