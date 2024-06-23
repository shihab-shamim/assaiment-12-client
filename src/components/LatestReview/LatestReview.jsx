import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const LatestReview = () => {
    const axiosPublic = useAxiosPublic()
    const {data:reviews}=useQuery({
        queryKey:['latestReview'],
        queryFn: async () =>{
            const {data} = await axiosPublic.get('/latestReview')
            return data 
        },
        initialData:[]
    })
     console.log(reviews)
    


    return (
        <div>
            <h2 className="text-xl text-center font-bold text-orange-400"> Latest User review</h2>

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
                        </div>
                      </div>)
                }
            </div>

            
        </div>
    );
};

export default LatestReview;