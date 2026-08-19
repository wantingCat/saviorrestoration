import ScrollReveal from './ScrollReveal';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="wrap">
        <div className="about-grid">
          <ScrollReveal>
            <div className="about-content">
              <div className="mono">Who we are</div>
              <h2>Built on trust. Driven by urgency.</h2>
              <p>
                Savior Restoration was founded with a simple belief: when disaster
                hits your home or business, you deserve a team that shows up fast,
                communicates clearly, and delivers work you can trust — not one
                that makes a bad situation worse.
              </p>
              <p>
                Every technician on our team is IICRC-certified and trained to
                handle water, fire, mould, odour, and biohazard situations with
                precision and care. We work directly with your insurance provider,
                handling the paperwork so you can focus on what matters.
              </p>
              <p>
                Based in the Greater Toronto Area, we serve residential and
                commercial properties across the region with 24/7 emergency
                response and an average on-site arrival time of 60 minutes.
              </p>

              <div className="about-stats">
                <div className="about-stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="about-stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
                <div className="about-stat">
                  <span className="stat-number">60 min</span>
                  <span className="stat-label">Avg. Response Time</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="about-image">
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #111118, #16161f)',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'center',
                  padding: '40px',
                }}
              >
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.3 }}>🏗️</div>
                  <div>Team Photo</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '8px', opacity: 0.5 }}>
                    Managed via Admin Dashboard
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
