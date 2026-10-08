import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DOMAINS, TYPES } from '../../../constants/index.js';
import { getOpportunityById } from '../../../api/opportunityApi.js';
import { createOpportunity, updateOpportunity } from '../../../api/adminApi.js';
import Loader from '../../../components/common/Loader.jsx';
import styles from './AdminOpportunityForm.module.css';

function AdminOpportunityForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [fetchError, setFetchError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      companyName: '',
      type: '',
      domain: '',
      location: '',
      experience: '',
      description: '',
      applicationLink: '',
    },
  });

  // In edit mode, fetch the opportunity and pre-fill the form
  useEffect(() => {
    if (!isEdit) return;
    setFetchLoading(true);
    setFetchError('');
    getOpportunityById(id)
      .then((data) => {
        reset({
          title: data.title ?? '',
          companyName: data.companyName ?? '',
          type: data.type ?? '',
          domain: data.domain ?? '',
          location: data.location ?? '',
          experience: data.experience ?? '',
          description: data.description ?? '',
          applicationLink: data.applicationLink ?? '',
        });
      })
      .catch((err) => {
        setFetchError(err.response?.data?.message || 'Failed to load opportunity.');
      })
      .finally(() => setFetchLoading(false));
  }, [id, isEdit, reset]);

  async function onSubmit(formData) {
    setSubmitting(true);
    try {
      if (isEdit) {
        await updateOpportunity(id, formData);
        setSnackbar({ open: true, message: 'Opportunity updated.', severity: 'success' });
      } else {
        await createOpportunity(formData);
        setSnackbar({ open: true, message: 'Opportunity created.', severity: 'success' });
      }
      // Short delay so the user sees the success message before navigating
      setTimeout(() => navigate('/admin'), 1000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Save failed. Please try again.',
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (fetchLoading) return <Loader />;
  if (fetchError) return <Alert severity="error">{fetchError}</Alert>;

  return (
    <Box className={styles.container}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {isEdit ? 'Edit Opportunity' : 'Add Opportunity'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
        <TextField
          label="Title"
          fullWidth
          {...register('title', { required: 'Title is required' })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Company Name"
          fullWidth
          {...register('companyName', { required: 'Company name is required' })}
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
        />

        {/* Type select */}
        <FormControl fullWidth error={!!errors.type}>
          <InputLabel id="type-label">Type</InputLabel>
          <Controller
            name="type"
            control={control}
            rules={{ required: 'Type is required' }}
            render={({ field }) => (
              <Select labelId="type-label" label="Type" {...field}>
                {TYPES.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
        </FormControl>

        {/* Domain select */}
        <FormControl fullWidth error={!!errors.domain}>
          <InputLabel id="domain-label">Domain</InputLabel>
          <Controller
            name="domain"
            control={control}
            rules={{ required: 'Domain is required' }}
            render={({ field }) => (
              <Select labelId="domain-label" label="Domain" {...field}>
                {DOMAINS.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.domain && <FormHelperText>{errors.domain.message}</FormHelperText>}
        </FormControl>

        <TextField
          label="Location"
          fullWidth
          {...register('location', { required: 'Location is required' })}
          error={!!errors.location}
          helperText={errors.location?.message}
        />

        <TextField
          label="Experience"
          fullWidth
          placeholder="e.g. 1-2 years or Fresher"
          {...register('experience', { required: 'Experience is required' })}
          error={!!errors.experience}
          helperText={errors.experience?.message}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          minRows={4}
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label="Application Link"
          fullWidth
          type="url"
          {...register('applicationLink', { required: 'Application link is required' })}
          error={!!errors.applicationLink}
          helperText={errors.applicationLink?.message}
        />

        <Box className={styles.actions}>
          <Button variant="outlined" onClick={() => navigate('/admin')} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Saving…' : isEdit ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdminOpportunityForm;
