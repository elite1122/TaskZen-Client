import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (user) {
        return children;
    }
    return <Navigate to="/welcome" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;