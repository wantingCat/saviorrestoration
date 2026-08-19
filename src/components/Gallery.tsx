'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const GALLERY_ITEMS = [
  { id: 1, caption: 'Water damage restoration — basement flood cleanup', category: 'water' },
  { id: 2, caption: 'Fire damage rebuild — kitchen restoration', category: 'fire' },
  { id: 3, caption: 'Mould remediation — bathroom containment', category: 'mould' },
  { id: 4, caption: 'Storm damage repair — roof and siding', category: 'storm' },
  { id: 5, caption: 'Water extraction — commercial property', category: 'water' },
  { id: 6, caption: 'Smoke damage cleanup — living room restoration', category: 'fire' },
];

const CATEGORY_COLORS: Record<string, string> = {
  water: '#0ea5e9',
  fire: '#f59e0b',
  mould: '#00d4aa',
  storm: '#8b5cf6',
};

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigate = (dir: number) => {
    setActiveIndex((prev) => (prev + dir + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <>
      <section className="gallery-section" id="gallery">
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <div className="mono">Our work</div>
                <h2>Recent Projects</h2>
              </div>
              <p>Real results from completed Savior Restoration projects across the GTA.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="gallery-grid">
              {GALLERY_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  className="gallery-thumb"
                  onClick={() => openLightbox(idx)}
                  id={`gallery-thumb-${item.id}`}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${CATEGORY_COLORS[item.category]}15, #111118)`,
                      color: 'var(--text-muted)',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      textAlign: 'center',
                      padding: '20px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '2rem', marginBottom: '8px', opacity: 0.4 }}>
                        {item.category === 'water' ? '💧' : item.category === 'fire' ? '🔥' : item.category === 'mould' ? '🦠' : '🌪️'}
                      </div>
                      <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.7rem' }}>
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <div className="gallery-overlay">
                    <span>{item.caption}</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <div className={`lightbox${lightboxOpen ? ' open' : ''}`} onClick={closeLightbox} id="lightbox">
        <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">×</button>
          <button className="lightbox-nav lightbox-prev" onClick={() => navigate(-1)} aria-label="Previous">‹</button>
          <button className="lightbox-nav lightbox-next" onClick={() => navigate(1)} aria-label="Next">›</button>
          <div
            style={{
              width: '70vw',
              maxWidth: '900px',
              aspectRatio: '16/10',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${CATEGORY_COLORS[GALLERY_ITEMS[activeIndex]?.category || 'water']}20, #111118)`,
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.3 }}>📸</div>
              <div>Gallery Photo {activeIndex + 1}</div>
              <div style={{ fontSize: '0.75rem', marginTop: '8px', opacity: 0.5 }}>
                Managed via Admin Dashboard
              </div>
            </div>
          </div>
          <div className="lightbox-cap">{GALLERY_ITEMS[activeIndex]?.caption}</div>
        </div>
      </div>
    </>
  );
}
