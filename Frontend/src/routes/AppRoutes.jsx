import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';

import Home from '../pages/Home/Home.jsx';
import Opportunities from '../pages/Opportunities/Opportunities.jsx';
import OpportunityDetails from '../pages/OpportunityDetails/OpportunityDetails.jsx';
import ApplySuccess from '../pages/ApplySuccess/ApplySuccess.jsx';
import ViewApplication from '../pages/ViewApplication/ViewApplication.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import AdminLogin from '../pages/admin/AdminLogin/AdminLogin.jsx';
import AdminOpportunities from '../pages/admin/AdminOpportunities/AdminOpportunities.jsx';
import AdminOpportunityForm from '../pages/admin/AdminOpportunityForm/AdminOpportunityForm.jsx';
import AdminApplications from '../pages/admin/AdminApplications/AdminApplications.jsx';
import UserLogin from '../pages/auth/Login/Login.jsx';
import UserSignUp from '../pages/auth/SignUp/SignUp.jsx';
import AuthChoice from '../pages/auth/AuthChoice.jsx';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/opportunities/:id" element={<OpportunityDetails />} />
      <Route path="/application-success/:applicationId" element={<ApplySuccess />} />
      <Route path="/applications/:applicationId" element={<ViewApplication />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/find-application" element={<Dashboard />} />

      {/* Auth entry point */}
      <Route path="/login" element={<AuthChoice />} />

      {/* User Auth routes */}
      <Route path="/auth/login" element={<UserLogin />} />
      <Route path="/auth/signup" element={<UserSignUp />} />

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
