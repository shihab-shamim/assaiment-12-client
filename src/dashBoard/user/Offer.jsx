import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const Offer = () => {
    const navigate=useNavigate()
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const params=useParams()
    console.log(params.id)
    const {data} =useQuery({
        queryKey:['wishlist'],
        queryFn:async () =>{
            const {data}=await axiosSecure.get(`/offer/${params?.id}`)
            return data 
        },
        initialData:{}
    })
    
 const handleOffer= async (e)=>{
    e.preventDefault()
    const min = parseInt(data.minPrice)
    const max = parseInt(data.maxPrice)
    const amount =parseInt(e.target.amount.value)
    console.log(min,max,amount)
    const date =new Date().toLocaleDateString('en-CA')
    if(amount<min){
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "please biggest amount",
            showConfirmButton: false,
            timer: 1500
          });
          return
    }
    if(amount>max){
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "please lower amount",
            showConfirmButton: false,
            timer: 1500
          });
          return
          

    }

    const offerInfo = {
      propertyLocation:data.location,
      propertyTitle:data.title,
      propertyImage:data.image,
      status:'pending',
      agentName:data.agentName,
      agentEmail:data.agentEmail,
      buyingDate:date,
      buyerEmail:user?.email,
      buyerName:user?.displayName,
      offered:amount,

    }
    try{
        const {data}=await axiosSecure.post('/bought',offerInfo)
        console.log(data)
        if(data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Added Bought",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/dashboard/bought')


        }

    }
    catch{
        console.log(error)
    }
  
  
    }
    
      

    



 
    return (
        <div className="min-h-[59vh]">
            <h2 className="text-xl text-center font-bold bg-orange-400 p-4">Offer Property</h2>
           <form onSubmit={handleOffer}>
           <div className="flex sm:flex-col md:flex-row gap-8 mt-8">
            <input type="text" defaultValue={data.title} disabled placeholder="Type here" className="input input-bordered w-full " />
            <input type="text" defaultValue={data.location} disabled  placeholder="Type here" className="input input-bordered w-full " />

            </div>
            <div className="flex sm:flex-col md:flex-row gap-8 mt-8">
            <input type="text" defaultValue={data.agentName} disabled placeholder="Type here" className="input input-bordered w-full " />
            <input type="text" name="amount"  placeholder="offer amount" className="input input-bordered w-full " required />

            </div>
            <div className="flex sm:flex-col md:flex-row gap-8 mt-8">
            <input type="text" defaultValue={user?.email} disabled placeholder="Type here" className="input input-bordered w-full " />
            <input type="text" defaultValue={user?.displayName} disabled  placeholder="Type here" className="input input-bordered w-full " />

            </div>
            <button className="btn btn-primary w-full mt-8">Offer</button>
           </form>
            
        </div>
    );
};

export default Offer;