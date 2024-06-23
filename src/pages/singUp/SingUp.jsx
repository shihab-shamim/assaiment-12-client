import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth'
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic=useAxiosPublic()
  const navigate=useNavigate()
  const {createUser,createGoogle,updateUser}=useAuth()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async data =>{
    const photoUrl=data.photo[0]
    const name=data.name
    const email=data.email
    const password =data.password
    // const confirmPassword =data.confirmPassword
    // console.log(name,email,password,)
    const imageFile ={image:photoUrl}
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_API}`,imageFile,{
      headers:{
        'content-type':'multipart/form-data'
      }
    })
    // console.log(res.data.data.display_url)
    if(res.data.data.display_url){
      const photo =res.data.data.display_url
      createUser(email,password)
    .then(res=>{
      console.log(res.user)
      updateUser(name,photo)
      .then(()=>{
        const userInfo={
          name:data.name,
          email:data.email,
          role:'user'
        }
        axiosPublic.post('/users',userInfo)
        .then(res=>{
          if(res.data.insertedId){
            console.log('user added to the database')
            // reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "logged in ",
                showConfirmButton: false,
                timer: 1500
              });
              
          }
          navigate('/')
        })

      
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: "Sign Up Success",
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        // navigate('/')

      })
    

    })
    .catch(error=>{
      console.log(error.message.split('Firebase: Error (auth/')[1].split(')')[0])
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message.split('Firebase: Error (auth/')[1].split(')')[0]}`,
        showConfirmButton: false,
        timer: 1500
      });
    })
    
      
    }

    
  
  };
  const handleGoogle =async () =>{
    createGoogle()
    .then(result => {
      const userInfo ={

        email:result.user?.email,
        name:result.user?.displayName,
        role:'user'
    }
    
    
    
  
    axiosPublic.post('/users',userInfo)
    .then(res => {
        console.log(res)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "logged in ",
          showConfirmButton: false,
          timer: 1500
        });

         navigate('/')
    })
    .then(error=>{
      console.log(error)
    })

    })
    
    // navigate('/')
  }
  return (
    <div>
      <section
        className="bg-gray-50 dark:bg-gray-900"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/KsQg0by/istockphoto-1152640672-612x612.jpg')",
        }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                   
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your photoUrl
                  </label>
                  <input
                    type="file"
                    name="photo"
                    {...register('photo',{required:true})}

                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    
                  />
                   {errors.photo && <p className="text-sm text-red-600">photoURL is Required</p>}
                </div>
                <div>
                  <label
                   
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                  {...register('name',{required:true})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="your name"
                    
                  />
                  {errors.name && <p className="text-sm text-red-600">Name is Required</p>}
                </div>
                <div>
                  <label
                   
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                  {...register('email',{required:true})}

                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="your email"
                    
                  />
                  {errors.email && <p className="text-sm text-red-600">Email is Required</p>}

                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...register("password",{required:true})} 

                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                  />
                   {errors.password?.type ==='required' && <span className="text-red-600">password is required</span>}
                {errors.password?.type ==='minLength' && <span className="text-red-600">password must be 6 character</span>}
                {errors.password?.type ==='maxLength' && <span className="text-red-600">password must be less then 20  character</span>}
                {errors.password?.type ==='pattern' && <span className="text-red-600">password must one uppercase one lowercase , one number and one special character</span>}
                </div>
               
               
                <button
                  type="submit"
                  className="w-full btn btn-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to='/login'
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link >
                </p>
              </form>
              <button onClick={handleGoogle} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
			<p>Login with Google</p>
		</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
