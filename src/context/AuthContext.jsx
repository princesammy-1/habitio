import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'habitio_users';
const SESSION_KEY = 'habitio_session';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch { return []; }
}

function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {}
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const signup = useCallback((email, password, displayName) => {
    return new Promise((resolve, reject) => {
      const users = getUsers();
      if (users.find(u => u.email === email)) {
        reject(new Error('Email already registered'));
        return;
      }
      const newUser = {
        id: crypto.randomUUID(),
        email,
        password, // simulated — would be hashed in production
        displayName: displayName || email.split('@')[0],
        createdAt: new Date().toISOString(),
        preferences: { theme: 'dark' },
      };
      users.push(newUser);
      saveUsers(users);
      const session = { id: newUser.id, email: newUser.email, displayName: newUser.displayName };
      setUser(session);
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch {}
      resolve(session);
    });
  }, []);

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      const users = getUsers();
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) {
        reject(new Error('Invalid email or password'));
        return;
      }
      const session = { id: found.id, email: found.email, displayName: found.displayName };
      setUser(session);
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch {}
      resolve(session);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem(SESSION_KEY); } catch {}
  }, []);

  const updateProfile = useCallback((updates) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user?.id);
    if (idx === -1) return;
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    const session = {
      id: users[idx].id,
      email: users[idx].email,
      displayName: users[idx].displayName,
    };
    setUser(session);
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch {}
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
