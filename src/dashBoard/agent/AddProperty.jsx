import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddProperty = () => {
  const { user } = useAuth();
  
  const handleAdd = async (e) => {
    e.preventDefault();
    const from = e.target;
    const title = from.title.value;
    const location = from.location.value;
    const photo = from.photo.files[0];
    const minPrice = from.minPrice.value;
    const maxPrice = from.maxPrice.value;
    const agentName = from.agentName.value;
    const agentEmail = from.agentEmail.value;
    const status = "pending";
    const itemInfo = {
      title,
      location,
      minPrice,
      maxPrice,
      agentEmail,
      agentName,
      status,
    };
    const imageFile ={image:photo}
    // console.log("image", imageFile);
    try{
        const {data} =await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_API}`,imageFile,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        console.log(data.data.display_url)
        if(data.data.display_url){
            console.log(itemInfo)

        }

    }
    catch(error){
        console.log(error)
    }
  };

  return (
    <div>
      <h2 className="text-center bg-orange-400 p-4 text-xl font-semibold">
        This is Add Property
      </h2>
      <div>
      <form onSubmit={handleAdd}>
        <label className="form-control w-full my-6">
          <div className="label ">
            <span className="label-text">Property Title</span>
          </div>
          <input
            name="title"
            type="text"
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
              className="input input-bordered w-full"
              placeholder="location"
              required
            />
          </div>

          <div className="w-1/2">
            <div className="form-control w-full my-6">
              <div className="label ">
                <span className="label-text">image*</span>
              </div>
              <input
                type="file"
                name="photo"
                
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
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
            />

            <input
              name="maxPrice"
              type="text"
              className="input input-bordered w-full"
              placeholder="Max price"
              required
            />
          </div>
          <div className="flex-col lg:flex gap-6 mt-6">
            <label htmlFor="">Agent Name</label>
            <input
              name="agentName"
              type="text"
              defaultValue={user.displayName}
              disabled
              className="input input-bordered w-full"
              required
            />
            <label htmlFor="">Agent Email</label>

            <input
              name="agentEmail"
              defaultValue={user.email}
              disabled
              type="text"
              className="input input-bordered w-full"
              required
            />
          </div>
        </label>

        <button className="btn mt-6 w-full bg-gradient-to-r from-[#5f1066] to-[#1f1672] text-white">
          Add Item{" "}
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddProperty;
