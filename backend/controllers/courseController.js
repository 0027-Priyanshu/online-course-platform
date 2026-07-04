const Course = require('../models/Course');
const AppError = require('../utils/AppError');

// @desc    Get all courses (with basic filtering)
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
    try {
        let query;
        const reqQuery = { ...req.query };

        // Fields to exclude from standard matching
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach((param) => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

        query = Course.find(JSON.parse(queryStr)).populate('instructor', 'name email');

        // Search functionality
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query = query.find({
                $or: [{ title: searchRegex }, { description: searchRegex }],
            });
        }

        const courses = await query;

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name email');

        if (!course) {
            return next(new AppError(`No course found with the id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = async (req, res, next) => {
    try {
        // Automatically assign the logged-in admin as the instructor
        req.body.instructor = req.user.id;

        const course = await Course.create(req.body);

        res.status(201).json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return next(new AppError(`No course found with the id of ${req.params.id}`, 404));
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return next(new AppError(`No course found with the id of ${req.params.id}`, 404));
        }

        await course.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};