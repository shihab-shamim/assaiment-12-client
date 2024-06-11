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
           
          
           <div className="overflow-x-auto">
  <table className="table table-zebra  ">
    {/* head */}
    <thead>
      <tr>
        <th>Number</th>
        <th>Name</th>
        <th>Email</th>
        <th>Title</th>
        <th>Location</th>
        <th>price</th>
        <th>Verify</th>
        <th>Reject</th>

      </tr>
    </thead>
    <tbody>
   {
    manageProperty.map((property,i)=><tr key={property._id}>
        <th>{i+1}</th>
        <td>{property.agentName}</td>
        <td>{property.agentEmail}</td>
        <td>{property.title}</td>
        <td>{property.location}</td>
        <td>{property.minPrice}  - {property.maxPrice} $</td>
        <td><button className="btn btn-ghost btn-sm bg-green-600">verify</button></td>
        <th><button className="btn btn-ghost btn-sm bg-red-500">Reject</button></th>

      </tr>)
   }
      
      
    </tbody>
  </table>
</div>
          
           </div>
            
      
    );
};

export default ManageProperty;