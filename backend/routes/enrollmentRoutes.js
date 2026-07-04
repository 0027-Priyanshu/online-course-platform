const express = require('express');
const {
    enrollCourse,
    getMyEnrollments,
    getAllEnrollments,
} = require('../controllers/enrollmentController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route strictly for the logged-in user
router.get('/my-enrollments', protect, getMyEnrollments);

router.route('/')
    .post(protect, enrollCourse)
    .get(protect, admin, getAllEnrollments);

module.exports = router;