import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';

import Home from '../pages/Home/Home.jsx';
import OpportunityDetails from '../pages/OpportunityDetails/OpportunityDetails.jsx';
import ApplySuccess from '../pages/ApplySuccess/ApplySuccess.jsx';
import ViewApplication from '../pages/ViewApplication/ViewApplication.jsx';
import FindApplication from '../pages/FindApplication/index.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import AdminLogin from '../pages/admin/AdminLogin/AdminLogin.jsx';
import AdminOpportunities from '../pages/admin/AdminOpportunities/AdminOpportunities.jsx';
import AdminOpportunityForm from '../pages/admin/AdminOpportunityForm/AdminOpportunityForm.jsx';
import AdminApplications from '../pages/admin/AdminApplications/AdminApplications.jsx';

// Public pages include Navbar + Footer directly in each page component.
// Admin routes are protected and nested under AdminLayout.
function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/opportunities/:id" element={<OpportunityDetails />} />
      <Route path="/application-success/:applicationId" element={<ApplySuccess />} />
      <Route path="/applications/:applicationId" element={<ViewApplication />} />
      <Route path="/find-application" element={<FindApplication />} />

      {/* Admin login — no auth required */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes nested under AdminLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOpportunities />} />
          <Route path="/admin/opportunities/new" element={<AdminOpportunityForm />} />
          <Route path="/admin/opportunities/:id/edit" element={<AdminOpportunityForm />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
        </Route>
      </Route>

      {/* 404 catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
