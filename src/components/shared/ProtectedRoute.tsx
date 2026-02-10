 import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const accessToken = localStorage.getItem('accessToken');
 
    return accessToken ? <Outlet /> : <Navigate to="/auth/login" replace />;
};