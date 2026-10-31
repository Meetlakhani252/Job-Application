import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './ApplyForm.module.css'; // eslint-disable-line no-unused-vars
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { CloudUpload } from 'lucide-react';
import { submitApplication } from '../../api/applicationApi.js';
import { supabase } from '../../supabaseClient.js';

// Application form for a specific opportunity
function ApplyForm({ opportunityId }) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setServerError('File size must be less than 5MB');
      return;
    }

    if (file.type !== 'application/pdf') {
      setServerError('Only PDF files are allowed');
      return;
    }

    setUploading(true);
    setServerError('');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      setResumeUrl(publicUrl);
    } catch (err) {
      setServerError(err.message || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(data) {
    setServerError('');
    try {
      const application = await submitApplication({
        ...data,
        opportunityId,
        resumeLink: resumeUrl
      });
      navigate(`/application-success/${application.applicationId}`);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Apply for this Position</Typography>

      {/* Backend error (e.g. duplicate application) */}
      {serverError && <Alert severity="error">{serverError}</Alert>}

      <TextField
        label="Short Message"
        multiline
        rows={3}
        required
        error={!!errors.message}
        helperText={errors.message ? 'Message is required' : ''}
        {...register('message', { required: true })}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Upload your Resume (PDF, max 5MB)
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={uploading ? <div className="loader-small" /> : <CloudUpload size={18} />}
          disabled={uploading}
          sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
        >
          {resumeUrl ? 'Resume Uploaded ✓' : uploading ? 'Uploading...' : 'Upload PDF'}
          <input type="file" hidden accept=".pdf" onChange={handleFileUpload} />
        </Button>
        {resumeUrl && (
          <Typography variant="caption" color="success.main">
            Resume successfully attached!
          </Typography>
        )}
      </Box>

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting || !resumeUrl}
        sx={{ alignSelf: 'flex-start' }}
      >
        {isSubmitting ? 'Submitting…' : 'Submit Application'}
      </Button>
      {!resumeUrl && !isSubmitting && (
        <Typography variant="caption" color="error">
          * Please upload your resume to enable submission
        </Typography>
      )}
    </Box>
  );
}

export default ApplyForm;
