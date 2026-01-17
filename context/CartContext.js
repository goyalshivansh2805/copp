import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const [savedAddress, setSavedAddress] = useState(null);

  const addToCart = (product, size, color) => {
    const itemId = `${product.id}-${size}-${color}`;
    
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        item => item.itemId === itemId
      );

      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // New item
        return [
          ...prevItems,
          {
            itemId,
            product,
            size,
            color,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map(item => {
        if (item.itemId === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = (address) => {
    if (cartItems.length === 0) return null;

    // Save address for future use
    if (address) {
      setSavedAddress(address);
    }

    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    const order = {
      id: orderId,
      items: [...cartItems],
      total: getTotalPrice() * 1.1, // with tax
      date: new Date().toISOString(),
      status: 'Processing',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      address: address,
    };

    // Add to orders array
    setOrders(prev => [order, ...prev]);
    setLatestOrder(order);
    clearCart();

    // Simulate order status updates
    setTimeout(() => {
      setLatestOrder(prev => ({ ...prev, status: 'Shipped' }));
      setOrders(prev => prev.map(o => 
        o.id === orderId ? { ...o, status: 'Shipped' } : o
      ));
    }, 5000);

    return order;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    latestOrder,
    orders,
    placeOrder,
    savedAddress,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

