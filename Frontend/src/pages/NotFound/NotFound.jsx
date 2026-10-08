import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import styles from './NotFound.module.css';

// 404 page shown for unmatched routes
function NotFound() {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1} className={styles.centered}>
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          The page you are looking for doesn&apos;t exist.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}

export default NotFound;
