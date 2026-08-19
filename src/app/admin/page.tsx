'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalContacts: number;
  newContacts: number;
  galleryImages: number;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalContacts: 0, newContacts: 0, galleryImages: 0 });
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [contactsRes, galleryRes] = await Promise.all([
          fetch('/api/contacts'),
          fetch('/api/gallery'),
        ]);
        const contacts = await contactsRes.json();
        const gallery = await galleryRes.json();

        const contactsList = Array.isArray(contacts) ? contacts : [];
        const galleryList = Array.isArray(gallery) ? gallery : [];

        setStats({
          totalContacts: contactsList.length,
          newContacts: contactsList.filter((c: ContactSubmission) => c.status === 'new').length,
          galleryImages: galleryList.length,
        });
        setRecentContacts(contactsList.slice(0, 5));
      } catch {
        // API not ready yet
      }
    }
    load();
  }, []);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here&apos;s an overview of your site.</p>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-icon">📬</div>
          <div className="dash-value">{stats.totalContacts}</div>
          <div className="dash-label">Total Inquiries</div>
        </div>
        <div className="dash-card">
          <div className="dash-icon">🔔</div>
          <div className="dash-value">{stats.newContacts}</div>
          <div className="dash-label">New / Unread</div>
        </div>
        <div className="dash-card">
          <div className="dash-icon">🖼️</div>
          <div className="dash-value">{stats.galleryImages}</div>
          <div className="dash-label">Gallery Photos</div>
        </div>
        <div className="dash-card">
          <div className="dash-icon">🌐</div>
          <div className="dash-value" style={{ fontSize: '1rem', paddingTop: '8px' }}>
            <a href="/" style={{ color: 'var(--accent-start)' }}>View Live Site →</a>
          </div>
          <div className="dash-label">Public Website</div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Recent Inquiries</h2>
      {recentContacts.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentContacts.map((c) => (
              <tr key={c.id}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.serviceType || '—'}</td>
                <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No inquiries yet. They&apos;ll appear here when visitors submit the contact form.</p>
        </div>
      )}
    </>
  );
}
