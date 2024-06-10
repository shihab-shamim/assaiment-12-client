import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/home/Home";
import LogIn from "../pages/logIn/LogIn";
import SingUp from "../pages/singUp/SingUp";
import Dashboard from "../dashBoard/Dashboard";
import ManageUser from "../dashBoard/admin/ManageUser";
import ManageProperty from "../dashBoard/admin/ManageProperty";
import ManageReview from "../dashBoard/admin/ManageReview";
import Admin from "../dashBoard/admin/Admin";
import AdminPrivet from "../dashBoard/admin/AdminPrivet";

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
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      children:[

        // agent routes 
        

        // admin routes 
        {path:'admin',
        element:<AdminPrivet><Admin></Admin></AdminPrivet>
        },
        {
          path:'manageUser',
          element:<AdminPrivet><ManageUser></ManageUser></AdminPrivet>
        },
        {
          path:'manageProperty',
          element:<AdminPrivet><ManageProperty></ManageProperty></AdminPrivet>
        },
        {
          path:'manageReview',
          element:<AdminPrivet><ManageReview></ManageReview></AdminPrivet>
        }
      ]
    }
  ]);

  export default router