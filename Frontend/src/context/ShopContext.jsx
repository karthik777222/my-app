import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ShopContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // ✅ Fetch products from backend
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/product/list`)
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // ✅ Fetch cart from backend on load (if logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${BACKEND_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setCart(res.data.cartData))
      .catch(err => console.error("Error fetching cart:", err));
    }
  }, []);

  // ✅ Add to cart (backend sync)
  const addToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No auth token found");
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/cart/add`,
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cartData);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // ✅ Remove from cart (backend sync)
  const removeFromCart = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No auth token found");
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/cart/remove`,
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cartData);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // ✅ Clear cart locally
  const clearCart = () => setCart({});

  // ✅ Cart count
  const cartCount = Object.values(cart).reduce((total, q) => total + q, 0);

  // ✅ Cart total
  const cartTotal = Object.entries(cart).reduce((total, [id, q]) => {
    const product = products.find((p) => p._id === id);
    return product ? total + product.price * q : total;
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
