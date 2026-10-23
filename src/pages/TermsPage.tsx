import React from 'react';
import { ScrollText, AlertCircle, CheckCircle, XCircle, CreditCard, Calendar } from 'lucide-react';

export const TermsPage: React.FC = () => {
    const clauses = [
        {
            icon: <CheckCircle className="w-5 h-5 text-[#C8A96B]" />,
            title: '1. Acceptance of Terms',
            content: `By accessing or using the website thehaweli.in, making a reservation, dining at our restaurant, or attending an event at The Haweli Resort & Restaurant, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.

These terms apply to all visitors, guests, and customers of The Haweli Resort & Restaurant, Narbdeshwar Nagar, Aurangabad, Bihar — 824101.`,
        },
        {
            icon: <Calendar className="w-5 h-5 text-[#C8A96B]" />,
            title: '2. Room Reservations & Bookings',
            content: `All room reservations are subject to availability and confirmation by our reservations desk.

• Check-in time: 12:00 PM (noon) · Check-out time: 11:00 AM
• Early check-in and late check-out are subject to availability and may attract additional charges
• Valid government-issued photo ID is mandatory for all guests at check-in
• A valid credit/debit card or advance deposit may be required to secure your booking
• The resort reserves the right to decline a reservation at its sole discretion`,
        },
        {
            icon: <XCircle className="w-5 h-5 text-[#C8A96B]" />,
            title: '3. Cancellation & Refund Policy',
            content: `Cancellations must be communicated directly to our reservations desk via phone or email.

Standard Rooms:
• Cancellation 48+ hours prior to arrival: Full refund
• Cancellation within 24–48 hours: 50% of the room tariff forfeited
• No-show or cancellation within 24 hours: 100% of the first night forfeited

Banquet & Wedding Bookings:
• Advance deposit (typically 30–50%) is non-refundable after booking confirmation
• Balance and specific cancellation terms are governed by the individual event contract

The resort is not responsible for cancellations due to natural calamities, government orders, or force majeure events.`,
        },
        {
            icon: <CreditCard className="w-5 h-5 text-[#C8A96B]" />,
            title: '4. Payments & Pricing',
            content: `All prices are listed in Indian Rupees (INR) and are inclusive of applicable GST unless otherwise stated.

• Online/advance payments are processed securely; the resort does not store card details
• Room tariffs are subject to change without prior notice; the rate confirmed at booking will be honoured
• Dining bills are payable at the time of service
• The resort accepts cash, UPI, major credit/debit cards, and net banking`,
        },
        {
            icon: <AlertCircle className="w-5 h-5 text-[#C8A96B]" />,
            title: '5. Guest Conduct & Property Rules',
            content: `All guests and visitors are expected to maintain decorum and respect the privacy and comfort of other guests.

• Smoking is strictly prohibited inside all enclosed areas of the resort
• Possession or consumption of illegal substances is strictly prohibited and will result in immediate eviction without refund
• The resort is a family-friendly establishment; guests are expected to conduct themselves accordingly
• The management reserves the right to ask guests to vacate the premises for misconduct without any refund
• Any damage to resort property will be charged to the guest's account`,
        },
        {
            icon: <ScrollText className="w-5 h-5 text-[#C8A96B]" />,
            title: '6. Dining & Restaurant',
            content: `• The Haweli Restaurant operates subject to availability and may be closed for private events
• Menu items, prices, and availability are subject to change without notice
• Guests with food allergies or dietary requirements must inform our team at the time of ordering; while we take utmost care, we cannot guarantee a completely allergen-free environment
• Outside food and beverages are not permitted inside the restaurant or resort premises
• Online dining orders placed through this website are for in-resort use only`,
        },
        {
            icon: <AlertCircle className="w-5 h-5 text-[#C8A96B]" />,
            title: '7. Limitation of Liability',
            content: `The Haweli Resort & Restaurant shall not be liable for:

• Loss, theft, or damage to personal belongings of guests (guests are advised to use the in-room safe or request secure storage)
• Any personal injury sustained on the premises unless directly caused by the negligence of resort staff
• Indirect, incidental, or consequential losses arising from the use of our website or services
• Temporary disruption of facilities due to maintenance, power outages, or circumstances beyond our control

The maximum liability of the resort in any dispute shall not exceed the total amount paid for the specific service in question.`,
        },
        {
            icon: <ScrollText className="w-5 h-5 text-[#C8A96B]" />,
            title: '8. Intellectual Property',
            content: `All content on thehaweli.in — including text, images, logos, videos, and design elements — is the exclusive property of The Haweli Resort & Restaurant or its licensors.

• Reproduction, distribution, or commercial use of any content without written permission is strictly prohibited
• This website has been Designed and Developed by ACCustomLabs. The design, code, and branding assets remain the intellectual property of ACCustomLabs and The Haweli Resort respectively`,
        },
        {
            icon: <CheckCircle className="w-5 h-5 text-[#C8A96B]" />,
            title: '9. Governing Law & Jurisdiction',
            content: `These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Aurangabad, Bihar, India.

If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable.`,
        },
        {
            icon: <ScrollText className="w-5 h-5 text-[#C8A96B]" />,
            title: '10. Changes to These Terms',
            content: `The Haweli Resort & Restaurant reserves the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting on this website. Your continued use of our website or services after any changes constitutes your acceptance of the revised terms.

We encourage you to review this page periodically. The date of the last update is displayed at the top of this policy.`,
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-8 sm:pt-10 pb-16 sm:pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-8">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C8A96B]/10 border border-[#C8A96B]/30 mb-4">
                        <ScrollText className="w-3.5 h-3.5 text-[#C8A96B]" />
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C8A96B]">Legal</span>
                    </div>
                    <h1
                        className="text-3xl sm:text-5xl font-normal text-[var(--text-primary)] mb-3 leading-tight"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                        The Haweli Resort &amp; Restaurant · Last updated: October 2025
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                        Please read these terms carefully before using our website or booking any of our
                        services. By proceeding, you indicate your acceptance of these terms.
                    </p>
                </div>

                {/* Clauses */}
                <div className="space-y-4 sm:space-y-5">
                    {clauses.map((clause, i) => (
                        <div key={i} className="royal-card p-4.5 sm:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C8A96B]/10 border border-[#C8A96B]/30 flex items-center justify-center shrink-0">
                                    {clause.icon}
                                </div>
                                <h2
                                    className="text-base sm:text-lg font-normal text-[var(--text-primary)]"
                                    style={{ fontFamily: "'Instrument Serif', serif" }}
                                >
                                    {clause.title}
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed whitespace-pre-line">
                                {clause.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Contact */}
                <div className="mt-8 p-6 rounded-2xl bg-[#102648] text-[#F4F0EA] border border-[#C8A96B]/30">
                    <h2
                        className="text-xl font-normal mb-2"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                        Questions About These Terms?
                    </h2>
                    <p className="text-sm text-[#E8E1D8]/80 leading-relaxed">
                        If you have any questions or concerns about our Terms and Conditions, please reach out:
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
