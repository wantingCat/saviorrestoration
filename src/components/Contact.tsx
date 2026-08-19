'use client';

import { useState, FormEvent } from 'react';
import ScrollReveal from './ScrollReveal';

const TIME_SLOTS = [
  '8 – 10 AM',
  '10 AM – 12 PM',
  '12 – 2 PM',
  '2 – 4 PM',
  '4 – 6 PM',
  'Flexible',
];

export default function Contact() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In Phase 2 this will POST to /api/contact
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="wrap contact-grid">
        <ScrollReveal>
          <div className="contact-info">
            <div className="mono">Get in touch</div>
            <h2>Request a visit</h2>
            <p>
              For non-emergency assessments, pick a time and we&apos;ll confirm by phone
              or email. If this is an active emergency, call us directly — don&apos;t
              wait for a scheduled slot.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <span className="detail-label">Phone</span>
                <a href="tel:+14375551234">(437) 555-1234</a>
              </div>
              <div className="contact-detail">
                <span className="detail-label">Email</span>
                <a href="mailto:info@saviorrestoration.com">info@saviorrestoration.com</a>
              </div>
              <div className="contact-detail">
                <span className="detail-label">Service Area</span>
                <span>Greater Toronto Area, Ontario</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="schedule-grid">
              <div className="field">
                <label htmlFor="contact-name">Full name</label>
                <input type="text" id="contact-name" name="name" required />
              </div>
              <div className="field">
                <label htmlFor="contact-phone">Phone number</label>
                <input type="tel" id="contact-phone" name="phone" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email address</label>
              <input type="email" id="contact-email" name="email" required />
            </div>
            <div className="schedule-grid">
              <div className="field">
                <label htmlFor="contact-date">Preferred date</label>
                <input type="date" id="contact-date" name="preferred_date" />
              </div>
              <div className="field">
                <label htmlFor="contact-service">Service needed</label>
                <select id="contact-service" name="service_type">
                  <option value="">Select a service</option>
                  <option value="water">Water Damage</option>
                  <option value="fire">Fire & Smoke</option>
                  <option value="mould">Mould Remediation</option>
                  <option value="odour">Odour Removal</option>
                  <option value="trauma">Trauma & Biohazard</option>
                  <option value="storm">Storm Damage</option>
                  <option value="sewage">Sewage Backup</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Preferred time window</label>
              <div className="slot-grid">
                {TIME_SLOTS.map((slot) => (
                  <div
                    key={slot}
                    className={`slot-btn${selectedSlot === slot ? ' active' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedSlot(slot)}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
            <div className="field">
              <label htmlFor="contact-notes">Notes (optional)</label>
              <textarea
                id="contact-notes"
                name="message"
                placeholder="Anything we should know before the visit."
              />
            </div>
            <button type="submit" className="submit-btn" id="contact-submit">
              Request this time
            </button>
            <div className="form-note">
              Times are requests, not confirmed bookings — we&apos;ll follow up to lock it in.
            </div>
            {status === 'success' && (
              <div className="form-status success">
                ✓ Request submitted. We&apos;ll contact you shortly to confirm.
              </div>
            )}
            {status === 'error' && (
              <div className="form-status error">
                Something went wrong. Please try again or call us directly.
              </div>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
