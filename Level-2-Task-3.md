# Level 2 - Task 3: Database Integration

## Task Description
This task was completed by integrating MongoDB Atlas with the Node.js Express backend using Mongoose.

The previous REST API used temporary in-memory data. In this task, the API was updated to store product data permanently in MongoDB Atlas.

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- React.js
- Axios

## Database Used
Database Name: codveda-fullstack-internship  
Collection Name: products

## Features Implemented
- Connected backend with MongoDB Atlas
- Created a Product model using Mongoose
- Added schema validation
- Stored product data in MongoDB
- Retrieved product data from MongoDB
- Updated product data in MongoDB
- Deleted product data from MongoDB
- Connected React frontend with MongoDB-based REST API

## Product Schema
The product model contains:
- name
- price
- category
- createdAt
- updatedAt

## API Endpoints

### 1. Get All Products
Method: GET  
URL:
http://localhost:5000/api/products

### 2. Get Single Product
Method: GET  
URL:
http://localhost:5000/api/products/:id

### 3. Create Product
Method: POST  
URL:
http://localhost:5000/api/products

Sample JSON Body:
{
  "name": "Mouse",
  "price": 3500,
  "category": "Computer Accessories"
}

### 4. Update Product
Method: PUT  
URL:
http://localhost:5000/api/products/:id

### 5. Delete Product
Method: DELETE  
URL:
http://localhost:5000/api/products/:id

## MongoDB Atlas Output
The product data was successfully saved in MongoDB Atlas under the products collection.

## Screenshots
Screenshots were taken for:
1. MongoDB Atlas connection success in terminal
2. Product added from React frontend
3. Product saved in MongoDB Atlas
4. Product update function
5. Product delete function

## GitHub Repository
Repository Link: https://github.com/KalanaRathnayaka/codveda-fullstack-internship