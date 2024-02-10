import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import ProfilePage from "../Layout/ProfilePage";
import User from "../pages/Profile/User/User";
import Register from "../pages/Profile/Register/Register";
import Dashboard from "../pages/Profile/Dashboard/Dashboard";
import AllAplication from "../pages/Profile/AllAplication/AllAplication";
import MarketPlace from "../pages/MarketPlace/MarketPlace";
import DetailApplication from "../pages/Profile/AllAplication/DetailApplication";
import { url } from "../Url";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/Profile/NotFound/NotFound";
import ResubmitApplication from "../pages/Profile/AllAplication/ResubmitApplication";
import TransferOwner from "../pages/MarketPlace/TransferOwner";
import SignUp from "../pages/SignUp/SignUp";
// import { url } from "../Url";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        children:[
            {
                path:'login',
                element:<Login></Login>
            },
            {
                path:'signup',
                element:<SignUp></SignUp>
            },
         
        ]
    },
     {
                path:'/profile',
                element:<ProfilePage></ProfilePage>,
                children:[
                    {
                        path:'user',
                        element:<PrivateRoute><User></User></PrivateRoute>
                    },
                    {
                        path:'register',
                        element:<PrivateRoute> <Register></Register></PrivateRoute>
                    },
                    {
                        path:'dashboard',
                        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
                    },
                    {
                        path:'allaplication',
                        element:<PrivateRoute><AllAplication></AllAplication></PrivateRoute>
                    },
                    {
                        path:'application/:AssetID',
                        element:<PrivateRoute><DetailApplication></DetailApplication></PrivateRoute>,
                        loader:({params})=>fetch(`${url}/api/v1/user/application/${params.AssetID}`,{
                            headers:{
                                'content-type': 'application/json',
                                Authorization: `${localStorage.getItem('token')}`,
                                "ngrok-skip-browser-warning": "69420",
                            }
                        })

                    },
                    {
                        path:'resubmit/:AssetID',
                        element:<PrivateRoute><ResubmitApplication></ResubmitApplication></PrivateRoute>,
                        loader:({params})=>fetch(`${url}/api/v1/user/application/${params.AssetID}`,{
                            headers:{
                                'content-type': 'application/json',
                                Authorization: `${localStorage.getItem('token')}`,
                                "ngrok-skip-browser-warning": "69420",
                            }
                        })

                    },
                    {
                        path:'registered-land',
                        element:<PrivateRoute><MarketPlace></MarketPlace></PrivateRoute>
                    },
                    {
                        path:'transfer-ownership/:AssetID',
                        element:<PrivateRoute><TransferOwner></TransferOwner></PrivateRoute>
                    },
                    {
                        path:'notfound',
                        element:<PrivateRoute><NotFound></NotFound></PrivateRoute>
                    },
               
                ]
            }

])