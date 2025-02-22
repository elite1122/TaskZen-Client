import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoMdAddCircle, IoMdExit } from "react-icons/io";

const NavBar = () => {
    const { user, logOut, loading } = useAuth();
    const navOptions = <>
        <div className="flex flex-col lg:flex-row gap-3">
            {user && (
                <>
                    <Link to="/addTask">
                        <button className="btn btn-outline text-base"><IoMdAddCircle />Add Task</button>
                    </Link>
                    <Link to="/manageTask">
                        <button className="btn btn-outline text-base">Manage Task</button>
                    </Link>
                    <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar group">
                        <div className="w-10 rounded-full">
                            <img referrerPolicy="no-referrer" alt="User Avatar" src={user.photoURL} />
                        </div>
                        {/* Hover Display */}
                        <span className="absolute hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-sm px-4 py-1 rounded-md -bottom-10 left-1/2 transform -translate-x-1/2 w-max">
                            {user.displayName}
                        </span>
                    </div>
                    <Link to="/signup">
                        <button onClick={logOut} className="btn btn-error text-white text-base"><IoMdExit /> Logout</button>
                    </Link>
                </>
            )}
        </div>
    </>
    return (
        < nav className=" bg-white shadow-md sticky top-0 z-50 w-full" >
            <div className="flex justify-between items-center p-6 max-w-[1440px] mx-auto w-11/12">
                <Link to="/">
                    <h1 className="text-4xl font-extrabold text-blue-600">TaskZen</h1>
                </Link>
                {/* Navigation Links */}
                <div className="hidden lg:flex space-x-4 font-semibold lg:items-center">
                    {navOptions}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden dropdown dropdown-end">
                    <button tabIndex="0" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default NavBar;