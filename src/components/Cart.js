import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Lion King', year: 1994, price: 7.99},
    { id: 2, name: 'Lion King', year: 2016, price: 9.99},
  ]);

//Remove an item
const handleRemove = (itemId) => {
  const updatedCart = cartItems.filter(item => item.id !== itemId); 
  setCartItems(updatedCart);
};

//Calculate total price  
const getTotal = () => {
  return cartItems.reduce((total, item) => total + item.price, 0); 
};

return (
  <div style={{ padding: '20px' }}>
    <h2>Your Shopping Cart</h2>
{cartItems.length === 0 ? (
  <p>Your cart is empty.</p>
 ) : (
   <ul>
   {cartItems.map((item) => (
     <li key={item.id} style={{ marginBottom: '10px' }}>
      <span>{item.name} - ${item.price}</span>
      <button
        style={{ marginLeft: '10px' }}
        onClick={() => handleRemove(item.id)}
      >
        Remove
          </button>
          </li>
      ))}
        </ul>
)}
<h3>Total: ${getTotal()}</h3>
  </div>
);
};

export default ShoppingCart
