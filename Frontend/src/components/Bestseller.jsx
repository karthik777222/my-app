import React from "react";
import ProductItem from "./ProductItem";
import { useShop } from "../context/ShopContext";

function BestSeller() {
  const { products } = useShop();

  return (
    <section className="section">
      <h2>Best Sellers</h2>

      <div className="product-grid">
        {products.slice(2, 6).map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default BestSeller;