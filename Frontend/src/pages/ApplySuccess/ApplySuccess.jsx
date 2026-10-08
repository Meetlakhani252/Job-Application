import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import styles from './ApplySuccess.module.css';

// Confirmation page shown after a successful application submission
function ApplySuccess() {
  const { applicationId } = useParams();
  const [snackOpen, setSnackOpen] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setSnackOpen(true);
    });
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1}>
        <Container maxWidth="sm" className={styles.container}>
          <Box className={styles.card}>
            <CheckCircleOutlineIcon
              color="success"
              sx={{ fontSize: 64, mb: 2 }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Application Submitted!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              Your Application ID:
            </Typography>
            <Typography
              variant="h5"
              component="p"
              fontWeight="bold"
              color="primary"
              mb={3}
            >
              {applicationId}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Save this ID to look up your application later.
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopyLink}
              >
                Copy Shareable Link
              </Button>
              <Button variant="contained" component={Link} to="/">
                Back to Listings
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />

      {/* Copy confirmation snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          variant="filled"
        >
          Link copied!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ApplySuccess;
