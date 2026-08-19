import ScrollReveal from './ScrollReveal';

const ARTICLES = [
  {
    id: 1,
    tag: 'Insurance',
    title: 'What to Do in the First 24 Hours After Water Damage',
    excerpt: 'The actions you take immediately after discovering water damage can save thousands in repair costs and make or break your insurance claim.',
    link: '#',
  },
  {
    id: 2,
    tag: 'Prevention',
    title: 'How to Spot Hidden Mould Before It Becomes a Health Risk',
    excerpt: 'Mould doesn\'t always grow where you can see it. Here are the warning signs and what to do if you suspect a problem behind your walls.',
    link: '#',
  },
  {
    id: 3,
    tag: 'Claims',
    title: 'Understanding Your Insurance Restoration Coverage',
    excerpt: 'Most homeowners don\'t fully understand what their policy covers until they need it. Here\'s a plain-language breakdown of common restoration coverage.',
    link: '#',
  },
];

export default function Blog() {
  return (
    <section className="blog-section" id="blog">
      <div className="wrap">
        <ScrollReveal>
          <div className="section-head">
            <div>
              <div className="mono">Tips & insights</div>
              <h2>From the Savior Team</h2>
            </div>
            <p>Practical guidance on insurance claims, prevention, and restoration planning.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="blog-grid">
            {ARTICLES.map((article) => (
              <a href={article.link} className="blog-card" key={article.id} id={`blog-card-${article.id}`}>
                <div className="blog-thumb">
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #16161f, #111118)',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                    }}
                  >
                    📄 Article Cover
                  </div>
                </div>
                <div className="blog-body">
                  <div className="blog-tag">{article.tag}</div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="blog-link">
                    Read more <span>→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
