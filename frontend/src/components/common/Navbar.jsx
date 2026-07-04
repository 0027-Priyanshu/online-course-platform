import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            CoursePlatform
                        </Link>
                    </div>

                    {/* Navigation Links Section */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/courses"
                            className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
                        >
                            Browse Courses
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
                                >
                                    Dashboard
                                </Link>

                                <span className="text-gray-500 text-sm border-l pl-4 ml-2 border-gray-300">
                                    Hello, {user.name}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;