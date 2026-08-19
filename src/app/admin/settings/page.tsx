'use client';

import { useEffect, useState, FormEvent } from 'react';

interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  businessName: string;
  tagline: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    phone: '',
    email: '',
    address: '',
    businessName: '',
    tagline: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        setSettings({
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          businessName: data.businessName || '',
          tagline: data.tagline || '',
        });
      } catch {
        // Use defaults
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Failed to save settings');
    }

    setSaving(false);
  }

  if (loading) return <div style={{ padding: '40px', color: 'var(--text-muted)' }}>Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Site Settings</h1>
          <p>Update your business contact information. Changes appear on the public site immediately.</p>
        </div>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="settings-business-name">Business Name</label>
          <input
            type="text"
            id="settings-business-name"
            value={settings.businessName}
            onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="settings-tagline">Tagline</label>
          <input
            type="text"
            id="settings-tagline"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="settings-phone">Phone Number</label>
          <input
            type="tel"
            id="settings-phone"
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="settings-email">Email Address</label>
          <input
            type="email"
            id="settings-email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="settings-address">Service Area / Address</label>
          <input
            type="text"
            id="settings-address"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <span className={`save-feedback${saved ? ' visible' : ''}`}>
            ✓ Saved successfully
          </span>
        </div>
      </form>
    </>
  );
}
