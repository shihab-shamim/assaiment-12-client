import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/home/Home";
import LogIn from "../pages/logIn/LogIn";
import SingUp from "../pages/singUp/SingUp";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'login',
          element:<LogIn></LogIn>
        },
        {
          path:'signUp',
          element:<SingUp></SingUp>
        }
      ]
    },
  ]);

  export default router