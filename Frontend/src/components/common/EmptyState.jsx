import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';

// Shown when a list or page has no data to display
function EmptyState({ message = 'No data found.' }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" py={6} color="text.secondary">
      <InboxIcon sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
}

export default EmptyState;
