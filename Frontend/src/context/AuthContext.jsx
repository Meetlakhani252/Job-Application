import { createContext, useContext, useEffect, useState } from 'react';
import * as adminApi from '../api/adminApi.js';

const AuthContext = createContext(null);

// Provides admin auth state to the whole app
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore session from the server
  useEffect(() => {
    adminApi
      .getMe()
      .then((data) => setAdmin(data))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  // Log in, then fetch the admin profile to populate state
  async function login(email, password) {
    await adminApi.login(email, password);
    const data = await adminApi.getMe();
    setAdmin(data);
  }

  // Log out and clear admin state
  async function logout() {
    await adminApi.logout();
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook for consuming auth context
export function useAuth() {
  return useContext(AuthContext);
}
