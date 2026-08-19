import ScrollReveal from './ScrollReveal';

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Our basement flooded at 2 AM and Savior had a crew on-site within the hour. They handled everything — drying, demo, rebuild, and all the insurance paperwork. We barely had to lift a finger.',
    stars: 5,
    name: 'Sarah M.',
    service: 'Water Damage Restoration',
  },
  {
    id: 2,
    quote: 'After a kitchen fire, we were devastated. The Savior team was incredibly professional and compassionate. They rebuilt our kitchen better than it was before, and the insurance process was seamless.',
    stars: 5,
    name: 'David K.',
    service: 'Fire & Smoke Restoration',
  },
  {
    id: 3,
    quote: 'We discovered black mould behind our bathroom walls. Savior contained, removed, and tested until the space was completely clear. They even helped us understand what caused it so it wouldn\'t happen again.',
    stars: 5,
    name: 'Priya T.',
    service: 'Mould Remediation',
  },
  {
    id: 4,
    quote: 'Fast, honest, and thorough. They showed up when they said they would and did exactly what they quoted. In this industry, that alone makes them exceptional.',
    stars: 5,
    name: 'Mike R.',
    service: 'Storm Damage Repair',
  },
  {
    id: 5,
    quote: 'The team handled a very difficult biohazard situation with discretion and professionalism. We\'re incredibly grateful for their compassion during such a tough time.',
    stars: 5,
    name: 'Jennifer L.',
    service: 'Trauma Cleaning',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="wrap">
        <ScrollReveal>
          <div className="section-head">
            <div>
              <div className="mono">What clients say</div>
              <h2>Reviews</h2>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="testimonials-track" id="testimonials-track">
            {TESTIMONIALS.map((t) => (
              <div className="glass-card testimonial-card" key={t.id} id={`testimonial-${t.id}`}>
                <div className="quote-icon">&ldquo;</div>
                <div className="stars">{'★'.repeat(t.stars)}</div>
                <p className="quote-text">{t.quote}</p>
                <div className="client-name">{t.name}</div>
                <div className="client-service">{t.service}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
