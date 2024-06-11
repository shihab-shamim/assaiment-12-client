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
import PrivetRoute from "../privetRoutes/PrivetRoute";
import AgentProfile from "../dashBoard/agent/AgentProfile";
import AddProperty from "../dashBoard/agent/AddProperty";
import MyAdd from "../dashBoard/agent/MyAdd";
import MySold from "../dashBoard/agent/MySold";
import AgentPrivet from "../dashBoard/agent/AgentPrivet";

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
      element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
      children:[

        // agent routes 
        {
          path:'agent',
          element:<AgentPrivet><AgentProfile></AgentProfile></AgentPrivet>
        },
        {
          path:'addProperty',
          element:<AgentPrivet><AddProperty></AddProperty></AgentPrivet>
        },
        {
          path:'myAdded',
          element:<AgentPrivet><MyAdd></MyAdd></AgentPrivet>
        },
        {
          path:'mySoldProperty',
          element:<AgentPrivet><MySold></MySold></AgentPrivet>
        },


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