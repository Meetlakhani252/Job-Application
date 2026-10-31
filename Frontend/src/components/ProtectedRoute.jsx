import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from './common/Loader.jsx';
import styles from './ProtectedRoute.module.css'; // eslint-disable-line no-unused-vars

// Supports both user and admin protection based on requiredRole prop: 'admin' (default) or 'user'
function ProtectedRoute({ requiredRole = 'admin' }) {
  const { admin, user, loading } = useAuth();

  if (loading) return <Loader />;

  if (requiredRole === 'admin') {
    if (!admin) return <Navigate to="/admin/login" replace />;
  } else if (requiredRole === 'user') {
    if (!user) return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
