import React, { useState, useEffect } from 'react';
import { Cookie, X, ChevronDown, ChevronUp, Shield, BarChart2, Settings } from 'lucide-react';

const COOKIE_KEY = 'haweli_cookie_consent';

interface CookiePreferences {
    necessary: true;     // always true, cannot be toggled
    functional: boolean;
    analytics: boolean;
}

interface CookieBannerProps {
    onOpenCookiePolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookiePolicy }) => {
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [prefs, setPrefs] = useState<CookiePreferences>({
        necessary: true,
        functional: true,
        analytics: true,
    });

    // Show banner only if user hasn't consented yet
    useEffect(() => {
        const stored = localStorage.getItem(COOKIE_KEY);
        if (!stored) {
            // Small delay so the page loads first
            const t = setTimeout(() => setVisible(true), 900);
            return () => clearTimeout(t);
        }
    }, []);

    const saveConsent = (accepted: CookiePreferences) => {
        localStorage.setItem(COOKIE_KEY, JSON.stringify({
            ...accepted,
            timestamp: new Date().toISOString(),
        }));
        applyConsent(accepted);
        setVisible(false);
    };

    const applyConsent = (accepted: CookiePreferences) => {
        // Functional: enable/disable theme persistence etc.
        if (!accepted.functional) {
            // If user opts out of functional cookies, clear theme pref
            localStorage.removeItem('haweli_theme');
        }
        // Analytics: in a real integration you'd init GA / Clarity here
        // window.gtag?.('consent', 'update', { analytics_storage: accepted.analytics ? 'granted' : 'denied' });
    };

    const acceptAll = () => {
        saveConsent({ necessary: true, functional: true, analytics: true });
    };

    const rejectAll = () => {
        saveConsent({ necessary: true, functional: false, analytics: false });
    };

    const saveCustom = () => {
        saveConsent(prefs);
    };

    if (!visible) return null;

    return (
        <>
            {/* Blurred backdrop on mobile */}
            <div className="fixed inset-0 z-[998] bg-[#0b1a32]/40 backdrop-blur-sm lg:hidden" />

            {/* Banner */}
            <div
                className="fixed left-3 right-3 sm:left-auto sm:right-5 sm:w-[420px] z-[999] rounded-2xl overflow-hidden shadow-2xl"
                style={{
                    bottom: 'calc(1rem + env(safe-area-inset-bottom))',
                    background: 'linear-gradient(135deg, #0e2040 0%, #102648 100%)',
                    border: '1px solid rgba(200,169,107,0.35)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,169,107,0.15)',
                    animation: 'slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
                }}
            >
                {/* Top gold accent bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-[#A58444] via-[#C8A96B] to-[#A58444]" />

                <div className="p-4 sm:p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-2.5 sm:mb-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C8A96B]/15 border border-[#C8A96B]/30 flex items-center justify-center shrink-0">
                                <Cookie className="w-4 h-4 text-[#C8A96B]" />
                            </div>
                            <div>
                                <h3
                                    className="text-base text-[#F4F0EA] font-normal leading-none"
                                    style={{ fontFamily: "'Instrument Serif', serif" }}
                                >
                                    Cookie Preferences
                                </h3>
                                <p className="text-[10px] font-mono text-[#C8A96B] uppercase tracking-wider mt-0.5">
                                    The Haweli Resort
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={rejectAll}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#CDD4DC]/50 hover:text-[#F4F0EA] hover:bg-white/10 transition-colors shrink-0"
                            aria-label="Reject all and close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Body text */}
                    <p className="text-xs text-[#E8E1D8]/80 leading-relaxed mb-3">
                        We use cookies to enhance your experience, remember your preferences, and analyse how
                        our site is used. You can choose which cookies you allow.{' '}
                        <button
                            onClick={onOpenCookiePolicy}
                            className="text-[#C8A96B] hover:underline font-medium"
                        >
                            Cookie Policy
                        </button>
                    </p>

                    {/* Expandable details */}
                    <button
                        onClick={() => setShowDetails((v) => !v)}
                        className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#CDD4DC]/70 hover:text-[#C8A96B] transition-colors mb-3 py-1 cursor-pointer"
                    >
                        {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        {showDetails ? 'Hide details' : 'Manage preferences'}
                    </button>

                    {showDetails && (
                        <div className="space-y-2 mb-4 bg-black/20 rounded-xl p-3 border border-white/5">
                            {/* Necessary */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                                    <div>
                                        <span className="text-xs font-mono text-[#F4F0EA] font-medium">Necessary</span>
                                        <p className="text-[10px] text-[#CDD4DC]/60 leading-tight">
                                             Session, security — always active
                                        </p>
                                    </div>
                                </div>
                                <div className="px-2.5 py-1 rounded-full bg-[#C8A96B]/20 border border-[#C8A96B]/40 text-[9px] font-mono text-[#C8A96B] uppercase tracking-wider">
                                    Always On
                                </div>
                            </div>

                            {/* Functional */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Settings className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                                    <div>
                                        <span className="text-xs font-mono text-[#F4F0EA] font-medium">Functional</span>
                                        <p className="text-[10px] text-[#CDD4DC]/60 leading-tight">
                                            Theme, cart, preferences
                                        </p>
                                    </div>
                                </div>
                                <Toggle
                                    checked={prefs.functional}
                                    onChange={(v) => setPrefs((p) => ({ ...p, functional: v }))}
                                />
                            </div>

                            {/* Analytics */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BarChart2 className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                                    <div>
                                        <span className="text-xs font-mono text-[#F4F0EA] font-medium">Analytics</span>
                                        <p className="text-[10px] text-[#CDD4DC]/60 leading-tight">
                                            Anonymous usage statistics
                                        </p>
                                    </div>
                                </div>
                                <Toggle
                                    checked={prefs.analytics}
                                    onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* CTA buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        {showDetails ? (
                            <>
                                <button
                                    onClick={rejectAll}
                                    className="py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-[#CDD4DC] border border-white/15 hover:border-white/30 hover:text-[#F4F0EA] transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                                >
                                    Reject All
                                </button>
                                <button
                                    onClick={saveCustom}
                                    className="py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-[#102648] bg-[#C8A96B] hover:bg-[#DFCA9B] transition-all active:scale-95 shadow-lg cursor-pointer flex items-center justify-center"
                                >
                                    Save Choices
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={rejectAll}
                                    className="py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-[#CDD4DC] border border-white/15 hover:border-white/30 hover:text-[#F4F0EA] transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-[#102648] bg-[#C8A96B] hover:bg-[#DFCA9B] transition-all active:scale-95 shadow-lg shadow-[#C8A96B]/20 cursor-pointer flex items-center justify-center"
                                >
                                    Accept All
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Animation keyframe */}
                <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0)   scale(1); }
          }
        `}</style>
            </div>
        </>
    );
};

/* ── Internal toggle switch ─────────────────────────────────────── */
interface ToggleProps {
    checked: boolean;
    onChange: (v: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
    <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 focus:outline-none shrink-0 ${checked ? 'bg-[#C8A96B]' : 'bg-white/15'
            }`}
        style={{ minWidth: '2.5rem', height: '1.375rem' }}
    >
        <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ${checked ? 'translate-x-[1.125rem]' : 'translate-x-0'
                }`}
        />
    </button>
);

/**
 * Utility — read saved cookie preferences from localStorage.
 * Use this in other components to check if a cookie type is allowed.
 */
export const getCookieConsent = (): CookiePreferences | null => {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as CookiePreferences;
    } catch {
        return null;
    }
};
