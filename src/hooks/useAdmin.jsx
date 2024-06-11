import { useState, useEffect } from 'react';
import useRole from './useRole';

const useAdmin = () => {
    const [role, setRole] = useState(null); // Uncommented this line
    const [isLoading, setIsLoading] = useState(true);

    const [userStatus, userRole, userLoading] = useRole(); // Updated this line
    console.log('userRole:', userRole, 'isAdmin:', userLoading); // Updated this line

    useEffect(() => {
        if (!userLoading) {
            setRole(userRole);
            setIsLoading(false);
        }
    }, [userRole, userLoading]);

    const isAdmin = role === 'admin';

    return [isAdmin, isLoading];
};

export default useAdmin;
