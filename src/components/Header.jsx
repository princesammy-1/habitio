import { useState } from 'react';
import { today, formatDateLabel } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';

export default function Header() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header>
        <div className="header-top">
          <h1>habitio</h1>
          <div className="header-actions">
            <ThemeToggle />
            {user ? (
              <UserMenu />
            ) : (
              <button className="btn-login" onClick={() => setAuthOpen(true)}>
                Login
              </button>
            )}
          </div>
        </div>
        <p className="date-label">{formatDateLabel(today())}</p>
      </header>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
