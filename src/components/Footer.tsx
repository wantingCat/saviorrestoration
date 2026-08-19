const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

const SERVICES = [
  'Water Damage Restoration',
  'Fire & Smoke Restoration',
  'Mould Remediation',
  'Odour Removal',
  'Trauma & Biohazard Cleaning',
  'Storm & Wind Damage',
  'Insurance Claim Support',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              SAVIOR<span className="logo-accent">RESTORATION</span>
            </div>
            <p>
              24/7 emergency restoration services across the Greater Toronto Area.
              Water, fire, mould, odour, and trauma — we respond fast and rebuild right.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            {SERVICES.map((s) => (
              <a key={s} href="#services">
                {s}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:+14375551234">(437) 555-1234</a>
            <a href="mailto:info@saviorrestoration.com">info@saviorrestoration.com</a>
            <a href="#service-areas">Greater Toronto Area, ON</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Savior Restoration. All rights reserved.</p>
          <p>IICRC Certified · Licensed & Insured</p>
        </div>
      </div>
    </footer>
  );
}
