import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const MyAdd = () => {
    const axiosSecure =useAxiosSecure()
    const {data}=useQuery({
        queryKey:['property'],
        queryFn:async () => {
            const res = await axiosSecure.get()

        }
    })
    return (
        <div>
            <h2 className="text-center text-xl font-bold bg-blue-500 text-white p-4"> My added properties section</h2>
            
        </div>
    );
};

export default MyAdd;