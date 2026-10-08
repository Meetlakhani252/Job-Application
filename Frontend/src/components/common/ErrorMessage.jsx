import Alert from '@mui/material/Alert';

// Displays an error message in an MUI Alert
function ErrorMessage({ message }) {
  return <Alert severity="error">{message}</Alert>;
}

export default ErrorMessage;
