import React from 'react';
import useAuth from '../hooks/useAuth';
import { CirclesWithBar } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <CirclesWithBar
                height="100"
                width="100"
                color="#4fa94d"
                outerCircleColor="#4fa94d"
                innerCircleColor="#4fa94d"
                barColor="#4fa94d"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        );
    }

    if (user) {
        return children;
    }

    return <Navigate state={{ from: location }} to='/login' />;
};

export default PrivetRoute;
