# Level 1 - Task 2: Build a Simple REST API

## Task Description
This task was completed by developing a simple REST API using Node.js and Express.js.  
The API performs basic CRUD operations for a product resource.

## Technologies Used
- Node.js
- Express.js
- CORS
- dotenv
- Postman / Thunder Client

## API Features
- Get all products
- Get a single product by ID
- Create a new product
- Update an existing product
- Delete a product
- Handle errors with proper HTTP responses

## API Endpoints

### 1. Home Route
Method: GET  
URL:
http://localhost:5000/

Purpose: Check whether the API server is running.

### 2. Get All Products
Method: GET  
URL:
http://localhost:5000/api/products

Purpose: Retrieve all products.

### 3. Get Single Product
Method: GET  
URL:
http://localhost:5000/api/products/1

Purpose: Retrieve one product by ID.

### 4. Create Product
Method: POST  
URL:
http://localhost:5000/api/products

Sample JSON Body:
{
  "name": "Keyboard",
  "price": 8500,
  "category": "Computer Accessories"
}

Purpose: Add a new product.

### 5. Update Product
Method: PUT  
URL:
http://localhost:5000/api/products/3

Sample JSON Body:
{
  "name": "Gaming Keyboard",
  "price": 12000,
  "category": "Computer Accessories"
}

Purpose: Update an existing product.

### 6. Delete Product
Method: DELETE  
URL:
http://localhost:5000/api/products/3

Purpose: Delete a product by ID.

## Error Handling
The API returns a proper error response when a product is not found.

Example:
GET http://localhost:5000/api/products/100

Response:
{
  "success": false,
  "message": "Product not found"
}


## GitHub Repository
Repository Link: https://github.com/KalanaRathnayaka/codveda-fullstack-internship