import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from '../../../components/common/ConfirmModal.jsx';
import EmptyState from '../../../components/common/EmptyState.jsx';
import ErrorMessage from '../../../components/common/ErrorMessage.jsx';
import Loader from '../../../components/common/Loader.jsx';
import { getOpportunities } from '../../../api/opportunityApi.js';
import { deleteOpportunity } from '../../../api/adminApi.js';
import styles from './AdminOpportunities.module.css';

function AdminOpportunities() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load opportunities.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  async function handleDelete() {
    try {
      await deleteOpportunity(deleteTargetId);
      setSnackbar({ open: true, message: 'Opportunity deleted.', severity: 'success' });
      await fetchOpportunities();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Delete failed.',
        severity: 'error',
      });
    } finally {
      setDeleteTargetId(null);
    }
  }

  return (
    <Box>
      <Box className={styles.header}>
        <Typography variant="h5" fontWeight="bold">
          Opportunities
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/opportunities/new')}
        >
          Add Opportunity
        </Button>
      </Box>

      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && opportunities.length === 0 && (
        <EmptyState message="No opportunities yet. Add one to get started." />
      )}

      {!loading && !error && opportunities.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Domain</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {opportunities.map((opp) => (
                <TableRow key={opp._id} hover>
                  <TableCell>{opp.title}</TableCell>
                  <TableCell>{opp.companyName}</TableCell>
                  <TableCell>
                    <Chip
                      label={opp.type}
                      size="small"
                      color={opp.type === 'Job' ? 'primary' : 'secondary'}
                    />
                  </TableCell>
                  <TableCell>{opp.domain}</TableCell>
                  <TableCell align="right" className={styles.actions}>
                    <IconButton
                      aria-label="Edit opportunity"
                      onClick={() => navigate(`/admin/opportunities/${opp._id}/edit`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete opportunity"
                      color="error"
                      onClick={() => setDeleteTargetId(opp._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ConfirmDialog
        open={!!deleteTargetId}
        title="Delete Opportunity"
        message="Are you sure you want to delete this opportunity? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdminOpportunities;
