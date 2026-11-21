import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ added state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const signupRes = await axios.post(`${BACKEND_URL}/api/user/register`, {
          name,
          email,
          password,
        });
        if (signupRes.data.success) {
          localStorage.setItem("token", signupRes.data.token);
          navigate("/collection");
        }
      } else {
        let loginRes;
        if (isAdmin) {
          // Admin login
          loginRes = await axios.post(`${BACKEND_URL}/api/user/login`, {
            email,
            password,
          });
        } else {
          // Customer login
          loginRes = await axios.post(`${BACKEND_URL}/api/user/login-customer`, {
            email,
            password,
          });
        }

        if (loginRes.data.success) {
          localStorage.setItem("token", loginRes.data.token);
          navigate("/collection");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="page login">
      <h1>{isSignup ? "Create Account" : "Login"}</h1>
      <form onSubmit={submit}>
        {isSignup && (
          <input
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ Admin toggle */}
        {!isSignup && (
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            Login as Admin
          </label>
        )}

        <button type="submit">{isSignup ? "SIGN UP" : "LOGIN"}</button>
      </form>
      <p className="switch" onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>
    </section>
  );
}

export default Login;
