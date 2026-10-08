import axiosInstance from './axiosInstance.js';

// Submit a new application (opportunityId + applicant fields)
export async function submitApplication(data) {
  const res = await axiosInstance.post('/applications', data);
  return res.data.data;
}

// Look up an application by its unique applicationId string (e.g. APP-XXXXXX)
export async function getApplicationById(applicationId) {
  const res = await axiosInstance.get(`/applications/${applicationId}`);
  return res.data.data;
}
