import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Simple site footer
function Footer() {
  return (
    <Box component="footer" bgcolor="grey.100" py={2} textAlign="center">
      <Typography variant="body2" color="text.secondary">
        © 2025 Job Portal. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
