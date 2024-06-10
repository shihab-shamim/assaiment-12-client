import { useState, useEffect } from 'react';
import useRole from './useRole';

const useAdmin = () => {
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { data: userRole, isLoading: roleLoading } = useRole();

    useEffect(() => {
        if (!roleLoading) {
            setRole(userRole);
            setIsLoading(false);
        }
    }, [userRole, roleLoading]);

    const isAdmin = role === 'admin';

    return [isAdmin, isLoading];
};

export default useAdmin;
