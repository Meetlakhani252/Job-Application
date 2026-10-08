import axiosInstance from './axiosInstance.js';

// Log in with email and password
export async function login(email, password) {
  return axiosInstance.post('/admin/login', { email, password });
}

// End the admin session
export async function logout() {
  return axiosInstance.post('/admin/logout');
}

// Fetch the currently authenticated admin (used to restore session on reload)
export async function getMe() {
  const res = await axiosInstance.get('/admin/me');
  return res.data.data;
}

// Create a new opportunity (admin only)
export async function createOpportunity(data) {
  const res = await axiosInstance.post('/admin/opportunities', data);
  return res.data.data;
}

// Update an existing opportunity by id (admin only)
export async function updateOpportunity(id, data) {
  const res = await axiosInstance.put(`/admin/opportunities/${id}`, data);
  return res.data.data;
}

// Delete an opportunity by id (admin only)
export async function deleteOpportunity(id) {
  return axiosInstance.delete(`/admin/opportunities/${id}`);
}

// Fetch all submitted applications (admin only)
export async function getAllApplications() {
  const res = await axiosInstance.get('/admin/applications');
  return res.data.data;
}
