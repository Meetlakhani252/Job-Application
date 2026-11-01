import axios from "axios";
import { supabase } from "../supabaseClient.js";

const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const cleanUrl = rawUrl.replace(/\/+$/, '');
const apiUrl = cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Interceptor to add Supabase JWT to every request
axiosInstance.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
