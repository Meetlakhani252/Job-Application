import { createContext, useContext, useEffect, useState } from 'react';
import * as adminApi from '../api/adminApi.js';
import { supabase } from '../supabaseClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for Admin Session
    adminApi
      .getMe()
      .then((data) => setAdmin(data))
      .catch(() => setAdmin(null));

    // Check for Supabase User Session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes (sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loginAdmin(email, password) {
    await adminApi.login(email, password);
    const data = await adminApi.getMe();
    setAdmin(data);
  }

  async function logoutAdmin() {
    try {
      await adminApi.logout();
    } finally {
      setAdmin(null);
    }
  }

  async function signUpUser(email, password, fullName, phone) {
    try {
      // 0. Ensure any existing session or cached data from a previous user is wiped
      try {
        await supabase.auth.signOut();
        localStorage.removeItem('rooklet_recent_app_ids');
      } catch {
        // Ignore cleanup errors
      }

      // 1. Create account via backend admin API to bypass Supabase public email rate limits
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, phone }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'Failed to create account');
      }

      // 2. Automatically log the user in to set their session
      return await loginUser(email, password);
    } catch (err) {
      // Fallback to client-side supabase signUp if server endpoint is unreachable
      if (err.message?.includes('Failed to fetch')) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            },
          },
        });
        if (error) throw error;
        return data.user;
      }
      throw err;
    }
  }

  // NEW: Send OTP for login
  async function sendOtp(email) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return true;
  }

  // NEW: Verify OTP and login
  async function verifyOtp(email, token) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) throw error;
    setUser(data.session?.user || null);
    return data.session?.user;
  }

  async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user);
    return data.user;
  }

  async function logoutUser() {
    try {
      await supabase.auth.signOut();
    } finally {
      localStorage.removeItem('rooklet_recent_app_ids');
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{
      admin,
      user,
      loading,
      login: loginAdmin,
      logout: logoutAdmin,
      signUpUser,
      loginUser,
      logoutUser,
      sendOtp,
      verifyOtp
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
