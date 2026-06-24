import { useState, useEffect } from "react";

function ProductForm({ onSubmit, selectedProduct, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        price: selectedProduct.price,
        category: selectedProduct.category
      });
    } else {
      setFormData({
        name: "",
        price: "",
        category: ""
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill all fields");
      return;
    }

    onSubmit({
      name: formData.name,
      price: Number(formData.price),
      category: formData.category
    });

    setFormData({
      name: "",
      price: "",
      category: ""
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{selectedProduct ? "Update Product" : "Add New Product"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Product price"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Product category"
        value={formData.category}
        onChange={handleChange}
      />

      <button type="submit">
        {selectedProduct ? "Update Product" : "Add Product"}
      </button>

      {selectedProduct && (
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;