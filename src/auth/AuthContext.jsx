import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '@/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    authService.getMe().then((result) => {
      if (cancelled) return;
      setUser(result.ok ? result.user : null);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email, password) {
    const result = await authService.login(email, password);
    if (result.ok) {
      setUser(result.user);
    }
    return result;
  }

  async function createAccount(email, password) {
    const result = await authService.createAccount(email, password);
    if (result.ok) {
      setUser(result.user);
    }
    return result;
  }

  async function logout() {
    await authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, createAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
