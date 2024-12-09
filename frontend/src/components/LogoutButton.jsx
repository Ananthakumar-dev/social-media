import { useNavigate } from 'react-router';
import api from "../axios.js";
import toast from "react-hot-toast";

const LogoutButton = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const {data} = await api.post('/logout');

            if(data.status) {
                // Remove the token from sessionStorage
                sessionStorage.removeItem("token");
                setIsAuthenticated(false); // Update state

                // Redirect to login page
                navigate('/login');
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
