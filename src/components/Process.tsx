import ScrollReveal from './ScrollReveal';

const STEPS = [
  {
    num: '01',
    title: 'Call & Dispatch',
    desc: 'Call any time. A technician is dispatched immediately, day or night.',
  },
  {
    num: '02',
    title: 'Assess & Document',
    desc: 'We inspect the damage, document everything, and brief your insurer.',
  },
  {
    num: '03',
    title: 'Mitigate',
    desc: 'Extraction, drying, and containment begin to stop further damage.',
  },
  {
    num: '04',
    title: 'Rebuild',
    desc: 'We restore the property to pre-loss condition, or better.',
  },
];

export default function Process() {
  return (
    <section className="process-section" id="process">
      <div className="wrap">
        <ScrollReveal>
          <div className="section-head">
            <div>
              <div className="mono">How it works</div>
              <h2>From call to closed claim</h2>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="process-steps">
            {STEPS.map((step) => (
              <div className="process-step" key={step.num} id={`step-${step.num}`}>
                <div className="step-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
