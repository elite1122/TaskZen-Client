
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../Components/SocialLogin";

const Register = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, user, setUser, loading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;

            await updateUserProfile(data.name, data.photoURL);

            const userInfo = {
                name: data.name,
                email: data.email,
                photo: data.photoURL,
            };

            const response = await axiosSecure.post('/users', userInfo);
            if (response.data.insertedId) {
                // Force the user state update
                setUser({
                    ...loggedUser,
                    displayName: data.name,
                    photoURL: data.photoURL,
                });

                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section>
            <div className="flex justify-center items-center min-h-screen">
                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    <div className="card w-full max-w-xl shadow-2xl p-10 rounded-lg bg-gray-100">
                        <div className="max-w-3xl mx-auto text-center space-y-2">
                            <h1 className="text-2xl md:text-4xl font-bold ">
                                Sign Up
                            </h1>
                            <p className="text-base">Join us! Create your account today</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Enter Your Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Enter Your Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                    placeholder="Enter Your Password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase, one lowercase, one number, and one special character.</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-xs absolute right-2 top-12 bg-white text-black"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="text-center font-semibold">
                            Already Have an Account?{" "}
                            <span className="text-blue-600">
                                <Link to="/signin">Login</Link>
                            </span>
                        </p>
                        <SocialLogin />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Register;
