import { Link } from 'react-router';
import LogoutButton from "./LogoutButton.jsx";

const AppLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <header className="bg-blue-600 p-4">
                <nav className="max-w-7xl mx-auto flex justify-between items-center text-white">
                    <div>
                        <Link to="/feed" className="mr-4">Feed</Link>

                        {
                            !localStorage.getItem('token') && (
                                <>
                                    <Link to="/login" className="mr-4">Login</Link>
                                    <Link to="/register" className="mr-4">Register</Link>
                                </>
                            )
                        }

                        {
                            localStorage.getItem('token') && (
                                <>
                                    <Link to="/profile" className="mr-4">Profile</Link>
                                    <Link to="/posts" className="mr-4">Posts</Link>

                                    <LogoutButton />
                                </>
                            )
                        }
                    </div>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="">{children}</main>

            {/* Footer */}
            <footer className="bg-blue-600 p-4 text-center text-white">
                <p>&copy; 2024 MyApp. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AppLayout;
