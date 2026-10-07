import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import OpportunityDetails from "../pages/OpportunityDetails/OpportunityDetails.jsx";
import ApplySuccess from "../pages/ApplySuccess/ApplySuccess.jsx";
import ViewApplication from "../pages/ViewApplication/ViewApplication.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import AdminLogin from "../pages/admin/AdminLogin/AdminLogin.jsx";
import AdminOpportunities from "../pages/admin/AdminOpportunities/AdminOpportunities.jsx";
import AdminOpportunityForm from "../pages/admin/AdminOpportunityForm/AdminOpportunityForm.jsx";
import AdminApplications from "../pages/admin/AdminApplications/AdminApplications.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/opportunities/:id" element={<OpportunityDetails />} />
      <Route
        path="/apply-success/:applicationId"
        element={<ApplySuccess />}
      />
      <Route
        path="/application/:applicationId"
        element={<ViewApplication />}
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/opportunities" element={<AdminOpportunities />} />
      <Route
        path="/admin/opportunities/new"
        element={<AdminOpportunityForm />}
      />
      <Route
        path="/admin/opportunities/:id/edit"
        element={<AdminOpportunityForm />}
      />
      <Route path="/admin/applications" element={<AdminApplications />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
