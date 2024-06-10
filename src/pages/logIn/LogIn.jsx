import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Button } from "flowbite-react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const LogIn = () => {
  const axiosPublic=useAxiosPublic()
  const [loading,setLoading]=useState(false)
  const {createGoogle,signInUser}=useAuth()
  const navigate=useNavigate()
  const handleGoogle =async () =>{
    createGoogle()
    .then(result => {
      const userInfo ={

        email:result.user?.email,
        name:result.user?.displayName
    }
  
    axiosPublic.post('/users',userInfo)
    .then(res => {
        console.log(res.data)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "logged in ",
          showConfirmButton: false,
          timer: 1500
        });

         navigate('/')
    })

    })
  }
  const { register, handleSubmit,formState: { errors } } = useForm();
  const onSubmit = data => {
    setLoading(true)
    const email = data.email
    const password =data.password
    signInUser(email,password)
    .then(res=>{
      console.log(res)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Log in success",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/')
      setLoading(false)
    })
    .catch(error =>{
      console.log(error)
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter your correct email and password",
        showConfirmButton: false,
        timer: 1500
      });
    })
  };
    return (
        <div className="hero min-h-screen bg-cover " style={{backgroundImage: "url('https://i.ibb.co/9n29k4Q/istockphoto-1472884661-612x612.jpg')"}}>
            
  <div className="hero-content flex-col lg:flex-row-reverse">

    <div className="text-center lg:text-left">
    
     
      <img src="https://i.ibb.co/RQgQKbN/istockphoto-1620193749-612x612.jpg" alt="" className="rounded-full" />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register('email')} type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register('password')} type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
        {loading ? <RotatingLines
  visible={true}
  height="50"
  width="50"
  color="grey"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> : <button className="btn btn-primary">Login</button>}

        </div>
      </form>
      <div className="flex items-center pt-4 space-x-1 mb-6">
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
		<p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
	</div>
	<div className="flex justify-center space-x-4">
	<button onClick={handleGoogle} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
			<p>Login with Google</p>
		</button>
		
		
	</div>
	<p className="text-xs text-center sm:px-6 dark:text-gray-600" >Don &apos; t have an account?
		<Link to='/signUp' rel="noopener noreferrer" href="#" className="underline dark:text-gray-800">Sign up</Link>
	</p>
    </div>
  </div>
  
</div>
    );
};

export default LogIn;