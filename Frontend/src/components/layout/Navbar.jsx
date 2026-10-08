import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../context/AuthContext.jsx';

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
      <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
        {/* App title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
        >
          Job Portal
        </Typography>

        {/* Find application by ID */}
        <Box component="form" onSubmit={handleFindApplication} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TextField
            size="small"
            placeholder="Application ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 1, input: { color: 'white' } }}
            inputProps={{ 'aria-label': 'Application ID' }}
          />
          <IconButton type="submit" aria-label="Find application" sx={{ color: 'white' }}>
            <SearchIcon />
          </IconButton>
        </Box>

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
