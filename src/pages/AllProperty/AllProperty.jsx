import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { CirclesWithBar } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

;

const AllProperty = () => {
  const [asc,setAsc]=useState(true)
  const [search,setSearch]=useState('')
    const {user}=useAuth()
    const axiosPublic =useAxiosPublic()
    const {data:propertiys,isLoading}=useQuery({
        queryKey:['allProperty',asc,search],
        queryFn:async () =>{
            const {data}=await axiosPublic.get(`/allProperty?sort=${asc?'asc':'dsc'}&search=${search}`)
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
    const handleSearch = async e =>{
      e.preventDefault() 
      const searchText=e.target.search.value 
      setSearch(searchText)
      console.log(search)

    }
    
    return (
        <div className="min-h-[59vh]">
            <h2 className="text-center text-xl font-bold bg-red-500 p-4">All Property</h2>

            <div className="mt-2 flex justify-center">
              <button onClick={()=>setAsc(!asc)} className="btn btn-primary">{asc?'Price:High To Low':'Price:Low To High'} </button>

            </div>
            <div className="flex justify-center items-center mt-6 ">
              <form onSubmit={handleSearch}>
                <input type="text" name="search" className=" mr-2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <input type="submit"  className="btn"/>
              </form>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
           {
                propertiys.map(property => <div key={property._id} className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                    <div className="flex space-x-4">
                      <img
                        alt=""
                        src={property.agentImage}
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