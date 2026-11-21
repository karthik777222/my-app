import React from "react";

const Navbar = ({ setAuth }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#f8f8f8",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h3>TOXIC Admin Panel</h3>
      <button
        onClick={logout}
        style={{background: "red", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
