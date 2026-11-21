import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function Cart() {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    cartTotal
  } = useShop();

  const cartProducts = products.filter(
    (product) => cart[product._id]
  );

  return (
    <section className="page">

      <h1>Shopping Cart</h1>

      {cartProducts.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>

          <Link to="/collection">
            <button>SHOP NOW</button>
          </Link>
        </div>
      ) : (
        <>
          {cartProducts.map((product) => (

            <div className="cart-item" key={product._id}>

             <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} />


              <div>
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>

                <div className="quantity">
                  <button
                    onClick={() =>
                      removeFromCart(product._id)
                    }
                  >
                    -
                  </button>

                  <span>{cart[product._id]}</span>

                  <button
                    onClick={() =>
                      addToCart(product._id)
                    }
                  >
                    +
                  </button>
                </div>

              </div>

            </div>

          ))}

          <div className="cart-total">

            <h2>
              Total: ₹{cartTotal}
            </h2>

            <Link to="/place-order">
              <button>
                PLACE ORDER
              </button>
            </Link>

          </div>
        </>
      )}

    </section>
  );
}

export default Cart;