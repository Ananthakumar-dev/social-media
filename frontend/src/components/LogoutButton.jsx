import { useNavigate } from 'react-router';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');
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
