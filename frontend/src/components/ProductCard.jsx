function ProductCard({ product, onEdit, onDelete, isAdmin }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: Rs. {product.price}</p>
      <p>Category: {product.category}</p>

      {isAdmin && (
        <div className="card-buttons">
          <button onClick={() => onEdit(product)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(product._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;