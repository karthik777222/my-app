import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import ProductItem from "./ProductItem";

function SearchBar() {
  const [search, setSearch] = useState("");
  const { products } = useShop();

  const results = products
  ? products.filter((product) => {
      const query = search.toLowerCase().trim();
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    })
  : [];

  return (
    <div className="search-page">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="product-grid">
        {search &&
          (results.length > 0 ? (
            results.map((product) => (
              <ProductItem key={product._id || product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
