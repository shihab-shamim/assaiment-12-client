import useAgent from "../../hooks/useAgent";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";


const AgentProfile = () => {
    const {user}=useAuth()
    const [isAgent,isLoading]=useAgent()
    const [userStatus, role]=useRole()
    console.log(userStatus)
    const image =userStatus.email === user?.email
    return (
        <div>
            <h2>This is Agent Profile</h2>
            <div className="flex justify-center">
            <div className="card w-[400] bg-base-100 shadow-xl">
  <div className="px-10 pt-10  flex justify-center items-center w-48">
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

export default AgentProfile;