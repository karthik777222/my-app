import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const List = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get(`${BACKEND_URL}/api/product/list`)
    .then(res => {
      console.log(res.data); 
      setProducts(res.data.products); 
    })
    .catch(err => console.error("Error fetching products:", err));
}, []);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/product/${id}`);
      if (response.data.success) {
        alert("Product deleted successfully");
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  return (
    <div className="list-page">
      <h2>Product List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Image</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Category</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <img src={p.image} alt={p.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{p.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{p.category}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>₹{p.price}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <button onClick={() => deleteProduct(p._id)} style={{ background: "red", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
