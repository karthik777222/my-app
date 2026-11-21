import React, { useState } from "react";
import ProductItem from "../components/ProductItem";
import { useShop } from "../context/ShopContext";

function Collection() {
  const { products } = useShop();
  const [category, setCategory] = useState("All");

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (product) => product.category === category
        );

  return (
    <section className="page">

      <h1>Our Collection</h1>

      <div className="filters">

        <button onClick={() => setCategory("All")}>
          All
        </button>

        <button onClick={() => setCategory("Men")}>
          Men
        </button>

        <button onClick={() => setCategory("Women")}>
          Women
        </button>

        <button onClick={() => setCategory("Accessories")}>
          Accessories
        </button>

      </div>

      <div className="product-grid">

        {filteredProducts.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default Collection;