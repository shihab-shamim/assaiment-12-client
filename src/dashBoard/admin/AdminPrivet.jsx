import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';

const AdminPrivet = ({ children }) => {
    const location =useLocation()
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    console.log('isAdmin isAdminLoading',isAdmin,isAdminLoading)
    console.log( 'useAuth',user,authLoading)
    
    if (authLoading || isAdminLoading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{from:location}} replace />;
};

export default AdminPrivet;
