import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Advertise = () => {
    const axiosSecure=useAxiosSecure()
    const {data}=useQuery({
        queryKey:['advertise'],
        queryFn:async ()=>{
            const {data}=await axiosSecure.get('/advertise')
            return data

        },
        initialData:[]
    })
    const handleAdvertise = async da=>{
        console.log(da)
        const {agentEmail,agentImage,agentName,image,location,maxPrice,status,title,minPrice}=da
        const advertieInfo ={
            agentEmail,agentImage,agentName,image,location,maxPrice,status,title,minPrice
        }
         try{
            const {data}= await axiosSecure.post('/advertisement',advertieInfo)
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Advertise Success",
                    showConfirmButton: false,
                    timer: 1500
                  });

            }

         }
         catch{
            console.log(error)
         }
        
    }
    console.log(data)
    //  handle submit 
    const handleSubmit =async (review)=>{
      const reviewText = review
      const reviewId=property._id
      const reviwerImage =user.photoURL
      const agentName =property.agentName
      const reviewerEmail=user.email
      const propertyTitle=property.title
      const date =new Date().toLocaleDateString('en-CA')
      const reviwerInfo ={reviewText,reviewId,reviwerImage,agentName,reviewerEmail,date,propertyTitle}
      console.log(reviwerInfo)


      try{
          const {data}=await axiosSecure.post('/review',reviwerInfo)
          console.log(data)
          if(data.insertedId){
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Review Added",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/dashboard/manageReview')


          }

      }
      catch{
          console.log(error)
      }
  }
  
    return (
        <div>
            <h3 className="text-xl font-bold text-center bg-orange-400 p-4">Advertise Property</h3>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Agent Name</th>
        <th>Agent Email</th>
        <th>Location</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        data.map((da,i)=><tr key={da._id}>
        <th>{i+1}</th>
        <td>{da.agentName}</td>
        <td>{da.agentEmail}</td>
        <td>{da.location}</td>
        <td>{da.minPrice}-{da.maxPrice}$</td>
        <td><button onClick={()=>handleAdvertise(da)} className="btn btn-ghost btn-sm bg-green-400">Advertise</button></td>
      </tr>)
      }
     
    </tbody>
  </table>
</div>
            
        </div>
    );
};

export default Advertise;