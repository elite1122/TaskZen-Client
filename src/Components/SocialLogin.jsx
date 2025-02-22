import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;

            if (user?.photoURL) {
                // Upload image to imgbb
                const formData = new FormData();
                formData.append("image", user.photoURL);
                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                    formData
                );

                if (imgRes.data.success) {
                    const userInfo = {
                        email: user.email,
                        name: user.displayName,
                        photo: imgRes.data.data.url,
                    };

                    await axiosSecure.post("/users", userInfo);

                    // ✅ SweetAlert for successful login
                    Swal.fire({
                        title: `Welcome, ${user.displayName}! 🎉`,
                        text: "You have successfully signed in with Google.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                        position: "top-end",
                        timerProgressBar: true,
                    });

                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Google sign-in error:", error);
            Swal.fire({
                title: "Oops!",
                text: "Google sign-in failed. Please try again.",
                icon: "error",
                confirmButtonText: "Okay",
            });
        }
    };

    return (
        <div>
            <div className="divider"></div>
            <div className="flex justify-center">
                <button onClick={handleGoogleSignIn} className="btn">
                    <FcGoogle className="mr-2" />
                    Sign In With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
