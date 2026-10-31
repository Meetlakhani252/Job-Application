import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BriefcaseIcon from '@mui/icons-material/BusinessCenterOutlined';
import AssignmentIcon from '@mui/icons-material/AssignmentOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ShieldIcon from '@mui/icons-material/Shield';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './AdminLayout.module.css';

const DRAWER_WIDTH = 240;

function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isOpportunities = location.pathname === '/admin' || location.pathname.startsWith('/admin/opportunities');
  const isApplications = location.pathname.startsWith('/admin/applications');

  const pageTitle = isApplications
    ? 'Application Management'
    : location.pathname.includes('/new')
    ? 'Create New Opportunity'
    : location.pathname.includes('/edit')
    ? 'Edit Opportunity'
    : 'Opportunity Listings';

  return (
    <div className={styles.root}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        className={styles.drawer}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#0f172a',
            borderRight: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <div className={styles.drawerHeader}>
          <ShieldIcon className={styles.logoIcon} />
          <Typography variant="h6" className={styles.logoTitle}>
            Admin Portal
          </Typography>
        </div>

        <List className={styles.navList}>
          <ListItemButton
            className={`${styles.navItem} ${isOpportunities ? styles.navItemActive : ''}`}
            onClick={() => navigate('/admin')}
          >
            <ListItemIcon className={styles.navIcon}>
              <BriefcaseIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Opportunities" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} />
          </ListItemButton>

          <ListItemButton
            className={`${styles.navItem} ${isApplications ? styles.navItemActive : ''}`}
            onClick={() => navigate('/admin/applications')}
          >
            <ListItemIcon className={styles.navIcon}>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Applications" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} />
          </ListItemButton>
        </List>

        <div className={styles.drawerFooter}>
          <Button
            variant="text"
            fullWidth
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon fontSize="small" />}
            sx={{
              color: '#94a3b8',
              mb: 1.5,
              textTransform: 'none',
              fontSize: '0.85rem',
              '&:hover': { color: '#ffffff', backgroundColor: '#1e293b' },
            }}
          >
            View Live Site
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutIcon fontSize="small" />}
            className={styles.logoutBtn}
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
      </Drawer>

      {/* Main viewport */}
      <Box component="main" className={styles.main}>
        {/* Top Navbar */}
        <div className={styles.topBar}>
          <Typography variant="h6" className={styles.pageTitle}>
            {pageTitle}
          </Typography>

          <div className={styles.userBadge}>
            <div className={styles.avatar}>
              {(admin?.email?.[0] || 'A').toUpperCase()}
            </div>
            <Typography variant="body2" className={styles.adminEmail}>
              {admin?.email || 'Administrator'}
            </Typography>
          </div>
        </div>

        {/* Content Viewport */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </Box>
    </div>
  );
}

export default AdminLayout;

