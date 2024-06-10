import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user,loading}=useAuth()
    const {data:userStatus}=useQuery({
        queryKey:['user'],
        queryFn: async ()=>{
            const userInfo = {email:user?.email}
            const res =await axiosSecure.get(`/user/${user?.email}`)
            return res.data
        },
        enabled:!loading && !!user?.email
    })
    // console.log(data,user?.email)
    const role =userStatus?.role
    
    return [userStatus,role]
};

export default useRole;