import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './ApplyForm.module.css'; // eslint-disable-line no-unused-vars
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { submitApplication } from '../../api/applicationApi.js';

// Application form for a specific opportunity
function ApplyForm({ opportunityId }) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    setServerError('');
    try {
      const application = await submitApplication({ ...data, opportunityId });
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
        label="Name"
        required
        error={!!errors.name}
        helperText={errors.name ? 'Name is required' : ''}
        {...register('name', { required: true })}
      />

      <TextField
        label="Phone"
        required
        error={!!errors.phone}
        helperText={errors.phone ? 'Phone is required' : ''}
        {...register('phone', { required: true })}
      />

      <TextField
        label="Email"
        type="email"
        required
        error={!!errors.email}
        helperText={errors.email ? 'Email is required' : ''}
        {...register('email', { required: true })}
      />

      <TextField
        label="Resume Link"
        placeholder="https://…"
        {...register('resumeLink')}
      />

      <TextField
        label="Short Message"
        multiline
        rows={3}
        {...register('message')}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ alignSelf: 'flex-start' }}
      >
        {isSubmitting ? 'Submitting…' : 'Submit Application'}
      </Button>
    </Box>
  );
}

export default ApplyForm;
