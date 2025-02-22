import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../MainLayout/Main";
import Register from "../pages/Register";
import WelcomePage from "../Components/WelcomePage";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AddTask from "../pages/AddTask";
import PrivateRoute from "./PrivateRoute";
import ManageTask from "../pages/ManageTask";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/welcome",
                element: <WelcomePage></WelcomePage>
            },
            {
                path: "/",
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: "/addTask",
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: "/manageTask",
                element: <PrivateRoute><ManageTask></ManageTask></PrivateRoute>
            },
            {
                path: "/signup",
                element: <Register></Register>
            },
            {
                path: "/signin",
                element: <Login></Login>
            }


        ]

    },
]);