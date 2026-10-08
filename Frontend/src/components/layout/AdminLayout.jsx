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

const DRAWER_WIDTH = 220;

// Persistent sidebar layout for all admin pages
function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <Box px={2} py={2}>
          <Typography variant="h6" fontWeight="bold">Admin</Typography>
        </Box>
        <Divider />
        <List>
          <ListItemButton onClick={() => navigate('/admin/opportunities')}>
            <ListItemText primary="Opportunities" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/applications')}>
            <ListItemText primary="Applications" />
          </ListItemButton>
        </List>
        <Divider />
        <Box px={2} py={2}>
          <Button variant="outlined" color="error" fullWidth onClick={logout}>
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
