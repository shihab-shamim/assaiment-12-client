import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';

const AdminPrivet = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    
    if (authLoading || isAdminLoading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" />;
};

export default AdminPrivet;
