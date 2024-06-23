import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const Request = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data}=useQuery({
        queryKey:['request'],
        queryFn: async () =>{
            const {data}=await axiosSecure.get(`/request/${user?.email}`)
            return data

        },
        initialData:[]
    })
    const handleAccept =async id =>{
        const updateInfo={status:'accept'}
        try{
            const {data}=await axiosSecure.patch(`/accept/${id}`,updateInfo)
            console.log(data)
            if(data.modifiedCount>0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Accepted ",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
          
        }
        catch{
            console.log(error)
        }
        
    }
    const handleReject = async id =>{
        const updateInfo={status:'reject'}
        try{
            const {data}=await axiosSecure.patch(`/accept/${id}`,updateInfo)
            console.log(data)
            if(data.modifiedCount>0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Rejected ",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            
        }
        catch{
            console.log(error)
        }

    }
   
    return (
        <div>
            <h2 className="text-center text-xl font-bold bg-orange-400 p-4 ">Property Bought Request </h2>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Property Title</th>
        <th>Property Location</th>
        <th>Offered Price</th>
        <th>Accept Button</th>
        <th>Rejected Button</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
       data.map((da,i)=><tr key={da._id}>
       <th>{i+1}</th>
       <td>{da.buyerName}</td>
       <td>{da.buyerEmail}</td>
       <td>{da.propertyTitle}</td>
       <td>{da.propertyLocation}</td>
       <td>{da.offered}$</td>
       <td><button onClick={()=>handleAccept(da._id)} className="btn btn-ghost btn-sm bg-green-500">Accept</button></td>
       <td><button onClick={()=>handleReject(da._id)} className="btn btn-ghost btn-sm bg-red-500">Rejected</button></td>
     </tr>)

      }
     
    </tbody>
  </table>
</div>
            
        </div>
    );
};

export default Request;