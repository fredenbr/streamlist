import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function Cart() {
  const { cartItems, removeItem, updateQuantity } = useContext(CartContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="streamlist-container">
      <h1 className="streamlist-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="movie-list">
          {cartItems.map(item => (
            <li key={item.id} className="movie-item" style={{ alignItems: 'center' }}>
              <img src={item.img} alt={item.service} style={{ width: '60px', marginRight: '15px' }} />
              <div style={{ flex: 1 }}>
                <h3>{item.service}</h3>
                <p>${item.price.toFixed(2)}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  style={{ width: '50px' }}
                />
              </div>
              <button onClick={() => removeItem(item.id)} className="delete">Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;

