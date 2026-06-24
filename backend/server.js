const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary data storage
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 250000,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Mobile Phone",
    price: 120000,
    category: "Electronics"
  }
];

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Codveda Level 1 Task 2 REST API is running"
  });
});

// Get all products
app.get("/api/products", (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// Get single product
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// Create product
app.post("/api/products", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "Name, price, and category are required"
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct
  });
});

// Update product
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  const { name, price, category } = req.body;

  product.name = name || product.name;
  product.price = price || product.price;
  product.category = category || product.category;

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product
  });
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  products = products.filter((item) => item.id !== id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});