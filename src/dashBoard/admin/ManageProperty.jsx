import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ManageProperty = () => {
    const axiosSecure =useAxiosSecure()
    const {data:manageProperty}=useQuery({
        queryKey:['property'],
        queryFn:async () =>{
            try{
                const {data} =await  axiosSecure('/property')
                return data

            }
            catch{
                console.log(error)
            }
        },
        initialData:[]
    })
    return (
        <div>
            <h2 className="text-center text-xl font-bold bg-yellow-300 p-4">Manage Property {manageProperty.length} </h2>
            <div>
                
            </div>
            
        </div>
    );
};

export default ManageProperty;