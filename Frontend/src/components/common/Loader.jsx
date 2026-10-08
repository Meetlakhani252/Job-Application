import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.css';

// Centered loading spinner; pass size prop to override default size
function Loader({ size }) {
  return (
    <div className={styles.wrapper}>
      <CircularProgress size={size} />
    </div>
  );
}

export default Loader;
