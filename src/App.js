import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';

import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import TMDBSearch from './components/TMDBSearch';
import Subscriptions from './components/Subscriptions';
import Login from './components/Login';
import CreditCard from './components/CreditCard'; // ✅ Import the CreditCard component

import { CartProvider } from './contexts/CartContext';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('user') !== null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <GoogleOAuthProvider clientId="531994351123-1pajdke4nknjqslj35dioo8l6d7j4jkq.apps.googleusercontent.com">
      <CartProvider>
        <Router>
          {isAuthenticated && <Navbar onLogout={handleLogout} />}
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {isAuthenticated ? (
              <>
                <Route path="/" element={<StreamList />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CreditCard />} /> {/* ✅ New Route */}
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<TMDBSearch />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </Router>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
