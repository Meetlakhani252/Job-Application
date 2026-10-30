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
    await adminApi.logout();
    setAdmin(null);
  }

  async function signUpUser(email, password, fullName, phone) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    if (data.user) {
      // Create profile record in public.profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, email, full_name: fullName, phone }]);

      if (profileError) throw profileError;
    }
    return data.user;
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
    await supabase.auth.signOut();
    setUser(null);
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
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
