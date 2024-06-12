import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { CirclesWithBar } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

;

const AllProperty = () => {
    const {user}=useAuth()
    const axiosPublic =useAxiosPublic()
    const {data:propertiys,isLoading}=useQuery({
        queryKey:['allProperty'],
        queryFn:async () =>{
            const {data}=await axiosPublic.get('/allProperty')
           return data
        },
        initialData:[]
    })
    if(isLoading){
        return <div className="min-h-[59vh]">
            <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
        </div>
    }
    console.log(propertiys)
    return (
        <div className="min-h-[59vh]">
            <h2 className="text-center text-xl font-bold bg-red-500 p-4">All Property</h2>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
           {
                propertiys.map(property => <div key={property._id} className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                    <div className="flex space-x-4">
                      <img
                        alt=""
                        src={user?.photoURL}
                        className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                      />
                      <div className="flex flex-col space-y-1">
                        <a
                          rel="noopener noreferrer"
                          href="#"
                          className="text-sm font-semibold"
                        >
                          {property.agentName}
                        </a>
                      </div>
                    </div>
                    <div>
                      <img
                        src={property.image}
                        alt=""
                        className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                      />
                      <h2 className="mb-1 text-xl font-semibold">{property.title}</h2>
                      {/* <p className="text-sm dark:text-gray-600">Eu qualisque aliquando mel, id lorem detraxit nec, ad elit minimum pri. Illum ipsum detracto ne cum. Mundi nemore te ius, vim ad illud atqui apeirian...</p> */}
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <div className="space-x-2">
                        <p>Location : {property.location}</p>
                        <p className="text-xl font-bold">
                          Price :{" "}
                          <span className="text-green-500">
                            {property.minPrice} - {property.maxPrice}
                          </span>{" "}
                          $
                        </p>
                      </div>
                      <div className="flex space-x-2 text-sm dark:text-gray-600">
                        <p className="text-xl text-orange-400 font-bold">
                          Status : {property.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                     
                     <Link to={`/details/${property._id}`}><button className="btn btn-secondary">Details</button></Link>
                     
                    </div>
                  </div>)

            }
           </div>
        
            
        </div>
    );
};

export default AllProperty;