import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Box from '@mui/material/Box';

export default function UserLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar userMode={true} />
      <Box component="main" flexGrow={1}>
        <Outlet />
      </Box>
      <Footer userMode={true} />
    </Box>
  );
}
