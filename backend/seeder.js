require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');

connectDB();

const seedData = async () => {
    try {
        // 1. Wipe existing data
        await Enrollment.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        console.log('Database cleared. Injecting expanded course catalog...');

        // 2. Create Admin and Student
        const adminUser = await User.create({
            name: 'Platform Expert',
            email: 'admin@test.com',
            password: 'password123',
            role: 'admin',
        });

        await User.create({
            name: 'Student Test',
            email: 'student@test.com',
            password: 'password123',
            role: 'user',
        });

        // 3. Inject 21 Diverse Courses
        await Course.insertMany([
            // --- Web Development ---
            { title: 'React Front To Back', description: 'Master React.js, Context API, and Hooks by building real-world applications from scratch.', price: 49.99, instructor: adminUser._id },
            { title: 'Node.js API Masterclass', description: 'Learn how to build robust, secure, and scalable RESTful APIs using Node, Express, and MongoDB.', price: 59.99, instructor: adminUser._id },
            { title: 'Mastering Next.js 14', description: 'Build full-stack SEO-optimized applications using the App Router, Server Actions, and Tailwind.', price: 69.99, instructor: adminUser._id },
            { title: 'Vue.js 3 Fundamentals', description: 'Step-by-step guide to building reactive single-page applications with Vue 3 and the Composition API.', price: 45.00, instructor: adminUser._id },
            { title: 'Advanced CSS & Sass', description: 'Create stunning, responsive layouts with Flexbox, CSS Grid, and sophisticated animations.', price: 29.99, instructor: adminUser._id },
            { title: 'SvelteKit Web Framework', description: 'Learn the modern way to build extremely fast web applications with zero virtual DOM overhead.', price: 39.99, instructor: adminUser._id },

            // --- Data Science & AI ---
            { title: 'Python for Data Science', description: 'From zero to hero in Python. Learn Pandas, NumPy, and Matplotlib to analyze complex datasets.', price: 39.99, instructor: adminUser._id },
            { title: 'Machine Learning A-Z', description: 'Create powerful Machine Learning algorithms in Python and R. Understand the math behind the code.', price: 99.99, instructor: adminUser._id },
            { title: 'Deep Learning & Neural Networks', description: 'Master PyTorch and TensorFlow to build advanced neural networks and computer vision models.', price: 149.99, instructor: adminUser._id },
            { title: 'Advanced SQL Mastery', description: 'Write complex queries, optimize database performance, and master window functions in PostgreSQL.', price: 54.99, instructor: adminUser._id },
            { title: 'Prompt Engineering for Developers', description: 'Learn how to integrate LLMs (GPT-4, Claude) into your applications and write optimal prompts.', price: 75.00, instructor: adminUser._id },

            // --- Cloud & DevOps ---
            { title: 'AWS Certified Solutions Architect', description: 'Pass the AWS exam and learn how to deploy highly scalable serverless architectures in the cloud.', price: 120.00, instructor: adminUser._id },
            { title: 'DevOps & Docker Bootcamp', description: 'Learn how to containerize applications, build CI/CD pipelines, and deploy using GitHub Actions.', price: 79.99, instructor: adminUser._id },
            { title: 'Kubernetes for Beginners', description: 'Master container orchestration. Learn pods, deployments, services, and cluster management.', price: 89.99, instructor: adminUser._id },
            { title: 'Cyber Security 101', description: 'Learn ethical hacking, network security, and how to defend modern web applications from attacks.', price: 95.00, instructor: adminUser._id },

            // --- Mobile Apps ---
            { title: 'Flutter App Development', description: 'Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.', price: 85.00, instructor: adminUser._id },
            { title: 'iOS Development with Swift', description: 'Master SwiftUI and iOS architecture to build and publish your first app to the Apple App Store.', price: 110.00, instructor: adminUser._id },
            { title: 'React Native Crash Course', description: 'Use your existing React knowledge to build cross-platform mobile applications for iOS and Android.', price: 65.00, instructor: adminUser._id },

            // --- Design & Product ---
            { title: 'UI/UX Design Bootcamp', description: 'Learn Figma, design theory, and user psychology to build beautiful, high-converting interfaces.', price: 89.99, instructor: adminUser._id },
            { title: 'Agile Product Management', description: 'Master Scrum, user stories, and sprint planning to successfully lead software development teams.', price: 49.99, instructor: adminUser._id },
            { title: 'Digital Marketing & SEO', description: 'Grow your traffic. Learn advanced SEO techniques, Google Ads, and content marketing strategies.', price: 59.99, instructor: adminUser._id }
        ]);

        console.log('✅ 21 Premium Courses Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error seeding data: ${error.message}`);
        process.exit(1);
    }
};

seedData();