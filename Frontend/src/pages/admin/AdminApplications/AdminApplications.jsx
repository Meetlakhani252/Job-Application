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
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Application ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Applicant</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Contact Info</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Opportunity</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Resume</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app._id || app.id} hover>
                  <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 600, color: '#4f46e5' }}>
                    {app.applicationId}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>
                    {app.name}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                      <span style={{ fontSize: '0.875rem', color: '#1e293b' }}>{app.email}</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.phone}</span>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#334155', fontWeight: 500 }}>
                    {getOpportunityDisplay(app.opportunity)}
                  </TableCell>
                  <TableCell>
                    {app.resumeLink ? (
                      <Link
                        href={app.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          color: '#4f46e5',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        View PDF
                      </Link>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>—</span>
                    )}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 220, color: '#475569', fontSize: '0.875rem' }}>
                    {app.message || <span style={{ color: '#94a3b8' }}>—</span>}
                  </TableCell>
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
