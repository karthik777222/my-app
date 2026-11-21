import React from "react";
import ProductItem from "./ProductItem";
import { useShop } from "../context/ShopContext";

function RelatedProducts({ currentId }) {
  const { products } = useShop();

  const related = products
  .filter((product) => product.id !== Number(currentId))
  .slice(0, 4);

  return (
    <section className="section">

      <h2>Related Products</h2>

      <div className="product-grid">
        {related.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

export default RelatedProducts;