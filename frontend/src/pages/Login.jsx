import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router';
import api from '../axios';
import toast from "react-hot-toast";
import {AppContext} from "../components/AppLayout.jsx";

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/profile');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            sessionStorage.setItem('token', response.data.token); // Store token in sessionStorage

            setIsAuthenticated(true);
            navigate('/profile'); // Redirect to the dashboard or feed page
        } catch (err) {
            if (err.response && [422, 401].includes(err.response.status)) {
                const errordata = err.response.data

                if(errordata?.status === false) {
                    toast.error('Please check email & password');
                    return
                }

                const validationErrors = errordata.errors;
                // Display all validation error messages in toast
                for (const field in validationErrors) {
                    validationErrors[field].forEach((message) => {
                        toast.error(message); // Display each error message in a toast
                    });
                }
            } else {
                // Handle other errors
                toast.error(err.message || 'Something went wrong');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline hover:text-blue-700"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
