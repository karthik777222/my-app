import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function ProductItem({ product }) {
  const { addToCart } = useShop();

  return (
    <div className="product-card">
      {/* ✅ Use _id for product route */}
      <Link to={`/product/${product._id}`}>
        <img
          // ✅ Handle image arrays (fallback to string if needed)
          src={Array.isArray(product.image) ? product.image[0] : product.image}
          alt={product.name}
        />
      </Link>

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      {/* ✅ Use _id for cart */}
      <button onClick={() => addToCart(product._id)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;
