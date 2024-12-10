import {NavLink} from 'react-router';
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
                        {/* Navigation Links */}
                        <NavLink
                            to="/feeds"
                            className={({isActive}) =>
                                isActive ? "mr-4 text-yellow-300 font-bold" : "mr-4"
                            }
                        >
                            Feed
                        </NavLink>

                        {!isAuthenticated && (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({isActive}) =>
                                        isActive ? "mr-4 text-yellow-300 font-bold" : "mr-4"
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({isActive}) =>
                                        isActive ? "mr-4 text-yellow-300 font-bold" : "mr-4"
                                    }
                                >
                                    Register
                                </NavLink>
                            </>
                        )}

                        {isAuthenticated && (
                            <>
                                <NavLink
                                    to="/profile"
                                    className={({isActive}) =>
                                        isActive ? "mr-4 text-yellow-300 font-bold" : "mr-4"
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/posts"
                                    className={({isActive}) =>
                                        isActive ? "mr-4 text-yellow-300 font-bold" : "mr-4"
                                    }
                                >
                                    Posts
                                </NavLink>
                                <LogoutButton setIsAuthenticated={setIsAuthenticated}/>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* Main Content Area */}
            <AppContext.Provider value={
                {
                    isAuthenticated,
                    setIsAuthenticated,
                    backendUrl: 'http://127.0.0.1:8000'
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
