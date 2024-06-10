import { NavLink,Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-violet-950 text-white text-xl">
                <ul className="menu p-6  ">
                    <NavLink><li className="mb-2 text-xl">Admin Profile</li></NavLink>
                    <NavLink><li className="mb-2 text-xl">Manage Properties</li></NavLink>
                    <NavLink to='/dashboard/manageUser'><li className="mb-2 text-xl">Manage Users</li></NavLink>
                    <NavLink><li className="mb-2 text-xl ">Manage reviews</li></NavLink>
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