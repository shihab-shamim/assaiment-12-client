import { useEffect, useState } from "react";
import useRole from "./useRole";


const useAgent = () => {
    const [role,setRole]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    const [userStatus, userRole, userLoading] = useRole();
    useEffect(() => {
        if (!userLoading) {
            setRole(userRole);
            setIsLoading(false);
        }
    }, [userRole, userLoading]);

    const isAgent =role ==='agent' || role ==='fraud'
    return [isAgent,isLoading]
   
};

export default useAgent;