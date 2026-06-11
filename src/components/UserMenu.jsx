import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = user?.displayName
    ? user.displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="user-menu-wrap">
      <button className="user-avatar" onClick={() => setOpen(!open)} title={user.displayName || user.email}>
        {initials}
      </button>
      {open && (
        <>
          <div className="user-menu-backdrop" onClick={() => setOpen(false)} />
          <div className="user-menu">
            <div className="user-menu-header">
              <div className="user-menu-avatar">{initials}</div>
              <div>
                <div className="user-menu-name">{user.displayName || 'User'}</div>
                <div className="user-menu-email">{user.email}</div>
              </div>
            </div>
            <div className="user-menu-divider" />
            <button className="user-menu-item logout" onClick={() => { logout(); setOpen(false); }}>
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
