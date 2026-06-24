import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (productData) => {
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
      alert("Operation failed");
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      alert("Delete failed");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

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

          <div className="nav-badge">Level 2 Task 3</div>
        </nav>

        <div className="hero-content">
          <div>
            <span className="tag">React + Express + MongoDB</span>
            <h1>Product Management System</h1>
            <p>
              A professional full-stack product management system connected with
              MongoDB Atlas for create, read, update and delete operations.
            </p>
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
            <h3>Database</h3>
            <p>MongoDB Atlas</p>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel form-panel">
            <ProductForm
              onSubmit={handleSubmit}
              selectedProduct={selectedProduct}
              onCancel={handleCancel}
            />
          </div>

          <div className="panel products-panel">
            <div className="section-title">
              <div>
                <h2>Product List</h2>
                <p>Manage all available products here</p>
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