import axiosInstance from './axiosInstance.js';

// Fetch all opportunities; search and domain are optional filters
export async function getOpportunities(search = '', domain = '') {
  const res = await axiosInstance.get('/opportunities', {
    params: {
      search: search || undefined,
      domain: domain || undefined,
    },
  });
  return res.data.data;
}

// Fetch a single opportunity by its MongoDB _id
export async function getOpportunityById(id) {
  const res = await axiosInstance.get(`/opportunities/${id}`);
  return res.data.data;
}
