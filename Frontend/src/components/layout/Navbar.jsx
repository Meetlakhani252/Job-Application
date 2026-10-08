import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './Navbar.module.css';

// Top navigation bar: app title, find-application search, admin links
function Navbar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [appId, setAppId] = useState('');

  function handleFindApplication(e) {
    e.preventDefault();
    const trimmed = appId.trim();
    if (trimmed) {
      navigate(`/applications/${trimmed}`);
      setAppId('');
    }
  }

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar className={styles.toolbar}>
        {/* App title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className={styles.title}
        >
          Job Portal
        </Typography>

        {/* Find application by ID */}
        <form onSubmit={handleFindApplication} className={styles.findForm}>
          <TextField
            size="small"
            placeholder="Application ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            className={styles.searchInput}
            slotProps={{ input: { style: { color: 'white' } } }}
            inputProps={{ 'aria-label': 'Application ID' }}
          />
          <IconButton type="submit" aria-label="Find application" sx={{ color: 'white' }}>
            <SearchIcon />
          </IconButton>
        </form>

        {/* Admin Login — hidden when logged in */}
        {!admin && (
          <Button color="inherit" component={Link} to="/admin/login">
            Admin Login
          </Button>
        )}

        {/* Logout — shown only when logged in */}
        {admin && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
