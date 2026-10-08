import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { getApplicationById } from '../../api/applicationApi.js';
import styles from './ViewApplication.module.css';

// Row helper for displaying a label + value pair
function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <Box className={styles.infoRow}>
      <Typography variant="body2" color="text.secondary" className={styles.label}>
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}

// Page that shows a saved application and its linked opportunity
function ViewApplication() {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getApplicationById(applicationId)
      .then((data) => {
        setApplication(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Application not found.');
        setLoading(false);
      });
  }, [applicationId]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1}>
        <Container maxWidth="md" className={styles.container}>
          {loading && <Loader />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && application && (
            <>
              <Typography variant="h4" component="h1" gutterBottom>
                Application Details
              </Typography>

              {/* Application ID */}
              <Typography variant="h6" color="primary" mb={3}>
                {application.applicationId}
              </Typography>

              {/* Opportunity info */}
              {application.opportunity && (
                <Paper variant="outlined" className={styles.section}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Opportunity
                  </Typography>
                  <InfoRow label="Title" value={application.opportunity.title} />
                  <InfoRow label="Company" value={application.opportunity.companyName} />
                </Paper>
              )}

              {/* Applicant info */}
              <Paper variant="outlined" className={styles.section}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Applicant
                </Typography>
                <InfoRow label="Name" value={application.name} />
                <InfoRow label="Email" value={application.email} />
                <InfoRow label="Phone" value={application.phone} />

                {application.resumeLink && (
                  <Box className={styles.infoRow}>
                    <Typography variant="body2" color="text.secondary" className={styles.label}>
                      Resume
                    </Typography>
                    <Link href={application.resumeLink} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </Link>
                  </Box>
                )}

                {application.message && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Message
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {application.message}
                    </Typography>
                  </>
                )}
              </Paper>
            </>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default ViewApplication;
