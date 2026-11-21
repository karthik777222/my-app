import React from "react";
import ProductItem from "./ProductItem";
import { useShop } from "../context/ShopContext";

function LatestCollection() {
  const { products } = useShop();

  return (
    <section className="section">
      <h2>Latest Collection</h2>

      <div className="product-grid">
        {products.slice(0, 4).map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default LatestCollection;