import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "visitor", // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const userData = await response.json();
      console.log(userData);

      navigate("/login");
      // Clear the form inputs
      setFormData({
        email: "",
        password: "",
        role: "visitor", // Reset role to the default value
      });
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Register</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="project manager">Project Manager</option>
            <option value="contractor">Contractor</option>
            <option value="supervisor">Supervisor</option>
            <option value="visitor">Visitor</option>
          </select>
        </div>

        <button type="submit" className="signup-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
