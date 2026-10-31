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
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
      <Button
        startIcon={<ArrowBackIcon fontSize="small" />}
        onClick={() => navigate('/admin')}
        sx={{
          mb: 2.5,
          color: '#64748b',
          textTransform: 'none',
          fontSize: '0.9rem',
          '&:hover': { color: '#0f172a', backgroundColor: '#f1f5f9' },
        }}
      >
        Back to Opportunities
      </Button>

      <Paper className={styles.paper}>
        <Typography variant="h5" fontWeight="bold" mb={1} color="#0f172a">
          {isEdit ? 'Edit Opportunity' : 'Create New Opportunity'}
        </Typography>
        <Typography variant="body2" color="#64748b" mb={3}>
          {isEdit
            ? 'Update the details for this position.'
            : 'Fill in the information below to publish a new job or internship.'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
          <div className={styles.row}>
            <TextField
              label="Job / Internship Title"
              fullWidth
              placeholder="e.g. Frontend Developer Intern"
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Company Name"
              fullWidth
              placeholder="e.g. Acme Labs Inc."
              {...register('companyName', { required: 'Company name is required' })}
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
            />
          </div>

          <div className={styles.row}>
            {/* Type select */}
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel id="type-label">Opportunity Type</InputLabel>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Type is required' }}
                render={({ field }) => (
                  <Select labelId="type-label" label="Opportunity Type" {...field}>
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
          </div>

          <div className={styles.row}>
            <TextField
              label="Location"
              fullWidth
              placeholder="e.g. Remote / New York, NY"
              {...register('location', { required: 'Location is required' })}
              error={!!errors.location}
              helperText={errors.location?.message}
            />

            <TextField
              label="Experience Requirement"
              fullWidth
              placeholder="e.g. Fresher / 1-2 years"
              {...register('experience', { required: 'Experience is required' })}
              error={!!errors.experience}
              helperText={errors.experience?.message}
            />
          </div>

          <TextField
            label="Application / External URL"
            fullWidth
            type="url"
            placeholder="https://example.com/careers/apply"
            {...register('applicationLink', { required: 'Application link is required' })}
            error={!!errors.applicationLink}
            helperText={errors.applicationLink?.message}
          />

          <TextField
            label="Job Description & Responsibilities"
            fullWidth
            multiline
            minRows={5}
            placeholder="Outline role responsibilities, key skills, and perks..."
            {...register('description', { required: 'Description is required' })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Box className={styles.actions}>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin')}
              disabled={submitting}
              sx={{ textTransform: 'none', px: 3 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                textTransform: 'none',
                px: 3.5,
                backgroundColor: '#4f46e5',
                '&:hover': { backgroundColor: '#4338ca' },
              }}
            >
              {submitting ? 'Saving…' : isEdit ? 'Update Opportunity' : 'Publish Opportunity'}
            </Button>
          </Box>
        </Box>
      </Paper>

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
