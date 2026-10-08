import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import styles from './FindApplication.module.css';

// Page for looking up a submitted application by its ID
function FindApplication() {
  const navigate = useNavigate();
  const [applicationId, setApplicationId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = applicationId.trim();
    if (trimmed) {
      navigate(`/applications/${trimmed}`);
    }
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1}>
        <Container maxWidth="sm" className={styles.container}>
          <Typography variant="h4" component="h1" gutterBottom>
            Find My Application
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Enter your Application ID to view your submitted application.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Application ID"
              placeholder="e.g. APP-7K3F9Q"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              fullWidth
              required
              inputProps={{ 'aria-label': 'Application ID' }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!applicationId.trim()}
            >
              Find
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default FindApplication;
