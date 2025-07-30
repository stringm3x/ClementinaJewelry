"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, selectedSize, selectedColor, quantity) => {
    const existing = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.variants.edges[0].node.price.amount,
          image: product.images.edges[0].node.url,
          size: selectedSize,
          color: selectedColor,
          quantity,
        },
      ]);
    }
  };

  const removeFromCart = (id, size, color) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
