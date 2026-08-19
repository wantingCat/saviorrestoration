import ScrollReveal from './ScrollReveal';

const SERVICES = [
  {
    num: '01',
    title: 'Water Damage Restoration',
    desc: 'We extract standing water, set up monitored structural drying, and dehumidify the space to manufacturer-rated moisture levels. Covers floods, burst pipes, appliance failures, and roof leaks, with daily moisture readings logged for your insurer.',
  },
  {
    num: '02',
    title: 'Fire & Smoke Restoration',
    desc: 'Soot and residue removal, odour neutralization at the source rather than masking, and full structural rebuild of fire-damaged framing, drywall, and finishes. We coordinate directly with your adjuster from the first walkthrough.',
  },
  {
    num: '03',
    title: 'Mould Remediation',
    desc: 'Containment barriers, negative-air HEPA filtration, and physical removal performed to IICRC S520 standards. We finish with third-party air-quality clearance testing so you have documented proof the space is safe.',
  },
  {
    num: '04',
    title: 'Odour Removal',
    desc: 'Thermal fogging, ozone treatment, and hydroxyl generators matched to the source of the odour — whether smoke, mould, or sewage — so the smell doesn\'t return once the visible damage is gone.',
  },
  {
    num: '05',
    title: 'Trauma & Biohazard Cleaning',
    desc: 'Discreet, compassionate biohazard and trauma scene cleanup following all OSHA and health regulations. Full sanitization, odour removal, and disposal of contaminated materials with proper documentation.',
  },
  {
    num: '06',
    title: 'Storm & Wind Damage',
    desc: 'Emergency tarping and board-up within hours of the call to stop further loss, followed by full structural repair of roofs, siding, and windows. We document storm damage thoroughly for weather claims.',
  },
  {
    num: '07',
    title: 'Sewage Backup Cleanup',
    desc: 'Safe extraction of category 3 contaminated water, full sanitization, and disposal of unsalvageable porous materials under proper biohazard protocol. Technicians work in PPE rated for blackwater exposure.',
  },
  {
    num: '08',
    title: 'Contents Pack-Out & Storage',
    desc: 'Room-by-room inventory and photo documentation before anything leaves the property, then climate-controlled storage and professional cleaning of belongings while repairs are underway.',
  },
  {
    num: '09',
    title: 'Insurance Claim Support',
    desc: 'Direct documentation, photos, and moisture logs prepared in the format adjusters and TPAs expect, plus ongoing coordination with brokers and claims handlers so you\'re not chasing paperwork.',
  },
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="wrap">
        <ScrollReveal>
          <div className="section-head">
            <div>
              <div className="mono">What we restore</div>
              <h2>Our Services</h2>
            </div>
            <p>
              Every job starts with the same priority: stop the damage from
              spreading, then document everything your insurer needs.
            </p>
          </div>
        </ScrollReveal>

        <div className="services-grid stagger-children">
          {SERVICES.map((service) => (
            <ScrollReveal key={service.num}>
              <div className="glass-card service-card" id={`service-${service.num}`}>
                <div className="num mono">{service.num}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
