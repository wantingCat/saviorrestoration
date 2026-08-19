import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="hero-blob b1" />
        <div className="hero-blob b2" />
        <div className="hero-blob b3" />
      </div>

      <div className="wrap hero-content">
        <ScrollReveal>
          <div className="mono">24/7 Emergency Response — Greater Toronto Area</div>

          <h1>
            When disaster strikes.{' '}
            <span className="grad-text">We&apos;re already on the way.</span>
          </h1>

          <p className="lede">
            Water, fire, mould, or trauma — Savior Restoration is on site fast,
            mitigating damage, documenting everything for your insurer, and
            rebuilding your property to pre-loss condition or better.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-emergency" id="hero-cta-emergency">
              Request Emergency Service
            </a>
            <a href="#services" className="btn btn-ghost" id="hero-cta-services">
              View Services
            </a>
          </div>

          <div className="hero-strip">
            <div>
              <strong>24/7</strong>
              <span>Emergency Response</span>
            </div>
            <div>
              <strong>60 min</strong>
              <span>Average GTA Arrival</span>
            </div>
            <div>
              <strong>IICRC</strong>
              <span>Certified Technicians</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
