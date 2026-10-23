import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { RESORT_METADATA } from '../data/resortData';

interface HeroSectionProps {
  onBeginJourney: () => void;
  onOpenLogoSplash?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBeginJourney, onOpenLogoSplash }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
      {/* Video Background as strictly specified */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/bg-video.mp4" type="video/mp4" />
        <source src="/assets/bg video.mp4" type="video/mp4" />
        <source src="/bg-video.mp4" type="video/mp4" />
        <source src="/bg video.mp4" type="video/mp4" />
      </video>

      {/* Hero Section Container */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-36 py-[90px] my-auto">
        {/* Authentic Haweli Resort Emblem with Glowing Entrance Effect */}
        <div
          onClick={onOpenLogoSplash}
          className="relative mb-5 group cursor-pointer animate-fade-rise"
          title="Click to view luxury seal"
        >
          {/* Subtle golden ambient aura */}
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-sky-400/20 to-amber-500/20 rounded-3xl blur-md opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="relative p-2 rounded-3xl bg-[#081824]/85 border border-amber-400/40 shadow-[0_12px_35px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 group-hover:scale-105">
            <img
              src={RESORT_METADATA.logoUrl}
              alt="The Haweli Resort - Restaurant & Resort (India, 2020)"
              className="w-20 h-24 sm:w-24 sm:h-28 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Brand Kicker with Editorial Numbering / Established Info */}
        <div className="mb-3 text-xs font-mono tracking-widest uppercase text-amber-300/90 animate-fade-rise">
          <span>The Haweli Resort &amp; Restaurant · India, 2020</span>
        </div>

        {/* H1 with exact typography and em elements */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>

        {/* Subtext with exact text and animation */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels. Amid the
          chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        {/* CTA Button as specified */}
        <button
          onClick={onBeginJourney}
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-10 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2 transition-transform duration-200"
        >
          Begin Journey
        </button>
      </section>

      {/* Discreet video controls on bottom footer strip */}
      <div className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto w-full text-xs text-muted-foreground/70">
        <span className="tracking-widest uppercase text-[11px] font-mono">
          Plot No. 303 · Jasoiya More · Aurangabad, Bihar 824101
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlayback}
            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause ambient video' : 'Play ambient video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleSound}
            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute ambient video' : 'Mute ambient video'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
