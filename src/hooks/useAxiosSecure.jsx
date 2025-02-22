import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://task-zen-server-delta.vercel.app'
})
const useAxiosSecure = () => {

    return axiosSecure;
};

export default useAxiosSecure;