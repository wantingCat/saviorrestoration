import type { Metadata } from 'next';
import './globals.css';
import '../../src/styles/components.css';

export const metadata: Metadata = {
  title: 'Savior Restoration — 24/7 Emergency Restoration Services | GTA Ontario',
  description:
    'Savior Restoration provides 24/7 emergency water damage, fire, mould, odour removal, and trauma cleaning services across the Greater Toronto Area. IICRC certified. 60-minute average response time.',
  keywords:
    'restoration, water damage, fire damage, mould remediation, odour removal, trauma cleaning, emergency restoration, GTA, Toronto, Ontario, IICRC',
  openGraph: {
    title: 'Savior Restoration — 24/7 Emergency Restoration Services',
    description:
      'Water, fire, mould, odour, and trauma — Savior Restoration is on site fast. 24/7 emergency response across the GTA.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Savior Restoration',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Savior Restoration',
              description:
                '24/7 emergency restoration services including water damage, fire, mould, odour removal, and trauma cleaning across the Greater Toronto Area.',
              telephone: '+14375551234',
              email: 'info@saviorrestoration.com',
              url: 'https://saviorrestoration.com',
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: 43.6532,
                  longitude: -79.3832,
                },
                geoRadius: '80000',
              },
              priceRange: '$$',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '00:00',
                closes: '23:59',
              },
            }),
          }}
        />
      </head>
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
