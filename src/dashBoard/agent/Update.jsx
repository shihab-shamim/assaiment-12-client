import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";


const Update = () => {
 
    const {user}=useAuth()
    const axiosSecure =useAxiosSecure()
    const params= useParams()
    // console.log(params.id)
    
    const {data:property}=useQuery({
        queryKey:[`property`,params.id,'prop'],
        queryFn : async () =>{
           try{
            const res =await axiosSecure.get(`/prop/${params.id}`)
            return res.data
           }
           catch{
            console.log(error)
           }
        }
    })
 
    
    const handleUpdated = async (e) =>{
        e.preventDefault()
        const from = e.target;
        const title = from.title.value;
    const location = from.location.value;
    const photo = from.photo.files;
    const minPrice = from.minPrice.value;
    const maxPrice = from.maxPrice.value;
    const agentName = from.agentName.value;
    const agentEmail = from.agentEmail.value;
    let image =property?.image
    
    
  
    if(photo?.length > 0){
    // const photo = from.photo.files[0];
    const apiImage ={image:from.photo.files[0]}
    // console.log(apiImage)
    // image = from.photo.files[0];
    // console.log(image)
    const {data} =await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_API}`,apiImage,{
      headers:{
        "content-type": "multipart/form-data"
      }
    })
    if(data.data.display_url){
      image=data.data.display_url
    }


        
    }
    const updateInfo ={
      title,
      location,
      image,
      minPrice,
      maxPrice,
      agentName,
      agentEmail,
      
  }
    
  try{
    console.log(updateInfo)
    const {data}= await axiosSecure.put(`/property/${params.id}`,updateInfo)
    if(data.modifiedCount>0){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Property Updated",
        showConfirmButton: false,
        timer: 1500
      });
      
    }

  }
  catch{
       console.log(error)
  }


   
 


    
        
        // console.log('clicked',photo)
    }

    
    
    return (
        <div> <h2 className="text-center text-xl font-bold bg-orange-400 p-4">updated property </h2>


<div>
      <form onSubmit={handleUpdated} >
        <label className="form-control w-full my-6">
          <div className="label ">
            <span className="label-text">Property Title</span>
          </div>
          <input
            name="title"
            type="text"
            defaultValue={property?.title}
            placeholder="Property Title"
            className="input input-bordered w-full"
            required
          />
        </label>
        <div className="flex gap-6">
          <div className="form-control w-1/2 my-6">
            <div className="label ">
              <span className="label-text">Location*</span>
            </div>
            <input
              name="location"
              type="text"
            defaultValue={property?.location}

              className="input input-bordered w-full"
              placeholder="location"
              required
            />
          </div>

          <div className="w-1/2">
            <div className="form-control w-full my-6">
              <div className="label ">
                <span className="label-text">image*{property?.image}</span>
              </div>
              <input
                type="file"
                name="photo"
                //  defaultValue={property?.image}
                
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                
              />
            </div>
          </div>
        </div>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Price Range</span>
          </div>
          <div className="flex gap-6">
            <input
              name="minPrice"
              type="text"
              className="input input-bordered w-full"
              placeholder="Min Price"
              required
              defaultValue={property?.minPrice}

            />

            <input
              name="maxPrice"
              type="text"
              className="input input-bordered w-full"
              placeholder="Max price"
              required
              defaultValue={property?.maxPrice}

            />
          </div>
          <div className="flex-col lg:flex gap-6 mt-6">
            <label htmlFor="">Agent Name</label>
            <input
              name="agentName"
              type="text"
              defaultValue={property?.agentName}
              disabled
              className="input input-bordered w-full"
              required
            />
            <label htmlFor="">Agent Email</label>

            <input
              name="agentEmail"
              defaultValue={property?.agentEmail}

              disabled
              type="text"
              className="input input-bordered w-full"
              required
            />
          </div>
        </label>

        <button className="btn mt-6 w-full bg-gradient-to-r from-[#5f1066] to-[#1f1672] text-white">
          updated Item
        </button>
      </form>
      </div>
            
        </div>
    );
};

export default Update;