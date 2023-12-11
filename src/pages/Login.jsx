// LoginForm.jsx (React component)

import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./CSS/Auth.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        console.log('Login successful');
        navigate("/");
        // Redirect or show success message
        
      } else {
        console.log('Invalid credentials');
        // Handle error - show error message to user
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Toastify Function

  const notify = () => toast("Login Successful!");


  return (
    <div className="form-container">
    <div className="form-main">
    <h1>Sign In</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="signup-btn" onClick={notify} type="submit">Log In</button>
        <ToastContainer />

      </form>
      <GoogleOAuthProvider clientId="960963639973-vebb01ojce876l25ih18qu8qrnrotbea.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Login;
