import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddCard = ({property,user,refetch}) => {
    const axiosSecure =useAxiosSecure()
    
    const handleDelete = async (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then(async(result) => {
            if (result.isConfirmed) {
                try{
                    const res = await axiosSecure.delete(`/property/${id}`)
                    console.log(res.data)
                    refetch()
                      Swal.fire({
                title: "Deleted!",
                text: "Deleted Your Added Property",
                icon: "success"
              });
                   }
                   catch{
                    console.log(error)
                   }
            
            }
          });

       
    }
    
    return (
        <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
	<div className="flex space-x-4">
		<img alt="" src={user.photoURL} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
		<div className="flex flex-col space-y-1">
			<a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{property.agentName}</a>
		</div>
	</div>
	<div>
		<img src={property.image} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
		<h2 className="mb-1 text-xl font-semibold">{property.title}</h2>
		{/* <p className="text-sm dark:text-gray-600">Eu qualisque aliquando mel, id lorem detraxit nec, ad elit minimum pri. Illum ipsum detracto ne cum. Mundi nemore te ius, vim ad illud atqui apeirian...</p> */}
	</div>
	<div className="flex flex-wrap justify-between">
		<div className="space-x-2">
			<p>Location : {property.location}</p>
			<p className="text-xl font-bold">Price : <span className="text-green-500">{property.minPrice} - {property.maxPrice}</span> $</p>
		</div>
		<div className="flex space-x-2 text-sm dark:text-gray-600">
			<p className="text-xl text-orange-400 font-bold">Status : {property.status}</p>
			
		</div>
        
	</div>
    <div className="flex justify-between">
             <Link to={`/dashboard/myAdded/${property._id}`}> <button className="btn btn-secondary">update</button></Link>
            <button onClick={() => handleDelete(property._id)} className="btn btn-secondary bg-red-600">Delete</button>
        </div>
</div>
    );
};

export default AddCard;