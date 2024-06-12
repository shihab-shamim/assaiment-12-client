import { useEffect, useState } from "react";
import useRole from "./useRole";


const useAgent = () => {
    
    const [userStatus, userRole, userLoading] = useRole();

    // useEffect(() => {
    //     setIsLoading(true)
    //     if (!userLoading) {
    //         setRole(userRole);
    //         setIsLoading(false);
    //     }
    // }, [userRole, userLoading]);

    const isAgent =userRole ==='agent' || userRole ==='fraud'
    return [isAgent,userLoading]
   
};

export default useAgent;