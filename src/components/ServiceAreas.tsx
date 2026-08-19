const CITIES = [
  'Toronto',
  'Mississauga',
  'Brampton',
  'Vaughan',
  'Markham',
  'Richmond Hill',
  'Oakville',
  'Hamilton',
  'Burlington',
  'Milton',
  'Ajax',
  'Pickering',
  'Whitby',
  'Oshawa',
  'Newmarket',
  'Aurora',
  'King City',
  'Halton Hills',
  'Caledon',
];

export default function ServiceAreas() {
  // Duplicate for seamless infinite scroll
  const items = [...CITIES, ...CITIES];

  return (
    <div className="areas-band" id="service-areas">
      <div className="areas-label">
        <div className="mono">Service area</div>
      </div>
      <div className="areas-marquee">
        <div className="areas-marquee-inner">
          {items.map((city, i) => (
            <span key={`${city}-${i}`}>
              {i > 0 && <span className="dot" style={{ display: 'inline-block', marginRight: '48px' }} />}
              {city}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
