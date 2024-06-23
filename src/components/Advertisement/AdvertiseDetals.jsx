import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const AdvertiseDetals = () => {
    const navigate =useNavigate()
    const [review,setReview] = useState('')
    const {user}=useAuth()
    const axiosSecure = useAxiosSecure()
    const params = useParams()
    const {data:property}=useQuery({
        queryKey:['advertis'],
        queryFn:async () => {
            const {data}= await axiosSecure.get(`/adertis/${params.id}`)
             return data
        },
        enabled:!!user,
        initialData:{}
    })
    // handle wish 
    const handleWishlist =async (property) =>{
        const userEmail=user?.email
        
        const {title,location,minPrice,maxPrice,agentEmail,agentImage,agentName,image,status}=property
        
        const wishInfo={title,location,minPrice,maxPrice,agentEmail,agentImage,agentName,image,status,userEmail}
        console.log(wishInfo)

        try{
            const {data} =await axiosSecure.post('/wishlist',wishInfo)
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added wishList",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/wishlist')

            }

        }
        catch{
            console.log(error)

        }
        
    }
    //  handle submit 
    const handleSubmit =async (review)=>{
        const reviewText = review
        const reviewId=property._id
        const reviwerImage =user.photoURL
        const agentName =property.agentName
        const reviewerEmail=user.email
        const reviewerName = user.displayName
        const propertyTitle=property.title
        const date =new Date().toLocaleDateString('en-CA')
        const reviwerInfo ={reviewText,reviewId,reviwerImage,agentName,reviewerEmail,date,propertyTitle,reviewerName}
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
    const {data:reviews}=useQuery({
        queryKey:['review'],
        queryFn:async ()=>{
            const {data}=await axiosSecure.get(`/review/${params.id}`)
            return data
        },
        initialData:[]
    })


    
    return (
        <div className='min-h-[59vh]'>
            <h2 className='text-xl text-bold text-center bg-orange-500 p-4 '> Details </h2>
            <div className="flex justify-center ">
            <div  className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                    <div className="flex space-x-4">
                      <img
                        alt=""
                        src={property?.agentImage}
                        className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                      />
                      <div className="flex flex-col space-y-1">
                        <a
                          rel="noopener noreferrer"
                          href="#"
                          className="text-sm font-semibold"
                        >
                          {property?.agentName}
                        </a>
                      </div>
                    </div>
                    <div>
                      <img
                        src={property?.image}
                        alt=""
                        className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                      />
                      <h2 className="mb-1 text-xl font-semibold">{property?.title}</h2>
                      {/* <p className="text-sm dark:text-gray-600">Eu qualisque aliquando mel, id lorem detraxit nec, ad elit minimum pri. Illum ipsum detracto ne cum. Mundi nemore te ius, vim ad illud atqui apeirian...</p> */}
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <div className="space-x-2">
                        <p>Location : {property?.location}</p>
                        <p className="text-xl font-bold">
                          Price :{" "}
                          <span className="text-green-500">
                            {property?.minPrice} - {property?.maxPrice}
                          </span>{" "}
                          $
                        </p>
                      </div>
                      <div className="flex space-x-2 text-sm dark:text-gray-600">
                        <p className="text-xl text-orange-400 font-bold">
                          Status : {property?.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                     <button onClick={()=>handleWishlist(property)} className="btn btn-primary">Add WishList</button>
                     
                     <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Review</button>
                     <dialog id="my_modal_3" className="modal">
  <div className="modal-box ">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div >
    <textarea onChange={(e)=>setReview(e.target.value)} placeholder="Your Review" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
        <br />
    <input onClick={()=>handleSubmit(review)} className="btn btn-primary btn-sm" type="submit"></input>

    </div>
  </div>
</dialog>
                    </div>
                  </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
          {
                reviews.map(review=><div key={review._id} className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">Agent Name :{review.agentName}</h2>
                      <img src={review.reviwerImage} className="w-14 h-14 rounded-full" alt="" />
                      <p> Review title: {review.reviewText}</p>
                      <div className="card-actions justify-end">
                        {/* <button className="btn btn-primary">Buy Now</button> */}
                      </div>
                    </div>
                  </div>)
            }
          </div>
            
        </div>
    );
};

export default AdvertiseDetals;