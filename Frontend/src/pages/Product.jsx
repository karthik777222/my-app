import React from "react";
import { useParams, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { id } = useParams();
  const { products, addToCart } = useShop();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2 className="page">Product not found</h2>;
  }

  return (
    <>

      <section className="product-details">

        <img
          src={product.image}
          alt={product.name}
        />

        <div>
          <h1>{product.name}</h1>

          <h2>₹{product.price}</h2>

          <p>
            Category: {product.category}
          </p>

          <p>
            This is a high-quality product
            available at Forever.
          </p>

          <button
            onClick={() => addToCart(product.id)}
          >
            ADD TO CART
          </button>

          <Link to="/cart">
            <button>
              VIEW CART
            </button>
          </Link>
        </div>

      </section>

      <RelatedProducts
        currentId={product.id}
      />

    </>
  );
}

export default Product;