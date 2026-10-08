import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import ApplyForm from '../../components/opportunity/ApplyForm.jsx';
import { getOpportunityById } from '../../api/opportunityApi.js';
import styles from './OpportunityDetails.module.css';

// Detail page for a single opportunity, with inline application form
function OpportunityDetails() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getOpportunityById(id)
      .then((data) => {
        setOpportunity(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to load opportunity.');
        setLoading(false);
      });
  }, [id]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1}>
        <Container maxWidth="md" className={styles.container}>
          {loading && <Loader />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && opportunity && (
            <>
              {/* Opportunity info */}
              <Typography variant="h4" component="h1" gutterBottom>
                {opportunity.title}
              </Typography>

              <Box className={styles.metaRow}>
                <Typography variant="subtitle1" color="text.secondary">
                  {opportunity.companyName}
                </Typography>
                <Chip
                  label={opportunity.type}
                  color={opportunity.type === 'Job' ? 'primary' : 'secondary'}
                  variant="filled"
                  size="small"
                />
              </Box>

              <Box className={styles.fieldList}>
                <Typography variant="body1">
                  <strong>Domain:</strong> {opportunity.domain}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {opportunity.location}
                </Typography>
                {opportunity.experience && (
                  <Typography variant="body1">
                    <strong>Experience:</strong> {opportunity.experience}
                  </Typography>
                )}
              </Box>

              {opportunity.description && (
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ whiteSpace: 'pre-wrap', mt: 2 }}
                >
                  {opportunity.description}
                </Typography>
              )}

              {opportunity.applicationLink && (
                <Button
                  variant="outlined"
                  href={opportunity.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNewIcon />}
                  sx={{ mt: 2 }}
                >
                  Open Application Link
                </Button>
              )}

              {/* Apply form */}
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" gutterBottom>
                Apply Now
              </Typography>
              <ApplyForm opportunityId={opportunity._id} />
            </>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default OpportunityDetails;
