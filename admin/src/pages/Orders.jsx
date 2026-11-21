import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders (admin)
  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching orders");
    }
  };

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/api/order/status/${id}`, { status });
      if (res.data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="orders-page">
      <h2>Orders</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Order ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Customer</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Amount</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Payment</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{o._id}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {o.address?.firstName} {o.address?.lastName}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{o.address?.email}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>₹{o.amount}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {o.payment ? "Done" : "Pending"} ({o.paymentMethod})
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{o.status}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  style={{ padding: "4px" }}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
