import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Master Your Craft
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
                Join our platform to access premium courses, track your progress, and elevate your skills.
            </p>
            <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
                Start Learning Today
            </Link>
        </div>
    );
};

export default Home;