import {Link} from 'react-router';
import LogoutButton from "./LogoutButton.jsx";
import {createContext, useEffect, useState} from "react";

export const AppContext = createContext(null);

const AppLayout = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("token"));

    useEffect(() => {
        // Add an event listener to check for changes to sessionStorage
        const handleStorageChange = () => {
            setIsAuthenticated(!!sessionStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <header className="bg-blue-600 p-4">
                <nav className="max-w-7xl mx-auto flex justify-between items-center text-white">
                    <div>
                        <Link to="/feeds" className="mr-4">Feed</Link>

                        {
                            !isAuthenticated && (
                                <>
                                    <Link to="/login" className="mr-4">Login</Link>
                                    <Link to="/register" className="mr-4">Register</Link>
                                </>
                            )
                        }

                        {
                            isAuthenticated && (
                                <>
                                    <Link to="/profile" className="mr-4">Profile</Link>
                                    <Link to="/posts" className="mr-4">Posts</Link>

                                    <LogoutButton setIsAuthenticated={setIsAuthenticated} />
                                </>
                            )
                        }
                    </div>
                </nav>
            </header>

            {/* Main Content Area */}
            <AppContext.Provider value={
                {
                    isAuthenticated,
                    setIsAuthenticated
                }
            }>
                <main className="">{children}</main>
            </AppContext.Provider>

            {/* Footer */}
            <footer className="bg-blue-600 p-4 text-center text-white">
                <p>&copy; 2024 Ananthakumar. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AppLayout;
