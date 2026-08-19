'use client';

import { useEffect, useState, useRef, DragEvent, ChangeEvent } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: string | null;
  sortOrder: number;
}

const CATEGORIES = ['water', 'fire', 'mould', 'storm', 'trauma', 'general'];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch {
      // API not ready
    }
    setLoading(false);
  }

  async function uploadFile(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
    formData.append('category', 'general');

    try {
      const res = await fetch('/api/gallery', { method: 'POST', body: formData });
      if (res.ok) {
        await fetchImages();
      }
    } catch {
      alert('Upload failed');
    }
    setUploading(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      Array.from(files).forEach(uploadFile);
    }
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(uploadFile);
    }
  }

  async function updateImage(id: string, data: Partial<GalleryImage>) {
    await fetch(`/api/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, ...data } : img)));
  }

  async function deleteImage(id: string) {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  if (loading) return <div style={{ padding: '40px', color: 'var(--text-muted)' }}>Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Gallery</h1>
          <p>{images.length} photos</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        className={`gallery-upload-zone${dragging ? ' dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <div className="upload-icon">📤</div>
        <p>{uploading ? 'Uploading...' : 'Drag & drop images here, or click to browse'}</p>
        <div className="upload-hint">JPG, PNG, WebP — max 10MB per file</div>
      </div>

      {/* Image Grid */}
      {images.length > 0 ? (
        <div className="admin-gallery-grid">
          {images.map((img) => (
            <div className="admin-gallery-item" key={img.id}>
              <img src={img.url} alt={img.caption || 'Gallery image'} />
              <div className="item-info">
                <input
                  type="text"
                  value={img.caption || ''}
                  onChange={(e) =>
                    setImages((prev) =>
                      prev.map((i) => (i.id === img.id ? { ...i, caption: e.target.value } : i))
                    )
                  }
                  onBlur={() => updateImage(img.id, { caption: img.caption })}
                  placeholder="Add caption..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    padding: '0',
                    outline: 'none',
                  }}
                />
                <select
                  value={img.category || 'general'}
                  onChange={(e) => updateImage(img.id, { category: e.target.value })}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-start)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: '4px 0',
                    marginTop: '4px',
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="item-actions">
                <button className="delete-btn" onClick={() => deleteImage(img.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🖼️</div>
          <p>No gallery photos yet. Upload some above to get started.</p>
        </div>
      )}
    </>
  );
}
