import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { LoadingScreen } from '../LoadingScreen';

 
//   ProtectedRoute: Redirects to /auth/login if not authenticated
 
export const ProtectedRoute = () => {
    const { accessToken, isInitialized } = useAuthStore();
    const location = useLocation();

 
    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (!accessToken) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

//   PublicRoute: Redirects to /dashboard if already logged in
 
export const PublicRoute = () => {
    const accessToken = useAuthStore((s) => s.accessToken);
    const isInitialized = useAuthStore((s) => s.isInitialized);

    if (!isInitialized) return null;

    if (accessToken) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};