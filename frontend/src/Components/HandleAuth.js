import { Navigate, Outlet } from 'react-router';

const HandleAuth = ({ isAuthenticated }) => {
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return <Outlet />
}
 
export default HandleAuth;