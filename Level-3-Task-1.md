# Level 3 - Task 1: Build a Full-Stack Application

## Task Description
This task was completed by developing a full-stack product management system using React, Node.js, Express, MongoDB Atlas, and JWT authentication.

The application allows users to view products, while admin users can add, edit, and delete products.

## Technologies Used
- React.js
- Vite
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Axios
- CSS

## Features Implemented
- Full-stack frontend and backend integration
- MongoDB Atlas database connection
- Product CRUD operations
- User registration
- Admin login
- JWT token authentication
- Password hashing using bcryptjs
- Protected backend routes
- Admin role-based access control
- Professional dashboard UI
- Separate admin login page
- Local storage login session handling

## User Roles
### Admin
- Can login
- Can add products
- Can edit products
- Can delete products
- Can view all products

### Normal User / Guest
- Can view products only
- Cannot add, edit, or delete products

## Backend API Routes

### Authentication Routes
POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/profile  

### Product Routes
GET /api/products  
GET /api/products/:id  
POST /api/products  
PUT /api/products/:id  
DELETE /api/products/:id  

## Security Features
- Passwords are hashed before saving to MongoDB
- JWT token is generated during login
- Protected routes require Authorization header
- Admin-only middleware restricts product create, update, and delete actions

## Database
Database Name: codveda-fullstack-internship  
Collections:
- users
- products


## GitHub Repository
Repository Link: https://github.com/KalanaRathnayaka/codveda-fullstack-internship