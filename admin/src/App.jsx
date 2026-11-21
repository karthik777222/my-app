import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuth(true);
      setToken(storedToken);
    }
  }, []);

  if (!auth) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar setAuth={setAuth} />
        <div style={{ padding: "20px", overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="*" element={<Navigate to="/add" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
} 

export default App;
