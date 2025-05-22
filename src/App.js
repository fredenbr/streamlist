import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import TMDBSearch from './components/TMDBSearch';
import Subscriptions from './components/Subscriptions'; // We'll create this next
import { CartProvider } from './contexts/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<TMDBSearch />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
