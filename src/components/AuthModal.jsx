import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMode('login');
      setEmail('');
      setPassword('');
      setDisplayName('');
      setError('');
      setSuccess('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  function reset() {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
    setSuccess('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    try {
      if (mode === 'login') {
        await login(email.trim(), password);
        setSuccess('Logged in successfully!');
        setTimeout(onClose, 600);
      } else {
        await signup(email.trim(), password, displayName.trim());
        setSuccess('Account created!');
        setTimeout(onClose, 600);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>✕</button>
        <h2>{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); reset(); }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); reset(); }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input
              ref={inputRef}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button type="submit" className="btn-primary auth-submit">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footnote">
          Demo app — passwords are stored locally in your browser.
        </p>
      </div>
    </div>
  );
}
