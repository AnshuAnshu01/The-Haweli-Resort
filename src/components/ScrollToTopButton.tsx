import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTopButton
 *
 * A circular button fixed at the bottom-right of the viewport.
 * The SVG ring border fills clockwise as the user scrolls DOWN
 * (proportional to scroll depth) and empties as they scroll UP.
 * Clicking the button triggers the smooth-scroll hook's return-to-top.
 * The button fades in only after the user has scrolled past 120 px.
 */
export const ScrollToTopButton: React.FC = () => {
    const [progress, setProgress] = useState(0); // 0–1
    const [visible, setVisible] = useState(false);

    const SIZE = 52;          // outer SVG size (px)
    const STROKE = 3;         // ring stroke width (px)
    const R = (SIZE - STROKE) / 2 - 1; // radius
    const CIRCUMFERENCE = 2 * Math.PI * R;

    const calcProgress = useCallback(() => {
        const scrollTop = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const p = docH > 0 ? Math.min(scrollTop / docH, 1) : 0;
        setProgress(p);
        setVisible(scrollTop > 120);
    }, []);

    useEffect(() => {
        // Passive listener so it never blocks the smooth-scroller
        window.addEventListener('scroll', calcProgress, { passive: true });
        calcProgress(); // init on mount
        return () => window.removeEventListener('scroll', calcProgress);
    }, [calcProgress]);

    const handleClick = () => {
        // Smooth-scroll hook handles all scrolling; just set target to 0
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Dashoffset: full circumference = empty ring, 0 = full ring
    const dashOffset = CIRCUMFERENCE * (1 - progress);

    return (
        <button
            onClick={handleClick}
            aria-label="Scroll to top"
            title="Scroll to top"
            className="fixed bottom-[5.5rem] right-5 z-40 cursor-pointer group focus:outline-none"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
                transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: visible ? 'auto' : 'none',
                width: SIZE,
                height: SIZE,
                position: 'fixed',
                bottom: 'calc(5.5rem + env(safe-area-inset-bottom))',
                right: '1.25rem',
                zIndex: 40,
            }}
        >
            {/* SVG progress ring */}
            <svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="absolute inset-0"
                style={{ transform: 'rotate(-90deg)' }} // start fill from top
            >
                {/* Track ring (always visible, faint) */}
                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={R}
                    fill="none"
                    stroke="rgba(200,169,107,0.18)"
                    strokeWidth={STROKE}
                />
                {/* Progress ring (fills as you scroll down) */}
                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={R}
                    fill="none"
                    stroke="#C8A96B"
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 0.12s linear' }}
                />
            </svg>

            {/* Inner button face */}
            <span
                className="absolute inset-[5px] rounded-full flex items-center justify-center bg-[#102648] group-hover:bg-[#2B4266] border border-[#C8A96B]/30 group-hover:border-[#C8A96B]/70 shadow-lg transition-colors duration-200"
            >
                <ArrowUp
                    className="w-4 h-4 text-[#C8A96B] group-hover:text-[#DFCA9B] transition-colors duration-200 group-hover:-translate-y-0.5"
                    style={{ transition: 'transform 0.2s ease, color 0.2s ease' }}
                />
            </span>
        </button>
    );
};
