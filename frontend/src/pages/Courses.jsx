import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Search, Clock, BookOpen } from 'lucide-react';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');
                setCourses(data.data);
            } catch (err) {
                setError('Failed to load courses.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Real-time search filtering logic
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) return <div className="text-center py-20 text-red-600 font-semibold">{error}</div>;

    return (
        <div className="pb-12">

            {/* Hero Section */}
            <div className="bg-indigo-900 rounded-3xl p-8 md:p-16 mb-12 relative overflow-hidden shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-4">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] opacity-10"></div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>

                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Master in-demand skills.
                    </h1>
                    <p className="text-indigo-200 text-lg md:text-xl mb-8">
                        Explore our catalog of premium courses built by industry experts to help you advance your career.
                    </p>

                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for 'React', 'Python', or 'Design'..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-0 ring-4 ring-indigo-500/30 focus:ring-indigo-400 bg-white text-gray-900 placeholder-gray-400 shadow-lg outline-none transition-all duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {searchTerm ? `Search Results (${filteredCourses.length})` : 'All Courses'}
                    </h2>
                </div>

                {/* Empty State for Search */}
                {filteredCourses.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-500">We couldn't find any courses matching "{searchTerm}". Try adjusting your search.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-6 text-indigo-600 font-bold hover:text-indigo-700"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <div
                                key={course._id}
                                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Image Placeholder with dynamic initials */}
                                <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-100 flex items-center justify-center relative overflow-hidden group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors duration-500">
                  <span className="text-indigo-200 group-hover:text-indigo-300 text-6xl font-black tracking-tighter transition-colors duration-500">
                    {course.title.substring(0, 2).toUpperCase()}
                  </span>

                                    {/* Floating Price Badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-indigo-700 shadow-sm border border-gray-100">
                                        ${course.price}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                                        {course.title}
                                    </h3>

                                    <p className="text-gray-500 mb-6 line-clamp-2 text-sm leading-relaxed flex-grow">
                                        {course.description}
                                    </p>

                                    {/* Action Area */}
                                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                                        <div className="flex items-center text-sm text-gray-500 font-medium">
                                            <Clock className="w-4 h-4 mr-1.5 text-indigo-400" />
                                            Self-paced
                                        </div>

                                        <Link
                                            to={`/courses/${course._id}`}
                                            className="inline-flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;