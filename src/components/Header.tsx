'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Scroll progress bar
    const updateProgress = () => {
      const el = document.getElementById('scroll-progress');
      if (!el) return;
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      el.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <div className="scroll-progress" id="scroll-progress" />
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap header-inner">
          <a href="#top" className="logo" id="logo">
            SAVIOR<span className="logo-accent">RESTORATION</span>
          </a>

          <nav className="header-nav" id="main-nav">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <a className="call-btn" href="tel:+14375551234" id="call-btn">
              📞 <span className="call-text">(437) 555-1234</span>
            </a>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              id="hamburger-btn"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobile-menu">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
        <a className="call-btn" href="tel:+14375551234">
          📞 (437) 555-1234
        </a>
      </div>
    </>
  );
}
