import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";


const Update = () => {
    const axiosSecure =useAxiosSecure()
    const params= useParams()
    // console.log(id)
    // const {data}=useQuery({
    //     queryKey:[`/property/${params.id}`],
    //     queryFn : async () =>{
    //        try{
    //         const res =await axiosSecure.get(`/property/${params.id}`)
    //         return res.data
    //        }
    //        catch{
    //         console.log(error)
    //        }
    //     }
    // })
    // console.log(data)

    
    
    return (
        <div> <h2>updated</h2>
            
        </div>
    );
};

export default Update;