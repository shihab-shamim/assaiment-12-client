import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";


const Admin = () => {
    const {user}=useAuth()
    const [userStatus,role] =useRole()
    // console.log(userStatus,role)
    const isAdmin = useAdmin()
    console.log('',isAdmin)
    const image =userStatus.email === user?.email
    console.log(user)
    return (
        <div>
            <h2 className="text-center text-xl font-bold bg-orange-600 p-6 "> Admin profile </h2>

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

export default Admin;