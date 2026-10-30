import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { LogIn, ShieldCheck, User } from 'lucide-react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import styles from './AuthChoice.module.css';

function AuthChoice() {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1} className={styles.centered}>
        <Container maxWidth="sm">
          <Paper className={styles.card} elevation={3}>
            <Typography variant="h4" fontWeight="bold" mb={1} align="center">
              Welcome to Rooklet
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={5} align="center">
              Please choose your account type to continue.
            </Typography>

            <Box className={styles.choiceGrid}>
              <Button
                variant="outlined"
                className={styles.choiceButton}
                onClick={() => navigate('/auth/login')}
                startIcon={<User className="w-5 h-5" />}
              >
                User Login
              </Button>
              <Button
                variant="outlined"
                className={styles.choiceButton}
                onClick={() => navigate('/admin/login')}
                startIcon={<ShieldCheck className="w-5 h-5" />}
              >
                Admin Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default AuthChoice;
