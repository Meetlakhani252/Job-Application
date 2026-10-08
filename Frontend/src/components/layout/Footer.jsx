import Typography from '@mui/material/Typography';
import styles from './Footer.module.css';

// Simple site footer
function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography variant="body2" color="text.secondary">
        © 2025 Job Portal. All rights reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
