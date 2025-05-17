import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">StreamList</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/search">Search</Link></li> {/* ✅ New TMDB Search link */}
      </ul>
    </nav>
  );
}

export default Navbar;
