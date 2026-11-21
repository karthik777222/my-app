import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";  
import "./navbar.css";   

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);
  const { cartCount } = useShop();
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login");               // redirect to login page
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <div className="header-logo-text">TOXIC<span>.</span></div>
          </Link>

          {/* Navigation */}
          <nav className="header-nav">
            <NavLink to="/" end>HOME</NavLink>
            <NavLink to="/collection">COLLECTION</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
            <NavLink to="/order">ORDERS</NavLink> 
          </nav>

          {/* Icons */}
          <div className="header-icons">
            <Link to="/search" className="header-icon">⌕</Link>

            {/* Show Login or Logout depending on token */}
            {token ? (
              <button onClick={handleLogout} className="header-icon">
                Logout
              </button>
            ) : (
              <Link to="/login" className="header-icon">👤 Login</Link>
            )}

            {/* ✅ Updated cart symbol */}
            <Link to="/cart" className="header-icon cart-wrapper">
              🛒 <span className="cart-count">{cartCount}</span>
            </Link>

            <button className="mobile-menu-button" onClick={() => setSidebarOpen(true)}>☰</button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">MENU</span>
          <button className="sidebar-close" onClick={closeSidebar}>×</button>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end onClick={closeSidebar}>HOME</NavLink>
          <NavLink to="/collection" onClick={closeSidebar}>COLLECTION</NavLink>
          <NavLink to="/about" onClick={closeSidebar}>ABOUT</NavLink>
          <NavLink to="/contact" onClick={closeSidebar}>CONTACT</NavLink>
          <NavLink to="/order" onClick={closeSidebar}>ORDERS</NavLink> {/* ✅ Orders in sidebar */}
        </nav>
      </aside>
    </>
  );
}

export default Navbar;
