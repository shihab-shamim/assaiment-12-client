import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
const Navber = () => {
  const {user,logOut}=useAuth()

    const navlink = <>
    <div className=' gap-4 lg:flex lg:gap-8 font-semibold'><NavLink to='/'><li>Home</li></NavLink>
    <NavLink to='/allProperty'><li>All properties</li></NavLink>
    {user && <NavLink to='/dashboard'><li>Dashboard</li></NavLink>}
    {!user &&  <NavLink to='/login'><li>Login</li></NavLink>
    }
    
    </div>
    </>
    const handleLogOut = () =>{
      logOut()
          .then(res=>{
            console.log(res)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Log Out ",
              showConfirmButton: false,
              timer: 1000
            });
          })
          .catch(error =>{
            console.log(error)
          })
    }
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
              {navlink}
             
            </ul>
          </div>
          <img src={logo} className='w-[50px] cursor-pointer'></img>
          <a className="btn btn-ghost text-xl">DwellingDeal</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {navlink}
          </ul>
        </div>
        {
          user && <div className="navbar-end z-50">
          <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              {user?.displayName}
              
            </a>
          </li>
          <li><button onClick={handleLogOut} className='btn'>Logout</button></li>
        </ul>
      </div>
          </div>
        }
      </div>
    );
};

export default Navber;