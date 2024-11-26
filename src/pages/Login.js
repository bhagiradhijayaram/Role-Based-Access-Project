import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  // Hardcoded credentials for each role
  const credentials = {
    admin: { name: "admin", password: "admin123" },
    accountant: { name: "accountant", password: "accountant123" },
    "data-operator": { name: "data-operator", password: "operator123" },
  };

  // Handle login
  const handleLogin = () => {
    // Check if name and password are not empty
    if (!name || !password) {
      alert("Name and Password are required!");
      return;
    }

    // Check if credentials match based on the role
    const userCredentials = credentials[role];

    if (userCredentials.name === name && userCredentials.password === password) {
      // If credentials are correct, navigate to the respective page
      if (role === "admin") navigate("/admin");
      else if (role === "accountant") navigate("/accountant");
      else if (role === "data-operator") navigate("/data-operator");
    } else {
      // If credentials do not match
      alert("Invalid credentials for the selected role.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>

          {/* Name input */}
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role select */}
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="accountant">Accountant</option>
              <option value="data-operator">Data Operator</option>
            </select>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="btn btn-primary btn-block"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
