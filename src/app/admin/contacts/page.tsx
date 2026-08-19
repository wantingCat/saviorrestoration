'use client';

import { useEffect, useState } from 'react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string | null;
  timeSlot: string | null;
  serviceType: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      // API not ready
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  }

  async function deleteContact(id: string) {
    if (!confirm('Delete this submission?')) return;
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  const filtered = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter);

  if (loading) return <div style={{ padding: '40px', color: 'var(--text-muted)' }}>Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Contact Submissions</h1>
          <p>{contacts.length} total submissions</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['all', 'new', 'read', 'responded'].map((f) => (
          <button
            key={f}
            className={`admin-btn ${filter === f ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
            onClick={() => setFilter(f)}
            style={{ textTransform: 'capitalize' }}
          >
            {f} {f !== 'all' && `(${contacts.filter((c) => c.status === f).length})`}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Date / Time</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {c.name}
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{c.email}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.phone}</div>
                </td>
                <td>{c.serviceType || '—'}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {c.date || '—'}
                  {c.timeSlot && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.timeSlot}</div>}
                </td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.message || '—'}
                </td>
                <td>
                  <span className={`status-badge ${c.status}`}>{c.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {c.status === 'new' && (
                      <button
                        className="admin-btn admin-btn-ghost"
                        onClick={() => updateStatus(c.id, 'read')}
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Mark Read
                      </button>
                    )}
                    {c.status !== 'responded' && (
                      <button
                        className="admin-btn admin-btn-ghost"
                        onClick={() => updateStatus(c.id, 'responded')}
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Responded
                      </button>
                    )}
                    <button
                      className="admin-btn admin-btn-danger"
                      onClick={() => deleteContact(c.id)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No {filter !== 'all' ? filter : ''} submissions yet.</p>
        </div>
      )}
    </>
  );
}
