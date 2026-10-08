import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../../context/AuthContext.jsx';
import styles from './AdminLogin.module.css';

function AdminLogin() {
  const { admin, loading, login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && admin) {
      navigate('/admin', { replace: true });
    }
  }, [admin, loading, navigate]);

  async function onSubmit({ email, password }) {
    setServerError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Paper className={styles.card} elevation={3}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Admin Login
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign in to manage opportunities and applications.
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={submitting}
            sx={{ mt: 2 }}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AdminLogin;
