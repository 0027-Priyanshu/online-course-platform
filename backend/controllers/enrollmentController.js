const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const AppError = require('../utils/AppError');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private
exports.enrollCourse = async (req, res, next) => {
    try {
        const { courseId } = req.body;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError('Course not found', 404));
        }

        // Create enrollment (Mongoose compound index prevents duplicates)
        const enrollment = await Enrollment.create({
            user: req.user.id,
            course: courseId,
        });

        res.status(201).json({
            success: true,
            data: enrollment,
        });
    } catch (error) {
        // If it's a duplicate key error from our compound index
        if (error.code === 11000) {
            return next(new AppError('You are already enrolled in this course', 400));
        }
        next(error);
    }
};

// @desc    Get logged in user's enrollments
// @route   GET /api/enrollments/my-enrollments
// @access  Private
exports.getMyEnrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all enrollments (Admin view)
// @route   GET /api/enrollments
// @access  Private/Admin
exports.getAllEnrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('user', 'name email')
            .populate('course', 'title price');

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments,
        });
    } catch (error) {
        next(error);
    }
};