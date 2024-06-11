import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import AddCard from "./AddCard";


const MyAdd = () => {
    const {user}=useAuth()
    const axiosSecure =useAxiosSecure()
    const {data:properties,refetch,isPending}=useQuery({
        queryKey:['property'],
        queryFn:async () => {
            const res = await axiosSecure.get(`/property/${user?.email}`)
            return res.data

        },
        initialData:[]
    })
    
   
    return (
        <div>
            <h2 className="text-center text-xl font-bold bg-blue-500 text-white p-4"> My added properties section {properties.length}</h2>

            <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3">
                {
                    properties.map(property => <AddCard refetch={refetch}  property={property} user={user}  key={property._id}></AddCard>)
                }
            </div>
            
        </div>
    );
};

export default MyAdd;