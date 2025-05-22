import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item with restriction for subscription items
  const addItem = (item) => {
    // Check if item is a subscription (id 1 to 4 are subscriptions based on your data.js)
    const isSubscription = item.id >= 1 && item.id <= 4;

    if (isSubscription) {
      // Check if any subscription already in cart
      const hasSubscription = cartItems.some(ci => ci.id >= 1 && ci.id <= 4);
      if (hasSubscription) {
        return { success: false, message: 'You can only add one subscription at a time.' };
      }
      // Add subscription with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      return { success: true };
    } else {
      // Accessories - add or update quantity
      const existing = cartItems.find(ci => ci.id === item.id);
      if (existing) {
        setCartItems(cartItems.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        ));
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
      return { success: true };
    }
  };

  // Remove item by id
  const removeItem = (id) => {
    setCartItems(cartItems.filter(ci => ci.id !== id));
  };

  // Update quantity of an item (minimum 1)
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(cartItems.map(ci => ci.id === id ? { ...ci, quantity } : ci));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
