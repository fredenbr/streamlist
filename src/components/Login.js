import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode } from 'jwt-decode';
import './Login.css'; // Optional: Add styles here

const Login = ({ onLogin }) => {
  const handleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      onLogin(decoded); // Store user info in App state + localStorage
    }
  };

  const handleError = () => {
    alert('Login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <h2>Welcome to StreamList</h2>
      <p>Please log in to continue</p>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default Login;
