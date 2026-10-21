import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '@/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Restore session from localStorage on mount
    setUser(authService.getSession());
    setReady(true);
  }, []);

  function login(email, password) {
    const result = authService.login(email, password);
    if (result.ok) {
      setUser(result.user);
    }
    return result;
  }

  function createAccount(email, password) {
    const result = authService.createAccount(email, password);
    if (result.ok) {
      setUser(result.user);
    }
    return result;
  }

  function logout() {
    authService.logout();
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
