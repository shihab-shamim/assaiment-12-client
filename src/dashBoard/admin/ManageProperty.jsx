import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageProperty = () => {
    const axiosSecure =useAxiosSecure()
    const {data:manageProperty,refetch}=useQuery({
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
    const handleVerify= async (property) =>{
        const verifyItem = {
            title:property.title,
            location:property.location,
            minPrice:property.minPrice,
            maxPrice:property.maxPrice,
            agentEmail:property.agentEmail,
            agentName:property.agentName,
            status:'verify',
            image:property.image
        }
        // console.log(verifyItem)
        const verifyStatus = {status:'verify'}
        // console.log(verifyStatus)
        const id =property._id
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "verify this property",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, verify it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                try{
                    const res =await axiosSecure.patch(`/property/${id}`,verifyStatus)
                    console.log(res.data)
                    if(res.data.modifiedCount>0){
                        const res=await axiosSecure.post('/verifyProperty',verifyItem)
                        console.log(res.data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Verify Property",
                            showConfirmButton: false,
                            timer: 1500
                          });
        
                    }
                    else{
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Already verify",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }

        
        
                }
                catch{
                    console.log(error)
                }
            
            }
          });
       

    }
    const handleReject = async (id)=>{
        const verifyStatus = {status:'rejected'}
        // console.log(verifyStatus)
        try{
            const res =await axiosSecure.patch(`/property/${id}`,verifyStatus)
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Rejected Property",
                    showConfirmButton: false,
                    timer: 1500
                  });

            }
            else{
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Already Rejected",
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
        <td><button onClick={()=>handleVerify(property)} className="btn btn-ghost btn-sm bg-green-600">verify</button></td>
        <th><button onClick={()=>handleReject(property._id)} className="btn btn-ghost btn-sm bg-red-500">Reject</button></th>

      </tr>)
   }
      
      
    </tbody>
  </table>
</div>
          
           </div>
            
      
    );
};

export default ManageProperty;