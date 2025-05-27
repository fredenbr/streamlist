import React, { useState, useEffect } from 'react';
import './CreditCard.css';
import { useNavigate } from 'react-router-dom';

function CreditCard() {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  // 🔁 Load saved card info on mount
  useEffect(() => {
    const savedCard = JSON.parse(localStorage.getItem('creditCard'));
    if (savedCard) {
      setCardNumber(savedCard.cardNumber || '');
      setName(savedCard.name || '');
      setExpiry(savedCard.expiry || '');
      setCvv(savedCard.cvv || '');
    }
  }, []);

  // ✅ Format card number as 1234 5678 9012 3456
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '')
                .replace(/(\d{4})(?=\d)/g, '$1 ')
                .trim()
                .slice(0, 19); // max 16 digits + 3 spaces
  };

  // ✅ Save to localStorage and redirect
  const handleSubmit = (e) => {
    e.preventDefault();
    const cardData = { cardNumber, name, expiry, cvv };
    localStorage.setItem('creditCard', JSON.stringify(cardData));
    alert('Card saved!');
    navigate('/');
  };

  return (
    <div className="credit-card-form">
      <h2>Enter Credit Card Info</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Name on Card"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        <button type="submit">Save Card</button>
      </form>
    </div>
  );
}

export default CreditCard;
