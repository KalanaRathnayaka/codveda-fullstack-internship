const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const Product = require("./models/Product");
const authRoutes = require("./routes/authRoutes");
const { protect, adminOnly } = require("./middleware/authMiddleware");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRole", (role) => {
    if (role === "admin") {
      socket.join("admin-room");
      console.log("Admin joined admin-room:", socket.id);
    } else {
      socket.join("user-room");
      console.log("Public user joined user-room:", socket.id);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Codveda REST API with MongoDB and Socket.io is running"
  });
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
});

// Get single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid product ID",
      error: error.message
    });
  }
});

// Create product
app.post("/api/products", protect, adminOnly, async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required"
      });
    }

    const newProduct = await Product.create({
      name,
      price,
      category
    });

    // Admin dashboard notification
    io.to("admin-room").emit("productNotification", {
      type: "created",
      message: `New product added: ${newProduct.name}`,
      product: newProduct
    });

    // Public/home user bell notification
    io.emit("newProductNotification", {
      type: "created",
      message: `New product added to store: ${newProduct.name}`,
      product: newProduct
    });

    // Refresh product list for everyone
    io.emit("productsChanged");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
});

// Update product
app.put("/api/products/:id", protect, adminOnly, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Admin only notification
    io.to("admin-room").emit("productNotification", {
      type: "updated",
      message: `Product updated: ${updatedProduct.name}`,
      product: updatedProduct
    });

    // Refresh product list for everyone
    io.emit("productsChanged");

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update product",
      error: error.message
    });
  }
});

// Delete product
app.delete("/api/products/:id", protect, adminOnly, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Admin only notification
    io.to("admin-room").emit("productNotification", {
      type: "deleted",
      message: `Product deleted: ${deletedProduct.name}`,
      product: deletedProduct
    });

    // Refresh product list for everyone
    io.emit("productsChanged");

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete product",
      error: error.message
    });
  }
});

// Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});