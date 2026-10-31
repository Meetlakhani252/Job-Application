import axiosInstance from './axiosInstance.js';

// Upload resume PDF file through backend service
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('resume', file);

  const res = await axiosInstance.post('/applications/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
}

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
