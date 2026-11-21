import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function PlaceOrder() {
  const navigate = useNavigate();
  const { cart, products, cartTotal, clearCart } = useShop();
  const delivery_fee = 50;

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "",
    zipcode: "", country: "", phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItems = Object.entries(cart).map(([id, qty]) => {
        const product = products.find((p) => p._id === id);
        return product ? { productId: id, name: product.name, price: product.price, quantity: qty } : null;
      }).filter(Boolean);

      const orderData = {
        items: orderItems,
        amount: cartTotal + delivery_fee,
        address: formData,
      };

      const token = localStorage.getItem("token");

      if (method === "stripe") {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/place/stripe`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          window.location.href = response.data.session_url; // redirect to Stripe checkout
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/place`,
          { ...orderData, paymentMethod: method.toUpperCase() },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          clearCart();
          navigate("/order");
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Order failed: " + error.message);
    }
  };

  return (
    <section className="page">
      <h1>Place Order</h1>
      <form className="order-form" onSubmit={onSubmitHandler}>
        <input name="firstName" required placeholder="First Name" onChange={onChangeHandler} />
        <input name="lastName" required placeholder="Last Name" onChange={onChangeHandler} />
        <input name="email" type="email" required placeholder="Email" onChange={onChangeHandler} />
        <input name="phone" required placeholder="Phone Number" onChange={onChangeHandler} />
        <input name="street" required placeholder="Street Address" onChange={onChangeHandler} />
        <input name="city" required placeholder="City" onChange={onChangeHandler} />
        <input name="state" required placeholder="State" onChange={onChangeHandler} />
        <input name="zipcode" required placeholder="Zipcode" onChange={onChangeHandler} />
        <input name="country" required placeholder="Country" onChange={onChangeHandler} />

        <div className="cart-totals">
          <h3>Subtotal: ₹{cartTotal}</h3>
          <h3>Shipping Fee: ₹{delivery_fee}</h3>
          <h2>Total: ₹{cartTotal + delivery_fee}</h2>
        </div>

        <div className="payment-methods">
          <label><input type="radio" value="stripe" checked={method==="stripe"} onChange={() => setMethod("stripe")} /> Stripe</label>
          <label><input type="radio" value="razorpay" checked={method==="razorpay"} onChange={() => setMethod("razorpay")} /> Razorpay</label>
          <label><input type="radio" value="cod" checked={method==="cod"} onChange={() => setMethod("cod")} /> Cash on Delivery</label>
        </div>

        <button type="submit">PLACE ORDER</button>
      </form>
    </section>
  );
}

export default PlaceOrder;
