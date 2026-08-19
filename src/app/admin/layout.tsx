'use client';

import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import '@/styles/admin.css';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/contacts', label: 'Contacts', icon: '📬' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="logo">
          SAVIOR<span className="logo-accent">RESTORATION</span>
        </div>
        <span className="admin-badge">Admin Panel</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={pathname === item.href ? 'active' : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </a>
        ))}
        <a href="/" style={{ marginTop: '16px', opacity: 0.6 }}>
          <span className="nav-icon">🌐</span>
          View Site
        </a>
      </nav>

      <div className="sidebar-footer">
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <SessionProvider>
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">{children}</main>
      </div>
    </SessionProvider>
  );
}
