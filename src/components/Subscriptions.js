import React, { useContext, useState } from 'react';
import list from '../data'; // your data.js
import { CartContext } from '../contexts/CartContext';

function Subscriptions() {
  const { addItem } = useContext(CartContext);
  const [warning, setWarning] = useState('');

  const handleAdd = (item) => {
    const result = addItem(item);
    if (!result.success) {
      setWarning(result.message);
      setTimeout(() => setWarning(''), 3000);
    } else {
      setWarning('');
    }
  };

  return (
    <div className="streamlist-container">
      <h1 className="streamlist-title">Subscriptions & Accessories</h1>
      {warning && <p style={{ color: 'red' }}>{warning}</p>}
      <ul className="movie-list">
        {list.map(item => (
          <li key={item.id} className="movie-item" style={{ alignItems: 'center' }}>
            <img src={item.img} alt={item.service} style={{ width: '60px', marginRight: '15px' }} />
            <div style={{ flex: 1 }}>
              <h3>{item.service}</h3>
              <p>{item.serviceInfo}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <button onClick={() => handleAdd(item)} className="add-button">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subscriptions;
