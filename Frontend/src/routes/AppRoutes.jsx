import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Box from '@mui/material/Box';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';

import Home from '../pages/Home/Home.jsx';
import OpportunityDetails from '../pages/OpportunityDetails/OpportunityDetails.jsx';
import ApplySuccess from '../pages/ApplySuccess/ApplySuccess.jsx';
import ViewApplication from '../pages/ViewApplication/ViewApplication.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import AdminLogin from '../pages/admin/AdminLogin/AdminLogin.jsx';
import AdminOpportunities from '../pages/admin/AdminOpportunities/AdminOpportunities.jsx';
import AdminOpportunityForm from '../pages/admin/AdminOpportunityForm/AdminOpportunityForm.jsx';
import AdminApplications from '../pages/admin/AdminApplications/AdminApplications.jsx';

// Public layout wraps Navbar + main content + Footer
function PublicLayout({ children }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/opportunities/:id"
        element={
          <PublicLayout>
            <OpportunityDetails />
          </PublicLayout>
        }
      />
      <Route
        path="/application-success/:applicationId"
        element={
          <PublicLayout>
            <ApplySuccess />
          </PublicLayout>
        }
      />
      <Route
        path="/applications/:applicationId"
        element={
          <PublicLayout>
            <ViewApplication />
          </PublicLayout>
        }
      />

      {/* Admin login — public */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOpportunities />} />
          <Route path="/admin/opportunities" element={<AdminOpportunities />} />
          <Route path="/admin/opportunities/new" element={<AdminOpportunityForm />} />
          <Route path="/admin/opportunities/:id/edit" element={<AdminOpportunityForm />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <NotFound />
          </PublicLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
