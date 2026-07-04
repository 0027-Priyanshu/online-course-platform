const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a course title'],
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: 0,
            default: 0,
        },
        thumbnail: {
            type: String,
            default: 'no-photo.jpg',
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Course', courseSchema);