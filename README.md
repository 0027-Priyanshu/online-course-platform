# 🎓 Online Course Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application that enables users to browse, create, manage, and enroll in online courses. The project demonstrates full-stack development using REST APIs, JWT authentication, MongoDB, and a modern React frontend.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Password Hashing using bcrypt
- Protected Routes

### Course Management
- View all courses
- View course details
- Create new courses
- Update existing courses
- Delete courses

### Enrollment
- Enroll in courses
- View enrolled courses
- Prevent duplicate enrollments

### Security
- JWT Authentication
- Helmet Middleware
- CORS Configuration
- Environment Variables using dotenv
- Centralized Error Handling

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS
- dotenv

---

## 📁 Folder Structure

```
online-course-platform
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   └── services
│   ├── vite.config.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/0027-Priyanshu/online-course-platform.git
```

### Backend

```bash
cd backend
npm install
```

Create a `.env.example` file:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run the backend:

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Courses

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/:id` | Get course details |
| POST | `/api/courses` | Create course |
| PUT | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |

### Enrollments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/enrollments` | Enroll in a course |
| GET | `/api/enrollments` | View enrolled courses |

---

## 🎯 Future Improvements

- Instructor Dashboard
- Admin Dashboard Enhancements
- Course Search & Filtering
- Ratings & Reviews
- Payment Gateway Integration
- Course Progress Tracking
- Certificate Generation
- Cloud Image Uploads

---

## 👨‍💻 Author

**Priyanshu Lunecha**

GitHub: https://github.com/0027-Priyanshu

---

## ⭐ If you found this project useful, consider giving it a star!
