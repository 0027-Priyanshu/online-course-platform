import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Trophy, Clock, PlayCircle, Target, ArrowRight } from 'lucide-react';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyEnrollments = async () => {
            try {
                const { data } = await api.get('/enrollments/my-enrollments');
                setEnrollments(data.data);
            } catch (err) {
                console.error('Failed to fetch enrollments', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyEnrollments();
    }, []);

    // Calculate quick stats
    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(e => e.progress === 100).length;
    const averageProgress = totalCourses === 0 ? 0 :
        Math.round(enrollments.reduce((acc, curr) => acc + curr.progress, 0) / totalCourses);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Student Dashboard</h1>
                    <p className="text-gray-500 mt-2 text-lg">Welcome back, <span className="font-semibold text-gray-700">{user?.name}</span>. Ready to continue learning?</p>
                </div>
                <Link
                    to="/courses"
                    className="mt-4 md:mt-0 inline-flex items-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors"
                >
                    Explore More Courses
                    <ArrowRight className="ml-2 h-4 w-4 text-gray-400" />
                </Link>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
                        <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center">
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mr-4">
                        <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Completed Courses</p>
                        <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center">
                    <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                        <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Average Progress</p>
                        <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
                    </div>
                </div>
            </div>

            {/* Course Grid Area */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Learning Path</h2>

            {enrollments.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
                    <div className="h-24 w-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                        <BookOpen className="h-12 w-12 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your dashboard is empty</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">You haven't enrolled in any courses yet. Explore our catalog to find your next skill.</p>
                    <Link
                        to="/courses"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm"
                    >
                        Browse Catalog
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {enrollments.map((enrollment) => (
                        <div key={enrollment._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">

                            {/* Card Header/Image */}
                            <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center px-6 relative overflow-hidden">
                                <div className="absolute right-0 bottom-0 opacity-10">
                                    <PlayCircle className="h-32 w-32 -mr-8 -mb-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white relative z-10 leading-tight">
                                    {enrollment.course?.title}
                                </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Course Progress</span>
                                    <span className="text-sm font-bold text-indigo-600">{enrollment.progress}%</span>
                                </div>

                                {/* Animated Progress Bar */}
                                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6 overflow-hidden">
                                    <div
                                        className="bg-indigo-600 h-2.5 rounded-full relative transition-all duration-1000 ease-out"
                                        style={{ width: `${enrollment.progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20"></div>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mb-6">
                                    <Clock className="h-4 w-4 mr-1.5" />
                                    Last accessed today
                                </div>

                                {/* Action Button */}
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link
                                        to={`/courses/${enrollment.course?._id}`}
                                        className="w-full flex items-center justify-center bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white py-2.5 rounded-xl font-semibold transition-all duration-200"
                                    >
                                        <PlayCircle className="h-5 w-5 mr-2" />
                                        {enrollment.progress === 0 ? 'Start Course' : 'Resume Course'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;