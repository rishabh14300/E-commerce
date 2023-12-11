import React, { useState } from "react";
import "./CSS/Auth.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/signup", formData); // Replace with your backend endpoint
      console.log("Form submitted:", response.data);
      // Optionally, reset form fields
      setFormData({ email: "", password: "" });
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
    <div className="form-main">
    <h1>Sign Up</h1>
    <hr />
    <form className="form" onSubmit={handleSubmit}>
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
     <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      
      <div className="checkbox">
      <input type="checkbox" required />
      <p>By clicking you will agree to our terms and conditions.</p>
      </div>
      
      <button id="signup-btn" type="submit">Submit</button>
    </form>
    <div className="signin">
    <p>Already signed in?</p>
    <Link to="/login">Sign In</Link>
    </div>
    </div>
    </div>
  );
};

export default Signup;
