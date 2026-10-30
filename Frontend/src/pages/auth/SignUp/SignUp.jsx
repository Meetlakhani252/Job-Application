import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext.jsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import styles from './SignUp.module.css';

function UserSignUp() {
  const { signUpUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data) {
    try {
      await signUpUser(data.email, data.password, data.fullName, data.phone);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.');
    }
  }

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Paper className={styles.card} elevation={3}>
        <Typography variant="h5" fontWeight="bold" mb={1}>Create Account</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Join us to start applying for the best opportunities.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            {...register('fullName', { required: 'Full name is required' })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            {...register('phone', { required: 'Phone is required' })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
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
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Button variant="text" onClick={() => navigate('/auth/login')}>Login</Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserSignUp;
