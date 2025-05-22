import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'; // We'll create this context

function Navbar() {
  const { cartItems } = useContext(CartContext);

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      <ul>
        <li><Link to="/">StreamList</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/subscriptions">Subscriptions</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li>
          <Link to="/cart">
            Cart {totalQuantity > 0 && <span>({totalQuantity})</span>}
          </Link>
        </li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
