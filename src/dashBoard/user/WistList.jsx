import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const WistList = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const {data,refetch}=useQuery({
        queryKey:['wishlist',user?.email],
        queryFn:async () =>{
            const {data} =await axiosSecure.get(`/wishlist/${user?.email}`)
            return data
            

        },
        initialData:[]
    })
    console.log(data)
    const handleDelete =async (id) =>{
        console.log(id)
        try{
            const {data} =await axiosSecure.delete(`/wishlist/${id}`)
            console.log(data)
            refetch()

        }
        catch{
            console.log(error)
        }

    }

    return (
        <div>
            <h2 className="text-center text-xl bg-orange-400 p-4">WishList </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

                {
                    data.map(da=><div key={da._id} className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                        <div className="flex space-x-4">
                          <img
                            alt=""
                            src={da.agentImage}
                            className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                          />
                          <div className="flex flex-col space-y-1">
                            <a
                              rel="noopener noreferrer"
                              href="#"
                              className="text-sm font-semibold"
                            >
                              {da.agentName}
                            </a>
                          </div>
                        </div>
                        <div>
                          <img
                            src={da.image}
                            alt=""
                            className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                          />
                          <h2 className="mb-1 text-xl font-semibold">{da.title}</h2>
                          {/* <p className="text-sm dark:text-gray-600">Eu qualisque aliquando mel, id lorem detraxit nec, ad elit minimum pri. Illum ipsum detracto ne cum. Mundi nemore te ius, vim ad illud atqui apeirian...</p> */}
                        </div>
                        <div className="flex flex-wrap justify-between">
                          <div className="space-x-2">
                            <p>Location : {da.location}</p>
                            <p className="text-xl font-bold">
                              Price :{" "}
                              <span className="text-green-500">
                                {da.minPrice} - {da?.maxPrice}
                              </span>{" "}
                              $
                            </p>
                          </div>
                          <div className="flex space-x-2 text-sm dark:text-gray-600">
                            <p className="text-xl text-orange-400 font-bold">
                              Status : {da.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                            <Link to={`/offer/${da._id}`}><button className="btn btn-secondary bg-red-600">offer</button></Link>
                        
                          <button
                            onClick={() => handleDelete(da._id)}
                            className="btn btn-secondary bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>)

                }
            </div>

            
        </div>
    );
};

export default WistList;