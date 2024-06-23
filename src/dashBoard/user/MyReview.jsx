import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const MyReview = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data,refetch}=useQuery({
        queryKey:['review'],
        queryFn:async ()=>{
            const {data}=await axiosSecure.get(`/myReview/${user?.email}`)
            return data

        },
        initialData:[]
    })
    // console.log(data)
    const handleDelete = async (id)=>{
    try{
        const {data} = await axiosSecure.delete(`/reviewDelete/${id}`)
        console.log(data)
        if(data.deletedCount){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Deleted success",
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
        }


    }
    catch{
        console.log(error)
    }
    }
    return (
        <div>
            <h2 className="text-center bg-orange-400 p-4 text-xl font-semibold">This is Review </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    data.map(da=><div key={da._id} className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                          <h2 className="card-title">Agent:{da.agentName}</h2>
                          <p>Title{da.propertyTitle}</p>
                          <div>
                            <p>Review Date:{da.date}</p>
                            <h2>Review description {da.reviewText}</h2>
                          </div>
                          <div className="card-actions justify-end">
                            <button onClick={()=>handleDelete(da._id)} className="btn btn-primary">Delete</button>
                          </div>
                        </div>
                      </div>)
                }
            </div>
            
        </div>
    );
};

export default MyReview;