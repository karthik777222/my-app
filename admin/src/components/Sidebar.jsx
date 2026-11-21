import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
  <ul>
    <li><Link to="/add">Add Item</Link></li>
    <li><Link to="/list">List Items</Link></li>
    <li><Link to="/orders">Orders</Link></li>
  </ul>
</div>

  );
};

export default Sidebar;
