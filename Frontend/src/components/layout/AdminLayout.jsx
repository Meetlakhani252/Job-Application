import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './AdminLayout.module.css';

const DRAWER_WIDTH = 220;

// Persistent sidebar layout for all admin pages
function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <Drawer
        variant="permanent"
        className={styles.drawer}
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
      >
        <div className={styles.drawerHeader}>
          <Typography variant="h6" fontWeight="bold">Admin</Typography>
        </div>
        <Divider />
        <List>
          <ListItemButton onClick={() => navigate('/admin')}>
            <ListItemText primary="Opportunities" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/applications')}>
            <ListItemText primary="Applications" />
          </ListItemButton>
        </List>
        <Divider />
        <div className={styles.drawerFooter}>
          <Button variant="outlined" color="error" fullWidth onClick={logout}>
            Logout
          </Button>
        </div>
      </Drawer>

      {/* Main content area */}
      <Box component="main" className={styles.main}>
        <Outlet />
      </Box>
    </div>
  );
}

export default AdminLayout;

