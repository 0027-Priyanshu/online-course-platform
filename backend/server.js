console.log("1");
require('dotenv').config();

console.log("2");
const express = require('express');

console.log("3");
const cors = require('cors');

console.log("4");
const helmet = require('helmet');

console.log("5");
const connectDB = require('./config/db');

console.log("6");
const errorHandler = require('./middleware/errorMiddleware');

console.log("7");
const authRoutes = require('./routes/authRoutes');

console.log("8");
const courseRoutes = require('./routes/courseRoutes');

console.log("9");
const enrollmentRoutes = require('./routes/enrollmentRoutes');

console.log("10");

connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});