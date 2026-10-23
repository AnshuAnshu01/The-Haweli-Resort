import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SplashLoader } from './components/SplashLoader';
import { FloatingContactButton } from './components/FloatingContactButton';
import { ScrollToTopButton } from './components/ScrollToTopButton';

import { HomePage } from './pages/HomePage';
import { SuitesPage } from './pages/SuitesPage';
import { DiningPage } from './pages/DiningPage';
import { BanquetsPage } from './pages/BanquetsPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookieBanner } from './components/CookieBanner';
import { MenuItem } from './data/resortData';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [showSplash, setShowSplash] = useState(true);

  // Instantly snap to top on page change (before smooth scroll kicks in)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Silky momentum-based smooth scrolling
  useSmoothScroll();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Apply theme class to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const totalCartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  // Render individual page view
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            onOpenBookingModal={() => setCurrentPage('suites')}
            onOpenSplash={() => setShowSplash(true)}
          />
        );
      case 'suites':
        return <SuitesPage onNavigateToDining={() => setCurrentPage('dining')} />;
      case 'dining':
        return (
          <DiningPage
            cart={cart}
            setCart={setCart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          />
        );
      case 'banquets':
        return <BanquetsPage />;
      case 'about':
        return <AboutPage />;
      case 'journal':
        return <JournalPage />;
      case 'contact':
        return <ContactPage />;
      case 'cookie-policy':
        return <CookiePolicyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            onOpenBookingModal={() => setCurrentPage('suites')}
            onOpenSplash={() => setShowSplash(true)}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 ${theme === 'light' ? 'light-theme' : ''}`}>
      {/* Splash / Brand Loading Reveal Effect */}
      {showSplash && <SplashLoader onComplete={() => setShowSplash(false)} />}

      {/* Minimal Navbar with Light / Black View Theme Toggle Icon */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Dedicated Page View Content */}
      <main className="flex-1 w-full animate-fade-rise">
        {renderCurrentPage()}
      </main>

      {/* Footer with "Designed and Developed by ACCustomLabs" in center, social links, and Google Map */}
      <Footer
        setCurrentPage={setCurrentPage}
        onReplaySplash={() => setShowSplash(true)}
      />

      {/* Floating 24/7 Contact Button in right bottom (+91 8102891308) */}
      <FloatingContactButton />

      {/* Scroll-to-top button with circular progress ring */}
      <ScrollToTopButton />

      {/* Cookie consent banner — shows only for new users (localStorage-driven) */}
      <CookieBanner onOpenCookiePolicy={() => setCurrentPage('cookie-policy')} />
    </div>
  );
}
