import React from 'react';
import { Cookie, Shield, Settings, Eye, BarChart2, ExternalLink } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
    const sections = [
        {
            icon: <Cookie className="w-5 h-5 text-[#C8A96B]" />,
            title: 'What Are Cookies?',
            content: `Cookies are small text files that are placed on your device (computer, tablet or mobile) when you visit our website. They allow us to recognise your device on return visits and remember your preferences, improving your experience on thehaweli.in. Cookies do not contain any personally identifiable information by themselves.`,
        },
        {
            icon: <Shield className="w-5 h-5 text-[#C8A96B]" />,
            title: 'Strictly Necessary Cookies',
            content: `These cookies are essential for the website to function properly. They enable core features such as security, session management, and accessibility. You cannot opt out of these cookies as the website cannot function without them.

Examples:
• Session authentication tokens
• CSRF (cross-site request forgery) protection
• Load-balancing and server routing cookies`,
        },
        {
            icon: <BarChart2 className="w-5 h-5 text-[#C8A96B]" />,
            title: 'Performance & Analytics Cookies',
            content: `These cookies help us understand how visitors interact with our website by collecting anonymous information. We use this data to improve the structure, content, and usability of our site.

Examples:
• Page view counts and average session duration
• Most-visited pages and booking funnel drop-off points
• Device type, browser, and geographic region (aggregated only)

All analytics data is anonymised and never linked to an individual user.`,
        },
        {
            icon: <Eye className="w-5 h-5 text-[#C8A96B]" />,
            title: 'Functional Cookies',
            content: `Functional cookies remember choices you make on our website to provide a more personalised experience. This includes:

• Your selected theme (Day Palace / Night Palace mode)
• Dining cart contents during your session
• Language and regional preferences
• Whether you have acknowledged this cookie notice

Without these cookies, some features may not work as intended.`,
        },
        {
            icon: <Settings className="w-5 h-5 text-[#C8A96B]" />,
            title: 'How to Manage Cookies',
            content: `You can control and/or delete cookies at any time using your browser settings. Most browsers allow you to:

• View cookies stored on your device
• Delete all or specific cookies
• Block cookies from all or specific websites
• Enable private/incognito browsing mode

Disabling certain cookies may affect the functionality of our website, including theme preferences and dining cart features. To re-trigger the cookie consent banner, simply clear your browser's local storage or cookies for this site.`,
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-8 sm:pt-10 pb-16 sm:pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-8">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C8A96B]/10 border border-[#C8A96B]/30 mb-4">
                        <Cookie className="w-3.5 h-3.5 text-[#C8A96B]" />
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C8A96B]">Legal</span>
                    </div>
                    <h1
                        className="text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mb-3 leading-tight"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                        Cookie Policy
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                        The Haweli Resort &amp; Restaurant · Last updated: October 2025
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                        This policy explains what cookies we use on{' '}
                        <span className="text-[#C8A96B] font-medium">thehaweli.in</span>, why we use them,
                        and your rights to control them. We are committed to being transparent about how we
                        collect and use data.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-4 sm:space-y-6">
                    {sections.map((section, i) => (
                        <div
                            key={i}
                            className="royal-card p-4.5 sm:p-8 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C8A96B]/10 border border-[#C8A96B]/30 flex items-center justify-center shrink-0">
                                    {section.icon}
                                </div>
                                <h2
                                    className="text-lg sm:text-xl font-normal text-[var(--text-primary)]"
                                    style={{ fontFamily: "'Instrument Serif', serif" }}
                                >
                                    {section.title}
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed whitespace-pre-line">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Third-party notice */}
                <div className="mt-5 sm:mt-6 royal-card p-4.5 sm:p-8 border-[#C8A96B]/40 shadow-sm">
                    <h2
                        className="text-xl font-normal text-[var(--text-primary)] mb-3"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                        Third-Party Services
                    </h2>
                    <p className="text-sm text-[var(--text-body)] leading-relaxed mb-3">
                        Our website may include content and integrations from third-party services that may set their own cookies. These include:
                    </p>
                    <ul className="space-y-2 text-sm text-[var(--text-body)]">
                        {[
                            { name: 'Google Maps', url: 'https://policies.google.com/privacy', desc: 'Location and directions embedding' },
                            { name: 'YouTube', url: 'https://policies.google.com/privacy', desc: 'Video content embedding' },
                            { name: 'WhatsApp / Meta', url: 'https://www.whatsapp.com/legal/privacy-policy', desc: 'Click-to-chat widget' },
                        ].map((svc) => (
                            <li key={svc.name} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] mt-1.5 shrink-0" />
                                <span>
                                    <span className="font-medium text-[var(--text-primary)]">{svc.name}</span>
                                    {' — '}{svc.desc}.{' '}
                                    <a
                                        href={svc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#C8A96B] hover:underline inline-flex items-center gap-0.5"
                                    >
                                        Privacy Policy <ExternalLink className="w-3 h-3" />
                                    </a>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="mt-6 p-6 rounded-2xl bg-[#102648] text-[#F4F0EA] border border-[#C8A96B]/30">
                    <h2
                        className="text-xl font-normal mb-2"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                        Contact Us About Cookies
                    </h2>
                    <p className="text-sm text-[#E8E1D8]/80 leading-relaxed">
                        If you have any questions about how we use cookies, please contact our team:
                    </p>
                    <div className="mt-3 flex flex-col sm:flex-row gap-3 text-sm font-mono">
                        <a href="mailto:haweli.resort@gmail.com" className="text-[#C8A96B] hover:underline">
                            haweli.resort@gmail.com
                        </a>
                        <span className="hidden sm:block text-[#CDD4DC]/40">·</span>
                        <a href="tel:+918102891308" className="text-[#C8A96B] hover:underline">
                            +91 81028 91308
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
