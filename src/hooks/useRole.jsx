import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: userStatus={}, isLoading: userLoading } = useQuery({
        queryKey: ['user',user?.email,loading],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try{
                if (!user?.email) {
                    return { role: null }; // Return a default value if email is not available
                }
                // const userInfo = { email: user?.email };
            const res = await axiosSecure.get(`/user/${user?.email}`);
             return res.data;
            }
            catch(error){
                console.log(error)
            }
        },
        
    });

    const role = userStatus?.role;

    return [userStatus, role,userLoading];
};

export default useRole;
