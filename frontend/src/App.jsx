import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import LoginPage from "./components/LoginPage";
import { io } from "socket.io-client";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  const [notifications, setNotifications] = useState([]);
  const [publicNotifications, setPublicNotifications] = useState([]);
  const [showBellDropdown, setShowBellDropdown] = useState(false);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const savedUser = localStorage.getItem("codvedaUser");
    const savedPublicNotifications = localStorage.getItem(
      "codvedaPublicNotifications"
    );

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedPublicNotifications) {
      setPublicNotifications(JSON.parse(savedPublicNotifications));
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "codvedaPublicNotifications",
      JSON.stringify(publicNotifications)
    );
  }, [publicNotifications]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");

      if (user?.role === "admin") {
        socket.emit("joinRole", "admin");
      } else {
        socket.emit("joinRole", "user");
      }
    });

    // Admin dashboard notifications
    socket.on("productNotification", (data) => {
      if (user?.role === "admin") {
        setNotifications((prev) => [data, ...prev.slice(0, 4)]);
      }
    });

    // Public/home bell notifications - only new product add
    socket.on("newProductNotification", (data) => {
      const newNotification = {
        ...data,
        id: `${Date.now()}-${Math.random()}`,
        time: new Date().toLocaleTimeString()
      };

      setPublicNotifications((prev) => [newNotification, ...prev]);
    });

    socket.on("productsChanged", () => {
      fetchProducts();
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await getProducts();
      setProducts(result.data);
    } catch (error) {
      alert("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (productData) => {
    if (!isAdmin) {
      alert("Only admin users can add or update products");
      return;
    }

    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, productData);
        alert("Product updated successfully");
      } else {
        await createProduct(productData);
        alert("Product created successfully");
      }

      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert("Only admin users can delete products");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("codvedaUser");
    setUser(null);
    setSelectedProduct(null);
    setNotifications([]);
    alert("Logged out successfully");
  };

  const clearOnePublicNotification = (notificationId) => {
    setPublicNotifications((prev) =>
      prev.filter((item) => item.id !== notificationId)
    );
  };

  const clearAllPublicNotifications = () => {
    setPublicNotifications([]);
    setShowBellDropdown(false);
  };

  const clearOneAdminNotification = (indexToRemove) => {
    setNotifications((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearAllAdminNotifications = () => {
    setNotifications([]);
  };

  if (page === "login") {
    return <LoginPage setUser={setUser} onBack={() => setPage("home")} />;
  }

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <div className="brand">
            <span className="brand-icon">C</span>
            <div>
              <h2>Codveda</h2>
              <p>Full-Stack Internship</p>
            </div>
          </div>

          <div className="nav-actions">
            <div className="nav-badge">Level 3 Task 2</div>

            {!isAdmin && (
              <div className="bell-wrapper">
                <button
                  className="bell-btn"
                  onClick={() => setShowBellDropdown(!showBellDropdown)}
                  title="Notifications"
                >
                  🔔
                  {publicNotifications.length > 0 && (
                    <span className="bell-count">
                      {publicNotifications.length}
                    </span>
                  )}
                </button>

                {showBellDropdown && (
                  <div className="bell-dropdown">
                    <div className="bell-header">
                      <div>
                        <h3>Notifications</h3>
                        <p>New store updates</p>
                      </div>

                      {publicNotifications.length > 0 && (
                        <button
                          className="clear-all-btn"
                          onClick={clearAllPublicNotifications}
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {publicNotifications.length === 0 ? (
                      <div className="empty-notification">
                        No new notifications
                      </div>
                    ) : (
                      <div className="bell-list">
                        {publicNotifications.map((item) => (
                          <div className="bell-item" key={item.id}>
                            <div>
                              <strong>{item.message}</strong>
                              <small>{item.time}</small>
                            </div>

                            <button
                              className="clear-one-btn"
                              onClick={() =>
                                clearOnePublicNotification(item.id)
                              }
                              title="Clear notification"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {user ? (
              <button className="logout-nav-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className="login-nav-btn"
                onClick={() => setPage("login")}
              >
                Admin Login
              </button>
            )}
          </div>
        </nav>

        <div className="hero-content">
          <div>
            <span className="tag">React + Express + MongoDB + JWT</span>
            <h1>Product Management System</h1>
            <p>
              A full-stack product management system with MongoDB database, JWT
              authentication, admin role-based access control, and real-time
              product notifications.
            </p>

            {user && (
              <div className="logged-user-box">
                Welcome, <strong>{user.name}</strong> | Role:{" "}
                <strong>{user.role}</strong>
              </div>
            )}
          </div>

          <div className="hero-card">
            <h3>Total Products</h3>
            <h1>{products.length}</h1>
            <p>Live data from MongoDB Atlas</p>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <section className="stats-row">
          <div className="stat-card">
            <h3>Frontend</h3>
            <p>React Components</p>
          </div>

          <div className="stat-card">
            <h3>Backend</h3>
            <p>Express REST API</p>
          </div>

          <div className="stat-card">
            <h3>Real-Time</h3>
            <p>Socket.io Notifications</p>
          </div>
        </section>

        {isAdmin && notifications.length > 0 && (
          <section className="notification-panel">
            <div className="notification-title">
              <div>
                <h2>Admin Live Notifications</h2>
                <p>Real-time product updates using Socket.io</p>
              </div>

              <button
                className="admin-clear-all-btn"
                onClick={clearAllAdminNotifications}
              >
                Clear All
              </button>
            </div>

            <div className="notification-list">
              {notifications.map((item, index) => (
                <div className={`notification-item ${item.type}`} key={index}>
                  <strong>{item.message}</strong>
                  <button
                    className="notification-clear-btn"
                    onClick={() => clearOneAdminNotification(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="content-grid">
          {isAdmin && (
            <div className="panel form-panel">
              <ProductForm
                onSubmit={handleSubmit}
                selectedProduct={selectedProduct}
                onCancel={handleCancel}
              />
            </div>
          )}

          <div className={`panel products-panel ${!isAdmin ? "full-panel" : ""}`}>
            <div className="section-title">
              <div>
                <h2>Product List</h2>
                <p>
                  {isAdmin
                    ? "Manage all available products here"
                    : "Login as admin to manage products"}
                </p>
              </div>
              <span>{products.length} items</span>
            </div>

            {loading ? (
              <div className="loading-box">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="empty-box">No products available</div>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;