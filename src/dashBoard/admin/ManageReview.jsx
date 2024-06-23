import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageReview = () => {
    const axiosSecure = useAxiosSecure()
    const {data:reviews,refetch}=useQuery({
        queryKey:['manageUser'],
        queryFn:async () =>{
            const {data}=await axiosSecure.get('/manageReview')
            return data 
        },
        initialData:[]
    })
    // console.log(review)
    const handleDelete = async id => {
        try{
            const {data}=await axiosSecure.delete(`/manageReview/${id}`)
            console.log(data)
            if(data.deletedCount>0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Deleted",
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
            <h2 className="text-xl font-bold text-center bg-orange-400 p-4">Manage Review  </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    reviews.map(review => <div key={review._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                          <img src={review.reviwerImage} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">Reviewer Name: {review.reviewerName}</h2>
                          <p>Review Title  :-{review.propertyTitle}</p>
                          <div className="card-actions">
                            <p>Review Text : {review.reviewText}</p>
                          </div>
                          <button onClick={()=>handleDelete(review._id)} className="btn btn-accent">Delete</button>
                        </div>
                      </div>)
                }
            </div>
            
        </div>
    );
};

export default ManageReview;