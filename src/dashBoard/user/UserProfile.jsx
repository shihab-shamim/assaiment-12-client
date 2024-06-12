import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";


const UserProfile = () => {
    const {user}=useAuth()
    const [userStatus,role] =useRole()
    console.log(userStatus,'role',role)
    const image = userStatus.email === user.email
    

    return (
        <div>
            <h3 className="text-center text-xl font-bold bg-orange-400 p-4">User profile </h3>
            <div className="flex justify-center">
            <div className="card w-[400] bg-base-100 shadow-xl">
  <div className="px-10 pt-10 rounded-full flex justify-center w-48">
    <img  src={image?user.photoURL:''} alt="Shoes" className="rounded-full" />
  </div>
  <div className="card-body items-center text-center">
    
    <p className="text-xl font-bold">Email: <span className="text-green-600">{userStatus.email}</span></p>
    <div className="card-actions">
      {/* <button className="btn btn-primary">Buy Now</button> */}
      <h1 className="text-xl">Role : <span className="font-bold text-red-500">{userStatus.role}</span></h1>
    </div>
  </div>
</div>
            </div>
            
        </div>
    );
};

export default UserProfile;