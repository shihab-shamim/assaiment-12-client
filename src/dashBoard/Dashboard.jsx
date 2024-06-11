import { NavLink,Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";


const Dashboard = () => {
    const [userStatus,role] =useRole()
    // console.log(userStatus,role)
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-violet-950 text-white text-xl">
                <ul className="menu p-6  ">
                  {
                    role === 'admin' &&  <>
                    
                    <NavLink to='/dashboard/admin'><li className="mb-2 text-xl">Admin Profile</li></NavLink>
                    <NavLink to='/dashboard/manageProperty'><li className="mb-2 text-xl">Manage Properties</li></NavLink>
                    <NavLink to='/dashboard/manageUser'><li className="mb-2 text-xl">Manage Users</li></NavLink>
                    <NavLink to='/dashboard/manageReview'><li className="mb-2 text-xl ">Manage reviews</li></NavLink></>

                  }
                  {
                    (role === 'agent' || role === 'fraud') &&<> 
                    <NavLink to='/dashboard/agent'><li className="mb-2 text-xl">Agent Profile</li></NavLink>
                    <NavLink to='/dashboard/addProperty'><li className="mb-2 text-xl">Add Property</li></NavLink>
                    <NavLink to='/dashboard/myAdded'><li className="mb-2 text-xl">My added properties</li></NavLink>
                    <NavLink to='/dashboard/mySoldProperty'><li className="mb-2 text-xl ">My sold properties</li></NavLink></>
                    
                  }
                  {
                    role === 'user' &&   <>
                    
                    <NavLink to='/dashboard'><li className="mb-2 text-xl">User Profile</li></NavLink>
                    <NavLink to='/dashboard'><li className="mb-2 text-xl">Wishlist</li></NavLink>
                    <NavLink to='/dashboard'><li className="mb-2 text-xl">Property bought</li></NavLink>
                    <NavLink to='/dashboard/manageReview'><li className="mb-2 text-xl ">My reviews</li></NavLink></>
                  }
                  <div className="divider">
                    <ul>
                        
                        <NavLink to='/' className='btn'><li>Home</li></NavLink>
                    </ul>

                  </div>
                </ul>

                {/* dash board content */}
              
            </div>
            <div className="flex-1 p-8">
            <Outlet></Outlet>
        </div>
            
        </div>
    );
};

export default Dashboard;