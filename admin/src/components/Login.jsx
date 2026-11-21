import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/login`, { email, password });

      if (response.data.success && response.data.user.role === "admin") {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        navigate("/add");
      } else {
        alert(response.data.message || "Not authorized");
      }
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={onSubmitHandler}>
        <h2>Admin Login</h2>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
          >
            👁️
          </span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login