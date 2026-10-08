import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';
import styles from './EmptyState.module.css';

// Shown when a list or page has no data to display
function EmptyState({ message = 'No data found.' }) {
  return (
    <div className={styles.wrapper}>
      <InboxIcon className={styles.icon} />
      <Typography variant="body1">{message}</Typography>
    </div>
  );
}

export default EmptyState;
