import Alert from '@mui/material/Alert';
import styles from './ErrorMessage.module.css';

// Displays an error message in an MUI Alert
function ErrorMessage({ message }) {
  return <Alert severity="error" className={styles.alert}>{message}</Alert>;
}

export default ErrorMessage;
