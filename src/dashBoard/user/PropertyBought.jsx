import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const PropertyBought = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data}=useQuery({
        queryKey:['bought'],
        queryFn:async () =>{
            const {data} =await axiosSecure.get(`/myBought/${user?.email}`)
            return data 

        },
        initialData:[]
    })
    console.log(data)

    return (
        <div>
            <h2 className="text-center bg-orange-400 p-4 text-xl font-semibold">Property Bought </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    data.map(da=><div key={da._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                          <img src={da.propertyImage} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="font-bold">Location : {da.propertyLocation}</h2>
                          <p>property Title : {da.propertyTitle}</p>
                          <div>
                            <p>Agent : {da.agentName}</p>
                            <p>Offered Amount : <span className="text-red-500">{da.offered}</span></p>
                          </div>
                          <div>
                            <p>Status:{da.status}</p>
                          </div>
                          <div className="card-actions">
                            {
                                (da.status === 'pending' || da.status ==='reject')?<button disabled className="btn btn-primary">Pay</button>:<button className="btn btn-primary">Pay</button>
                            }
                          </div>
                        </div>
                      </div>)
                }
            </div>
            
        </div>
    );
};

export default PropertyBought;