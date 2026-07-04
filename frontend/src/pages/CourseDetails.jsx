import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrollLoading, setEnrollLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${id}`);
                setCourse(data.data);
            } catch (err) {
                setError('Course not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setEnrollLoading(true);
        try {
            await api.post('/enrollments', { courseId: course._id });
            alert('Successfully enrolled!');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to enroll. You might already be enrolled.');
        } finally {
            setEnrollLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading course details...</div>;
    if (error || !course) return <div className="text-center py-20 text-red-600">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-64 bg-indigo-600 flex items-center justify-center p-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">{course.title}</h1>
                </div>
                <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">About this course</h2>
                            <p className="text-gray-500">Instructor: {course.instructor?.name || 'Platform Expert'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Price</p>
                            <p className="text-4xl font-extrabold text-indigo-600">${course.price}</p>
                        </div>
                    </div>

                    <div className="prose max-w-none mb-10 text-gray-700 leading-relaxed">
                        <p>{course.description}</p>
                    </div>

                    <button
                        onClick={handleEnroll}
                        disabled={enrollLoading}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-colors disabled:opacity-50"
                    >
                        {enrollLoading ? 'Processing...' : 'Enroll Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;