import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from './common/Loader.jsx';

// Redirects unauthenticated users to the admin login page
function ProtectedRoute() {
  const { admin, loading } = useAuth();

  if (loading) return <Loader />;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
