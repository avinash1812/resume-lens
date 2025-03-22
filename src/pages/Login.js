import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Sending email as username since backend expects "username"
        body: JSON.stringify({
          username: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store the logged-in user's username in local storage
        localStorage.setItem("username", credentials.email);
        alert(data.message || "Login Successful!");
        navigate("/upload"); // Redirect to the upload/grade page
      } else {
        alert(data.error || "Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button className="auth-btn" onClick={handleLogin}>
        Login
      </button>
      <a href="/register" className="auth-link">
        Don't have an account? Register
      </a>
    </div>
  );
}

export default Login;
