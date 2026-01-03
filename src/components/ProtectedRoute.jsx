import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && user?.role !== allowedRole) {
        // Redirect to appropriate dashboard if role doesn't match
        const redirectPath = user?.role === 'admin' ? '/admin/dashboard' : '/customers/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
