import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../MainLayout/Main";
import Register from "../pages/Register";
import WelcomePage from "../Components/WelcomePage";
import Login from "../pages/Login";
import Home from "../pages/Home";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:"/",
            element: <WelcomePage></WelcomePage>
        },
        {
            path:"/home",
            element: <Home></Home>
        },
        {
            path:"signup",
            element: <Register></Register>
        },
        {
            path:"signin",
            element: <Login></Login>
        }
      ]
    },
  ]);