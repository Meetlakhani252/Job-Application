import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import UserLayout from '../components/layout/UserLayout.jsx';

import Home from '../pages/Home/Home.jsx';
import Opportunities from '../pages/Opportunities/Opportunities.jsx';
import OpportunityDetails from '../pages/OpportunityDetails/OpportunityDetails.jsx';
import ApplySuccess from '../pages/ApplySuccess/ApplySuccess.jsx';
import ViewApplication from '../pages/ViewApplication/ViewApplication.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import FindApplication from '../pages/FindApplication/index.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import AdminLogin from '../pages/admin/AdminLogin/AdminLogin.jsx';
import AdminOpportunities from '../pages/admin/AdminOpportunities/AdminOpportunities.jsx';
import AdminOpportunityForm from '../pages/admin/AdminOpportunityForm/AdminOpportunityForm.jsx';
import AdminApplications from '../pages/admin/AdminApplications/AdminApplications.jsx';
import UserLogin from '../pages/auth/Login/Login.jsx';
import UserSignUp from '../pages/auth/SignUp/SignUp.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import AuthChoice from '../pages/auth/AuthChoice.jsx';
import StaticPage from '../pages/Static/StaticPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/opportunities/:id" element={<OpportunityDetails />} />
      <Route path="/application-success/:applicationId" element={<ApplySuccess />} />
      <Route path="/applications/:applicationId" element={<ViewApplication />} />
      <Route path="/find-application" element={<FindApplication />} />

      {/* User Protected routes - Wrapped in UserLayout to separate from Landing Page */}
      <Route element={<ProtectedRoute requiredRole="user" />}>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Auth entry point */}
      <Route path="/login" element={<AuthChoice />} />

      {/* User Auth routes */}
      <Route path="/auth/login" element={<UserLogin />} />
      <Route path="/auth/signup" element={<UserSignUp />} />

      {/* Admin login — no auth required */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes nested under AdminLayout */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOpportunities />} />
          <Route path="/admin/opportunities/new" element={<AdminOpportunityForm />} />
          <Route path="/admin/opportunities/:id/edit" element={<AdminOpportunityForm />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
        </Route>
      </Route>

      {/* Static Info Routes */}
      <Route path="/privacy-policy" element={<StaticPage title="Privacy Policy" content="Your privacy is important to us. We collect only the necessary information to facilitate your application process. We do not sell your data to third parties." />} />
      <Route path="/terms-of-service" element={<StaticPage title="Terms of Service" content="By using Rooklet, you agree to our terms of service. We are not the employers themselves." />} />

      {/* 404 catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
