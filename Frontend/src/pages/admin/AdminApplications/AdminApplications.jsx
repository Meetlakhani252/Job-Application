import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import EmptyState from '../../../components/common/EmptyState.jsx';
import ErrorMessage from '../../../components/common/ErrorMessage.jsx';
import Loader from '../../../components/common/Loader.jsx';
import { getAllApplications } from '../../../api/adminApi.js';
import styles from './AdminApplications.module.css';

// Returns a display string for the opportunity field.
// The backend may return a populated object or a raw ObjectId string.
function getOpportunityDisplay(opportunity) {
  if (!opportunity) return '—';
  if (typeof opportunity === 'object') {
    const title = opportunity.title || '';
    const company = opportunity.companyName || '';
    if (title && company) return `${title} — ${company}`;
    if (title) return title;
    if (company) return company;
    return String(opportunity._id || '—');
  }
  // Raw ObjectId string
  return String(opportunity);
}

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllApplications()
      .then((data) => setApplications(data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load applications.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Applications
      </Typography>

      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && applications.length === 0 && (
        <EmptyState message="No applications submitted yet." />
      )}

      {!loading && !error && applications.length > 0 && (
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Application ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Resume</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Opportunity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app._id} hover>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{app.applicationId}</TableCell>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>
                    {app.resumeLink ? (
                      <Link href={app.resumeLink} target="_blank" rel="noopener noreferrer">
                        View
                      </Link>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                  <TableCell>{app.message || '—'}</TableCell>
                  <TableCell>{getOpportunityDisplay(app.opportunity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default AdminApplications;
