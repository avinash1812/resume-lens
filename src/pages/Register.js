import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Sending email as username to match backend expectations
        body: JSON.stringify({
          username: user.email,
          password: user.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Registration Successful!");
        navigate("/login"); // Redirect to login page on success
      } else {
        alert(data.error || "Registration Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="auth-btn" onClick={handleRegister}>
        Register
      </button>
      <a href="/login" className="auth-link">
        Already have an account? Login
      </a>
    </div>
  );
}

export default Register;
