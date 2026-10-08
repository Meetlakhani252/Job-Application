import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Centered loading spinner; pass size prop to override default size
function Loader({ size }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={6}>
      <CircularProgress size={size} />
    </Box>
  );
}

export default Loader;
