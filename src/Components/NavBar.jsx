import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const { user, logOut, loading } = useAuth();
    return (
        < nav className=" bg-white shadow-md sticky top-0 z-50 w-full" >
            <div className="flex justify-between items-center p-6 max-w-[1440px] mx-auto w-11/12">
                <Link to="/">
                    <h1 className="text-4xl font-extrabold text-blue-600">TaskZen</h1>
                </Link>
                <div className="space-x-4">
                    {user && (
                        <Link to="signup">
                            <button onClick={logOut} class="btn btn-error">Logout</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav >
    );
};

export default NavBar;